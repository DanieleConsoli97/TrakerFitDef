import { heroui } from '@heroui/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              50: "#e6f1fe",
              500: "#0070f3",
              DEFAULT: "#0070f3",
            },
          },
        },
        dark: {
          colors: {
            background: "#030712", // gray-950 hex value
            foreground: "#ECEDEE",
            primary: {
              50: "#3B096C",
              500: "#9353D3",
              DEFAULT: "#9353D3",
            },
          },
        },
      },
    }),
  ],
}