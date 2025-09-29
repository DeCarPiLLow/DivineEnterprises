/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'solar-green': '#10b981',
        'solar-blue': '#3b82f6',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideIn': 'slideIn 0.4s ease-out',
      }
    },
  },
  plugins: [],
}