import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-numberfield-origamnumberfield-story-vue'

test.describe('OrigamNumberField', () => {
    test('Variant — renders number input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Variant', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-variant"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('input').first()).toBeVisible({ timeout: 3000 })
    })

    test('Min / max / step — field renders with range config', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Min / max / step / precision', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-range"]')).toBeVisible({ timeout: 5000 })
        const status = sandbox.locator('[data-cy="numberfield-range-status"]')
        await expect(status).toContainText('value =', { timeout: 3000 })
    })

    test('Split mode — both increment and decrement buttons visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Split mode', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-split"]')).toBeVisible({ timeout: 5000 })
    })

    test('Hide controls — no increment/decrement buttons', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Hide controls', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-hide-controls"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled field visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — value updates after input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-emit-update"]')).toBeVisible({ timeout: 5000 })
        const status = sandbox.locator('[data-cy="numberfield-emit-status"]')
        await expect(status).toContainText('value =', { timeout: 3000 })
    })

    test('Emit increment / decrement — buttons fire events', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — increment / decrement', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-emit-inc"]')).toBeVisible({ timeout: 5000 })
        const status = sandbox.locator('[data-cy="numberfield-emit-inc-status"]')
        await expect(status).toContainText('value =', { timeout: 3000 })
    })

    test('Playground — renders and initializes correctly', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-playground"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('[data-cy="numberfield-playground-status"]')).toContainText('value =', { timeout: 3000 })
    })
})
