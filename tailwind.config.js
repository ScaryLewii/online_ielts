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
        'dark-15': 'rgba(255, 246, 217, 0.15)'
      }
    },
  },
  plugins: [require("daisyui")],
}