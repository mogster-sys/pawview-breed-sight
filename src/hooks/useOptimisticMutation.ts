import { useState } from 'react';
import { useSyncQueue } from '@/contexts/SyncQueueContext';
import { QueuedOperation } from '@/utils/syncQueue';

export interface OptimisticUpdate<T> {
  id: string;
  data: T;
  pending: boolean;
  error?: string;
}

export function useOptimisticMutation<T>() {
  const [optimisticUpdates, setOptimisticUpdates] = useState<Map<string, OptimisticUpdate<T>>>(new Map());
  const { addOperation } = useSyncQueue();

  const mutate = async (
    operation: Omit<QueuedOperation, 'id' | 'timestamp' | 'retries'>,
    optimisticData: T,
    onlineAction?: () => Promise<void>
  ) => {
    const updateId = `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Apply optimistic update immediately
    setOptimisticUpdates(prev => {
      const newMap = new Map(prev);
      newMap.set(updateId, {
        id: updateId,
        data: optimisticData,
        pending: true,
      });
      return newMap;
    });

    if (navigator.onLine && onlineAction) {
      // If online, try to execute immediately
      try {
        await onlineAction();
        // Success - mark as confirmed
        setOptimisticUpdates(prev => {
          const newMap = new Map(prev);
          newMap.set(updateId, {
            id: updateId,
            data: optimisticData,
            pending: false,
          });
          return newMap;
        });
        
        // Remove after short delay to allow UI to show success
        setTimeout(() => {
          setOptimisticUpdates(prev => {
            const newMap = new Map(prev);
            newMap.delete(updateId);
            return newMap;
          });
        }, 2000);
      } catch (error) {
        // Failed - add to queue and keep optimistic update
        addOperation(operation);
        setOptimisticUpdates(prev => {
          const newMap = new Map(prev);
          newMap.set(updateId, {
            id: updateId,
            data: optimisticData,
            pending: true,
            error: 'Queued for sync',
          });
          return newMap;
        });
      }
    } else {
      // Offline - add to queue immediately
      addOperation(operation);
    }

    return updateId;
  };

  const rollback = (updateId: string) => {
    setOptimisticUpdates(prev => {
      const newMap = new Map(prev);
      newMap.delete(updateId);
      return newMap;
    });
  };

  const confirm = (updateId: string) => {
    setOptimisticUpdates(prev => {
      const newMap = new Map(prev);
      const update = newMap.get(updateId);
      if (update) {
        newMap.set(updateId, { ...update, pending: false });
      }
      return newMap;
    });

    // Remove after confirmation
    setTimeout(() => {
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(updateId);
        return newMap;
      });
    }, 2000);
  };

  return {
    mutate,
    rollback,
    confirm,
    optimisticUpdates: Array.from(optimisticUpdates.values()),
  };
}
