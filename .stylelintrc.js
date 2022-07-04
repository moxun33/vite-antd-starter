module.exports = {
  extends: 'stylelint-config-standard',

  rules: {
    'at-rule-empty-line-before': null,
    'at-rule-name-space-after': null,
    'comment-empty-line-before': null,
    'declaration-bang-space-before': null,
    'declaration-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'function-comma-newline-after': null,
    'function-name-case': null,
    'function-no-unknown': null,
    'function-parentheses-newline-inside': null,
    'function-max-empty-lines': null,
    'function-whitespace-after': null,
    'value-list-comma-newline-after': null,
    indentation: null,
    'number-leading-zero': null,
    'number-no-trailing-zeros': null,
    'rule-empty-line-before': null,
    'selector-combinator-space-after': null,
    'selector-list-comma-newline-after': null,
    'selector-pseudo-element-colon-notation': null
  },
  overrides: [
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less'
    }
  ]
};
