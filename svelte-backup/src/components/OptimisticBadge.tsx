import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface OptimisticBadgeProps {
  show: boolean;
}

export function OptimisticBadge({ show }: OptimisticBadgeProps) {
  if (!show) return null;

  return (
    <Badge variant="secondary" className="gap-1 text-xs">
      <Loader2 className="h-3 w-3 animate-spin" />
      Pending sync
    </Badge>
  );
}
