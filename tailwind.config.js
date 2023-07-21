/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sea': '#03123B',
        'sea-light': '#01194B',
        'cyan': '#00F0FF',
        'light': '#FEE7B5',
        'red': '#D81C1C',
        'grey': '#D6D6D6'
      }
    },
  },
  plugins: [],
}