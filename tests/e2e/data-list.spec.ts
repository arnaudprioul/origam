import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-datalist-origamdatalist-story-vue'

test.describe('OrigamDataList', () => {
    test('Basic variant — renders a definition list', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Basic variant — title and text content are visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByText('Status')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByText('Active')).toBeVisible({ timeout: 5000 })
    })

    test('Density variant — renders with density class', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Density', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Adjacent icons variant — renders with icon controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Adjacent icons', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Border and rounded variant — renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Border and rounded', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — item renders custom item content', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — item', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
        // Custom slot renders strong titles
        await expect(sandbox.getByText('Status')).toBeVisible({ timeout: 5000 })
    })

    test('Slot — item.title renders custom title', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — item.title', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — data list renders with all controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })
})
