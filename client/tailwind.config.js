const plugin = require('tailwindcss/plugin');
const selectorParser = require('postcss-selector-parser');

module.exports = {
  future: {
    defaultLineHeights: true,
    standardFontWeights: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      inset: {
        '2': '2rem',
      },
      animation: {
        'ripple': 'rippleanimation 0.5s linear infinite',
        'ripple-dark': 'rippleanimation-dark 0.5s linear infinite',
      },
      keyframes: {
        'rippleanimation': {
          '100%': {
            'box-shadow':
              '0 0 0 0.6em rgba(67, 74, 101, 0.3), 0 0 0 0.35em rgba(67, 74, 101, 0.3), 0 0 0 0.125em rgba(67, 74, 101, 0.3), 0 0 0 0 rgba(67, 74, 101, 0.3);',
          },
          '0%': {
            'box-shadow':
              '0 0 0 1em rgba(67, 74, 101, 0),0 0 0 0.65em rgba(67, 74, 101, 0.3),0 0 0 0.35em rgba(67, 74, 101, 0.3),0 0 0 0.125em rgba(67, 74, 101, 0.3);',
          },
        },
        'rippleanimation-dark': {
          '100%': {
            'box-shadow':
              '0 0 0 0.6em rgba(255, 255, 255, 0.3), 0 0 0 0.35em rgba(255, 255, 255, 0.3), 0 0 0 0.125em rgba(255, 255, 255, 0.3), 0 0 0 0 rgba(255, 255, 255, 0.3);',
          },
          '0%': {
            'box-shadow':
              '0 0 0 1em rgba(255, 255, 255, 0),0 0 0 0.65em rgba(255, 255, 255, 0.3),0 0 0 0.35em rgba(255, 255, 255, 0.3),0 0 0 0.125em rgba(255, 255, 255, 0.3);',
          },
        },
      },
    },
    darkSelector: '.mode-dark',
  },
  variants: {
    backgroundColor: ({ before }) => before(['dark']),
    textColor: ({ before }) => before(['dark']),
    animation: ({ before }) => before(['dark']),
  },
  plugins: [
    plugin(function({ addVariant, theme, e, prefix }) {
      const darkSelector = theme('darkSelector', '.mode-dark');

      addVariant('dark', ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `dark${separator}${sel.value}`;
              sel.parent.insertBefore(sel, selectorParser().astSync(prefix(`${darkSelector} `)));
            });
          }).processSync(selector);
        });
      });
    }),
  ],
};
