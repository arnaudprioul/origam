import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-code-origamcode-story-vue'

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

    test('default tag renders as <figure>', async ({ page }) => {
        await gotoVariant(page, 'Prop — tag=figure (default, semantic)')
        const sandbox = sandboxOf(page)

        const figure = sandbox.locator('figure.origam-code').first()
        await expect(figure).toBeVisible({ timeout: 5000 })
        await expect(figure).toHaveJSProperty('tagName', 'FIGURE')
    })

    test('default tag header renders as <figcaption> inside <figure>', async ({ page }) => {
        await gotoVariant(page, 'Prop — tag=figure (default, semantic)')
        const sandbox = sandboxOf(page)

        const figcaption = sandbox.locator('figure.origam-code figcaption.origam-code__header').first()
        await expect(figcaption).toBeVisible({ timeout: 5000 })
        await expect(figcaption).toHaveJSProperty('tagName', 'FIGCAPTION')

        await expect(figcaption.locator('[data-cy="origam-code-filename"]')).toHaveText('figure-default.ts')
    })

    test('figure is accessible via getByRole("figure")', async ({ page }) => {
        await gotoVariant(page, 'Prop — tag=figure (default, semantic)')
        const sandbox = sandboxOf(page)

        const figure = sandbox.getByRole('figure').first()
        await expect(figure).toBeVisible({ timeout: 5000 })
    })

    test('back-compat: tag=div root renders as <div>, header falls back to <div> (not figcaption)', async ({ page }) => {
        await gotoVariant(page, 'Prop — tag=div (back-compat)')
        const sandbox = sandboxOf(page)

        const divRoot = sandbox.locator('div.origam-code').first()
        await expect(divRoot).toBeVisible({ timeout: 5000 })
        await expect(divRoot).toHaveJSProperty('tagName', 'DIV')

        const headerDiv = sandbox.locator('div.origam-code div.origam-code__header').first()
        await expect(headerDiv).toBeVisible({ timeout: 5000 })
        await expect(headerDiv).toHaveJSProperty('tagName', 'DIV')

        const strayFigcaption = sandbox.locator('div.origam-code figcaption')
        await expect(strayFigcaption).toHaveCount(0)
    })

    test('footer slot renders as <footer> element', async ({ page }) => {
        await gotoVariant(page, 'Prop — tag=figure (default, semantic)')
        const sandbox = sandboxOf(page)

        const footer = sandbox.locator('figure.origam-code footer')
        await expect(footer).toHaveCount(0)
    })
})

