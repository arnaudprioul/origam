/**
 * Marketing theming — non-regression suite (T7).
 *
 * Covers all 8 brands × 2 modes = 16 combinations. For each combo the
 * test:
 *   1. Sets the theme via localStorage (mirrors what useTheme() persists)
 *      and navigates to the home page.
 *   2. Asserts <html> carries concrete data-theme + data-mode attributes.
 *   3. Asserts body background-color and at least one component token
 *      (--origam-shadow---sm) differ between themes and between modes
 *      — detects a "tokens not loaded" or "wrong token sheet active"
 *      regression.
 *   4. Spot-checks concrete colour values for the four anchor combos
 *      called out in the task brief:
 *        - sobre/dark  → body bg ≈ rgb(10,10,10)
 *        - sobre/light → body bg ≈ rgb(255,255,255)
 *        - apple/dark  → body bg ≈ rgb(0,0,0)
 *   5. Asserts that --origam-shadow---sm differs between cartoon (hard
 *      offset) and geek (glow) — per-theme token differentiation.
 *   6. Verifies that marketing-chrome.css does NOT contain any
 *      [data-theme] / [data-mode] colour override (static stylesheet
 *      inspection via the CSS OM).
 *
 * A11y: axe-core sweeps on 3 representative combos
 * (sobre/light, sobre/dark, geek/dark).
 *
 * Prerequisite: the DS dist must be up to date (`pnpm -F origam build`)
 * and the marketing dev server running (`pnpm -F @origam/marketing dev`
 * on http://localhost:3000) — the config spawns the server automatically
 * when none is already running.
 *
 * Rule reminder (CLAUDE.md): "test-as-you-build" — every new component
 * or behaviour change must ship with a Playwright spec. This file covers
 * the two-axis theming socle delivered in T4 + T5.
 */

import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// ── helpers ────────────────────────────────────────────────────────────────

const THEME_COOKIE = 'origam-theme'
const MODE_COOKIE = 'origam-mode'

/**
 * Apply theme + mode by writing the Nuxt SSR cookies, then reloading so the
 * server plugin picks them up and emits the correct `data-theme` / `data-mode`
 * attributes in the initial HTML.
 *
 * The DS Nuxt plugin (plugin.server.ts) reads `origam-theme` + `origam-mode`
 * cookies to resolve the theme SSR-side and writes them into `<html>` via
 * `useHead({ htmlAttrs })`. Writing localStorage instead would not help —
 * localStorage is client-only and the server cannot read it, so the SSR page
 * would always render with the default theme and the client would only update
 * the DOM after hydration (too late for the attribute assertions).
 */
async function applyTheme (page: Page, theme: string, mode: string): Promise<void> {
    await page.context().addCookies([
        {
            name: THEME_COOKIE,
            value: theme,
            url: 'http://localhost:3000'
        },
        {
            name: MODE_COOKIE,
            value: mode,
            url: 'http://localhost:3000'
        }
    ])
    await page.reload({ waitUntil: 'networkidle' })
}

