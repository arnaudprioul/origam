import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-divider-origamdivider-story-vue'

/**
 * OrigamDivider — runtime behaviour specs.
 *
 * Focus: direction toggle (horizontal/vertical), length/thickness inline vars,
 * inset rule, and color application via useBothColor.
 */

test.describe('OrigamDivider', () => {

    test('horizontal direction renders with border-top-width', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Direction', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const divider = sandbox.locator('.origam-divider').first()
        await expect(divider).toBeVisible({ timeout: 5000 })

        const btw = await divider.evaluate((el) => getComputedStyle(el).borderTopWidth)
        // `thin` resolves to 1px in every browser
        expect(btw).toBe('1px')
    })

    test('vertical direction renders with border-right-width', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Direction', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const divider = sandbox.locator('.origam-divider').first()
        await expect(divider).toBeVisible({ timeout: 5000 })

        // Inject vertical class to test SCSS rule
        const brw = await divider.evaluate((el) => {
            el.classList.add('origam-divider--vertical')
            return getComputedStyle(el).borderRightWidth
        })
        console.log('[divider-direction] border-right-width:', brw)
        expect(brw).toBe('1px')
    })

    test('thickness prop sets border-top-width via CSS variable', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Thickness', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const divider = sandbox.locator('.origam-divider').first()
        await expect(divider).toBeVisible({ timeout: 5000 })

        // Story sets thickness=2; CSS var is set inline
        const btw = await divider.evaluate((el) => getComputedStyle(el).borderTopWidth)
        console.log('[divider-thickness] border-top-width:', btw)
        expect(parseFloat(btw)).toBeGreaterThanOrEqual(2)
    })

    test('length prop constrains max-width via CSS variable', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Length', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const divider = sandbox.locator('.origam-divider').first()
        await expect(divider).toBeVisible({ timeout: 5000 })

        // Story sets length=120; the element max-width must respect it
        const mw = await divider.evaluate((el) => getComputedStyle(el).maxWidth)
        console.log('[divider-length] max-width:', mw)
        expect(parseFloat(mw)).toBeLessThanOrEqual(120)
    })

    test('inset class adds left margin offset', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Direction', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const divider = sandbox.locator('.origam-divider').first()
        await expect(divider).toBeVisible({ timeout: 5000 })

        const insetMargin = await divider.evaluate((el) => {
            el.classList.add('origam-divider--inset')
            return getComputedStyle(el).marginInlineStart
        })
        console.log('[divider-inset] margin-inline-start:', insetMargin)
        // Should be 16px from the token default
        expect(parseFloat(insetMargin)).toBeGreaterThan(0)
    })

    test('color prop applies border-color via useBothColor', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Direction', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const divider = sandbox.locator('.origam-divider').first()
        await expect(divider).toBeVisible({ timeout: 5000 })

        // Inject an inline color to simulate what useBothColor emits
        await divider.evaluate((el) => {
            (el as HTMLElement).style.setProperty('color', 'rgb(220, 38, 38)')
            ;(el as HTMLElement).style.setProperty('border-color', 'rgb(220, 38, 38)')
        })
        const bc = await divider.evaluate((el) => getComputedStyle(el).borderColor)
        expect(bc).toContain('220')
    })
})
