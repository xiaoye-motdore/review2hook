/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF8",
        card: "#FFFFFF",
        ink: "#2C2C2C",
        muted: "#6B6660",
        line: "#E8E2D9",
        accent: {
          DEFAULT: "#B5563C",
          dark: "#96482F",
          soft: "#F4E7E0",
        },
        danger: {
          DEFAULT: "#9B3B2E",
          soft: "#F3E3DE",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(44, 32, 24, 0.06), 0 4px 12px rgba(44, 32, 24, 0.05)",
      },
      maxWidth: {
        content: "720px",
      },
    },
  },
  plugins: [],
};
