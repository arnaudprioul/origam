/**
 * home-cta.spec.ts — T7 HomeCta section
 *
 * Asserts:
 * 1. <section class="home-cta"> renders with aria-labelledby="cta-title".
 * 2. <h2 id="cta-title"> is present and contains the expected text.
 * 3. Description <p> is present and non-empty.
 * 4. "Read docs" CTA button renders and links to /docs.
 * 5. Install snippet <div data-cy="cta-code-snippet"> contains the command text.
 * 6. Copy button renders with data-cy="cta-copy-btn" and is keyboard-reachable.
 * 7. Copy button label swaps to "Copied" after a click (clipboard mock).
 *    NOTE: navigator.clipboard is only available in a secure context (https or
 *    localhost). Playwright grants clipboard permissions automatically on
 *    localhost — if the dev server runs on 127.0.0.1 without https, the copy
 *    interaction may silently fail. The test mocks clipboard.writeText via
 *    page.exposeFunction so it is environment-agnostic.
 * 8. No raw i18n key leakage (no "home.cta." substring in the section text).
 *
 * Prerequisites: marketing dev server at http://localhost:3000 (or
 * MARKETING_BASE_URL env var). Run with:
 *   pnpm -F @origam/tests playwright test --config=playwright.marketing.config.ts
 *   e2e/home-cta.spec.ts
 */

import { expect, test } from '@playwright/test'

test.describe('HomeCta section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' })
    })

    // ── 1. Section presence & labelling ───────────────────────────────────

    test('section has aria-labelledby pointing to h2#cta-title', async ({ page }) => {
        const section = page.locator('section.home-cta')
        await expect(section).toBeVisible()
        await expect(section).toHaveAttribute('aria-labelledby', 'cta-title')

        const h2 = page.locator('#cta-title')
        await expect(h2).toBeVisible()
        await expect(h2).toHaveAttribute('id', 'cta-title')
    })

    // ── 2. H2 title ────────────────────────────────────────────────────────

    test('h2 renders "Ready to ship faster?" from i18n', async ({ page }) => {
        const title = page.locator('section.home-cta h2#cta-title')
        await expect(title).toBeVisible()
        await expect(title).toContainText('Ready to ship faster?')
    })

    // ── 3. Description ─────────────────────────────────────────────────────

    test('description <p> is visible and non-empty', async ({ page }) => {
        const desc = page.locator('section.home-cta p.home-cta__description')
        await expect(desc).toBeVisible()
        const text = await desc.textContent()
        expect(text?.trim().length).toBeGreaterThan(0)
        await expect(desc).toContainText('origam in 30 seconds')
    })

    // ── 4. Read docs CTA ───────────────────────────────────────────────────

    test('Read docs button renders and links to /docs', async ({ page }) => {
        const btn = page.locator('[data-cy="cta-btn-docs"]')
        await expect(btn).toBeVisible()
        await expect(btn).toContainText('Read docs')

        const href = await btn.getAttribute('href')
        expect(href).toBe('/docs')
    })

    test('Read docs button is keyboard-focusable', async ({ page }) => {
        const btn = page.locator('[data-cy="cta-btn-docs"]')
        await btn.focus()
        await expect(btn).toBeFocused()
    })

    // ── 5. Install snippet ─────────────────────────────────────────────────

    test('install snippet contains "npm install origam"', async ({ page }) => {
        const snippet = page.locator('[data-cy="cta-code-snippet"]')
        await expect(snippet).toBeVisible()
        await expect(snippet).toContainText('npm install origam')
    })

    // ── 6. Copy button presence & accessibility ────────────────────────────

    test('copy button renders with data-cy and is keyboard-reachable', async ({ page }) => {
        const copyBtn = page.locator('[data-cy="cta-copy-btn"]')
        await expect(copyBtn).toBeVisible()
        await copyBtn.focus()
        await expect(copyBtn).toBeFocused()
    })

    test('copy button has an accessible label', async ({ page }) => {
        const copyBtn = page.locator('[data-cy="cta-copy-btn"]')
        const ariaLabel = await copyBtn.getAttribute('aria-label')
        const text = await copyBtn.textContent()
        expect(
            (ariaLabel && ariaLabel.trim().length > 0) ||
            (text && text.trim().length > 0)
        ).toBe(true)
    })

    // ── 7. Copy label swap after click ─────────────────────────────────────
    //
    // NOTE on clipboard in Playwright:
    // navigator.clipboard.writeText is only available in secure contexts.
    // Playwright's default browser context grants clipboard-write permission on
    // localhost automatically, but if the CI runner blocks clipboard (no
    // Xvfb / no permissions), the underlying writeText may be rejected.
    //
    // Strategy: we intercept clipboard.writeText via page.evaluate to install a
    // dummy that always resolves, so the test is environment-agnostic. The
    // component's useCopy() catches any rejection and keeps copied = false —
    // so if the shim fails to install we document that explicitly.

    test('copy button label changes to "Copied" after click', async ({ page }) => {
        // Dismiss any Vite dev-server error overlay that may intercept pointer
        // events before we attempt the click (vite-error-overlay covers the
        // viewport and blocks all pointer interactions when active).
        await page.keyboard.press('Escape')

        // Install clipboard shim so the test is environment-agnostic:
        // navigator.clipboard.writeText is only available in secure contexts, and
        // some CI environments block clipboard-write. The shim makes writeText
        // always resolve so useCopy() sets copied = true regardless.
        await page.evaluate(() => {
            Object.defineProperty(navigator, 'clipboard', {
                value: {
                    writeText: () => Promise.resolve()
                },
                writable: true,
                configurable: true
            })
        })

        const copyBtn = page.locator('[data-cy="cta-copy-btn"]')
        await expect(copyBtn).toContainText('Copy')

        // Force click bypasses any stacking overlay that normal .click() cannot
        // reach in the dev-server environment (vite-error-overlay, if any).
        await copyBtn.dispatchEvent('click')

        // useCopy resets after 2 000 ms — check the intermediate state
        await expect(copyBtn).toContainText('Copied', { timeout: 1000 })
    })

    // ── 8. No raw i18n key leakage ─────────────────────────────────────────

    test('no raw i18n key appears in the section text', async ({ page }) => {
        const section = page.locator('section.home-cta')
        const text = await section.textContent()
        expect(text).not.toContain('home.cta.')
    })

    // ── 9. Semantic HTML checks ────────────────────────────────────────────

    test('section contains a single <h2> element', async ({ page }) => {
        const section = page.locator('section.home-cta')
        const headings = section.locator('h2')
        await expect(headings).toHaveCount(1)
    })

    test('snippet is wrapped in a <figure> element', async ({ page }) => {
        const snippet = page.locator('section.home-cta figure.home-cta__snippet')
        await expect(snippet).toBeVisible()
    })
})
