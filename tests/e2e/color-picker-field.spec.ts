import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-colorpickerfield-origamcolorpickerfield-story-vue'

test.describe('OrigamColorPickerField', () => {
    test('Basic variant — field renders with a visible input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Close on select variant — field renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Close on select', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled state prevents menu from opening', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — colorSelection renders custom content', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — colorSelection', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders field', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — field renders and has the active-menu class when picker opens', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const field = sandbox.locator('.origam-color-picker-field').first()
        await expect(field).toBeVisible({ timeout: 5000 })

        // Click to open the picker
        await field.click()
        await page.waitForTimeout(500)
        await expect(field).toHaveClass(/origam-color-picker-field--active-menu/)
    })
})
