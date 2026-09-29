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
        background: "#FFFFFF",
        foreground: "#1F2937",
        gov: {
          blue: "#0056A6",
          deepBlue: "#003B73",
          lightBlue: "#EAF4FB",
          orange: "#F58220",
          lightOrange: "#FFF3E8",
          green: "#2E7D32",
          lightGreen: "#EAF6EC",
          bg: "#FFFFFF",
          secondaryBg: "#F7F9FC",
          sectionBg: "#F1F6FA",
          card: "#FFFFFF",
          border: "#E1E7ED",
          text: "#1F2937",
          heading: "#12304A",
          secondaryText: "#5F6B76",
          muted: "#7A8793",
          error: "#C62828",
          errorBg: "#FDECEC",
        },
        navy: {
          DEFAULT: "#0056A6",
          dark: "#003B73",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        telugu: ["var(--font-telugu)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

