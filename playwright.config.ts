import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',         // Directory for test files
  timeout: 60000,                 // Test timeout in milliseconds
  retries: 0,                     // Number of retries on failure
  reporter: 'html',               // Reporter type
  workers: 1,                     // Number of concurrent workers
  preserveOutput: 'always',       // Preserve output files on failure
  outputDir: 'test-results',      // Output directory for test results
  fullyParallel: true,            // Run tests in parallel
  use: {
    headless: true,               // Run in headless mode
    baseURL: 'https://saucedemo.com/v1/index.html', // Base URL for the app
    viewport: { width: 1280, height: 720 },
  },
});
