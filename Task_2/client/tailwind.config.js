/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blush': '#ea698b',
        'thulian-pink': '#d55d92',
        'mulberry': '#c05299',
        'purpureus': '#ac46a1',
        'purpureus-2': '#973aa8',
        'grape': '#822faf',
        'grape-2': '#6d23b6',
        'grape-3': '#6411ad',
        'indigo-custom': '#571089',
        'indigo-2': '#47126b',
        'fansee': {
          primary: '#ea698b',
          secondary: '#ac46a1',
          accent: '#822faf',
          dark: '#571089',
          light: '#1a0a2e',
          darker: '#0a0015',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ea698b 0%, #d55d92 25%, #c05299 50%, #ac46a1 75%, #973aa8 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #822faf 0%, #6d23b6 50%, #6411ad 100%)',
        'gradient-dark': 'linear-gradient(135deg, #571089 0%, #47126b 100%)',
        'gradient-app': 'linear-gradient(135deg, #0a0015 0%, #1a0a2e 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'shake': 'shake 0.5s ease-in-out',
        'pop-in': 'pop-in 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
