import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        colour: {
          1200: "rgb(20, 22, 37)",
          1100: "rgb(248, 248, 251)",
          1000: "rgb(255, 151, 151)",
          900: "rgb(236, 87, 87)",
          800: "rgb(12, 14, 22)",
          700: "rgb(126, 136, 195)",
          600: "rgb(136, 142, 176)",
          500: "rgb(223, 227, 250)",
          400: "rgb(37, 41, 69)",
          300: "rgb(30, 33, 57)",
          200: "rgb(146, 119, 255)",
          100: "rgb(124, 93, 250)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
