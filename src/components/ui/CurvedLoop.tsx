"use client";

import React, { useEffect, useId, useRef, useState } from "react";

export interface CurvedLoopProps {
  marqueeText: string;
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  interactive?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export const CurvedLoop: React.FC<CurvedLoopProps> = ({
  marqueeText = "Software Engineering  ✦  Visual Identity  ✦  Laravel Architecture  ✦  Brand Systems  ✦",
  speed = 1.1,
  curveAmount = 55,
  direction = "left",
  fontSize = 14,
  fontWeight = 500,
  letterSpacing = 2,
  interactive = true,
  pauseOnHover = false,
  className = "",
}) => {
  const uid = useId().replace(/:/g, "");
  const pathId = `curved-arc-${uid}`;
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const offsetRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const velocityBoostRef = useRef<number>(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const repeatedText = Array(6).fill(marqueeText.trim()).join("    ");

  useEffect(() => {
    let rafId: number;
    const baseStep = speed * 0.22 * (direction === "left" ? -1 : 1);

    const animate = () => {
      if (!(pauseOnHover && isHoveredRef.current) && !isDraggingRef.current) {
        offsetRef.current += baseStep + velocityBoostRef.current;
        velocityBoostRef.current *= 0.94;
      }

      if (offsetRef.current <= -1200) {
        offsetRef.current += 600;
      } else if (offsetRef.current >= 0) {
        offsetRef.current -= 600;
      }

      if (textPathRef.current) {
        textPathRef.current.setAttribute(
          "startOffset",
          `${offsetRef.current.toFixed(2)}px`
        );
      }

      rafId = window.requestAnimationFrame(animate);
    };

    animate();
    return () => window.cancelAnimationFrame(rafId);
  }, [speed, direction, pauseOnHover]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    setIsGrabbing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    dragStartXRef.current = e.clientX;
    offsetRef.current += delta * 1.1;
    velocityBoostRef.current = delta * 0.15;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
  };

  const svgWidth = 1440;
  const svgHeight = Math.max(85, curveAmount + 35);
  const startY = svgHeight - 12;
  const controlY = startY - curveAmount;

  return (
    <div
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        isDraggingRef.current = false;
        setIsGrabbing(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`relative w-full overflow-hidden select-none ${
        interactive ? (isGrabbing ? "cursor-grabbing" : "cursor-grab") : ""
      } ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d={`M -200,${startY} Q ${svgWidth / 2},${controlY} ${
              svgWidth + 200
            },${startY}`}
            fill="none"
          />
        </defs>

        <text
          fill="rgba(158, 230, 208, 0.75)"
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: `${fontSize}px`,
            fontWeight,
            letterSpacing: `${letterSpacing}px`,
          }}
        >
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0px">
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedLoop;