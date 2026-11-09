import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14231d",
        cream: "#f7f7f2",
        brand: { 50: "#eefbf3", 100: "#d7f5e2", 500: "#1f9d61", 600: "#168451", 700: "#126a43" },
      },
      boxShadow: { card: "0 1px 2px rgba(20,35,29,.04), 0 12px 32px rgba(20,35,29,.06)" },
      animation: { "fade-up": "fadeUp .45s ease-out both" },
      keyframes: { fadeUp: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } } },
    },
  },
  plugins: [],
} satisfies Config;
