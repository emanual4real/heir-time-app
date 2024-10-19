const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular-template'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts'],
    // Override or add rules here
    rules: {
      'max-lines': ['error', { max: 500, skipBlankLines: true }],
      'no-console': ['error', { allow: ['error'] }],
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': ['error'],
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {
      '@angular-eslint/template/alt-text': ['error'],
      '@angular-eslint/template/prefer-self-closing-tags': ['error'],
      '@angular-eslint/template/elements-content': ['warn'],
    },
  },
];
