import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CommunityPhotoCardProps {
  photo: {
    id: string;
    user_id: string;
    breed: string;
    retinal_mode: string;
    filters: any;
    imageUrl?: string;
    caption: string | null;
    likes_count: number;
    comments_count: number;
    isLiked?: boolean;
  };
  onUpdate?: () => void;
}

export function CommunityPhotoCard({ photo, onUpdate }: CommunityPhotoCardProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(photo.isLiked || false);
  const [likesCount, setLikesCount] = useState(photo.likes_count);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { mutate } = useOptimisticMutation();

  const handleLike = async () => {
    if (!user) {
      toast.error("Please sign in to like photos");
      return;
    }

    const newLikedState = !liked;
    const previousLiked = liked;
    const previousCount = likesCount;

    // Optimistic update
    setLiked(newLikedState);
    setLikesCount(newLikedState ? likesCount + 1 : likesCount - 1);

    const operation = newLikedState
      ? {
          type: 'like_photo' as const,
          data: { photo_id: photo.id, user_id: user.id },
        }
      : {
          type: 'unlike_photo' as const,
          data: { photo_id: photo.id, user_id: user.id },
        };

    const onlineAction = async () => {
      if (newLikedState) {
        const { error } = await supabase
          .from('photo_likes')
          .insert({ photo_id: photo.id, user_id: user.id });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('photo_likes')
          .delete()
          .eq('photo_id', photo.id)
          .eq('user_id', user.id);
        if (error) throw error;
      }
    };

    try {
      await mutate(operation, { liked: newLikedState }, onlineAction);
      
      if (!navigator.onLine) {
        toast.info(newLikedState ? "Like queued for sync" : "Unlike queued for sync");
      }
      onUpdate?.();
    } catch (error) {
      // Rollback on error
      setLiked(previousLiked);
      setLikesCount(previousCount);
      toast.error("Failed to update like status");
    }
  };

  const handleComment = async () => {
    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!comment.trim()) return;

    setSubmitting(true);
    const commentText = comment.trim();

    const operation = {
      type: 'comment_photo' as const,
      data: {
        photo_id: photo.id,
        user_id: user.id,
        comment: commentText,
      },
    };

    const onlineAction = async () => {
      const { error } = await supabase
        .from('photo_comments')
        .insert({
          photo_id: photo.id,
          user_id: user.id,
          comment: commentText,
        });
      if (error) throw error;
    };

    try {
      await mutate(operation, { comment: commentText }, onlineAction);
      
      setComment("");
      toast.success("Comment added!");
      onUpdate?.();
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {photo.imageUrl && (
          <img
            src={photo.imageUrl}
            alt={`${photo.breed} vision`}
            className="w-full h-64 object-cover"
          />
        )}
        
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold text-sm">{photo.breed}</div>
              <div className="text-xs text-muted-foreground">
                {photo.retinal_mode === "area-centralis" ? "Area Centralis" : "Visual Streak"}
              </div>
            </div>
            <div className="flex gap-1 flex-wrap">
              {photo.filters.dichro && (
                <Badge variant="secondary" className="text-xs">Dichro</Badge>
              )}
              {photo.filters.contrast && (
                <Badge variant="secondary" className="text-xs">Contrast</Badge>
              )}
              {photo.filters.brightness && (
                <Badge variant="secondary" className="text-xs">Bright</Badge>
              )}
            </div>
          </div>

          {/* Caption */}
          {photo.caption && (
            <p className="text-sm text-foreground">{photo.caption}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "gap-2 hover:text-red-500",
                liked && "text-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
              <span>{likesCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{photo.comments_count}</span>
            </Button>
          </div>

          {/* Comment Input */}
          {showComments && user && (
            <div className="pt-2 space-y-2 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none text-sm"
                  rows={2}
                />
                <Button
                  size="sm"
                  onClick={handleComment}
                  disabled={!comment.trim() || submitting}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {showComments && !user && (
            <div className="pt-2 text-sm text-muted-foreground border-t">
              Sign in to comment
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
