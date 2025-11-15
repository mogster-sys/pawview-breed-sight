import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SavedPhoto, getGalleryPhotos, deletePhoto, clearGallery } from "@/utils/photoGallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Gallery() {
  const [photos, setPhotos] = useState<SavedPhoto[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    setPhotos(getGalleryPhotos());
  };

  const handleDelete = (id: string) => {
    deletePhoto(id);
    setPhotos(prev => prev.filter(p => p.id !== id));
    setSelectedPhotos(prev => prev.filter(pid => pid !== id));
    toast.success("Photo deleted");
  };

  const handleClearAll = () => {
    clearGallery();
    setPhotos([]);
    setSelectedPhotos([]);
    toast.success("Gallery cleared");
  };

  const toggleSelection = (id: string) => {
    setSelectedPhotos(prev => {
      if (prev.includes(id)) {
        return prev.filter(pid => pid !== id);
      }
      if (prev.length >= 4) {
        toast.error("Maximum 4 photos can be compared at once");
        return prev;
      }
      return [...prev, id];
    });
  };

  const downloadPhoto = (photo: SavedPhoto) => {
    const a = document.createElement("a");
    a.href = photo.imageData;
    a.download = `pawvision-${photo.breed}-${photo.retinalMode}-${new Date(photo.timestamp).toISOString()}.png`;
    a.click();
    toast.success("Photo downloaded");
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const selectedPhotoObjects = photos.filter(p => selectedPhotos.includes(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 to-yellow-50">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10 px-4 pb-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-bold text-3xl text-blue-800 mb-2">
              Photo Gallery
            </h1>
            <p className="text-gray-600">
              {photos.length} saved {photos.length === 1 ? 'photo' : 'photos'} • 
              Select up to 4 to compare
            </p>
          </div>
          {photos.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear entire gallery?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all {photos.length} saved photos. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll}>
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {/* Comparison View */}
        {selectedPhotos.length > 0 && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-xl text-blue-800">
                Comparison View ({selectedPhotos.length}/4 selected)
              </h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedPhotos([])}
              >
                Clear Selection
              </Button>
            </div>
            <div className={`grid gap-4 ${
              selectedPhotos.length === 1 ? 'grid-cols-1' :
              selectedPhotos.length === 2 ? 'grid-cols-2' :
              selectedPhotos.length === 3 ? 'grid-cols-3' :
              'grid-cols-2 md:grid-cols-4'
            }`}>
              {selectedPhotoObjects.map(photo => (
                <div key={photo.id} className="border rounded-lg p-3 bg-gray-50">
                  <img 
                    src={photo.imageData} 
                    alt={`${photo.breed} ${photo.retinalMode}`}
                    className="w-full rounded mb-2 border"
                  />
                  <div className="text-xs space-y-1">
                    <div className="font-semibold text-blue-700">{photo.breed}</div>
                    <div className="text-gray-600">
                      {photo.retinalMode === "area-centralis" ? "AC" : "VS"}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {photo.filters.dichro && <Badge variant="secondary" className="text-xs">Dichro</Badge>}
                      {photo.filters.contrast && <Badge variant="secondary" className="text-xs">Contrast</Badge>}
                      {photo.filters.brightness && <Badge variant="secondary" className="text-xs">Bright</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {photos.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 mb-4">No photos saved yet</p>
            <Button asChild>
              <a href="/camera">Go to Camera</a>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {photos.map(photo => (
              <Card 
                key={photo.id} 
                className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  selectedPhotos.includes(photo.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => toggleSelection(photo.id)}
              >
                <CardContent className="p-0">
                  <img 
                    src={photo.imageData} 
                    alt={`${photo.breed} ${photo.retinalMode}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-sm text-blue-800">
                          {photo.breed}
                        </div>
                        <div className="text-xs text-gray-500">
                          {photo.retinalMode === "area-centralis" ? "Area Centralis" : "Visual Streak"}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadPhoto(photo);
                          }}
                          className="h-7 w-7 p-0"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(photo.id);
                          }}
                          className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap mb-2">
                      {photo.filters.dichro && (
                        <Badge variant="secondary" className="text-xs">Dichromatic</Badge>
                      )}
                      {photo.filters.contrast && (
                        <Badge variant="secondary" className="text-xs">High Contrast</Badge>
                      )}
                      {photo.filters.brightness && (
                        <Badge variant="secondary" className="text-xs">Brightened</Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(photo.timestamp)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
