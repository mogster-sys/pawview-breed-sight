import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { OptimisticIndicator } from "@/components/OptimisticIndicator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OptimisticCommentFormProps {
  photoId: string;
  userId: string;
  onCommentAdded?: (comment: string) => void;
}

export function OptimisticCommentForm({
  photoId,
  userId,
  onCommentAdded,
}: OptimisticCommentFormProps) {
  const [comment, setComment] = useState("");
  const [submittedComments, setSubmittedComments] = useState<string[]>([]);
  const { mutate, optimisticUpdates } = useOptimisticMutation<{ comment: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const commentText = comment.trim();
    setComment("");
    setSubmittedComments(prev => [...prev, commentText]);

    const operation = {
      type: 'comment_photo' as const,
      data: {
        photo_id: photoId,
        user_id: userId,
        comment: commentText,
      },
    };

    const onlineAction = async () => {
      const { error } = await supabase
        .from('photo_comments')
        .insert({
          photo_id: photoId,
          user_id: userId,
          comment: commentText,
        });
      if (error) throw error;
    };

    try {
      await mutate(operation, { comment: commentText }, onlineAction);
      
      if (!navigator.onLine) {
        toast.info("Comment queued for sync");
      } else {
        toast.success("Comment added!");
      }
      
      onCommentAdded?.(commentText);
    } catch (error) {
      setSubmittedComments(prev => prev.filter(c => c !== commentText));
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="resize-none"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <div>
            {optimisticUpdates.length > 0 && (
              <OptimisticIndicator
                pending={optimisticUpdates[0].pending}
                error={optimisticUpdates[0].error}
              />
            )}
          </div>
          <Button type="submit" disabled={!comment.trim()}>
            Post Comment
          </Button>
        </div>
      </form>

      {submittedComments.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Your recent comments:</p>
          {submittedComments.map((c, i) => (
            <div key={i} className="text-sm p-2 bg-muted rounded-md opacity-75">
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
