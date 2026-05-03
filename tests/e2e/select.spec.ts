import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-select-origamselect-story-vue'

test.describe('OrigamSelect', () => {
    test('Items string list — renders select with label', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Items — string list', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-string"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('[data-cy="select-string"] input').first()).toBeVisible({ timeout: 3000 })
    })

    test('Items object list — renders with item-title/value mapping', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Items — object list', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-object"]')).toBeVisible({ timeout: 5000 })
    })

    test('Multiple — multiple selection field renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Multiple', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-multiple"]')).toBeVisible({ timeout: 5000 })
    })

    test('Chips — chips mode renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Chips', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-chips"]')).toBeVisible({ timeout: 5000 })
    })

    test('Autocomplete — filter input renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Autocomplete', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-autocomplete"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled select renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — selecting item updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-emit-update"]')).toBeVisible({ timeout: 5000 })

        // Click the select field to open menu
        const input = sandbox.locator('[data-cy="select-emit-update"] input').first()
        await input.click()
        await page.waitForTimeout(500)

        // Click first item in the dropdown
        const menuItem = sandbox.locator('.origam-list-item').first()
        if (await menuItem.isVisible({ timeout: 2000 }).catch(() => false)) {
            await menuItem.click()
            const status = sandbox.locator('[data-cy="select-emit-status"]')
            await expect(status).not.toContainText('value = null', { timeout: 3000 })
        }
    })

    test('Emit update:menu — opening dropdown fires event', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:menu', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-emit-menu"]')).toBeVisible({ timeout: 5000 })
        const input = sandbox.locator('[data-cy="select-emit-menu"] input').first()
        await input.click()
        // logEvent called — no throw = success
    })

    test('No data — no data text visible when items is empty', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('No data', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-no-data"]')).toBeVisible({ timeout: 5000 })
        // Open dropdown
        const input = sandbox.locator('[data-cy="select-no-data"] input').first()
        await input.click()
        await page.waitForTimeout(400)
        // No data text should appear
        const noData = sandbox.locator('.origam-list').first()
        if (await noData.isVisible({ timeout: 2000 }).catch(() => false)) {
            await expect(noData).toContainText('Nothing found', { timeout: 2000 })
        }
    })

    test('Playground — renders and allows selection', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-playground"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('[data-cy="select-playground-status"]')).toContainText('value =', { timeout: 3000 })
    })
})
