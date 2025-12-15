import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptimisticIndicatorProps {
  pending: boolean;
  error?: string;
  className?: string;
}

export function OptimisticIndicator({ pending, error, className }: OptimisticIndicatorProps) {
  if (error) {
    return (
      <div className={cn("flex items-center gap-2 text-xs text-destructive", className)}>
        <AlertCircle className="h-3 w-3" />
        <span>{error}</span>
      </div>
    );
  }

  if (pending) {
    return (
      <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}>
        <Loader2 className="h-3 w-3 animate-spin" />
        <span>Syncing...</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 text-xs text-green-600 dark:text-green-400", className)}>
      <CheckCircle2 className="h-3 w-3" />
      <span>Synced</span>
    </div>
  );
}
