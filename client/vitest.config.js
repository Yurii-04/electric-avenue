"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
var plugin_react_swc_1 = require("@vitejs/plugin-react-swc");
var vite_plugin_svgr_1 = require("vite-plugin-svgr");
var path = require("path");
exports.default = (0, config_1.defineConfig)({
    plugins: [(0, plugin_react_swc_1.default)(), (0, vite_plugin_svgr_1.default)()],
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
        exclude: __spreadArray(__spreadArray([], config_1.configDefaults.exclude, true), ['packages/template/*'], false),
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
});
