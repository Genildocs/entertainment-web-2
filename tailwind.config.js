/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '400px',

      sm: '576px',

      md: '768px',

      lg: '992px',

      xl: '1200px',

      '2xl': '1400px',
    },
    extend: {
      colors: {
        primary: '#10141e',
        secondary: '#161D2F',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)'],
      },
    },
  },
  plugins: [],
};
