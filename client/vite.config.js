import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgrPlugin(),
        tsconfigPaths(),
        eslintPlugin({
            cache: true,
            failOnError: false
        })
    ],
    esbuild: {
        loader: 'tsx'
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
            '~tests': path.resolve(__dirname, 'src/tests/')
        }
    }
});
