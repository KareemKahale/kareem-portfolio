"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Globe,
  Server,
  Sparkles,
  ArrowUpRight,
  Eye,
  Workflow,
} from "lucide-react";
import { ProjectCategory, ProjectItem } from "@/types/portfolio";
import { PROJECT_CATEGORIES, getProjectsByCategory } from "@/data/projects";
import { PROFILE_DATA } from "@/data/profile";
import { SpotlightTiltCard } from "@/components/ui/SpotlightTiltCard";
import { StarBorder } from "@/components/ui/StarBorder";
import { JellyRadio } from "@/components/ui/JellyRadio";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";

interface WorksSceneProps {
  onSelectProject: (project: ProjectItem) => void;
  onNavigateScene: (sceneIndex: number) => void;
}

export const WorksScene: React.FC<WorksSceneProps> = ({
  onSelectProject,
  onNavigateScene,
}) => {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("Web & Backend");

  const filteredProjects = getProjectsByCategory(activeCategory);
  const categoryLabels = PROJECT_CATEGORIES.map((c) => c.label);

  return (
    <div className="flex w-full max-w-5xl flex-col justify-center gap-6">
      <div className="flex flex-col items-center text-center">
        <span className="mb-1 font-jakarta text-xs md:text-sm font-semibold uppercase tracking-wider text-accent">
          Selected Works
        </span>

        <InteractiveHeading
          text="Engineered Systems & Brand Worlds"
          highlightWords={["&", "Brand", "Worlds"]}
        />

        <div className="mt-5">
          <JellyRadio
            items={categoryLabels}
            value={activeCategory}
            onChange={(val) => setActiveCategory(val as ProjectCategory)}
            chipColor="rgba(255, 255, 255, 0.05)"
            activeColor="#9EE6D0"
            textColor="#E2F1EE"
            activeTextColor="#070B10"
            size="md"
            gap={10}
            radius={9999}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            {filteredProjects.map((project) => {
              const isApiProject = project.id === "car-rental-restful-api";

              return (
                <SpotlightTiltCard
                  key={project.id}
                  className="group flex flex-col justify-between p-6 md:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1 font-jakarta text-xs font-semibold text-accent">
                        {isApiProject ? (
                          <Server className="h-3.5 w-3.5" />
                        ) : (
                          <Globe className="h-3.5 w-3.5" />
                        )}
                        <span>
                          {isApiProject
                            ? "Backend Architecture"
                            : "Live Web Platform"}
                        </span>
                      </span>

                      <span className="font-jakarta text-xs font-medium text-text-secondary">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="mt-4 font-jakarta text-xl md:text-2xl font-bold text-text-primary transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-jakarta text-xs md:text-sm font-medium text-accent">
                      {project.subtitle}
                    </p>

                    <p className="mt-2.5 font-jakarta text-sm leading-relaxed text-text-secondary">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4">
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white/[0.07] px-3 py-1 font-jakarta text-xs font-medium text-text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-jakarta text-xs font-bold text-obsidian shadow-accent-glow transition-transform hover:scale-[1.03] active:scale-95"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Case Study</span>
                      </button>

                      {isApiProject ? (
                        <button
                          type="button"
                          onClick={() => onNavigateScene(3)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 font-jakarta text-xs font-semibold text-text-primary transition-colors hover:bg-accent/20 hover:text-accent"
                        >
                          <Workflow className="h-3.5 w-3.5 text-accent" />
                          <span>Explore API Flow</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                        </button>
                      ) : (
                        project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 font-jakarta text-xs font-semibold text-text-primary transition-colors hover:bg-accent/20 hover:text-accent"
                          >
                            <span>maghribilaw.sy</span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </SpotlightTiltCard>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key={`empty-${activeCategory}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mx-auto w-full max-w-2xl"
          >
            <SpotlightTiltCard className="flex flex-col items-center justify-center p-8 md:p-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Sparkles className="h-5 w-5" />
              </div>

              <h3 className="mt-1 font-jakarta text-xl md:text-2xl font-bold text-text-primary">
                Curating Selected Works — New case studies coming soon.
              </h3>

              <p className="mt-2.5 max-w-md font-jakarta text-sm text-text-secondary leading-relaxed">
                {activeCategory === "Visual Branding"
                  ? "Selected brand identity systems, logo geometry, and packaging presentations are currently being formatted. Meanwhile, you can explore the complete design portfolio on Google Drive."
                  : "Academic informatics engineering projects and algorithms from Damascus University are being documented for interactive presentation."}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <StarBorder
                  href={PROFILE_DATA.designPortfolioDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{PROFILE_DATA.designPortfolioButtonLabel}</span>
                  <ArrowUpRight className="h-4 w-4 text-accent" />
                </StarBorder>
              </div>
            </SpotlightTiltCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorksScene;