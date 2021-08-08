module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  roots: ['<rootDir>/__tests__'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-native|react-native)/).*/',
    '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|react-native-vector-icons/.*|native-base|react-native-code-push)',
  ],
  verbose: true,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  setupFiles: ['<rootDir>/tests/jest-setup.ts'],
};
