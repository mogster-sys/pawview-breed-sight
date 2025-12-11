import { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

const isInStandaloneMode = () => {
  return window.matchMedia("(display-mode: standalone)").matches || 
         (window.navigator as any).standalone === true;
};

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if already installed
    if (isInStandaloneMode()) {
      setShowPrompt(false);
      return;
    }

    // Check if iOS
    if (isIOS()) {
      setIsIOSDevice(true);
      setShowPrompt(true);
      return;
    }

    // Android/Chrome install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowPrompt(false);
  };

  if (!showPrompt || dismissed || !isMobile) return null;

  // iOS-specific instructions
  if (isIOSDevice) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4">
        <div className="bg-white rounded-xl shadow-xl border border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2 shrink-0">
              <Share className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-blue-900">Install My Doggles</p>
              <p className="text-sm text-gray-600 mt-1">
                Tap <span className="inline-flex items-center"><Share className="h-4 w-4 mx-1" /></span> 
                then <span className="font-medium">"Add to Home Screen"</span>
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 text-gray-400 hover:text-gray-600 shrink-0"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Android/Chrome install button
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-white rounded-xl shadow-xl border border-blue-200 p-4 flex items-center gap-3">
        <div className="bg-blue-100 rounded-full p-2">
          <Download className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-blue-900">Install My Doggles</p>
          <p className="text-sm text-gray-600">Add to home screen for quick access</p>
        </div>
        <Button
          onClick={handleInstall}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Install
        </Button>
        <button
          onClick={handleDismiss}
          className="p-1 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
