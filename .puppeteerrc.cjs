const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    chrome: {
        skipDownload: false,
      },
      // Download Firefox (default `skipDownload: true`).
      firefox: {
        skipDownload: false,
      },
    // Changes the cache location for Puppeteer.
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};