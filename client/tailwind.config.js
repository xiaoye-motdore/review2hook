/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        card: "#FFFFFF",
        ink: "#2C2C2C",
        muted: "#6B6660",
        line: "#D0D0D0",
        accent: {
          DEFAULT: "#E86C47",
          dark: "#C24E2C",
          soft: "#FCE8E1",
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
