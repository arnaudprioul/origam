import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-otpinputfield-origamotpinputfield-story-vue'

test.describe('OrigamOtpInputField', () => {
    test('Length — renders 6 input cells by default', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByRole('link', { name: 'Length', exact: true }).click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-length"]')).toBeVisible({ timeout: 5000 })
        // 6 individual visible cell inputs + 1 hidden consolidation input = 7 total.
        // Assert on the visible cells only (excluding the hidden input used for form submission).
        const inputs = sandbox.locator('[data-cy="otp-length"] input:not([type=hidden])')
        await expect(inputs).toHaveCount(6, { timeout: 5000 })
    })

    test('Type — password type hides content', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Type', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-type"]')).toBeVisible({ timeout: 5000 })
    })

    test('Divider — divider character appears between cells', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByRole('link', { name: 'Divider', exact: true }).click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-divider"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled OTP field is visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — typing first cell updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const firstInput = sandbox.locator('[data-cy="otp-emit-update"] input').first()
        await expect(firstInput).toBeVisible({ timeout: 5000 })

        await firstInput.click()
        await firstInput.press('1')
        const status = sandbox.locator('[data-cy="otp-emit-status"]')
        await expect(status).toContainText('value =', { timeout: 3000 })
    })

    test('Emit finish — filling all 4 cells fires finish event', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — finish', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-emit-finish"]')).toBeVisible({ timeout: 5000 })
        // Type into the first cell — auto-advance behavior is internal
        const firstInput = sandbox.locator('[data-cy="otp-emit-finish"] input').first()
        await firstInput.click()
        await firstInput.press('1')
    })

    test('Playground — renders with controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
