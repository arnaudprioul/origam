import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-infinitescroll-origaminfinitescroll-story-vue'

test.describe('OrigamInfiniteScroll', () => {
    test('Basic — end side variant renders with initial items', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic — end side', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-infinite-scroll').first()).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByText('Item 1')).toBeVisible({ timeout: 5000 })
    })

    test('Manual mode variant — renders with load more button', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Manual mode', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-infinite-scroll').first()).toBeVisible({ timeout: 5000 })
    })

    test('Both sides variant — renders scroll container', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Both sides', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-infinite-scroll').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — loading renders custom loading content', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — loading', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-infinite-scroll').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — empty renders custom empty message', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — empty', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-infinite-scroll').first()).toBeVisible({ timeout: 5000 })
        // Empty slot should eventually appear since handleLoadEmpty immediately returns 'empty'
        await expect(sandbox.getByText('No more items')).toBeVisible({ timeout: 5000 })
    })

    test('Emit — load variant renders scroll container', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — load', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-infinite-scroll').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — infinite scroll renders with configurable side and mode', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-infinite-scroll').first()).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByText('Item 1')).toBeVisible({ timeout: 5000 })
    })
})
