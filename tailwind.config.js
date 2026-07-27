/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        "bg-secondary": "#F4F5F7",
        surface: "#FFFFFF",
        "glass-surface": "rgba(255, 255, 255, 0.75)",
        border: "rgba(0, 0, 0, 0.06)",
        primary: "#2563EB",
        "on-primary": "#FFFFFF",
        "primary-container": "#EFF6FF",
        secondary: "#10B981",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#ECFDF5",
        tertiary: "#7C3AED",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#F5F3FF",
        orange: "#F59E0B",
        gold: "#C9A227",
        "surface-low": "#FFFFFF",
        "surface-high": "#F4F5F7",
        "surface-highest": "#E5E7EB",
        "on-surface": "#111827",
        "on-surface-variant": "#6B7280",
        outline: "#9CA3AF",
        "outline-variant": "#E5E7EB",
        error: "#EF4444",
        "on-error": "#FFFFFF",
        success: "#22C55E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "48px",
      },
      boxShadow: {
        'glass': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'glass-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
        'hero': '0 25px 50px -12px rgba(37, 99, 235, 0.15)',
      }
    },
  },
  plugins: [],
};

