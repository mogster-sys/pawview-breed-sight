
// Controls for toggling filtering simulation
import { Switch } from "@/components/ui/switch";

export function CameraFilters({
  filters,
  setFilters,
}: {
  filters: { dichro: boolean; contrast: boolean; brightness: boolean };
  setFilters: (f: typeof filters) => void;
}) {
  return (
    <div className="flex gap-6 items-center px-2">
      <div className="flex gap-2 items-center">
        <Switch checked={filters.dichro} onCheckedChange={v => setFilters({ ...filters, dichro: v })} />
        <span title="Simulate dog dichromatic color vision" className="text-sm">Blue-Yellow Filter</span>
      </div>
      <div className="flex gap-2 items-center">
        <Switch checked={filters.contrast} onCheckedChange={v => setFilters({ ...filters, contrast: v })} />
        <span title="Enhance contrast for motion sensitivity" className="text-sm">High Contrast</span>
      </div>
      <div className="flex gap-2 items-center">
        <Switch checked={filters.brightness} onCheckedChange={v => setFilters({ ...filters, brightness: v })} />
        <span title="Simulate increased brightness perception" className="text-sm">Brighten</span>
      </div>
    </div>
  );
}
