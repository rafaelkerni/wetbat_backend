/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  testMatch: ['**/?(*.)+(spec|test).(js|ts|tsx)'],
  bail: 1,
  collectCoverage: true,
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/', '(.*)/(.*).test.ts'],
};
