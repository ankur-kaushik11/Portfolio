/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1f3a',
          light: '#2a2f4a',
        },
        secondary: '#00d4ff',
        dark: '#0a0e1a',
        accent: {
          blue: '#00d4ff',
          purple: '#9d00ff',
          pink: '#ff00d4',
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(26, 31, 58, 0.4))',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
