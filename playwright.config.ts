import { defineConfig, devices } from '@playwright/test';
import { config } from './src/config/config';

export default defineConfig({
  testDir: './tests' /* Run tests in files in parallel */,
  fullyParallel: true /* Fail the build on CI if you accidentally left test.only in the source code. */,
  forbidOnly: !!process.env.CI /* Retry on CI only */,
  retries: process.env.CI ? 2 : 0 /* Opt out of parallel tests on CI. */,
  workers: process.env.CI
    ? 2
    : undefined /* Reporter to use. See https://playwright.dev/docs/test-reporters */,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [
        ['list', { printSteps: true }],
        ['html', { open: 'on-failure' }],
      ],

  use: {
    baseURL: config.base_url,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Uncomment this only if the API requires an 'x-api-key' header for every request
    // extraHTTPHeaders: {
    //    'x-api-key': process.env.REQRES_API_KEY || '',
    //  },
  },

  projects: [
    {
      name: 'auth-setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'authenticated-chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'chromium-logged-out',
      testMatch: /ui\/public\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined,
      },
    },

    /* Test against branded browsers. */
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
