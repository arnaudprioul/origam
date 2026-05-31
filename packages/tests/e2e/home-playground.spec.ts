/**
 * T4 — HomePlayground e2e spec (SPEC-028)
 *
 * Targets: http://localhost:3000 (Nuxt dev or preview server)
 *
 * Run with the marketing Playwright config:
 *   pnpm -F @origam/tests playwright test \
 *     --config=playwright.marketing.config.ts \
 *     home-playground.spec.ts
 *
 * NOTE: playwright.marketing.config.ts testMatch currently limits
 * to marketing-theming.spec.ts only. To include this spec, either run
 * with --testPathPattern=home-playground or ask the lead to broaden
 * testMatch to include all marketing specs.
 *
 * HEADLESS LIMITATION (documented per CLAUDE.md rule):
 * The @vue/repl REPL editor mounts Monaco via dynamic import in an
 * onMounted hook. Playwright can wait for the REPL container's
 * presence in the DOM (done below via waitForSelector), but cannot
 * verify that the Monaco iframe / editor instance is fully initialised
 * and functional without a complex iframe evaluation. We assert:
 *   1. The REPL wrapper div is attached (client-side hydration ran).
 *   2. The toolbar buttons (SHARE / OPEN) are visible.
 *   3. The skeleton fallback is NOT present once the REPL has mounted.
 * Interactive editing behaviour (type → live preview updates) is out
 * of scope for headless and should be verified manually in the browser.
 */

import { expect, test } from '@playwright/test'

const BASE = process.env.MARKETING_BASE_URL ?? 'http://localhost:3000'

test.describe('HomePlayground section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE, { waitUntil: 'domcontentloaded' })
    })

    test('section is rendered by SSR — returns HTTP 200', async ({ page, request }) => {
        const response = await request.get(BASE)
        expect(response.status()).toBe(200)

        const section = page.locator('section#playground')
        await expect(section).toBeVisible()
    })

    test('eyebrow text is present', async ({ page }) => {
        const eyebrow = page.locator('section#playground .home-playground__eyebrow')
        await expect(eyebrow).toContainText('LIVE PLAYGROUND')
    })

    test('h2 title is present', async ({ page }) => {
        const title = page.locator('section#playground h2')
        await expect(title).toContainText('Try before you ship.')
    })

    test('toolbar shows file tab and action buttons', async ({ page }) => {
        const toolbar = page.locator('section#playground .home-playground__toolbar')
        await expect(toolbar).toBeVisible()

        const tab = toolbar.locator('.home-playground__tab')
        await expect(tab).toContainText('App.vue')

        const shareBtn = page.locator('[data-cy="playground-btn-share"]')
        const openBtn  = page.locator('[data-cy="playground-btn-open"]')
        await expect(shareBtn).toBeVisible()
        await expect(openBtn).toBeVisible()
    })

    test('caption figcaption is present', async ({ page }) => {
        const caption = page.locator('section#playground figcaption')
        await expect(caption).toBeVisible()
        await expect(caption).not.toBeEmpty()
    })

    test('REPL container mounts client-side (ClientOnly resolved)', async ({ page }) => {
        /**
         * Wait up to 15 s for the REPL to mount — Monaco loads lazily.
         * If the dynamic import fails, the ClientOnly fallback skeleton
         * stays in the DOM. We assert the skeleton is gone and the REPL
         * div is present, which proves client-side hydration ran correctly.
         *
         * HEADLESS LIMITATION: We cannot verify Monaco's iframe content
         * or live-preview updates headlessly. See file-level NOTE above.
         */
        const replContainer = page.locator('[data-cy="playground-repl"]')
        await expect(replContainer).toBeVisible({ timeout: 15_000 })

        const skeleton = page.locator('section#playground .home-playground__skeleton')
        await expect(skeleton).not.toBeVisible()
    })

    test('SHARE and OPEN buttons are keyboard-focusable', async ({ page }) => {
        const shareBtn = page.locator('[data-cy="playground-btn-share"]')
        await shareBtn.focus()
        await expect(shareBtn).toBeFocused()

        const openBtn = page.locator('[data-cy="playground-btn-open"]')
        await openBtn.focus()
        await expect(openBtn).toBeFocused()
    })

    test('section has no duplicate h1 — heading hierarchy is valid', async ({ page }) => {
        const h1Count = await page.locator('h1').count()
        expect(h1Count).toBeLessThanOrEqual(1)

        const playgroundH2 = page.locator('section#playground h2')
        await expect(playgroundH2).toHaveCount(1)
    })

    test('SSR does not inject hydration mismatch warning', async ({ page }) => {
        const errors: string[] = []
        page.on('console', msg => {
            if (msg.type() === 'error' || msg.text().includes('Hydration') || msg.text().includes('hydration')) {
                errors.push(msg.text())
            }
        })

        await page.goto(BASE, { waitUntil: 'networkidle' })

        const hydrationErrors = errors.filter(e =>
            e.toLowerCase().includes('hydration') ||
            e.toLowerCase().includes('mismatch')
        )
        expect(hydrationErrors).toHaveLength(0)
    })
})
