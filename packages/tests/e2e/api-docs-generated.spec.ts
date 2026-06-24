import { test, expect } from '@playwright/test'

/**
 * Verifies the API Reference detail pages render the generated `_DOC` data:
 * - one regenerated existing slug per domain
 * - one brand-new slug created by the generator (i-pagination-props, scroll-to,
 *   predefined-density)
 * Asserts NO "Documentation coming soon" and that the structural block
 * (definition / signature) is present.
 */

const CASES: { path: string; title: string; expectText: string }[] = [
    { path: '/enums/audio-variant', title: 'AUDIO_VARIANT', expectText: 'export enum AUDIO_VARIANT' },
    { path: '/interfaces/i-active-props', title: 'IActiveProps', expectText: 'export interface IActiveProps' },
    { path: '/consts/audio-defaults', title: 'AUDIO_DEFAULTS', expectText: 'export const AUDIO_DEFAULTS' },
    { path: '/utils/add-days', title: 'addDays', expectText: 'function addDays' },
    // brand-new, generated this run:
    { path: '/interfaces/i-pagination-props', title: 'IPaginationProps', expectText: 'export interface IPaginationProps' },
    { path: '/utils/scroll-to', title: 'scrollTo', expectText: 'function scrollTo' },
    { path: '/consts/predefined-density', title: 'PREDEFINED_DENSITY', expectText: 'export const PREDEFINED_DENSITY' },
]

for (const c of CASES) {
    test(`renders ${c.path}`, async ({ page }) => {
        await page.goto(c.path, { waitUntil: 'networkidle' })
        await expect(page.locator('h1').first()).toContainText(c.title)
        await expect(page.getByText('Documentation coming soon')).toHaveCount(0)
        await expect(page.locator('body')).toContainText(c.expectText)
        const slug = c.path.split('/').pop()
        await page.screenshot({ path: `e2e/.results-marketing/api-${slug}.png`, fullPage: false })
    })
}

test('audio-variant definition keeps member @deprecated JSDoc', async ({ page }) => {
    await page.goto('/enums/audio-variant', { waitUntil: 'networkidle' })
    const def = page.locator('[data-cy="enum-definition-code"]')
    await expect(def).toContainText('@deprecated')
    await expect(def).toContainText('Use `EXPANDED`')
    await page.screenshot({ path: 'e2e/.results-marketing/api-audio-variant-deprecated.png', fullPage: false })
})
