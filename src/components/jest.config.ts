import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y .env en el entorno de prueba
  dir: './',
});

// Configuración personalizada de Jest
const customJestConfig: Config = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    // Maneja los alias de módulo (ajusta esto si tienes otros alias)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};

// createJestConfig es una función asíncrona, por lo que jest.config.ts debe exportar una función
export default createJestConfig(customJestConfig);