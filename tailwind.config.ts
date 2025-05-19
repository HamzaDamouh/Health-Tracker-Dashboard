import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        gray: {
          950: "#0a0b0f",
          900: "#121318",
          800: "#1c1e26",
          700: "#2e3039",
          600: "#4a4c58",
          500: "#6e7080",
          400: "#9294a3",
          300: "#b6b8c2",
          200: "#d5d6dd",
          100: "#e9eaee",
          50: "#f6f6f8",
        },
        blue: {
          50: "#eef4ff",
          100: "#d9e5ff",
          200: "#bcd1ff",
          300: "#8fb3ff",
          400: "#5a8aff",
          500: "#3366ff",
          600: "#1a47f5",
          700: "#1335e1",
          800: "#152db6",
          900: "#17308f",
          950: "#121f5a",
        },
        purple: {
          50: "#f6f4fe",
          100: "#ede9fd",
          200: "#dbd2fb",
          300: "#c2aef8",
          400: "#a47ef3",
          500: "#8a4eec",
          600: "#7a3ae0",
          700: "#6a2cc9",
          800: "#5826a5",
          900: "#492285",
          950: "#2e1357",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
