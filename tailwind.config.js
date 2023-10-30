/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: { min: "270px", max: "320px" },
      xms: { min: "321px", max: "375px" },
      xls: { min: "376px", max: "480px" },
      // => @media (min-width: 320px) { ... }

      sm: { min: "481px", max: "768px" },
      // => @media (min-width: 640px) { ... }
      md: { min: "769px", max: "1100px" },
      // => @media (min-width: 768px) { ... }

      lg: { min: "1101px", max: "1440px" },

      // => @media (min-width: 1024px) { ... }
      xl: { min: "1441px", max: "2500px" },
      // => @media (min-width: 1280px) { ... }
      xxl: { min: "2500px", max: "2561px" },
    },
    extend: {
      colors: {
        tahiti: {
          50:"#FFFFFF",
          100: "#066091",
          200: "#59a5f5",
          300: "#c8ffff",
          400: "#00BFFF",
          500: "#0CA781",
          600: "#f5f5f5",
          700: "#cccccc",
          800: "#333333",
          900: "#5c5c5c",
        },
        purple: {
          100: "#445268",
        },
        br: {
          100: "#8EBB4F",
          200: "#5F6368",
        },
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      fontFamily: {
        body: ["Jost"],
        serifs: ["sans-serif"],
      },
    },
  },
  plugins: [],
}
