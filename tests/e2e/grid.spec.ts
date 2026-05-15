import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamGrid — runtime probes for every prop / variant exposed by the
 * story. Each block targets one orthogonal facet and asserts on
 * `getComputedStyle()` so we catch the case where a prop is silently
 * ignored (the component types something but the SCSS doesn't wire
 * it through).
 *
 *   - Playground: smoke-test that the component mounts as `display: grid`
 *     and resolves the default token-driven gap.
 *   - Prop — columns: every accepted shape (number / string / string[])
 *     produces a real `grid-template-columns` track list.
 *   - Prop — areas: the array shape gets quoted and emitted as
 *     `grid-template-areas`.
 *   - Prop — gap: each token resolves to a distinct pixel value (xs <
 *     sm < md < lg < xl).
 *   - Prop — autoFlow: the prop value lands on `grid-auto-flow`.
 *   - Sub-component — OrigamGridItem: the object and string syntaxes
 *     both serialise to `grid-column` / `grid-row` shorthands.
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

const STORY = '/story/stories-components-stories-grid-origamgrid-story-vue'

test.describe('OrigamGrid — Playground (smoke + defaults)', () => {
    test('mounts as display: grid and resolves the default gap token', async ({ page }) => {
        await openVariant(page, STORY, 'Playground')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="grid-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const display = await host.evaluate((el) => getComputedStyle(el).display)
        expect(display).toBe('grid')

        // Default gap = 'md' → 16px (per tokens/component/grid.json → space.4).
        const gap = await host.evaluate((el) => getComputedStyle(el).gap)
        // `getComputedStyle.gap` returns "16px 16px" when both axes match;
        // some engines collapse to "16px". Accept both.
        expect(gap.replace(/\s+/g, ' ')).toMatch(/^16px( 16px)?$/)
    })

    test('renders the cells inside a 4-column track grid (columns prop = 4 default)', async ({ page }) => {
        await openVariant(page, STORY, 'Playground')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="grid-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const cells = sandbox.locator('[data-cy="grid-playground-cell"]')
        await expect(cells).toHaveCount(8)

        // 4 columns → `repeat(4, 1fr)` → computed style normalises to
        // "Xpx Xpx Xpx Xpx" (4 length values).
        const trackCount = await host.evaluate((el) =>
            getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
        )
        expect(trackCount).toBe(4)
    })
})

test.describe('OrigamGrid — Prop "columns"', () => {
    test('number → repeat(N, 1fr) — 3 vs 12 produce 3 vs 12 tracks', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — columns')
        const sandbox = sandboxOf(page)

        const grid3 = sandbox.locator('[data-cy="grid-columns-number-3"]').first()
        const grid12 = sandbox.locator('[data-cy="grid-columns-number-12"]').first()
        await expect(grid3).toBeVisible({ timeout: 8000 })
        await expect(grid12).toBeVisible({ timeout: 8000 })

        const tracks3 = await grid3.evaluate((el) =>
            getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
        )
        const tracks12 = await grid12.evaluate((el) =>
            getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length
        )
        expect(tracks3).toBe(3)
        expect(tracks12).toBe(12)
    })

    test('string → passed verbatim (1fr 2fr 1fr → middle track wider)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — columns')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="grid-columns-string"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const tracksPx = await host.evaluate((el) =>
            getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).map((t) => parseFloat(t))
        )
        expect(tracksPx).toHaveLength(3)
        // 1fr / 2fr / 1fr → the middle one is roughly twice the outer ones.
        const [a, b, c] = tracksPx
        expect(b).toBeGreaterThan(a)
        expect(b).toBeGreaterThan(c)
        // Tolerance: 1.7x — 2.3x to ride subpixel rounding.
        const ratio = b / a
        expect(ratio).toBeGreaterThan(1.7)
        expect(ratio).toBeLessThan(2.3)
    })

    test('array → joined with space (200px / 1fr / 200px)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — columns')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="grid-columns-array"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const tracks = await host.evaluate((el) =>
            getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean)
        )
        expect(tracks).toHaveLength(3)
        // Outer tracks are 200px exact; the middle one absorbs the rest.
        expect(tracks[0]).toBe('200px')
        expect(tracks[2]).toBe('200px')
    })
})

test.describe('OrigamGrid — Prop "areas"', () => {
    test('array shape → grid-template-areas with quoted rows', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — areas')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="grid-areas-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const areas = await host.evaluate((el) => getComputedStyle(el).gridTemplateAreas)
        // Browsers normalise the value to space-separated quoted rows.
        // Assert that every named area is present in any order.
        expect(areas).toContain('header')
        expect(areas).toContain('sidebar')
        expect(areas).toContain('main')
        expect(areas).toContain('aside')
        expect(areas).toContain('footer')
    })

    test('named cells land in the right computed rect (header spans width)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — areas')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="grid-areas-host"]').first()
        const header = sandbox.locator('[data-cy="grid-areas-header"]').first()
        const footer = sandbox.locator('[data-cy="grid-areas-footer"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        await expect(header).toBeVisible()
        await expect(footer).toBeVisible()

        // Header and footer span the same width as the host (3 columns).
        const hostBox = await host.boundingBox()
        const headerBox = await header.boundingBox()
        const footerBox = await footer.boundingBox()
        expect(hostBox).not.toBeNull()
        expect(headerBox).not.toBeNull()
        expect(footerBox).not.toBeNull()
        if (!hostBox || !headerBox || !footerBox) return

        // Account for the host's 8px internal padding on each side.
        expect(headerBox.width).toBeGreaterThan(hostBox.width - 40)
        expect(footerBox.width).toBeGreaterThan(hostBox.width - 40)
    })
})

