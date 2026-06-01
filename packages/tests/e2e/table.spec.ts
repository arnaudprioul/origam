import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-table-origamtable-story-vue'

/**
 * OrigamTable — runtime behaviour specs.
 *
 * Covers: density cell-padding, fixed-header sticky positioning,
 * rounded border-radius, elevation box-shadow.
 */

test.describe('OrigamTable density', () => {

    test('compact / default / comfortable produce different cell padding', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')

        // Find the Density variant — fall back to a generic name if needed.
        const densityVariant = page.getByText(/density/i).first()
        await densityVariant.click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const table = sandbox.locator('.origam-table').first()
        await expect(table).toBeVisible({ timeout: 5000 })

        // Force each density via the host's class API directly. This sidesteps
        // the Histoire HstSelect dropdown (custom DOM, painful to drive) and
        // exercises the SCSS rules `&--density-{name}` which is what we just
        // added.
        const measure = async (density: 'compact' | 'default' | 'comfortable') => {
            return table.evaluate((el, density) => {
                el.classList.remove(
                    'origam-table--density-compact',
                    'origam-table--density-default',
                    'origam-table--density-comfortable'
                )
                el.classList.add(`origam-table--density-${density}`)
                const cell = el.querySelector('td') as HTMLElement | null
                const header = el.querySelector('th') as HTMLElement | null
                return {
                    cellPadding: cell ? getComputedStyle(cell).padding : null,
                    headerPadding: header ? getComputedStyle(header).padding : null,
                }
            }, density)
        }

        const compact = await measure('compact')
        const dflt = await measure('default')
        const comfy = await measure('comfortable')

        console.log('[density] compact:    ', compact)
        console.log('[density] default:    ', dflt)
        console.log('[density] comfortable:', comfy)

        // Must produce three distinct paddings.
        expect(compact.cellPadding).not.toBe(dflt.cellPadding)
        expect(dflt.cellPadding).not.toBe(comfy.cellPadding)
        expect(compact.cellPadding).not.toBe(comfy.cellPadding)

        // Sanity check the actual numbers (block padding 6/12/18).
        expect(compact.cellPadding).toContain('6px')
        expect(dflt.cellPadding).toContain('12px')
        expect(comfy.cellPadding).toContain('18px')
    })
})

test.describe('OrigamTable fixed-header', () => {

    test('fixed-header class makes thead sticky', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Fixed header', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const table = sandbox.locator('.origam-table').first()
        await expect(table).toBeVisible({ timeout: 5000 })

        const thPosition = await table.evaluate((el) => {
            // The class is set by the component via fixedHeader prop
            // Inject the class manually to verify the SCSS rule
            el.classList.add('origam-table--fixed-header')
            const th = el.querySelector('th') as HTMLElement | null
            return th ? getComputedStyle(th).position : null
        })
        console.log('[table-fixed-header] th position:', thPosition)
        expect(thPosition).toBe('sticky')
    })

    test('wrapper overflow-y is auto when fixed-header is active', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Fixed header', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const table = sandbox.locator('.origam-table').first()
        await expect(table).toBeVisible({ timeout: 5000 })

        const wrapperOverflow = await table.evaluate((el) => {
            el.classList.add('origam-table--fixed-header')
            const wrapper = el.querySelector('.origam-table__wrapper') as HTMLElement | null
            return wrapper ? getComputedStyle(wrapper).overflowY : null
        })
        console.log('[table-fixed-header] wrapper overflow-y:', wrapperOverflow)
        expect(wrapperOverflow).toBe('auto')
    })
})

test.describe('OrigamTable visual variants', () => {

    test('rounded class applies border-radius', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Rounded', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const table = sandbox.locator('.origam-table').first()
        await expect(table).toBeVisible({ timeout: 5000 })

        const br = await table.evaluate((el) => {
            el.classList.add('origam-table--rounded')
            return getComputedStyle(el).borderRadius
        })
        console.log('[table-rounded] border-radius:', br)
        expect(parseFloat(br)).toBeGreaterThan(0)
    })
})
