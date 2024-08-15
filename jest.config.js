// jest.config.js
module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest' // Transforms .js and .jsx files using babel-jest
    },
    testEnvironment: 'node', // Specify the test environment, such as Node.js
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'], // Include extensions your tests might use
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1' // Example alias configuration
    }
  };
  