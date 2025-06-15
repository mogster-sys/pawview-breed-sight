
import React, { useRef, useEffect, useState } from "react";
import { BreedSelector, BreedType } from "@/components/BreedSelector";
import { FieldOfViewOverlay } from "@/components/FieldOfViewOverlay";
import { CameraFilters } from "@/components/CameraFilters";
import { SplitComparison } from "@/components/SplitComparison";
import { Navbar } from "@/components/Navbar";
import { toast } from "sonner";

const VIDEO_W = 700;
const VIDEO_H = 440;

// Helper: basic dog color filter (blue-yellow, block red)
function dogVisionFilter(ctx: CanvasRenderingContext2D, w: number, h: number, filters: { dichro: boolean; contrast: boolean; brightness: boolean }) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    let [r,g,b] = [d[i], d[i+1], d[i+2]];

    if (filters.dichro) {
      // Remove reds, simulate blue-yellow: compress to Y and B channels
      const y = Math.round(0.299*r + 0.587*g + 0.114*b);
      const blueish = Math.min(b + 50, 255);
      // Human reds become dark gray or yellow
      d[i]   = Math.round((y + blueish) * 0.5); // mix
      d[i+1] = Math.round((y + b*0.2) * 0.7);
      d[i+2] = blueish;
    }
    if (filters.contrast) {
      // Increase contrast
      let f = 1.4;
      d[i]   = Math.min(255, (d[i]-128)*f + 128);
      d[i+1] = Math.min(255, (d[i+1]-128)*f + 128);
      d[i+2] = Math.min(255, (d[i+2]-128)*f + 128);
    }
    if (filters.brightness) {
      d[i] = Math.min(255, d[i]+30);
      d[i+1] = Math.min(255, d[i+1]+30);
      d[i+2] = Math.min(255, d[i+2]+30);
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

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
          dogVisionFilter(ctxD, VIDEO_W, VIDEO_H, filters);
        }
      }
      setSnapshotReady(true);
      id = requestAnimationFrame(drawFrame);
    }
    if (streaming) {
      drawFrame();
    }
    return () => { cancelAnimationFrame(id); }
  }, [streaming, filters]);

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
            Choose a breed, drag to compare vision, and filter in real-time.
          </span>
        </p>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
          <div className="flex flex-col gap-4 flex-1">
            <BreedSelector value={breed} onChange={setBreed} />
            <div className="bg-white border shadow-lg rounded-lg p-4 flex flex-col gap-2 w-full mt-2">
              <span className="font-bold text-base text-blue-700 mb-1">How this breed sees:</span>
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
