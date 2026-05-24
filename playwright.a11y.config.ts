import { defineConfig, devices } from '@playwright/test'

/*
 * Standalone Playwright config for `npm run test:a11y`.
 *
 * Mirrors the e2e config but targets `tests/a11y/` instead of
 * `tests/e2e/`. A separate config (rather than overriding
 * `testDir` from the CLI) keeps Playwright happy — `testDir` is
 * compile-time on the config object and can't be re-pointed via
 * CLI flags.
 *
 * Only runs on Chromium (axe-core results are browser-engine
 * independent; running on 3 engines triples the runtime for the
 * same violations). Add a `firefox` / `webkit` project here if
 * you ever need to verify engine-specific a11y quirks.
 */
export default defineConfig({
    testDir: './tests/a11y',
    outputDir: './tests/a11y/.results',

    fullyParallel: false,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['html', { outputFolder: 'tests/a11y/.report', open: 'never' }],
        ['list']
    ],

    use: {
        baseURL: 'http://localhost:6006',
        trace: 'on-first-retry'
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ],

    webServer: {
        command: 'npm run story:dev',
        url: 'http://localhost:6006',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000
    }
})
