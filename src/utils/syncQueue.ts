import { supabase } from "@/integrations/supabase/client";

export interface QueuedOperation {
  id: string;
  type: 'upload_photo' | 'like_photo' | 'comment_photo' | 'delete_photo';
  data: any;
  timestamp: number;
  retries: number;
}

const QUEUE_KEY = 'offline_sync_queue';
const MAX_RETRIES = 3;

export const getSyncQueue = (): QueuedOperation[] => {
  try {
    const queue = localStorage.getItem(QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch (error) {
    console.error('Error reading sync queue:', error);
    return [];
  }
};

export const saveSyncQueue = (queue: QueuedOperation[]) => {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Error saving sync queue:', error);
  }
};

export const addToQueue = (operation: Omit<QueuedOperation, 'id' | 'timestamp' | 'retries'>) => {
  const queue = getSyncQueue();
  const newOperation: QueuedOperation = {
    ...operation,
    id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    retries: 0,
  };
  queue.push(newOperation);
  saveSyncQueue(queue);
  return newOperation.id;
};

export const removeFromQueue = (id: string) => {
  const queue = getSyncQueue();
  const filtered = queue.filter(op => op.id !== id);
  saveSyncQueue(filtered);
};

const processOperation = async (operation: QueuedOperation): Promise<boolean> => {
  try {
    switch (operation.type) {
      case 'upload_photo':
        const { data: photoData, error: photoError } = await supabase
          .from('community_photos')
          .insert(operation.data);
        if (photoError) throw photoError;
        break;

      case 'like_photo':
        const { error: likeError } = await supabase
          .from('photo_likes')
          .insert(operation.data);
        if (likeError) throw likeError;
        break;

      case 'comment_photo':
        const { error: commentError } = await supabase
          .from('photo_comments')
          .insert(operation.data);
        if (commentError) throw commentError;
        break;

      case 'delete_photo':
        const { error: deleteError } = await supabase
          .from('community_photos')
          .delete()
          .eq('id', operation.data.id);
        if (deleteError) throw deleteError;
        break;

      default:
        console.warn('Unknown operation type:', operation.type);
        return false;
    }
    return true;
  } catch (error) {
    console.error('Error processing operation:', error);
    return false;
  }
};

export const processSyncQueue = async (): Promise<{ success: number; failed: number }> => {
  if (!navigator.onLine) {
    return { success: 0, failed: 0 };
  }

  const queue = getSyncQueue();
  let successCount = 0;
  let failedCount = 0;
  const remainingQueue: QueuedOperation[] = [];

  for (const operation of queue) {
    const success = await processOperation(operation);
    
    if (success) {
      successCount++;
    } else {
      if (operation.retries < MAX_RETRIES) {
        remainingQueue.push({
          ...operation,
          retries: operation.retries + 1,
        });
      } else {
        failedCount++;
      }
    }
  }

  saveSyncQueue(remainingQueue);
  return { success: successCount, failed: failedCount };
};

export const clearSyncQueue = () => {
  saveSyncQueue([]);
};

export const getQueueCount = (): number => {
  return getSyncQueue().length;
};
