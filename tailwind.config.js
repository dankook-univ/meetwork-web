const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['AppleSDGothicNeo', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#C2A1D8',
        gray: '#ECECEC',
        white: '#FCFCFC',
        pink: '#EE9591',
        ivory: '#EFE8CE',
        yellow: '#FEBD00',
        mint: '#9BD1DD',
      },
    },
  },
  plugins: [],
};
