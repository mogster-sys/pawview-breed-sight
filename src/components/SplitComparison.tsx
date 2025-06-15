
import React, { useRef, useState } from "react";

// "children" array: [humanView, dogView]
export function SplitComparison({
  children,
  width,
  height,
}: {
  children: [React.ReactNode, React.ReactNode];
  width: number;
  height: number;
}) {
  const [split, setSplit] = useState(0.5);
  const dragging = useRef(false);

  return (
    <div
      className="relative rounded-lg shadow overflow-hidden"
      style={{ width, height, background: "#09090b" }}
    >
      {/* Human view left */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: split * width,
          height,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {children[0]}
      </div>
      {/* Dog view right */}
      <div
        style={{
          position: "absolute",
          top: 0, left: split * width,
          width: (1 - split) * width,
          height,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {children[1]}
      </div>
      {/* Draggable slider */}
      <div
        className="absolute top-0"
        style={{
          left: split * width - 10,
          width: 20,
          height,
          zIndex: 11,
          cursor: "ew-resize"
        }}
        onMouseDown={() => { dragging.current = true; }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onMouseMove={e => {
          if (!dragging.current) return;
          const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
          let x = e.clientX - rect.left;
          x = Math.max(0, Math.min(x, width));
          setSplit(x / width);
        }}
        onTouchStart={() => { dragging.current = true; }}
        onTouchEnd={() => { dragging.current = false; }}
        onTouchMove={e => {
          if (!dragging.current) return;
          if (e.touches.length === 1) {
            const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
            let x = e.touches[0].clientX - rect.left;
            x = Math.max(0, Math.min(x, width));
            setSplit(x / width);
          }
        }}
      >
        <div className="w-2 h-full bg-yellow-400/80 shadow-lg rounded"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white text-xs px-1 py-0.5 rounded shadow-sm text-gray-700">
            Drag
          </div>
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-2 left-4 z-20 bg-black/60 text-gray-50 px-2 py-0.5 rounded text-xs">
        Human Vision
      </div>
      <div className="absolute top-2 right-4 z-20 bg-yellow-500/80 text-black px-2 py-0.5 rounded text-xs">
        Dog Vision
      </div>
    </div>
  );
}
