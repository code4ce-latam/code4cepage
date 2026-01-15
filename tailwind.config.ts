import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          primary: "#00D0C0",
          dark: "#00AFA3",
        },
        orange: {
          accent: "#F86828",
        },
        gray: {
          text: "#111827",
          ui: "#6B7280",
          light: "#E5E7EB",
        },
      },
    },
  },
  plugins: [],
};
export default config;
