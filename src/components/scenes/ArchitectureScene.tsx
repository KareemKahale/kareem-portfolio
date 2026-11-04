"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  FileJson,
  Send,
  Play,
  Pause,
  CheckCircle2,
//   Github,
  ArrowUpRight,
} from "lucide-react";
import { JellyRadio } from "@/components/ui/JellyRadio";
import { SpotlightTiltCard } from "@/components/ui/SpotlightTiltCard";
import { StarBorder } from "@/components/ui/StarBorder";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";
import { PROFILE_DATA } from "@/data/profile";

interface ArchitectureStage {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  pills: string[];
  previewTitle: string;
  previewLines: { label: string; value: string }[];
}

const ARCHITECTURE_STAGES: ArchitectureStage[] = [
  {
    id: "Request",
    label: "1. Request",
    title: "Request & Domain Validation",
    subtitle: "BookingCarRequest • Clean Entry Point",
    description:
      "Every fleet or booking operation enters through a dedicated Laravel FormRequest layer, validating dates, vehicle availability rules, and payload integrity before touching any controller.",
    highlights: [
      "Strict input validation via custom BookingCarRequest rules.",
      "Keeps controllers thin, readable, and free of validation clutter.",
      "Immediate, structured error feedback for invalid booking windows.",
    ],
    pills: ["POST /api/bookings", "BookingCarRequest", "Thin Controller"],
    previewTitle: "Incoming Booking Payload",
    previewLines: [
      { label: "Endpoint", value: "POST /api/v1/bookings" },
      { label: "Validator", value: "BookingCarRequest::rules()" },
      { label: "Vehicle ID", value: "fleet_vehicle_104 (Available)" },
      { label: "Rental Period", value: "2025-05-10 → 2025-05-15" },
      { label: "Status", value: "Validated & Sanitized ✓" },
    ],
  },
  {
    id: "Security",
    label: "2. Security",
    title: "Sanctum Auth & Role Guard",
    subtitle: "Laravel Sanctum • Custom CheckRole Middleware",
    description:
      "Requests are authenticated using Laravel Sanctum tokens and filtered through a custom CheckRole middleware that cleanly separates Admin fleet management from Customer booking workflows.",
    highlights: [
      "Token-based authentication powered by Laravel Sanctum.",
      "Custom CheckRole middleware isolating Admin and Customer permissions.",
      "Automated security login alerts dispatched via Laravel Mailables.",
    ],
    pills: ["Laravel Sanctum", "CheckRole Middleware", "Admin / Customer"],
    previewTitle: "Security & Access Layer",
    previewLines: [
      { label: "Auth Guard", value: "Sanctum Bearer Token Verified" },
      { label: "Middleware", value: "CheckRole:customer,admin" },
      { label: "Active Role", value: "Authenticated Customer" },
      { label: "Security Alert", value: "LoginAlertMail Queued" },
      { label: "Access State", value: "Authorized to Proceed ✓" },
    ],
  },
  {
    id: "Service",
    label: "3. Service Layer",
    title: "Service-Contract Pattern & Lifecycle",
    subtitle: "PHP Interfaces (Contracts) • Domain Exceptions • Mailables",
    description:
      "Core business logic lives inside modular Services bound to PHP Interfaces (Contracts). It handles booking creation, custom BookingException rules, VehicleReturnService inspections, and transactional emails.",
    highlights: [
      "Loose coupling via PHP Contracts (Interfaces) and Service Providers.",
      "Dedicated VehicleReturnService for post-rental inspection & payments.",
      "Domain-specific BookingException handling & automated Mailables.",
    ],
    pills: [
      "Service-Contract Pattern",
      "VehicleReturnService",
      "BookingException",
      "Mailables",
    ],
    previewTitle: "Service Layer Execution",
    previewLines: [
      { label: "Contract", value: "BookingServiceInterface" },
      { label: "Service", value: "BookingService::createBooking()" },
      { label: "Inspection", value: "VehicleReturnService Ready" },
      { label: "Notification", value: "BookingConfirmationMail Sent" },
      { label: "Transaction", value: "Committed to SQLite / MySQL ✓" },
    ],
  },
  {
    id: "Response",
    label: "4. JSON Resource",
    title: "Formatted API Resource Output",
    subtitle: "Laravel API Resources • Consistent JSON Schema",
    description:
      "Database models are never exposed raw. Dedicated Laravel API Resources transform the booking, vehicle fleet details, and payment status into a clean, predictable JSON response.",
    highlights: [
      "Decouples database schema from public API output.",
      "Consistent status codes, pagination metadata, and nested relations.",
      "Ready for web, mobile, or third-party client consumption.",
    ],
    pills: ["API Resources", "Clean JSON Schema", "201 Created"],
    previewTitle: "Final API Resource Output",
    previewLines: [
      { label: "HTTP Status", value: "201 Created" },
      { label: "Transformer", value: "BookingResource::make($booking)" },
      { label: "Booking Ref", value: "#BK-2025-0891" },
      { label: "Payment State", value: "Verified • Receipt Dispatched" },
      { label: "Response Time", value: "18ms • Clean JSON Delivered ✓" },
    ],
  },
];

