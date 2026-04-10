import type { RetinalMode, Filters } from "$lib/types";

// --- Performance tier detection ---
export type QualityTier = 'base' | 'enhanced';

let detectedTier: QualityTier | null = null;
let frameTimeSamples: number[] = [];
let lastFrameTime = 0;

// Scale factor for processing canvas (1 = full res, 0.5 = half res)
let scaleFactor = 0.5; // start conservative

export function getQualityTier(): QualityTier {
  return detectedTier ?? 'base';
}

// Call each frame to adaptively measure performance
export function measureFramePerformance() {
  const now = performance.now();
  if (lastFrameTime > 0) {
    const dt = now - lastFrameTime;
    frameTimeSamples.push(dt);

    // After 60 frames, decide tier
    if (frameTimeSamples.length === 60) {
      const avg = frameTimeSamples.reduce((a, b) => a + b, 0) / frameTimeSamples.length;
      if (avg < 20) {
        // Sustaining 50+ fps — device can handle enhanced
        detectedTier = 'enhanced';
        scaleFactor = 0.75;
      } else {
        detectedTier = 'base';
        scaleFactor = 0.5;
      }
      frameTimeSamples = [];
    }
  }
  lastFrameTime = now;
}

// --- Offscreen canvas pool ---
let offscreenCanvas: HTMLCanvasElement | null = null;
let offscreenCtx: CanvasRenderingContext2D | null = null;
let processCanvas: HTMLCanvasElement | null = null;
let processCtx: CanvasRenderingContext2D | null = null;

function getOffscreenCanvas(w: number, h: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  if (!offscreenCanvas) {
    offscreenCanvas = document.createElement('canvas');
    offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
  }
  if (!offscreenCtx) return null;
  if (offscreenCanvas.width !== w || offscreenCanvas.height !== h) {
    offscreenCanvas.width = w;
    offscreenCanvas.height = h;
  }
  return { canvas: offscreenCanvas, ctx: offscreenCtx };
}

function getProcessCanvas(w: number, h: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  if (!processCanvas) {
    processCanvas = document.createElement('canvas');
    processCtx = processCanvas.getContext('2d', { willReadFrequently: true });
  }
  if (!processCtx) return null;
  if (processCanvas.width !== w || processCanvas.height !== h) {
    processCanvas.width = w;
    processCanvas.height = h;
  }
  return { canvas: processCanvas, ctx: processCtx };
}

// --- Retinal blur patterns ---

function applyAreaCentralisBlur(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const offscreen = getOffscreenCanvas(w, h);
  if (!offscreen) return;

  const { canvas: tempCanvas, ctx: tempCtx } = offscreen;
  const imageData = ctx.getImageData(0, 0, w, h);
  tempCtx.putImageData(imageData, 0, 0);

  const centerX = w / 2;
  const centerY = h / 2;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

  // Blurred full image
  ctx.filter = 'blur(8px)';
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = 'none';

  // Sharp central area
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius * 0.25, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();
}

function applyVisualStreakBlur(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const offscreen = getOffscreenCanvas(w, h);
  if (!offscreen) return;

  const { canvas: tempCanvas, ctx: tempCtx } = offscreen;
  const imageData = ctx.getImageData(0, 0, w, h);
  tempCtx.putImageData(imageData, 0, 0);

  const centerY = h / 2;
  const streakHeight = h * 0.4;

  ctx.filter = 'blur(6px)';
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = 'none';

  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.beginPath();
  ctx.rect(0, centerY - streakHeight / 2, w, streakHeight);
  ctx.clip();
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();
}

// --- Acuity blur (20/75 vision) ---
function applyAcuityBlur(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const offscreen = getOffscreenCanvas(w, h);
  if (!offscreen) return;

  const { canvas: tempCanvas, ctx: tempCtx } = offscreen;
  tempCtx.drawImage(ctx.canvas, 0, 0);

  // Subtle overall softness - dogs see ~20/75
  ctx.filter = 'blur(1.5px)';
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = 'none';
}

