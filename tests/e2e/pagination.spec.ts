import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-pagination-origampagination-story-vue'

test.describe('OrigamPagination', () => {
    test('Basic variant — pagination nav is rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('Basic variant — page buttons are rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Basic', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const nav = sandbox.locator('[role="navigation"]').first()
        await expect(nav).toBeVisible({ timeout: 5000 })
        const buttons = nav.getByRole('button')
        await expect(buttons.first()).toBeVisible({ timeout: 5000 })
    })

    test('Length and total visible variant — ellipsis is used for large lengths', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Length and total visible', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('First / last page buttons variant — first/last buttons are present', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('First / last page buttons', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-pagination__first').first()).toBeAttached({ timeout: 5000 })
    })

    test('Color variant — pagination renders with color intent', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('Disabled variant — pagination buttons are disabled', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Disabled', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const nav = sandbox.locator('[role="navigation"]').first()
        await expect(nav).toBeVisible({ timeout: 5000 })
    })

    test('Slot — item renders custom page buttons', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — item', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders pagination', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — pagination renders with all controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[role="navigation"]').first()).toBeVisible({ timeout: 5000 })
    })

    // ════ COMPACT variant ════

    test('Compact — renders an <input type="number"> element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('[data-cy="pagination-compact-input"]')
        await expect(input).toBeVisible({ timeout: 5000 })
        await expect(input).toHaveAttribute('type', 'number')
    })

    test('Compact — does NOT render page-number buttons', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        // No page-number items (buttons with aria-label "Go to page N")
        const pageItems = sandbox.locator('.origam-pagination__item')
        await expect(pageItems).toHaveCount(0, { timeout: 5000 })
    })

    test('Compact — typing a valid page and pressing Enter updates the value', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('[data-cy="pagination-compact-input"]')
        await input.fill('5')
        await input.press('Enter')
        await expect(input).toHaveValue('5', { timeout: 3000 })
    })

    test('Compact — typing a value above length clamps to length', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('[data-cy="pagination-compact-input"]')
        await input.fill('99')
        await input.press('Enter')
        // length=12, so should clamp to 12
        await expect(input).toHaveValue('12', { timeout: 3000 })
    })

    test('Compact + showFirstLastPage — all four chevrons are rendered', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Compact + showFirstLastPage', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-pagination__first').first()).toBeAttached({ timeout: 5000 })
        await expect(sandbox.locator('.origam-pagination__last').first()).toBeAttached({ timeout: 5000 })
        await expect(sandbox.locator('.origam-pagination__prev').first()).toBeAttached({ timeout: 5000 })
        await expect(sandbox.locator('.origam-pagination__next').first()).toBeAttached({ timeout: 5000 })
    })
})
