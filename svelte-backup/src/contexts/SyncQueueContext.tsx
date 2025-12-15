import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  addToQueue, 
  processSyncQueue, 
  getQueueCount, 
  QueuedOperation 
} from "@/utils/syncQueue";
import { toast } from "sonner";

interface SyncQueueContextType {
  queueCount: number;
  isSyncing: boolean;
  addOperation: (operation: Omit<QueuedOperation, 'id' | 'timestamp' | 'retries'>) => string;
  syncNow: () => Promise<void>;
}

const SyncQueueContext = createContext<SyncQueueContextType | undefined>(undefined);

export const SyncQueueProvider = ({ children }: { children: ReactNode }) => {
  const [queueCount, setQueueCount] = useState(getQueueCount());
  const [isSyncing, setIsSyncing] = useState(false);

  const updateQueueCount = () => {
    setQueueCount(getQueueCount());
  };

  const syncNow = async () => {
    if (isSyncing || !navigator.onLine) return;

    setIsSyncing(true);
    try {
      const { success, failed } = await processSyncQueue();
      
      if (success > 0) {
        toast.success(`Synced ${success} operation${success > 1 ? 's' : ''}`);
      }
      
      if (failed > 0) {
        toast.error(`${failed} operation${failed > 1 ? 's' : ''} failed to sync`);
      }
      
      updateQueueCount();
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync data');
    } finally {
      setIsSyncing(false);
    }
  };

  const addOperation = (operation: Omit<QueuedOperation, 'id' | 'timestamp' | 'retries'>) => {
    const id = addToQueue(operation);
    updateQueueCount();
    return id;
  };

  useEffect(() => {
    const handleOnline = () => {
      syncNow();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <SyncQueueContext.Provider value={{ queueCount, isSyncing, addOperation, syncNow }}>
      {children}
    </SyncQueueContext.Provider>
  );
};

export const useSyncQueue = () => {
  const context = useContext(SyncQueueContext);
  if (!context) {
    throw new Error('useSyncQueue must be used within SyncQueueProvider');
  }
  return context;
};
