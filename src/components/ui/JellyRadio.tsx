"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface JellyRadioItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface JellyRadioProps {
  items: (string | JellyRadioItem)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, index: number) => void;
  chipColor?: string;
  activeColor?: string;
  textColor?: string;
  activeTextColor?: string;
  size?: "sm" | "md" | "lg";
  gap?: number;
  radius?: number;
  swell?: number;
  barge?: number;
  shrink?: number;
  jelly?: number;
  bounce?: number;
  stiffness?: number;
  className?: string;
}

export const JellyRadio: React.FC<JellyRadioProps> = ({
  items,
  value,
  defaultValue,
  onChange,
  chipColor = "rgba(255, 255, 255, 0.045)",
  activeColor = "#9EE6D0",
  textColor = "#E2F1EE",
  activeTextColor = "#070B10",
  size = "md",
  gap = 12,
  radius = 9999,
  swell = 0.07,
  barge = 5,
  shrink = 0.03,
  bounce = 0.24,
  stiffness = 500,
  className = "",
}) => {
  const normalizedItems: JellyRadioItem[] = items.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item
  );

  const [internalVal, setInternalVal] = useState<string>(
    defaultValue ?? normalizedItems[0]?.value ?? ""
  );
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentValue = value !== undefined ? value : internalVal;
  const activeIdx = normalizedItems.findIndex((i) => i.value === currentValue);

  // أحجام مريحة وواسعة مع whitespace-nowrap لمنع انضغاط الأزرار أبداً
  const sizePadding =
    size === "sm"
      ? "px-4 py-2 text-xs min-w-[74px]"
      : size === "lg"
      ? "px-7 py-3 text-base min-w-[110px]"
      : "px-6 py-2.5 text-sm min-w-[96px]";

  const handleSelect = (item: JellyRadioItem, idx: number) => {
    if (item.disabled) return;
    setInternalVal(item.value);
    if (onChange) onChange(item.value, idx);
  };

  return (
    <div
      role="radiogroup"
      className={`inline-flex items-center justify-center overflow-visible select-none ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {normalizedItems.map((item, idx) => {
        const isSelected = idx === activeIdx;
        const isHovered = idx === hoveredIdx;

        let xOffset = 0;
        if (hoveredIdx !== null && hoveredIdx !== idx) {
          const direction = idx > hoveredIdx ? 1 : -1;
          const distance = Math.abs(idx - hoveredIdx);
          if (distance === 1) {
            xOffset = direction * barge;
          }
        }

        const scaleValue = isHovered
          ? 1 + swell
          : hoveredIdx !== null && Math.abs(idx - hoveredIdx) === 1
          ? 1 - shrink
          : 1;

        return (
          <motion.button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={item.disabled}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => handleSelect(item, idx)}
            animate={{
              x: xOffset,
              scale: scaleValue,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: stiffness,
              damping: Math.max(18, 32 * (1 - bounce)),
            }}
            className={`relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-jakarta font-semibold backdrop-blur-md transition-colors focus:outline-none disabled:opacity-40 ${sizePadding}`}
            style={{
              borderRadius: `${radius}px`,
              backgroundColor: isSelected ? "transparent" : chipColor,
              color: isSelected ? activeTextColor : textColor,
            }}
          >
            {isSelected && (
              <motion.span
                layoutId="jelly-radio-active-fill"
                transition={{
                  type: "spring",
                  stiffness: stiffness,
                  damping: Math.max(18, 30 * (1 - bounce)),
                }}
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  borderRadius: `${radius}px`,
                  backgroundColor: activeColor,
                  boxShadow: "0 8px 24px -4px rgba(158, 230, 208, 0.45)",
                }}
              />
            )}

            {item.icon && (
              <span className="pointer-events-none shrink-0">{item.icon}</span>
            )}
            <span className="pointer-events-none relative z-10 tracking-wide">
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default JellyRadio;