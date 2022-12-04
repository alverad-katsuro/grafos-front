/** @type {import('tailwindcss').Config} */


const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {},
  },
  plugins: [],
});