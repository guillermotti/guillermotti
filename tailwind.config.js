module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.ts']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            'paper-white': '#d1d8da',
            'paper-gray': '#444549',
            'gray': '#757879'
        },
        scale: {
          '-1': '-1'
        }
    },
    fontFamily: {
      'cabinet-grotesk': ['CabinetGrotesk']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
