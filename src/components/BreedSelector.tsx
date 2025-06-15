
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BREEDS = [
  { value: "greyhound", label: "Greyhound (270°)" },
  { value: "labrador", label: "Labrador (240°)" },
  { value: "bulldog", label: "Bulldog (Low Peripheral)" },
  { value: "custom", label: "Custom/Mixed Breed" },
];

export type BreedType = typeof BREEDS[number]["value"];

export function BreedSelector({
  value,
  onChange,
}: {
  value: BreedType;
  onChange: (s: BreedType) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-semibold">Select Breed</label>
      <Select value={value} onValueChange={v => onChange(v as BreedType)}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Choose breed..." />
        </SelectTrigger>
        <SelectContent>
          {BREEDS.map((breed) => (
            <SelectItem key={breed.value} value={breed.value}>
              {breed.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