// --- UV glow (enhanced tier only) ---
function applyUVGlow(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const offscreen = getOffscreenCanvas(w, h);
  if (!offscreen) return;

  const { canvas: tempCanvas, ctx: tempCtx } = offscreen;

  // Extract bright blue/violet areas as a glow mask
  const imgData = ctx.getImageData(0, 0, w, h);
  const glowData = tempCtx.createImageData(w, h);
  const src = imgData.data;
  const dst = glowData.data;

  for (let i = 0; i < src.length; i += 4) {
    const r = src[i], g = src[i + 1], b = src[i + 2];
    // Detect UV-like areas: high blue, low red, or bright white (fluorescent)
    const uvStrength = Math.max(0, b - Math.max(r, g)) / 255;
    const brightness = (r + g + b) / 765;
    const fluoresce = Math.max(uvStrength * 2, brightness > 0.85 ? 0.3 : 0);

    if (fluoresce > 0.1) {
      // Cyan-violet glow
      dst[i] = Math.min(255, Math.round(100 * fluoresce));
      dst[i + 1] = Math.min(255, Math.round(180 * fluoresce));
      dst[i + 2] = Math.min(255, Math.round(255 * fluoresce));
      dst[i + 3] = Math.round(120 * fluoresce);
    } else {
      dst[i + 3] = 0;
    }
  }

  tempCtx.putImageData(glowData, 0, 0);

  // Blur the glow layer
  ctx.save();
  ctx.filter = 'blur(12px)';
  ctx.globalCompositeOperation = 'screen';
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = 'none';
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
}

// --- Main filter pipeline ---
export function dogVisionFilter(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  filters: Filters,
  retinalMode: RetinalMode
) {
  measureFramePerformance();
  const tier = getQualityTier();

  // Downscale for processing
  const pw = Math.max(1, Math.round(w * scaleFactor));
  const ph = Math.max(1, Math.round(h * scaleFactor));
  const proc = getProcessCanvas(pw, ph);
  if (!proc) return;

  const { canvas: pCanvas, ctx: pCtx } = proc;

  // Draw source at reduced resolution
  pCtx.drawImage(ctx.canvas, 0, 0, pw, ph);

  // Pixel-level filters
  const imgData = pCtx.getImageData(0, 0, pw, ph);
  const d = imgData.data;

  for (let i = 0; i < d.length; i += 4) {
    let r = d[i], g = d[i + 1], b = d[i + 2];

    if (filters.dichro) {
      // Dichromatic vision: simulate deuteranopia-like blue-yellow spectrum
      const y = 0.299 * r + 0.587 * g + 0.114 * b;
      const blueish = Math.min(b + 50, 255);
      r = Math.round((y + blueish) * 0.5);
      g = Math.round((y + b * 0.2) * 0.7);
      b = blueish;
    }

    if (filters.contrast) {
      // Enhanced edge contrast
      const f = 1.4;
      r = Math.min(255, Math.max(0, (r - 128) * f + 128));
      g = Math.min(255, Math.max(0, (g - 128) * f + 128));
      b = Math.min(255, Math.max(0, (b - 128) * f + 128));
    }

    if (filters.brightness) {
      // Tapetum lucidum simulation: non-linear boost favouring dark areas
      // Dark pixels get more boost than bright ones (reflecting light back)
      const lum = (r + g + b) / 3;
      const boost = Math.round(40 * (1 - lum / 255)); // 0-40, more in darks
      r = Math.min(255, r + boost);
      g = Math.min(255, g + boost);
      b = Math.min(255, b + boost);

      // Slight green-yellow shift (tapetum reflects green-yellow light)
      if (tier === 'enhanced') {
        g = Math.min(255, g + Math.round(boost * 0.3));
      }
    }

    d[i] = r;
    d[i + 1] = g;
    d[i + 2] = b;
  }

  pCtx.putImageData(imgData, 0, 0);

  // Retinal pattern blur (at reduced resolution — much cheaper)
  if (retinalMode === "area-centralis") {
    applyAreaCentralisBlur(pCtx, pw, ph);
  } else if (retinalMode === "visual-streak") {
    applyVisualStreakBlur(pCtx, pw, ph);
  }

  // Acuity reduction (20/75)
  applyAcuityBlur(pCtx, pw, ph);

  // UV fluorescence glow (enhanced tier only)
  if (tier === 'enhanced' && filters.uv) {
    applyUVGlow(pCtx, pw, ph);
  }

  // Draw processed result back at full resolution
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'medium';
  ctx.drawImage(pCanvas, 0, 0, w, h);
}
