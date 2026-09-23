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
          DEFAULT: "#EDEFF3",
          dim: "#93A2BC",
          faint: "#5B6B87",
        },
        surface: {
          DEFAULT: "#101E33",
          alt: "#16273F",
          raised: "#1C2E4A",
        },
        bp: {
          bg: "#0B1524",
          line: "#22334F",
        },
        gold: {
          DEFAULT: "#C9A227",
          bright: "#E4C158",
          dim: "#8A701C",
        },
        good: {
          DEFAULT: "#4CAF7D",
          dim: "#2E6B4C",
        },
        bad: {
          DEFAULT: "#D96B5D",
          dim: "#8C4038",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans Arabic'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(34,51,79,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(34,51,79,0.55) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
    },
  },
  plugins: [],
};
