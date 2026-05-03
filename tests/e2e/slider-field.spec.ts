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
})
