const plugin = require("tailwindcss/plugin");
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
    },
    darkSelector: '.mode-dark'
  },
  variants: ['dark'], // TODO: don't enable variant globally (increases file size)
  plugins: [
    plugin(function({addVariant, theme, e, prefix}) {
      const darkSelector = theme('darkSelector', '.mode-dark');
  
      addVariant('dark', ({modifySelectors, separator}) => {
        modifySelectors(({selector}) => {
          return selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `dark${separator}${sel.value}`;
              sel.parent.insertBefore(sel, selectorParser().astSync(prefix(`${darkSelector} `)));
            })
          }).processSync(selector)
        })
      })
    })
  ],
};
