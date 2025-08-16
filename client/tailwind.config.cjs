/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
  extend: {
    animation: {
      'fade-in-up': 'fadeInUp 0.5s ease-out',
    },
    keyframes: {
      fadeInUp: {
        '0%': {
          opacity: 0,
          transform: 'translateY(10px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
    },
  },
}

});
