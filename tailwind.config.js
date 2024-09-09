/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideUP: {
          "0%": { transform: "translateY(100%)", color: "transparent" },
          "100%": { transform: "translateY(0)", color: "black" },
        },
      },
      animation: {
        slideUP: "slideUP 2s ease-out forwards",
      },
      width: {
        "60-px": "60px",
        "30%": "30%",
        "70%": "70%",
        "95%": "95%",
        236: "236px",
      },
      height: {
        "10%": "10%",
        "90%": "90%",
      },
      fontSize: {
        32: "32px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundColor: {
        "blue-intensity": "#0D7CFF",
        "green-intensity": "#23AD00",
        "red-intensity": "#F20000",
        "brown-intensity": "#B16000",
      },
      textColor: {
        "blue-intensity-100": "#0D51FF",
        "green-intensity-100": "#209F00",
        "red-intensity-100": "#ED0000",
        "brown-intensity-100": "#A45900",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
