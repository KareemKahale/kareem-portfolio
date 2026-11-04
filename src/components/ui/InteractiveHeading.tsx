"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface InteractiveHeadingProps {
  text: string;
  highlightWords?: string[];
  className?: string;
}

export const InteractiveHeading: React.FC<InteractiveHeadingProps> = ({
  text,
  highlightWords = [],
  className = "",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const words = text.split(" ");

  let globalCharIndex = 0;

  return (
    <motion.h2
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-jakarta text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary select-none ${className}`}
    >
      {words.map((word, wIdx) => {
        const isHighlightedWord = highlightWords.includes(word);

        return (
          <span key={wIdx} className="inline-flex items-center">
            {word.split("").map((char) => {
              const currentIdx = globalCharIndex++;
              const distance =
                hoveredIndex !== null ? Math.abs(hoveredIndex - currentIdx) : 99;

              const yShift =
                distance === 0 ? -6 : distance === 1 ? -3 : distance === 2 ? -1 : 0;
              const scale =
                distance === 0 ? 1.1 : distance === 1 ? 1.04 : 1;

              const color =
                distance === 0
                  ? "#9EE6D0"
                  : distance === 1
                  ? "#D8F7ED"
                  : isHighlightedWord
                  ? "#9EE6D0"
                  : "#F7FBFA";

              return (
                <span
                  key={currentIdx}
                  onMouseEnter={() => setHoveredIndex(currentIdx)}
                  className="inline-block transition-all duration-200 ease-out will-change-transform"
                  style={{
                    transform: `translate3d(0, ${yShift}px, 0) scale(${scale})`,
                    color,
                    textShadow:
                      distance === 0
                        ? "0 6px 20px rgba(158, 230, 208, 0.45)"
                        : "none",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </motion.h2>
  );
};

export default InteractiveHeading;