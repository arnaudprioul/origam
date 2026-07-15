/**
 * Theme Builder (/theming) — viewport-height regression.
 *
 * `.theming` used to clamp its height to `calc(100vh - appbar)` with
 * internal `overflow: hidden` / `overflow-y: auto` zones (nav list, props
 * panel, generated-code block). On short viewports that budget squeezed
 * those zones to slivers, reading as clipped content (nav item cut off
 * mid-label, "N components" footer overlapping the list, generated code
 * cut mid-line, props panel select overflowing its edge).
 *
 * Fix: a `@media (max-height: 50rem)` breakpoint switches the clamp to
 * `height: auto` / `min-height` and the internal `overflow: hidden` /
 * `overflow-y: auto` zones to `overflow: visible`, letting the page grow
 * to its natural content height and scroll as a whole below the
 * threshold, while leaving the desktop (tall-viewport) internally
 * scrolling 3-column layout untouched.
 *
 * Prérequis : serveur marketing :3000 + base docs seedée.
 * Run : cd packages/tests && node_modules/.bin/playwright test \
 *         --config=playwright.marketing.config.ts marketing-theming-viewport-height
 */

import { expect, test, type Page } from '@playwright/test'

const SHORT_VIEWPORTS = [
    { width: 1280, height: 720, label: '1280x720' },
    { width: 1024, height: 640, label: '1024x640' }
]

const TALL_VIEWPORTS = [
    { width: 1440, height: 900, label: '1440x900' },
    { width: 2560, height: 1400, label: '2560x1400' }
]

interface IBoxMetrics {
    height: number
    scrollHeight: number
    overflowY: string
}

async function boxMetrics (page: Page, selector: string): Promise<IBoxMetrics | null> {
    return page.locator(selector).evaluate((el) => {
        const rect = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        return {
            height: Math.round(rect.height),
            scrollHeight: el.scrollHeight,
            overflowY: cs.overflowY
        }
    }).catch(() => null)
}

async function gotoTheming (page: Page): Promise<void> {
    await page.goto('/theming')
    await page.waitForLoadState('networkidle')
}

test.describe('Theme Builder · viewport-height clipping', () => {
    for (const viewport of SHORT_VIEWPORTS) {
        test(`no clipped content at ${viewport.label} — nav, panel and generated code fully reachable`, async ({ page }) => {
            await page.setViewportSize({ width: viewport.width, height: viewport.height })
            await gotoTheming(page)

            const nav = page.locator('[data-cy="theming-nav"]')
            const panel = page.locator('[data-cy="theming-controls-panel"]')
            const output = page.locator('[data-cy="theming-output"]')
            const generatedCode = page.locator('[data-cy="theming-generated-code"]')

            await expect(nav).toBeVisible()
            await expect(panel).toBeVisible()
            await expect(output).toBeVisible()
            await expect(generatedCode).toBeVisible()

            const navFooter = page.locator('.tb-nav__footer')
            await expect(navFooter).toBeVisible()
            await navFooter.scrollIntoViewIfNeeded()
            await expect(navFooter).toBeInViewport()

            const activeCategoryItems = page.locator('.tb-nav__cat--open .tb-nav__item')
            const activeItemCount = await activeCategoryItems.count()
            if (activeItemCount > 0) {
                const lastActiveItem = activeCategoryItems.last()
                await lastActiveItem.scrollIntoViewIfNeeded()
                await expect(lastActiveItem).toBeInViewport()
            }

            await generatedCode.scrollIntoViewIfNeeded()
            await expect(generatedCode).toBeInViewport()

            const bodyMetrics = await boxMetrics(page, 'body')
            expect(bodyMetrics).not.toBeNull()
            expect(bodyMetrics!.scrollHeight).toBeGreaterThanOrEqual(bodyMetrics!.height)

            for (const selector of ['.tb-nav__scroll', '.tb-panel__scroll', '.theming__output-code']) {
                const metrics = await boxMetrics(page, selector)
                if (!metrics) continue
                expect(
                    metrics.height,
                    `${selector} must not clip its content at ${viewport.label} (scrollHeight=${metrics.scrollHeight}, height=${metrics.height})`
                ).toBeGreaterThanOrEqual(metrics.scrollHeight)
            }
        })

        test(`props panel color select is not clipped at its edge — ${viewport.label}`, async ({ page }) => {
            await page.setViewportSize({ width: viewport.width, height: viewport.height })
            await gotoTheming(page)

            const colorRow = page.locator('[data-cy="theming-prop-color"]').first()
            if (await colorRow.count() === 0) {
                test.skip(true, 'no color control rendered for the default component entry')
            }

            const colorGroup = page.locator('details:has([data-cy="theming-prop-color"])').first()
            const isOpen = await colorGroup.evaluate(el => el.hasAttribute('open'))
            if (!isOpen) {
                await colorGroup.locator('summary').first().click()
            }

            await colorRow.scrollIntoViewIfNeeded()
            await expect(colorRow).toBeInViewport()

            const box = await colorRow.boundingBox()
            expect(box).not.toBeNull()
            expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width)
        })
    }

    for (const viewport of TALL_VIEWPORTS) {
        test(`desktop internal-scroll layout is unchanged at ${viewport.label}`, async ({ page }) => {
            await page.setViewportSize({ width: viewport.width, height: viewport.height })
            await gotoTheming(page)

            const theming = page.locator('.theming')
            const themingMetrics = await theming.evaluate((el) => {
                const cs = getComputedStyle(el)
                return { height: cs.height, overflowY: cs.overflowY }
            })
            expect(themingMetrics.height).not.toBe('auto')

            const navScroll = await boxMetrics(page, '.tb-nav__scroll')
            expect(navScroll).not.toBeNull()
            expect(navScroll!.overflowY).toBe('auto')
            expect(
                navScroll!.height,
                'the component nav must keep scrolling internally on tall viewports, not grow to full content height'
            ).toBeLessThan(navScroll!.scrollHeight)

            const panelScroll = await boxMetrics(page, '.tb-panel__scroll')
            expect(panelScroll).not.toBeNull()
            expect(panelScroll!.overflowY).toBe('auto')

            const outputCode = page.locator('.theming__output-code')
            const outputCodeOverflow = await outputCode.evaluate(el => getComputedStyle(el).overflowY)
            expect(outputCodeOverflow).toBe('hidden')

            const themingBox = await theming.boundingBox()
            expect(themingBox).not.toBeNull()
            expect(
                themingBox!.y + themingBox!.height,
                'the vh-clamped .theming root must still end at (roughly) the viewport bottom on tall screens'
            ).toBeLessThanOrEqual(viewport.height + 4)
        })
    }
})
