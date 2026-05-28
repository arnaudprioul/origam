import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamQrCode — runtime probes for the SVG renderer, the matrix
 * regeneration under prop changes (errorCorrectionLevel, value,
 * rounded → per-module rx/ry, color, icon / image overlay) and the
 * ARIA contract.
 *
 * Variants are reached via their dedicated titles — never via the
 * HstSelect picker dropdown (custom DOM, brittle).
 */

const STORY = '/story/stories-components-stories-qrcode-origamqrcode-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, title: string): Promise<void> => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

test.describe('OrigamQrCode — Default (smoke)', () => {
    test('mounts and renders an inline <svg>', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="qrcode-default-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const svg = host.locator('svg').first()
        await expect(svg).toBeAttached()
    })

    test('emits at least one dark <rect> for a non-empty value', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-default-host"]').first()
        // Wait for the SVG to be injected (watchEffect runs async on mount).
        await expect(host.locator('svg').first()).toBeAttached({ timeout: 8000 })
        // 1 background rect + N module rects → ≥ 2.
        const rectCount = await host.locator('svg rect').count()
        expect(rectCount).toBeGreaterThan(1)
    })

    test('root carries role="img" and an aria-label', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-default-host"]').first()
        await expect(host).toHaveAttribute('role', 'img')
        const aria = await host.getAttribute('aria-label')
        expect(aria).not.toBeNull()
        expect(aria!.length).toBeGreaterThan(0)
    })

    test('root carries the ECC modifier class', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-default-host"]').first()
        await expect(host).toHaveClass(/origam-qr-code--ecc-m/)
    })
})

test.describe('OrigamQrCode — Prop value (parallel)', () => {
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

test.describe('OrigamQrCode — Prop errorCorrectionLevel', () => {
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

        await expect(sandbox.locator('[data-cy="qrcode-ecc-L"]').first()).toHaveClass(/origam-qr-code--ecc-l/)
        await expect(sandbox.locator('[data-cy="qrcode-ecc-M"]').first()).toHaveClass(/origam-qr-code--ecc-m/)
        await expect(sandbox.locator('[data-cy="qrcode-ecc-Q"]').first()).toHaveClass(/origam-qr-code--ecc-q/)
        await expect(sandbox.locator('[data-cy="qrcode-ecc-H"]').first()).toHaveClass(/origam-qr-code--ecc-h/)
    })
})

test.describe('OrigamQrCode — Prop rounded (per-module shape)', () => {
    test('rounded="" (0) omits rx attribute (square modules)', async ({ page }) => {
        await openVariant(page, 'Prop — rounded (per-module shape)')
        const sandbox = sandboxOf(page)
        // The story emits rounded=0 under the "none (0)" label.
        const firstRect = sandbox.locator('[data-cy="qrcode-rounded-none (0)"] svg rect').nth(1)
        await expect(firstRect).toBeAttached({ timeout: 8000 })
        const rx = await firstRect.getAttribute('rx')
        // null OR "0" — the encoder may omit the attribute when 0.
        expect([null, '0']).toContain(rx)
    })

    test('rounded="x-large" paints circle modules (rx="0.5")', async ({ page }) => {
        await openVariant(page, 'Prop — rounded (per-module shape)')
        const sandbox = sandboxOf(page)
        const firstRect = sandbox.locator('[data-cy="qrcode-rounded-x-large (circle)"] svg rect').nth(1)
        await expect(firstRect).toBeAttached({ timeout: 8000 })
        const rx = await firstRect.getAttribute('rx')
        expect(rx).toBe('0.5')
    })
})

test.describe('OrigamQrCode — Prop image (centre overlay)', () => {
    test('renders an <image> element when image prop is configured', async ({ page }) => {
        await openVariant(page, 'Prop — image (centred image overlay)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-image-string"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const img = host.locator('svg image').first()
        await expect(img).toBeAttached()
        const href = await img.getAttribute('href')
        expect(href).not.toBeNull()
        expect(href!.length).toBeGreaterThan(0)
    })

    test('accepts an ISrcObject (image = { src, alt, aspectRatio })', async ({ page }) => {
        await openVariant(page, 'Prop — image (centred image overlay)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="qrcode-image-object"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const img = host.locator('svg image').first()
        await expect(img).toBeAttached()
        const href = await img.getAttribute('href')
        expect(href).not.toBeNull()
        expect(href!.length).toBeGreaterThan(0)
    })
})

test.describe('OrigamQrCode — Prop icon (centre overlay)', () => {
    test('renders the OrigamIcon overlay in the centre block', async ({ page }) => {
        await openVariant(page, 'Prop — icon (centred OrigamIcon overlay)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-icon-mdi-star"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // The icon overlay lives as a sibling of the svg-host span, inside
        // the `.origam-qr-code__center` wrapper.
        const overlay = host.locator('.origam-qr-code__center').first()
        await expect(overlay).toBeAttached()
    })
})

test.describe('OrigamQrCode — Prop color / bgColor', () => {
    test('color propagates to the module <rect> fill', async ({ page }) => {
        await openVariant(page, 'Prop — color / bgColor (theming)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-theme-brand"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Find any module rect (skip the background rect at x=0).
        const moduleRect = host.locator('svg rect').nth(1)
        const fill = await moduleRect.getAttribute('fill')
        // color prop = '#7c3aed' → that exact value reaches the SVG.
        expect(fill).toBe('#7c3aed')
    })

    test('bgColor paints the surface rect', async ({ page }) => {
        await openVariant(page, 'Prop — color / bgColor (theming)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="qrcode-theme-dark"]').first()
        const bgRect = host.locator('svg rect').first()
        const fill = await bgRect.getAttribute('fill')
        expect(fill).toBe('#0f172a')
    })
})
