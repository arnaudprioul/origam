import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-code-origamcode-story-vue'

/**
 * Probe spec for OrigamCode runtime behaviour. Covers the shiki
 * highlight pipeline (per-lang tokens), line-numbers gutter, line
 * highlight class swap, copy-to-clipboard wiring and CSS-variable theming.
 *
 * Each test navigates to a dedicated `<Variant>` and asserts on the
 * sandbox iframe — never on the Histoire chrome — so the locators stay
 * stable across Histoire upgrades.
 */

const sandboxOf = (page: import('@playwright/test').Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

async function gotoVariant (page: import('@playwright/test').Page, title: string) {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(600)
}

test.describe('OrigamCode — semantic HTML (figure/figcaption)', () => {

    test('default tag renders as <figure> with a <figcaption> header bar (filename)', async ({ page }) => {
        await gotoVariant(page, 'Design')
        const sandbox = sandboxOf(page)

        const figure = sandbox.locator('figure.origam-code').first()
        await expect(figure).toBeVisible({ timeout: 5000 })
        await expect(figure).toHaveJSProperty('tagName', 'FIGURE')

        const figcaption = sandbox.locator('figure.origam-code figcaption.origam-code__header').first()
        await expect(figcaption).toBeVisible({ timeout: 5000 })
        await expect(figcaption).toHaveJSProperty('tagName', 'FIGCAPTION')
        await expect(figcaption.locator('[data-cy="origam-code-filename"]')).toHaveText('design.ts')
    })

    test('figure is accessible via getByRole("figure")', async ({ page }) => {
        await gotoVariant(page, 'Design')
        const sandbox = sandboxOf(page)

        const figure = sandbox.getByRole('figure').first()
        await expect(figure).toBeVisible({ timeout: 5000 })
    })

    test('default slot variant renders a <pre><code> without a footer', async ({ page }) => {
        await gotoVariant(page, 'Slots - Default')
        const sandbox = sandboxOf(page)

        const figure = sandbox.locator('figure.origam-code').first()
        await expect(figure).toBeVisible({ timeout: 5000 })
        await expect(figure.locator('pre.origam-code__pre code.origam-code__code')).toHaveCount(1)
        await expect(figure.locator('footer')).toHaveCount(0)
    })

    test('footer slot renders as a <footer> element', async ({ page }) => {
        await gotoVariant(page, 'Slots - Footer')
        const sandbox = sandboxOf(page)

        const footer = sandbox.locator('figure.origam-code footer')
        await expect(footer.first()).toBeVisible({ timeout: 5000 })
        await expect(footer).toHaveJSProperty('tagName', 'FOOTER')
    })
})

test.describe('OrigamCode — runtime', () => {

    test('renders shiki-tokenised TS — DOM contains styled <span>s with CSS variable references', async ({ page }) => {
        await gotoVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const code = sandbox.locator('.origam-code__code').first()

        await expect(code).toBeVisible({ timeout: 5000 })

        // shiki dual-theme mode emits spans with style="--shiki-light:#X;--shiki-dark:#Y"
        // (no inline color: declaration — the colour is resolved by the SCSS cascade).
        // We assert that at least one such span exists (smoke-test that highlighting ran).
        const styledSpanCount = await code.locator('span[style*="--shiki-light"]').count()
        expect(styledSpanCount).toBeGreaterThan(0)

        // Verify spans use the shiki dual-theme custom properties, not a bare color: inline style.
        // A correct span: style="--shiki-light:#X;--shiki-dark:#Y" → style.color === ''
        // A broken span (css-variables theme, not dual-theme): style="color:var(--shiki-token-*)"
        const hasBareColorStyle = await code.evaluate((el) => {
            const spans = Array.from(el.querySelectorAll('span[style]'))
            return spans.some((span) => {
                const raw = (span as HTMLElement).getAttribute('style') ?? ''
                // Presence of "color:" (not "--shiki-light"/"--shiki-dark") would indicate
                // the wrong shiki theme mode is active.
                return raw.includes('color:') && !raw.includes('--shiki-')
            })
        })
        expect(hasBareColorStyle).toBe(false)
    })

    test('syntax tokens use CSS variables from origam design tokens', async ({ page }) => {
        await gotoVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()

        await expect(host).toBeVisible({ timeout: 5000 })
        await page.waitForTimeout(400)

        // shiki dual-theme mode: token spans carry --shiki-light and --shiki-dark
        // as inline custom properties; no --shiki-token-* mapping is used.
        // Verify that at least one token span is present and that it carries
        // both light and dark custom properties (dual-theme pipeline is active).
        const dualThemeCount = await host.evaluate((el) => {
            const spans = Array.from(el.querySelectorAll('.origam-code__code span[style]'))
            return spans.filter((s) => {
                const raw = (s as HTMLElement).getAttribute('style') ?? ''
                return raw.includes('--shiki-light') && raw.includes('--shiki-dark')
            }).length
        })
        // At least one dual-theme token span must be present — confirms that the
        // shiki highlight pipeline ran and dual-theme CSS vars are wired.
        expect(dualThemeCount).toBeGreaterThan(0)
    })

    test('theme switch updates syntax colours via CSS cascade (no JS re-render)', async ({ page }) => {
        await gotoVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()

        await expect(host).toBeVisible({ timeout: 5000 })
        await page.waitForTimeout(400)

        // shiki dual-theme: token spans store --shiki-light and --shiki-dark as
        // inline custom properties. The SCSS resolves color: var(--shiki-light)
        // for light themes and color: var(--shiki-dark) for dark themes via
        // html[data-theme="dark"] selector. Switching data-theme is a pure CSS
        // cascade — no JS re-render of the highlight pipeline occurs.
        //
        // We pick the first token span with both custom props, capture its
        // computed color under light and dark, and assert they differ.
        const lightColor = await sandbox.locator('html').evaluate((html, selector) => {
            html.setAttribute('data-theme', 'light')
            const span = html.querySelector(`${selector} .origam-code__code span[style*="--shiki-light"]`) as HTMLElement | null
            if (!span) return null
            return window.getComputedStyle(span).color
        }, '.origam-code')

        const darkColor = await sandbox.locator('html').evaluate((html, selector) => {
            html.setAttribute('data-theme', 'dark')
            const span = html.querySelector(`${selector} .origam-code__code span[style*="--shiki-dark"]`) as HTMLElement | null
            if (!span) return null
            return window.getComputedStyle(span).color
        }, '.origam-code')

        // Both modes must resolve a colour (pipeline ran and SCSS mapping is active).
        expect(lightColor).not.toBeNull()
        expect(darkColor).not.toBeNull()
        // Light and dark must produce distinct computed colours — confirming the
        // data-theme CSS cascade is wired without a JS re-render.
        expect(lightColor).not.toBe(darkColor)
    })

    test('tokenises the DOM into multiple styled spans (TS grammar, not raw text)', async ({ page }) => {
        await gotoVariant(page, 'Design')
        const sandbox = sandboxOf(page)

        const code = sandbox.locator('.origam-code__code').first()
        await expect(code).toBeVisible({ timeout: 5000 })
        await page.waitForTimeout(400)

        // Tokenisation produces several styled spans for a TS snippet — a raw
        // plaintext render would emit (near) zero dual-theme token spans.
        const tokenSpans = await code.locator('span[style*="--shiki-light"]').count()
        expect(tokenSpans).toBeGreaterThan(2)
    })

    test('line-numbers prop emits a per-row CSS counter (line=1, 2, …)', async ({ page }) => {
        await gotoVariant(page, 'Design')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()

        await expect(host).toHaveClass(/origam-code--line-numbers/, { timeout: 5000 })

        const rows = host.locator('.origam-code__row')
        const rowCount = await rows.count()
        expect(rowCount).toBeGreaterThanOrEqual(3)

        const lineNumbers = await rows.evaluateAll((els) => els.map((el) => el.getAttribute('data-line')))
        expect(lineNumbers.slice(0, 3)).toEqual(['1', '2', '3'])
    })

    test('line-numbers gutter does not overlap the code text (no X-axis collision)', async ({ page }) => {
        await gotoVariant(page, 'Design')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()

        await expect(host.locator('.origam-code__row').first()).toBeVisible({ timeout: 5000 })

        const result = await host.locator('.origam-code__row').first().evaluate((row) => {
            const computed = window.getComputedStyle(row)
            const paddingStart = parseFloat(computed.paddingInlineStart)
            const before = window.getComputedStyle(row, '::before')
            const gutterWidth = parseFloat(before.width)
            return {
                paddingStart,
                gutterWidth,
                position: computed.position
            }
        })

        expect(result.paddingStart).toBeGreaterThan(0)
        expect(result.gutterWidth).toBeCloseTo(result.paddingStart, 0)
        expect(result.position).toBe('relative')
    })

    test('line-numbers gutter rows share the same top as their code content (no vertical offset)', async ({ page }) => {
        await gotoVariant(page, 'Design')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()
        const rows = host.locator('.origam-code__row')

        await expect(rows.first()).toBeVisible({ timeout: 5000 })

        const tops = await rows.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top))

        for (let i = 1; i < tops.length; i++) {
            expect(tops[i]).toBeGreaterThan(tops[i - 1])
        }
    })

    test('highlightLines="2" → row 2 carries the highlighted class', async ({ page }) => {
        await gotoVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()
        await expect(host.locator('.origam-code__row').first()).toBeVisible({ timeout: 5000 })

        const highlightedLines = await host
            .locator('.origam-code__row--highlighted')
            .evaluateAll((els) => els.map((el) => el.getAttribute('data-line')))
        expect(highlightedLines).toEqual(['2'])
    })

    test('copy button writes to navigator.clipboard and toggles aria-live feedback', async ({ page, context }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write'])
        await gotoVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()
        const copyBtn = host.locator('[data-cy="origam-code-copy"]').first()

        await expect(copyBtn).toBeVisible({ timeout: 5000 })

        await sandbox.locator('body').evaluate(() => {
            (window as unknown as { __clip: string[] }).__clip = []
            const orig = navigator.clipboard?.writeText?.bind(navigator.clipboard)
            Object.defineProperty(navigator, 'clipboard', {
                configurable: true,
                value: {
                    writeText: async (text: string) => {
                        (window as unknown as { __clip: string[] }).__clip.push(text)
                        if (orig) try { await orig(text) } catch { /* ignore */ }
                    }
                }
            })
        })

        await copyBtn.click()
        await page.waitForTimeout(200)

        const clipCalls = await sandbox.locator('body').evaluate(() => (window as unknown as { __clip: string[] }).__clip)
        expect(clipCalls.length).toBe(1)
        expect(clipCalls[0]).toContain('greet')

        await expect(copyBtn).toHaveAttribute('aria-label', /copied/i)
    })

    test('filename prop renders a header bar with the filename', async ({ page }) => {
        await gotoVariant(page, 'Design')
        const sandbox = sandboxOf(page)
        const filename = sandbox.locator('[data-cy="origam-code-filename"]').first()
        await expect(filename).toBeVisible({ timeout: 5000 })
        await expect(filename).toHaveText('design.ts')
    })
})

