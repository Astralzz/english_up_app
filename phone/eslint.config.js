// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = defineConfig([
  expoConfig,
  {
    // Soporte para TypeScript
    files: ['**/*.ts', '**/*.tsx'],
    // Soporte para React
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    // Soporte para react hooks
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': eslintPluginReactHooks,
      prettier: eslintPluginPrettier,
    },
    // Reglas
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    // Ignorar archivos
    ignores: ['dist', 'node_modules'],
  },
]);
