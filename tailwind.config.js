module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      'verdana': ['Verdana', 'Geneva', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          '100': "#FF6600",
          '200': '#EF7215',
          '300': '#FA5E23', // Salamandar Color
          '400': '#F5F5DC', // Beige Color
          '500': '#FCF4A3',
          '600': '#FFFDD0'
        },
        secondary: {
          '100': "#f6f6ef",
          '200': "#828282",
          '300': "#34495e",
        },
      },
      fontSize: {
        xxs: '0.6rem',
      },
      padding: {
        '96': '24rem',
      }
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'active', 'visited'],
    textDecoration: ['responsive', 'hover', 'focus', 'active', 'visited'],
  },
  plugins: [],
}
