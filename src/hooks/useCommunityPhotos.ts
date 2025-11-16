import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CommunityPhoto {
  id: string;
  user_id: string;
  breed: string;
  retinal_mode: string;
  filters: any;
  storage_path: string;
  caption: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  imageUrl?: string;
  isLiked?: boolean;
}

export function useCommunityPhotos() {
  const [photos, setPhotos] = useState<CommunityPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadPhotos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_photos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Load image URLs and like status
      const photosWithData = await Promise.all(
        (data || []).map(async (photo) => {
          // Get public URL for the image
          const { data: urlData } = supabase.storage
            .from('community-photos')
            .getPublicUrl(photo.storage_path);

          // Check if user has liked this photo
          let isLiked = false;
          if (user) {
            const { data: likeData } = await supabase
              .from('photo_likes')
              .select('id')
              .eq('photo_id', photo.id)
              .eq('user_id', user.id)
              .maybeSingle();
            isLiked = !!likeData;
          }

          return {
            ...photo,
            imageUrl: urlData.publicUrl,
            isLiked,
          };
        })
      );

      setPhotos(photosWithData);
    } catch (error) {
      console.error('Error loading community photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [user]);

  return { photos, loading, refetch: loadPhotos };
}
