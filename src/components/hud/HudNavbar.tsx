"use client";

import React from "react";
import { PORTFOLIO_SCENES } from "@/data/profile";
import { JellyRadio } from "@/components/ui/JellyRadio";
import { LineSidebar } from "@/components/ui/LineSidebar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface HudNavbarProps {
  activeIndex: number;
  depthProgress: number;
  onSelectScene: (index: number) => void;
  onStepScene: (direction: 1 | -1) => void;
}

const SCENE_LABELS = PORTFOLIO_SCENES.map((scene) => scene.label);

export const HudNavbar: React.FC<HudNavbarProps> = ({
  activeIndex,
  onSelectScene,
}) => {
  const isSmallMobile = useMediaQuery("(max-width: 640px)");
  const currentLabel =
    PORTFOLIO_SCENES[activeIndex]?.label ?? PORTFOLIO_SCENES[0].label;

  return (
    <>
      {/* الهيدر العلوي الواسع والمريح في المنتصف */}
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-5 md:py-6 overflow-visible">
        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto flex items-center justify-center rounded-full bg-[#0D171F]/65 px-3 py-2 backdrop-blur-xl shadow-lg overflow-visible"
        >
          <JellyRadio
            items={SCENE_LABELS}
            value={currentLabel}
            onChange={(_, index) => onSelectScene(index)}
            chipColor="rgba(255, 255, 255, 0.04)"
            activeColor="#9EE6D0"
            textColor="#E2F1EE"
            activeTextColor="#070B10"
            size={isSmallMobile ? "sm" : "md"}
            gap={isSmallMobile ? 6 : 12}
            radius={9999}
            swell={0.07}
            barge={5}
            shrink={0.03}
            bounce={0.24}
            stiffness={500}
          />
        </nav>
      </header>

      {/* القائمة الجانبية التفاعلية LineSidebar على اليسار */}
      <div className="pointer-events-none fixed left-7 top-1/2 z-50 hidden -translate-y-1/2 xl:flex">
        <LineSidebar
          items={SCENE_LABELS}
          accentColor="#9EE6D0"
          textColor="#B8CEC9"
          markerColor="#2B444B"
          showIndex={true}
          showMarker={true}
          proximityRadius={100}
          maxShift={24}
          falloff="smooth"
          markerLength={44}
          markerGap={12}
          tickScale={0.45}
          scaleTick={true}
          itemGap={22}
          fontSize={0.95}
          activeIndex={activeIndex}
          onItemClick={(index) => onSelectScene(index)}
        />
      </div>
    </>
  );
};

export default HudNavbar;