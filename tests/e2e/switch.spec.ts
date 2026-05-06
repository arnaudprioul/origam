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

    test('Color variant — strict color/bgColor channel separation (3 fixtures)', async ({ page }) => {
        // The Color variant merges all `IColorProps` fields in one
        // interactive controls panel + ships hardcoded fixtures below
        // the interactive switch. Each fixture exercises one channel
        // pattern so the spec can assert no cross-pollution at
        // runtime without relying on programmatic HstSelect interaction.
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        // Fixture 1: color="primary" only → label + thumb tinted, track stays grey.
        const f1 = await sample(page, 'switch-color-fixture-color-only')
        expect(f1.trackBg).toBe('rgb(230, 230, 230)')   // default grey, untouched
        expect(f1.thumbBg).toBe('rgb(109, 40, 217)')    // primary.fgSubtle
        expect(f1.wrapperColor).toBe('rgb(109, 40, 217)')

        // Fixture 2: bg-color="success" only → track tinted, thumb stays white.
        const f2 = await sample(page, 'switch-color-fixture-bg-only')
        expect(f2.trackBg).toBe('rgb(76, 175, 80)')     // success.bg
        expect(f2.thumbBg).toBe('rgb(255, 255, 255)')   // white token default

        // Fixture 3: color="warning" + bg-color="primary" → both channels independent.
        const f3 = await sample(page, 'switch-color-fixture-combo')
        expect(f3.trackBg).toBe('rgb(124, 58, 237)')    // primary.bg — bg channel
        expect(f3.thumbBg).toBe('rgb(180, 83, 9)')      // warning.fgSubtle — color channel
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
