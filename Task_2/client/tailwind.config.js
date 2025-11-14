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
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ea698b 0%, #d55d92 25%, #c05299 50%, #ac46a1 75%, #973aa8 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #822faf 0%, #6d23b6 50%, #6411ad 100%)',
        'gradient-dark': 'linear-gradient(135deg, #571089 0%, #47126b 100%)',
      }
    },
  },
  plugins: [],
}
