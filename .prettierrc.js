module.exports = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'none',
  jsxBracketSameLine: true,
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: ['*.json', '.eslintrc', '.tslintrc', '.prettierrc', '.tern-project'],
      options: {
        parser: 'json',
        tabWidth: 2
      }
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
        tabWidth: 2
      }
    }
  ]
};
