import type { BreedType, RetinalMode } from "$lib/types";

export interface BreedConfig {
  name: string;
  retinalMode: RetinalMode;
  description: string;
}

// Breed-specific retinal configurations based on canine vision research
export const breedConfigurations: Record<BreedType, BreedConfig> = {
  // Visual Streak breeds - optimized for horizon scanning and motion detection
  'labrador': {
    name: 'Labrador Retriever',
    retinalMode: 'visual-streak',
    description: 'Wide peripheral vision for hunting and retrieving'
  },
  'greyhound': {
    name: 'Greyhound',
    retinalMode: 'visual-streak',
    description: 'Exceptional motion tracking for pursuit'
  },
  'golden-retriever': {
    name: 'Golden Retriever',
    retinalMode: 'visual-streak',
    description: 'Wide field vision for hunting'
  },
  'german-shepherd': {
    name: 'German Shepherd',
    retinalMode: 'visual-streak',
    description: 'Alert scanning for herding and protection'
  },
  'collie': {
    name: 'Border Collie',
    retinalMode: 'visual-streak',
    description: 'Wide vision for herding livestock'
  },
  'doberman': {
    name: 'Doberman Pinscher',
    retinalMode: 'visual-streak',
    description: 'Vigilant scanning for guarding'
  },
  'german-pointer': {
    name: 'German Shorthaired Pointer',
    retinalMode: 'visual-streak',
    description: 'Hunting and pointing vision'
  },
  'siberian-husky': {
    name: 'Siberian Husky',
    retinalMode: 'visual-streak',
    description: 'Wide field vision for sledding'
  },
  'australian-shepherd': {
    name: 'Australian Shepherd',
    retinalMode: 'visual-streak',
    description: 'Herding vision with wide periphery'
  },
  'rottweiler': {
    name: 'Rottweiler',
    retinalMode: 'visual-streak',
    description: 'Guarding and protection vision'
  },
  'great-dane': {
    name: 'Great Dane',
    retinalMode: 'visual-streak',
    description: 'Large breed with wide field vision'
  },
  'borzoi': {
    name: 'Borzoi (Russian Wolfhound)',
    retinalMode: 'visual-streak',
    description: 'Sight hound with extreme motion tracking'
  },
  'saluki': {
    name: 'Saluki',
    retinalMode: 'visual-streak',
    description: 'Ancient sight hound with pursuit vision'
  },
  'afghan-hound': {
    name: 'Afghan Hound',
    retinalMode: 'visual-streak',
    description: 'Sight hound optimized for hunting'
  },
  'dachshund': {
    name: 'Dachshund',
    retinalMode: 'visual-streak',
    description: 'Low profile hunting vision'
  },

  // Area Centralis breeds - optimized for central focus and close-up tasks
  'pug': {
    name: 'Pug',
    retinalMode: 'area-centralis',
    description: 'Brachycephalic with central focus'
  },
  'beagle': {
    name: 'Beagle',
    retinalMode: 'area-centralis',
    description: 'Scent hound with focused vision'
  },
  'bulldog': {
    name: 'English Bulldog',
    retinalMode: 'area-centralis',
    description: 'Brachycephalic companion breed'
  },
  'french-bulldog': {
    name: 'French Bulldog',
    retinalMode: 'area-centralis',
    description: 'Flat-faced with central focus'
  },
  'boxer': {
    name: 'Boxer',
    retinalMode: 'area-centralis',
    description: 'Brachycephalic working breed'
  },
  'poodle': {
    name: 'Poodle',
    retinalMode: 'area-centralis',
    description: 'Companion breed with detailed vision'
  },
  'corgi': {
    name: 'Welsh Corgi',
    retinalMode: 'area-centralis',
    description: 'Short-legged herder with close focus'
  },
  'miniature-schnauzer': {
    name: 'Miniature Schnauzer',
    retinalMode: 'area-centralis',
    description: 'Small breed with attentive vision'
  },
  'yorkshire-terrier': {
    name: 'Yorkshire Terrier',
    retinalMode: 'area-centralis',
    description: 'Toy breed with focused vision'
  },
  'shih-tzu': {
    name: 'Shih Tzu',
    retinalMode: 'area-centralis',
    description: 'Flat-faced companion breed'
  },
  'cavalier': {
    name: 'Cavalier King Charles Spaniel',
    retinalMode: 'area-centralis',
    description: 'Companion breed with central focus'
  },

  // Custom for user experimentation
  'custom': {
    name: 'Custom',
    retinalMode: 'visual-streak',
    description: 'Manual configuration'
  }
};

// Get retinal mode for a specific breed
export function getRetinalModeForBreed(breed: BreedType): RetinalMode {
  return breedConfigurations[breed].retinalMode;
}

// Get all breeds grouped by retinal mode
export function getBreedsByRetinalMode(): {
  'visual-streak': BreedType[];
  'area-centralis': BreedType[];
} {
  const visualStreak: BreedType[] = [];
  const areaCentralis: BreedType[] = [];

  (Object.keys(breedConfigurations) as BreedType[]).forEach(breed => {
    if (breed === 'custom') return; // Skip custom

    if (breedConfigurations[breed].retinalMode === 'visual-streak') {
      visualStreak.push(breed);
    } else {
      areaCentralis.push(breed);
    }
  });

  return {
    'visual-streak': visualStreak,
    'area-centralis': areaCentralis
  };
}

// Get display name for a breed
export function getBreedDisplayName(breed: BreedType): string {
  return breedConfigurations[breed].name;
}

// Get breed description
export function getBreedDescription(breed: BreedType): string {
  return breedConfigurations[breed].description;
}
