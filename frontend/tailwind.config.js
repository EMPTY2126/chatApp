/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mycolor:'#0f0f0f'
      }
    },
  },
  plugins: [require('daisyui')],
}

