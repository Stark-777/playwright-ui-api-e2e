// config/playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  use: {
    baseURL: 'https://automationexercise.com',
    headless: false,  // <-- Set to false to see browser!
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-testid',
    launchOptions: {
          args: ['--start-maximized'], // Maximize the window on launch
        },
  },
  reporter: [['html'], ['list']],
  projects: [
    {
      name: 'Chromium',
      use: { ...require('@playwright/test').devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Firefox',
    //   use: { ...require('@playwright/test').devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...require('@playwright/test').devices['Desktop Safari'] },
    // },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...require('@playwright/test').devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...require('@playwright/test').devices['iPhone 13'] },
    // },
  ],
});
