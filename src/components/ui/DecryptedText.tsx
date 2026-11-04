"use client";

import React, { useEffect, useState } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//_#";

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 28,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState<string>(text);

  useEffect(() => {
    let iteration = 0;
    const interval = window.setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= text.length) {
        window.clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayText}</span>;
};

export default DecryptedText;