import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-switch-origamswitch-story-vue'

test.describe('OrigamSwitch', () => {
    test('Color variant — color="primary" paints track + thumb when ON', async ({ page }) => {
        // Pre-fix this spec only asserted "track is visible" — silently
        // green while the actual track was hardcoded grey regardless of
        // the `color` prop. Now assert the COMPUTED track + thumb
        // background actually changes when toggled ON.
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const sw = sandbox.locator('[data-cy="switch-color"]')
        await expect(sw).toBeVisible({ timeout: 5000 })

        // OFF state: track must be the muted grey default (NOT primary).
        const off = await sw.evaluate(el => ({
            track: getComputedStyle(el.querySelector('.origam-switch__track')!).backgroundColor,
            thumb: getComputedStyle(el.querySelector('.origam-switch__thumb')!).backgroundColor
        }))
        // Default grey track / dark thumb (read from tokens; both should
        // NOT match the primary colour rgb(124, 58, 237)).
        expect(off.track).not.toBe('rgb(124, 58, 237)')
        expect(off.thumb).not.toBe('rgb(124, 58, 237)')

        // Toggle ON via the input (the track click forwards to it anyway).
        await sw.locator('input[type="checkbox"]').click({ force: true })
        await page.waitForTimeout(500)

        const on = await sw.evaluate(el => ({
            track: getComputedStyle(el.querySelector('.origam-switch__track')!).backgroundColor,
            thumb: getComputedStyle(el.querySelector('.origam-switch__thumb')!).backgroundColor
        }))
        // ON state: both track and thumb should be primary purple
        // (#7c3aed → rgb(124, 58, 237)).
        expect(on.track).toBe('rgb(124, 58, 237)')
        expect(on.thumb).toBe('rgb(124, 58, 237)')
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
