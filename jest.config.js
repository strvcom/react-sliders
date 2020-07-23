'use strict'

module.exports = {
  setupFilesAfterEnv: ['./config/jest.setup.ts'],
  testPathIgnorePatterns: ['node_modules', 'cypress'],
}
