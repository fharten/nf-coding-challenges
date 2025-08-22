import nextJest from 'next/jest';

// Create next/jest config helper
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases from tsconfig.json
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
