import { Config } from 'tailwindcss'

export default Config({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
        text: "var(--color-text)"
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
})