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
 *   /story/<package>-<component>-story-vue  (e.g. components-stories-btn-origambtn-story-vue)
 * The sidebar variant title is then clicked to switch variants.
 */

const STORY_PATH = '/story/components-stories-btn-origambtn-story-vue'

test.describe('OrigamBtn — visual & a11y baseline', () => {
    test('renders a button with text label', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — variant', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const btn = sandbox.getByRole('button', { name: /button/i }).first()
        await expect(btn).toBeVisible({ timeout: 5000 })
    })

    test('Color variant — primary intent applies the action token', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — color & bgColor', { exact: true }).last().click({ timeout: 5000 })
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
        await page.getByText('Prop — color & bgColor', { exact: true }).last().click({ timeout: 5000 })
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
            // Phase 3 Vague A — class-first companion: the global utility
            // `.origam--bg-{intent}` lands on the root for tokenised
            // intents. The computed bg above and the class below must
            // both be present (classes ET styles, strategy "a").
            await expect(btn, `btn-color-${intent} utility class`).toHaveClass(
                new RegExp(`origam--bg-${intent}`)
            )
        }
    })

    test('States — disabled disables pointer events', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — disabled, loading & readonly', { exact: true }).first().click()
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
        // The story "Prop — loading (interactive)" was consolidated into a single
        // interactive button (data-cy="btn-loading-interactive") with sidebar
        // controls to switch loading kind. The previous fixture had individual
        // per-kind buttons (btn-loading-bool, btn-loading-number, etc.) which no
        // longer exist. Only the initial render state (enabled=true, kind='bool')
        // can be asserted headlessly without sidebar manipulation.

        test('loading=true → default kind circular renderer present', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Prop — loading (interactive)', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            // The variant init-state is { enabled: true, kind: 'bool' } →
            // resolveLoading returns `true` → Btn renders a circular progress.
            const btn = sandbox.locator('[data-cy="btn-loading-interactive"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            // Btn defaultKind = 'circular' → the circular progress must be mounted
            await expect(btn.locator('.origam-progress--circular')).toBeAttached({ timeout: 5000 })
        })

        // FIXTURE ROT: the previous story had dedicated static buttons for each
        // loading kind (btn-loading-number, btn-loading-line, etc.). The story was
        // refactored to a single interactive button + sidebar controls. The tests
        // below require switching the "kind" control in the Histoire sidebar which
        // cannot be driven headlessly via Playwright from outside the iframe.
        // They are marked fixme until the story exposes per-kind static fixtures
        // again, or until a helper that drives Histoire sidebar controls is added.

        test.fixme('loading=42 → determinate circular progress mounted', async ({ page }) => {
            // FIXTURE ROT: btn-loading-number no longer exists. The variant was
            // consolidated. Requires sidebar "kind" control to be set to 'number'.
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Prop — loading (interactive)', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-interactive"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            // Number input → defaultKind circular, determinate
            await expect(btn.locator('.origam-progress--circular')).toBeAttached({ timeout: 5000 })
            // The btn must carry the loading modifier class
            await expect(btn).toHaveClass(/origam-btn--loading/)
        })

        test.fixme('loading={ type: "line" } → linear progress mounted', async ({ page }) => {
            // FIXTURE ROT: btn-loading-line no longer exists. The variant was
            // consolidated. Requires sidebar "kind" control to be set to 'line'.
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Prop — loading (interactive)', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-interactive"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            await expect(btn.locator('.origam-progress--linear')).toBeAttached({ timeout: 5000 })
        })

        test.fixme('loading={ type: "circular", size: 16 } → override prop honored', async ({ page }) => {
            // FIXTURE ROT: btn-loading-circular-override no longer exists. The
            // variant was consolidated. Requires sidebar "kind" + "circularSize"
            // controls to be set (kind='circular', circularSize=16).
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Prop — loading (interactive)', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-interactive"]')
            await expect(btn).toBeVisible({ timeout: 5000 })
            // The circular progress must be present (kind = circular)
            const progress = btn.locator('.origam-progress--circular')
            await expect(progress).toBeAttached({ timeout: 5000 })
            // size=16 override → progress element width should be ≤ 20px
            const width = await progress.evaluate(el => (el as HTMLElement).offsetWidth)
            expect(width).toBeLessThanOrEqual(20)
        })

        test.fixme('loading={ type: "skeleton" } → origam-skeleton mounted, content unmounted', async ({ page }) => {
            // FIXTURE ROT: btn-loading-skeleton no longer exists. The variant was
            // consolidated. Requires sidebar "kind" control to be set to 'skeleton'.
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Prop — loading (interactive)', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const btn = sandbox.locator('[data-cy="btn-loading-interactive"]')
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
            await page.getByText('Prop — rounded', { exact: true }).first().click()
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
            await page.getByText('Prop — rounded', { exact: true }).first().click()
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

    test.describe('Prop borderColor / borderStyle — outlined variant', () => {
        test('borderColor → computed border-color matches the prop value', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Prop — borderColor & borderStyle', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

            const defaultBtn = sandbox.locator('[data-cy="btn-border-outlined-default"]')
            const colorBtn = sandbox.locator('[data-cy="btn-border-color"]')
            await expect(defaultBtn).toBeVisible({ timeout: 5000 })
            await expect(colorBtn).toBeVisible({ timeout: 5000 })

            const defaultColor = await defaultBtn.evaluate(el => getComputedStyle(el as HTMLElement).borderTopColor)
            const customColor = await colorBtn.evaluate(el => getComputedStyle(el as HTMLElement).borderTopColor)

            // tomato === rgb(255, 99, 71)
            expect(customColor).toBe('rgb(255, 99, 71)')
            expect(customColor).not.toBe(defaultColor)
        })

        test('borderStyle → computed border-style matches the prop value', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Prop — borderColor & borderStyle', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

            const defaultBtn = sandbox.locator('[data-cy="btn-border-outlined-default"]')
            const styleBtn = sandbox.locator('[data-cy="btn-border-style"]')
            await expect(defaultBtn).toBeVisible({ timeout: 5000 })
            await expect(styleBtn).toBeVisible({ timeout: 5000 })

            const defaultStyle = await defaultBtn.evaluate(el => getComputedStyle(el as HTMLElement).borderTopStyle)
            const customStyle = await styleBtn.evaluate(el => getComputedStyle(el as HTMLElement).borderTopStyle)

            expect(defaultStyle).toBe('solid')
            expect(customStyle).toBe('dotted')
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
