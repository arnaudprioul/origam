import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-counter-origamcounter-story-vue'

const EXPECTED_INTENT_FG: Record<string, string> = {
    // Counter applies `color` (foreground) — `useTextColor` maps
    // intents to the `fgSubtle` rung (darker shade for "coloured text
    // on a light surface"). Values come from the generated tokens at
    // `src/assets/css/tokens/light.css`.
    primary: 'rgb(109, 40, 217)',  // #6d28d9 = action.primary.fgSubtle
    success: 'rgb(22, 163, 74)',   // #16a34a = feedback.success.fgSubtle
    warning: 'rgb(180, 83, 9)',    // #b45309 = feedback.warning.fgSubtle
    danger:  'rgb(185, 28, 28)'    // #b91c1c = feedback.danger.fgSubtle
}

test.describe('OrigamCounter', () => {
    test('Color showcase — color prop tints the counter root', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).last().click({ timeout: 5000 })
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        for (const [intent, expected] of Object.entries(EXPECTED_INTENT_FG)) {
            const c = sandbox.locator(`[data-cy="counter-color-${intent}"]`)
            await expect(c).toBeVisible({ timeout: 5000 })
            const color = await c.evaluate(el => getComputedStyle(el).color)
            expect(color, `counter-color-${intent}`).toBe(expected)
        }
    })

    test('Value & max — renders formatted value/max text', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Value & max', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const counter = sandbox.locator('[data-cy="counter-value"]')
        await expect(counter).toBeVisible({ timeout: 5000 })
        await expect(counter).toContainText('42', { timeout: 3000 })
        await expect(counter).toContainText('100', { timeout: 3000 })
    })

    test('Active — counter changes visual state when active', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Active', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const counter = sandbox.locator('[data-cy="counter-active"]')
        await expect(counter).toBeVisible({ timeout: 5000 })
    })

    test('Disabled — counter renders disabled', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Disabled', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="counter-disabled"]')).toBeVisible({ timeout: 5000 })
    })

    test('Overflow — counter shows value > max without throwing', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Overflow (value > max)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const counter = sandbox.locator('[data-cy="counter-overflow"]')
        await expect(counter).toBeVisible({ timeout: 5000 })
        await expect(counter).toContainText('150', { timeout: 3000 })
    })

    test('Playground — renders with all controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="counter-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
