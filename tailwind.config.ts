import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tbk-white": "#FCFDFE",
        "tbk-red": "#D5006C",
        "tbk-light-red": "#d5006c0d",
        "tbk-border": "#E7EBF3",
        "tbk-grey": "#828EA5",
        "tbk-black": "#0E1520",
        "tbk-black-2": "#2D3338",
        "tbk-black-3": "#333333",
        "tbk-black-bg": "#1f242e",
        "tbk-border-blue": "#c9d0e4",
        "tbk-table-header": "rgba(213, 0, 108, 0.05)",
      },
      boxShadow: {
        "tbk-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.08)",
        "tbk-shadow-2": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
        "tbk-card-shadow":
          "0px 1px 2px rgba(0, 0, 0, 0.04), 0px 4px 6px rgba(14, 21, 32, 0.12), 0px 0px 1px rgba(14, 21, 32, 0.18)",
        "tbk-card-shadow-2": "0px 0px 4px -5px rgba(118, 127, 157, 0.3)",
      },
      borderRadius: {
        "2lg": "10px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      padding: {
        "90": "340px",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
