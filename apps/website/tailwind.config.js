const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1440px',
        // => @media (min-width: 1536px) { ... }
      },
      textShadow: {
        title:
          '-1px -1px 0 #000, 1px -1px 0 #2c2c2c, -1px 1px 0 #000, 1px 1px 0 #000',
      },
      boxShadow: {
        container: '3px 3px 2px #875f3e',
      },
      boxShadowColor: {
        primary: '#2c2c2c',
        secondary: '#875f3e',
      },
      colors: {
        error: '#c91b1b',
        success: '#2e7d32',
        warning: '#f57c00',
        info: '#1976d2',
        primary: '#ffd698',
        secondary: '#5a2800',
      },
      backgroundColor: {
        100: '#051122',
        200: '#0d2e2b',
        300: '#194440',
        400: '#debb9d',
        500: '#fff2db',
        600: '#d4c0a1',
        700: '#5f4d41',
        800: '#f1e0c5',
        900: '#f1e0c6',
        1000: '#d5c0a1',
        1100: '#ebcaa3',
      },
      borderColor: {
        primary: '#4b7874',
        secondary: '#3a3738',
        tertiary: '#793d03',
        quaternary: '#55636c',
        quintenary: '#faf0d7',
        senary: '#5f4d41',
      },
      fontFamily: {
        fondamento: ['var(--qx-text-face-fondamento)', 'cursive'],
        roboto: ['var(--qx-text-face-roboto)', 'sans-serif'],
        martel: ['var(--qx-text-face-martel)', 'serif'],
        poppins: ['var(--qx-text-face-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
