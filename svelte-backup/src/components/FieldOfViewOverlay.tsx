
// Draws a translucent overlay to mimic reduced/expanded field of view
import React from "react";
import type { BreedType } from "./BreedSelector";

function getFieldOfViewAngle(breed: BreedType) {
  // Dolichocephalic breeds (VS - Visual Streak, wider field)
  if (breed === "greyhound") return 270;
  if (breed === "borzoi") return 270;
  if (breed === "saluki") return 270;
  if (breed === "afghan-hound") return 265;
  if (breed === "collie") return 260;
  if (breed === "doberman") return 260;
  if (breed === "german-pointer") return 250;
  if (breed === "dachshund") return 250;
  
  // Mesocephalic breeds (Balanced)
  if (breed === "labrador") return 240;
  if (breed === "golden-retriever") return 240;
  if (breed === "german-shepherd") return 240;
  if (breed === "siberian-husky") return 245;
  if (breed === "australian-shepherd") return 240;
  if (breed === "beagle") return 235;
  if (breed === "poodle") return 235;
  if (breed === "rottweiler") return 235;
  if (breed === "corgi") return 230;
  if (breed === "great-dane") return 240;
  if (breed === "miniature-schnauzer") return 230;
  if (breed === "yorkshire-terrier") return 225;
  
  // Brachycephalic breeds (AC - Area Centralis, narrower field)
  if (breed === "pug") return 195;
  if (breed === "bulldog") return 200;
  if (breed === "french-bulldog") return 200;
  if (breed === "boxer") return 210;
  if (breed === "shih-tzu") return 190;
  if (breed === "cavalier") return 200;
  
  return 220; // Custom
}

// Overlay is SVG, covering the video area with a visible "unmasked" arc
export function FieldOfViewOverlay({
  width,
  height,
  breed,
}: {
  width: number;
  height: number;
  breed: BreedType;
}) {
  const angle = getFieldOfViewAngle(breed);
  const cx = width / 2, cy = height / 2, r = Math.min(width, height) / 2;
  const startAngle = (90 - angle / 2) * (Math.PI / 180);
  const endAngle = (90 + angle / 2) * (Math.PI / 180);

  // Describe arc for SVG path
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy - r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy - r * Math.sin(endAngle);
  const largeArcFlag = angle > 180 ? 1 : 0;

  const d = `
    M ${cx} ${cy}
    L ${x1} ${y1}
    A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}
    Z
  `;

  return (
    <svg
      width={width}
      height={height}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 2 }}
    >
      <defs>
        <linearGradient id="fov-mask" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.38" />
        </linearGradient>
      </defs>
      {/* Outer dark overlay */}
      <rect width={width} height={height} fill="url(#fov-mask)" />
      {/* Transparent arc for visual field */}
      <path d={d} fill="transparent" stroke="gold" strokeWidth={2} />
      {/* Unmask the field */}
      <clipPath id="field-clip">
        <path d={d} />
      </clipPath>
      <rect
        width={width} height={height}
        fill="transparent"
        clipPath="url(#field-clip)"
      />
    </svg>
  );
}
