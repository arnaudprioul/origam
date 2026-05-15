import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-code-origamcode-story-vue'

/**
 * Probe spec for OrigamCode runtime behaviour. Covers the shiki
 * highlight pipeline (per-lang tokens), line-numbers gutter, line
 * highlight class swap, copy-to-clipboard wiring and forced theme.
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

test.describe('OrigamCode — runtime', () => {

    test('renders shiki-tokenised TS — DOM contains styled <span>s', async ({ page }) => {
        await gotoVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        const code = sandbox.locator('.origam-code__code').first()

        await expect(code).toBeVisible({ timeout: 5000 })
        // shiki emits inline styled spans for each token (`style="color:..."`).
        // We assert that AT LEAST one such styled span exists, which is the
        // smoke-test that highlighting actually ran.
        const styledTokenCount = await code.locator('span[style*="color"]').count()
        expect(styledTokenCount).toBeGreaterThan(0)
    })

    test('switching lang re-tokenises the DOM (different markup vs plaintext)', async ({ page }) => {
        await gotoVariant(page, 'Prop — lang (parallel)')
        const sandbox = sandboxOf(page)

        const codes = sandbox.locator('.origam-code__code')
        await expect(codes.first()).toBeVisible({ timeout: 5000 })
        await page.waitForTimeout(400)

        const count = await codes.count()
        expect(count).toBeGreaterThan(1)

        // Each lang produces a distinct first-token markup. We don't lock
        // to a specific colour (shiki theme can drift) — we just check
        // that two distinct lang panels produce two distinct innerHTMLs.
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

        // Each row exposes `data-line="N"` for the CSS counter, in order.
        const lineNumbers = await rows.evaluateAll((els) => els.map((el) => el.getAttribute('data-line')))
        expect(lineNumbers.slice(0, 3)).toEqual(['1', '2', '3'])
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

        // Stub `navigator.clipboard.writeText` so we don't depend on the
        // OS clipboard permission dialog. We record the call so we can
        // assert on it AND let the component think the write succeeded.
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

        // The aria-label flips to the "copied" variant while the timer runs.
        await expect(copyBtn).toHaveAttribute('aria-label', /copied/i)
    })

    test('theme=dark forces the dark surface even when document theme is light', async ({ page }) => {
        await gotoVariant(page, 'Prop — theme (light vs dark)')
        const sandbox = sandboxOf(page)

        const lightHost = sandbox.locator('.origam-code--theme-light').first()
        const darkHost = sandbox.locator('.origam-code--theme-dark').first()
        await expect(lightHost).toBeVisible({ timeout: 5000 })
        await expect(darkHost).toBeVisible({ timeout: 5000 })

        const lightBg = await lightHost.evaluate((el) => getComputedStyle(el).backgroundColor)
        const darkBg = await darkHost.evaluate((el) => getComputedStyle(el).backgroundColor)
        // Both surfaces resolve to a real colour and they differ — the
        // theme branch wired through.
        expect(lightBg).not.toBe('')
        expect(darkBg).not.toBe('')
        expect(lightBg).not.toBe(darkBg)
    })

    test('filename prop renders a header bar with the filename', async ({ page }) => {
        await gotoVariant(page, 'Prop — filename (header visible)')
        const sandbox = sandboxOf(page)
        const filename = sandbox.locator('[data-cy="origam-code-filename"]').first()
        await expect(filename).toBeVisible({ timeout: 5000 })
        await expect(filename).toHaveText('UserCard.vue')
    })
})
