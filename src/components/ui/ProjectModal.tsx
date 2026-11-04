"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ExternalLink,
  // Github,
  CheckCircle2,
  Workflow,
} from "lucide-react";
import { ProjectItem } from "@/types/portfolio";
import { StarBorder } from "@/components/ui/StarBorder";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInspectArchitecture?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInspectArchitecture,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  const isCarRentalApi = project?.id === "car-rental-restful-api";

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-lg"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 30,
            }}
            className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-[#14141F]/95 p-6 md:p-8 shadow-accent-glow-lg backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-4 pb-5">
              <div>
                <span className="inline-block rounded-full bg-accent/15 px-3.5 py-1 font-jakarta text-xs font-medium text-accent">
                  {project.category}
                </span>

                <h3
                  id="modal-project-title"
                  className="mt-3 font-jakarta text-2xl md:text-3xl font-bold text-text-primary"
                >
                  {project.title}
                </h3>
                <p className="mt-1 font-jakarta text-sm text-accent/90">
                  {project.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                data-cursor-hover="true"
                aria-label="Close project details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-text-secondary transition-colors hover:bg-accent/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto py-2">
              <p className="font-jakarta text-sm md:text-base leading-relaxed text-text-primary/90">
                {project.summary}
              </p>

              <div>
                <h4 className="mb-3 font-jakarta text-xs font-semibold uppercase tracking-wider text-accent">
                  Key Highlights
                </h4>

                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-2xl bg-white/[0.025] p-3.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="font-jakarta text-xs md:text-sm leading-relaxed text-text-secondary">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2.5 font-jakarta text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-accent/15 px-3.5 py-1.5 font-jakarta text-xs font-medium text-text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4">
              <div className="flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <StarBorder
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* <Github className="h-4 w-4 text-accent" /> */}
                    <span>View on GitHub</span>
                    <ExternalLink className="h-3.5 w-3.5 text-text-secondary" />
                  </StarBorder>
                )}

                {project.liveUrl && (
                  <StarBorder
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 text-accent" />
                    <span>Visit Live Platform</span>
                  </StarBorder>
                )}

                {isCarRentalApi && onInspectArchitecture && (
                  <StarBorder
                    onClick={() => {
                      onClose();
                      onInspectArchitecture();
                    }}
                  >
                    <Workflow className="h-4 w-4 text-accent" />
                    <span>Simulate API Flow</span>
                  </StarBorder>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;