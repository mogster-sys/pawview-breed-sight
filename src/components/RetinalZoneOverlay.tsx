import React from "react";
import type { RetinalMode } from "./RetinalModeSelector";

export function RetinalZoneOverlay({
  width,
  height,
  mode,
}: {
  width: number;
  height: number;
  mode: RetinalMode;
}) {
  const cx = width / 2;
  const cy = height / 2;

  if (mode === "area-centralis") {
    // Central circle for Area Centralis (high-acuity center)
    const radius = Math.min(width, height) * 0.2;

    return (
      <svg
        width={width}
        height={height}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <defs>
          <radialGradient id="ac-gradient">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* High-acuity center circle */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="url(#ac-gradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="8,4"
        />
        {/* Center crosshair */}
        <line
          x1={cx - 10}
          y1={cy}
          x2={cx + 10}
          y2={cy}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        <line
          x1={cx}
          y1={cy - 10}
          x2={cx}
          y2={cy + 10}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        {/* Label */}
        <text
          x={cx}
          y={cy + radius + 25}
          fill="hsl(var(--primary))"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
          className="font-semibold"
        >
          High-Acuity Zone (Central)
        </text>
      </svg>
    );
  }

  // Visual Streak - horizontal band
  const bandHeight = height * 0.25;
  const bandY = cy - bandHeight / 2;

  return (
    <svg
      width={width}
      height={height}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 3 }}
    >
      <defs>
        <linearGradient id="vs-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Horizontal high-acuity band */}
      <rect
        x="0"
        y={bandY}
        width={width}
        height={bandHeight}
        fill="url(#vs-gradient)"
      />
      {/* Top border */}
      <line
        x1="0"
        y1={bandY}
        x2={width}
        y2={bandY}
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeDasharray="8,4"
      />
      {/* Bottom border */}
      <line
        x1="0"
        y1={bandY + bandHeight}
        x2={width}
        y2={bandY + bandHeight}
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeDasharray="8,4"
      />
      {/* Horizon markers */}
      <line
        x1="0"
        y1={cy}
        x2={width}
        y2={cy}
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        opacity="0.6"
      />
      {/* Label */}
      <text
        x={width / 2}
        y={bandY + bandHeight + 20}
        fill="hsl(var(--primary))"
        fontSize="12"
        fontWeight="600"
        textAnchor="middle"
        className="font-semibold"
      >
        High-Acuity Zone (Horizon)
      </text>
    </svg>
  );
}
