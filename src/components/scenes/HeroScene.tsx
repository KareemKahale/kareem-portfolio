"use client";

import React from "react";
import { ArrowUpRight, FolderKanban } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import TechText from "@/components/ui/TechText";
import { StarBorder } from "@/components/ui/StarBorder";
import { CurvedLoop } from "@/components/ui/CurvedLoop";

interface HeroSceneProps {
  onNavigateScene: (sceneIndex: number) => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ onNavigateScene }) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-4 py-2">
      {/* السطر العلوي */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-jakarta font-medium text-text-secondary">
        <span className="inline-flex items-center gap-2 text-text-primary">
          <span className="h-2 w-2 rounded-full bg-accent shadow-accent-glow" />
          {PROFILE_DATA.location}
        </span>
        <span className="text-white/30">•</span>
        <span className="text-text-primary/90">
          {PROFILE_DATA.education.institution}
        </span>
        <span className="text-white/30">•</span>
        <span className="text-accent font-semibold">
          {PROFILE_DATA.experienceYears} Experience
        </span>
      </div>

      {/* القسم المركزي مع مكون TechText الأصلي لاسم كريم كحالة */}
      <div className="flex w-full max-w-5xl flex-col items-center text-center">
        <p className="mb-1 font-jakarta text-sm md:text-base font-semibold tracking-wide text-accent">
          Software Engineer & Visual Identity Designer
        </p>

        {/* حاوية بارتفاع صريح لتمكين محرك الـ Canvas داخل TechText من العمل بكامل قوته */}
        <div
          style={{
            width: "100%",
            height: "210px",
            position: "relative",
          }}
        >
          <TechText
            text="Kareem Kahale"
            fontWeight={600}
            fontSize={150}
            color="#F7FBFA"
            accentColor="#9EE6D0"
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
          />
        </div>

        <p className="mt-1 max-w-2xl font-jakarta text-base md:text-xl font-normal leading-relaxed text-text-secondary">
          I am{" "}
          <span className="font-semibold text-text-primary">Kareem Kahale</span>
          , a{" "}
          <span className="font-semibold text-text-primary">
            Software Engineer
          </span>{" "}
          and{" "}
          <span className="font-semibold text-text-primary">
            Visual Designer
          </span>
          . I combine{" "}
          <span className="text-accent font-semibold">engineering logic</span>{" "}
          with{" "}
          <span className="text-accent font-semibold">creative design</span> to
          turn complex ideas into solid backend systems and clean, memorable
          brands.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <StarBorder
            color="#9EE6D0"
            trailColor="#5F9598"
            duration={4.2}
            onClick={() => onNavigateScene(2)}
          >
            <FolderKanban className="h-4 w-4 text-accent" />
            <span>Explore Selected Works</span>
          </StarBorder>

          <StarBorder
            color="#F7FBFA"
            trailColor="#9EE6D0"
            duration={4.8}
            href={PROFILE_DATA.designPortfolioDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 text-accent"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5L7.71 3.5zm9.73 11.5L10.89 3.5H17.7l6.55 11.5h-6.81zm-.57 1H4.58l-3.43 6h13.14l3.43-6h-.85z" />
            </svg>
            <span>{PROFILE_DATA.designPortfolioButtonLabel}</span>
            <ArrowUpRight className="h-4 w-4 text-accent" />
          </StarBorder>
        </div>
      </div>

      {/* القوس المنحني السفلي */}
      <div className="w-full max-w-5xl">
        <CurvedLoop
          marqueeText="Software Engineering  ✦  Visual Identity  ✦  Laravel RESTful APIs  ✦  Brand Systems  ✦  Damascus University  ✦"
          speed={1.1}
          curveAmount={55}
          direction="left"
          fontSize={14}
          fontWeight={500}
          letterSpacing={2}
          interactive={true}
        />
      </div>
    </div>
  );
};

export default HeroScene;