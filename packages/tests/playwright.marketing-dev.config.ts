import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for marketing specs against an *already-running* dev server.
 * Use this when the Nuxt dev server is already launched on :3000 — avoids the
 * NUXT_IGNORE_LOCK conflict that arises with the default marketing config.
 *
 * Run:
 *   pnpm -F @origam/tests playwright test --config=playwright.marketing-dev.config.ts <spec>
 */
export default defineConfig({
    testDir: './e2e',
    testMatch: ['**/nav-link-availability.spec.ts'],
    outputDir: './e2e/.results-marketing',

    fullyParallel: false,

    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 1,

    reporter: [
        ['html', { outputFolder: 'e2e/.report-marketing', open: 'never' }],
        ['list']
    ],

    use: {
        baseURL: process.env.MARKETING_BASE_URL ?? 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
})
