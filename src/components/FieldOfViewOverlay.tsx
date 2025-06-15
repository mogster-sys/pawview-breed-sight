
// Draws a translucent overlay to mimic reduced/expanded field of view
import React from "react";
import type { BreedType } from "./BreedSelector";

function getFieldOfViewAngle(breed: BreedType) {
  if (breed === "greyhound") return 270;
  if (breed === "labrador") return 240;
  if (breed === "bulldog") return 180;
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
