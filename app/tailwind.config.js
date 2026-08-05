// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'scroll-horizontal': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-horizontal-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scroll-horizontal': 'scroll-horizontal var(--scroll-duration, 40s) linear infinite',
        'scroll-horizontal-reverse': 'scroll-horizontal-reverse var(--scroll-duration, 40s) linear infinite',
      },
    },
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      animation: {
        'scroll-horizontal': 'scroll-horizontal var(--scroll-duration, 40s) linear infinite',
        'scroll-horizontal-reverse': 'scroll-horizontal-reverse var(--scroll-duration, 40s) linear infinite',
      },
    },
  },
};