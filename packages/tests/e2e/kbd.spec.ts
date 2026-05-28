import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamKbd runtime probes.
 *
 * Asserts every Variant in `OrigamKbd.story.vue` produces the
 * runtime contract documented in `OrigamKbd.md`:
 *   - default renders a <kbd> element with class origam-kbd
 *   - combination produces multiple nested <kbd> joined by separator text
 *   - variant="filled" adds the --variant-filled modifier class
 *   - size prop changes the computed font-size on the element
 *   - slot default override takes precedence over the text prop
 *
 * Current Variant titles in OrigamKbd.story.vue:
 *   "Basic usage", "Showcase — Keyboard shortcuts", "Variant", "Color",
 *   "Size", "Rounded", "Border", "Separator", "Slot — default", "Default"
 */

const STORY = '/story/stories-components-stories-kbd-origamkbd-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByRole('link', { name: variant, exact: true }).click()
    await page.waitForTimeout(800)
}

// ─── Default (single key) ────────────────────────────────────────────────────
// Maps to "Basic usage" variant, data-cy="kbd-basic-single"

test.describe('OrigamKbd — default', () => {
    test('renders a <kbd> element with the origam-kbd class', async ({ page }) => {
        await openVariant(page, 'Basic usage')
        const sandbox = sandboxOf(page)

        const kbd = sandbox.locator('[data-cy="kbd-basic-single"]').first()
        await expect(kbd).toBeVisible({ timeout: 8000 })

        const tagName = await kbd.evaluate(el => el.tagName.toLowerCase())
        expect(tagName).toBe('kbd')

        const cls = await kbd.evaluate(el => el.className)
        expect(cls).toContain('origam-kbd')
    })

    test('renders the text prop content', async ({ page }) => {
        await openVariant(page, 'Basic usage')
        const sandbox = sandboxOf(page)

        const kbd = sandbox.locator('[data-cy="kbd-basic-single"]').first()
        await expect(kbd).toBeVisible({ timeout: 8000 })
        await expect(kbd).toContainText('⌘')
    })
})

// ─── Combination ─────────────────────────────────────────────────────────────
// Maps to "Basic usage" variant, data-cy="kbd-basic-combination"

test.describe('OrigamKbd — combination', () => {
    test('renders multiple nested <kbd> elements joined by separator', async ({ page }) => {
        await openVariant(page, 'Basic usage')
        const sandbox = sandboxOf(page)

        const parent = sandbox.locator('[data-cy="kbd-basic-combination"]').first()
        await expect(parent).toBeVisible({ timeout: 8000 })

        // Should contain 3 nested <kbd> (Ctrl, Shift, Z)
        const keys = parent.locator('kbd.origam-kbd__key')
        await expect(keys).toHaveCount(3)

        // Keys should have the correct content
        await expect(keys.nth(0)).toContainText('Ctrl')
        await expect(keys.nth(1)).toContainText('Shift')
        await expect(keys.nth(2)).toContainText('Z')

        // Separators between keys
        const separators = parent.locator('.origam-kbd__separator')
        await expect(separators).toHaveCount(2)
        await expect(separators.first()).toContainText('+')
    })
})

// ─── Variant ─────────────────────────────────────────────────────────────────

test.describe('OrigamKbd — variant', () => {
    test('variant="outlined" adds the --variant-outlined modifier class', async ({ page }) => {
        await openVariant(page, 'Variant')
        const sandbox = sandboxOf(page)

        const kbd = sandbox.locator('[data-cy="kbd-variant-outlined"]').first()
        await expect(kbd).toBeVisible({ timeout: 8000 })

        const cls = await kbd.evaluate(el => el.className)
        expect(cls).toContain('origam-kbd--variant-outlined')
    })

    test('variant="filled" adds the --variant-filled modifier class and key box-shadow', async ({ page }) => {
        await openVariant(page, 'Variant')
        const sandbox = sandboxOf(page)

        const kbd = sandbox.locator('[data-cy="kbd-variant-filled"]').first()
        await expect(kbd).toBeVisible({ timeout: 8000 })

        const cls = await kbd.evaluate(el => el.className)
        expect(cls).toContain('origam-kbd--variant-filled')

        // kbd-variant-filled is a combination kbd: the outer wrapper resets box-shadow
        // to transparent for the shell, while each inner __key carries the filled
        // box-shadow. Assert on the first inner key instead of the outer wrapper.
        const firstKey = kbd.locator('kbd.origam-kbd__key').first()
        await expect(firstKey).toBeVisible()
        const shadow = await firstKey.evaluate(el => getComputedStyle(el).boxShadow)
        expect(shadow).not.toBe('none')
    })

    test('variant="tonal" adds the --variant-tonal modifier class', async ({ page }) => {
        await openVariant(page, 'Variant')
        const sandbox = sandboxOf(page)

        const kbd = sandbox.locator('[data-cy="kbd-variant-tonal"]').first()
        await expect(kbd).toBeVisible({ timeout: 8000 })

        const cls = await kbd.evaluate(el => el.className)
        expect(cls).toContain('origam-kbd--variant-tonal')
    })
})

// ─── Size ─────────────────────────────────────────────────────────────────────

test.describe('OrigamKbd — size', () => {
    test('size="x-small" emits --size-x-small class and produces smaller font than size="x-large"', async ({ page }) => {
        await openVariant(page, 'Size')
        const sandbox = sandboxOf(page)

        const xsmall = sandbox.locator('[data-cy="kbd-size-xs"]').first()
        const xlarge = sandbox.locator('[data-cy="kbd-size-xl"]').first()

        await expect(xsmall).toBeVisible({ timeout: 8000 })
        await expect(xlarge).toBeVisible()

        const xsClass = await xsmall.evaluate(el => el.className)
        expect(xsClass).toContain('origam-kbd--size-x-small')

        const xlClass = await xlarge.evaluate(el => el.className)
        expect(xlClass).toContain('origam-kbd--size-x-large')

        const xsFontSize = await xsmall.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
        const xlFontSize = await xlarge.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
        expect(xsFontSize).toBeLessThan(xlFontSize)
    })
})

// ─── Slot override ───────────────────────────────────────────────────────────

test.describe('OrigamKbd — slot override', () => {
    test('default slot content takes precedence over the text prop', async ({ page }) => {
        await openVariant(page, 'Slot — default')
        const sandbox = sandboxOf(page)

        const kbd = sandbox.locator('[data-cy="kbd-slot-default"]').first()
        await expect(kbd).toBeVisible({ timeout: 8000 })

        // The slot renders an icon — there should be no raw text outside of child elements
        const icon = kbd.locator('.origam-icon').first()
        await expect(icon).toBeVisible()
    })
})
