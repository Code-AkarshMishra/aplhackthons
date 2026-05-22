/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: {
            dark: '#05070f',
            light: '#f8fafc',
          },
          panel: {
            dark: 'rgba(10, 15, 30, 0.7)',
            light: 'rgba(255, 255, 255, 0.75)',
          },
          border: {
            dark: 'rgba(255, 255, 255, 0.08)',
            light: 'rgba(0, 0, 0, 0.06)',
          },
          glow: {
            cyan: '#06b6d4',
            purple: '#8b5cf6',
            orange: '#f97316',
            teal: '#0d9488',
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.3)',
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.3)',
        'neon-orange': '0 0 15px rgba(249, 115, 22, 0.3)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.6', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
