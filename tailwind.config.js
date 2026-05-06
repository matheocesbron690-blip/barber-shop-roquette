/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
        cream: '#F5F0E8',
        'barber-black': '#1a1a1a',
        'barber-dark': '#141414',
        'barber-card': '#242424',
        'barber-border': '#3a3a3a',
      },
    },
  },
  plugins: [],
}