export const ArchitectureScene: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const currentStage =
    ARCHITECTURE_STAGES[activeStageIdx] ?? ARCHITECTURE_STAGES[0];
  const stageLabels = ARCHITECTURE_STAGES.map((s) => s.label);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % ARCHITECTURE_STAGES.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  const getStageIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Send className="h-5 w-5" />;
      case 1:
        return <ShieldCheck className="h-5 w-5" />;
      case 2:
        return <Layers className="h-5 w-5" />;
      default:
        return <FileJson className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex w-full max-w-5xl flex-col justify-center gap-5">
      <div className="flex flex-col items-center text-center">
        <span className="mb-1 font-jakarta text-xs md:text-sm font-semibold uppercase tracking-wider text-accent">
          System Architecture Showcase
        </span>

        <InteractiveHeading
          text="Car Rental API Flow"
          highlightWords={["API", "Flow"]}
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <JellyRadio
            items={stageLabels}
            value={currentStage.label}
            onChange={(_, idx) => {
              setIsAutoPlaying(false);
              setActiveStageIdx(idx);
            }}
            chipColor="rgba(255, 255, 255, 0.05)"
            activeColor="#9EE6D0"
            textColor="#E2F1EE"
            activeTextColor="#070B10"
            size="md"
            gap={10}
            radius={9999}
          />

          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-jakarta text-xs font-semibold transition-all ${
              isAutoPlaying
                ? "bg-accent text-obsidian shadow-accent-glow"
                : "bg-white/[0.06] text-text-primary hover:bg-accent/20 hover:text-accent"
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>Pause Flow</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-accent" />
                <span>Auto-Simulate</span>
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          <SpotlightTiltCard className="p-6 md:p-7 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  {getStageIcon(activeStageIdx)}
                </span>
                <span className="rounded-full bg-accent/15 px-3.5 py-1 font-jakarta text-xs font-semibold text-accent">
                  Step {activeStageIdx + 1} of {ARCHITECTURE_STAGES.length}
                </span>
              </div>

              <h3 className="mt-4 font-jakarta text-xl md:text-2xl font-bold text-text-primary">
                {currentStage.title}
              </h3>
              <p className="mt-1 font-jakarta text-xs md:text-sm font-medium text-accent">
                {currentStage.subtitle}
              </p>

              <p className="mt-3 font-jakarta text-sm leading-relaxed text-text-secondary">
                {currentStage.description}
              </p>

              <ul className="mt-4 space-y-2">
                {currentStage.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 font-jakarta text-xs md:text-sm text-text-primary/90"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-4 flex flex-wrap gap-2">
              {currentStage.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-white/[0.07] px-3.5 py-1 font-jakarta text-xs font-medium text-text-primary"
                >
                  {pill}
                </span>
              ))}
            </div>
          </SpotlightTiltCard>

          <SpotlightTiltCard className="p-6 md:p-7 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-jakarta text-xs font-bold uppercase tracking-wider text-accent">
                  {currentStage.previewTitle}
                </span>
                <span className="flex items-center gap-1.5 font-jakarta text-xs font-medium text-text-primary">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Live State
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {currentStage.previewLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 rounded-2xl bg-white/[0.04] px-4 py-2.5"
                  >
                    <span className="font-jakarta text-xs text-text-secondary">
                      {line.label}
                    </span>
                    <span className="font-jakarta text-xs font-semibold text-text-primary text-right">
                      {line.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 flex items-center justify-between">
              <span className="font-jakarta text-xs font-medium text-text-secondary">
                Laravel 11 Architecture
              </span>

              <StarBorder
                href={PROFILE_DATA.contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <Github className="h-4 w-4 text-accent" /> */}
                <span>Source Code</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
              </StarBorder>
            </div>
          </SpotlightTiltCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ArchitectureScene;