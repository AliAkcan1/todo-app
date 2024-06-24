/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#EDEDF7',
        'secondary': '#FEFEFF',
        'tertiary': '#6370F1',
        'quaternary': '#EEEEEE',
      }
    },
  },
  plugins: [],
}