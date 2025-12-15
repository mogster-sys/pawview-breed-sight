import { RetinalMode } from "@/components/RetinalModeSelector";

// Apply radial blur for Area Centralis mode (central focus)
function applyAreaCentralisBlur(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;
  
  tempCtx.putImageData(imageData, 0, 0);
  
  const centerX = w / 2;
  const centerY = h / 2;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
  
  // Create radial gradient mask for blur
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');    // Sharp center
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)'); // Start blur
  gradient.addColorStop(0.6, 'rgba(255,255,255,0.3)'); // Heavy blur
  gradient.addColorStop(1, 'rgba(255,255,255,0.1)');   // Maximum blur at edges
  
  // Apply gaussian blur to entire image
  ctx.filter = 'blur(8px)';
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = 'none';
  
  // Overlay sharp center
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.filter = 'blur(0px)';
  
  // Draw sharp central area
  ctx.beginPath();
  ctx.arc(centerX, centerY, maxRadius * 0.25, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();
}

// Apply horizontal streak blur for Visual Streak mode (horizon scanning)
function applyVisualStreakBlur(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;
  
  tempCtx.putImageData(imageData, 0, 0);
  
  const centerY = h / 2;
  const streakHeight = h * 0.4; // 40% of height for the sharp streak
  
  // Apply vertical blur to entire image
  ctx.filter = 'blur(6px)';
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = 'none';
  
  // Overlay sharp horizontal streak
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.filter = 'blur(0px)';
  
  // Draw sharp horizontal band (visual streak)
  ctx.beginPath();
  ctx.rect(0, centerY - streakHeight / 2, w, streakHeight);
  ctx.clip();
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();
}

// Main dog vision filter with retinal mode support
export function dogVisionFilter(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  filters: { dichro: boolean; contrast: boolean; brightness: boolean },
  retinalMode: RetinalMode
) {
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  
  // Apply color and sensitivity filters first
  for (let i = 0; i < d.length; i += 4) {
    let [r, g, b] = [d[i], d[i + 1], d[i + 2]];

    if (filters.dichro) {
      // Dichromatic vision: blue-yellow spectrum, reduced reds
      const y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      const blueish = Math.min(b + 50, 255);
      d[i] = Math.round((y + blueish) * 0.5);
      d[i + 1] = Math.round((y + b * 0.2) * 0.7);
      d[i + 2] = blueish;
    }
    if (filters.contrast) {
      // Increase contrast
      let f = 1.4;
      d[i] = Math.min(255, Math.max(0, (d[i] - 128) * f + 128));
      d[i + 1] = Math.min(255, Math.max(0, (d[i + 1] - 128) * f + 128));
      d[i + 2] = Math.min(255, Math.max(0, (d[i + 2] - 128) * f + 128));
    }
    if (filters.brightness) {
      // Rod-dominated retina: enhanced low-light sensitivity
      d[i] = Math.min(255, d[i] + 30);
      d[i + 1] = Math.min(255, d[i + 1] + 30);
      d[i + 2] = Math.min(255, d[i + 2] + 30);
    }
  }
  
  ctx.putImageData(imgData, 0, 0);
  
  // Apply retinal configuration-specific blur patterns
  if (retinalMode === "area-centralis") {
    applyAreaCentralisBlur(ctx, w, h);
  } else if (retinalMode === "visual-streak") {
    applyVisualStreakBlur(ctx, w, h);
  }
}
