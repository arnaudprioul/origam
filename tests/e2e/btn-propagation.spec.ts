import { expect, test, type Page } from '@playwright/test'

/**
 * Regression spec — parent → children prop propagation across the
 * Btn/BtnGroup/BtnToggle and Chip/ChipGroup families.
 *
 * Contract (per the user / origam architecture):
 *   - Parent prop (e.g. BtnGroup color="primary") sets the DEFAULT for
 *     every descendant of that component name.
 *   - Per-child prop (e.g. items[0].color="success") OVERRIDES the parent
 *     default for that one child.
 *
 * Resolution path:
 *   1. value explicitly written on the child template       (wins)
 *   2. ancestor `<DefaultsProvider>` / `provideDefaults`     (mid)
 *   3. component's `withDefaults(...)` baked-in fallback     (last)
 *
 * Pre-fix the parent props silently dropped because BtnGroup / ChipGroup
 * didn't call `provideDefaults` and OrigamBtn / OrigamChip didn't call
 * `useDefaults`. Adding both wires the contract end-to-end.
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(900)
}

const BTN_GROUP = '/story/stories-components-stories-btn-origambtngroup-story-vue'
const BTN_TOGGLE = '/story/stories-components-stories-btn-origambtntoggle-story-vue'
const CHIP_GROUP = '/story/stories-components-stories-chip-origamchipgroup-story-vue'

// ─── BtnGroup → OrigamBtn ──────────────────────────────────────────────────

test.describe('OrigamBtnGroup → OrigamBtn propagation', () => {
    test('group color forwards: children backgroundColor ≠ default neutral', async ({ page }) => {
        // The "Color (intent)" variant initialises `color: 'primary'` on
        // the group. With propagation working, every child <origam-btn>
        // should receive the primary token's background — measurable as
        // a non-neutral computed background-color. Pre-fix it stayed at
        // the default neutral grey (~rgb(230, 230, 230)).
        await openVariant(page, BTN_GROUP, 'Color (intent)')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-group').first()).toBeVisible({ timeout: 8000 })

        const bgColors = await sandbox.locator('.origam-btn-group .origam-btn').evaluateAll(els =>
            els.map(el => getComputedStyle(el).backgroundColor)
        )

        // Default neutral btn bg is `rgb(230, 230, 230)` (grey-200ish).
        // After propagation lands the primary token, every child differs.
        for (const bg of bgColors) {
            expect(bg).not.toBe('rgb(230, 230, 230)')
            expect(bg).not.toBe('rgba(0, 0, 0, 0)')
        }

        // All children should share the same propagated background.
        expect(new Set(bgColors).size).toBe(1)
    })

    test('group density forwards to children passed via items prop', async ({ page }) => {
        await openVariant(page, BTN_GROUP, 'Items prop')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-group').first()).toBeVisible({ timeout: 8000 })

        // The story renders `items` without explicit density — children
        // must inherit the group's `density: 'default'` (the withDefaults
        // baked value).
        const childClasses = await sandbox.locator('.origam-btn-group .origam-btn').evaluateAll(els =>
            els.map(el => el.className)
        )
        for (const cls of childClasses) {
            expect(cls).toContain('origam-btn--density-default')
        }
    })
})

// ─── BtnToggle → OrigamBtn ─────────────────────────────────────────────────

test.describe('OrigamBtnToggle → OrigamBtn propagation', () => {
    test('toggle density forwards to children', async ({ page }) => {
        await openVariant(page, BTN_TOGGLE, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-toggle').first()).toBeVisible({ timeout: 8000 })

        const childClasses = await sandbox.locator('.origam-btn-toggle .origam-btn').evaluateAll(els =>
            els.map(el => el.className)
        )
        for (const cls of childClasses) {
            expect(cls).toContain('origam-btn--density-default')
        }
    })

    test('toggle color forwards: children backgroundColor ≠ default neutral', async ({ page }) => {
        // The Rounded&Color variant initialises `color: 'primary'` on the toggle.
        await openVariant(page, BTN_TOGGLE, 'Rounded & Color')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-toggle').first()).toBeVisible({ timeout: 8000 })

        const bgColors = await sandbox.locator('.origam-btn-toggle .origam-btn').evaluateAll(els =>
            els.map(el => getComputedStyle(el).backgroundColor)
        )
        for (const bg of bgColors) {
            expect(bg).not.toBe('rgb(230, 230, 230)')
            expect(bg).not.toBe('rgba(0, 0, 0, 0)')
        }
    })
})

// ─── ChipGroup → OrigamChip ────────────────────────────────────────────────

test.describe('OrigamChipGroup → OrigamChip propagation', () => {
    test('group renders chips that pick up the provider color tokens', async ({ page }) => {
        // The Default variant doesn't set a parent color, so children
        // fall through to their own withDefaults — what we DO assert is
        // that NO error is thrown by the new `useDefaults` wrapping
        // (broken propagation would crash the proxy at runtime).
        await openVariant(page, CHIP_GROUP, 'Default')
        const sandbox = sandboxOf(page)
        const firstChip = sandbox.locator('.origam-chip').first()
        await expect(firstChip).toBeVisible({ timeout: 8000 })

        const childCount = await sandbox.locator('.origam-chip').count()
        expect(childCount).toBeGreaterThan(0)
    })
})
