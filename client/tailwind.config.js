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
        background: "#06080f",
        surface: {
          50: '#1e2433',
          100: '#161b28',
          200: '#101420',
          300: '#0c0f18',
          DEFAULT: '#090c15',
        },
        aurora: {
          purple: '#a855f7',
          indigo: '#6366f1',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'aurora-glow': '0 0 35px -5px rgba(168, 85, 247, 0.35)',
        'cyan-glow': '0 0 35px -5px rgba(6, 182, 212, 0.35)',
        'card-glow': '0 10px 30px -10px rgba(99, 102, 241, 0.15)',
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%)',
        'aurora-subtle': 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(6, 182, 212, 0.05) 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(19, 24, 38, 0.7) 0%, rgba(10, 14, 24, 0.6) 100%)',
        'glass-card-hover': 'linear-gradient(135deg, rgba(26, 32, 51, 0.8) 0%, rgba(14, 18, 31, 0.7) 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out 4s infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.04)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
