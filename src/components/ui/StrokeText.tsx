"use client";

import React, { useEffect, useId, useRef } from "react";
import gsap from "gsap";

export interface StrokeTextProps {
  text: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  dashLength?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: "mount" | "manual";
  fillMode?: "wipe" | "fade";
  wipeFrom?: "left" | "right";
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  hoverRedraw?: boolean;
  className?: string;
}

export const StrokeText: React.FC<StrokeTextProps> = ({
  text,
  strokeColor = "#C4B5FD",
  fillColor = "#F5F5F7",
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.04,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  wipeFrom = "left",
  fontSize = 96,
  fontWeight = 700,
  letterSpacing = -2,
  hoverRedraw = true,
  className = "",
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const clipRectRef = useRef<SVGRectElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const characters = text.split("");
  // مساحة عرض واسعة تضمن عدم قص أول أو آخر حرف أبداً
  const viewBoxWidth = Math.max(characters.length * (fontSize * 0.78), 960);
  const viewBoxHeight = fontSize * 1.4;

  const runAnimation = () => {
    if (!svgRef.current) return;

    const charElements =
      svgRef.current.querySelectorAll<SVGTextElement>(".stroke-char-node");
    const clipRect = clipRectRef.current;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    gsap.set(charElements, {
      strokeDasharray: 600,
      strokeDashoffset: 600,
      opacity: 1,
    });

    if (clipRect && fillMode === "wipe") {
      gsap.set(clipRect, {
        attr: {
          x: wipeFrom === "left" ? -100 : viewBoxWidth + 100,
          width: 0,
        },
      });
    }

    tl.to(charElements, {
      strokeDashoffset: 0,
      duration: drawDuration,
      stagger: stagger,
      ease: ease,
    });

    if (clipRect && fillMode === "wipe") {
      tl.to(
        clipRect,
        {
          attr: {
            x: -100,
            width: viewBoxWidth + 200,
          },
          duration: drawDuration * 0.8,
          ease: "power3.inOut",
        },
        `-=${Math.max(0.2, drawDuration - fillDelay - 0.4)}`
      );
    }
  };

  useEffect(() => {
    if (trigger === "mount") {
      runAnimation();
    }
    return () => {
      timelineRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleMouseEnter = () => {
    if (hoverRedraw) {
      runAnimation();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      data-cursor-hover="true"
      className={`relative inline-flex w-full items-center justify-center select-none ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full max-w-4xl h-auto overflow-visible"
        role="heading"
        aria-label={text}
      >
        <defs>
          <clipPath id={`wipe-clip-${uniqueId}`}>
            <rect
              ref={clipRectRef}
              x="-100"
              y="0"
              width={viewBoxWidth + 200}
              height={viewBoxHeight}
            />
          </clipPath>
        </defs>

        {/* طبقة الخطوط الناعمة بلون الباستيل */}
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontSize: `${fontSize}px`,
            fontWeight,
            letterSpacing: `${letterSpacing}px`,
          }}
        >
          {characters.map((char, index) => (
            <tspan key={`stroke-${index}`} className="stroke-char-node">
              {char}
            </tspan>
          ))}
        </text>

        {/* طبقة التعبئة الكاملة */}
        <g clipPath={`url(#wipe-clip-${uniqueId})`}>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={fillColor}
            stroke="transparent"
            style={{
              fontFamily: "var(--font-jakarta), sans-serif",
              fontSize: `${fontSize}px`,
              fontWeight,
              letterSpacing: `${letterSpacing}px`,
            }}
          >
            {characters.map((char, index) => (
              <tspan key={`fill-${index}`}>{char}</tspan>
            ))}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default StrokeText;