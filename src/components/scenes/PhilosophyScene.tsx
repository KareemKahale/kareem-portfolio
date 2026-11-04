"use client";

import React from "react";
import {
  Code2,
  PenTool,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { SpotlightTiltCard } from "@/components/ui/SpotlightTiltCard";
import { StarBorder } from "@/components/ui/StarBorder";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";

interface PhilosophySceneProps {
  onNavigateScene: (sceneIndex: number) => void;
}

export const PhilosophyScene: React.FC<PhilosophySceneProps> = ({
  onNavigateScene,
}) => {
  const { engineering, design } = PROFILE_DATA.skills;

  return (
    <div className="flex w-full max-w-5xl flex-col justify-center gap-5">
      {/* رأس قسم Craft مع العنوان التفاعلي */}
      <div className="flex flex-col items-center text-center">
        <span className="mb-1 font-jakarta text-xs md:text-sm font-semibold uppercase tracking-wider text-accent">
          Dual Craft Philosophy
        </span>

        <InteractiveHeading
          text="Engineering Logic & Visual Identity"
          highlightWords={["&", "Visual", "Identity"]}
        />

        <p className="mt-2 max-w-2xl font-jakarta text-sm md:text-base text-text-secondary">
          {PROFILE_DATA.experienceSummary}
        </p>
      </div>

      {/* البطاقتان بتصميم مدمج ومتوازن يظهر بالكامل على الشاشة بدون أي قص */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SpotlightTiltCard className="p-6">
          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Code2 className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-accent/15 px-3 py-1 font-jakarta text-xs font-semibold text-accent">
                  {engineering.category}
                </span>
              </div>

              <h3 className="mt-3.5 font-jakarta text-lg md:text-xl font-bold text-text-primary">
                {engineering.title}
              </h3>

              <p className="mt-1.5 font-jakarta text-xs md:text-sm leading-relaxed text-text-secondary">
                {engineering.description}
              </p>

              <ul className="mt-3.5 space-y-2 text-xs md:text-sm text-text-primary/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  <span>
                    Service-Contract Architecture & Thin Controllers in Laravel
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  <span>
                    Role-based Sanctum Security, Custom Exceptions & API
                    Resources
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {engineering.items.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/[0.07] px-3 py-1 font-jakarta text-xs font-medium text-text-primary transition-colors hover:bg-accent hover:text-obsidian"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SpotlightTiltCard>

        <SpotlightTiltCard className="p-6">
          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <PenTool className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-accent/15 px-3 py-1 font-jakarta text-xs font-semibold text-accent">
                  {design.category}
                </span>
              </div>

              <h3 className="mt-3.5 font-jakarta text-lg md:text-xl font-bold text-text-primary">
                {design.title}
              </h3>

              <p className="mt-1.5 font-jakarta text-xs md:text-sm leading-relaxed text-text-secondary">
                {design.description}
              </p>

              <ul className="mt-3.5 space-y-2 text-xs md:text-sm text-text-primary/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  <span>
                    4+ Years Crafting Complete Brand Identities & Logo Systems
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  <span>
                    Precision Vector Grids, Typography Hierarchy & Packaging
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {design.items.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-white/[0.07] px-3 py-1 font-jakarta text-xs font-medium text-text-primary transition-colors hover:bg-accent hover:text-obsidian"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </SpotlightTiltCard>
      </div>

      {/* الشريط السفلي لقسم Craft ظاهر بالكامل وزر الانتقال للمشاريع واضح وسهل الضغط */}
      <div className="glass-panel flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-3.5">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-jakarta text-sm md:text-base font-bold text-text-primary">
              {PROFILE_DATA.education.degree}
            </h4>
            <p className="font-jakarta text-xs font-medium text-text-secondary">
              {PROFILE_DATA.education.institution} •{" "}
              {PROFILE_DATA.education.location}
            </p>
          </div>
        </div>

        <StarBorder onClick={() => onNavigateScene(2)}>
          <span>View Selected Works</span>
          <ArrowRight className="h-4 w-4 text-accent" />
        </StarBorder>
      </div>
    </div>
  );
};

export default PhilosophyScene;