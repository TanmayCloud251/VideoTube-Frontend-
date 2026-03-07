import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#2D2A32",
          accent: "#DDD92A",
          light: "#FAFDF6",
        },
      },
    },
  },
  plugins: [],
};

export default config;