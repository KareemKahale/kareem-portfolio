"use client";

import React from "react";

export interface StarBorderProps {
  children: React.ReactNode;
  color?: string;
  trailColor?: string;
  duration?: number;
  direction?: "clockwise" | "counterclockwise";
  thickness?: number;
  radius?: number;
  glow?: number;
  hover?: "lap" | "steady";
  clickPulse?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export const StarBorder: React.FC<StarBorderProps> = ({
  children,
  color = "#8EC3B0",
  trailColor = "#5F9598",
  duration = 4.5,
  direction = "clockwise",
  thickness = 1,
  radius = 9999,
  onClick,
  href,
  target,
  rel,
  className = "",
}) => {
  const sharedClasses = `group relative inline-flex cursor-pointer items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none ${className}`;

  const innerMarkup = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-120%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 72%, ${trailColor} 88%, ${color} 97%, #F3F7F6 100%)`,
          animation: `star-border-spin ${duration}s linear infinite ${
            direction === "counterclockwise" ? "reverse" : "normal"
          }`,
        }}
      />

      <span
        className="pointer-events-none relative z-10 inline-flex h-full w-full items-center justify-center gap-2.5 bg-[#121C24]/90 px-6 py-3 font-jakarta text-sm font-medium text-text-primary backdrop-blur-xl transition-colors duration-200 group-hover:bg-[#172530]/95 group-hover:text-white"
        style={{
          borderRadius: `${Math.max(2, radius - thickness)}px`,
        }}
      >
        {children}
      </span>

      <style jsx>{`
        @keyframes star-border-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={sharedClasses}
        style={{
          borderRadius: `${radius}px`,
          padding: `${thickness}px`,
        }}
      >
        {innerMarkup}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={sharedClasses}
      style={{
        borderRadius: `${radius}px`,
        padding: `${thickness}px`,
      }}
    >
      {innerMarkup}
    </button>
  );
};

export default StarBorder;