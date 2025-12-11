/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Scandinavian Design Color Palette
        scandi: {
          // Light mode
          bg: "#FAFAFA", // Pure light background
          surface: "#FFFFFF", // Card/surface white
          muted: "#F5F5F5", // Muted background
          border: "#E8E8E8", // Subtle border
          // Text colors
          text: "#1A1A1A", // Primary text
          textMuted: "#6B7280", // Secondary text
          textLight: "#9CA3AF", // Tertiary text
          // Accent colors - natural, muted tones
          accent: "#2563EB", // Primary blue accent
          accentLight: "#EFF6FF", // Light blue bg
          warm: "#F5E6D3", // Warm beige
          sage: "#9CAF88", // Natural sage green
          terracotta: "#C4A484", // Earthy terracotta
          clay: "#D4B896", // Warm clay
          stone: "#A8A29E", // Natural stone
        },
        // Dark mode - cozy, warm dark
        scandiDark: {
          bg: "#121212",
          surface: "#1E1E1E",
          muted: "#2A2A2A",
          border: "#333333",
          text: "#F5F5F5",
          textMuted: "#A1A1AA",
        },
      },
      borderRadius: {
        scandi: "16px",
        "scandi-lg": "24px",
        "scandi-xl": "32px",
      },
      boxShadow: {
        "scandi-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        scandi:
          "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)",
        "scandi-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.03)",
        "scandi-glow": "0 0 20px rgba(37, 99, 235, 0.1)",
      },
      fontFamily: {
        scandi: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
