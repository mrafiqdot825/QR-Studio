/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Scheme-aware tokens — actual values live as CSS vars in src/global.css
        // (`:root` for light, `.dark` for dark), toggled via nativewind's
        // colorScheme API (see src/providers/theme-provider.tsx).
        background: "rgb(var(--color-background) / <alpha-value>)",
        "bg-secondary": "rgb(var(--color-bg-secondary) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "glass-surface": "var(--glass-bg)",
        border: "var(--glass-border)",
        primary: "#2563EB",
        "on-primary": "#FFFFFF",
        "primary-container": "rgb(var(--color-primary-container) / <alpha-value>)",
        secondary: "#10B981",
        "on-secondary": "#FFFFFF",
        "secondary-container": "rgb(var(--color-secondary-container) / <alpha-value>)",
        tertiary: "#7C3AED",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "rgb(var(--color-tertiary-container) / <alpha-value>)",
        orange: "#F59E0B",
        gold: "#C9A227",
        "surface-low": "rgb(var(--color-surface-low) / <alpha-value>)",
        "surface-high": "rgb(var(--color-surface-high) / <alpha-value>)",
        "surface-highest": "rgb(var(--color-surface-highest) / <alpha-value>)",
        "on-surface": "rgb(var(--color-on-surface) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--color-on-surface-variant) / <alpha-value>)",
        outline: "rgb(var(--color-outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--color-outline-variant) / <alpha-value>)",
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

