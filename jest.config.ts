import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo', // integra com Expo SDK 53
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-navigation|react-native-safe-area-context)/',
    'jest-runner',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect', // matchers adicionais p/ RN
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.ts',
    '^expo-asset$': '<rootDir>/__mocks__/expo-asset.ts',
    '^expo-font$': '<rootDir>/__mocks__/expo-font.ts',
    '^expo-notifications$': '<rootDir>/__mocks__/expo-notifications.ts',
    '^expo-device$': '<rootDir>/__mocks__/expo-device.ts',
    '^expo-constants$': '<rootDir>/__mocks__/expo-constants.ts',
    '^expo-router$': '<rootDir>/__mocks__/expo-router.ts',
  },
  testTimeout: 30 * 1000,
};

export default config;
