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
          cream: "#f5f0e8",
          parchment: "#ede8de",
          sand: "#d9d0c0",
          warm: "#c8bfaf",
          muted: "#9e9484",
          dim: "#6b6257",
          ink: "#3a3530",
          deep: "#1a1a2e",
          navy: "#0f0f23",
          blue: "#2d5a9e",
          indigo: "#3d3580",
          alert: "#c0392b",
          et: "#1a6b4a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
