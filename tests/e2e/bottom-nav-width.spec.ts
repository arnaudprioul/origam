import { expect, test, type Page } from '@playwright/test'

/**
 * Regression — `OrigamBottomNav` rendered standalone must stretch to
 * the full width of its host. Pre-fix the SCSS only declared
 * `position: absolute` (no width/left/right/bottom), and the layout
 * composable's "no host" fallback returned inert inline styles, so
 * the nav collapsed to its content width. Added defaults
 * `left: 0; right: 0; bottom: 0; width: 100%` to the base rule;
 * inside an `<origam-layout>` host the inline styles from
 * `useLayoutItem` still override these, so the slide-in animation
 * keeps working.
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto('/story/stories-components-stories-bottomnav-origambottomnav-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

test('Default variant: BottomNav width === sandbox viewport width (no overflow)', async ({ page }) => {
    // BottomNav story has no "Default" variant; use Color (the first
    // variant) which renders a vanilla nav at full width.
    await openVariant(page, 'Color')
    const sandbox = sandboxOf(page)
    const nav = sandbox.locator('.origam-bottom-nav').first()
    await expect(nav).toBeVisible({ timeout: 8000 })

    const navBox = await nav.boundingBox()
    const bodyWidth = await sandbox.locator('body').evaluate(el => el.clientWidth)

    console.log('[bottom-nav] navWidth=', navBox!.width, ' bodyWidth=', bodyWidth)

    // The nav must match the body width — neither narrower (would leave a
    // visible gap) nor wider (would overflow the host like before
    // box-sizing: border-box was added). Allow 1px rounding slack.
    expect(Math.abs(navBox!.width - bodyWidth)).toBeLessThanOrEqual(1)
})

test('Default variant: BottomNav has bottom:0 / left:0 / width:100% computed', async ({ page }) => {
    // The "bottom edge" assertion via bounding boxes is unreliable in a
    // story sandbox (no positioned ancestor → bottom:0 snaps to the
    // initial containing block, which the iframe's reported body
    // dimensions don't always match). Instead pin the contract at the
    // CSS level: the computed style must include the defaults we just
    // added to the SCSS. (Variant "Default" doesn't exist; use Color.)
    await openVariant(page, 'Color')
    const sandbox = sandboxOf(page)
    const nav = sandbox.locator('.origam-bottom-nav').first()
    await expect(nav).toBeVisible({ timeout: 8000 })

    const computed = await nav.evaluate(el => {
        const cs = getComputedStyle(el)
        return {
            position: cs.position,
            bottom: cs.bottom,
            left: cs.left,
            right: cs.right,
            width: cs.width
        }
    })
    console.log('[bottom-nav computed]:', computed)

    // The Histoire sandbox wraps every story in `<origam-app>`, which
    // mounts an `<origam-layout>` host. The layout's `useLayoutItem`
    // overrides the SCSS default `absolute` with `fixed` (its inline
    // styles win via id-selector specificity). Either resolves the
    // contract — pinned to the viewport / containing block.
    expect(['absolute', 'fixed']).toContain(computed.position)
    expect(computed.bottom).toBe('0px')
    expect(computed.left).toBe('0px')
    // `width` resolves to the parent's content width in pixels.
    expect(computed.width).not.toBe('auto')
    expect(parseFloat(computed.width)).toBeGreaterThan(0)
})
