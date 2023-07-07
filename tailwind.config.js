/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        opacity: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },

      },
      animation: {
        wiggle: "wiggle 2s ease-in-out ",
        opacity: "opacity 2s ease-in-out ",

      },

    },
  },
  plugins: [],
};
