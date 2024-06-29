import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#ff6961",
        success: "#2cde8b",
        light: "#F4F4F8",
        dark: "#1a252e",
        "dark-ele": "#273744",
        "gray-1": "#111827",
        "gray-2": "#707375 ",

        "blue-1": "#1A8FE3",
        "blue-light": "#E2F0FE",
        "black-1": "#41444B",
        "black-2": "#1A252E",
        foreground: "#4B5563",
        "foreground-dark": "#F6F6F6",
      },
      width: {
        "300": "300px",
        "360": "360px",
        "600": "600px",
        "1200": "1200px",
      },
      height: {
        "42": "168px",
        "240": "240px",
        "246": "246px",
        "300": "300px",
        "400": "400px",
        "500": "500px",
      },
      fontSize: {
        "12": "12px",
        "16": "16px",
        "18": "18px",
        "20": "20px",
        "24": "24px",
        "26": "26px",
      },
      aspectRatio: {
        "8/5": "8 / 5",
        "6/5": "6 / 5",
      },
      screens: {
        "sm-sm": "480px",
      },
      dropShadow: {
        dark: "0 8px 6px rgba(200, 200, 200, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
