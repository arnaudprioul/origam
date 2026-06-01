import { expect, test, type Page } from '@playwright/test'

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const open = async (page: Page, variant: string) => {
    await page.goto('/story/components-stories-infinitescroll-origaminfinitescroll-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(1500)
}

const countItems = async (page: Page) => {
    const sandbox = sandboxOf(page)
    return await sandbox.locator('.origam-infinite-scroll > div').evaluateAll(els =>
        els.filter(e => /Item \d+/.test(e.textContent || '')).length
    )
}

/**
 * Pre-fix `hasEndIntersect` was `props.side === 'end' || 'both'` — the
 * raw string `'both'` made the OR always truthy, but separately the
 * empty/error slots gated on `hasStartIntersect` even on the END
 * side, masking the issue. The user reported the lazy load didn't
 * fire on scroll. Fixing the boolean expression restored the
 * intersect-driven load path.
 */

test('OrigamInfiniteScroll — scroll-to-bottom triggers load (intersect mode)', async ({ page }) => {
    test.setTimeout(60_000)
    await open(page, 'Basic — end side')
    const initial = await countItems(page)
    expect(initial).toBe(20)

    await sandboxOf(page).locator('.origam-infinite-scroll').first().evaluate(el => {
        (el as HTMLElement).scrollTo({ top: (el as HTMLElement).scrollHeight, behavior: 'instant' as any })
    })
    await page.waitForTimeout(2500)

    const after = await countItems(page)
    expect(after).toBeGreaterThan(initial)
})
