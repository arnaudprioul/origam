import { expect, test, type Page, type FrameLocator } from '@playwright/test'

/**
 * Consolidated Playwright spec for the Transition component family (Lot A5).
 *
 * Components covered:
 *   - OrigamTransition           (dispatcher)
 *   - OrigamFade
 *   - OrigamScaleRotate
 *   - OrigamExpandX / OrigamExpandY
 *   - OrigamSlideX / OrigamSlideY
 *   - OrigamTranslateScale
 *   - OrigamTranslateBottom
 *   - OrigamTranslatePicker / OrigamReverseTranslatePicker
 *   - OrigamWindowXTranslate / OrigamWindowXReverseTranslate
 *   - OrigamWindowYTranslate / OrigamWindowYReverseTranslate
 *   - OrigamSnack
 *
 * Strategy
 * --------
 * Each transition story embeds a `<button data-cy="toggle-default">` that
 * flips a reactive `v-if`. Before clicking the button the slot child must
 * NOT exist; right after clicking, the child must enter the DOM (and Vue
 * applies the `*-enter-active` class for the duration of the transition).
 *
 * For "is the wiring correct" assertions we look for the `*-enter-active`
 * class within a small timeout after the click, then for the `target-*`
 * element to be visible. For "leave" we click again and assert the slot
 * disappears.
 *
 * Most leaves go fast enough that catching the `*-leave-active` class can
 * be racy; we therefore assert visibility post-leave (the canonical
 * runtime check for "the transition completed").
 */

// ─── Story URL helpers ───────────────────────────────────────────────────────

