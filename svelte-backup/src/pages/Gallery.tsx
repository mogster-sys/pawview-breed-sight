import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";
import { SavedPhoto, getGalleryPhotos, deletePhoto, clearGallery, getStorageInfo } from "@/utils/photoGallery";
import { StorageWarning } from "@/components/StorageWarning";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download, Trash, ChevronLeft, ChevronRight, Share2, Users } from "lucide-react";
import { toast } from "sonner";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCommunityPhotos } from "@/hooks/useCommunityPhotos";
import { CommunityPhotoCard } from "@/components/CommunityPhotoCard";
import { useAuth } from "@/contexts/AuthContext";
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

const PAGE_SIZE = 20;

export default function Gallery() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<SavedPhoto[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [storageInfo, setStorageInfo] = useState({
    count: 0,
    isNative: false,
    shouldMoveToDevice: false,
    nearLimit: false,
  });
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [photoToShare, setPhotoToShare] = useState<SavedPhoto | null>(null);
  const [activeTab, setActiveTab] = useState<"my-photos" | "community">("my-photos");
  const { photos: communityPhotos, loading: communityLoading, refetch: refetchCommunity } = useCommunityPhotos();

  useEffect(() => {
    loadPhotos(0);
    loadStorageInfo();
  }, []);

  const loadStorageInfo = async () => {
    const info = await getStorageInfo();
    setStorageInfo(info);
  };

  const loadPhotos = async (page: number) => {
    const loaded = await getGalleryPhotos(page, PAGE_SIZE);
    setPhotos(loaded);
    setCurrentPage(page);
    
    // Check if there are more photos
    const nextPage = await getGalleryPhotos(page + 1, 1);
    setHasMore(nextPage.length > 0);
  };

  const handleDelete = async (id: string) => {
    await deletePhoto(id);
    setPhotos(prev => prev.filter(p => p.id !== id));
    setSelectedPhotos(prev => prev.filter(pid => pid !== id));
    await loadStorageInfo();
    toast.success("Photo deleted");
  };

  const handleClearAll = async () => {
    await clearGallery();
    setPhotos([]);
    setSelectedPhotos([]);
    await loadStorageInfo();
    toast.success("Gallery cleared");
  };

  const handleNextPage = () => {
    if (hasMore) {
      loadPhotos(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      loadPhotos(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      <SEO
        title="Photo Gallery"
        description="View and compare your saved dog vision photos. Explore community uploads and see how different dog breeds perceive the world."
        canonical="/gallery"
      />
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10 px-4 pb-10">
        {/* Storage Warning */}
        <div className="mb-6">
          <StorageWarning {...storageInfo} />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-bold text-3xl text-blue-800 mb-2">
              Photo Gallery
            </h1>
          </div>
          {activeTab === "my-photos" && photos.length > 0 && (
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="my-photos">
              My Photos ({storageInfo.count})
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-photos" className="mt-6">
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
                            setPhotoToShare(photo);
                            setShareDialogOpen(true);
                          }}
                          className="h-7 w-7 p-0"
                          title="Share"
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadPhoto(photo);
                          }}
                          className="h-7 w-7 p-0"
                          title="Download"
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
                          title="Delete"
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

        {/* Pagination */}
        {photos.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage + 1}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={!hasMore}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            {!user ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500 mb-4">Sign in to view community photos</p>
                <Button asChild>
                  <a href="/auth">Sign In</a>
                </Button>
              </Card>
            ) : communityLoading ? (
              <div className="text-center p-12">
                <p className="text-gray-500">Loading community photos...</p>
              </div>
            ) : communityPhotos.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500 mb-4">No community photos yet</p>
                <p className="text-sm text-muted-foreground">
                  Be the first to share your dog vision photos!
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityPhotos.map(photo => (
                  <CommunityPhotoCard
                    key={photo.id}
                    photo={photo}
                    onUpdate={refetchCommunity}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Dog Vision Photo!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {photoToShare && (
              <>
                <div className="flex justify-center">
                  <img
                    src={photoToShare.imageData}
                    alt="Photo to share"
                    className="max-w-full h-auto rounded-lg border"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
                <SocialShareButtons
                  imageUrl={photoToShare.imageData}
                  breed={photoToShare.breed}
                  retinalMode={photoToShare.retinalMode}
                  filters={
                    Object.entries(photoToShare.filters)
                      .filter(([_, v]) => v)
                      .map(([k]) => k)
                      .join(", ") || "none"
                  }
                />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
