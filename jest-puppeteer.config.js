// Note that all environment variables are set in scripts/e2e.js.

const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');

const { homepage } = require('./package.json');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;
const publicUrl = process.env.PUBLIC_URL || '';
const publicUrlOrPath = getPublicUrlOrPath(false, homepage, publicUrl).slice(0, -1);
const { localUrlForBrowser } = prepareUrls(protocol, host, port, publicUrlOrPath);

module.exports = {
  // In WSL2, you need to either install Chromium for Linux and set `launch.executablePath` below,
  // or run an X Server in Windows (e.g., x410 or vcxsrv).
  // launch: {
  //   executablePath: '/usr/bin/chromium',
  // },
  server: {
    command: 'npm start',
    protocol,
    host,
    port,
  },
  // `jest-puppeteer` doesn't use this, but we can use it in our tests.
  url: localUrlForBrowser,
};
