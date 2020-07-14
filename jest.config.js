module.exports = {
  setupFilesAfterEnv: ['./config/jest.setup.ts'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
  },
}
