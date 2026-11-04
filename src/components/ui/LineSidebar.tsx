"use client";

import React, { useEffect, useRef, useState } from "react";

export interface LineSidebarProps {
  items: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: "smooth" | "linear";
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  activeIndex?: number;
  defaultActive?: number;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

export const LineSidebar: React.FC<LineSidebarProps> = ({
  items,
  accentColor = "#C4B5FD",
  textColor = "#c4c4c4",
  markerColor = "#52525b",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 44,
  markerGap = 12,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 22,
  fontSize = 0.95,
  activeIndex,
  defaultActive = 0,
  onItemClick,
  className = "",
}) => {
  const [internalActive, setInternalActive] = useState<number>(defaultActive);
  const currentActive = activeIndex !== undefined ? activeIndex : internalActive;

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [mouseY, setMouseY] = useState<number | null>(null);
  const [shifts, setShifts] = useState<number[]>(() => items.map(() => 0));

  useEffect(() => {
    let rafId: number;

    const updateShifts = () => {
      setShifts((prevShifts) =>
        items.map((_, idx) => {
          const el = itemRefs.current[idx];
          if (!el || mouseY === null) {
            return prevShifts[idx] * 0.82;
          }

          const rect = el.getBoundingClientRect();
          const itemCenterY = rect.top + rect.height / 2;
          const dist = Math.abs(mouseY - itemCenterY);

          let targetRatio = 0;
          if (dist < proximityRadius) {
            const raw = 1 - dist / proximityRadius;
            targetRatio =
              falloff === "smooth"
                ? Math.cos((1 - raw) * (Math.PI / 2))
                : raw;
          }

          const targetShift = targetRatio * maxShift;
          return prevShifts[idx] + (targetShift - prevShifts[idx]) * 0.18;
        })
      );

      rafId = window.requestAnimationFrame(updateShifts);
    };

    rafId = window.requestAnimationFrame(updateShifts);
    return () => window.cancelAnimationFrame(rafId);
  }, [mouseY, items, proximityRadius, maxShift, falloff]);

  const handleClick = (idx: number, label: string) => {
    setInternalActive(idx);
    if (onItemClick) onItemClick(idx, label);
  };

  return (
    <aside
      onMouseMove={(e) => setMouseY(e.clientY)}
      onMouseLeave={() => setMouseY(null)}
      aria-label="Section Sidebar Navigation"
      className={`pointer-events-auto flex flex-col items-start select-none ${className}`}
      style={{ gap: `${itemGap}px` }}
    >
      {items.map((label, idx) => {
        const isActive = idx === currentActive;
        const shift = shifts[idx] || 0;
        const shiftRatio = maxShift > 0 ? shift / maxShift : 0;

        const baseTickWidth = isActive
          ? markerLength
          : markerLength * tickScale;
        const dynamicTickWidth = scaleTick
          ? baseTickWidth + shiftRatio * (markerLength * (1 - tickScale))
          : baseTickWidth;

        return (
          <button
            key={label}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            type="button"
            onClick={() => handleClick(idx, label)}
            data-cursor-hover="true"
            className="group flex items-center text-left focus:outline-none"
            style={{
              transform: `translate3d(${shift.toFixed(1)}px, 0, 0)`,
              gap: `${markerGap}px`,
            }}
          >
            {/* الخط الجانبي الناعم (Marker Line) */}
            {showMarker && (
              <span
                className="block h-[1.5px] rounded-full transition-colors duration-300"
                style={{
                  width: `${dynamicTickWidth.toFixed(1)}px`,
                  backgroundColor: isActive
                    ? accentColor
                    : shiftRatio > 0.35
                    ? accentColor
                    : markerColor,
                  boxShadow: isActive ? `0 0 12px ${accentColor}` : "none",
                }}
              />
            )}

            {/* رقم القسم الاختياري */}
            {showIndex && (
              <span
                className="font-jakarta font-medium transition-colors duration-300"
                style={{
                  fontSize: `${(fontSize * 0.78).toFixed(2)}rem`,
                  color: isActive ? accentColor : "#71717a",
                }}
              >
                0{idx + 1}
              </span>
            )}

            {/* اسم القسم بخط Sans-Serif ناعم */}
            <span
              className="font-jakarta tracking-normal transition-colors duration-300"
              style={{
                fontSize: `${fontSize}rem`,
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? "#F5F5F7"
                  : shiftRatio > 0.3
                  ? "#F5F5F7"
                  : textColor,
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};

export default LineSidebar;