/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#0a0a0a',
        panel: '#161616',
        mist: '#f5f5f5',
        chrome: '#d4d4d4'
      },
      boxShadow: {
        glass: '0 20px 60px rgba(255,255,255,0.08)'
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
