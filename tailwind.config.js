/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        foreground: 'var(--text)',
        border: 'var(--border)',
        muted: { DEFAULT: 'var(--bg-elevated)', foreground: 'var(--text-dim)' },
        primary: { 600: 'var(--accent)', 500: 'var(--accent)' },
      },
    },
  },
  plugins: [],
}
