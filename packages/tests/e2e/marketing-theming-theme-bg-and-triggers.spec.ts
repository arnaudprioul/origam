/**
 * Theme Builder (/theming) — themed background full-height, rich-control
 * trigger legibility, sticky preview (lot A/B/C, follow-up to #235).
 *
 * Once #235 removed the `.theming` viewport-height clamp, three problems
 * surfaced under brand themes with bold visual identities (cartoon: 3px
 * borders, chunky `rounded: lg` everywhere):
 *
 * A — the themed page background was painted by `body`, but body's own
 *     layout box stayed capped at `100vh` because an ANCESTOR
 *     (`.origam-layout--full-height .origam-layout__wrapper`, a DS class)
 *     was hard `height: 100vh` — not `min-height`. Content overflowing
 *     past that box still rendered (nothing clipped), but nothing painted
 *     a background under it, revealing the default marketing gradient.
 *     Fix: at the source, in the DS (PR #237) — OrigamLayout full-height
 *     is now `min-height: 100vh` ("at least one screen", a floor, not a
 *     ceiling). No marketing-side override.
 *
 * B — the 5 rich-control triggers (Color/Rounded/Elevation/Border/Box
 *     model, `ThemeBuilderControlTrigger.vue`) rendered as `<origam-btn
 *     size="x-small">` — a hard 20px DS height. Under cartoon's 3px
 *     border + the trigger's own 11px font/1.5 line-height, the content
 *     box was ~12px tall: too short, so label text visually overflowed/
 *     clipped. The neighbouring plain `<origam-select>` rows don't pin a
 *     `size`, so they absorb the thicker border gracefully. Fix: trigger
 *     now uses `size="small"` (28px), matching the select rows' height.
 *
 * C — user request: once the page scrolls as a whole, the center preview
 *     column should stay visible while scrolling through the (often much
 *     taller) nav/props columns, instead of scrolling out of view. Fix:
 *     `.theming__col--center` is `position: sticky` (offset = app-bar
 *     height) with a `max-height` + `overflow-y: auto` safety valve for
 *     the (rare) case where the preview itself exceeds viewport height —
 *     CSS-only, no JS, and no clamp on naturally-short previews (sticky
 *     only pins position, it never forces height).
 *
 * Prérequis : serveur marketing :3000 + base docs seedée.
 * Run : cd packages/tests && node_modules/.bin/playwright test \
 *         --config=playwright.marketing.config.ts marketing-theming-theme-bg-and-triggers
 */

import { expect, test, type Page } from '@playwright/test'

const BRAND_THEMES = ['cartoon', 'glass', 'geek', 'sobre'] as const

async function applyBrand (page: Page, theme: string): Promise<void> {
    await page.context().addCookies([
        { name: 'origam-theme', value: theme, url: 'http://localhost:3000' },
        { name: 'origam-mode', value: 'light', url: 'http://localhost:3000' }
    ])
}

async function expandControlGroups (page: Page, ids: string[]): Promise<void> {
    for (const id of ids) {
        const group = page.locator(`[data-cy="theming-prop-group-${id}"]`)
        if (await group.count() === 0) continue
        const isOpen = await group.evaluate(el => el.hasAttribute('open'))
        if (!isOpen) await group.locator('summary').first().click({ timeout: 3000 }).catch(() => {})
    }
}

test.describe('Theme Builder · lot A — themed background covers the full page height', () => {
    for (const theme of BRAND_THEMES) {
        test(`body's background box matches its scrollHeight under ${theme} at 1512x829`, async ({ page }) => {
            await page.setViewportSize({ width: 1512, height: 829 })
            await applyBrand(page, theme)
            await page.goto('/theming')
            await page.waitForLoadState('networkidle')
            await page.waitForTimeout(400)

            const metrics = await page.evaluate(() => {
                const body = document.body
                const rect = body.getBoundingClientRect()
                return { boxHeight: Math.round(rect.height), scrollHeight: body.scrollHeight }
            })

            expect(
                metrics.boxHeight,
                `body must grow to its full content height under ${theme} — ` +
                `boxHeight=${metrics.boxHeight} vs scrollHeight=${metrics.scrollHeight} ` +
                '(a shorter box means the themed background stops short and the default gradient shows through)'
            ).toBeGreaterThanOrEqual(metrics.scrollHeight - 2)
        })

        test(`.origam-layout__wrapper is not clamped to the viewport height under ${theme}`, async ({ page }) => {
            await page.setViewportSize({ width: 1512, height: 829 })
            await applyBrand(page, theme)
            await page.goto('/theming')
            await page.waitForLoadState('networkidle')
            await page.waitForTimeout(400)

            const wrapper = page.locator('.origam-layout__wrapper')
            const metrics = await wrapper.evaluate(el => ({
                height: Math.round(el.getBoundingClientRect().height),
                scrollHeight: el.scrollHeight
            }))

            expect(
                metrics.height,
                `.origam-layout--full-height wrapper must grow with its content under ${theme}, not stay ` +
                `clamped to the viewport (height=${metrics.height} vs scrollHeight=${metrics.scrollHeight})`
            ).toBeGreaterThanOrEqual(metrics.scrollHeight - 2)
        })
    }
})