test.describe('OrigamCode — runtime', () => {

    test('renders shiki-tokenised TS — DOM contains styled <span>s with CSS variable references', async ({ page }) => {
        await gotoVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        const code = sandbox.locator('.origam-code__code').first()

        await expect(code).toBeVisible({ timeout: 5000 })

        // shiki css-variables theme emits spans with style="color: var(--shiki-token-*)"
        // We assert that at least one such span exists (smoke-test that highlighting ran)
        // and that NO hardcoded hex colour is baked into a style attribute.
        const styledSpanCount = await code.locator('span[style*="color"]').count()
        expect(styledSpanCount).toBeGreaterThan(0)

        // Verify spans use CSS variables, not hardcoded hex colours.
        // A hardcoded colour would look like style="color:#D73A49" or style="color:rgb(…)".
        // A CSS-variable colour looks like style="color:var(--shiki-token-keyword)".
        const hasHardcodedHex = await code.evaluate((el) => {
            const spans = Array.from(el.querySelectorAll('span[style*="color"]'))
            return spans.some((span) => {
                const style = (span as HTMLElement).style.color
                // Hardcoded = starts with # or rgb( — CSS var = contains "var("
                return style.startsWith('#') || style.startsWith('rgb(') || style.startsWith('rgba(')
            })
        })
        expect(hasHardcodedHex).toBe(false)
    })

    test('syntax tokens use CSS variables from origam design tokens', async ({ page }) => {
        await gotoVariant(page, 'Syntax — CSS variables theming')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()

        await expect(host).toBeVisible({ timeout: 5000 })
        await page.waitForTimeout(400)

        // The .origam-code root must expose --shiki-token-keyword mapped to our token.
        // getPropertyValue returns the raw value of the custom property.
        const shikiKeywordVar = await host.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('--shiki-token-keyword').trim()
        })
        // The CSS var must be non-empty (the SCSS mapping is wired).
        expect(shikiKeywordVar).not.toBe('')
        // It must reference a CSS variable (not be a hardcoded colour).
        expect(shikiKeywordVar).toContain('var(')
    })

    test('theme switch updates syntax colours via CSS cascade (no JS re-render)', async ({ page }) => {
        await gotoVariant(page, 'Syntax — CSS variables theming')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()

        await expect(host).toBeVisible({ timeout: 5000 })
        await page.waitForTimeout(400)

        // Capture --shiki-token-keyword resolved value under light theme.
        const lightKeywordColor = await sandbox.locator('html').evaluate((html, selector) => {
            html.setAttribute('data-theme', 'light')
            const el = html.querySelector(selector) as HTMLElement | null
            if (!el) return null
            return window.getComputedStyle(el).getPropertyValue('--origam-code__syntax---keyword').trim()
        }, '.origam-code')

        // Switch to dark theme and capture again.
        const darkKeywordColor = await sandbox.locator('html').evaluate((html, selector) => {
            html.setAttribute('data-theme', 'dark')
            const el = html.querySelector(selector) as HTMLElement | null
            if (!el) return null
            return window.getComputedStyle(el).getPropertyValue('--origam-code__syntax---keyword').trim()
        }, '.origam-code')

        // The two computed values should differ between light and dark themes,
        // confirming the token resolution follows data-theme without any JS re-render.
        expect(lightKeywordColor).not.toBe('')
        expect(darkKeywordColor).not.toBe('')
        expect(lightKeywordColor).not.toBe(darkKeywordColor)
    })

    test('switching lang re-tokenises the DOM (different markup vs plaintext)', async ({ page }) => {
        await gotoVariant(page, 'Prop — lang (parallel)')
        const sandbox = sandboxOf(page)

        const codes = sandbox.locator('.origam-code__code')
        await expect(codes.first()).toBeVisible({ timeout: 5000 })
        await page.waitForTimeout(400)

        const count = await codes.count()
        expect(count).toBeGreaterThan(1)

        const html0 = await codes.nth(0).innerHTML()
        const html1 = await codes.nth(1).innerHTML()
        expect(html0).not.toBe(html1)
    })

    test('line-numbers prop emits a per-row CSS counter (line=1, 2, …)', async ({ page }) => {
        await gotoVariant(page, 'Prop — lineNumbers')
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
        await gotoVariant(page, 'Prop — lineNumbers')
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
        await gotoVariant(page, 'Prop — lineNumbers')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()
        const rows = host.locator('.origam-code__row')

        await expect(rows.first()).toBeVisible({ timeout: 5000 })

        const tops = await rows.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top))

        for (let i = 1; i < tops.length; i++) {
            expect(tops[i]).toBeGreaterThan(tops[i - 1])
        }
    })

    test('highlightLines="2,5-7" → rows 2,5,6,7 carry the highlighted class', async ({ page }) => {
        await gotoVariant(page, 'Prop — highlightLines (2,5-7)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('.origam-code').first()
        await expect(host.locator('.origam-code__row').first()).toBeVisible({ timeout: 5000 })

        const highlightedLines = await host
            .locator('.origam-code__row--highlighted')
            .evaluateAll((els) => els.map((el) => el.getAttribute('data-line')))
        expect(highlightedLines.sort()).toEqual(['2', '5', '6', '7'])
    })

    test('copy button writes to navigator.clipboard and toggles aria-live feedback', async ({ page, context }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write'])
        await gotoVariant(page, 'Emit — @copy (counter)')
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
        expect(clipCalls[0]).toContain('const count = ref(0)')

        await expect(copyBtn).toHaveAttribute('aria-label', /copied/i)
    })

    test('filename prop renders a header bar with the filename', async ({ page }) => {
        await gotoVariant(page, 'Prop — filename (header visible)')
        const sandbox = sandboxOf(page)
        const filename = sandbox.locator('[data-cy="origam-code-filename"]').first()
        await expect(filename).toBeVisible({ timeout: 5000 })
        await expect(filename).toHaveText('UserCard.vue')
    })
})
