/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('./jest.base.config');

module.exports = {
  ...base,
  projects: ['<rootDir>/jest.config.js'],
};
