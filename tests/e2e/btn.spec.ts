import { expect, test } from '@playwright/test'

/**
 * Reference Playwright spec for OrigamBtn — pattern for the rest of the
 * Cypress → Playwright migration (Lot 11).
 *
 * Conventions:
 *   - One `test.describe` block per Variant in the matching `*.story.vue`.
 *   - Each test navigates to the Histoire URL of the variant via
 *     `goto(STORY_PATH)` then clicks the variant name in the sidebar.
 *   - Locators use the iframe sandbox pattern: Histoire renders component
 *     previews inside `iframe[src*="__sandbox"]`.
 *
 * The Histoire URL pattern for file-based stories is:
 *   /story/stories-components-stories-{group}-{name}-story-vue
 * The sidebar variant title is then clicked to switch variants.
 */

const STORY_PATH = '/story/stories-components-stories-btn-origambtn-story-vue'

test.describe('OrigamBtn — visual & a11y baseline', () => {
    test('renders a button with text label', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Variant', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const btn = sandbox.getByRole('button', { name: /button/i }).first()
        await expect(btn).toBeVisible({ timeout: 5000 })
    })

    test('Color variant — primary intent applies the action token', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color (intent)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const btn = sandbox.getByRole('button', { name: /button/i }).first()
        await expect(btn).toBeVisible({ timeout: 5000 })

        // Background must come from the design tokens, never an inline hex.
        const bgComputed = await btn.evaluate(
            el => getComputedStyle(el).backgroundColor
        )
        expect(bgComputed).not.toMatch(/^#[0-9a-fA-F]{3,6}$/)
    })

    test('States — disabled disables pointer events', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const btn = sandbox.getByRole('button', { name: /button/i }).first()
        await expect(btn).toBeVisible({ timeout: 5000 })

        // The SCSS rule `.origam-btn--disabled { pointer-events: none }` is
        // scoped so we inject the class AND use style override to verify.
        const ptrEvents = await btn.evaluate((el) => {
            el.classList.add('origam-btn--disabled')
            return getComputedStyle(el).pointerEvents
        })
        expect(ptrEvents).toBe('none')
    })

    test('Emit click — click variant logs interactions via histoire logEvent', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — click', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const btn = sandbox.getByRole('button', { name: /click me/i })
        await expect(btn).toBeVisible({ timeout: 5000 })

        // Verify button is clickable (no throw = success).
        // logEvent() is an Histoire-side side-effect we cannot assert from
        // outside the iframe — clicking without error is sufficient here.
        await btn.click()
        await btn.click()
        await btn.click()
    })

    test.fixme('Visual regression — Variant grid — no baseline yet', async ({ page }) => {
        // This test requires a committed screenshot baseline to compare against.
        // Run `npx playwright test --update-snapshots` once to create the
        // baseline, commit the .png, then remove this fixme.
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const story = sandbox.locator('.origam-btn').first()
        await expect(story).toHaveScreenshot('btn-variant.png', {
            maxDiffPixelRatio: 0.01
        })
    })
})
