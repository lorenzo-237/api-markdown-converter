/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'mjs'],
  testMatch: ['**/__tests__/**/*.mjs?(x)', '**/?(*.)+(spec|test).mjs?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
};

export default config;
