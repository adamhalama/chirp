import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      boxShadow: {
        'custom': '0 0 2px 8px rgba(59, 130, 246, 0.3)',
      },
      colors: {
        'custom-blue': 'rgba(59, 130, 246, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
