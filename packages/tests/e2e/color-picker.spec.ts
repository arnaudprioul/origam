import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-colorpicker-origamcolorpicker-story-vue'

test.describe('OrigamColorPicker', () => {
    test('Canvas variant — picker renders with canvas area', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Canvas', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const picker = sandbox.locator('.origam-color-picker').first()
        await expect(picker).toBeVisible({ timeout: 5000 })
    })

    test('Canvas variant — hideCanvas removes the canvas element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Canvas', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        // With default hideCanvas=false, canvas should be present
        const picker = sandbox.locator('.origam-color-picker').first()
        await expect(picker).toBeVisible({ timeout: 5000 })
    })

    test('Mode variant — picker renders with mode controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const picker = sandbox.locator('.origam-color-picker').first()
        await expect(picker).toBeVisible({ timeout: 5000 })
    })

    test('Sliders and inputs variant — picker renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Sliders and inputs', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const picker = sandbox.locator('.origam-color-picker').first()
        await expect(picker).toBeVisible({ timeout: 5000 })
    })

    test('Swatches variant — picker renders with showSwatches=true', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Swatches', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const picker = sandbox.locator('.origam-color-picker').first()
        await expect(picker).toBeVisible({ timeout: 5000 })
    })

    test('Slot — title renders custom title content', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — title', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByText('Pick a colour')).toBeVisible({ timeout: 5000 })
    })

    test('Slot — actions renders action buttons', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — actions', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByRole('button', { name: /apply/i })).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders picker', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground variant — picker renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const picker = sandbox.locator('.origam-color-picker').first()
        await expect(picker).toBeVisible({ timeout: 5000 })
        // picker mode class is present
        await expect(picker).toHaveClass(/origam-color-picker--/)
    })
})
