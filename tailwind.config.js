/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Official CertWinX Enterprise Palette
        canvas: '#F2F3F4',
        paper: '#FFFFFF',
        ink: '#0F172A',
        graphite: '#334155',
        muted: '#64748B',
        line: '#E2E8F0',

        // Primary Blue
        blue: {
          DEFAULT: '#1C83F3',
          soft: '#E8F3FD',
          deep: '#163A8A',
          hover: '#0D72DF',
          light: '#54A4F7',
        },

        // Deep Blue
        deepblue: {
          DEFAULT: '#163A8A',
          hover: '#0F2B66',
          soft: '#1E4DB8',
        },

        // Secondary Soft Blue
        sky: {
          DEFAULT: '#A9D2F1',
          soft: '#F4F9FD',
          deep: '#5C9DD8',
        },

        // Status Accents (No gold)
        emerald: {
          DEFAULT: '#10B981',
          soft: '#ECFDF5',
          deep: '#047857',
        },
        amber: {
          DEFAULT: '#F59E0B',
          soft: '#FEF3C7',
          deep: '#B45309',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4.25rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.35rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(22, 58, 138, 0.05), 0 2px 6px -1px rgba(22, 58, 138, 0.03)',
        'card-hover': '0 20px 35px -5px rgba(22, 58, 138, 0.08), 0 10px 15px -3px rgba(28, 131, 243, 0.05)',
        glow: '0 0 25px rgba(28, 131, 243, 0.2)',
      },
      spacing: {
        section: 'clamp(5rem, 9vw, 9rem)',
        'section-sm': 'clamp(3.5rem, 6vw, 6rem)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
