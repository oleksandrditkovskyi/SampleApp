import { fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import ts from 'typescript-eslint';

export default ts.config(ts.configs.strict, ts.configs.stylistic, [
  {
    plugins: {
      react: react,
      'react-native': fixupPluginRules(reactNative),
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'react-native/no-unused-styles': 2,
      'react-native/no-raw-text': 2,
      'react-native/no-single-element-style-arrays': 2,

      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1 }],
      'no-duplicate-imports': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'simple-import-sort/exports': 'error',
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': [
        2,
        {
          multiline: 'last',
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          noSortAlphabetically: false,
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^react-native'],
            ['@react'],
            ['@?\\w'],
            ['@hooks', 'use[A-Z]'],
            ['@router'],
            ['@screens'],
            ['@components', 'components'],
            ['./[A-Z][a-zA-Z0-9]'],
            ['@API'],
            ['@extra'],
            ['@asyncStorage'],
            ['@stateManagement'],
            ['@models', '@types'],
            ['@variables', '@constants'],
            ['@localization'],
            ['@assets'],
            ['^'],
            ['^(.*).style'],
            ['^(.*).json'],
          ],
        },
      ],
    },
  },
]);
