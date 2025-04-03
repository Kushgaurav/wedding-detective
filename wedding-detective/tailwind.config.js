/** @type {import('tailwindcss').Config} */
export default {
  // This file can still be used for backward compatibility
  // We'll leave the existing configuration in place
  // and add the necessary CSS-based config in index.css
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212', // Black
        secondary: '#1e1e1e', // Dark gray
        accent: '#d4af37', // Gold
        light: '#ffffff', // White
        darkGold: '#b8860b', // Darker gold for hover states
        darkGray: '#2d2d2d', // Dark gray for sections
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 175, 55, 0.25)',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}