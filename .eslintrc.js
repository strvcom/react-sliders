'use strict'

module.exports = {
  extends: [
    '@strv/eslint-config-typescript',
    '@strv/eslint-config-typescript/optional',
    '@strv/eslint-config-typescript/style',

    '@strv/eslint-config-react',
    '@strv/eslint-config-react/optional',
    '@strv/eslint-config-react/style',

    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['examples/*', '.eslintrc.js', 'jest.config.js'],
  env: {
    'jest/globals': true,
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      /**
       * To also support format for React components which are using `PascalCase`
       */
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'warn',
      {
        allowNumber: true,
      },
    ],

    'react/prop-types': 'off',
    'no-shadow': 'off',
    'import/exports-last': 'off',
    'import/group-exports': 'off',
    'padding-line-between-statements': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // conflicts with prettier
    '@typescript-eslint/no-extra-parens': 'off',
  },
}