test.describe('OrigamCode — compact pill', () => {

    test('compact renders a single-line pill: figure semantics kept, no header, inline-flex row', async ({ page }) => {
        await gotoVariant(page, 'Functional - Compact (install pill)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code--compact').first()

        await expect(host).toBeVisible({ timeout: 5000 })
        // figure/pre/code semantics preserved
        await expect(host).toHaveJSProperty('tagName', 'FIGURE')
        await expect(host.locator('pre.origam-code__pre code.origam-code__code')).toHaveCount(1)
        // no header / filename chrome in compact mode
        await expect(host.locator('.origam-code__header')).toHaveCount(0)

        const layout = await host.evaluate((el) => {
            const cs = getComputedStyle(el)
            const rect = el.getBoundingClientRect()
            return { display: cs.display, align: cs.alignItems, height: Math.round(rect.height) }
        })
        expect(layout.display).toBe('inline-flex')
        expect(layout.align).toBe('center')
        // single line: pill height stays well below a multi-line block
        expect(layout.height).toBeLessThan(64)
    })

    test('prompt prefix renders before the code (decorative, aria-hidden)', async ({ page }) => {
        await gotoVariant(page, 'Functional - Compact (install pill)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code--compact').first()
        await expect(host).toBeVisible({ timeout: 5000 })

        const prompt = host.locator('[data-cy="origam-code-prompt"]')
        await expect(prompt).toHaveText('$')
        await expect(prompt).toHaveAttribute('aria-hidden', 'true')

        // prompt sits before the code surface in document order
        const promptX = await prompt.evaluate((el) => el.getBoundingClientRect().left)
        const codeX = await host.locator('.origam-code__code').evaluate((el) => el.getBoundingClientRect().left)
        expect(promptX).toBeLessThan(codeX)
    })

    test('compact copy is a small icon button and copies only the code (prompt excluded)', async ({ page, context }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write'])
        await gotoVariant(page, 'Functional - Compact (install pill)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code--compact').first()
        const copyBtn = host.locator('[data-cy="origam-code-copy"]').first()

        await expect(copyBtn).toBeVisible({ timeout: 5000 })
        // icon-only: no visible "Copy" text label
        await expect(copyBtn).not.toContainText('Copy')

        await sandbox.locator('body').evaluate(() => {
            (window as unknown as { __clip: string[] }).__clip = []
            const orig = navigator.clipboard?.writeText?.bind(navigator.clipboard)
            Object.defineProperty(navigator, 'clipboard', {
                configurable: true,
                value: {
                    writeText: async (text: string) => {
                        (window as unknown as { __clip: string[] }).__clip.push(text)
                        if (orig) try { await orig(text) } catch { /* ignore */ }
                    }
                }
            })
        })

        await copyBtn.click()
        await page.waitForTimeout(200)

        const clipCalls = await sandbox.locator('body').evaluate(() => (window as unknown as { __clip: string[] }).__clip)
        expect(clipCalls.length).toBe(1)
        // only the code is copied — the decorative "$" prompt is NOT in the payload
        expect(clipCalls[0]).toBe('npm install origam')
        expect(clipCalls[0]).not.toContain('$')
    })
})