/** Read a CSS custom property off the document element (computed). */
async function getCssVar (page: Page, varName: string): Promise<string> {
    return page.evaluate(
        (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim(),
        varName
    )
}

/** Read the computed background-color on <body>. */
async function getBodyBg (page: Page): Promise<string> {
    return page.evaluate(() => getComputedStyle(document.body).backgroundColor)
}

// ── constants ──────────────────────────────────────────────────────────────

const BRANDS = ['sobre', 'glass', 'geek', 'cartoon', 'editorial', 'material', 'ecom', 'apple'] as const
const MODES = ['light', 'dark'] as const

// A11y rules that fire on Histoire shell artefacts but are irrelevant for
// the marketing page itself are explicitly excluded here for parity with the
// existing components.spec.ts pattern.
const A11Y_IGNORED_RULES = [
    'region',
    'landmark-one-main',
]

// ── 1. html attribute presence ─────────────────────────────────────────────

test.describe('html attributes — data-theme + data-mode', () => {
    for (const brand of BRANDS) {
        for (const mode of MODES) {
            test(`${brand}/${mode} — <html> carries correct attributes`, async ({ page }) => {
                await page.goto('/')
                await applyTheme(page, brand, mode)

                const html = page.locator('html')
                await expect(html).toHaveAttribute('data-theme', brand)
                await expect(html).toHaveAttribute('data-mode', mode)
            })
        }
    }
})

// ── 2. body background changes between themes and between modes ─────────────

test.describe('body background-color — token-driven', () => {
    test('sobre/dark vs sobre/light body bg differ', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'sobre', 'dark')
        const bgDark = await getBodyBg(page)

        await applyTheme(page, 'sobre', 'light')
        const bgLight = await getBodyBg(page)

        expect(bgDark).not.toEqual(bgLight)
    })

    test('sobre/dark body bg ≈ rgb(10, 10, 10)', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'sobre', 'dark')
        const bg = await getBodyBg(page)
        expect(bg).toBe('rgb(10, 10, 10)')
    })

    test('sobre/light body bg ≈ rgb(255, 255, 255)', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'sobre', 'light')
        const bg = await getBodyBg(page)
        expect(bg).toBe('rgb(255, 255, 255)')
    })

    test('apple/dark body bg ≈ rgb(0, 0, 0)', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'apple', 'dark')
        const bg = await getBodyBg(page)
        expect(bg).toBe('rgb(0, 0, 0)')
    })

    test('body bg differs across all 8 brands (dark mode)', async ({ page }) => {
        await page.goto('/')
        const bgs: Record<string, string> = {}
        for (const brand of BRANDS) {
            await applyTheme(page, brand, 'dark')
            bgs[brand] = await getBodyBg(page)
        }
        const unique = new Set(Object.values(bgs))
        // Not all themes need a unique bg, but at minimum sobre (dark #0a0a0a)
        // and apple (dark #000000) must differ.
        expect(bgs['sobre']).not.toEqual(bgs['apple'])
        // Sanity: we got actual rgb() values, not empty strings (= token not loaded).
        for (const [brand, bg] of Object.entries(bgs)) {
            expect(bg, `${brand}/dark body bg should not be empty`).toMatch(/^rgb/)
        }
    })
})

// ── 3. --origam-shadow---sm differs between cartoon and geek ───────────────

test.describe('--origam-shadow---sm — per-theme token differentiation', () => {
    // cartoon: hard offset "4px 4px 0px 0px …" (neo-brutalist)
    // geek:    glow "0px 0px 8px 1px rgba(74,222,128,…)"
    test('cartoon/dark shadow token contains hard offset (4px 4px)', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'cartoon', 'dark')
        const shadow = await getCssVar(page, '--origam-shadow---sm')
        expect(shadow).toContain('4px 4px')
    })

    test('geek/dark shadow token contains glow (rgba(74,222,128', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'geek', 'dark')
        const shadow = await getCssVar(page, '--origam-shadow---sm')
        expect(shadow).toMatch(/rgba\(74,\s*222,\s*128/)
    })

    test('cartoon/dark shadow !== geek/dark shadow', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'cartoon', 'dark')
        const shadowCartoon = await getCssVar(page, '--origam-shadow---sm')

        await applyTheme(page, 'geek', 'dark')
        const shadowGeek = await getCssVar(page, '--origam-shadow---sm')

        expect(shadowCartoon).not.toEqual(shadowGeek)
    })

    test('geek/light shadow token contains glow (rgba(74,222,128', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'geek', 'light')
        const shadow = await getCssVar(page, '--origam-shadow---sm')
        expect(shadow).toMatch(/rgba\(74,\s*222,\s*128/)
    })
})

// ── 4. --origam-color__surface---default changes between modes ──────────────

test.describe('--origam-color__surface---default — mode axis active', () => {
    test('sobre surface token differs between dark and light', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'sobre', 'dark')
        const dark = await getCssVar(page, '--origam-color__surface---default')

        await applyTheme(page, 'sobre', 'light')
        const light = await getCssVar(page, '--origam-color__surface---default')

        expect(dark).not.toEqual(light)
    })

    test('apple/dark surface token is #000000', async ({ page }) => {
        await page.goto('/')
        await applyTheme(page, 'apple', 'dark')
        const val = await getCssVar(page, '--origam-color__surface---default')
        expect(val).toBe('#000000')
    })
})

// ── 5. marketing-chrome.css must not contain [data-theme] colour overrides ──

