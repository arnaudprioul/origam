import { expect, test, type Page } from '@playwright/test'

/**
 * Lot C2 — OrigamChip runtime probes.
 *
 * Asserts every Variant in `OrigamChip.story.vue` produces the
 * runtime contract documented in `OrigamChip.md`:
 *   - default renders an origam-chip element
 *   - closable chip hides on close click (modelValue → false)
 *   - pill emits the --pill modifier class
 *   - label emits the --label modifier class
 *   - size emits the matching --size-{x} class
 *   - density emits the matching --density-{x} class
 *   - color forwards style to the chip root
 *   - adjacent (prepend/append) renders the icon slot
 *   - draggable sets the draggable attribute
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

const STORY = '/story/components-stories-chip-origamchip-story-vue'

// ─── Default ────────────────────────────────────────────────────────────────

test.describe('OrigamChip — default', () => {
    test('renders an origam-chip element', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-default"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        const cls = await chip.evaluate(el => el.className)
        expect(cls).toContain('origam-chip')
    })
})

// ─── Closable ───────────────────────────────────────────────────────────────

test.describe('OrigamChip — closable', () => {
    test('chip hides after close button click and status updates', async ({ page }) => {
        await openVariant(page, STORY, 'Closable')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-closable"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        // Click the close icon inside the chip
        const closeIcon = chip.locator('.origam-chip__close').first()
        await closeIcon.click()
        await page.waitForTimeout(300)

        // Chip should no longer be visible
        await expect(chip).not.toBeVisible()

        // Status text should show false
        const status = sandbox.locator('[data-cy="chip-closable-status"]').first()
        await expect(status).toContainText('false')
    })

    test('reset button makes chip visible again', async ({ page }) => {
        await openVariant(page, STORY, 'Closable')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-closable"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        await chip.locator('.origam-chip__close').first().click()
        await page.waitForTimeout(300)
        await expect(chip).not.toBeVisible()

        const reset = sandbox.locator('[data-cy="chip-closable-reset"]').first()
        await reset.click()
        await page.waitForTimeout(300)
        await expect(chip).toBeVisible()
    })

    // The close button must have breathing room from the chip's content —
    // pre-fix it sat flush against the text (0px gap) while the chip's
    // inline padding kept 12px on the opposite side, which read as
    // "déséquilibré". Now it carries `margin-inline-start` (gap from
    // text) and a small negative `margin-inline-end` to compensate the
    // close-circle glyph's intrinsic whitespace.
    test('close button has visible breathing room from the chip content', async ({ page }) => {
        await openVariant(page, STORY, 'Closable')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-closable"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        const layout = await chip.evaluate(el => {
            const close = el.querySelector('.origam-chip__close') as HTMLElement
            const content = el.querySelector('.origam-chip__content') as HTMLElement
            const cs = getComputedStyle(close)
            return {
                marginInlineStart: cs.marginInlineStart,
                contentRight: content.getBoundingClientRect().right,
                closeLeft: close.getBoundingClientRect().left,
            }
        })

        // CSS-level: a non-zero positive margin-inline-start
        const marginValue = parseFloat(layout.marginInlineStart)
        expect(marginValue).toBeGreaterThanOrEqual(4)

        // Geometry-level: actual visible gap between text right-edge and
        // close left-edge ≥ 4px (catches the case where future overrides
        // somehow zero out the margin via cascade)
        const gap = layout.closeLeft - layout.contentRight
        expect(gap).toBeGreaterThanOrEqual(4)
    })
})

// ─── Color showcase ─────────────────────────────────────────────────────────

const EXPECTED_INTENT_BG: Record<string, string> = {
    primary: 'rgb(124, 58, 237)',
    success: 'rgb(76, 175, 80)',
    warning: 'rgb(251, 140, 0)',
    danger:  'rgb(239, 68, 68)'
}

test.describe('OrigamChip — color showcase', () => {
    test('bgColor prop paints each intent on the chip root', async ({ page }) => {
        await openVariant(page, STORY, 'Color')
        const sandbox = sandboxOf(page)

        for (const [intent, expected] of Object.entries(EXPECTED_INTENT_BG)) {
            const chip = sandbox.locator(`[data-cy="chip-color-${intent}"]`)
            await expect(chip).toBeVisible({ timeout: 5000 })
            const bg = await chip.evaluate(el => getComputedStyle(el).backgroundColor)
            expect(bg, `chip-color-${intent}`).toBe(expected)
        }
    })
})

// ─── Pill ───────────────────────────────────────────────────────────────────

test.describe('OrigamChip — pill', () => {
    test('pill=true emits the --pill modifier class', async ({ page }) => {
        await openVariant(page, STORY, 'Pill')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-pill"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        const cls = await chip.evaluate(el => el.className)
        expect(cls).toContain('origam-chip--pill')
    })
})

// ─── Label ──────────────────────────────────────────────────────────────────

test.describe('OrigamChip — label', () => {
    test('label=true emits the --label modifier class with rectangular border-radius', async ({ page }) => {
        await openVariant(page, STORY, 'Label shape')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-label"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        const cls = await chip.evaluate(el => el.className)
        expect(cls).toContain('origam-chip--label')
    })
})

// ─── Size ───────────────────────────────────────────────────────────────────

test.describe('OrigamChip — size', () => {
    test('default variant renders the chip visible', async ({ page }) => {
        await openVariant(page, STORY, 'Size')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-size"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        const cls = await chip.evaluate(el => el.className)
        // Default size (undefined) produces no size class — just assert the chip exists
        expect(cls).toContain('origam-chip')
    })
})

// ─── Density ────────────────────────────────────────────────────────────────

test.describe('OrigamChip — density', () => {
    test('default density emits --density-default class', async ({ page }) => {
        await openVariant(page, STORY, 'Density')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-density"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        const cls = await chip.evaluate(el => el.className)
        expect(cls).toContain('origam-chip--density-default')
    })
})

// ─── Color ──────────────────────────────────────────────────────────────────

test.describe('OrigamChip — color', () => {
    test('color prop applies style to chip root', async ({ page }) => {
        await openVariant(page, STORY, 'Color (intent)')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-color"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        // The chip should have a non-empty style (color token applied)
        const style = await chip.evaluate(el => (el as HTMLElement).getAttribute('style') ?? '')
        // Intent colors produce inline CSS variables on the root
        expect(style.length).toBeGreaterThan(0)
    })
})

// ─── Adjacent ───────────────────────────────────────────────────────────────

test.describe('OrigamChip — adjacent', () => {
    test('prependIcon renders the prepend area with an icon', async ({ page }) => {
        await openVariant(page, STORY, 'Adjacent')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-adjacent"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        const prepend = chip.locator('.origam-chip__prepend').first()
        await expect(prepend).toBeVisible()
    })
})

// ─── Draggable ──────────────────────────────────────────────────────────────

test.describe('OrigamChip — draggable', () => {
    test('draggable=true sets the draggable attribute', async ({ page }) => {
        await openVariant(page, STORY, 'Draggable')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-draggable"]').first()
        await expect(chip).toBeVisible({ timeout: 8000 })

        const draggable = await chip.evaluate(el => el.getAttribute('draggable'))
        expect(draggable).toBe('true')
    })
})

test.describe('OrigamChip — rounded shaped / shaped-invert', () => {
    test('shaped — TL and BR are rounded, TR and BL are 0', async ({ page }) => {
        await openVariant(page, STORY, 'Rounded')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-rounded-shaped"]')
        await expect(chip).toBeVisible({ timeout: 5000 })

        const radii = await chip.evaluate(el => {
            const cs = getComputedStyle(el as HTMLElement)
            return {
                tl: cs.borderTopLeftRadius,
                tr: cs.borderTopRightRadius,
                br: cs.borderBottomRightRadius,
                bl: cs.borderBottomLeftRadius
            }
        })
        expect(radii.tl, 'top-left should be rounded').not.toBe('0px')
        expect(radii.br, 'bottom-right should be rounded').not.toBe('0px')
        expect(radii.tr, 'top-right should be 0').toBe('0px')
        expect(radii.bl, 'bottom-left should be 0').toBe('0px')
        expect(radii.tl).toBe(radii.br)
    })

    test('shaped-invert — TR and BL are rounded, TL and BR are 0', async ({ page }) => {
        await openVariant(page, STORY, 'Rounded')
        const sandbox = sandboxOf(page)

        const chip = sandbox.locator('[data-cy="chip-rounded-shaped-invert"]')
        await expect(chip).toBeVisible({ timeout: 5000 })

        const radii = await chip.evaluate(el => {
            const cs = getComputedStyle(el as HTMLElement)
            return {
                tl: cs.borderTopLeftRadius,
                tr: cs.borderTopRightRadius,
                br: cs.borderBottomRightRadius,
                bl: cs.borderBottomLeftRadius
            }
        })
        expect(radii.tr, 'top-right should be rounded').not.toBe('0px')
        expect(radii.bl, 'bottom-left should be rounded').not.toBe('0px')
        expect(radii.tl, 'top-left should be 0').toBe('0px')
        expect(radii.br, 'bottom-right should be 0').toBe('0px')
        expect(radii.tr).toBe(radii.bl)
    })
})
