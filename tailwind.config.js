/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    fontFamily: {
      "jakarta-sans": ["Plus Jakarta Sans", "sans-serif"],
      saira: ["Saira Stencil One", "cursive"],
    },
    extend: {
      colors: {
        primary: colors.sky['500'],
      },
    },
  },
  plugins: [],
};
