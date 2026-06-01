import { expect, test, type Page } from '@playwright/test'

const STORY_PATH = '/story/components-stories-expansionpanel-origamexpansionpanel-story-vue'

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

test.describe('OrigamExpansionPanel', () => {
    test('Color — panel renders with color intent', async ({ page }) => {
        await openVariant(page, 'Prop — color & bgColor')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="ep-color"]')).toBeVisible({ timeout: 5000 })
    })

    test('Density — panel renders with density class', async ({ page }) => {
        await openVariant(page, 'Prop — density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="ep-density"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled panel renders', async ({ page }) => {
        await openVariant(page, 'Prop — disabled')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="ep-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Playground — panel renders with all controls', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="ep-playground"]')).toBeVisible({ timeout: 5000 })
    })

    test('Loading (interactive) — panel renders with interactive loading controls', async ({ page }) => {
        await openVariant(page, 'Prop — loading (interactive)')
        const sandbox = sandboxOf(page)
        const panel = sandbox.locator('[data-cy="ep-loading-interactive"]')
        await expect(panel).toBeVisible({ timeout: 5000 })
        await expect(panel.locator('[role="progressbar"]').first()).toBeVisible({ timeout: 3000 })
    })
})
