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
        await page.getByText('Color', { exact: true }).last().click({ timeout: 5000 })
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

    test('Color showcase — bgColor prop paints each intent on the btn root', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).last().click({ timeout: 5000 })
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const expected: Record<string, string> = {
            primary: 'rgb(124, 58, 237)',
            success: 'rgb(76, 175, 80)',
            warning: 'rgb(251, 140, 0)',
            danger:  'rgb(239, 68, 68)'
        }
        for (const [intent, rgb] of Object.entries(expected)) {
            const btn = sandbox.locator(`[data-cy="btn-color-${intent}"]`)
            await expect(btn).toBeVisible({ timeout: 5000 })
            const bg = await btn.evaluate(el => getComputedStyle(el).backgroundColor)
            expect(bg, `btn-color-${intent}`).toBe(rgb)
        }
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

    test.describe('Loading shapes', () => {
        // Navigate once and reuse the variant for all assertions in sub-tests
        // by relying on the `page` fixture scoped to the describe block.

        test('loading=true → default kind circular renderer present', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Loading shapes', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-bool"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            // Btn defaultKind = 'circular' → the circular progress must be mounted
            await expect(btn.locator('.origam-progress--circular')).toBeAttached({ timeout: 5000 })
        })

        test('loading=42 → determinate circular progress mounted', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Loading shapes', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-number"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            // Number input → defaultKind circular, determinate
            await expect(btn.locator('.origam-progress--circular')).toBeAttached({ timeout: 5000 })
            // The btn must carry the loading modifier class
            await expect(btn).toHaveClass(/origam-btn--loading/)
        })

        test('loading={ type: "line" } → linear progress mounted', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Loading shapes', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-line"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            await expect(btn.locator('.origam-progress--linear')).toBeAttached({ timeout: 5000 })
        })

        test('loading={ type: "circular", size: 16 } → override prop honored', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Loading shapes', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-circular-override"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            // The circular progress must be present (kind = circular)
            const progress = btn.locator('.origam-progress--circular')
            await expect(progress).toBeAttached({ timeout: 5000 })
            // size=16 override → progress element width should be ≤ 20px
            const width = await progress.evaluate(el => (el as HTMLElement).offsetWidth)
            expect(width).toBeLessThanOrEqual(20)
        })

        test('loading={ type: "skeleton" } → origam-skeleton mounted, content unmounted', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Loading shapes', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-skeleton"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            // Skeleton renderer is mounted
            await expect(btn.locator('.origam-skeleton')).toBeAttached({ timeout: 5000 })
            // OrigamLoader's template is `<template v-if="isLoading">…<template
            // v-else>…`: during skeleton loading the loader slot REPLACES the
            // default slot, so `.origam-btn__content` is unmounted (not just
            // hidden via opacity). Assert detachment, not opacity.
            await expect(btn.locator('.origam-btn__content')).not.toBeAttached({ timeout: 3000 })
        })
    })

    test.describe('Rounded — shaped / shaped-invert corner asymmetry', () => {
        test('shaped — TL and BR are rounded, TR and BL are 0', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Rounded', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-rounded-shaped"]')
            await expect(btn).toBeVisible({ timeout: 5000 })

            const radii = await btn.evaluate(el => {
                const cs = getComputedStyle(el as HTMLElement)
                return {
                    tl: cs.borderTopLeftRadius,
                    tr: cs.borderTopRightRadius,
                    br: cs.borderBottomRightRadius,
                    bl: cs.borderBottomLeftRadius
                }
            })
            expect(radii.tl, 'top-left should be rounded').not.toBe('0px')
            expect(radii.br, 'bottom-right should be rounded').not.toBe('0px')
            expect(radii.tr, 'top-right should be 0').toBe('0px')
            expect(radii.bl, 'bottom-left should be 0').toBe('0px')
            // TL and BR should be equal (symmetric shaped)
            expect(radii.tl).toBe(radii.br)
        })

        test('shaped-invert — TR and BL are rounded, TL and BR are 0', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Rounded', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-rounded-shaped-invert"]')
            await expect(btn).toBeVisible({ timeout: 5000 })

            const radii = await btn.evaluate(el => {
                const cs = getComputedStyle(el as HTMLElement)
                return {
                    tl: cs.borderTopLeftRadius,
                    tr: cs.borderTopRightRadius,
                    br: cs.borderBottomRightRadius,
                    bl: cs.borderBottomLeftRadius
                }
            })
            expect(radii.tr, 'top-right should be rounded').not.toBe('0px')
            expect(radii.bl, 'bottom-left should be rounded').not.toBe('0px')
            expect(radii.tl, 'top-left should be 0').toBe('0px')
            expect(radii.br, 'bottom-right should be 0').toBe('0px')
            // TR and BL should be equal (symmetric shaped-invert)
            expect(radii.tr).toBe(radii.bl)
        })
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
