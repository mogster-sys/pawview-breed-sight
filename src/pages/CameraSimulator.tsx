
import React, { useRef, useEffect, useState } from "react";
import { BreedSelector, BreedType } from "@/components/BreedSelector";
import { RetinalModeSelector, RetinalMode, getRetinalModeDescription } from "@/components/RetinalModeSelector";
import { FieldOfViewOverlay } from "@/components/FieldOfViewOverlay";
import { RetinalZoneOverlay } from "@/components/RetinalZoneOverlay";
import { CameraFilters } from "@/components/CameraFilters";
import { SplitComparison } from "@/components/SplitComparison";
import { Navbar } from "@/components/Navbar";
import { toast } from "sonner";
import { dogVisionFilter } from "@/utils/dogVisionFilters";
import { savePhoto, getPhotoCount } from "@/utils/photoGallery";
import { Button } from "@/components/ui/button";
import { ImagePlus, Folder, SplitSquareHorizontal, Eye, User, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VIDEO_W = 700;
const VIDEO_H = 440;

// Get canvas as data URL
function getCanvasDataURL(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png");
}

const CAMERA_ERROR_HINT = (
  <span>
    Could not access your camera. Please check browser permissions!
    <br />
    On iOS Safari, camera only works from homescreen or secure https.
  </span>
);

const BREED_FIELD_DESC: Record<BreedType, string> = {
  // Dolichocephalic (VS)
  greyhound: "Extremely wide field of view (270°); exceptional peripheral awareness for tracking prey.",
  borzoi: "Extremely wide field (~270°); Russian sighthound bred for scanning vast landscapes.",
  saluki: "Extremely wide field (~270°); ancient Persian sighthound optimized for desert hunting.",
  "afghan-hound": "Very wide field (~265°); elegant sighthound with superior peripheral vision.",
  collie: "Wide field (~260°); herding breed with excellent motion detection across landscapes.",
  doberman: "Wide field of view (~260°); excellent for guarding and detecting motion.",
  "german-pointer": "Broad field (~250°); optimized for scanning landscapes while hunting.",
  dachshund: "Wide field (~250°) despite short stature; built for tracking in burrows.",
  
  // Mesocephalic (Balanced)
  labrador: "Balanced visual field (240°); versatile for work and companionship.",
  "golden-retriever": "Broad balanced field (240°); excellent all-around vision for retrieving.",
  "german-shepherd": "Well-balanced field (~240°); optimal for working and protection roles.",
  "siberian-husky": "Wide balanced field (~245°); adapted for scanning snowy landscapes.",
  "australian-shepherd": "Balanced field (~240°); great for herding and tracking movement.",
  beagle: "Moderate field (~235°); tuned for scent tracking with good peripheral vision.",
  poodle: "Balanced field (~235°); versatile vision for water work and companionship.",
  rottweiler: "Solid balanced field (~235°); good depth perception for guarding.",
  corgi: "Moderate field (~230°); lower vantage point with decent peripheral vision.",
  "great-dane": "Balanced field (~240°); elevated perspective with good range.",
  "miniature-schnauzer": "Moderate field (~230°); alert vision for vermin hunting.",
  "yorkshire-terrier": "Moderate-balanced field (~225°); alert companion with decent peripheral vision.",
  
  // Brachycephalic (AC)
  pug: "Reduced field (~195°); compact companion breed with strong central focus and excellent TV-watching ability.",
  bulldog: "Narrower field (200°); enhanced central focus with reduced periphery.",
  "french-bulldog": "Limited field (~200°); stronger central acuity for face-to-face interaction.",
  boxer: "Moderate-narrow field (~210°); better central focus than peripheral.",
  "shih-tzu": "Reduced field (~190°); optimized for close companionship and eye contact.",
  cavalier: "Reduced field (~200°); excellent for direct eye contact and bonding.",
  
  custom: "Tweak settings below for your dog's unique vision!",
};

export default function CameraSimulator() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasDogRef = useRef<HTMLCanvasElement>(null);
  const canvasHumanRef = useRef<HTMLCanvasElement>(null);

  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [breed, setBreed] = useState<BreedType>("labrador");
  const [retinalMode, setRetinalMode] = useState<RetinalMode>("visual-streak");
  const [filters, setFilters] = useState({ dichro: true, contrast: false, brightness: false });
  const [snapshotReady, setSnapshotReady] = useState(false);
  const [galleryCount, setGalleryCount] = useState(0);
  const [viewMode, setViewMode] = useState<"split" | "dog" | "human">("split");
  const [showZoneOverlay, setShowZoneOverlay] = useState(true);

  useEffect(() => {
    setGalleryCount(getPhotoCount());
  }, []);

  // Camera feed setup
  useEffect(() => {
    let stream: MediaStream;
    navigator.mediaDevices.getUserMedia({ video: { width: VIDEO_W, height: VIDEO_H } })
      .then(s => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setStreaming(true);
        setError(null);
        toast.success("Camera ready! Drag slider to compare.");
      })
      .catch(() => {
        setError("camera");
        setStreaming(false);
      });
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Draw frames to canvas for both modes
  useEffect(() => {
    let id: number;
    function drawFrame() {
      if (!videoRef.current) return;
      const v = videoRef.current;
      if (canvasHumanRef.current) {
        const ctxH = canvasHumanRef.current.getContext("2d");
        if (ctxH) ctxH.drawImage(v, 0, 0, VIDEO_W, VIDEO_H);
      }
      if (canvasDogRef.current) {
        const ctxD = canvasDogRef.current.getContext("2d");
        if (ctxD) {
          ctxD.drawImage(v, 0, 0, VIDEO_W, VIDEO_H);
          dogVisionFilter(ctxD, VIDEO_W, VIDEO_H, filters, retinalMode);
        }
      }
      setSnapshotReady(true);
      id = requestAnimationFrame(drawFrame);
    }
    if (streaming) {
      drawFrame();
    }
    return () => { cancelAnimationFrame(id); }
  }, [streaming, filters, retinalMode]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 to-yellow-50">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 flex flex-col items-center">
        <h1 className="font-bold text-3xl text-blue-800 mb-3">
          Dog Vision Camera Simulator
        </h1>
        <p className="mb-6 text-lg text-gray-600 text-center">
          View the world through your dog's eyes!<br />
          <span className="text-sm text-blue-700">
            Choose breed, retinal configuration (AC for central focus or VS for horizon scanning), drag to compare vision, and filter in real-time.
          </span>
        </p>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
          <div className="flex flex-col gap-4 flex-1">
            <BreedSelector value={breed} onChange={setBreed} />
            <RetinalModeSelector value={retinalMode} onChange={setRetinalMode} />
            <div className="bg-white border shadow-lg rounded-lg p-4 flex flex-col gap-2 w-full mt-2">
              <span className="font-bold text-base text-blue-700 mb-1">Retinal Configuration:</span>
              <span className="text-gray-700">{getRetinalModeDescription(retinalMode)}</span>
            </div>
            <div className="bg-white border shadow-lg rounded-lg p-4 flex flex-col gap-2 w-full mt-2">
              <span className="font-bold text-base text-blue-700 mb-1">Field of View:</span>
              <span className="text-gray-700">{BREED_FIELD_DESC[breed]}</span>
            </div>
            <CameraFilters filters={filters} setFilters={setFilters} />
            <div className="flex gap-2 mt-4">
              <Button
                className="flex-1"
                onClick={() => {
                  if (canvasDogRef.current) {
                    const imageData = getCanvasDataURL(canvasDogRef.current);
                    savePhoto({
                      imageData,
                      breed,
                      retinalMode,
                      filters,
                    });
                    setGalleryCount(getPhotoCount());
                    toast.success("Photo saved to gallery!");
                  }
                }}
                disabled={!snapshotReady}
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                Save to Gallery
              </Button>
              <Button
                variant="outline"
                asChild
              >
                <Link to="/gallery">
                  <Folder className="w-4 h-4 mr-2" />
                  Gallery ({galleryCount})
                </Link>
              </Button>
            </div>
            {error === "camera" && (
              <div className="text-red-600 mt-4 text-sm">{CAMERA_ERROR_HINT}</div>
            )}
          </div>
          <div className="w-full flex-1 flex flex-col gap-3 items-center">
            {/* View Mode Toggle and Zone Overlay Toggle */}
            <div className="flex items-center gap-4 w-full justify-center">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)} className="w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="split" className="flex items-center gap-2">
                  <SplitSquareHorizontal className="w-4 h-4" />
                  Split View
                </TabsTrigger>
                <TabsTrigger value="dog" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Dog Only
                </TabsTrigger>
                <TabsTrigger value="human" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Human Only
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {viewMode !== "human" && (
              <Button
                variant={showZoneOverlay ? "default" : "outline"}
                size="sm"
                onClick={() => setShowZoneOverlay(!showZoneOverlay)}
                className="flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                {showZoneOverlay ? "Hide" : "Show"} Zone
              </Button>
            )}
          </div>

            <div style={{ width: VIDEO_W, height: VIDEO_H, position: "relative" }}>
              {viewMode === "split" ? (
                <SplitComparison width={VIDEO_W} height={VIDEO_H}>
                  {/* Human View */}
                  <canvas
                    ref={canvasHumanRef}
                    width={VIDEO_W}
                    height={VIDEO_H}
                    style={{ width: VIDEO_W, height: VIDEO_H, background: "#222" }}
                  />
                  {/* Dog View */}
                  <div style={{ position: "relative", width: VIDEO_W, height: VIDEO_H }}>
                    <canvas
                      ref={canvasDogRef}
                      width={VIDEO_W}
                      height={VIDEO_H}
                      style={{ width: VIDEO_W, height: VIDEO_H, background: "#222" }}
                    />
                    <FieldOfViewOverlay width={VIDEO_W} height={VIDEO_H} breed={breed} />
                    {showZoneOverlay && <RetinalZoneOverlay width={VIDEO_W} height={VIDEO_H} mode={retinalMode} />}
                  </div>
                </SplitComparison>
              ) : viewMode === "dog" ? (
                <div style={{ position: "relative", width: VIDEO_W, height: VIDEO_H }}>
                  <canvas
                    ref={canvasDogRef}
                    width={VIDEO_W}
                    height={VIDEO_H}
                    style={{ width: VIDEO_W, height: VIDEO_H, background: "#222" }}
                  />
                  <FieldOfViewOverlay width={VIDEO_W} height={VIDEO_H} breed={breed} />
                  {showZoneOverlay && <RetinalZoneOverlay width={VIDEO_W} height={VIDEO_H} mode={retinalMode} />}
                </div>
              ) : (
                <canvas
                  ref={canvasHumanRef}
                  width={VIDEO_W}
                  height={VIDEO_H}
                  style={{ width: VIDEO_W, height: VIDEO_H, background: "#222" }}
                />
              )}
              {/* Hidden video */}
              <video
                ref={videoRef}
                width={VIDEO_W}
                height={VIDEO_H}
                style={{ display: "none" }}
                playsInline
                muted
              />
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {viewMode === "split" && "Drag the slider to compare Human and Dog views"}
              {viewMode === "dog" && "Viewing: Dog Vision with selected retinal configuration"}
              {viewMode === "human" && "Viewing: Human Vision (unfiltered camera feed)"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
