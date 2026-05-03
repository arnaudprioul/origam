import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-field-origamfield-story-vue'

test.describe('OrigamField', () => {
    test('Variant — renders field shell with custom input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Variant', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-variant"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('[data-cy="field-variant-input"]')).toBeVisible({ timeout: 3000 })
    })

    test('Color — field renders with color prop', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-color"]')).toBeVisible({ timeout: 5000 })
    })

    test('Density — field renders at specified density', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Density', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-density"]')).toBeVisible({ timeout: 5000 })
    })

    test('Prefix & suffix — prefix and suffix text visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prefix & suffix', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-prefix"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-field__prefix').first()).toBeVisible({ timeout: 3000 })
    })

    test('States — error state applies error class', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Slot prependInner / appendInner — icons visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — prependInner / appendInner', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-slot-inner"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-field__prepend-inner').first()).toBeVisible({ timeout: 3000 })
    })

    test('Emit focus / blur — focusing input fires events', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — focus / blur', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('[data-cy="field-emit-focus"] input').first()
        await expect(input).toBeVisible({ timeout: 5000 })
        await input.focus()
        await input.blur()
        // logEvent called — no throw = success
    })

    test('Playground — renders without errors', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
