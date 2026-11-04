"use client";

import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
//   Github,
//   Linkedin,
//   Instagram,
  ArrowUpRight,
  Copy,
  Check,
  MapPin,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { SpotlightTiltCard } from "@/components/ui/SpotlightTiltCard";
import { StarBorder } from "@/components/ui/StarBorder";
import { InteractiveHeading } from "@/components/ui/InteractiveHeading";

export const ContactScene: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      window.location.href = `mailto:${PROFILE_DATA.contact.email}`;
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
    //   case "github":
    //     return <Github className="h-5 w-5" />;
    //   case "linkedin":
    //     return <Linkedin className="h-5 w-5" />;
    //   case "instagram":
    //     return <Instagram className="h-5 w-5" />;
      case "whatsapp":
        return <MessageCircle className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-5 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 font-jakarta text-xs font-medium text-text-primary">
        <MapPin className="h-3.5 w-3.5 text-accent" />
        <span>{PROFILE_DATA.location} • Available for Projects & Roles</span>
      </div>

      <InteractiveHeading
        text="Let's Create Something Memorable"
        highlightWords={["Memorable"]}
      />

      <p className="max-w-2xl font-jakarta text-sm md:text-base leading-relaxed text-text-secondary">
        Whether you need a scalable backend system built with clean engineering
        logic or a distinctive visual identity for your brand, feel free to
        reach out directly.
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <StarBorder
          color="#9EE6D0"
          trailColor="#5F9598"
          duration={4}
          href={PROFILE_DATA.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="h-4 w-4 text-accent" />
          <span>WhatsApp ({PROFILE_DATA.contact.whatsappDisplay})</span>
          <ArrowUpRight className="h-4 w-4 text-accent" />
        </StarBorder>

        <StarBorder
          color="#F7FBFA"
          trailColor="#9EE6D0"
          duration={4.5}
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

        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-white/[0.07] px-6 py-3 font-jakarta text-sm font-semibold text-text-primary transition-all hover:bg-accent hover:text-obsidian active:scale-95"
        >
          {copiedEmail ? (
            <>
              <Check className="h-4 w-4" />
              <span>Email Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-accent" />
              <span>{PROFILE_DATA.contact.email}</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PROFILE_DATA.socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target={social.platform === "email" ? undefined : "_blank"}
            rel={
              social.platform === "email" ? undefined : "noopener noreferrer"
            }
            className="block cursor-pointer focus:outline-none"
          >
            <SpotlightTiltCard className="group flex flex-col items-start justify-between p-5 text-left h-full transition-transform hover:-translate-y-1">
              <div className="flex w-full items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110">
                  {getSocialIcon(social.platform)}
                </span>
                <ArrowUpRight className="h-4 w-4 text-text-secondary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </div>

              <div className="mt-4 w-full">
                <h3 className="font-jakarta text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                  {social.label}
                </h3>
                <p className="mt-0.5 truncate font-jakarta text-xs font-medium text-text-secondary">
                  {social.handle}
                </p>
              </div>
            </SpotlightTiltCard>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactScene;