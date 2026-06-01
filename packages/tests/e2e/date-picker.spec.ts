import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-datepicker-origamdatepicker-story-vue'

test.describe('OrigamDatePicker', () => {
    test('Single date variant — calendar grid is visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Single date', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-date-picker').first()).toBeVisible({ timeout: 5000 })
    })

    test('Range variant — picker renders in range mode', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Range', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-date-picker').first()).toBeVisible({ timeout: 5000 })
    })

    test('Multiple variant — picker renders in multiple mode', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Multiple', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-date-picker').first()).toBeVisible({ timeout: 5000 })
    })

    test('Constraints variant — picker renders with min/max', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Constraints (min / max)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-date-picker').first()).toBeVisible({ timeout: 5000 })
    })

    test('Show week numbers — picker has show-week class', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Show week numbers', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-date-picker--show-week').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — actions renders action buttons', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — actions', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByRole('button', { name: /ok/i })).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders picker', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-date-picker').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — picker renders and allows date selection', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-date-picker').first()).toBeVisible({ timeout: 5000 })
    })
})
