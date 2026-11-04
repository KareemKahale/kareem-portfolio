"use client";

import React from "react";
import { Grainient } from "@/components/canvas/Grainient";

interface AmbientBackgroundProps {
  depthProgress?: number;
}

export const BinaryOrbits: React.FC<AmbientBackgroundProps> = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-obsidian"
      aria-hidden="true"
    >
      <Grainient
        colors={["#0B1017", "#12222B", "#1E3F49", "#5C9296", "#C8E2DC"]}
        angle={55}
        flow={0.8}
        silk={0.35}
        grainAmount={0.07}
        speed={0.75}
        grainSize={0.6}
        variation={9}
        interactive={false}
      />
    </div>
  );
};

export default BinaryOrbits;