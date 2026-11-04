"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const CustomCursor: React.FC = () => {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isFinePointer) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], [role="radio"], [role="tab"]'
      );
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let rafId: number;
    const animate = () => {
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-accent transition-all duration-200 will-change-transform ${
          isHovered ? "h-2 w-2 opacity-90" : "h-1.5 w-1.5 opacity-100"
        }`}
        style={{
          boxShadow: "0 0 12px 2px rgba(142, 195, 176, 0.45)",
        }}
      />

      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-300 ease-out will-change-transform ${
          isHovered
            ? "h-11 w-11 bg-accent/15 border border-accent/45"
            : "h-7 w-7 bg-transparent border border-white/15"
        }`}
      />
    </div>
  );
};

export default CustomCursor;