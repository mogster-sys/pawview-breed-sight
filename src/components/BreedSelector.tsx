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

// Import breed images
import greyhoundIcon from "@/assets/breeds/greyhound.png";
import labradorIcon from "@/assets/breeds/labrador.png";
import bulldogIcon from "@/assets/breeds/bulldog.png";
import pugIcon from "@/assets/breeds/pug.png";
import germanShepherdIcon from "@/assets/breeds/german-shepherd.png";
import beagleIcon from "@/assets/breeds/beagle.png";
import genericIcon from "@/assets/breeds/generic.png";

// Breed icon mapping
const BREED_ICONS: Record<string, string> = {
  greyhound: greyhoundIcon,
  labrador: labradorIcon,
  bulldog: bulldogIcon,
  pug: pugIcon,
  "german-shepherd": germanShepherdIcon,
  beagle: beagleIcon,
  // Use generic icon for breeds without specific images
  generic: genericIcon,
};

const BREEDS = [
  // Dolichocephalic breeds (VS - Visual Streak) - Long snouts
  { value: "greyhound", label: "Greyhound (270°)", keywords: ["greyhound"], icon: BREED_ICONS.greyhound },
  { value: "borzoi", label: "Borzoi (~270°)", keywords: ["borzoi", "russian wolfhound"], icon: genericIcon },
  { value: "saluki", label: "Saluki (~270°)", keywords: ["saluki", "persian greyhound"], icon: genericIcon },
  { value: "afghan-hound", label: "Afghan Hound (~265°)", keywords: ["afghan", "hound"], icon: genericIcon },
  { value: "collie", label: "Collie (~260°)", keywords: ["collie", "rough collie", "border collie"], icon: genericIcon },
  { value: "doberman", label: "Doberman Pinscher (~260°)", keywords: ["doberman", "dobermann"], icon: genericIcon },
  { value: "german-pointer", label: "German Shorthaired Pointer (~250°)", keywords: ["pointer", "german pointer"], icon: genericIcon },
  { value: "dachshund", label: "Dachshund (~250°)", keywords: ["dachshund", "wiener dog", "sausage dog"], icon: genericIcon },
  
  // Mesocephalic breeds (Balanced) - Medium snouts
  { value: "labrador", label: "Labrador Retriever (240°)", keywords: ["labrador", "lab"], icon: BREED_ICONS.labrador },
  { value: "golden-retriever", label: "Golden Retriever (240°)", keywords: ["golden", "retriever"], icon: genericIcon },
  { value: "german-shepherd", label: "German Shepherd (~240°)", keywords: ["german shepherd", "alsatian"], icon: BREED_ICONS["german-shepherd"] },
  { value: "siberian-husky", label: "Siberian Husky (~245°)", keywords: ["husky", "siberian"], icon: genericIcon },
  { value: "australian-shepherd", label: "Australian Shepherd (~240°)", keywords: ["australian shepherd", "aussie"], icon: genericIcon },
  { value: "beagle", label: "Beagle (~235°)", keywords: ["beagle"], icon: BREED_ICONS.beagle },
  { value: "poodle", label: "Poodle (~235°)", keywords: ["poodle", "standard poodle", "miniature poodle"], icon: genericIcon },
  { value: "rottweiler", label: "Rottweiler (~235°)", keywords: ["rottweiler", "rottie"], icon: genericIcon },
  { value: "corgi", label: "Pembroke Welsh Corgi (~230°)", keywords: ["corgi", "corgie", "pembroke", "welsh corgi"], icon: genericIcon },
  { value: "great-dane", label: "Great Dane (~240°)", keywords: ["great dane", "dane"], icon: genericIcon },
  { value: "miniature-schnauzer", label: "Miniature Schnauzer (~230°)", keywords: ["schnauzer", "miniature schnauzer"], icon: genericIcon },
  { value: "yorkshire-terrier", label: "Yorkshire Terrier (~225°)", keywords: ["yorkshire", "yorkie", "terrier"], icon: genericIcon },
  
  // Brachycephalic breeds (AC - Area Centralis) - Flat faces
  { value: "pug", label: "Pug (~195°)", keywords: ["pug"], icon: BREED_ICONS.pug },
  { value: "bulldog", label: "Bulldog (200°)", keywords: ["bulldog", "english bulldog"], icon: BREED_ICONS.bulldog },
  { value: "french-bulldog", label: "French Bulldog (~200°)", keywords: ["french bulldog", "frenchie"], icon: genericIcon },
  { value: "boxer", label: "Boxer (~210°)", keywords: ["boxer"], icon: genericIcon },
  { value: "shih-tzu", label: "Shih Tzu (~190°)", keywords: ["shih tzu", "shitzu"], icon: genericIcon },
  { value: "cavalier", label: "Cavalier King Charles Spaniel (~200°)", keywords: ["cavalier", "king charles", "spaniel"], icon: genericIcon },
  
  { value: "custom", label: "Custom/Mixed Breed", keywords: ["custom", "mixed", "mutt"], icon: BREED_ICONS.generic },
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
            <span className="flex items-center gap-2">
              {selectedBreed && (
                <img 
                  src={selectedBreed.icon} 
                  alt={selectedBreed.label} 
                  className="w-6 h-6 object-contain"
                />
              )}
              {selectedBreed ? selectedBreed.label : "Choose breed..."}
            </span>
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
                    <img 
                      src={breed.icon} 
                      alt={breed.label} 
                      className="w-6 h-6 object-contain mr-2"
                    />
                    <span className="flex-1">{breed.label}</span>
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        value === breed.value ? "opacity-100" : "opacity-0"
                      )}
                    />
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
