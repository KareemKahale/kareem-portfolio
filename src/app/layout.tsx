import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PROFILE_DATA } from "@/data/profile";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0B10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: `${PROFILE_DATA.name} — ${PROFILE_DATA.role}`,
  description: PROFILE_DATA.bio,
  keywords: [
    "Kareem Kahale",
    "Software Engineer",
    "Visual Identity Designer",
    "Backend Engineer",
    "Laravel Developer",
    "Brand Identity Designer",
    "Damascus",
    "Syria",
  ],
  authors: [{ name: PROFILE_DATA.name, url: PROFILE_DATA.contact.github }],
  creator: PROFILE_DATA.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${PROFILE_DATA.name} — ${PROFILE_DATA.role}`,
    description: PROFILE_DATA.bio,
    siteName: `${PROFILE_DATA.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE_DATA.name} — ${PROFILE_DATA.role}`,
    description: PROFILE_DATA.bio,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE_DATA.name,
    jobTitle: PROFILE_DATA.role,
    description: PROFILE_DATA.bio,
    email: `mailto:${PROFILE_DATA.contact.email}`,
    telephone: PROFILE_DATA.contact.whatsappDisplay,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Damascus",
      addressCountry: "SY",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: PROFILE_DATA.education.institution,
    },
    sameAs: [
      PROFILE_DATA.contact.github,
      PROFILE_DATA.contact.linkedin,
      PROFILE_DATA.contact.instagram,
    ],
    knowsAbout: [
      ...PROFILE_DATA.skills.engineering.items,
      ...PROFILE_DATA.skills.design.items,
    ],
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} dark`}>
      <body className="bg-obsidian font-jakarta text-text-primary antialiased selection:bg-accent selection:text-obsidian">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}