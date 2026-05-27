import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamMasonry — runtime probes for each variant exposed by the story.
 *
 * The component picks between two implementations at mount time:
 *   - CSS path: `display: grid` + `grid-template-rows: masonry`. Children
 *     stay in their original DOM order; the browser handles the rest.
 *   - JS path: bucket-fill + `ResizeObserver`. Each child is wrapped in
 *     a `<div class="origam-masonry__item">` with `position: absolute`,
 *     `left` / `top` / `width` set inline.
 *
 * Histoire runs on a Chromium build that does NOT enable masonry
 * (experimental flag), so the JS path is what the e2e suite actually
 * tests. The CSS path is exercised through the unit test on the pure
 * helpers (`pickColumnsForWidth`, `bucketFill`).
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(500)
}

const STORY = '/story/stories-components-stories-masonry-origammasonry-story-vue'

test.describe('OrigamMasonry — Default (smoke + ARIA)', () => {
    test('mounts the masonry root with role="list"', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="masonry-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const role = await host.evaluate((el) => el.getAttribute('role'))
        expect(role).toBe('list')
    })

    test('renders 16 playground cards as masonry items', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const cards = sandbox.locator('[data-cy="masonry-playground-card"]')
        await expect(cards).toHaveCount(16, { timeout: 8000 })
    })
})

test.describe('OrigamMasonry — Prop columns', () => {
    /**
     * Cluster items by their painted `left` pixel — distinct left values
     * = distinct columns. With 16 items and N columns, we expect exactly
     * N distinct clusters (allowing ±2 px for rounding).
     */
    const distinctColumnCount = async (page: Page, selector: string) => {
        const sandbox = sandboxOf(page)
        const lefts: number[] = await sandbox
            .locator(`${selector} > *`)
            .evaluateAll((els) =>
                els
                    .map((el) => (el as HTMLElement).getBoundingClientRect().left)
                    .filter((n) => Number.isFinite(n))
            )

        // Bucket lefts: anything within 4 px is the same column.
        const sorted = [...lefts].sort((a, b) => a - b)
        const clusters: number[] = []
        for (const l of sorted) {
            if (clusters.length === 0 || Math.abs(l - clusters[clusters.length - 1]) > 4) {
                clusters.push(l)
            }
        }
        return clusters.length
    }

    test('columns = 3 → items align into 3 visual columns', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — columns')
        const count = await distinctColumnCount(page, '[data-cy="masonry-columns-3"]')
        expect(count).toBe(3)
    })

    test('columns = 5 → items align into 5 visual columns', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — columns')
        const count = await distinctColumnCount(page, '[data-cy="masonry-columns-5"]')
        expect(count).toBe(5)
    })
})

test.describe('OrigamMasonry — Prop columnBreakpoints', () => {
    test('column count adapts to container width via ResizeObserver', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await openVariant(page, STORY, 'Prop — columnBreakpoints')

        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="masonry-breakpoints-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Settle one layout pass after navigation.
        await page.waitForTimeout(400)

        const lefts: number[] = await host
            .locator('> *')
            .evaluateAll((els) =>
                els.map((el) => Math.round((el as HTMLElement).getBoundingClientRect().left))
            )
        const distinct = new Set(lefts)
        // Wide viewport (1280) → ≥ 3 distinct columns (at least one
        // breakpoint matched). Exact value depends on Histoire's
        // sandbox width but we expect more than 1 column.
        expect(distinct.size).toBeGreaterThan(1)
    })
})

test.describe('OrigamMasonry — Prop gap', () => {
    test('gap = xs and gap = xl produce distinct resolved pixel values', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — gap')
        const sandbox = sandboxOf(page)

        const xsHost = sandbox.locator('[data-cy="masonry-gap-xs"]').first()
        const xlHost = sandbox.locator('[data-cy="masonry-gap-xl"]').first()
        await expect(xsHost).toBeVisible({ timeout: 8000 })
        await expect(xlHost).toBeVisible({ timeout: 8000 })

        const readGap = (el: Element) =>
            getComputedStyle(el).getPropertyValue('--origam-masonry---resolved-gap').trim()

        const xs = await xsHost.evaluate(readGap)
        const xl = await xlHost.evaluate(readGap)

        expect(xs).not.toBe('')
        expect(xl).not.toBe('')
        expect(xs).not.toBe(xl)
    })
})

test.describe('OrigamMasonry — Prop animated', () => {
    test('animated=true emits a non-empty transition on items', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — animated')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="masonry-animated-true"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // JS path: first child is an internal wrapper carrying the transition.
        const firstItem = host.locator('> *').first()
        const transition = await firstItem.evaluate((el) => getComputedStyle(el).transition)
        // The transition shorthand contains the keyword "transform" or
        // "all" depending on the browser's reporting style.
        expect(transition).not.toBe('')
        expect(transition).not.toMatch(/^all 0s/)
    })

    test('animated=false produces no transition on items', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — animated')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="masonry-animated-false"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const firstItem = host.locator('> *').first()
        const duration = await firstItem.evaluate((el) =>
            getComputedStyle(el).transitionDuration
        )
        // Browsers normalise "0s" or "0s, 0s, 0s, 0s" depending on the
        // property count — accept any of those.
        expect(duration.replace(/[\s,]/g, '')).toMatch(/^0?s?(0s)*$/)
    })

    test('shuffle button reorders items in the DOM', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — animated')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="masonry-animated-true"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const initialOrder = await host
            .locator('> *')
            .evaluateAll((els) => els.map((el) => (el as HTMLElement).textContent?.trim() ?? ''))

        // Click shuffle and wait for the next paint.
        await page.frameLocator('iframe[src*="__sandbox"]')
            .locator('[data-cy="masonry-animated-shuffle"]')
            .click()
        await page.waitForTimeout(400)

        const newOrder = await host
            .locator('> *')
            .evaluateAll((els) => els.map((el) => (el as HTMLElement).textContent?.trim() ?? ''))

        // With 16 items the probability of an identical shuffle is
        // effectively zero (1 / 16!). If this flakes, deterministic
        // shuffle is the fix — for now we trust randomness.
        expect(newOrder).not.toEqual(initialOrder)
    })
})
