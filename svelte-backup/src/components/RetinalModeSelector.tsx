import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type RetinalMode = "area-centralis" | "visual-streak";

const MODES = [
  { 
    value: "area-centralis", 
    label: "Area Centralis (AC)",
    description: "Central focus - Pugs, Bulldogs, Boxers"
  },
  { 
    value: "visual-streak", 
    label: "Visual Streak (VS)",
    description: "Horizon scanning - Greyhounds, Collies, Sighthounds"
  },
];

export function RetinalModeSelector({
  value,
  onChange,
}: {
  value: RetinalMode;
  onChange: (s: RetinalMode) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-semibold">Retinal Configuration</label>
      <Select value={value} onValueChange={v => onChange(v as RetinalMode)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose mode..." />
        </SelectTrigger>
        <SelectContent>
          {MODES.map((mode) => (
            <SelectItem key={mode.value} value={mode.value}>
              <div>
                <div className="font-medium">{mode.label}</div>
                <div className="text-xs text-muted-foreground">{mode.description}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function getRetinalModeDescription(mode: RetinalMode): string {
  if (mode === "area-centralis") {
    return "Enhanced central acuity for focused vision. These breeds excel at direct eye contact, reading facial expressions, and responding to face-to-face commands. Best for tasks requiring central focus.";
  }
  return "Optimized for scanning the horizon with a wide field of view (up to 270°). Excellent at tracking movement across wide landscapes. Highly adapted for detecting peripheral motion.";
}
