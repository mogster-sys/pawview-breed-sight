import { useEffect, useState } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSyncQueue } from "@/contexts/SyncQueueContext";
import { Button } from "@/components/ui/button";

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const { queueCount, isSyncing, syncNow } = useSyncQueue();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true);
      setTimeout(() => setShowOnlineMessage(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineMessage(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showOnlineMessage && queueCount === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-top">
      <Alert
        variant={isOnline ? "default" : "destructive"}
        className="max-w-md mx-auto shadow-lg"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <AlertDescription>
              {isOnline
                ? queueCount > 0
                  ? `${queueCount} item${queueCount > 1 ? 's' : ''} pending sync`
                  : "You're back online!"
                : "You're offline. Changes will sync when online."}
            </AlertDescription>
          </div>
          {isOnline && queueCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={syncNow}
              disabled={isSyncing}
              className="ml-2"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Sync Now
                </>
              )}
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
};

export default OfflineIndicator;
