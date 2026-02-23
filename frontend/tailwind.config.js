/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060b16',
        panel: '#0e1630',
        accent: '#16b8f3',
      },
      boxShadow: {
        glow: '0 0 30px rgba(22,184,243,0.25)',
      },
    },
  },
  plugins: [],
};
