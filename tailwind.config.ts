import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#030712",
          secondary: "#0f172a",
          tertiary: "#1e293b",
          accent: "#06b6d4",
        },
        neon: {
          cyan: "#06b6d4",
          blue: "#3b82f6",
          purple: "#a855f7",
          emerald: "#10b981",
          red: "#ef4444",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-dark":
          "linear-gradient(135deg, #030712 0%, #0f172a 50%, #1e293b 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "spin-slow": "spin 20s linear infinite",
        "typing": "typing 4s steps(40, end), blink 0.75s step-end infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.8)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "0%, 49%": { borderColor: "transparent" },
          "50%, 100%": { borderColor: "#06b6d4" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
