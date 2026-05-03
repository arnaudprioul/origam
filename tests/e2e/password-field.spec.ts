import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-passwordfield-origampasswordfield-story-vue'

test.describe('OrigamPasswordField', () => {
    test('Show/hide icons — toggle button visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Show / hide icons', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="passwordfield-icons"]')).toBeVisible({ timeout: 5000 })
        // The appendInner icon is the toggle button
        await expect(sandbox.locator('.origam-field__append-inner').first()).toBeVisible({ timeout: 3000 })
    })

    test('Show/hide — initial input type is password', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Show / hide icons', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('input[type="password"]').first()
        await expect(input).toBeVisible({ timeout: 5000 })
    })

    test('Requirements — requirements popup option visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Strength requirements', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="passwordfield-requirements"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled password field visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="passwordfield-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — typing updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('[data-cy="passwordfield-emit-update"] input').first()
        await expect(input).toBeVisible({ timeout: 5000 })

        await input.fill('secret123')
        const status = sandbox.locator('[data-cy="passwordfield-emit-status"]')
        await expect(status).toContainText('(set)', { timeout: 3000 })
    })

    test('Playground — renders without errors', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="passwordfield-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
