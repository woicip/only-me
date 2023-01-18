/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'laptopL': { 'max': '1440px'},
      'laptopM': { 'max': '1336px'},
      'laptop': { 'max': '1024px'},
      '900px': { 'max': '900px'},
      'tablet': { 'max': '768px' },
      '672px': { 'max': '672px' },
      'mobileL': { 'max': '425px' }
    },
    extend: {
      gridTemplateColumns: {
        'onlyme-2': 'repeat(2, minmax(80%, 1fr))'
      },
      colors: {
        'onlyme-dark': '#373A44'
      },
      animation: {
        'fadeIn': 'fadeIn .3s ease-in-out',
        'fadeOut': 'fadeOut .3s ease-in-out',
        'openMenuMobile': 'openMenuMobile .5s ease-in-out',
        'closeMenuMobile': 'closeMenuMobile .5s ease-in-out',
        'openCopied': 'showCopied 3s ease-in-out',
        'updatedInformation': 'showCopied 3s ease-in-out',
        'loading': 'loadingAnimation 1s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0.3 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0.3 }
        },
        openMenuMobile: {
          '0%': { transform: 'translateX(-800px);' },
          '100%': { transform: 'translateX(0px);' }
        },
        closeMenuMobile: {
          '0%': { transform: 'translateX(0px);' },
          '100%': { transform: 'translateX(-800px);' }
        },
        showCopied: {
          '0%': { opacity: 0 },
          '20%': { opacity: 1 },
          '80%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        loadingAnimation: {
          '0%': { opacity: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
          '50%': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
          '100%': { opacity: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.3)' }
        }
      }
    },
  },
  plugins: [],
}
