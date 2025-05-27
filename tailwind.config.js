/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space': ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        'popins': ['"Poppins"', ...defaultTheme.fontFamily.sans],
        'workSans': ['"Work Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}