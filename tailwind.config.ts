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
        orbitron: ["Orbitron", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        space: {
          black: "#030712",
          dark: "#0a0f1e",
          blue: "#1d4ed8",
          electric: "#3b82f6",
          neon: "#22d3ee",
          green: "#4ade80",
          alien: "#a3e635",
          purple: "#7c3aed",
          alert: "#ef4444",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          from: { textShadow: "0 0 10px #22d3ee, 0 0 20px #22d3ee" },
          to: { textShadow: "0 0 20px #22d3ee, 0 0 40px #22d3ee, 0 0 60px #22d3ee" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
