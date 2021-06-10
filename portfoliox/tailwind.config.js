module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'dashboard': "url('/src/images/wave.png')",
        'dashboard-mobile': "url('/src/images/mobile-bg.jpg')",
      }),
      backgroundColor: theme => ({
        ...theme('colors'),
        'color-bg': '#F5F6F8',
      }),
      gridTemplateColumns: {
        'port': '1.6fr 0.4fr',
        'port-bot': '1fr 1fr',
        'dashboard': '0.9fr 0.5fr 0.6fr',
        'top': '0.5fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.5fr',
        'add': '1.60fr 0.40fr',
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
