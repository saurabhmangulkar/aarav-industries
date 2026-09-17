import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          50: '#f4f6f8',
          100: '#e1e6eb',
          200: '#c5cfd8',
          300: '#9eb0c0',
          400: '#738ba4',
          500: '#556f8a',
          600: '#435870',
          700: '#37475b',
          800: '#1f2937',
          900: '#111827',
          950: '#0b0f17',
        },
        accent: {
          DEFAULT: '#d97706',
          hover: '#b45309',
        },
      },
    },
  },
  plugins: [],
};
export default config;