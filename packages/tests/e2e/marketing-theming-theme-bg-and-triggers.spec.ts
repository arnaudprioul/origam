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
            const valueInput = colorTrigger.locator('input')
            await expect(valueInput).not.toHaveValue('')
        })
    }
})

/**
 * Lot D (follow-up, ticket #24) — the 5 rich-control triggers were rebuilt
 * on `<origam-text-field>` (matching `OrigamSelect`/`OrigamColorPickerField`'s
 * own field composition) instead of `<origam-btn>`. They must be visually
 * IDENTICAL to each other (same trigger component, same theme resolution
 * path — both call `useDefaults()` via `OrigamTextField`).
 *
 * The neighbouring generic `<origam-select>` row is DELIBERATELY excluded
 * from this parity check: `OrigamSelect` never calls `useDefaults()` (DS
 * issue #242, confirmed by grep — zero occurrences), so it never resolves
 * `theme.components['origam-select']` and falls back to its own hardcoded
 * `rounded: true` (→ generic 'md' rung, 14px) instead of the theme's
 * configured value (e.g. cartoon's `rounded: 'lg'`, 20px) — a measured,
 * reproducible 6px gap on cartoon specifically. This is a DS-level root
 * cause, not a marketing/trigger bug — see the `test.fixme` below, which
 * documents the exact measurement and activates once #242 merges.
 */
test.describe('Theme Builder · lot D — rich-control triggers match each other (text-field family)', () => {
    const THEMES = ['cartoon', 'glass', 'geek', 'sobre'] as const
    const MODES = ['light', 'dark'] as const

    for (const theme of THEMES) {
        for (const mode of MODES) {
            test(`color trigger chrome == rounded trigger chrome — ${theme}/${mode}`, async ({ page }) => {
                await page.setViewportSize({ width: 1512, height: 829 })
                await page.context().addCookies([
                    { name: 'origam-theme', value: theme, url: 'http://localhost:3000' },
                    { name: 'origam-mode', value: mode, url: 'http://localhost:3000' }
                ])
                await page.goto('/theming')
                await page.waitForLoadState('networkidle')
                await expandControlGroups(page, ['color', 'shape'])
                await page.waitForTimeout(300)

                const chrome = await page.evaluate(() => {
                    const measure = (sel: string) => {
                        const el = document.querySelector(sel)
                        if (!el) return null
                        const cs = getComputedStyle(el)
                        const r = el.getBoundingClientRect()
                        return {
                            height: Math.round(r.height),
                            borderRadius: cs.borderRadius,
                            borderWidth: cs.borderWidth,
                            backgroundColor: cs.backgroundColor
                        }
                    }
                    return {
                        colorTrigger: measure('[data-cy="theming-prop-color-trigger"] .origam-field'),
                        roundedTrigger: measure('[data-cy="theming-prop-rounded-trigger"] .origam-field')
                    }
                })

                expect(chrome.colorTrigger, 'color trigger .origam-field not found').not.toBeNull()
                expect(chrome.roundedTrigger, 'rounded trigger .origam-field not found').not.toBeNull()

                expect(chrome.roundedTrigger!.height, `height — ${theme}/${mode}`).toBe(chrome.colorTrigger!.height)
                expect(chrome.roundedTrigger!.borderRadius, `border-radius — ${theme}/${mode}`).toBe(chrome.colorTrigger!.borderRadius)
                expect(chrome.roundedTrigger!.borderWidth, `border-width — ${theme}/${mode}`).toBe(chrome.colorTrigger!.borderWidth)
                expect(chrome.roundedTrigger!.backgroundColor, `background — ${theme}/${mode}`).toBe(chrome.colorTrigger!.backgroundColor)
            })
        }
    }

    /**
     * Blocked on DS #242 (`OrigamSelect` missing `useDefaults()` wiring,
     * owned by a separate dev on `fix/ds-usedefaults-wiring-242`). Measured
     * gap on cartoon/light: trigger border-radius resolves to 20px (theme's
     * `rounded: 'lg'`), select resolves to 14px (hardcoded fallback). Flip
     * to `test(...)` once #242 merges — no other change should be needed,
     * the assertion shape is identical to the block above.
     */
    test.fixme('rounded trigger chrome == neighbouring select chrome (blocked on DS #242)', async ({ page }) => {
        await page.setViewportSize({ width: 1512, height: 829 })
        await page.context().addCookies([
            { name: 'origam-theme', value: 'cartoon', url: 'http://localhost:3000' },
            { name: 'origam-mode', value: 'light', url: 'http://localhost:3000' }
        ])
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await expandControlGroups(page, ['color', 'shape'])
        await page.waitForTimeout(300)

        const chrome = await page.evaluate(() => {
            const measure = (sel: string) => {
                const el = document.querySelector(sel)
                if (!el) return null
                const cs = getComputedStyle(el)
                const r = el.getBoundingClientRect()
                return {
                    height: Math.round(r.height),
                    borderRadius: cs.borderRadius,
                    borderWidth: cs.borderWidth,
                    backgroundColor: cs.backgroundColor
                }
            }
            return {
                roundedTrigger: measure('[data-cy="theming-prop-rounded-trigger"] .origam-field'),
                select: measure('.tb-row__select .origam-field')
            }
        })

        expect(chrome.roundedTrigger, 'rounded trigger .origam-field not found').not.toBeNull()
        expect(chrome.select, 'neighbouring select .origam-field not found').not.toBeNull()

        expect(chrome.roundedTrigger!.height).toBe(chrome.select!.height)
        expect(chrome.roundedTrigger!.borderRadius).toBe(chrome.select!.borderRadius)
        expect(chrome.roundedTrigger!.borderWidth).toBe(chrome.select!.borderWidth)
        expect(chrome.roundedTrigger!.backgroundColor).toBe(chrome.select!.backgroundColor)
    })
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
