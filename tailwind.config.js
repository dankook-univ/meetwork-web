const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NanumBarunGothic', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#C2A1D8',
        gray: '#ECECEC',
        lightGray: '#D9D9D9',
        white: '#FCFCFC',
        pink: '#EE9591',
        ivory: '#EFE8CE',
        yellow: '#FEBD00',
        mint: '#9BD1DD',
      },
    },
  },
  safelist: [
    {
      pattern: /h-\w+/,
    },
    {
      pattern: /p\w-\w+/,
    },
    {
      pattern: /bg-\w+/,
    },
    {
      pattern: /text-\w+/,
    },
    {
      pattern: /min-\w+/,
    },
    {
      pattern: /rounded-\w+/,
    },
    {
      pattern: /border-\w+/,
    },
  ],
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
