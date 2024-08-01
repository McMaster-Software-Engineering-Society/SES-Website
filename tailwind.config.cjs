import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Bricolage Grotesque Variable",
          "Inter Variable",
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
        londrina: ["Londrina Outline"],
      },
      colors: {
        primary: "rgb(186 85 211 / var(--tw-text-opacity))",
        background: "#0f0e17",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), nextui()],
};
