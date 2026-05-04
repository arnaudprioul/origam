import { expect, test, type Page } from '@playwright/test'

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const open = async (page: Page, slug: string, variant: string) => {
    await page.goto(`/story/${slug}`)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(900)
}

/**
 * Pre-fix `.origam-field__input` defaulted to `box-sizing: content-box`
 * so the inline padding (24px top + 6px bottom) stacked ON TOP of the
 * 56px min-height target, producing 86px-tall fields. Switching to
 * `border-box` brings the rendered height back to the Material 56px
 * baseline.
 */

test('OrigamTextField — field renders at 56px (not 86px)', async ({ page }) => {
    await open(page, 'stories-components-stories-textfield-origamtextfield-story-vue', 'Variant')
    const sandbox = sandboxOf(page)
    const field = sandbox.locator('.origam-field').first()
    await expect(field).toBeVisible({ timeout: 8000 })
    const h = await field.evaluate(el => Math.round(el.getBoundingClientRect().height))
    expect(h).toBe(56)

    const inputBoxSizing = await sandbox.locator('.origam-field__input').first().evaluate(el => getComputedStyle(el).boxSizing)
    expect(inputBoxSizing).toBe('border-box')
})
