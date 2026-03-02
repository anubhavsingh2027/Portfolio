/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "neon-cyan": "#0891b2",
        "neon-purple": "#9333ea",
        "dark-bg": "#f8f6f3",
        "dark-secondary": "#ede7e1",
        "dark-tertiary": "#dcd4ca",
        "gradient-start": "#667eea",
        "gradient-end": "#764ba2",
      },
      boxShadow: {
        "neon-cyan":
          "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)",
        "neon-purple":
          "0 0 20px rgba(183, 68, 255, 0.5), 0 0 40px rgba(183, 68, 255, 0.3)",
        "neon-glow":
          "0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(183, 68, 255, 0.2)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(183, 68, 255, 0.45))",
        "gradient-dark":
          "linear-gradient(135deg, rgba(248, 246, 243, 0.95), rgba(237, 231, 225, 0.95))",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 240, 255, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 240, 255, 0.8)" },
        },
        slideInUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInDown: {
          "0%": { opacity: 0, transform: "translateY(-40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "slide-in-up": "slideInUp 0.5s ease-out",
        "slide-in-down": "slideInDown 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
