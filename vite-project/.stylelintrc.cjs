module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  customSyntax: 'postcss-scss',
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
};