test.describe('Theme Builder · lot B — rich-control triggers match the select rows', () => {
    for (const theme of ['cartoon', 'sobre'] as const) {
        test(`trigger height is within select-row range and text is not clipped — ${theme}`, async ({ page }) => {
            await page.setViewportSize({ width: 1512, height: 829 })
            await applyBrand(page, theme)
            await page.goto('/theming')
            await page.waitForLoadState('networkidle')
            await expandControlGroups(page, ['color', 'size-density'])
            await page.waitForTimeout(300)

            const metrics = await page.evaluate(() => {
                const trigger = document.querySelector('[data-cy="theming-prop-color-trigger"]')
                const select = document.querySelector('.tb-row__select')
                if (!trigger || !select) return null
                const tr = trigger.getBoundingClientRect()
                const sr = select.getBoundingClientRect()
                return { triggerHeight: Math.round(tr.height), selectHeight: Math.round(sr.height) }
            })

            expect(metrics).not.toBeNull()
            expect(
                Math.abs(metrics!.triggerHeight - metrics!.selectHeight),
                `trigger (${metrics!.triggerHeight}px) must be visually consistent with the select row ` +
                `(${metrics!.selectHeight}px) under ${theme}`
            ).toBeLessThanOrEqual(10)

            const colorTrigger = page.locator('[data-cy="theming-prop-color-trigger"]')
            await expect(colorTrigger).toBeVisible()
            const valueText = colorTrigger.locator('.tbc-trigger__value')
            await expect(valueText).toHaveText(/\S/)
        })
    }
})

test.describe('Theme Builder · lot C — preview stays visible while scrolling the controls', () => {
    test('preview column is still in the viewport after scrolling deep into the props panel', async ({ page }) => {
        await page.setViewportSize({ width: 1512, height: 829 })
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await expandControlGroups(page, [
            'color', 'size-density', 'shape', 'border', 'elevation',
            'dimensions', 'states', 'icons', 'link-tag', 'other'
        ])
        await page.waitForTimeout(300)

        const bodyBottom = await page.evaluate(() => {
            const body = document.querySelector('.theming__body')
            return body ? body.getBoundingClientRect().bottom + window.scrollY : 0
        })
        expect(bodyBottom).toBeGreaterThan(0)

        await page.evaluate((y) => window.scrollTo(0, y - 850), bodyBottom)
        await page.waitForTimeout(400)

        const preview = page.locator('.theming__col--center')
        await expect(preview).toBeInViewport()

        const previewPosition = await preview.evaluate(el => getComputedStyle(el).position)
        expect(previewPosition).toBe('sticky')
    })

    test('sticky preview does not clamp naturally short content (no forced height at page load)', async ({ page }) => {
        await page.setViewportSize({ width: 1512, height: 829 })
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(400)

        const metrics = await page.evaluate(() => {
            const el = document.querySelector('.theming__col--center')
            if (!el) return null
            const cs = getComputedStyle(el)
            const r = el.getBoundingClientRect()
            return { height: Math.round(r.height), scrollHeight: el.scrollHeight, maxHeight: cs.maxHeight }
        })

        expect(metrics).not.toBeNull()
        expect(
            metrics!.height,
            'a naturally short preview must not be stretched/clamped to its max-height ceiling'
        ).toBeLessThan(600)
        expect(metrics!.height).toBeGreaterThanOrEqual(metrics!.scrollHeight - 2)
    })
})
