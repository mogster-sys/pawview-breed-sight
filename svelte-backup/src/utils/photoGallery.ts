import { BreedType } from "@/components/BreedSelector";
import { RetinalMode } from "@/components/RetinalModeSelector";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

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
  fileName: string; // Added for filesystem reference
}

const METADATA_FILE = "pawvision_metadata.json";
const PHOTO_DIR = "pawvision_photos";
const MAX_TEMP_PHOTOS = 10; // Temp storage before moving to device
const RECOMMENDED_MAX_PHOTOS = 100;

// Check if running on native device
const isNative = Capacitor.isNativePlatform();

// Initialize photo directory
async function ensurePhotoDirectory() {
  if (!isNative) return;
  
  try {
    await Filesystem.mkdir({
      path: PHOTO_DIR,
      directory: Directory.Documents,
      recursive: true,
    });
  } catch (e) {
    // Directory might already exist, that's okay
  }
}

// Save metadata to filesystem
async function saveMetadata(photos: SavedPhoto[]): Promise<void> {
  const metadata = photos.map(p => ({
    id: p.id,
    breed: p.breed,
    retinalMode: p.retinalMode,
    filters: p.filters,
    timestamp: p.timestamp,
    fileName: p.fileName,
  }));

  if (isNative) {
    await Filesystem.writeFile({
      path: METADATA_FILE,
      data: JSON.stringify(metadata),
      directory: Directory.Documents,
    });
  } else {
    localStorage.setItem("pawvision_metadata", JSON.stringify(metadata));
  }
}

// Load metadata from filesystem
async function loadMetadata(): Promise<SavedPhoto[]> {
  try {
    let metadataStr: string;
    
    if (isNative) {
      const result = await Filesystem.readFile({
        path: METADATA_FILE,
        directory: Directory.Documents,
      });
      metadataStr = result.data as string;
    } else {
      metadataStr = localStorage.getItem("pawvision_metadata") || "[]";
    }

    return JSON.parse(metadataStr);
  } catch (e) {
    return [];
  }
}

export async function savePhoto(photo: Omit<SavedPhoto, "id" | "timestamp" | "fileName">): Promise<SavedPhoto> {
  await ensurePhotoDirectory();
  
  const fileName = `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.png`;
  const newPhoto: SavedPhoto = {
    ...photo,
    id: fileName,
    timestamp: Date.now(),
    fileName,
    imageData: photo.imageData, // Temporarily keep in memory
  };

  if (isNative) {
    // Save image to device filesystem
    const base64Data = photo.imageData.split(",")[1]; // Remove data:image/png;base64, prefix
    
    await Filesystem.writeFile({
      path: `${PHOTO_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Documents,
    });
  }

  // Update metadata
  const photos = await loadMetadata();
  photos.unshift(newPhoto);
  
  // Keep only metadata in local storage if not native
  if (!isNative && photos.length > MAX_TEMP_PHOTOS) {
    photos.splice(MAX_TEMP_PHOTOS);
  }
  
  await saveMetadata(photos);
  return newPhoto;
}

export async function getGalleryPhotos(page: number = 0, pageSize: number = 20): Promise<SavedPhoto[]> {
  try {
    const metadata = await loadMetadata();
    const start = page * pageSize;
    const end = start + pageSize;
    const pageMeta = metadata.slice(start, end);

    // Load actual image data
    const photosWithData = await Promise.all(
      pageMeta.map(async (meta) => {
        if (isNative) {
          try {
            const result = await Filesystem.readFile({
              path: `${PHOTO_DIR}/${meta.fileName}`,
              directory: Directory.Documents,
            });
            return {
              ...meta,
              imageData: `data:image/png;base64,${result.data}`,
            };
          } catch (e) {
            console.error(`Failed to load photo ${meta.fileName}:`, e);
            return null;
          }
        } else {
          // Web fallback - load from localStorage
          const stored = localStorage.getItem(`pawvision_photo_${meta.id}`);
          return stored ? { ...meta, imageData: stored } : null;
        }
      })
    );

    return photosWithData.filter((p): p is SavedPhoto => p !== null);
  } catch (e) {
    console.error("Error reading gallery:", e);
    return [];
  }
}

export async function deletePhoto(id: string): Promise<void> {
  const metadata = await loadMetadata();
  const photo = metadata.find(p => p.id === id);
  
  if (photo && isNative) {
    try {
      await Filesystem.deleteFile({
        path: `${PHOTO_DIR}/${photo.fileName}`,
        directory: Directory.Documents,
      });
    } catch (e) {
      console.error("Error deleting photo file:", e);
    }
  } else if (!isNative) {
    localStorage.removeItem(`pawvision_photo_${id}`);
  }

  const filtered = metadata.filter(p => p.id !== id);
  await saveMetadata(filtered);
}

export async function clearGallery(): Promise<void> {
  const metadata = await loadMetadata();
  
  if (isNative) {
    // Delete all photo files
    await Promise.all(
      metadata.map(photo => 
        Filesystem.deleteFile({
          path: `${PHOTO_DIR}/${photo.fileName}`,
          directory: Directory.Documents,
        }).catch(e => console.error("Error deleting file:", e))
      )
    );
  } else {
    // Clear localStorage photos
    metadata.forEach(p => localStorage.removeItem(`pawvision_photo_${p.id}`));
  }

  await saveMetadata([]);
}

export async function getPhotoCount(): Promise<number> {
  const metadata = await loadMetadata();
  return metadata.length;
}

export async function getStorageInfo(): Promise<{
  count: number;
  isNative: boolean;
  shouldMoveToDevice: boolean;
  nearLimit: boolean;
}> {
  const count = await getPhotoCount();
  
  return {
    count,
    isNative,
    shouldMoveToDevice: !isNative && count > 5,
    nearLimit: !isNative && count >= MAX_TEMP_PHOTOS - 2,
  };
}

export function isRunningOnDevice(): boolean {
  return isNative;
}
