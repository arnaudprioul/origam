import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamQRCode — runtime probes for the SVG renderer, the matrix
 * regeneration under prop changes (errorCorrectionLevel, value,
 * cornerRadius, foreground, logo overlay) and the ARIA contract.
 *
 * Variants are reached via their dedicated titles — never via the
 * HstSelect picker dropdown (custom DOM, brittle).
 */

const STORY = '/story/stories-components-stories-qr-code-origamqrcode-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, title: string): Promise<void> => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

test.describe('OrigamQRCode — Playground (smoke)', () => {
    test('mounts and renders an inline <svg>', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="qrcode-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const svg = host.locator('svg').first()
        await expect(svg).toBeAttached()
    })

    test('emits at least one dark <rect> for a non-empty value', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-playground-host"]').first()
        // 1 background rect + N module rects → ≥ 2.
        const rectCount = await host.locator('svg rect').count()
        expect(rectCount).toBeGreaterThan(1)
    })

    test('root carries role="img" and an aria-label', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-playground-host"]').first()
        await expect(host).toHaveAttribute('role', 'img')
        const aria = await host.getAttribute('aria-label')
        expect(aria).not.toBeNull()
        expect(aria!.length).toBeGreaterThan(0)
    })

    test('root carries the ECC modifier class', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-playground-host"]').first()
        await expect(host).toHaveClass(/origam-qrcode--ecc-m/)
    })
})

test.describe('OrigamQRCode — Prop value (parallel)', () => {
    test('renders a distinct matrix per payload class', async ({ page }) => {
        await openVariant(page, 'Prop — value (URL / vCard / WiFi / raw)')
        const sandbox = sandboxOf(page)

        const url = sandbox.locator('[data-cy="qrcode-value-url"]').first()
        const text = sandbox.locator('[data-cy="qrcode-value-text"]').first()
        const wifi = sandbox.locator('[data-cy="qrcode-value-wifi"]').first()
        const vcard = sandbox.locator('[data-cy="qrcode-value-vcard"]').first()

        await expect(url).toBeVisible({ timeout: 8000 })

        // Each payload must produce a non-empty SVG with at least one rect.
        const urlRectCount = await url.locator('svg rect').count()
        const textRectCount = await text.locator('svg rect').count()
        const wifiRectCount = await wifi.locator('svg rect').count()
        const vcardRectCount = await vcard.locator('svg rect').count()

        expect(urlRectCount).toBeGreaterThan(1)
        expect(textRectCount).toBeGreaterThan(1)
        expect(wifiRectCount).toBeGreaterThan(1)
        expect(vcardRectCount).toBeGreaterThan(1)

        // vCard is the densest payload — it must produce more modules than a short URL.
        expect(vcardRectCount).toBeGreaterThan(urlRectCount)
    })
})

test.describe('OrigamQRCode — Prop errorCorrectionLevel', () => {
    test('higher ECC grows the matrix viewBox for the same payload', async ({ page }) => {
        await openVariant(page, 'Prop — errorCorrectionLevel (L / M / Q / H)')
        const sandbox = sandboxOf(page)

        const l = sandbox.locator('[data-cy="qrcode-ecc-L"] svg').first()
        const h = sandbox.locator('[data-cy="qrcode-ecc-H"] svg').first()
        await expect(l).toBeAttached({ timeout: 8000 })

        const lViewBox = await l.getAttribute('viewBox')
        const hViewBox = await h.getAttribute('viewBox')
        expect(lViewBox).not.toBeNull()
        expect(hViewBox).not.toBeNull()

        const parseSize = (vb: string): number => {
            const parts = vb.trim().split(/\s+/)
            return Number(parts[2])
        }
        const lSize = parseSize(lViewBox!)
        const hSize = parseSize(hViewBox!)
        // H carries ~30% redundancy → matrix is strictly larger than L.
        expect(hSize).toBeGreaterThan(lSize)
    })

    test('every ECC variant carries the matching modifier class', async ({ page }) => {
        await openVariant(page, 'Prop — errorCorrectionLevel (L / M / Q / H)')
        const sandbox = sandboxOf(page)

        await expect(sandbox.locator('[data-cy="qrcode-ecc-L"]').first()).toHaveClass(/origam-qrcode--ecc-l/)
        await expect(sandbox.locator('[data-cy="qrcode-ecc-M"]').first()).toHaveClass(/origam-qrcode--ecc-m/)
        await expect(sandbox.locator('[data-cy="qrcode-ecc-Q"]').first()).toHaveClass(/origam-qrcode--ecc-q/)
        await expect(sandbox.locator('[data-cy="qrcode-ecc-H"]').first()).toHaveClass(/origam-qrcode--ecc-h/)
    })
})

