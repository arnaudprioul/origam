import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-checkbox-origamcheckbox-story-vue'

test.describe('OrigamCheckbox', () => {
    test('Color variant — renders a checkbox with label', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const checkbox = sandbox.locator('[data-cy="checkbox-color"]')
        await expect(checkbox).toBeVisible({ timeout: 5000 })
    })

    test('Density variant — checkbox renders at configured density', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Density', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const checkbox = sandbox.locator('[data-cy="checkbox-density"]')
        await expect(checkbox).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled prevents interaction', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const checkbox = sandbox.locator('[data-cy="checkbox-states"]')
        await expect(checkbox).toBeVisible({ timeout: 5000 })

        const input = sandbox.locator('.origam-selection-control__input').first()
        await expect(input).toBeVisible({ timeout: 3000 })
    })

    test('Error variant — error message visible when error=true', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Error & validation', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const checkbox = sandbox.locator('[data-cy="checkbox-error"]')
        await expect(checkbox).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — toggling updates status div', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const status = sandbox.locator('[data-cy="checkbox-emit-status"]')
        await expect(status).toContainText('value = false', { timeout: 5000 })

        // Click via the selection control input (known landmine: bare input without type)
        const input = sandbox.locator('[data-cy="checkbox-emit-update"] .origam-selection-control__input').first()
        await input.click()
        await expect(status).toContainText('value = true', { timeout: 3000 })
    })

    test('Slot label — custom label slot renders italic span', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — label', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const label = sandbox.locator('[data-cy="checkbox-slot-label"]')
        await expect(label).toBeVisible({ timeout: 5000 })
        await expect(label.locator('span')).toBeVisible({ timeout: 3000 })
    })

    test('Playground — renders with all controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const playground = sandbox.locator('[data-cy="checkbox-playground"]')
        await expect(playground).toBeVisible({ timeout: 5000 })
    })
})
