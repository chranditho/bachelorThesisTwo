const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#effafc',
          100: '#d6f1f7',
          200: '#b3e2ee',
          300: '#7ecde2',
          400: '#42aece',
          500: '#2692b4',
          DEFAULT: '#217090',
          700: '#22607c',
          800: '#245066',
          900: '#224457',
          950: '#112b3b',
        },
        secondary: {
          50: '#eefbfd',
          100: '#d3f4fa',
          200: '#ade9f4',
          DEFAULT: '#90e0ef',
          400: '#35bedb',
          500: '#1aa1c0',
          600: '#1881a2',
          700: '#1a6984',
          800: '#1e566c',
          900: '#1d485c',
          950: '#0e2f3e',
        },
        base: {
          50: '#eefaff',
          100: '#dcf5ff',
          200: '#b2edff',
          300: '#6de1ff',
          400: '#20d2ff',
          500: '#00bdff',
          600: '#0098df',
          700: '#0079b4',
          800: '#006695',
          900: '#00547a',
          DEFAULT: '#00263a',
        },
        status: {
          accepted: '#C7D64F',
          submitted: '#A1DAF8',
          inreview: '#EF7F46',
          rejected: '#EA516C',
          finished: '#00263A',
        },
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};
