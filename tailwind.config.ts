import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bank: {
          50: "#f3f6f9",
          700: "#1f3b57",
          900: "#102131"
        }
      }
    }
  },
  plugins: []
};

export default config;
