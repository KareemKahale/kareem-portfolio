"use client";

import React, { useCallback, useState } from "react";
import { BinaryOrbits } from "@/components/canvas/AmbientBackground";
import { CustomCursor } from "@/components/canvas/CustomCursor";
import { HudNavbar } from "@/components/hud/HudNavbar";
import { ZAxisStage } from "@/components/engine/ZAxisStage";
import { HeroScene } from "@/components/scenes/HeroScene";
import { PhilosophyScene } from "@/components/scenes/PhilosophyScene";
import { WorksScene } from "@/components/scenes/WorksScene";
import { ArchitectureScene } from "@/components/scenes/ArchitectureScene";
import { ContactScene } from "@/components/scenes/ContactScene";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { PORTFOLIO_SCENES } from "@/data/profile";
import { ProjectItem } from "@/types/portfolio";

export default function HomePage() {
  const [activeScene, setActiveScene] = useState<number>(0);
  const [depthProgress, setDepthProgress] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const handleSelectScene = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(PORTFOLIO_SCENES.length - 1, index));
    setActiveScene(clamped);
  }, []);

  const handleStepScene = useCallback((direction: 1 | -1) => {
    setActiveScene((prev) =>
      Math.max(0, Math.min(PORTFOLIO_SCENES.length - 1, prev + direction))
    );
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-obsidian select-none">
      {/* 1. الخلفية المدارية الناعمة بألوان الباستيل */}
      <BinaryOrbits depthProgress={depthProgress} />

      {/* 2. مؤشر الماوس الناعم */}
      <CustomCursor />

      {/* 3. الهيدر العلوي بـ JellyRadio والقائمة الجانبية بـ LineSidebar */}
      <HudNavbar
        activeIndex={activeScene}
        depthProgress={depthProgress}
        onSelectScene={handleSelectScene}
        onStepScene={handleStepScene}
      />

      {/* 4. محرك المشاهد الخمسة في المحور Z (فضاء مفتوح بلا إطارات) */}
      <ZAxisStage
        activeIndex={activeScene}
        totalScenes={PORTFOLIO_SCENES.length}
        isLocked={Boolean(selectedProject)}
        onChangeScene={handleSelectScene}
        onDepthUpdate={setDepthProgress}
      >
        {/* المشهد 1: البوابة الرئيسية */}
        <HeroScene onNavigateScene={handleSelectScene} />

        {/* المشهد 2: فلسفة التخصص المزدوج */}
        <PhilosophyScene onNavigateScene={handleSelectScene} />

        {/* المشهد 3: معرض الأعمال المصنف */}
        <WorksScene
          onSelectProject={setSelectedProject}
          onNavigateScene={handleSelectScene}
        />

        {/* المشهد 4: المحاكي التفاعلي لمعمارية Car Rental API */}
        <ArchitectureScene />

        {/* المشهد 5: بوابة التواصل المباشر وملف التصميم */}
        <ContactScene />
      </ZAxisStage>

      {/* 5. النافذة الزجاجية الناعمة لتفاصيل المشروع */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInspectArchitecture={() => handleSelectScene(3)}
      />
    </main>
  );
}