import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
      ),
      colors: {
        /*
         * `navy` is kept as the token name for compatibility with the section
         * components, but the Makkah identity is a deep pine green rather than
         * the old navy. Every `bg-navy-*` / `text-navy-*` therefore reads as
         * Makkah green.
         */
        navy: {
          50: '#F1F6F3',
          100: '#DFEBE4',
          200: '#C1D8CB',
          300: '#96BBA8',
          400: '#679A82',
          500: '#447C63',
          600: '#2F634D',
          700: '#234F3D',
          800: '#173D2F',
          900: '#0E2D22',
          950: '#071F17',
        },
        /* `orange` is remapped to the Makkah gold ladder. */
        orange: {
          50: '#FBF6E8',
          100: '#F6EBCB',
          200: '#EDD9A0',
          300: '#E2C473',
          400: '#D6AE4A',
          500: '#C1962F',
          600: '#A87D25',
          700: '#8A641D',
          800: '#6B4C16',
          900: '#4C350F',
        },
        gold: {
          50: '#FDFAF1',
          100: '#F9F1DA',
          200: '#F2E2B8',
          300: '#E9D09A',
          400: '#DFBD72',
          500: '#D4AF37',
          600: '#BA952B',
          700: '#96741F',
          800: '#6F5516',
          900: '#4A380D',
        },
        surface: {
          DEFAULT: '#FBF7EE',
          2: '#F4EDDD',
          3: '#EADFC9',
          alt: '#F4EDDD',
          subtle: 'rgba(255, 255, 255, 0.06)',
        },
        'green-brand': {
          DEFAULT: '#2E7D5B',
          dark: '#1C5C41',
          light: '#4A9C76',
        },
        accent: {
          gold: '#D4AF37',
          goldLight: '#E9D09A',
          goldGradient: 'linear-gradient(135deg, #E9D09A, #D4AF37, #B98A2F)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.2)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.9rem, 7.4vw, 6.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.25rem, 5.1vw, 4.15rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(1.85rem, 3.6vw, 3.1rem)', { lineHeight: '1.16', letterSpacing: '-0.012em' }],
        'display-md': ['clamp(1.4rem, 2.2vw, 1.9rem)', { lineHeight: '1.28', letterSpacing: '-0.008em' }],
        'display-sm': ['clamp(1.1rem, 1.5vw, 1.35rem)', { lineHeight: '1.38', letterSpacing: '-0.004em' }],

        'stat-lg': ['clamp(2.25rem, 3.4vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'stat-xl': ['clamp(3.75rem, 12vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],

        countdown: ['clamp(1.55rem, 2.8vw, 2.15rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],

        'body-lg': ['1.0625rem', { lineHeight: '1.8', letterSpacing: '-0.005em' }],
        'body-md': ['1rem', { lineHeight: '1.75', letterSpacing: '-0.004em' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.72', letterSpacing: '-0.002em' }],
        'body-xs': ['0.875rem', { lineHeight: '1.65' }],

        'label-sm': ['clamp(0.8125rem, 1.7vw, 0.875rem)', { lineHeight: '1.45', letterSpacing: '0.01em' }],
        'label-xs': ['clamp(0.75rem, 1.5vw, 0.8125rem)', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'label-2xs': ['clamp(0.75rem, 1.25vw, 0.8125rem)', { lineHeight: '1.4', letterSpacing: '0.03em' }],
        'label-nav': ['0.78rem', { lineHeight: '1.4', letterSpacing: '0' }],
      },
      spacing: {
        section: 'var(--gap-section)',
      },
      maxWidth: {
        shell: 'var(--shell)',
        prose: '64ch',
        narrow: '46ch',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212,175,55,0.32), 0 24px 70px -20px rgba(212,175,55,0.35)',
        card: '0 1px 2px rgba(7,31,23,0.05), 0 20px 45px -26px rgba(7,31,23,0.35)',
        'card-lg': '0 2px 4px rgba(7,31,23,0.06), 0 50px 90px -46px rgba(7,31,23,0.45)',
        header: '0 1px 0 rgba(212,175,55,0.16), 0 16px 45px -22px rgba(7,31,23,0.45)',
        gold: '0 18px 50px -24px rgba(185,138,47,0.55)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(35,79,61,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(35,79,61,0.06) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '58px 58px',
      },
      keyframes: {
        'dash-flow': {
          '0%': { strokeDashoffset: '260' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-node': {
          '0%, 100%': { opacity: '0.28', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.5)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        'marquee-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
        'arch-glow': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        'dash-flow': 'dash-flow 3.2s linear infinite',
        'pulse-node': 'pulse-node 3s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        sheen: 'sheen 2.4s ease-in-out infinite',
        'marquee-x': 'marquee-x 42s linear infinite',
        'arch-glow': 'arch-glow 7s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
