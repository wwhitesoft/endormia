import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#07090d",
          soft: "#0c1118",
        },
        panel: "rgba(16, 21, 30, 0.78)",
        "panel-strong": "rgba(13, 18, 26, 0.96)",
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },
        text: "#f6f1ea",
        muted: {
          DEFAULT: "#b4b1ac",
          2: "#8f949d",
        },
        accent: {
          DEFAULT: "#99aeff",
          soft: "rgba(153, 174, 255, 0.16)",
        },
        "accent-2": "#8ee3ff",
        cream: "#ece6dc",
        ink: "#111317",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["Iowan Old Style", "Palatino Linotype", "Palatino", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "34px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "30px",
        "5xl": "40px",
      },
      boxShadow: {
        lg: "0 30px 80px rgba(0,0,0,0.32)",
        md: "0 18px 48px rgba(0,0,0,0.24)",
      },
      maxWidth: {
        site: "1180px",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(0.98)", opacity: "0.88" },
          "50%": { transform: "translate(-50%, -50%) scale(1.03)", opacity: "1" },
        },
      },
      animation: {
        "glow-pulse": "pulse 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
