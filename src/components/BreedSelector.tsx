
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BREEDS = [
  // Dolichocephalic breeds (VS - Visual Streak)
  { value: "greyhound", label: "Greyhound (270°)" },
  { value: "doberman", label: "Doberman Pinscher (~260°)" },
  { value: "german-pointer", label: "German Shorthaired Pointer (~250°)" },
  { value: "dachshund", label: "Dachshund (~250°)" },
  
  // Mesocephalic breeds (Balanced)
  { value: "labrador", label: "Labrador Retriever (240°)" },
  { value: "golden-retriever", label: "Golden Retriever (240°)" },
  { value: "german-shepherd", label: "German Shepherd (~240°)" },
  { value: "siberian-husky", label: "Siberian Husky (~245°)" },
  { value: "australian-shepherd", label: "Australian Shepherd (~240°)" },
  { value: "beagle", label: "Beagle (~235°)" },
  { value: "poodle", label: "Poodle (~235°)" },
  { value: "rottweiler", label: "Rottweiler (~235°)" },
  { value: "corgi", label: "Pembroke Welsh Corgi (~230°)" },
  { value: "great-dane", label: "Great Dane (~240°)" },
  { value: "miniature-schnauzer", label: "Miniature Schnauzer (~230°)" },
  
  // Brachycephalic breeds (AC - Area Centralis)
  { value: "bulldog", label: "Bulldog (200°)" },
  { value: "french-bulldog", label: "French Bulldog (~200°)" },
  { value: "boxer", label: "Boxer (~210°)" },
  { value: "shih-tzu", label: "Shih Tzu (~190°)" },
  { value: "yorkshire-terrier", label: "Yorkshire Terrier (~195°)" },
  { value: "cavalier", label: "Cavalier King Charles Spaniel (~200°)" },
  
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
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="Choose breed..." />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {BREEDS.map((breed) => (
            <SelectItem key={breed.value} value={breed.value}>
              {breed.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground mt-1">~ indicates estimated field of view</p>
    </div>
  );
}