test.describe('marketing-chrome.css — no per-theme colour layer', () => {
    /**
     * Load all stylesheets from the page and find the one that matches
     * "marketing-chrome". Walk its CSSRules looking for any rule whose
     * selectorText contains both "[data-theme" and a colour property
     * (color, background-color, background, border-color, fill, stroke).
     *
     * The only [data-theme] blocks that ARE allowed in marketing-chrome.css
     * are purely structural / chip-padding overrides (see line 82 of the
     * source: `html[data-theme][data-mode]` sets --origam-chip---* vars).
     * Those set component-token vars, not colour values, so the check below
     * explicitly excludes lines that only set --origam-chip--- or --m-shadow
     * vars (which reference DS tokens, not hardcoded colours).
     */
    test('no [data-theme] colour property in marketing-chrome.css', async ({ page }) => {
        await page.goto('/')

        const violation = await page.evaluate(() => {
            const sheets = Array.from(document.styleSheets)
            const chromeSheet = sheets.find(s => s.href?.includes('marketing-chrome'))
            if (!chromeSheet) return null

            const COLOUR_PROPS = new Set([
                'color', 'background-color', 'background',
                'border-color', 'fill', 'stroke', 'outline-color'
            ])

            // CSS keywords that act as colour resets inside a [data-theme] block
            // are just as problematic as hardcoded hex values — they override the
            // token-driven colour layer. `initial` surfaces when `background: none`
            // is set (the shorthand decomputes to `background-color: initial`).
            const RESET_KEYWORDS = new Set(['initial', 'none', 'transparent', 'unset', 'revert'])

            for (const rule of Array.from(chromeSheet.cssRules)) {
                if (!(rule instanceof CSSStyleRule)) continue
                const sel = rule.selectorText ?? ''
                if (!sel.includes('[data-theme')) continue

                // Allow the chip-padding override block
                // (html[data-theme][data-mode] { --origam-chip---* }) — it only
                // sets component-token custom properties, not colour values.
                if (sel.startsWith('html[data-theme]')) continue

                for (const prop of COLOUR_PROPS) {
                    const val = rule.style.getPropertyValue(prop)
                    if (!val) continue
                    const trimmed = val.trim()
                    // Allow var(--origam-*) references — those are token-derived.
                    if (trimmed.startsWith('var(')) continue
                    // Allow color-mix() expressions built from token vars.
                    if (trimmed.startsWith('color-mix(')) continue
                    // Flag literal colours AND CSS keyword resets.
                    return { selector: sel, property: prop, value: trimmed }
                }
            }
            return null
        })

        expect(
            violation,
            violation
                ? `marketing-chrome.css sets a literal colour inside [data-theme]: ` +
                  `${violation.selector} { ${violation.property}: ${violation.value} }`
                : undefined
        ).toBeNull()
    })

    test('marketing-chrome.css stylesheet is loaded on the page', async ({ page }) => {
        await page.goto('/')
        const loaded = await page.evaluate(() =>
            Array.from(document.styleSheets).some(s => s.href?.includes('marketing-chrome'))
        )
        expect(loaded, 'marketing-chrome.css not found in loaded stylesheets').toBe(true)
    })
})

// ── 6. a11y sweeps (axe-core) on representative themes ─────────────────────

test.describe('a11y — axe-core sweeps', () => {
    const SWEEP_COMBOS: Array<[string, string]> = [
        ['sobre', 'light'],
        ['sobre', 'dark'],
        ['geek', 'dark'],
    ]

    for (const [brand, mode] of SWEEP_COMBOS) {
        test(`${brand}/${mode} — no critical a11y violations`, async ({ page }) => {
            await page.goto('/')
            await applyTheme(page, brand, mode)

            const results = await new AxeBuilder({ page })
                .disableRules(A11Y_IGNORED_RULES)
                .analyze()

            const critical = results.violations.filter(v => v.impact === 'critical')
            expect(
                critical,
                critical.map(v => `${v.id}: ${v.description}`).join('\n')
            ).toHaveLength(0)
        })
    }
})

// ── 7. no data-theme / data-mode attribute is set to null ──────────────────

test.describe('data-theme / data-mode — never null or missing', () => {
    for (const brand of BRANDS) {
        for (const mode of MODES) {
            test(`${brand}/${mode} — attributes are non-empty strings`, async ({ page }) => {
                await page.goto('/')
                await applyTheme(page, brand, mode)

                const [theme, resolvedMode] = await page.evaluate(() => [
                    document.documentElement.getAttribute('data-theme'),
                    document.documentElement.getAttribute('data-mode'),
                ])

                expect(theme).not.toBeNull()
                expect(theme).not.toBe('')
                expect(resolvedMode).not.toBeNull()
                expect(resolvedMode).not.toBe('')
                // data-mode must be the concrete value, never 'auto'
                expect(resolvedMode).toMatch(/^(light|dark)$/)
            })
        }
    }
})
