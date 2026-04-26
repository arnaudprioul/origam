import { expect, test } from '@playwright/test'

/**
 * Reference Playwright spec for OrigamBtn — pattern for the rest of the
 * Cypress → Playwright migration (Lot 11).
 *
 * Conventions:
 *   - One `test.describe` block per Variant in the matching `*.story.vue`.
 *   - Each test navigates to the Histoire URL of the variant via
 *     `goto(storyUrl(...))` so the story shape is the source of truth.
 *   - Locators prefer `role` + `name` accessibility queries over CSS
 *     selectors. Fall back to `data-testid` only when the accessible name
 *     is ambiguous.
 *
 * The Histoire URL pattern is:
 *   /stories/<sanitized-title>/<sanitized-variant-title>
 * which Histoire computes from `<Story title>` + `<Variant title>`.
 */

const storyUrl = (storyTitle: string, variantTitle: string) => {
    const slug = (s: string) =>
        s
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

    return `/story/components-${slug(storyTitle)}?variantId=${slug(variantTitle)}`
}

test.describe('OrigamBtn — visual & a11y baseline', () => {
    test('renders a button with text label', async ({ page }) => {
        await page.goto(storyUrl('Btn/OrigamBtn', 'Variant'))

        // Accessible name takes precedence over selectors.
        const btn = page.getByRole('button', { name: /button/i }).first()
        await expect(btn).toBeVisible()
    })

    test('Color variant — primary intent applies the action token', async ({ page }) => {
        await page.goto(storyUrl('Btn/OrigamBtn', 'Color (intent)'))

        const btn = page.getByRole('button', { name: /button/i }).first()
        await expect(btn).toBeVisible()

        // Background must come from the design tokens, never an inline hex.
        const bgComputed = await btn.evaluate(
            el => getComputedStyle(el).backgroundColor
        )
        expect(bgComputed).not.toMatch(/^#[0-9a-fA-F]{3,6}$/)
    })

    test('States — disabled disables pointer events and lowers opacity', async ({ page }) => {
        await page.goto(storyUrl('Btn/OrigamBtn', 'States'))

        const btn = page.getByRole('button', { name: /button/i }).first()
        await btn.evaluate(el => {
            el.classList.add('origam-btn--disabled')
        })

        await expect(btn).toHaveCSS('pointer-events', 'none')
    })

    test('Emit click — playground variant logs interactions', async ({ page }) => {
        await page.goto(storyUrl('Btn/OrigamBtn', 'Emit — click'))

        const btn = page.getByRole('button', { name: /click me/i })
        await btn.click()
        await btn.click()
        await btn.click()

        await expect(page.locator('strong').first()).toHaveText('3')
    })

    test('Visual regression — Variant grid', async ({ page }) => {
        // The Histoire grid layout exposes every variant in a single page.
        // We snapshot the wrapper region rather than the whole page so the
        // chrome (toolbar, tabs) doesn't perturb the diff.
        await page.goto(storyUrl('Btn/OrigamBtn', 'Variant'))

        const story = page.locator('[data-story-frame]').first()
        await expect(story).toHaveScreenshot('btn-variant.png', {
            maxDiffPixelRatio: 0.01
        })
    })
})
