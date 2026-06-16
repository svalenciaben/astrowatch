import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        space: {
          void: "#080c14",
          deep: "#0d1220",
          navy: "#0f172a",
          steel: "#1e293b",
          muted: "#334155",
          dim: "#64748b",
          silver: "#94a3b8",
          light: "#cbd5e1",
          white: "#e2e8f0",
          blue: "#3b82f6",
          indigo: "#6366f1",
          alert: "#f97316",
          et: "#10b981",
        },
      },
    },
  },
  plugins: [],
};

export default config;
