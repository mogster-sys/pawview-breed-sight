import { BreedType } from "@/components/BreedSelector";
import { RetinalMode } from "@/components/RetinalModeSelector";

export interface SavedPhoto {
  id: string;
  imageData: string; // base64 data URL
  breed: BreedType;
  retinalMode: RetinalMode;
  filters: {
    dichro: boolean;
    contrast: boolean;
    brightness: boolean;
  };
  timestamp: number;
}

const STORAGE_KEY = "pawvision_gallery";
const MAX_PHOTOS = 50; // Limit to prevent localStorage overflow

export function savePhoto(photo: Omit<SavedPhoto, "id" | "timestamp">): SavedPhoto {
  const photos = getGalleryPhotos();
  
  const newPhoto: SavedPhoto = {
    ...photo,
    id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };
  
  // Add to beginning of array (newest first)
  photos.unshift(newPhoto);
  
  // Keep only the most recent MAX_PHOTOS
  const trimmedPhotos = photos.slice(0, MAX_PHOTOS);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedPhotos));
    return newPhoto;
  } catch (e) {
    // localStorage full - try removing oldest photos
    const reducedPhotos = photos.slice(0, Math.floor(MAX_PHOTOS / 2));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedPhotos));
    throw new Error("Gallery storage full. Oldest photos were removed.");
  }
}

export function getGalleryPhotos(): SavedPhoto[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error reading gallery:", e);
    return [];
  }
}

export function deletePhoto(id: string): void {
  const photos = getGalleryPhotos();
  const filtered = photos.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearGallery(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getPhotoCount(): number {
  return getGalleryPhotos().length;
}
