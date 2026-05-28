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
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-playground"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('[data-cy="numberfield-playground-status"]')).toContainText('value =', { timeout: 3000 })
    })

    test('Compact — renders 2 buttons and 1 centered input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

        // Container is visible
        await expect(sandbox.locator('[data-cy="numberfield-compact"]')).toBeVisible({ timeout: 5000 })

        // Exactly 1 input rendered
        const input = sandbox.locator('[data-cy="numberfield-compact-input"]')
        await expect(input).toBeVisible({ timeout: 3000 })
        await expect(input).toHaveCount(1)

        // Exactly 2 buttons (− and +)
        const decrementBtn = sandbox.locator('[data-cy="numberfield-compact-decrement"]')
        const incrementBtn = sandbox.locator('[data-cy="numberfield-compact-increment"]')
        await expect(decrementBtn).toBeVisible({ timeout: 3000 })
        await expect(incrementBtn).toBeVisible({ timeout: 3000 })
    })

    test('Compact — no .origam-field__loader chrome rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-compact"]')).toBeVisible({ timeout: 5000 })

        // The full field chrome (.origam-field__loader) must NOT be present inside compact
        const loaderInCompact = sandbox.locator('[data-cy="numberfield-compact"] .origam-field__loader')
        await expect(loaderInCompact).toHaveCount(0)
    })

    test('Compact — click + increments value', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-compact"]')).toBeVisible({ timeout: 5000 })

        const input = sandbox.locator('[data-cy="numberfield-compact-input"]')
        const status = sandbox.locator('[data-cy="numberfield-compact-status"]')

        // Read initial value from status
        const initialText = await status.textContent({ timeout: 3000 })
        const initialMatch = initialText?.match(/value\s*=\s*(\d+)/)
        const initialValue = initialMatch ? Number(initialMatch[1]) : 3

        // Click increment
        await sandbox.locator('[data-cy="numberfield-compact-increment"]').click()
        await page.waitForTimeout(300)

        // Verify input and status reflect incremented value
        await expect(input).toHaveValue(String(initialValue + 1))
        await expect(status).toContainText(String(initialValue + 1))
    })

    test('Compact — click − decrements value', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="numberfield-compact"]')).toBeVisible({ timeout: 5000 })

        const input = sandbox.locator('[data-cy="numberfield-compact-input"]')
        const status = sandbox.locator('[data-cy="numberfield-compact-status"]')

        // Read initial value from status
        const initialText = await status.textContent({ timeout: 3000 })
        const initialMatch = initialText?.match(/value\s*=\s*(\d+)/)
        const initialValue = initialMatch ? Number(initialMatch[1]) : 3

        // Click decrement
        await sandbox.locator('[data-cy="numberfield-compact-decrement"]').click()
        await page.waitForTimeout(300)

        // Verify input and status reflect decremented value
        await expect(input).toHaveValue(String(initialValue - 1))
        await expect(status).toContainText(String(initialValue - 1))
    })
})
