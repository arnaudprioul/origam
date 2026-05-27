import { expect, test, type Page } from '@playwright/test'

/**
 * Color gradient transversal — runtime probes.
 *
 * Asserts the 3-format API exposed by `useColor` / `useBackgroundColor`
 * / `useTextColor` after the wave-4 gradient enrichment:
 *
 *   1. Raw CSS gradient string  → DOM `background-image` matches verbatim
 *   2. IGradient object (intents) → DOM `background-image` references
 *      the resolved `--origam-color__...` CSS variables
 *   3. Preset name `gradient-{slug}` → DOM `background-image` references
 *      the `--origam-gradient---{slug}` CSS variable
 *   4. Text gradient (color on a title) → DOM `background-clip: text`
 *      + `color: transparent`
 *
 * The story file is at
 *   stories/components/stories/ColorGradient/OrigamColorGradient.story.vue
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

const STORY = '/story/stories-components-stories-colorgradient-origamcolorgradient-story-vue'

// ─── Format 1 — raw CSS gradient string ─────────────────────────────────────

test.describe('Color gradient — raw CSS string', () => {
    test('linear-gradient(135deg, #ff0080, #7928ca) renders verbatim', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — raw CSS gradient string')
        const sandbox = sandboxOf(page)
        const btn = sandbox.locator('[data-cy="raw-string-btn-1"]').first()
        await expect(btn).toBeVisible({ timeout: 8000 })

        const bgImage = await btn.evaluate((el) => getComputedStyle(el).backgroundImage)
        expect(bgImage).toContain('linear-gradient')
        // The hex values get serialised by the browser to either hex or rgb —
        // assert on both representations.
        expect(bgImage.includes('rgb(255, 0, 128)') || bgImage.includes('#ff0080')).toBe(true)
        expect(bgImage.includes('rgb(121, 40, 202)') || bgImage.includes('#7928ca')).toBe(true)
    })

    test('radial-gradient renders as radial-gradient(...)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — raw CSS gradient string')
        const sandbox = sandboxOf(page)
        const btn = sandbox.locator('[data-cy="raw-string-btn-3"]').first()
        await expect(btn).toBeVisible({ timeout: 8000 })

        const bgImage = await btn.evaluate((el) => getComputedStyle(el).backgroundImage)
        expect(bgImage).toContain('radial-gradient')
    })
})

// ─── Format 2 — IGradient object ────────────────────────────────────────────

test.describe('Color gradient — IGradient object (intent stops)', () => {
    test('{ from: primary, to: success } emits intent CSS-var references', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — IGradient object (intents)')
        const sandbox = sandboxOf(page)
        const btn = sandbox.locator('[data-cy="object-btn-1"]').first()
        await expect(btn).toBeVisible({ timeout: 8000 })

        // The browser may resolve CSS vars to their underlying RGB values
        // — assert on the inline style attribute instead, which carries
        // the literal `var(...)` references emitted by the composable.
        const style = await btn.evaluate((el) => (el as HTMLElement).getAttribute('style') || '')
        expect(style).toContain('var(--origam-color__action--primary---bg)')
        expect(style).toContain('var(--origam-color__feedback--success---bg)')
        expect(style).toMatch(/linear-gradient\s*\(/)
    })

    test('stops array with 3 colors emits the matching number of positioned stops', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — IGradient object (intents)')
        const sandbox = sandboxOf(page)
        const btn = sandbox.locator('[data-cy="object-btn-4"]').first()
        await expect(btn).toBeVisible({ timeout: 8000 })

        const style = await btn.evaluate((el) => (el as HTMLElement).getAttribute('style') || '')
        expect(style).toContain('var(--origam-color__action--primary---bg) 0%')
        expect(style).toContain('#ffffff 50%')
        expect(style).toContain('var(--origam-color__feedback--success---bg) 100%')
    })
})

// ─── Format 3 — preset name ─────────────────────────────────────────────────

test.describe('Color gradient — preset name', () => {
    test('bg-color="gradient-sunset" resolves to var(--origam-gradient---sunset)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — preset names')
        const sandbox = sandboxOf(page)
        const btn = sandbox.locator('[data-cy="preset-btn-sunset"]').first()
        await expect(btn).toBeVisible({ timeout: 8000 })

        const style = await btn.evaluate((el) => (el as HTMLElement).getAttribute('style') || '')
        expect(style).toContain('var(--origam-gradient---sunset)')
        expect(style).toContain('background-image')
    })

    test('all 5 presets resolve to their respective CSS vars', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — preset names')
        const sandbox = sandboxOf(page)
        const presets = ['sunset', 'ocean', 'forest', 'fire', 'midnight']
        for (const p of presets) {
            const btn = sandbox.locator(`[data-cy="preset-btn-${p}"]`).first()
            await expect(btn).toBeVisible({ timeout: 8000 })
            const style = await btn.evaluate((el) => (el as HTMLElement).getAttribute('style') || '')
            expect(style).toContain(`var(--origam-gradient---${p})`)
        }
    })
})

// ─── Text gradient (background-clip: text) ──────────────────────────────────

test.describe('Color gradient — text gradient (background-clip)', () => {
    test('color={ from, to } on title produces background-clip: text + color: transparent', async ({ page }) => {
        await openVariant(page, STORY, 'Text gradient — background-clip: text')
        const sandbox = sandboxOf(page)
        const title = sandbox.locator('[data-cy="text-gradient-title"]').first()
        await expect(title).toBeVisible({ timeout: 8000 })

        const style = await title.evaluate((el) => (el as HTMLElement).getAttribute('style') || '')
        expect(style).toContain('background-clip: text')
        expect(style).toContain('color: transparent')
        // Intent CSS var references survive in the inline style.
        expect(style).toContain('var(--origam-color__action--primary---bg)')
        expect(style).toContain('var(--origam-color__feedback--success---bg)')

        // The computed value of `color` should resolve to transparent.
        const computedColor = await title.evaluate((el) => getComputedStyle(el).color)
        expect(computedColor).toMatch(/rgba?\(.*0\)/)
    })

    test('color="gradient-sunset" on label triggers the preset text gradient', async ({ page }) => {
        await openVariant(page, STORY, 'Text gradient — background-clip: text')
        const sandbox = sandboxOf(page)
        const label = sandbox.locator('[data-cy="text-gradient-label"]').first()
        await expect(label).toBeVisible({ timeout: 8000 })

        const style = await label.evaluate((el) => (el as HTMLElement).getAttribute('style') || '')
        expect(style).toContain('var(--origam-gradient---sunset)')
        expect(style).toContain('background-clip: text')
        expect(style).toContain('color: transparent')
    })
})
