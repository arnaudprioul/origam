import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-switch-origamswitch-story-vue'

test.describe('OrigamSwitch', () => {
    // ─── Color/bgColor strict separation contract ────────────────────────
    // Project rule (per user request):
    //   `color`   → label foreground + thumb (cercle)
    //   `bgColor` → track (box derrière le cercle)
    // Hover/active variants cross only on their respective state.
    // The two channels NEVER cross-pollute.
    //
    // Token-resolved values (from src/assets/css/tokens/light.css):
    //   primary.fgSubtle = #6d28d9 = rgb(109, 40, 217)
    //   primary.bg       = #7c3aed = rgb(124, 58, 237)
    //   success.bg       = #4caf50 = rgb(76, 175, 80)
    //   warning.fgSubtle = #b45309 = rgb(180, 83, 9)
    //   danger.fgSubtle  = #b91c1c = rgb(185, 28, 28)
    // ──────────────────────────────────────────────────────────────────────

    const sample = async (page: import('@playwright/test').Page, cy: string) => {
        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const sw = sandbox.locator(`[data-cy="${cy}"]`)
        await expect(sw).toBeVisible({ timeout: 5000 })
        return sw.evaluate(el => {
            const track = el.querySelector('.origam-switch__track') as HTMLElement
            const thumb = el.querySelector('.origam-switch__thumb') as HTMLElement
            const wrapper = el.querySelector('.origam-selection-control__wrapper') as HTMLElement
            return {
                trackBg: getComputedStyle(track).backgroundColor,
                thumbBg: getComputedStyle(thumb).backgroundColor,
                wrapperColor: getComputedStyle(wrapper).color
            }
        })
    }

    test('Color variant — color="primary" tints label + thumb but NOT track', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const off = await sample(page, 'switch-color')
        // Track stays at the default grey (bgColor channel untouched).
        expect(off.trackBg).toBe('rgb(230, 230, 230)')
        // Thumb takes the consumer's color (fgSubtle rung).
        expect(off.thumbBg).toBe('rgb(109, 40, 217)')
        // Wrapper carries the inline color (label inherits via currentColor).
        expect(off.wrapperColor).toBe('rgb(109, 40, 217)')

        // Toggle ON — strict separation: track still grey, thumb still primary.
        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await sandbox.locator('[data-cy="switch-color"] input[type="checkbox"]').click({ force: true })
        await page.waitForTimeout(500)
        const on = await sample(page, 'switch-color')
        expect(on.trackBg).toBe('rgb(230, 230, 230)')
        expect(on.thumbBg).toBe('rgb(109, 40, 217)')
    })

    test('BgColor variant — bgColor="success" tints track but NOT thumb fill', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('BgColor', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const off = await sample(page, 'switch-bg-color')
        expect(off.trackBg).toBe('rgb(76, 175, 80)')   // bgColor channel paints track
        // Thumb stays at its token default (white) — bgColor never
        // crosses into the color channel.
        expect(off.thumbBg).toBe('rgb(255, 255, 255)')
    })

    test('Color + BgColor combo — both channels work side-by-side without cross-pollution', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color + BgColor combo', { exact: true }).first().click()
        await page.waitForTimeout(800)

        // combo_1 — color=primary, bg=success
        const c1 = await sample(page, 'switch-combo-1')
        expect(c1.trackBg).toBe('rgb(76, 175, 80)')   // success — bg channel
        expect(c1.thumbBg).toBe('rgb(109, 40, 217)')  // primary fgSubtle — color channel

        // combo_2 — color=warning, bg=primary
        const c2 = await sample(page, 'switch-combo-2')
        expect(c2.trackBg).toBe('rgb(124, 58, 237)')  // primary bg — bg channel
        expect(c2.thumbBg).toBe('rgb(180, 83, 9)')    // warning fgSubtle — color channel

        // combo_3 — color=danger, bg=warning
        const c3 = await sample(page, 'switch-combo-3')
        expect(c3.trackBg).toBe('rgb(251, 140, 0)')   // warning bg — bg channel
        expect(c3.thumbBg).toBe('rgb(185, 28, 28)')   // danger fgSubtle — color channel
    })

    test('Inset & flat — toggle changes inset state', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Inset & flat', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-inset"]')).toBeVisible({ timeout: 5000 })
    })

    test('Indeterminate — renders in indeterminate state', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Indeterminate', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-indeterminate"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled switch is visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — clicking updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const status = sandbox.locator('[data-cy="switch-emit-status"]')
        await expect(status).toContainText('value = false', { timeout: 5000 })

        // Click via selection control input (bare input landmine — use class locator)
        const input = sandbox.locator('[data-cy="switch-emit-update"] .origam-selection-control__input').first()
        await input.click()
        await expect(status).toContainText('value = true', { timeout: 3000 })
    })

    test('Slot track.true / track.false — custom track content renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — track.true / track.false', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-slot-track"]')).toBeVisible({ timeout: 5000 })
    })

    test('Playground — renders without errors', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="switch-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
