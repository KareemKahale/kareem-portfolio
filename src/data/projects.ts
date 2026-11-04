import { ProjectCategory, ProjectItem } from "@/types/portfolio";

export const PROJECT_CATEGORIES: {
  id: ProjectCategory;
  label: string;
  code: string;
  description: string;
}[] = [
  {
    id: "Web & Backend",
    label: "Web & Backend",
    code: "01",
    description: "Production RESTful APIs, Service-Layer Architectures & Web Platforms",
  },
  {
    id: "Visual Branding",
    label: "Visual Branding",
    code: "02",
    description: "Brand Identity Systems, Logo Geometry & Packaging Design",
  },
  {
    id: "University Lab",
    label: "University Lab",
    code: "03",
    description: "Informatics Engineering Research, Algorithms & Academic Systems",
  },
];

/**
 * قائمة المشاريع الحقيقية المعتمدة (Zero Hallucination)
 * ملاحظة: لإضافة مشروع جديد في فئة Visual Branding أو University Lab خلال 60 ثانية،
 * انسخ القالب الموجود في أسفل هذا الملف والصقه داخل هذه المصفوفة.
 */
export const PROJECTS_DATA: ProjectItem[] = [
  // ==========================================
  // CATEGORY A: Web & Backend (REAL PROJECTS)
  // ==========================================
  {
    id: "car-rental-restful-api",
    title: "Car Rental RESTful API",
    subtitle: "Scalable Fleet & Booking Management Backend System",
    category: "Web & Backend",
    year: "2024",
    featured: true,
    techStack: [
      "PHP",
      "Laravel 11",
      "RESTful API",
      "Sanctum Auth",
      "Service-Contract Pattern",
      "SQLite/MySQL",
    ],
    summary:
      "A clean, modular RESTful API built with Laravel for managing vehicle fleets, customer bookings, and rental transactions.",
    highlights: [
      "Built with a strict Service-Layer Architecture and PHP Interfaces (Contracts) to keep Controllers thin and clean.",
      "Role-based access control via Laravel Sanctum and custom CheckRole middleware separating Admin and Customer workflows.",
      "Comprehensive fleet lifecycle handling: vehicle filtering, booking validation (BookingCarRequest), custom domain exceptions (BookingException), vehicle return inspections (VehicleReturnService), and payment tracking.",
      "Automated transactional email system (Mailables) for welcome emails, login security alerts, booking confirmations, and payment receipts.",
      "Clean JSON responses formatted via dedicated Laravel API Resources.",
    ],
    githubUrl: "https://github.com/KareemKahale",
  },
  {
    id: "maghribi-law-firm-platform",
    title: "Maghribi Law Firm Web Platform",
    subtitle: "Brand Identity & Official Web Platform (maghribilaw.sy)",
    category: "Web & Backend",
    year: "2024",
    featured: true,
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive UI",
      "Technical SEO",
      "Web Hosting",
    ],
    summary:
      "The official digital platform and visual identity for Maghribi Law Office in Damascus, built for speed, clarity, and search engine visibility.",
    highlights: [
      "Designed the complete visual identity and logo mark, translating legal authority into a modern, trustworthy interface.",
      "Engineered a fast, responsive front-end showcasing legal services, firm overview, and team profiles.",
      "Configured technical SEO fundamentals including sitemap.xml, robots.txt, and semantic HTML structure.",
      "Managed full deployment, domain configuration, and production hosting at maghribilaw.sy.",
    ],
    liveUrl: "https://maghribilaw.sy",
  },

  // ============================================================================
  // 60-SECOND TEMPLATE BLOCK FOR "Visual Branding" OR "University Lab"
  // ============================================================================
  // لإضافة مشروع هوية بصرية (مثل NETSYS أو SIFR Holding أو NOOSH) أو مشروع جامعي:
  // فقط أزل علامات التعليق (/* و */) عن الكتلة أدناه وعدّل النصوص:
  /*
  {
    id: "netsys-brand-identity",
    title: "NETSYS Brand Identity System",
    subtitle: "Complete Visual Identity & Geometric Logo Architecture",
    category: "Visual Branding", // أو "University Lab"
    year: "2024",
    featured: true,
    techStack: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Brand Guidelines",
      "Typography System",
      "Visual Identity"
    ],
    summary:
      "A cohesive visual identity system engineered with mathematical grid precision and bold typographic hierarchy.",
    highlights: [
      "Developed the primary logo mark using precision vector construction grids.",
      "Established a complete color system, typography scale, and brand usage guidelines.",
      "Designed stationery, digital touchpoints, and mockups demonstrating real-world scalability."
    ],
    liveUrl: "https://drive.google.com/drive/folders/YOUR_PROJECT_LINK"
  },
  */
];

export function getProjectsByCategory(category: ProjectCategory): ProjectItem[] {
  return PROJECTS_DATA.filter((project) => project.category === category);
}