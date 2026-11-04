"use client";

import React, { useRef } from "react";

interface SpotlightTiltCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightTiltCard: React.FC<SpotlightTiltCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(142, 195, 176, 0.12)",
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    glowRef.current.style.opacity = "1";
    glowRef.current.style.background = `radial-gradient(420px circle at ${localX}px ${localY}px, ${spotlightColor}, transparent 75%)`;
  };

  const handleMouseLeave = () => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel-interactive relative overflow-hidden rounded-3xl ${className}`}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default SpotlightTiltCard;