test.describe('OrigamGrid — Prop "gap" (token resolution)', () => {
    test('gap=xs → 4px, gap=xl → 32px (strict monotonic)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — gap')
        const sandbox = sandboxOf(page)

        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
        const values: number[] = []
        for (const size of sizes) {
            const host = sandbox.locator(`[data-cy="grid-gap-${size}"]`).first()
            await expect(host).toBeVisible({ timeout: 8000 })
            const gapPx = await host.evaluate((el) => parseFloat(getComputedStyle(el).columnGap))
            values.push(gapPx)
        }

        // Token map: xs=4, sm=8, md=16, lg=24, xl=32.
        expect(values[0]).toBe(4)
        expect(values[1]).toBe(8)
        expect(values[2]).toBe(16)
        expect(values[3]).toBe(24)
        expect(values[4]).toBe(32)
    })
})

test.describe('OrigamGrid — Prop "autoFlow"', () => {
    test('autoFlow="row" vs "column" → distinct grid-auto-flow', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — autoFlow')
        const sandbox = sandboxOf(page)

        const rowHost = sandbox.locator('[data-cy="grid-flow-row"]').first()
        const columnHost = sandbox.locator('[data-cy="grid-flow-column"]').first()
        await expect(rowHost).toBeVisible({ timeout: 8000 })
        await expect(columnHost).toBeVisible({ timeout: 8000 })

        const rowFlow = await rowHost.evaluate((el) => getComputedStyle(el).gridAutoFlow)
        const columnFlow = await columnHost.evaluate((el) => getComputedStyle(el).gridAutoFlow)
        expect(rowFlow).toBe('row')
        expect(columnFlow).toBe('column')
    })

    test('autoFlow="row dense" → dense keyword applied', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — autoFlow')
        const sandbox = sandboxOf(page)

        const denseHost = sandbox.locator('[data-cy="grid-flow-dense"]').first()
        await expect(denseHost).toBeVisible({ timeout: 8000 })

        const flow = await denseHost.evaluate((el) => getComputedStyle(el).gridAutoFlow)
        // Browsers emit "row dense" or "dense" depending on normalisation.
        expect(flow).toMatch(/dense/)
    })
})

test.describe('OrigamGridItem — placement props', () => {
    test('object syntax { start, end } → grid-column "1 / 4"', async ({ page }) => {
        await openVariant(page, STORY, 'Sub-component — OrigamGridItem')
        const sandbox = sandboxOf(page)

        const item = sandbox.locator('[data-cy="grid-item-span-1-to-4"]').first()
        await expect(item).toBeVisible({ timeout: 8000 })

        const value = await item.evaluate((el) => el.getAttribute('style') ?? '')
        expect(value.replace(/\s+/g, ' ')).toMatch(/grid-column:\s*1 \/ 4/)
    })

    test('object syntax { start, span } → grid-column "4 / span 3"', async ({ page }) => {
        await openVariant(page, STORY, 'Sub-component — OrigamGridItem')
        const sandbox = sandboxOf(page)

        const item = sandbox.locator('[data-cy="grid-item-span-4-span-3"]').first()
        await expect(item).toBeVisible({ timeout: 8000 })

        const value = await item.evaluate((el) => el.getAttribute('style') ?? '')
        expect(value.replace(/\s+/g, ' ')).toMatch(/grid-column:\s*4 \/ span 3/)
    })

    test('raw string syntax "span 4" → passed verbatim', async ({ page }) => {
        await openVariant(page, STORY, 'Sub-component — OrigamGridItem')
        const sandbox = sandboxOf(page)

        const item = sandbox.locator('[data-cy="grid-item-span-raw"]').first()
        await expect(item).toBeVisible({ timeout: 8000 })

        const value = await item.evaluate((el) => el.getAttribute('style') ?? '')
        expect(value.replace(/\s+/g, ' ')).toMatch(/grid-column:\s*span 4/)
    })

    test('area prop overrides column/row and lands on grid-area', async ({ page }) => {
        await openVariant(page, STORY, 'Sub-component — OrigamGridItem')
        const sandbox = sandboxOf(page)

        const item = sandbox.locator('[data-cy="grid-item-area-main"]').first()
        await expect(item).toBeVisible({ timeout: 8000 })

        const value = await item.evaluate((el) => el.getAttribute('style') ?? '')
        // `grid-area: main` is the inline shorthand we emit (browsers
        // accept the named-area form on this property since 2018).
        expect(value).toMatch(/grid-area:\s*main/)
    })
})
