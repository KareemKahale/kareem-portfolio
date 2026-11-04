"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface GooeyNavItem {
  label: string;
  code?: string;
  href?: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  activeIndex: number;
  particleCount?: number;
  spread?: number;
  animationTime?: number;
  gooeyness?: number;
  wobble?: number;
  frame?: boolean;
  onChange: (index: number, item: GooeyNavItem) => void;
}

interface BurstParticle {
  id: number;
  tx: number;
  ty: number;
  size: number;
  duration: number;
}

export const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  activeIndex,
  particleCount = 12,
  spread = 44,
  animationTime = 550,
  gooeyness = 0.5,
  wobble = 0.5,
  frame = true,
  onChange,
}) => {
  const filterId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillRect, setPillRect] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  // تحديث موقع الكبسولة السائلة عند تغير القسم النشط
  useEffect(() => {
    const updatePosition = () => {
      const container = containerRef.current;
      const activeBtn = buttonRefs.current[activeIndex];
      if (!container || !activeBtn) return;

      const containerBox = container.getBoundingClientRect();
      const btnBox = activeBtn.getBoundingClientRect();

      setPillRect({
        left: btnBox.left - containerBox.left,
        width: btnBox.width,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeIndex, items]);

  const triggerParticles = () => {
    const newParticles: BurstParticle[] = Array.from({
      length: particleCount,
    }).map((_, idx) => {
      const angle = (Math.PI * 2 * idx) / particleCount + (Math.random() - 0.5) * 0.5;
      const distance = 16 + Math.random() * spread;
      return {
        id: Date.now() + idx,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * (distance * 0.65),
        size: 5 + Math.random() * 6,
        duration: animationTime + (Math.random() - 0.5) * 200,
      };
    });

    setParticles(newParticles);
    const cleanup = window.setTimeout(() => {
      setParticles([]);
    }, animationTime + 250);

    return () => window.clearTimeout(cleanup);
  };

  const handleSelect = (idx: number, item: GooeyNavItem) => {
    if (idx !== activeIndex) {
      triggerParticles();
    }
    onChange(idx, item);
  };

  const blurDeviation = Math.max(4, gooeyness * 12);
  const springDamping = Math.max(16, 28 - wobble * 12);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center rounded-full p-1.5 ${
        frame ? "glass-panel" : ""
      }`}
    >
      {/* فلتر الاندماج السائل (SVG Gooey Filter) */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id={`gooey-nav-${filterId}`}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={blurDeviation}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* الطبقة الخلفية السائلة مع الجزيئات البرتقالية */}
      <div
        className="pointer-events-none absolute inset-0 overflow- visible"
        style={{ filter: `url(#gooey-nav-${filterId})` }}
      >
        {pillRect.width > 0 && (
          <motion.div
            animate={{
              x: pillRect.left,
              width: pillRect.width,
            }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: springDamping,
            }}
            className=" relative top-1.5 h-[calc(100%-12px)] rounded-full bg-accent/35"
          >
            {/* الجزيئات المتناثرة عند الانتقال */}
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ x: 0, y: 0, scale: 1, opacity: 0.95 }}
                animate={{
                  x: p.tx,
                  y: p.ty,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: p.duration / 1000,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* إطار التوهج الحاد حول التبويب النشط */}
      {pillRect.width > 0 && (
        <motion.div
          animate={{
            x: pillRect.left,
            width: pillRect.width,
          }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: springDamping,
          }}
          className="pointer-events-none absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full border border-accent/65 bg-accent/15 shadow-accent-glow"
        />
      )}

      {/* طبقة الأزرار والنصوص الحادة */}
      {items.map((item, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={item.label}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            type="button"
            onClick={() => handleSelect(idx, item)}
            data-cursor-hover="true"
            className={`relative z-10 rounded-full px-3 py-1.5 font-mono text-xs transition-colors duration-200 md:px-4 ${
              isActive
                ? "text-white font-medium"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {item.code && (
              <span
                className={`hidden md:inline-block mr-1.5 text-[10px] ${
                  isActive ? "text-accent" : "text-accent/70"
                }`}
              >
                {item.code}
              </span>
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default GooeyNav;