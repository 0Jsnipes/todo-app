/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include React components
  ],
  theme: {
    extend: {}, // Add customizations here
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
};
