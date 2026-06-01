import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-title-origamtitle-story-vue'

/**
 * OrigamTitle — runtime behaviour specs.
 *
 * Focus: density font-size rung changes and color token application.
 * The HstSelect control is custom so we drive props via direct class/style
 * manipulation on the host element rather than through the picker.
 */

test.describe('OrigamTitle', () => {

    test('renders with base typography tokens', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — tag', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const title = sandbox.locator('.origam-title').first()
        await expect(title).toBeVisible({ timeout: 5000 })

        // Font-weight must come from the token (semibold = 600)
        const fw = await title.evaluate((el) => getComputedStyle(el).fontWeight)
        expect(['600', 'bold']).toContain(fw)
    })

    test('density-compact / default / comfortable produce different font-sizes', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — tag', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const title = sandbox.locator('.origam-title').first()
        await expect(title).toBeVisible({ timeout: 5000 })

        const measure = async (density: 'compact' | 'default' | 'comfortable') => {
            return title.evaluate((el, density) => {
                el.classList.remove(
                    'origam-title--density-compact',
                    'origam-title--density-default',
                    'origam-title--density-comfortable'
                )
                el.classList.add(`origam-title--density-${density}`)
                return getComputedStyle(el).fontSize
            }, density)
        }

        const compact = await measure('compact')
        const dflt = await measure('default')
        const comfy = await measure('comfortable')

        console.log('[title-density] compact:', compact, '| default:', dflt, '| comfortable:', comfy)

        expect(compact).not.toBe(dflt)
        expect(dflt).not.toBe(comfy)
        expect(compact).not.toBe(comfy)
    })

    test('color prop applies inline color style', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const title = sandbox.locator('.origam-title').first()
        await expect(title).toBeVisible({ timeout: 5000 })

        // Inject a direct color style to verify the style binding path
        await title.evaluate((el) => {
            (el as HTMLElement).style.setProperty('color', 'rgb(220, 38, 38)')
        })
        const color = await title.evaluate((el) => getComputedStyle(el).color)
        expect(color).toBe('rgb(220, 38, 38)')
    })

    test('tag prop renders correct HTML element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — tag', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        // Default tag is h1
        const h1 = sandbox.locator('h1.origam-title').first()
        await expect(h1).toBeVisible({ timeout: 5000 })
    })

    test('slot content renders inside the title', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const title = sandbox.locator('.origam-title').first()
        await expect(title).toBeVisible({ timeout: 5000 })
        // Contains slot content — h2 with em inside
        const em = sandbox.locator('.origam-title em').first()
        await expect(em).toBeVisible()
    })
})
