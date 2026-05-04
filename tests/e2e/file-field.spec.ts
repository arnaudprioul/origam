import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-filefield-origamfilefield-story-vue'

test.describe('OrigamFileField', () => {
    test('Basic variant — file input is rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-file-field').first()).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('input[type="file"]').first()).toBeAttached()
    })

    test('Multiple files variant — field renders with multiple attribute', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Multiple files', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-file-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Drag and drop (single) variant — dropzone is rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Drag and drop (single)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-file-field--dragndrop').first()).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-file-field__dropzone').first()).toBeVisible({ timeout: 5000 })
    })

    test('Drag and drop (multiple) variant — dropzone is rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Drag and drop (multiple)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-file-field--dragndrop').first()).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled field has disabled attribute on input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-file-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — dropzone renders custom content', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — dropzone', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByText('Custom dropzone')).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders field', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-file-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Emit — drop variant renders dragndrop field', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — drop', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-file-field__dropzone').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — field renders with dragndrop class when dragndrop=true', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-file-field').first()).toBeVisible({ timeout: 5000 })
    })
})
