"use client";

import React, { useEffect, useRef } from "react";

export interface GrainientProps {
  colors?: string[];
  angle?: number;
  flow?: number;
  silk?: number;
  grainAmount?: number;
  speed?: number;
  grainSize?: number;
  variation?: number;
  interactive?: boolean;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export const Grainient: React.FC<GrainientProps> = ({
  colors = ["#0B1017", "#13222B", "#1F404A", "#5F9598", "#CBE4DE"],
  angle = 55,
  flow = 0.8,
  silk = 0.35,
  grainAmount = 0.08,
  speed = 0.75,
  grainSize = 0.6,
  variation = 9,
  interactive = false,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // دقة داخلية خفيفة جداً للـ Silk Flow لضمان 0% ضغط على المعالج و 60 FPS ثابتة
    const renderW = 240;
    const renderH = 150;
    canvas.width = renderW;
    canvas.height = renderH;

    const rgbPalette = colors.map(hexToRgb);
    const imgData = ctx.createImageData(renderW, renderH);
    const data = imgData.data;

    let rafId: number;
    let time = variation * 10;
    const rad = (angle * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);

    const render = () => {
      time += 0.008 * speed;

      let idx = 0;
      for (let y = 0; y < renderH; y++) {
        const ny = y / renderH;
        for (let x = 0; x < renderW; x++) {
          const nx = x / renderW;

          // حساب التموج الحريري (Silk & Flow Waves)
          const rotated = nx * cosA + ny * sinA;
          const wave1 =
            Math.sin(nx * 3.2 * flow + time + Math.cos(ny * 2.5 + time * 0.7)) *
            silk;
          const wave2 =
            Math.cos(
              ny * 3.8 * flow - time * 0.8 + Math.sin(nx * 2.8 + time * 0.5)
            ) *
            (silk * 0.75);

          // إبقاء التدرج أكثر هدوءاً وتركيز الإضاءة اللطيفة بشكل متوازن
          const t = Math.max(
            0,
            Math.min(0.88, (rotated * 0.55 + 0.25 + wave1 + wave2) * 0.78)
          );

          const scaledT = t * (rgbPalette.length - 1);
          const cIdx = Math.floor(scaledT);
          const frac = scaledT - cIdx;

          const c1 = rgbPalette[cIdx] ?? rgbPalette[0];
          const c2 =
            rgbPalette[Math.min(cIdx + 1, rgbPalette.length - 1)] ??
            rgbPalette[0];

          data[idx] = c1[0] + (c2[0] - c1[0]) * frac;
          data[idx + 1] = c1[1] + (c2[1] - c1[1]) * frac;
          data[idx + 2] = c1[2] + (c2[2] - c1[2]) * frac;
          data[idx + 3] = 255;
          idx += 4;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      rafId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [colors, angle, flow, silk, speed, variation, interactive]);

  return (
    <div
      className={`pointer-events-none relative h-full w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* طبقة التموج الحريري (Silk Flow Canvas) */}
      <canvas
        ref={canvasRef}
        className="h-full w-full block object-cover"
        style={{
          filter: "blur(24px) saturate(1.05)",
          transform: "scale(1.08)",
        }}
      />

      {/* طبقة التحبيب الفني الخفيفة (SVG Noise Grain) بدون أي حمل على المعالج */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: grainAmount,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${(
            1.2 / Math.max(0.2, grainSize)
          ).toFixed(
            2
          )}' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* طبقة تظليل ناعمة لضمان وضوح النصوص والأزرار بنسبة 100% */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(11, 16, 23, 0.25) 0%, rgba(11, 16, 23, 0.68) 100%)",
        }}
      />
    </div>
  );
};

export default Grainient;