/**
 * Theme Builder (/theming) — rich prop controls (round 2).
 *
 * Covers the 5 custom controls validated in
 * `packages/marketing/wireframes/theming-controls/*.html`: Color (intent
 * grid + custom), Rounded (named rungs + 4-corner editor), Elevation (named
 * rungs + depth/shadow composer), Border (composite width/style/color) and
 * Padding/Margin (scale chips + devtools-style box-model editor). Density
 * reuses the existing generic `origam-select` branch — not covered here.
 *
 * Prérequis : serveur marketing :3000 + base docs seedée (reuseExistingServer
 * dans la config marketing).
 * Run : cd packages/tests && node_modules/.bin/playwright test \
 *         --config=playwright.marketing.config.ts marketing-theming-controls
 */

import { expect, test, type Page } from '@playwright/test'

/** All prop groups render collapsed (<details>) by default — expand before interacting. */
async function expandGroup (page: Page, groupId: string): Promise<void> {
    const group = page.locator(`[data-cy="theming-prop-group-${groupId}"]`)
    const isOpen = await group.evaluate(el => el.hasAttribute('open'))
    if (!isOpen) {
        await group.locator('summary').click()
    }
}

/** The rich-control trigger is a toggle button — clicking it while already open would close it. */
async function ensureOpen (trigger: ReturnType<Page['locator']>): Promise<void> {
    const expanded = await trigger.getAttribute('aria-expanded')
    if (expanded !== 'true') {
        await trigger.click()
    }
}

async function generatedCode (page: Page): Promise<string> {
    const block = page.locator('[data-cy="theming-generated-code"]')
    await expect(block).toBeVisible()
    return (await block.innerText()).trim()
}

test.describe('Theme Builder · Color control (Btn)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await expandGroup(page, 'color')
    })

    test('picking a theme intent updates the trigger and marks the row edited', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-color-trigger"]')
        const initial = await trigger.locator('.tbc-trigger__value').innerText()

        await ensureOpen(trigger)
        await page.locator('label:has([data-cy="theming-prop-color-intent-secondary"])').click()

        await expect(trigger.locator('.tbc-trigger__value')).toHaveText(/secondary/i)
        expect(await trigger.locator('.tbc-trigger__value').innerText()).not.toBe(initial)
        await expect(page.locator('[data-cy="theming-prop-color"]')).toHaveClass(/tb-row--edited/)
    })

    test('per-row reset restores the DS default without touching other props', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-color-trigger"]')
        const initial = await trigger.locator('.tbc-trigger__value').innerText()

        await ensureOpen(trigger)
        await page.locator('label:has([data-cy="theming-prop-color-intent-danger"])').click()
        await expect(trigger.locator('.tbc-trigger__value')).toHaveText(/danger/i)

        await page.locator('[data-cy="theming-prop-color-reset"]').click()
        await expect(trigger.locator('.tbc-trigger__value')).toHaveText(initial)
        await expect(page.locator('[data-cy="theming-prop-color"]')).not.toHaveClass(/tb-row--edited/)
    })

    test('"Other…" reveals the custom colour picker field', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-color-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-color-custom-trigger"]').click()

        await expect(page.locator('[data-cy="theming-prop-color-custom-input"]')).toBeVisible()
    })
})

test.describe('Theme Builder · Rounded control (Btn)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await expandGroup(page, 'shape')
    })

    test('select exposes the real ROUNDED rungs plus "Other…"', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-rounded-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-rounded-select"]').click()

        const options = await page.locator('.origam-list-item').allInnerTexts()
        for (const label of ['None', 'X-Small', 'Small', 'Default', 'Medium', 'Large', 'X-Large', 'Shaped', 'Shaped invert', 'Other']) {
            expect(options.some(o => o.includes(label)), `missing option "${label}"`).toBe(true)
        }
    })

    test('picking a named rung updates the trigger label', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-rounded-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-rounded-select"]').click()
        await page.locator('.origam-list-item', { hasText: 'Large' }).first().click()

        await expect(trigger.locator('.tbc-trigger__value')).toHaveText(/large/i)
    })

    test('"Other…" reveals a 4-corner editor with a link toggle', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-rounded-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-rounded-select"]').click()
        await page.locator('.origam-list-item', { hasText: 'Other' }).first().click()

        await expect(page.locator('[data-cy="theming-prop-rounded-corner-topLeft"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-rounded-corner-topRight"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-rounded-corner-bottomLeft"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-rounded-corner-bottomRight"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-rounded-link"]')).toHaveAttribute('aria-pressed', 'true')
    })

    test('unlinking the corners and setting them independently serialises TL/TR/BL/BR into the generated code', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-rounded-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-rounded-select"]').click()
        await page.locator('.origam-list-item', { hasText: 'Other' }).first().click()

        await page.locator('[data-cy="theming-prop-rounded-link"]').click()
        await expect(page.locator('[data-cy="theming-prop-rounded-link"]')).toHaveAttribute('aria-pressed', 'false')

        const fill = async (cy: string, value: string): Promise<void> => {
            const input = page.locator(`[data-cy="${cy}"] input`)
            await input.fill(value)
            await input.blur()
        }
        await fill('theming-prop-rounded-corner-topLeft', '16')
        await fill('theming-prop-rounded-corner-topRight', '16')
        await fill('theming-prop-rounded-corner-bottomLeft', '0')
        await fill('theming-prop-rounded-corner-bottomRight', '0')

        const code = await generatedCode(page)
        expect(code).toContain('16px 16px 0px 0px')
    })
})

