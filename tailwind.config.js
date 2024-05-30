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
        'sea-lighter': '#002B5A',
        'cyan': '#00F0FF',
        'light': '#FEE7B5',
        'red': '#D81C1C',
        'grey': '#D6D6D6',
        'green': '#32BEA6',
        'dark': 'rgba(255, 255, 255, 0.20)',
        'dark-10': 'rgba(255, 255, 255, 0.10)',
        'dark-15': 'rgba(255, 246, 217, 0.15)',
        'blue-mb': '#3060CF',
        'black-mb': '#131318',
        'white-mb': '#F5F8FF',
        'sea-30': 'rgba(3, 35, 92, 0.30)',
        'cyan-60': 'rgba(0, 183, 240, 0.60)',
      }
    },
  },
  plugins: [require("daisyui")],
  darkMode: 'class'
}