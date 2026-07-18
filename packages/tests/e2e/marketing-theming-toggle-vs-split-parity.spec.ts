/**
 * Toggle vs Split chrome parity — Theme Builder (/theming).
 *
 * Acceptance criterion (team-lead, post-rejection of the first BtnGroup/
 * BtnToggle fix): the Light|Dark mode toggle's root chrome must be
 * COMPUTED-STYLE IDENTICAL to the neighbouring "Split" button — a real
 * `origam-btn` themed by the SAME brand — for border-width, border-color,
 * background-color, box-shadow and border-radius. Only total width and the
 * internal segment separators are allowed to differ.
 *
 * Runs across the 8 brand-theme chips exposed by the nav's "Switch brand
 * theme" menu × light/dark = 16 combos.
 *
 * Prérequis : serveur marketing opérationnel (port 3000 ou MARKETING_BASE_URL).
 * Run : npx playwright test --config=playwright.marketing.config.ts \
 *         marketing-theming-toggle-vs-split-parity
 */

import { expect, test } from '@playwright/test'

// The 8 chips actually exposed by the nav's "Switch brand theme" menu.
// NOTE: the "Sobre" chip sets data-theme="sobre", which has no matching
// registered theme (packages/marketing/src/themes/origam.theme.ts registers
// itself as 'origam', not 'sobre') — a pre-existing, out-of-scope naming
// mismatch. Harmless here: an unmatched data-theme falls through to the
// theme-agnostic :root defaults, so group and split still resolve the same
// (unthemed) tokens and stay in sync.
const THEMES = ['sobre', 'glass', 'geek', 'cartoon', 'editorial', 'material', 'ecom', 'apple']
const MODES = ['light', 'dark'] as const

// .origam-btn transitions box-shadow/background/transform over 0.28s (see
// OrigamBtn.vue's base rule) — settle fully before measuring, or
// getComputedStyle() catches a mid-transition interpolated value and the
// two elements report spuriously different box-shadow strings.
const TRANSITION_SETTLE_MS = 500

interface IChromeSnapshot {
    borderWidth: string
    borderColor: string
    backgroundColor: string
    boxShadow: string
    borderRadius: string
}

async function switchTheme (page: import('@playwright/test').Page, theme: string, mode: typeof MODES[number]) {
    await page.locator('[aria-label="Switch brand theme"]').first().click()
    await page.waitForTimeout(150)
    await page.locator(`[data-cy="theme-menu-${theme}"]`).first().click()
    await page.waitForTimeout(TRANSITION_SETTLE_MS)

    const currentMode = await page.evaluate(() => document.documentElement.getAttribute('data-mode'))
    if (currentMode !== mode) {
        await page.locator('[aria-label="Toggle light and dark mode"]').first().click()
        await page.waitForTimeout(TRANSITION_SETTLE_MS)
    }
}

test.describe('Theme Builder — mode toggle chrome matches Split button', () => {
    for (const theme of THEMES) {
        for (const mode of MODES) {
            test(`${theme}/${mode}: toggle root computed style equals Split root`, async ({ page }) => {
                await page.goto('/theming', { waitUntil: 'networkidle' })
                await switchTheme(page, theme, mode)

                const htmlAttrs = await page.evaluate(() => ({
                    theme: document.documentElement.getAttribute('data-theme'),
                    mode: document.documentElement.getAttribute('data-mode')
                }))
                expect(htmlAttrs.theme).toBe(theme)
                expect(htmlAttrs.mode).toBe(mode)

                const toggle = page.locator('[data-cy="theming-mode-toggle"]').first()
                const split = page.locator('[data-cy="theming-split-btn"]').first()
                await expect(toggle).toBeVisible()
                await expect(split).toBeVisible()

                const snapshot = await page.evaluate(() => {
                    const groupEl = document.querySelector('[data-cy="theming-mode-toggle"]') as HTMLElement
                    const splitEl = document.querySelector('[data-cy="theming-split-btn"]') as HTMLElement
                    const cs = (el: HTMLElement) => {
                        const s = getComputedStyle(el)
                        return {
                            borderWidth: s.borderWidth,
                            borderColor: s.borderColor,
                            backgroundColor: s.backgroundColor,
                            boxShadow: s.boxShadow,
                            borderRadius: s.borderRadius
                        }
                    }
                    return { group: cs(groupEl), split: cs(splitEl) }
                }) as { group: IChromeSnapshot, split: IChromeSnapshot }

                expect(snapshot.group.borderWidth, 'border-width').toBe(snapshot.split.borderWidth)
                expect(snapshot.group.borderColor, 'border-color').toBe(snapshot.split.borderColor)
                expect(snapshot.group.backgroundColor, 'background-color').toBe(snapshot.split.backgroundColor)
                expect(snapshot.group.boxShadow, 'box-shadow').toBe(snapshot.split.boxShadow)
                expect(snapshot.group.borderRadius, 'border-radius').toBe(snapshot.split.borderRadius)
            })
        }
    }
})
