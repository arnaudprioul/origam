import { defineConfig, devices } from '@playwright/test'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..', '..')

/**
 * Playwright configuration for origam.
 *
 * The unit tests stay in Vitest (`pnpm -F @origam/tests test:unit`); Playwright
 * owns the end-to-end + visual-regression layer.
 *
 * Histoire is started as a webServer so e2e specs can mount any component
 * by navigating to its story URL. This avoids spinning up a parallel
 * Vite dev server for each component under test.
 */
export default defineConfig({
    testDir: './e2e',
    outputDir: './e2e/.results',

    // One spec per file; specs inside a file run sequentially (consistent
    // visual-regression baselines), but separate files parallelise.
    fullyParallel: true,

    // Forbid `test.only` in CI so a focused spec doesn't silently mask the
    // rest of the suite.
    forbidOnly: !!process.env.CI,

    // Retry once in CI to absorb flakes from animations / network blips —
    // never retry locally so the dev sees the failure as it happened.
    retries: process.env.CI ? 1 : 0,

    // Conservative worker count in CI; let Playwright pick locally.
    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['html', { outputFolder: 'e2e/.report', open: 'never' }],
        ['list']
    ],

    use: {
        baseURL: 'http://localhost:6006',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        }
    ],

    webServer: {
        // Reuse Histoire's dev server — every component already has a story
        // URL (`#/components/{Domain}/{Name}/{Variant}`) we can navigate to.
        // Spawn pnpm from the repo root so the workspace filter resolves.
        command: 'pnpm -F @origam/stories dev',
        cwd: REPO_ROOT,
        url: 'http://localhost:6006',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000
    }
})
