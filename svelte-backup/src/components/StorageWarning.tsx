import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Smartphone, Info } from "lucide-react";

interface StorageWarningProps {
  count: number;
  isNative: boolean;
  shouldMoveToDevice: boolean;
  nearLimit: boolean;
}

export function StorageWarning({ count, isNative, shouldMoveToDevice, nearLimit }: StorageWarningProps) {
  if (isNative) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <Smartphone className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Device Storage Active</AlertTitle>
        <AlertDescription className="text-green-700">
          Photos are saved directly to your device. You can save up to 1000+ photos. ({count} saved)
        </AlertDescription>
      </Alert>
    );
  }

  if (nearLimit) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Storage Limit Reached!</AlertTitle>
        <AlertDescription>
          You have {count}/10 temporary photos. Oldest photos will be auto-deleted.
          <br />
          <strong>Install the mobile app to save unlimited photos to your device.</strong>
          <div className="mt-2">
            <Button size="sm" variant="outline" asChild>
              <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer">
                Get Mobile App
              </a>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (shouldMoveToDevice) {
    return (
      <Alert className="bg-yellow-50 border-yellow-200">
        <Info className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Temporary Browser Storage</AlertTitle>
        <AlertDescription className="text-yellow-700">
          You have {count}/10 photos in temporary browser storage.
          <br />
          <strong>Install the mobile app to save photos permanently to your device storage.</strong>
          <div className="mt-2">
            <Button size="sm" variant="outline" asChild>
              <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer">
                Learn About Mobile App
              </a>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
