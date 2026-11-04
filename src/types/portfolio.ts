export type SceneId = "hero" | "philosophy" | "works" | "architecture" | "contact";

export interface SceneMetadata {
  id: SceneId;
  index: number;
  label: string;
  code: string;
  subtitle: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  platform: "github" | "linkedin" | "instagram" | "whatsapp" | "email" | "drive";
}

export interface SkillGroup {
  category: "Engineering" | "Design";
  title: string;
  description: string;
  items: string[];
}

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  shortRole: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    location: string;
  };
  experienceYears: string;
  experienceSummary: string;
  bio: string;
  designPortfolioDriveUrl: string;
  designPortfolioButtonLabel: string;
  contact: {
    email: string;
    whatsappUrl: string;
    whatsappDisplay: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
  socials: SocialLink[];
  skills: {
    engineering: SkillGroup;
    design: SkillGroup;
  };
}

export type ProjectCategory = "Web & Backend" | "Visual Branding" | "University Lab";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  techStack: string[];
  summary: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  year?: string;
  featured?: boolean;
}