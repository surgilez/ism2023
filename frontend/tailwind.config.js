/* eslint-disable global-require */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#D0CB8B',
          secondary: '#6B6CB0',
          // secondary: '#001E36',
          dark: '#383838',
          violet: '#8788bf',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
    ],
  },
}
