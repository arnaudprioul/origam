import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-counter-origamcounter-story-vue'

test.describe('OrigamCounter', () => {
    test('Value & max — renders formatted value/max text', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Value & max', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const counter = sandbox.locator('[data-cy="counter-value"]')
        await expect(counter).toBeVisible({ timeout: 5000 })
        await expect(counter).toContainText('42', { timeout: 3000 })
        await expect(counter).toContainText('100', { timeout: 3000 })
    })

    test('Active — counter changes visual state when active', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Active', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const counter = sandbox.locator('[data-cy="counter-active"]')
        await expect(counter).toBeVisible({ timeout: 5000 })
    })

    test('Disabled — counter renders disabled', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Disabled', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="counter-disabled"]')).toBeVisible({ timeout: 5000 })
    })

    test('Overflow — counter shows value > max without throwing', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Overflow (value > max)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const counter = sandbox.locator('[data-cy="counter-overflow"]')
        await expect(counter).toBeVisible({ timeout: 5000 })
        await expect(counter).toContainText('150', { timeout: 3000 })
    })

    test('Playground — renders with all controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="counter-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
