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
      screens: {
        xs: '480px',
      },
      colors: {
        background: 'var(--bg)',
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        foreground: 'var(--text)',
        border: 'var(--border)',
        muted: { DEFAULT: 'var(--bg-elevated)', foreground: 'var(--text-dim)' },
        primary: { 600: 'var(--accent)', 500: 'var(--accent)' },
        /* Interactive surface tokens. Deliberately NOT --accent (the gold),
           which is a text/stroke colour, not a hover background. */
        accent: { DEFAULT: 'var(--surface-accent)', foreground: 'var(--surface-accent-foreground)' },
        popover: { DEFAULT: 'var(--popover)', foreground: 'var(--popover-foreground)' },
        ring: 'var(--ring)',
      },
    },
  },
  plugins: [],
}
