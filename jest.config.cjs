module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.js'],
  testRegex: '\\.test\\.js$',
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  modulePaths: ['<rootDir>'],
  };