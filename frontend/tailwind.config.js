/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'button': 'inset 0 2px 8px 0 rgb(0 0 0 / 0.1);'
      }
    },
  },
  plugins: [],
}

