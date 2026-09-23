/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#F2F4F8",
          dim: "#9DACC7",
          faint: "#5F7195",
        },
        surface: {
          DEFAULT: "#152238",
          alt: "#1C2E4C",
          raised: "#25406A",
        },
        bp: {
          bg: "#080E1A",
          line: "#2C4568",
        },
        gold: {
          DEFAULT: "#D4AC2B",
          bright: "#F0C94E",
          dim: "#8A701C",
        },
        good: {
          DEFAULT: "#48B47F",
          dim: "#2E6B4C",
        },
        bad: {
          DEFAULT: "#E1705F",
          dim: "#8C4038",
        },
      },
      fontFamily: {
        sans: ["Calibri", "'Segoe UI'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
