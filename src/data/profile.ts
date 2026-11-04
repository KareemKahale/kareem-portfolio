import { ProfileData, SceneMetadata } from "@/types/portfolio";

/**
 * رابط معرض أعمال التصميم على Google Drive
 * يمكنك استبدال الرابط أدناه في أي وقت دون المساس بأي ملف آخر
 */
export const DESIGN_PORTFOLIO_DRIVE_URL =
  "https://drive.google.com/file/d/10G0rqz8qqIlai_qFH-Z3a2yd4luAowKg/view?usp=drive_link";

export const PROFILE_DATA: ProfileData = {
  name: "Kareem Kahale",
  firstName: "Kareem",
  lastName: "Kahale",
  role: "Software Engineer & Visual Identity Designer",
  shortRole: "Software Engineer & Visual Designer",
  location: "Damascus, Syria",
  education: {
    degree: "Informatics Engineering Undergraduate",
    institution: "Damascus University",
    location: "Damascus, Syria",
  },
  experienceYears: "4+ Years",
  experienceSummary:
    "4+ years in Professional Graphic Design & Branding, combined with Backend Software Engineering.",
  bio: "I am Kareem Kahale, a Software Engineer and Visual Designer. I combine engineering logic with creative design to turn complex ideas into solid backend systems and clean, memorable brands.",
  designPortfolioDriveUrl: DESIGN_PORTFOLIO_DRIVE_URL,
  designPortfolioButtonLabel: "View Design Portfolio (Drive)",
  contact: {
    email: "Kahale.b.kareem@gmail.com",
    whatsappUrl: "https://wa.me/963959791311",
    whatsappDisplay: "+963 959 791 311",
    github: "https://github.com/KareemKahale",
    linkedin: "https://www.linkedin.com/in/kareem-kahale-3180103b5",
    instagram: "https://www.instagram.com/kareem_kahale",
  },
  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "@KareemKahale",
      url: "https://github.com/KareemKahale",
      platform: "github",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "Kareem Kahale",
      url: "https://www.linkedin.com/in/kareem-kahale-3180103b5",
      platform: "linkedin",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@kareem_kahale",
      url: "https://www.instagram.com/kareem_kahale",
      platform: "instagram",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      handle: "+963 959 791 311",
      url: "https://wa.me/963959791311",
      platform: "whatsapp",
    },
    {
      id: "email",
      label: "Email",
      handle: "Kahale.b.kareem@gmail.com",
      url: "mailto:Kahale.b.kareem@gmail.com",
      platform: "email",
    },
  ],
  skills: {
    engineering: {
      category: "Engineering",
      title: "Backend & Systems Engineering",
      description:
        "Architecting modular RESTful APIs, clean service-layer patterns, relational databases, and scalable web platforms.",
      items: [
        "PHP",
        "Laravel",
        "RESTful APIs",
        "TypeScript",
        "Next.js",
        "SQL",
        "Git",
        "VS Code",
      ],
    },
    design: {
      category: "Design",
      title: "Visual Identity & Brand Systems",
      description:
        "Crafting distinctive brand identities, precision vector geometry, packaging systems, and cohesive visual languages.",
      items: [
        "Adobe Illustrator",
        "Adobe Photoshop",
        "Figma",
        "Brand Identity Systems",
        "Packaging Design",
      ],
    },
  },
};

export const PORTFOLIO_SCENES: SceneMetadata[] = [
  {
    id: "hero",
    index: 0,
    label: "Portal",
    code: "01",
    subtitle: "Identity & Entrance",
  },
  {
    id: "philosophy",
    index: 1,
    label: "Craft",
    code: "02",
    subtitle: "Engineering + Design",
  },
  {
    id: "works",
    index: 2,
    label: "Works",
    code: "03",
    subtitle: "Selected Projects",
  },
  {
    id: "architecture",
    index: 3,
    label: "System",
    code: "04",
    subtitle: "API Architecture Flow",
  },
  {
    id: "contact",
    index: 4,
    label: "Contact",
    code: "05",
    subtitle: "Direct Channels",
  },
];