import { expect, test, type Page } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-expansionpanel-origamexpansionpanel-story-vue'

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

test.describe('OrigamExpansionPanel', () => {
    test('Color — panel renders with color intent', async ({ page }) => {
        await openVariant(page, 'Color')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="ep-color"]')).toBeVisible({ timeout: 5000 })
    })

    test('Density — panel renders with density class', async ({ page }) => {
        await openVariant(page, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="ep-density"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled panel renders', async ({ page }) => {
        await openVariant(page, 'States')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="ep-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Playground — panel renders with all controls', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="ep-playground"]')).toBeVisible({ timeout: 5000 })
    })

    test.describe('Loading shapes', () => {
        async function goToVariant(page: Page) {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Loading shapes', { exact: true }).first().click()
            await page.waitForTimeout(800)
        }

        test('loading=true → default kind (line) progress bar rendered', async ({ page }) => {
            await goToVariant(page)
            const sandbox = sandboxOf(page)
            const panel = sandbox.locator('[data-cy="ep-loading-bool"]')
            await expect(panel).toBeVisible({ timeout: 5000 })
            // ExpansionPanel default kind is 'line' → linear progress in panel header area
            await expect(panel.locator('.origam-expansion-panel__progress--linear')).toBeVisible({ timeout: 3000 })
        })

        test('loading=42 → determinate progress at 42 %', async ({ page }) => {
            await goToVariant(page)
            const sandbox = sandboxOf(page)
            const panel = sandbox.locator('[data-cy="ep-loading-number"]')
            await expect(panel).toBeVisible({ timeout: 5000 })
            const progressBar = panel.locator('[role="progressbar"]').first()
            await expect(progressBar).toBeVisible({ timeout: 3000 })
            const valueNow = await progressBar.getAttribute('aria-valuenow')
            expect(valueNow).toBe('42')
        })

        test('loading={ type: "line" } → linear progress mounted in panel', async ({ page }) => {
            await goToVariant(page)
            const sandbox = sandboxOf(page)
            const panel = sandbox.locator('[data-cy="ep-loading-line"]')
            await expect(panel).toBeVisible({ timeout: 5000 })
            await expect(panel.locator('.origam-expansion-panel__progress--linear')).toBeVisible({ timeout: 3000 })
        })

        test('loading={ type: "circular" } → circular progress mounted (no linear class)', async ({ page }) => {
            await goToVariant(page)
            const sandbox = sandboxOf(page)
            const panel = sandbox.locator('[data-cy="ep-loading-circular"]')
            await expect(panel).toBeVisible({ timeout: 5000 })
            await expect(panel.locator('[role="progressbar"]').first()).toBeVisible({ timeout: 3000 })
            // Circular: the linear-specific class must NOT be present
            await expect(panel.locator('.origam-expansion-panel__progress--linear')).not.toBeVisible()
        })

        test('loading={ type: "skeleton" } → skeleton lines replace body content', async ({ page }) => {
            await goToVariant(page)
            const sandbox = sandboxOf(page)
            const panel = sandbox.locator('[data-cy="ep-loading-skeleton"]')
            await expect(panel).toBeVisible({ timeout: 5000 })
            // 3 skeleton lines are rendered in the content area
            const skeletons = panel.locator('.origam-skeleton')
            await expect(skeletons.first()).toBeVisible({ timeout: 3000 })
            const count = await skeletons.count()
            expect(count).toBeGreaterThanOrEqual(3)
            // The real body text must not be visible
            await expect(panel.locator('.origam-expansion-panel-content__wrapper').getByText('Loading panel content here.')).not.toBeVisible()
        })
    })
})
