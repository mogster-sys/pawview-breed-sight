/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fff8ef',
          low: '#fdf3da',
          mid: '#f5ead0',
          high: '#ece2c9',
          highest: '#e3d9c0',
        },
        primary: {
          DEFAULT: '#506146',
          dim: '#687a5d',
          container: '#687a5d',
          on: '#fdf7ee',
        },
        secondary: {
          DEFAULT: '#456274',
          container: '#c8dde8',
          on: '#fdf7ee',
        },
        tertiary: {
          DEFAULT: '#6f5920',
          container: '#8a7236',
          on: '#fdf7ee',
        },
        ink: {
          DEFAULT: '#201b0c',
          muted: '#3a3428',
          faint: '#5a5448',
        },
        outline: {
          DEFAULT: '#c5c8bd',
        },
        error: '#ba1a1a',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Newsreader"', 'serif'],
        label: ['"Work Sans"', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.02em',
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [],
};
