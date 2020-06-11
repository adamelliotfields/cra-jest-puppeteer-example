process.env.NODE_ENV = 'test';

// Read your `.env` and `.env.test` files and set all your environment variables.
// Note that NODE_ENV must be set before you `require` this module otherwise it will throw.
require('react-scripts/config/env');

// Re-setting NODE_ENV to test in case you have some shenanigans in your `.env` files.
process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';
process.env.PUBLIC_URL = '';
process.env.BROWSER = 'none';

/**
 * @type {(resolveFn: (relativePath: string) => string, rootDir: string, isEjecting: boolean) => object}
 */
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig');
const jest = require('jest');
const path = require('path');
const preset = require('jest-puppeteer/jest-preset.json');

/**
 * @param {string} relativePath
 * @returns {string}
 */
const resolveFn = (relativePath) =>
  path.resolve(__dirname, '../node_modules/react-scripts', relativePath);
const rootDir = path.resolve(__dirname, '..');
const isEjecting = false;

const jestConfig = createJestConfig(resolveFn, rootDir, isEjecting);

// Keep E2E tests separate from unit/integration tests (keep them outside src).
const testMatch = ['<rootDir>/e2e/**/*.{spec,test}.{js,jsx,ts,tsx}'];

// Ensure Jest can search for tests within our new `e2e` folder.
const roots = jestConfig.roots.concat('<rootDir>/e2e');

// Merge the `jest-puppeteer` preset into our config.
const config = JSON.stringify({ ...jestConfig, ...preset, testMatch, roots });

// Take the arguments after `node src/e2e.js` and concat the config.
let argv = process.argv.slice(2).concat(['--config', config]);

// Run Jest.
jest.run(argv);
