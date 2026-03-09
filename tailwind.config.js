/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Geist", "system-ui", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      colors: {
        paper: "#f8f7f4",
        paper2: "#f0efe9",
        ink: "#0a0a0a",
        ink2: "#3a3a3a",
        ink3: "#888888",
      },
      letterSpacing: {
        widest2: "0.18em",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};
