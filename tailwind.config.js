/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Ultra-premium light palette
        canvas: '#FAFAF8',
        paper: '#FFFFFF',
        ink: '#0F0F10',
        graphite: '#3A3A3D',
        muted: '#76767A',
        line: '#E8E6E1',
        // Accents
        blue: {
          DEFAULT: '#1683FF',
          soft: '#E8F1FF',
          deep: '#0A5FCC',
        },
        gold: {
          DEFAULT: '#CCAB6E',
          soft: '#F5EFE2',
          deep: '#A8884A',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      spacing: {
        section: 'clamp(6rem, 12vw, 12rem)',
        'section-sm': 'clamp(4rem, 8vw, 8rem)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};