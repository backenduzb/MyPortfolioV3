/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          from: { "--border-angle": "0deg" },
          to: { "--border-angle": "360deg" },
        },
      },
    },
  },
  plugins: [],
};
