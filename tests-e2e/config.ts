import { defineConfig } from "@playwright/test"

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'src',
  // Run all tests in parallel.
  fullyParallel: false,
  retries: 0
});