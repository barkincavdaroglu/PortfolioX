module.exports = {
  purge: [
    './src/**/*.js'
],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '0': 0,
       '10': 10,
       '20': 20,
       '30': 30,
       '40': 40,
       '50': 50,
       '25': 25,
       '50': 50,
       '75': 75,
       '100': 100,
        'auto': 'auto',
      },
      backgroundImage: theme => ({
        'dashboard': "url('/src/images/wave.png')",
        'dashboard-mobile': "url('/src/images/mobile-bg.jpg')",
      }),
      backgroundColor: theme => ({
        ...theme('colors'),
        'color-bg': '#F7F9FC',
      }),
      gridTemplateColumns: {
        'port': '1.6fr 0.4fr',
        'port-bot': '1fr 1fr',
        'port-detailed-bot': '0.7fr 1.3fr',
        'dashboard': '0.9fr 0.5fr 0.6fr',
        'portfolioDetailed': '1.4fr 0.6fr',
        'top': '0.5fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.5fr',
        'add': '1.60fr 0.40fr',
        'add2': '1.2fr 0.80fr',
        'add-remove': '1fr 1fr',
        'watchlist': '1.9fr 0.1fr',
      },
      gridTemplateRows: {
        'top-news': '0.6fr 1.4fr',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      boxShadow: {
        soft: '0px 8px 24px rgba(90, 93, 101, 0.08)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
