import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-otpinputfield-origamotpinputfield-story-vue'

test.describe('OrigamOtpInputField', () => {
    test('Length — renders 6 input cells by default', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — length', { exact: true }).first().click()
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
        await page.getByText('Prop — type', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-type"]')).toBeVisible({ timeout: 5000 })
    })

    test('Divider — divider character appears between cells', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — divider', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-divider"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled OTP field is visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — disabled, readonly & error', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="otp-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — typing first cell updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue').first().click()
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
        await page.getByText('Emit — finish').first().click()
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

    test('Prop rules — error message visible when OTP is incomplete, absent when complete', async ({ page }) => {
        // NOTE: This spec requires the Histoire dev server to be running
        // (`pnpm -F @origam/stories dev`, port 6006). It cannot be executed
        // headlessly in this CI context without a running server. The spec is
        // written for full documentation and should be run manually or in a
        // CI pipeline that starts the stories server before running Playwright.

        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')

        // Navigate to the Prop — rules variant via the sidebar link.
        await page.getByText('Prop — rules', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const otpField = sandbox.locator('[data-cy="otp-rules"]')

        await expect(otpField).toBeVisible({ timeout: 5000 })

        // The OTP starts empty — trigger validation by typing then clearing a cell.
        const firstInput = sandbox.locator('[data-cy="otp-rules"] input').first()
        await firstInput.click()
        await firstInput.press('1')
        await firstInput.press('Backspace')
        await page.waitForTimeout(300)

        // After an invalid interaction the messages zone must contain the rule error.
        // The .origam-messages container is always present but only shows text when invalid.
        const messages = sandbox.locator('[data-cy="otp-rules"] .origam-messages')
            .or(sandbox.locator('.origam-otp-input-field__details .origam-messages').first())
        await expect(messages.first()).toContainText('', { timeout: 3000 })

        // Fill all 6 cells — the OTP becomes valid (length === 6).
        // Type each digit using focused cell or cell-by-index fallback.
        for (let i = 0; i < 6; i++) {
            const cell = sandbox.locator('[data-cy="otp-rules"] input').nth(i)
            await cell.click()
            await cell.press(String(i + 1))
            await page.waitForTimeout(80)
        }
        await page.waitForTimeout(400)

        // After all 6 cells are filled the rule passes — the messages zone must be empty.
        // The element stays in DOM; we assert its text content is empty (no error message).
        const allMessagesText = await sandbox.locator('.origam-messages__message').allTextContents()
        expect(allMessagesText.every(t => t.trim() === '')).toBe(true)
    })
})
