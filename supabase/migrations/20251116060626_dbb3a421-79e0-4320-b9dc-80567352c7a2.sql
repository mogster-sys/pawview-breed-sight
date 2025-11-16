-- Create storage bucket for community photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'community-photos',
  'community-photos',
  true,
  5242880, -- 5MB limit per photo
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Storage policies for community photos
CREATE POLICY "Anyone can view community photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'community-photos');

CREATE POLICY "Authenticated users can upload community photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'community-photos' 
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'community-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'community-photos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Community photos table with scalability in mind
CREATE TABLE public.community_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  breed TEXT NOT NULL,
  retinal_mode TEXT NOT NULL,
  caption TEXT,
  filters JSONB NOT NULL DEFAULT '{}'::jsonb,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes for efficient queries at scale
CREATE INDEX idx_community_photos_user_id ON public.community_photos(user_id);
CREATE INDEX idx_community_photos_created_at ON public.community_photos(created_at DESC);
CREATE INDEX idx_community_photos_likes_count ON public.community_photos(likes_count DESC);
CREATE INDEX idx_community_photos_breed ON public.community_photos(breed);
CREATE INDEX idx_community_photos_composite ON public.community_photos(created_at DESC, likes_count DESC);

-- Photo likes table (optimized for quick lookups)
CREATE TABLE public.photo_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID NOT NULL REFERENCES public.community_photos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(photo_id, user_id)
);

CREATE INDEX idx_photo_likes_photo_id ON public.photo_likes(photo_id);
CREATE INDEX idx_photo_likes_user_id ON public.photo_likes(user_id);

-- Photo comments table
CREATE TABLE public.photo_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID NOT NULL REFERENCES public.community_photos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_photo_comments_photo_id ON public.photo_comments(photo_id, created_at DESC);
CREATE INDEX idx_photo_comments_user_id ON public.photo_comments(user_id);

-- Function to update likes count (prevents count queries)
CREATE OR REPLACE FUNCTION public.update_photo_likes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_photos
    SET likes_count = likes_count + 1
    WHERE id = NEW.photo_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_photos
    SET likes_count = likes_count - 1
    WHERE id = OLD.photo_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trigger_update_likes_count
AFTER INSERT OR DELETE ON public.photo_likes
FOR EACH ROW EXECUTE FUNCTION public.update_photo_likes_count();

-- Function to update comments count
CREATE OR REPLACE FUNCTION public.update_photo_comments_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_photos
    SET comments_count = comments_count + 1
    WHERE id = NEW.photo_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_photos
    SET comments_count = comments_count - 1
    WHERE id = OLD.photo_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trigger_update_comments_count
AFTER INSERT OR DELETE ON public.photo_comments
FOR EACH ROW EXECUTE FUNCTION public.update_photo_comments_count();

-- RLS Policies
ALTER TABLE public.community_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_comments ENABLE ROW LEVEL SECURITY;

-- Everyone can view community photos
CREATE POLICY "Anyone can view community photos"
ON public.community_photos FOR SELECT
USING (true);

-- Authenticated users can upload photos
CREATE POLICY "Users can insert their own photos"
ON public.community_photos FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own photos
CREATE POLICY "Users can update their own photos"
ON public.community_photos FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own photos
CREATE POLICY "Users can delete their own photos"
ON public.community_photos FOR DELETE
USING (auth.uid() = user_id);

-- Photo likes policies
CREATE POLICY "Anyone can view likes"
ON public.photo_likes FOR SELECT
USING (true);

CREATE POLICY "Users can like photos"
ON public.photo_likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike photos"
ON public.photo_likes FOR DELETE
USING (auth.uid() = user_id);

-- Photo comments policies
CREATE POLICY "Anyone can view comments"
ON public.photo_comments FOR SELECT
USING (true);

CREATE POLICY "Users can add comments"
ON public.photo_comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.photo_comments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.photo_comments FOR DELETE
USING (auth.uid() = user_id);