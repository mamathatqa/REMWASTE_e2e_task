const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // no plugins needed now
    },
    browser: {
      chrome: {
        family: 'chromium',
        name: 'chrome',
        channel: 'stable',
        path: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        // Optional: add your chrome version if you want
        // version: '114.0.5735.199',
      },
    },
  },
})
