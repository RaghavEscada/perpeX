import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./animation/**/*.{js,ts,jsx,tsx,mdx}",
    "./container/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f1f1f1",
        secondry: "#212121",
        marquee: "#004d43",
        about: "#cdea68",
      },
      fontFamily: {
        // Existing fonts
        FoundersGrotesk: ["FoundersGrotesk", "sans-serif"],
        NeueMontreal: ["NeueMontreal", "sans-serif"],
        Gilda_Display: ["Gilda_Display", "sans-serif"],
        // New fonts from the image
        CreatoDisplay: ["Creato Display", "sans-serif"],
        Gilroy: ["Gilroy", "sans-serif"],
      },
      screens: {
        xm: { max: "400px" },
        sm: { min: "401px", max: "768px" },
        md: { min: "769px", max: "1024px" },
        lg: { min: "1025px", max: "1490px" },
        xl: { min: "1491px" },
      },
      keyframes: {
        "logo-cloud": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "logo-cloud": "logo-cloud 30s linear infinite",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;