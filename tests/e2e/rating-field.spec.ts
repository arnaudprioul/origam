import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-ratingfield-origamratingfield-story-vue'

test.describe('OrigamRatingField', () => {
    test('Length variant — renders correct number of rating items', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Length', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-rating-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Half increments variant — field renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Half increments', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-rating-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Hover preview variant — field has hover class', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Hover preview', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-rating-field--hover').first()).toBeVisible({ timeout: 5000 })
    })

    test('States — readonly field has pointer-events none', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-rating-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Size variant — field renders with size control', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Size', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-rating-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Item labels variant — labels are rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Item labels', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-rating-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — label renders custom label', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — label', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByText('Rate us')).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders field', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-rating-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — field renders with all controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-rating-field').first()).toBeVisible({ timeout: 5000 })
    })

    // The rating field is supposed to look like a row of stars, not a row
    // of buttons. Pre-fix the inner `<origam-btn>` rendered with its
    // default elevated/tonal chrome (visible background + box-shadow),
    // so the row read as five pill-buttons. Now forced to `variant: text`
    // so only the icon is visible.
    test('rating buttons render with text variant — no background, no shadow', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Length', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const btn = sandbox.locator('.origam-rating-field-item .origam-btn').first()
        await expect(btn).toBeVisible({ timeout: 5000 })

        const info = await btn.evaluate(el => {
            const cs = getComputedStyle(el)
            return {
                hasTextVariant: el.classList.contains('origam-btn--variant-text'),
                bg: cs.backgroundColor,
                boxShadow: cs.boxShadow,
            }
        })

        expect(info.hasTextVariant).toBe(true)
        // Transparent background — `rgba(0, 0, 0, 0)` is what
        // `background-color: transparent` resolves to in computed styles.
        expect(info.bg).toBe('rgba(0, 0, 0, 0)')
        expect(info.boxShadow).toBe('none')
    })
})
