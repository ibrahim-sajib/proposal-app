import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF7FA",
          100: "#FFE9F1",
          200: "#FFD3E3",
          300: "#FFB3CE",
        },
        rose: {
          400: "#FF8FB3",
          500: "#FF6FA5",
          600: "#F0497F",
          700: "#D62E64",
        },
        plum: {
          400: "#8A4FB0",
          500: "#6B2D8C",
          600: "#531F71",
          700: "#3B1450",
        },
        lilac: {
          200: "#E9D8FB",
          300: "#D6B8F5",
          400: "#C9A8E9",
        },
        sunset: {
          peach: "#FFB088",
          gold: "#FFD36E",
          coral: "#FF7E79",
        },
        ink: "#2B1530",
        cream: "#FFFBF9",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "sunset-gradient":
          "linear-gradient(135deg, #FFD36E 0%, #FF9A8B 35%, #FF6FA5 65%, #8A4FB0 100%)",
        "dusk-gradient":
          "linear-gradient(160deg, #2B1530 0%, #531F71 45%, #D62E64 100%)",
        "blush-radial":
          "radial-gradient(120% 120% at 50% 0%, #FFF7FA 0%, #FFE9F1 45%, #E9D8FB 100%)",
        "glass-card":
          "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
      },
      boxShadow: {
        glow: "0 8px 40px -8px rgba(255, 111, 165, 0.45)",
        "glow-lg": "0 20px 60px -12px rgba(107, 45, 140, 0.35)",
        glass: "0 8px 32px 0 rgba(107, 45, 140, 0.15)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        sparkle: "sparkle 1.6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(6deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0.5)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
