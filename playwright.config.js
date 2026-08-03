import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
  ['list'],
  ['allure-playwright']
],

  use: {
    headless: false,
    viewport: null,
    trace: 'on-first-retry',

    launchOptions: {
      args: ['--start-maximized'],
    },

    screenshot: 'only-on-failure'
    
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
