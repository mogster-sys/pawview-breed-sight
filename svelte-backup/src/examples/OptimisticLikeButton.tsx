import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface OptimisticLikeButtonProps {
  photoId: string;
  initialLiked: boolean;
  initialLikesCount: number;
  userId: string;
}

export function OptimisticLikeButton({
  photoId,
  initialLiked,
  initialLikesCount,
  userId,
}: OptimisticLikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const { mutate } = useOptimisticMutation();

  const handleLike = async () => {
    const newLikedState = !liked;
    const previousLiked = liked;
    const previousCount = likesCount;

    // Optimistic update
    setLiked(newLikedState);
    setLikesCount(newLikedState ? likesCount + 1 : likesCount - 1);

    const operation = newLikedState
      ? {
          type: 'like_photo' as const,
          data: { photo_id: photoId, user_id: userId },
        }
      : {
          type: 'unlike_photo' as const,
          data: { photo_id: photoId, user_id: userId },
        };

    const onlineAction = async () => {
      if (newLikedState) {
        const { error } = await supabase
          .from('photo_likes')
          .insert({ photo_id: photoId, user_id: userId });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('photo_likes')
          .delete()
          .eq('photo_id', photoId)
          .eq('user_id', userId);
        if (error) throw error;
      }
    };

    try {
      await mutate(operation, { liked: newLikedState }, onlineAction);
      
      if (!navigator.onLine) {
        toast.info(newLikedState ? "Like queued for sync" : "Unlike queued for sync");
      }
    } catch (error) {
      // Rollback on error
      setLiked(previousLiked);
      setLikesCount(previousCount);
      toast.error("Failed to update like status");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={cn(
          "gap-2",
          liked && "text-red-500 hover:text-red-600"
        )}
      >
        <Heart className={cn("h-4 w-4", liked && "fill-current")} />
        <span>{likesCount}</span>
      </Button>
    </div>
  );
}
