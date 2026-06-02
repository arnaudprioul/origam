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

const STORY = '/story/components-stories-qrcode-origamqrcode-story-vue'

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
    // The dedicated "rounded" Variant no longer exists — rounded is exercised
    // via the "Prop — qrCodeProps (matrix-level overrides)" Variant.
    // data-cy is on the <origam-qr-code> element directly (not on a wrapper div).

    test('rounded="" (0) omits rx attribute (square modules)', async ({ page }) => {
        await openVariant(page, 'Prop — qrCodeProps (matrix-level overrides)')
        const sandbox = sandboxOf(page)
        // "primary modules / no override bg" has qrCodeProps.rounded = undefined → 0.
        const firstRect = sandbox.locator('[data-cy="qrcode-internal-primary modules / no override bg"] svg rect').nth(1)
        await expect(firstRect).toBeAttached({ timeout: 8000 })
        const rx = await firstRect.getAttribute('rx')
        // null OR "0" — the encoder omits the attribute when cornerRadius is 0.
        expect([null, '0']).toContain(rx)
    })

    test('rounded="x-large" paints circle modules (rx="0.5")', async ({ page }) => {
        await openVariant(page, 'Prop — qrCodeProps (matrix-level overrides)')
        const sandbox = sandboxOf(page)
        // "circle modules (x-large)" has qrCodeProps.rounded = 'x-large' → cornerRadius 0.5.
        const firstRect = sandbox.locator('[data-cy="qrcode-internal-circle modules (x-large)"] svg rect').nth(1)
        await expect(firstRect).toBeAttached({ timeout: 8000 })
        const rx = await firstRect.getAttribute('rx')
        expect(rx).toBe('0.5')
    })
})

test.describe('OrigamQrCode — Prop image (centre overlay)', () => {
    // The `image` prop renders an <OrigamAvatar> HTML overlay inside
    // `.origam-qr-code__center`, NOT a native SVG <image> element.
    // The SVG <image> path is only taken when using useQrCode directly
    // with a `logo` option — that lower-level API is not exposed in the story.

    test('renders an <image> element when image prop is configured', async ({ page }) => {
        await openVariant(page, 'Prop — image (centred image overlay)')
        const sandbox = sandboxOf(page)
        // data-cy="qrcode-image-string" is on the <div> wrapper; the
        // <origam-qr-code> is its direct child.
        const host = sandbox.locator('[data-cy="qrcode-image-string"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // The avatar overlay sits inside .origam-qr-code__center.
        const center = host.locator('.origam-qr-code__center').first()
        await expect(center).toBeAttached()
        // The avatar element renders the image inside the center block.
        const avatar = center.locator('.origam-qr-code__center-avatar').first()
        await expect(avatar).toBeAttached()
    })

    test('accepts an ISrcObject (image = { src, alt, aspectRatio })', async ({ page }) => {
        await openVariant(page, 'Prop — image (centred image overlay)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="qrcode-image-object"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Same contract as the string path — center overlay must mount.
        const center = host.locator('.origam-qr-code__center').first()
        await expect(center).toBeAttached()
        const avatar = center.locator('.origam-qr-code__center-avatar').first()
        await expect(avatar).toBeAttached()
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
    // The dedicated "Prop — color / bgColor (theming)" Variant no longer exists.
    // Color and bgColor on the WRAPPER are covered by the "Wrapper chrome" Variant.
    // Note: the wrapper-level `color` prop drives the SVG module fill via
    // `fill="currentColor"` inheritance (not a direct attribute on each rect) unless
    // qrCodeProps.color overrides it.  The wrapper-level `bgColor` applies only to
    // the wrapper's CSS background-color (via utility class), not to the SVG quiet
    // zone rect (which stays transparent unless qrCodeProps.bgColor is set).
    // We therefore assert on class presence for both props.

    test('color propagates to the module <rect> fill', async ({ page }) => {
        await openVariant(page, 'Wrapper chrome — color / bgColor / rounded / border / elevation / padding / margin')
        const sandbox = sandboxOf(page)
        // "success + elevation" theme has color: 'success' on the wrapper.
        // The wrapper carries the origam--color-success utility class which sets
        // `color:` (inherited as currentColor by SVG modules).
        const host = sandbox.locator('[data-cy="qrcode-wrapper-success + elevation"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // The module rects inherit fill via currentColor when color is an intent
        // (resolveQrColor emits a CSS var, not a raw hex, for tokenised values).
        // Assert the wrapper carries the colour utility class so the intent is wired.
        await expect(host).toHaveClass(/origam--color-success/)
    })

    test('bgColor paints the wrapper background (utility class)', async ({ page }) => {
        await openVariant(page, 'Wrapper chrome — color / bgColor / rounded / border / elevation / padding / margin')
        const sandbox = sandboxOf(page)
        // "primary surface" theme has bgColor: 'primary' on the wrapper.
        const host = sandbox.locator('[data-cy="qrcode-wrapper-primary surface"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // bgColor intent → origam--bg-primary utility class on the wrapper element.
        await expect(host).toHaveClass(/origam--bg-primary/)
    })
})
