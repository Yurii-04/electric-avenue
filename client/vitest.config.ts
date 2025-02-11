import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import svgrPlugin from 'vite-plugin-svgr';
import * as path from 'path';

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '~tests': path.resolve(__dirname, 'src/tests/')
    }
  },
  test: {
    environment: 'jsdom',
    watch: false,
    globals: true,
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**/*.tsx'],
      reportsDirectory: './src/tests/coverage'
    },
    reporters: ['vitest-sonar-reporter', 'default'],
    outputFile: 'test-report.xml'
  }
})