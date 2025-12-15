export type RetinalMode = 'visual-streak' | 'area-centralis';

export type BreedType =
  | 'labrador'
  | 'greyhound'
  | 'pug'
  | 'beagle'
  | 'golden-retriever'
  | 'german-shepherd'
  | 'bulldog'
  | 'french-bulldog'
  | 'boxer'
  | 'collie'
  | 'doberman'
  | 'german-pointer'
  | 'dachshund'
  | 'siberian-husky'
  | 'australian-shepherd'
  | 'poodle'
  | 'rottweiler'
  | 'corgi'
  | 'great-dane'
  | 'miniature-schnauzer'
  | 'yorkshire-terrier'
  | 'borzoi'
  | 'saluki'
  | 'afghan-hound'
  | 'shih-tzu'
  | 'cavalier'
  | 'custom';

export interface Filters {
  dichro: boolean;
  contrast: boolean;
  brightness: boolean;
}