test.describe('Theme Builder · Elevation control (Btn)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await expandGroup(page, 'elevation')
    })

    test('"Other…" exposes both the depth slider (Option A) and the shadow composer (Option B)', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-elevation-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-elevation-select"]').click()
        await page.locator('.origam-list-item', { hasText: 'Other' }).first().click()

        await expect(page.locator('[data-cy="theming-prop-elevation-mode-depth"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-elevation-mode-shadow"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-elevation-depth"]')).toBeVisible()

        await page.locator('[data-cy="theming-prop-elevation-mode-shadow"]').click()
        await expect(page.locator('[data-cy="theming-prop-elevation-offset-x"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-elevation-offset-y"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-elevation-blur"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-elevation-spread"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-elevation-shadow-color"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-elevation-opacity"]')).toBeVisible()
    })

    test('setting a custom depth writes straight into `elevation` and updates the trigger label', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-elevation-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-elevation-select"]').click()
        await page.locator('.origam-list-item', { hasText: 'Other' }).first().click()

        const depthInput = page.locator('[data-cy="theming-prop-elevation-depth"] input')
        await depthInput.fill('18')
        await depthInput.blur()

        await expect(trigger.locator('.tbc-trigger__value')).toHaveText(/18/)
        const code = await generatedCode(page)
        expect(code).toMatch(/elevation:\s*(?:"18"|18)/)
    })
})

test.describe('Theme Builder · Border composite control (Btn)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await expandGroup(page, 'border')
    })

    test('popover groups width, style and colour under one composite control', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-border-trigger"]')
        await ensureOpen(trigger)

        const fieldsets = page.locator('[data-cy="theming-prop-border-popover"] fieldset')
        await expect(fieldsets).toHaveCount(4) // width select + custom-width fieldset (hidden until "Other…") + style + color
        await expect(page.locator('[data-cy="theming-prop-border-width-select"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-border-style-select"]')).toBeVisible()
    })

    test('editing all 3 facets composes a single summary label and paints the live preview', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-border-trigger"]')
        await ensureOpen(trigger)

        await page.locator('[data-cy="theming-prop-border-width-select"]').click()
        await page.locator('.origam-list-item', { hasText: 'Thick' }).first().click()

        await page.locator('[data-cy="theming-prop-border-style-select"]').click()
        await page.locator('.origam-list-item', { hasText: 'Dashed' }).first().click()

        await page.locator('label:has([data-cy="theming-prop-border-color-intent-danger"])').click()

        await expect(trigger.locator('.tbc-trigger__value')).toHaveText(/thick.*dashed.*danger/i)

        const liveBtn = page.locator('[data-cy="theming-live-btn-light"]')
        await expect(liveBtn).toHaveCSS('border-style', 'dashed')
    })

    test('per-side width editor is disabled with an explanatory tooltip (DS #215 gap)', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-border-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-border-width-select"]').click()
        await page.locator('.origam-list-item', { hasText: 'Other' }).first().click()

        const sideInput = page.locator('[data-cy="theming-prop-border-side-top"] input')
        await expect(sideInput).toBeDisabled()
    })
})

test.describe('Theme Builder · Padding / Margin box-model control (Blockquote)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.locator('[data-cy="theming-nav-search"] input').fill('blockquote')
        await page.locator('[data-cy="theming-nav-item-blockquote"]').click()
        await expandGroup(page, 'spacing')
    })

    test('scale chips write the utility-class string form and close the popover', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-padding-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-padding-scale-4"]').click()

        await expect(trigger.locator('.tbc-trigger__value')).toHaveText('4')
        const code = await generatedCode(page)
        expect(code).toMatch(/padding:\s*"4"/)
    })

    test('"Other…" reveals the link-mode segmented control (Tout lié / Vertical-Horizontal / Aucun lien)', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-padding-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-padding-custom-trigger"]').click()

        await expect(page.locator('[data-cy="theming-prop-padding-mode-linked"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-padding-mode-axis"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-padding-mode-unlinked"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-prop-padding-mode-axis"]')).toBeEnabled()
    })

    test('"Aucun lien" serialises edges in [top, left, bottom, right] order — NOT the CSS clockwise convention', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-padding-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-padding-custom-trigger"]').click()
        await page.locator('[data-cy="theming-prop-padding-mode-unlinked"]').click()

        const fill = async (cy: string, value: string): Promise<void> => {
            const input = page.locator(`[data-cy="${cy}"] input`)
            await input.fill(value)
            await input.blur()
        }
        await fill('theming-prop-padding-edge-top', '1')
        await fill('theming-prop-padding-edge-left', '2')
        await fill('theming-prop-padding-edge-bottom', '3')
        await fill('theming-prop-padding-edge-right', '4')

        const code = await generatedCode(page)
        expect(code).toContain('1px 2px 3px 4px')
    })

    test('margin\'s Vertical/Horizontal mode is disabled — formatMarginStylesVar has no case 2 (DS #216 gap)', async ({ page }) => {
        const trigger = page.locator('[data-cy="theming-prop-margin-trigger"]')
        await ensureOpen(trigger)
        await page.locator('[data-cy="theming-prop-margin-custom-trigger"]').click()

        await expect(page.locator('[data-cy="theming-prop-margin-mode-axis"]')).toBeDisabled()
        await expect(page.locator('[data-cy="theming-prop-margin-mode-linked"]')).toBeEnabled()
        await expect(page.locator('[data-cy="theming-prop-margin-mode-unlinked"]')).toBeEnabled()
    })
})
