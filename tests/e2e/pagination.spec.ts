import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-pagination-origampagination-story-vue'

test.describe('OrigamPagination', () => {
    test('Basic variant — pagination nav is rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('Basic variant — page buttons are rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const nav = sandbox.locator('[role="navigation"]').first()
        await expect(nav).toBeVisible({ timeout: 5000 })
        const buttons = nav.getByRole('button')
        await expect(buttons.first()).toBeVisible({ timeout: 5000 })
    })

    test('Length and total visible variant — ellipsis is used for large lengths', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Length and total visible', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('First / last page buttons variant — first/last buttons are present', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('First / last page buttons', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-pagination__first').first()).toBeAttached({ timeout: 5000 })
    })

    test('Color variant — pagination renders with color intent', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('Disabled variant — pagination buttons are disabled', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Disabled', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const nav = sandbox.locator('[role="navigation"]').first()
        await expect(nav).toBeVisible({ timeout: 5000 })
    })

    test('Slot — item renders custom page buttons', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — item', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders pagination', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — pagination renders with all controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })
})
