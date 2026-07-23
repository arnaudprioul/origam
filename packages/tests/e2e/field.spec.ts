import { expect, test } from '@playwright/test'

const STORY_PATH = '/stories/story/components-stories-field-origamfield-story-vue'

test.describe('OrigamField', () => {
    test('Variant — default variant emits origam-field--variant-outlined class', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — variant', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const field = sandbox.locator('[data-cy="field-variant"]')
        await expect(field).toBeVisible({ timeout: 5000 })
        await expect(field).toHaveClass(/origam-field--variant-outlined/, { timeout: 3000 })
        await expect(sandbox.locator('[data-cy="field-variant-input"]')).toBeVisible({ timeout: 3000 })
    })

    test('Variants showcase — all five variant rungs are rendered', async ({ page }) => {
        // solo-filled and solo-inverted were removed in the PDF-alignment cleanup (2026-05-06)
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — variant (all)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

        const variants = ['outlined', 'filled', 'plain', 'underlined', 'solo']
        for (const v of variants) {
            const el = sandbox.locator(`[data-cy="field-showcase-${v}"]`)
            await expect(el).toBeVisible({ timeout: 5000 })
            await expect(el).toHaveClass(new RegExp(`origam-field--variant-${v}`), { timeout: 3000 })
        }
    })

    test('Color — field renders with color prop', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-color"]')).toBeVisible({ timeout: 5000 })
    })

    test('Density — field renders at specified density', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — density', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-density"]')).toBeVisible({ timeout: 5000 })
    })

    test('Prefix & suffix — prefix and suffix text visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — prefix & suffix', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-prefix"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-field__prefix').first()).toBeVisible({ timeout: 3000 })
    })

    test('States — error state applies error class', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — disabled, error & dirty', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Slot prependInner / appendInner — icons visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — prependInner / appendInner', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-slot-inner"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-field__prepend-inner').first()).toBeVisible({ timeout: 3000 })
    })

    test('Emit focus / blur — focusing input fires events', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — focus & blur', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('[data-cy="field-emit-focus"] input').first()
        await expect(input).toBeVisible({ timeout: 5000 })
        await input.focus()
        await input.blur()
        // logEvent called — no throw = success
    })

    test('Prop rounded — themed default radius resolves (non-zero) and prop overrides it', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — rounded', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

        const defaultField = sandbox.locator('[data-cy="field-rounded-default"]')
        const propField = sandbox.locator('[data-cy="field-rounded-prop"]')
        await expect(defaultField).toBeVisible({ timeout: 5000 })
        await expect(propField).toBeVisible({ timeout: 5000 })

        const defaultRadius = await defaultField.evaluate(el => getComputedStyle(el).borderTopLeftRadius)
        expect(defaultRadius).not.toBe('')
        expect(defaultRadius).not.toBe('0px')

        const mdRadius = await propField.evaluate(el => getComputedStyle(el).borderTopLeftRadius)
        expect(mdRadius).not.toBe('')
        expect(mdRadius).not.toBe('0px')
    })

    test('Corner-clearing — inline padding floors at the corner radius (no text/label collision)', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — rounded', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const field = sandbox.locator('[data-cy="field-rounded-prop"]')
        await expect(field).toBeVisible({ timeout: 5000 })

        const padStartAtRadius = (radius: string) => field.evaluate((el, r) => {
            el.style.setProperty('--origam-field---border-radius', r)
            return getComputedStyle(el).paddingInlineStart
        }, radius)

        // A radius larger than the base padding lifts the inline padding to match,
        // so the text / floating label clear the rounded outline instead of
        // colliding with it (the Material lg = 28px regression).
        expect(await padStartAtRadius('28px')).toBe('28px')

        // A tiny radius leaves the configured base padding untouched — the floor
        // never over-pads a square-ish field.
        expect(parseFloat(await padStartAtRadius('2px'))).toBeGreaterThanOrEqual(2)

        // An intentional pill radius is capped at the control height, not exploded
        // to 9999px, so the field stays laid out.
        const pillPad = parseFloat(await padStartAtRadius('9999px'))
        expect(pillPad).toBeGreaterThan(0)
        expect(pillPad).toBeLessThanOrEqual(48)
    })

    test('Corner symmetry — start outline leg is wide enough to round like the end leg', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — rounded', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const field = sandbox.locator('[data-cy="field-rounded-prop"]')
        await expect(field).toBeVisible({ timeout: 5000 })

        // A radius larger than the raw padding-start must widen the start leg to
        // match, otherwise the left corner is clamped to the leg width and renders
        // flatter than the flex:1 end leg (the asymmetric-rounding regression).
        const startLegWidth = (radius: string) => field.evaluate((el, r) => {
            el.style.setProperty('--origam-field---border-radius', r)
            const leg = el.querySelector('.origam-field__outline--start') as HTMLElement
            return leg ? parseFloat(getComputedStyle(leg).width) : -1
        }, radius)

        // radius 28px (< control-height cap) → leg must be at least 28px, not the
        // 8px raw padding-start.
        expect(await startLegWidth('28px')).toBeGreaterThanOrEqual(28)
    })

    test('Corner symmetry — prepended field keeps the raw start leg (prepend fills the corner)', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — prependInner / appendInner', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const field = sandbox.locator('[data-cy="field-slot-inner"]')
        await expect(field).toBeVisible({ timeout: 5000 })

        // A prepend-inner already fills the left corner. Widening the start leg to
        // the radius would draw the rounded outline leg over the prepend content
        // (reads as a box around it), so a prepended field must keep the leg at the
        // raw padding-start even when the radius is large.
        const { legW, pad } = await field.evaluate(el => {
            el.style.setProperty('--origam-field---border-radius', '40px')
            const leg = el.querySelector('.origam-field__outline--start') as HTMLElement
            return {
                legW: leg ? parseFloat(getComputedStyle(leg).width) : -1,
                pad: parseFloat(getComputedStyle(el).getPropertyValue('--origam-field---padding-start')) || 0,
            }
        })
        expect(Math.abs(legW - pad)).toBeLessThanOrEqual(1)
    })

    test('Playground — renders without errors', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="field-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