test.describe('OrigamQRCode — Prop cornerRadius', () => {
    test('cornerRadius=0 omits rx/ry attributes', async ({ page }) => {
        await openVariant(page, 'Prop — cornerRadius (0 / 0.25 / 0.5)')
        const sandbox = sandboxOf(page)
        const firstRect = sandbox.locator('[data-cy="qrcode-corner-0"] svg rect').nth(1)
        await expect(firstRect).toBeAttached({ timeout: 8000 })
        const rx = await firstRect.getAttribute('rx')
        // null OR "0" — the encoder may omit the attribute when 0.
        expect([null, '0']).toContain(rx)
    })

    test('cornerRadius=0.5 paints rounded modules (rx="0.5")', async ({ page }) => {
        await openVariant(page, 'Prop — cornerRadius (0 / 0.25 / 0.5)')
        const sandbox = sandboxOf(page)
        const firstRect = sandbox.locator('[data-cy="qrcode-corner-0.5"] svg rect').nth(1)
        await expect(firstRect).toBeAttached({ timeout: 8000 })
        const rx = await firstRect.getAttribute('rx')
        expect(rx).toBe('0.5')
    })
})

test.describe('OrigamQRCode — Prop logo', () => {
    test('renders an <image> element when a logo is configured', async ({ page }) => {
        await openVariant(page, 'Prop — logo overlay (size 0.15 / 0.2 / 0.25)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-logo-020"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const img = host.locator('svg image').first()
        await expect(img).toBeAttached()
        const href = await img.getAttribute('href')
        expect(href).not.toBeNull()
        expect(href!.length).toBeGreaterThan(0)
    })

    test('larger logo size paints a larger overlay box', async ({ page }) => {
        await openVariant(page, 'Prop — logo overlay (size 0.15 / 0.2 / 0.25)')
        const sandbox = sandboxOf(page)

        const small = sandbox.locator('[data-cy="qrcode-logo-015"] svg image').first()
        const large = sandbox.locator('[data-cy="qrcode-logo-025"] svg image').first()
        await expect(small).toBeAttached({ timeout: 8000 })

        const smallW = Number(await small.getAttribute('width'))
        const largeW = Number(await large.getAttribute('width'))
        expect(largeW).toBeGreaterThan(smallW)
    })
})

test.describe('OrigamQRCode — Prop foreground / background', () => {
    test('foreground colour propagates to the module <rect> fill', async ({ page }) => {
        await openVariant(page, 'Prop — foreground / background (theming)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-theme-brand"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Find any module rect (skip the background rect at x=0).
        const moduleRect = host.locator('svg rect').nth(1)
        const fill = await moduleRect.getAttribute('fill')
        // foreground prop = '#7c3aed' → that exact value reaches the SVG.
        expect(fill).toBe('#7c3aed')
    })

    test('background prop paints the surface rect', async ({ page }) => {
        await openVariant(page, 'Prop — foreground / background (theming)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-theme-dark"]').first()
        const bgRect = host.locator('svg rect').first()
        const fill = await bgRect.getAttribute('fill')
        expect(fill).toBe('#0f172a')
    })
})
