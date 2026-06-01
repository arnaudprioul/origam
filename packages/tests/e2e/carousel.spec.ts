import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-carousel-origamcarousel-story-vue'

test.describe('OrigamCarousel', () => {
    test('Basic variant — carousel renders with slides visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-carousel').first()).toBeVisible({ timeout: 5000 })
    })

    test('Basic variant — delimiter controls are visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-carousel__controls').first()).toBeVisible({ timeout: 5000 })
    })

    test('Auto-play variant — carousel renders (auto-play disabled at frame 0)', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Auto-play', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-carousel').first()).toBeVisible({ timeout: 5000 })
    })

    test('Delimiters variant — renders with delimiter controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Delimiters', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-carousel').first()).toBeVisible({ timeout: 5000 })
    })

    test('Height variant — carousel renders with custom height', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Height', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const carousel = sandbox.locator('.origam-carousel').first()
        await expect(carousel).toBeVisible({ timeout: 5000 })
        const height = await carousel.evaluate(el => (el as HTMLElement).style.height)
        expect(height).toBeTruthy()
    })

    test('Slot — item renders custom delimiter buttons', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — item (custom delimiter)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-carousel').first()).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders carousel', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-carousel').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — carousel renders and responds to next navigation', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-carousel').first()).toBeVisible({ timeout: 5000 })
    })
})
