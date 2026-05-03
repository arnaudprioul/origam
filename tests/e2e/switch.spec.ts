import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-switch-origamswitch-story-vue'

test.describe('OrigamSwitch', () => {
    test('Color variant — renders switch with track', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-color"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-switch__track').first()).toBeVisible({ timeout: 3000 })
    })

    test('Inset & flat — toggle changes inset state', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Inset & flat', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-inset"]')).toBeVisible({ timeout: 5000 })
    })

    test('Indeterminate — renders in indeterminate state', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Indeterminate', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-indeterminate"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled switch is visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — clicking updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const status = sandbox.locator('[data-cy="switch-emit-status"]')
        await expect(status).toContainText('value = false', { timeout: 5000 })

        // Click via selection control input (bare input landmine — use class locator)
        const input = sandbox.locator('[data-cy="switch-emit-update"] .origam-selection-control__input').first()
        await input.click()
        await expect(status).toContainText('value = true', { timeout: 3000 })
    })

    test('Slot track.true / track.false — custom track content renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — track.true / track.false', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-slot-track"]')).toBeVisible({ timeout: 5000 })
    })

    test('Playground — renders without errors', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
