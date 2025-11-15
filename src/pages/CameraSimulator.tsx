
import React, { useRef, useEffect, useState } from "react";
import { BreedSelector, BreedType } from "@/components/BreedSelector";
import { RetinalModeSelector, RetinalMode, getRetinalModeDescription } from "@/components/RetinalModeSelector";
import { FieldOfViewOverlay } from "@/components/FieldOfViewOverlay";
import { CameraFilters } from "@/components/CameraFilters";
import { SplitComparison } from "@/components/SplitComparison";
import { Navbar } from "@/components/Navbar";
import { toast } from "sonner";
import { dogVisionFilter } from "@/utils/dogVisionFilters";

const VIDEO_W = 700;
const VIDEO_H = 440;

// Save canvas as PNG
function saveCanvas(canvas: HTMLCanvasElement, label:string="pawvision") {
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `${label}-${Date.now()}.png`;
  a.click();
}

const CAMERA_ERROR_HINT = (
  <span>
    Could not access your camera. Please check browser permissions!
    <br />
    On iOS Safari, camera only works from homescreen or secure https.
  </span>
);

const BREED_FIELD_DESC: Record<BreedType, string> = {
  greyhound: "Extremely wide field of view; strong peripheral awareness.",
  labrador: "Broad visual field balanced for utility & play.",
  bulldog: "Reduced peripheral vision; more central focus.",
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
            <button
              className={`mt-4 py-2 px-5 rounded-lg text-white font-semibold transition bg-yellow-500 hover:bg-yellow-600 shadow ${snapshotReady ? "" : "opacity-60 pointer-events-none"}`}
              onClick={() => {
                // Save dog vision canvas
                if (canvasDogRef.current) saveCanvas(canvasDogRef.current, "pawvision-dogview");
              }}
              disabled={!snapshotReady}
            >
              Capture Dog Vision Photo
            </button>
            {error === "camera" && (
              <div className="text-red-600 mt-4 text-sm">{CAMERA_ERROR_HINT}</div>
            )}
          </div>
          <div className="w-full flex-1 flex flex-col gap-3 items-center">
            <div style={{ width: VIDEO_W, height: VIDEO_H, position: "relative" }}>
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
                </div>
              </SplitComparison>
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
              Move the slider to compare Human and Dog views
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
