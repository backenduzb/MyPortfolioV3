module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        trail: {
          "0%": {
            background: "linear-gradient(90deg, rgba(189,159,103,0) 90%, rgb(189,159,103) 100%)",
            opacity: "0",
          },
          "30%": {
            background: "linear-gradient(90deg, rgba(189,159,103,0) 70%, rgb(189,159,103) 100%)",
            opacity: "1",
          },
          "70%": {
            background: "linear-gradient(90deg, rgba(189,159,103,0) 70%, rgb(189,159,103) 100%)",
            opacity: "1",
          },
          "95%": {
            background: "linear-gradient(90deg, rgba(189,159,103,0) 90%, rgb(189,159,103) 100%)",
            opacity: "0",
          },
        },
      },
      animation: {
        trail: "trail 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
