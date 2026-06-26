import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    testMatch: ['**/marketing-brand-presets.spec.ts', '**/marketing-brand-presets-screenshots.spec.ts'],
    outputDir: './e2e/.results-marketing',
    fullyParallel: false,
    retries: 0,
    workers: 1,
    reporter: [['list']],
    use: {
        baseURL: 'http://localhost:3996',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
})
