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
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-data-table').first()).toBeVisible({ timeout: 5000 })
    })

    test.describe('Loading shapes', () => {
        async function goToVariant(page: Parameters<Parameters<typeof test>[1]>[0]) {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Loading shapes', { exact: true }).first().click()
            await page.waitForTimeout(800)
        }

        test('loading=true → default kind (line) progress bar rendered in header', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const table = sandbox.locator('[data-cy="data-table-loading-bool"]')
            await expect(table).toBeVisible({ timeout: 5000 })
            // Headers row is still visible
            await expect(table.locator('thead').first()).toBeVisible({ timeout: 3000 })
            // Loading row (non-skeleton) is rendered
            await expect(table.locator('.origam-data-table-rows--loading')).toBeVisible({ timeout: 3000 })
        })

        test('loading=42 → determinate progress at 42 %', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const table = sandbox.locator('[data-cy="data-table-loading-number"]')
            await expect(table).toBeVisible({ timeout: 5000 })
            await expect(table.locator('thead').first()).toBeVisible({ timeout: 3000 })
            const progressBar = table.locator('[role="progressbar"]').first()
            await expect(progressBar).toBeVisible({ timeout: 3000 })
            const valueNow = await progressBar.getAttribute('aria-valuenow')
            expect(valueNow).toBe('42')
        })

        test('loading={ type: "line" } → linear progress mounted', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const table = sandbox.locator('[data-cy="data-table-loading-line"]')
            await expect(table).toBeVisible({ timeout: 5000 })
            await expect(table.locator('thead').first()).toBeVisible({ timeout: 3000 })
            await expect(table.locator('[role="progressbar"]').first()).toBeVisible({ timeout: 3000 })
        })

        test('loading={ type: "circular" } → circular progress (no linear class)', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const table = sandbox.locator('[data-cy="data-table-loading-circular"]')
            await expect(table).toBeVisible({ timeout: 5000 })
            await expect(table.locator('thead').first()).toBeVisible({ timeout: 3000 })
            await expect(table.locator('[role="progressbar"]').first()).toBeVisible({ timeout: 3000 })
        })

        test('loading={ type: "skeleton" } → skeleton rows in body, headers remain, no loading-text row', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const table = sandbox.locator('[data-cy="data-table-loading-skeleton"]')
            await expect(table).toBeVisible({ timeout: 5000 })
            // Headers still rendered
            await expect(table.locator('thead').first()).toBeVisible({ timeout: 3000 })
            await expect(table.getByText('First name')).toBeVisible({ timeout: 3000 })
            // Skeleton rows present in body
            await expect(table.locator('.origam-data-table-rows--skeleton').first()).toBeVisible({ timeout: 3000 })
            const skeletonCells = table.locator('.origam-skeleton')
            const skeletonCount = await skeletonCells.count()
            expect(skeletonCount).toBeGreaterThan(0)
            // The "Loading items..." text row must NOT be present
            await expect(table.locator('.origam-data-table-rows--loading')).not.toBeVisible()
        })
    })
})
