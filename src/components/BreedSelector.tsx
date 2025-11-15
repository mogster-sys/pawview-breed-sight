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
  // Dolichocephalic breeds (VS - Visual Streak) - Long snouts
  { value: "greyhound", label: "Greyhound (270°)", keywords: ["greyhound"] },
  { value: "borzoi", label: "Borzoi (~270°)", keywords: ["borzoi", "russian wolfhound"] },
  { value: "saluki", label: "Saluki (~270°)", keywords: ["saluki", "persian greyhound"] },
  { value: "afghan-hound", label: "Afghan Hound (~265°)", keywords: ["afghan", "hound"] },
  { value: "collie", label: "Collie (~260°)", keywords: ["collie", "rough collie", "border collie"] },
  { value: "doberman", label: "Doberman Pinscher (~260°)", keywords: ["doberman", "dobermann"] },
  { value: "german-pointer", label: "German Shorthaired Pointer (~250°)", keywords: ["pointer", "german pointer"] },
  { value: "dachshund", label: "Dachshund (~250°)", keywords: ["dachshund", "wiener dog", "sausage dog"] },
  
  // Mesocephalic breeds (Balanced) - Medium snouts
  { value: "labrador", label: "Labrador Retriever (240°)", keywords: ["labrador", "lab"] },
  { value: "golden-retriever", label: "Golden Retriever (240°)", keywords: ["golden", "retriever"] },
  { value: "german-shepherd", label: "German Shepherd (~240°)", keywords: ["german shepherd", "alsatian"] },
  { value: "siberian-husky", label: "Siberian Husky (~245°)", keywords: ["husky", "siberian"] },
  { value: "australian-shepherd", label: "Australian Shepherd (~240°)", keywords: ["australian shepherd", "aussie"] },
  { value: "beagle", label: "Beagle (~235°)", keywords: ["beagle"] },
  { value: "poodle", label: "Poodle (~235°)", keywords: ["poodle", "standard poodle", "miniature poodle"] },
  { value: "rottweiler", label: "Rottweiler (~235°)", keywords: ["rottweiler", "rottie"] },
  { value: "corgi", label: "Pembroke Welsh Corgi (~230°)", keywords: ["corgi", "corgie", "pembroke", "welsh corgi"] },
  { value: "great-dane", label: "Great Dane (~240°)", keywords: ["great dane", "dane"] },
  { value: "miniature-schnauzer", label: "Miniature Schnauzer (~230°)", keywords: ["schnauzer", "miniature schnauzer"] },
  { value: "yorkshire-terrier", label: "Yorkshire Terrier (~225°)", keywords: ["yorkshire", "yorkie", "terrier"] },
  
  // Brachycephalic breeds (AC - Area Centralis) - Flat faces
  { value: "pug", label: "Pug (~195°)", keywords: ["pug"] },
  { value: "bulldog", label: "Bulldog (200°)", keywords: ["bulldog", "english bulldog"] },
  { value: "french-bulldog", label: "French Bulldog (~200°)", keywords: ["french bulldog", "frenchie"] },
  { value: "boxer", label: "Boxer (~210°)", keywords: ["boxer"] },
  { value: "shih-tzu", label: "Shih Tzu (~190°)", keywords: ["shih tzu", "shitzu"] },
  { value: "cavalier", label: "Cavalier King Charles Spaniel (~200°)", keywords: ["cavalier", "king charles", "spaniel"] },
  
  { value: "custom", label: "Custom/Mixed Breed", keywords: ["custom", "mixed", "mutt"] },
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
                    keywords={breed.keywords}
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
