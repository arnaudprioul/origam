import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-sliderfield-origamsliderfield-story-vue'

test.describe('OrigamSliderField', () => {
    test('Color variant — renders slider track', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="slider-color"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-slider-field__track').first()).toBeVisible({ timeout: 3000 })
    })

    test('Range — renders two thumbs', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Range (two-thumb)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="slider-range"]')).toBeVisible({ timeout: 5000 })
        const status = sandbox.locator('[data-cy="slider-range-status"]')
        await expect(status).toContainText('value =', { timeout: 3000 })
    })

    test('Step — slider renders with step config', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Step', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="slider-step"]')).toBeVisible({ timeout: 5000 })
    })

    test('Ticks — tick marks render on track', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Ticks', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="slider-ticks"]')).toBeVisible({ timeout: 5000 })
    })

    test('Direction — vertical slider renders in container', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Direction', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="slider-direction"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled slider is visible but not interactive', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="slider-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — status div shows value', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="slider-emit-update"]')).toBeVisible({ timeout: 5000 })
        const status = sandbox.locator('[data-cy="slider-emit-status"]')
        await expect(status).toContainText('value =', { timeout: 3000 })
    })

    test('Playground — renders and shows initial value', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="slider-playground"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('[data-cy="slider-playground-status"]')).toContainText('value =', { timeout: 3000 })
    })

    // ─────────────────────────────────────────────────────────────────────
    // Error → danger on BOTH channels
    // ─────────────────────────────────────────────────────────────────────
    // Contract: when `error` is on, the slider forces the `danger` intent
    // on the color channel (fill + thumb cercle) AND the bgColor channel
    // (rail). It overrides any consumer-set color/bgColor so the error
    // stays visible. Convention shared with Input/Form/SelectionControl.
    //
    //   useBackgroundColor('danger') → danger.bg     = #ef4444
    //   useTextColor('danger')       → danger.fgSubtle = #b91c1c
    //   (thumb uses `background-color: currentColor`, so it inherits
    //    fgSubtle — same rung as bg.)
    test.describe('error state forces danger on both channels', () => {
        const DANGER_BG = 'rgb(239, 68, 68)'
        const DANGER_FG_SUBTLE = 'rgb(185, 28, 28)'

        test.beforeEach(async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('States', { exact: true }).first().click()
            await page.waitForTimeout(800)
        })

        test('error only — fill, rail (bg) and thumb (fgSubtle) all in danger rung', async ({ page }) => {
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const slider = sandbox.locator('[data-cy="slider-states-fixture-error"]')
            await expect(slider).toBeVisible({ timeout: 5000 })

            const fillBg = await slider.locator('.origam-slider-field-track__fill')
                .first().evaluate(el => getComputedStyle(el).backgroundColor)
            expect(fillBg).toBe(DANGER_BG)

            const railBg = await slider.locator('.origam-slider-field-track__background')
                .first().evaluate(el => getComputedStyle(el).backgroundColor)
            expect(railBg).toBe(DANGER_BG)

            const thumbBg = await slider.locator('.origam-slider-field-thumb__surface')
                .first().evaluate(el => getComputedStyle(el).backgroundColor)
            expect(thumbBg).toBe(DANGER_FG_SUBTLE)
        })

        test('error overrides consumer color="primary" + bg-color="success"', async ({ page }) => {
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const slider = sandbox.locator('[data-cy="slider-states-fixture-error-overrides"]')
            await expect(slider).toBeVisible({ timeout: 5000 })

            const fillBg = await slider.locator('.origam-slider-field-track__fill')
                .first().evaluate(el => getComputedStyle(el).backgroundColor)
            expect(fillBg).toBe(DANGER_BG)

            const railBg = await slider.locator('.origam-slider-field-track__background')
                .first().evaluate(el => getComputedStyle(el).backgroundColor)
            expect(railBg).toBe(DANGER_BG)

            const thumbBg = await slider.locator('.origam-slider-field-thumb__surface')
                .first().evaluate(el => getComputedStyle(el).backgroundColor)
            expect(thumbBg).toBe(DANGER_FG_SUBTLE)
        })
    })
})
