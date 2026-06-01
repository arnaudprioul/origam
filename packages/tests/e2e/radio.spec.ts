import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-radio-origamradio-story-vue'

test.describe('OrigamRadio', () => {
    test('Color variant — renders radio with label', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const radio = sandbox.locator('[data-cy="radio-color"]')
        await expect(radio).toBeVisible({ timeout: 5000 })
    })

    test('Density variant — radio renders with density class', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Density', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="radio-density"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled and readonly render without throw', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="radio-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — clicking input updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const status = sandbox.locator('[data-cy="radio-emit-status"]')
        await expect(status).toContainText('value =', { timeout: 5000 })

        const input = sandbox.locator('[data-cy="radio-emit-update"] .origam-selection-control__input').first()
        await input.click()
        await expect(status).toContainText('yes', { timeout: 3000 })
    })

    test('Slot label — custom label slot renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — label', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="radio-slot-label"]')).toBeVisible({ timeout: 5000 })
    })

    test('Playground — renders without errors', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="radio-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