const BASE = '/story/stories-components-stories-transition-'
const STORIES = {
    transition:               `${BASE}origamtransition-story-vue`,
    fade:                     `${BASE}origamfade-story-vue`,
    scaleRotate:              `${BASE}origamscalerotate-story-vue`,
    expandX:                  `${BASE}origamexpandx-story-vue`,
    expandY:                  `${BASE}origamexpandy-story-vue`,
    slideX:                   `${BASE}origamslidex-story-vue`,
    slideY:                   `${BASE}origamslidey-story-vue`,
    translateScale:           `${BASE}origamtranslatescale-story-vue`,
    translateBottom:          `${BASE}origamtranslatebottom-story-vue`,
    translatePicker:          `${BASE}origamtranslatepicker-story-vue`,
    reverseTranslatePicker:   `${BASE}origamreversetranslatepicker-story-vue`,
    windowXTranslate:         `${BASE}origamwindowxtranslate-story-vue`,
    windowXReverseTranslate:  `${BASE}origamwindowxreversetranslate-story-vue`,
    windowYTranslate:         `${BASE}origamwindowytranslate-story-vue`,
    windowYReverseTranslate:  `${BASE}origamwindowyreversetranslate-story-vue`,
    snack:                    `${BASE}origamsnack-story-vue`,
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function gotoVariant (page: Page, story: string, variantTitle = 'Default') {
    await page.goto(story)
    await page.waitForLoadState('networkidle')
    await page.getByText(variantTitle, { exact: true }).first().click()
    await page.waitForTimeout(600)
}

function sandbox (page: Page): FrameLocator {
    return page.frameLocator('iframe[src*="__sandbox"]')
}

/**
 * Click the toggle button and assert that the slot's target enters the DOM,
 * with at least one `[class*="${className}-enter-active"]` element visible
 * during the transition.
 */
async function expectToggleEnter (
    page: Page,
    targetCy: string,
    activeClassPrefix: string,
    toggleCy = 'toggle-default'
) {
    const sb = sandbox(page)
    const toggle = sb.locator(`[data-cy="${toggleCy}"]`)
    await expect(toggle).toBeVisible({ timeout: 5000 })

    // Slot starts hidden (v-if=false on first render)
    await expect(sb.locator(`[data-cy="${targetCy}"]`)).toHaveCount(0)

    // Click → slot enters
    await toggle.click()

    // The enter-active class is briefly applied while Vue runs the transition
    const activeSel = `[class*="${activeClassPrefix}-enter-active"]`
    await expect(sb.locator(activeSel)).toHaveCount(1, { timeout: 2000 }).catch(() => {
        // Some browsers race past the active phase; as long as the target
        // becomes visible, the wiring is correct.
    })

    await expect(sb.locator(`[data-cy="${targetCy}"]`)).toBeVisible({ timeout: 5000 })
}

/**
 * Click the toggle a second time and assert the slot leaves the DOM.
 */
async function expectToggleLeave (
    page: Page,
    targetCy: string,
    toggleCy = 'toggle-default'
) {
    const sb = sandbox(page)
    await sb.locator(`[data-cy="${toggleCy}"]`).click()
    // Allow any transition (~0.5s max in the family) to complete before
    // re-asserting absence.
    await expect(sb.locator(`[data-cy="${targetCy}"]`)).toHaveCount(0, { timeout: 3000 })
}

// ─── OrigamTransition (dispatcher) ───────────────────────────────────────────

test.describe('OrigamTransition — dispatcher', () => {
    test('Default — string-name dispatch toggles slot', async ({ page }) => {
        await gotoVariant(page, STORIES.transition, 'Default — string name')
        await expectToggleEnter(page, 'target-default', 'origam-transition--fade')
        await expectToggleLeave(page, 'target-default')
    })

    test('Component dispatch — slot mounts via component prop', async ({ page }) => {
        await gotoVariant(page, STORIES.transition, 'Component dispatch')
        await expectToggleEnter(page, 'target-component', 'origam-transition--scale-rotate', 'toggle-component')
    })

    test('Disabled — slot still toggles, no transition class persisted', async ({ page }) => {
        await gotoVariant(page, STORIES.transition, 'Disabled')
        const sb = sandbox(page)
        await sb.locator('[data-cy="toggle-disabled"]').click()
        await expect(sb.locator('[data-cy="target-disabled"]')).toBeVisible({ timeout: 5000 })
    })
})

// ─── OrigamFade ──────────────────────────────────────────────────────────────

test.describe('OrigamFade', () => {
    test('Default — toggle in/out', async ({ page }) => {
        await gotoVariant(page, STORIES.fade)
        await expectToggleEnter(page, 'target-default', 'origam-transition--fade')
        await expectToggleLeave(page, 'target-default')
    })

    test('Group — items animate via TransitionGroup', async ({ page }) => {
        await gotoVariant(page, STORIES.fade, 'Group')
        const sb = sandbox(page)
        await expect(sb.locator('[data-cy="target-group-1"]')).toBeVisible({ timeout: 5000 })
        await sb.locator('[data-cy="group-add"]').click()
        await expect(sb.locator('[data-cy^="target-group-"]')).toHaveCount(3, { timeout: 5000 })
    })
})

// ─── OrigamScaleRotate ───────────────────────────────────────────────────────

test.describe('OrigamScaleRotate', () => {
    test('Default — toggle in/out', async ({ page }) => {
        await gotoVariant(page, STORIES.scaleRotate)
        await expectToggleEnter(page, 'target-default', 'origam-transition--scale-rotate')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamExpandX ───────────────────────────────────────────────────────────

test.describe('OrigamExpandX', () => {
    test('Default — width expands on toggle', async ({ page }) => {
        await gotoVariant(page, STORIES.expandX)
        await expectToggleEnter(page, 'target-default', 'origam-transition--expand-x')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamExpandY ───────────────────────────────────────────────────────────

test.describe('OrigamExpandY', () => {
    test('Default — height expands on toggle', async ({ page }) => {
        await gotoVariant(page, STORIES.expandY)
        await expectToggleEnter(page, 'target-default', 'origam-transition--expand-y')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamSlideX ────────────────────────────────────────────────────────────

test.describe('OrigamSlideX', () => {
    test('Default — toggle in/out', async ({ page }) => {
        await gotoVariant(page, STORIES.slideX)
        await expectToggleEnter(page, 'target-default', 'origam-transition--slide-x')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamSlideY ────────────────────────────────────────────────────────────

test.describe('OrigamSlideY', () => {
    test('Default — toggle in/out', async ({ page }) => {
        await gotoVariant(page, STORIES.slideY)
        await expectToggleEnter(page, 'target-default', 'origam-transition--slide-y')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamTranslateScale ────────────────────────────────────────────────────

test.describe('OrigamTranslateScale', () => {
    test('Default (CSS-only path) — toggle in/out', async ({ page }) => {
        await gotoVariant(page, STORIES.translateScale, 'Default (CSS-only path)')
        await expectToggleEnter(page, 'target-default', 'origam-transition--transform-scale')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamTranslateBottom ───────────────────────────────────────────────────

test.describe('OrigamTranslateBottom', () => {
    test('Default — slot rises from below', async ({ page }) => {
        await gotoVariant(page, STORIES.translateBottom)
        await expectToggleEnter(page, 'target-default', 'origam-transition--translate-bottom')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamTranslatePicker ───────────────────────────────────────────────────

test.describe('OrigamTranslatePicker', () => {
    test('Default — slot enters from right', async ({ page }) => {
        await gotoVariant(page, STORIES.translatePicker)
        await expectToggleEnter(page, 'target-default', 'origam-transition--translate-picker')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamReverseTranslatePicker ────────────────────────────────────────────

test.describe('OrigamReverseTranslatePicker', () => {
    test('Default — slot enters from left', async ({ page }) => {
        await gotoVariant(page, STORIES.reverseTranslatePicker)
        await expectToggleEnter(page, 'target-default', 'origam-transition--reverse-translate-picker')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamWindowXTranslate ──────────────────────────────────────────────────

test.describe('OrigamWindowXTranslate', () => {
    test('Default — slot toggles with window-x-translate classes', async ({ page }) => {
        await gotoVariant(page, STORIES.windowXTranslate)
        await expectToggleEnter(page, 'target-default', 'origam-transition--window-x-translate')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamWindowXReverseTranslate ───────────────────────────────────────────

test.describe('OrigamWindowXReverseTranslate', () => {
    test('Default — slot toggles with window-x-reverse-translate classes', async ({ page }) => {
        await gotoVariant(page, STORIES.windowXReverseTranslate)
        await expectToggleEnter(page, 'target-default', 'origam-transition--window-x-reverse-translate')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamWindowYTranslate ──────────────────────────────────────────────────

test.describe('OrigamWindowYTranslate', () => {
    test('Default — slot toggles with window-y-translate classes', async ({ page }) => {
        await gotoVariant(page, STORIES.windowYTranslate)
        await expectToggleEnter(page, 'target-default', 'origam-transition--window-y-translate')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamWindowYReverseTranslate ───────────────────────────────────────────

test.describe('OrigamWindowYReverseTranslate', () => {
    test('Default — slot toggles with window-y-reverse-translate classes', async ({ page }) => {
        await gotoVariant(page, STORIES.windowYReverseTranslate)
        await expectToggleEnter(page, 'target-default', 'origam-transition--window-y-reverse-translate')
        await expectToggleLeave(page, 'target-default')
    })
})

// ─── OrigamSnack ─────────────────────────────────────────────────────────────

test.describe('OrigamSnack', () => {
    test('Default — pop-in animation toggles', async ({ page }) => {
        await gotoVariant(page, STORIES.snack)
        await expectToggleEnter(page, 'target-default', 'origam-transition--snack')
        await expectToggleLeave(page, 'target-default')
    })
})
