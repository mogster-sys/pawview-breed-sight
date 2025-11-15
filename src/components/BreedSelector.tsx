import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(false);

  const selectedBreed = BREEDS.find((breed) => breed.value === value);

  return (
    <div>
      <label className="block mb-2 text-sm font-semibold">Select Breed</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full max-w-md justify-between"
          >
            {selectedBreed ? selectedBreed.label : "Choose breed..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-0 bg-background border shadow-lg" style={{ zIndex: 50 }}>
          <Command className="bg-background">
            <CommandInput placeholder="Search breeds..." className="h-9" />
            <CommandList>
              <CommandEmpty>No breed found.</CommandEmpty>
              <CommandGroup>
                {BREEDS.map((breed) => (
                  <CommandItem
                    key={breed.value}
                    value={breed.value}
                    keywords={[breed.label]}
                    onSelect={(currentValue) => {
                      onChange(currentValue as BreedType);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === breed.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {breed.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-muted-foreground mt-1">~ indicates estimated field of view</p>
    </div>
  );
}
