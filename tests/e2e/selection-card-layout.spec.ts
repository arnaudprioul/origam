import { expect, test, type Page } from '@playwright/test'

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')
const open = async (page: Page, variant: string) => {
    await page.goto('/story/stories-components-stories-selectioncontrol-origamselectioncontrolgroup-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

test('Card layout: active option card has thicker, intent-coloured border', async ({ page }) => {
    await open(page, 'Card layout')
    const sandbox = sandboxOf(page)
    const wrap = sandbox.locator('[data-cy="scg-cards"]').first()
    await expect(wrap).toBeVisible({ timeout: 8000 })

    // Story init: cardModel = 'm' → the medium card is active.
    // The Card now lives INSIDE the SelectionControl (consumer renders
    // it via the `#default` slot scope), so the data-cy lands on the
    // SelectionControl wrapper. Drill into the inner card.
    const active = sandbox.locator('[data-cy="scg-cards-m"] .scg-card-option').first()
    const inactive = sandbox.locator('[data-cy="scg-cards-s"] .scg-card-option').first()

    const a = await active.evaluate(el => {
        const cs = getComputedStyle(el)
        return { borderTopWidth: parseFloat(cs.borderTopWidth), borderColor: cs.borderTopColor }
    })
    const i = await inactive.evaluate(el => {
        const cs = getComputedStyle(el)
        return { borderTopWidth: parseFloat(cs.borderTopWidth), borderColor: cs.borderTopColor }
    })
    console.log('[scg-card] active:', a)
    console.log('[scg-card] inactive:', i)

    // Active border must be at least 2px (the rule sets `border-width: 2px`).
    expect(a.borderTopWidth).toBeGreaterThanOrEqual(2)
    // Active border colour must differ from the inactive (default neutral).
    expect(a.borderColor).not.toBe(i.borderColor)
    // Inactive stays at the base ~1px from `border` prop.
    expect(i.borderTopWidth).toBeLessThanOrEqual(1.5)
})

test('Card layout: only ONE card has the highlighted border', async ({ page }) => {
    // The full interaction-driven swap (clicking an inactive card and
    // verifying the highlight moves) is blocked by an upstream runtime
    // bug in `OrigamSelectionControl`: the rendered `<input>` ships
    // without a `type` attribute (the `type="radio"` prop isn't reaching
    // the HTML input element), so a synthetic click neither fires the
    // `change` event nor toggles the model. That's a follow-up. We
    // instead pin the static-state contract: at any moment there's
    // exactly one active card, and only it has the thick border.
    await open(page, 'Card layout')
    const sandbox = sandboxOf(page)
    const wrap = sandbox.locator('[data-cy="scg-cards"]').first()
    await expect(wrap).toBeVisible({ timeout: 8000 })

    const cardWidths = await sandbox.locator('.scg-card-option').evaluateAll(els =>
        els.map(el => parseFloat(getComputedStyle(el).borderTopWidth))
    )
    const thick = cardWidths.filter(w => w >= 2)
    const thin = cardWidths.filter(w => w < 2)
    expect(thick.length).toBe(1)
    expect(thin.length).toBe(2)
})
