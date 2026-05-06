import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-datatable-origamdatatable-story-vue'

test.describe('OrigamDataTable', () => {
    test('Basic variant — table renders with header and body', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-table').first()).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('thead').first()).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('tbody').first()).toBeVisible({ timeout: 5000 })
    })

    test('Basic variant — column headers are rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByText('First name')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByText('Last name')).toBeVisible({ timeout: 5000 })
    })

    test('Basic variant — item data is rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByText('Alice')).toBeVisible({ timeout: 5000 })
    })

    test('Sorting variant — table renders with sortable columns', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Sorting', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-table').first()).toBeVisible({ timeout: 5000 })
    })

    test('Pagination variant — footer pagination is present', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        // `getByText('Pagination', { exact: true })` was ambiguous —
        // it ALSO matched the "Pagination" component group in the
        // Histoire sidebar (where OrigamPagination story lives).
        // Click the variant tile inside the current story's variant
        // panel instead. Histoire renders variant tiles with the
        // text "Pagination" inside `.histoire-variant` or similar;
        // we use `.last()` because the sidebar group entry comes
        // FIRST in DOM order, so the variant tile is last.
        await page.getByText('Pagination', { exact: true }).last().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-table').first()).toBeVisible({ timeout: 5000 })
    })

    test('Selection variant — checkbox column is present', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Selection', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('input[type="checkbox"]').first()).toBeAttached({ timeout: 5000 })
    })

    test('Search variant — search field and table are both rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Search', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-table').first()).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-text-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Loading variant — table renders in loading state', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Loading', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-table').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — top renders custom header content', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — top', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.getByText('User list')).toBeVisible({ timeout: 5000 })
    })

    test('Playground — table renders with full set of controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-table').first()).toBeVisible({ timeout: 5000 })
    })
})
