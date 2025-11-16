import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  imageUrl: string;
  breed: string;
  retinalMode: string;
  filters?: string;
}

export function SocialShareButtons({
  imageUrl,
  breed,
  retinalMode,
  filters,
}: SocialShareButtonsProps) {
  const shareText = `Check out how a ${breed} sees the world! ${retinalMode} vision${filters ? ` with ${filters}` : ""} #DogVision #MyDoggles`;
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `dog-vision-${breed}-${retinalMode}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Photo downloaded!");
  };

  const handleShare = async () => {
    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        // Convert data URL to blob for sharing
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `dog-vision-${breed}.png`, { type: "image/png" });
        
        await navigator.share({
          title: "My Doggles - Dog Vision",
          text: shareText,
          files: [file],
        });
        toast.success("Shared successfully!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
    } else {
      // Fallback to copying share text
      navigator.clipboard.writeText(shareText);
      toast.success("Share text copied to clipboard!");
    }
  };

  const handleTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const handleFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Download
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitter}
        className="gap-2 bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] border-[#1DA1F2]"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleFacebook}
        className="gap-2 bg-[#1877F2] text-white hover:bg-[#166fe5] border-[#1877F2]"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Facebook
      </Button>
    </div>
  );
}
