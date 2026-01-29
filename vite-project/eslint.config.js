import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'no-console': 'warn',
      eqeqeq: 'error',
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],

          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-dom/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: 'react-router-dom',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '**/*.{png,jpg,jpeg,svg,webp,gif}',
              group: 'index',
              position: 'after',
            },
            {
              pattern: '**/*.{css,scss}',
              group: 'index',
              position: 'after',
            },
          ],
          warnOnUnassignedImports: true,
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    plugins: ['simple-import-sort'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
    },
    //
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^react', '^@?\\w'], ['^@/'], ['^\\u0000'], ['^\\.']],
        },
      ],
    },
  },
]);
