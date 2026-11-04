import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#070B10",
          surface: "#0F1922",
          elevated: "#162430",
        },
        text: {
          primary: "#F7FBFA",   // أبيض نقي عالي التباين
          secondary: "#C2D6D2", // رمادي فضي فاتح ومقروء بوضوح ممتاز
        },
        accent: {
          DEFAULT: "#9EE6D0",   // أخضر مائي مضيء ولطيف عالي التباين
          warm: "#76C7B0",
          soft: "#E3FAF2",
          glow: "rgba(158, 230, 208, 0.22)",
        },
      },
      fontFamily: {
        syne: ["var(--font-jakarta)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        "accent-glow": "0 10px 35px -10px rgba(158, 230, 208, 0.28)",
        "accent-glow-lg": "0 20px 50px -12px rgba(158, 230, 208, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;