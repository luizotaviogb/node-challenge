import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  configPrettier,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          printWidth: 80,
          tabWidth: 2,
          endOfLine: 'lf',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'space-before-function-paren': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'comma-dangle': ['error', 'always-multiline'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'semi-style': ['error', 'last'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: 'function' },
      ],
      'lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          allowBlockStart: true,
        },
      ],
    },
  },
  {
    ignores: ['**/*.test.js'],
  },
];
