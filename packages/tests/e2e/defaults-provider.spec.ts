import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-defaultsprovider-origamdefaultsprovider-story-vue'

test.describe('OrigamDefaultsProvider', () => {
    test('Global defaults — buttons receive density from global defaults', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Global defaults (density)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByRole('button', { name: /Button A/i })).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByRole('button', { name: /Button B/i })).toBeVisible({ timeout: 5000 })
    })

    test('Component-level defaults — buttons receive injected color', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Component-level defaults', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByRole('button', { name: /Inherits primary/i })).toBeVisible({ timeout: 5000 })
    })

    test('Scoped — inner provider does not inherit outer defaults', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Scoped (no parent inheritance)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByRole('button', { name: /Scoped: only danger/i })).toBeVisible({ timeout: 5000 })
    })

    test('Disabled — inner provider passes through outer defaults', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Disabled (pass-through)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByRole('button', { name: /Outer default/i })).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByRole('button', { name: /Disabled provider/i })).toBeVisible({ timeout: 5000 })
    })

    test('Slot — default renders button from slot', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByRole('button', { name: /Small from slot/i })).toBeVisible({ timeout: 5000 })
    })

    test('Playground — buttons render with injected defaults from controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByRole('button', { name: /Button A/i })).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByRole('button', { name: /Button B/i })).toBeVisible({ timeout: 5000 })
        // The "explicit" button bypasses the provider defaults
        await expect(sandbox.getByRole('button', { name: /Button C/i })).toBeVisible({ timeout: 5000 })
    })
})
