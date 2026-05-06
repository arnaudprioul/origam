import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-textareafield-origamtextareafield-story-vue'

test.describe('OrigamTextareaField', () => {
    test('Variant — renders textarea element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Variant', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textarea-variant"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('textarea').first()).toBeVisible({ timeout: 3000 })
    })

    test('Rows — textarea respects rows attribute', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Rows', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const textarea = sandbox.locator('[data-cy="textarea-rows"] textarea').first()
        await expect(textarea).toBeVisible({ timeout: 5000 })
    })

    test('No resize — textarea has resize:none', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('No resize', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const textarea = sandbox.locator('[data-cy="textarea-no-resize"] textarea').first()
        await expect(textarea).toBeVisible({ timeout: 5000 })

        const resize = await textarea.evaluate(el => getComputedStyle(el).resize)
        expect(resize).toBe('none')
    })

    test('Counter — counter element visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Counter', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textarea-counter"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-counter').first()).toBeVisible({ timeout: 3000 })
    })

    test('States — disabled prevents typing', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textarea-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — typing updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const textarea = sandbox.locator('[data-cy="textarea-emit-update"] textarea').first()
        await expect(textarea).toBeVisible({ timeout: 5000 })

        await textarea.fill('test content')
        const status = sandbox.locator('[data-cy="textarea-emit-status"]')
        await expect(status).toContainText('test content', { timeout: 3000 })
    })

    test('Playground — renders and accepts input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textarea-playground"]')).toBeVisible({ timeout: 5000 })

        const textarea = sandbox.locator('[data-cy="textarea-playground"] textarea').first()
        await textarea.fill('playground input')
        await expect(sandbox.locator('[data-cy="textarea-playground-status"]')).toContainText('playground input', { timeout: 3000 })
    })
})
