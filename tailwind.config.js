/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Scheme-aware tokens — actual values live as CSS vars in src/global.css
        background: "rgb(var(--color-background) / <alpha-value>)",
        "bg-secondary": "rgb(var(--color-bg-secondary) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "glass-surface": "var(--glass-bg)",
        border: "var(--glass-border)",
        primary: "#3E6FA6",
        "on-primary": "#FFFFFF",
        "primary-container": "rgb(var(--color-primary-container) / <alpha-value>)",
        secondary: "#5C6B7A",
        "on-secondary": "#FFFFFF",
        "secondary-container": "rgb(var(--color-secondary-container) / <alpha-value>)",
        tertiary: "#3E6FA6",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "rgb(var(--color-tertiary-container) / <alpha-value>)",
        accent: "#3E6FA6",
        orange: "#ED6C02",
        gold: "#ED6C02",
        "surface-low": "rgb(var(--color-surface-low) / <alpha-value>)",
        "surface-high": "rgb(var(--color-surface-high) / <alpha-value>)",
        "surface-highest": "rgb(var(--color-surface-highest) / <alpha-value>)",
        "on-surface": "rgb(var(--color-on-surface) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--color-on-surface-variant) / <alpha-value>)",
        outline: "rgb(var(--color-outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--color-outline-variant) / <alpha-value>)",
        error: "#D32F2F",
        "on-error": "#FFFFFF",
        success: "#2E7D32",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "3xl": "20px",
        "4xl": "24px",
        "5xl": "28px",
      },
      boxShadow: {
        'glass': '0 4px 16px rgba(30, 42, 56, 0.08)',
        'glass-hover': '0 6px 20px rgba(30, 42, 56, 0.12)',
        'hero': '0 8px 24px rgba(62, 111, 166, 0.12)',
      }
    },
  },
  plugins: [],
};


