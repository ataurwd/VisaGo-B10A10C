/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#0B3947',
        secondary: '#F1F9FC',
        gradientFrom: '#25CBD6', 
        gradientTo: '#00EE8A',
        themeDatak: '#101E33',
        brand: {
          50: '#f0f9fa',
          100: '#d9f0f2',
          200: '#b7e1e5',
          300: '#86cbd2',
          400: '#4da6b2',
          500: '#348a96',
          600: '#2d717d',
          700: '#295d68',
          800: '#284e57',
          900: '#25424a',
          950: '#142b32',
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #25CBD6, #00EE8A)', 
      },
      boxShadow: {
        'modern-sm': '0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.06)',
        'modern-md': '0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -1px rgba(0,0,0,0.02)',
        'modern-lg': '0 10px 15px -3px rgba(0,0,0,0.04), 0 4px 6px -2px rgba(0,0,0,0.02)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
    },
  },
  plugins: [require('daisyui')],
}
