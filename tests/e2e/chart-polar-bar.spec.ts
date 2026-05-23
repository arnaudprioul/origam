import { expect, test } from '@playwright/test'

/**
 * E2E spec for OrigamChartPolarBar.
 *
 * Navigates to each Variant in the Histoire story and asserts:
 * 1. SVG is rendered with the expected number of wedge paths.
 * 2. Distinct props (innerRadius, startAngle, gap, colorScheme) produce
 *    visually distinct computed attributes on the rendered paths.
 * 3. Empty state renders the fallback slot text.
 * 4. point-click emit logs a line in the playground log.
 */

const BASE_URL = 'http://localhost:6006'

const storyUrl = (variant: string) =>
	`${ BASE_URL }/?story=components-chart-origamchartpolarbar--${ variant }`

test.describe('OrigamChartPolarBar', () => {
	test.describe('Default variant — playground renders 7 wedges', () => {
		test('SVG is present and has 7 wedge paths', async ({ page }) => {
			await page.goto(storyUrl('default'))
			await page.waitForSelector('[data-cy="polar-bar-playground-chart"]')

			const paths = page.locator('[data-cy="polar-bar-playground-chart"] [data-cy^="origam-chart-polar-bar-wedge-"]')
			await expect(paths).toHaveCount(7)
		})

		test('each wedge has a non-empty d attribute', async ({ page }) => {
			await page.goto(storyUrl('default'))
			await page.waitForSelector('[data-cy="polar-bar-playground-chart"]')

			const wedges = page.locator('[data-cy^="origam-chart-polar-bar-wedge-"]')
			const count = await wedges.count()
			expect(count).toBe(7)

			for (let i = 0; i < count; i++) {
				const d = await wedges.nth(i).getAttribute('d')
				expect(d).toBeTruthy()
				expect(d!.length).toBeGreaterThan(10)
			}
		})

		test('wedge click appends a line to the log', async ({ page }) => {
			await page.goto(storyUrl('default'))
			await page.waitForSelector('[data-cy="polar-bar-playground-chart"]')

			const firstWedge = page.locator('[data-cy="origam-chart-polar-bar-wedge-0"]')
			await firstWedge.click()

			const log = page.locator('[data-cy="polar-bar-playground-log"]')
			await expect(log).toContainText('point-click')
		})
	})

	test.describe('Prop — innerRadius', () => {
		test('innerRadius=0 wedge reaches SVG center (d starts with "M 0,0")', async ({ page }) => {
			await page.goto(storyUrl('prop-innerradius-0-vs-04'))
			await page.waitForSelector('[data-cy="polar-bar-inner-radius-0"]')

			const wedge0 = page.locator('[data-cy="polar-bar-inner-radius-0"] [data-cy="origam-chart-polar-bar-wedge-0"]')
			const d0 = await wedge0.getAttribute('d')
			expect(d0).toMatch(/M 0,0/)
		})

		test('innerRadius=0.4 wedge d attribute does NOT start with M 0,0', async ({ page }) => {
			await page.goto(storyUrl('prop-innerradius-0-vs-04'))
			await page.waitForSelector('[data-cy="polar-bar-inner-radius-04"]')

			const wedge04 = page.locator('[data-cy="polar-bar-inner-radius-04"] [data-cy="origam-chart-polar-bar-wedge-0"]')
			const d04 = await wedge04.getAttribute('d')
			expect(d04).not.toMatch(/^M 0,0/)
		})

		test('d paths differ between innerRadius=0 and innerRadius=0.4', async ({ page }) => {
			await page.goto(storyUrl('prop-innerradius-0-vs-04'))
			await page.waitForSelector('[data-cy="polar-bar-inner-radius"]')

			const w0 = page.locator('[data-cy="polar-bar-inner-radius-0"] [data-cy="origam-chart-polar-bar-wedge-0"]')
			const w4 = page.locator('[data-cy="polar-bar-inner-radius-04"] [data-cy="origam-chart-polar-bar-wedge-0"]')

			const d0 = await w0.getAttribute('d')
			const d4 = await w4.getAttribute('d')
			expect(d0).not.toBe(d4)
		})
	})

	test.describe('Prop — startAngle', () => {
		test('three angle variants each render 5 wedges', async ({ page }) => {
			await page.goto(storyUrl('prop-startangle-0-ps2-p4'))
			await page.waitForSelector('[data-cy="polar-bar-start-angle"]')

			for (const cy of ['polar-bar-angle-0', 'polar-bar-angle-neg-half-pi', 'polar-bar-angle-quarter-pi']) {
				const count = await page.locator(`[data-cy="${ cy }"] [data-cy^="origam-chart-polar-bar-wedge-"]`).count()
				expect(count).toBe(5)
			}
		})

		test('first wedge d attribute differs across startAngle values', async ({ page }) => {
			await page.goto(storyUrl('prop-startangle-0-ps2-p4'))
			await page.waitForSelector('[data-cy="polar-bar-start-angle"]')

			const d0 = await page.locator('[data-cy="polar-bar-angle-0"] [data-cy="origam-chart-polar-bar-wedge-0"]').getAttribute('d')
			const dNeg = await page.locator('[data-cy="polar-bar-angle-neg-half-pi"] [data-cy="origam-chart-polar-bar-wedge-0"]').getAttribute('d')
			const dPos = await page.locator('[data-cy="polar-bar-angle-quarter-pi"] [data-cy="origam-chart-polar-bar-wedge-0"]').getAttribute('d')

			expect(d0).not.toBe(dNeg)
			expect(d0).not.toBe(dPos)
		})
	})

	test.describe('Prop — gap', () => {
		test('gap=0 and gap=0.05 produce different d paths', async ({ page }) => {
			await page.goto(storyUrl('prop-gap-0-vs-005'))
			await page.waitForSelector('[data-cy="polar-bar-gap"]')

			const d0 = await page.locator('[data-cy="polar-bar-gap-0"] [data-cy="origam-chart-polar-bar-wedge-0"]').getAttribute('d')
			const d5 = await page.locator('[data-cy="polar-bar-gap-005"] [data-cy="origam-chart-polar-bar-wedge-0"]').getAttribute('d')

			expect(d0).not.toBe(d5)
		})
	})

	test.describe('Prop — colorScheme', () => {
		test('all three colour variants render 5 wedges', async ({ page }) => {
			await page.goto(storyUrl('prop-colorscheme'))
			await page.waitForSelector('[data-cy="polar-bar-color-scheme"]')

			for (const cy of ['polar-bar-color-default', 'polar-bar-color-indigo', 'polar-bar-color-series']) {
				const count = await page.locator(`[data-cy="${ cy }"] [data-cy^="origam-chart-polar-bar-wedge-"]`).count()
				expect(count).toBe(5)
			}
		})

		test('indigo ramp first wedge fill differs from intent default', async ({ page }) => {
			await page.goto(storyUrl('prop-colorscheme'))
			await page.waitForSelector('[data-cy="polar-bar-color-scheme"]')

			const defaultWedge = page.locator('[data-cy="polar-bar-color-default"] [data-cy="origam-chart-polar-bar-wedge-0"]')
			const indigoWedge = page.locator('[data-cy="polar-bar-color-indigo"] [data-cy="origam-chart-polar-bar-wedge-0"]')

			const defaultStyle = await defaultWedge.getAttribute('style')
			const indigoStyle = await indigoWedge.getAttribute('style')

			expect(defaultStyle).not.toBe(indigoStyle)
		})
	})

	test.describe('Slot — empty', () => {
		test('custom empty slot text is rendered when series is empty', async ({ page }) => {
			await page.goto(storyUrl('slot-empty'))
			await page.waitForSelector('[data-cy="polar-bar-slot-empty-chart"]')

			const empty = page.locator('[data-cy="polar-bar-slot-empty-chart"] [data-cy="origam-chart-polar-bar-empty"]')
			await expect(empty).toBeVisible()
			await expect(empty).toContainText('No activity data available')
		})

		test('no wedge paths are rendered in empty state', async ({ page }) => {
			await page.goto(storyUrl('slot-empty'))
			await page.waitForSelector('[data-cy="polar-bar-slot-empty-chart"]')

			const wedges = page.locator('[data-cy="polar-bar-slot-empty-chart"] [data-cy^="origam-chart-polar-bar-wedge-"]')
			await expect(wedges).toHaveCount(0)
		})
	})

	test.describe('Slot — tooltip', () => {
		test('custom tooltip appears on wedge hover', async ({ page }) => {
			await page.goto(storyUrl('slot-tooltip-custom-card-with-percentage'))
			await page.waitForSelector('[data-cy="polar-bar-slot-tooltip-chart"]')

			const firstWedge = page.locator('[data-cy="polar-bar-slot-tooltip-chart"] [data-cy="origam-chart-polar-bar-wedge-0"]')
			await firstWedge.hover()

			const tooltip = page.locator('.custom-tooltip')
			await expect(tooltip).toBeVisible()
			await expect(tooltip).toContainText('hrs')
		})
	})

	test.describe('Emit — point-click', () => {
		test('clicking a wedge fires point-click and logs the event', async ({ page }) => {
			await page.goto(storyUrl('emit-point-click'))
			await page.waitForSelector('[data-cy="polar-bar-emit-chart"]')

			const wedge = page.locator('[data-cy="polar-bar-emit-chart"] [data-cy="origam-chart-polar-bar-wedge-2"]')
			await wedge.click()

			const log = page.locator('[data-cy="polar-bar-emit-log"]')
			await expect(log).toContainText('point-click')
		})

		test('keyboard Enter on a wedge fires point-click', async ({ page }) => {
			await page.goto(storyUrl('emit-point-click'))
			await page.waitForSelector('[data-cy="polar-bar-emit-chart"]')

			const wedge = page.locator('[data-cy="polar-bar-emit-chart"] [data-cy="origam-chart-polar-bar-wedge-0"]')
			await wedge.focus()
			await page.keyboard.press('Enter')

			const log = page.locator('[data-cy="polar-bar-emit-log"]')
			await expect(log).toContainText('point-click')
		})
	})

	test.describe('Accessibility', () => {
		test('wedge paths have role=button and aria-label', async ({ page }) => {
			await page.goto(storyUrl('default'))
			await page.waitForSelector('[data-cy="polar-bar-playground-chart"]')

			const wedge = page.locator('[data-cy="origam-chart-polar-bar-wedge-0"]')
			await expect(wedge).toHaveAttribute('role', 'button')
			const label = await wedge.getAttribute('aria-label')
			expect(label).toBeTruthy()
			expect(label).toContain(':')
		})

		test('SVG has role=img', async ({ page }) => {
			await page.goto(storyUrl('default'))
			await page.waitForSelector('[data-cy="polar-bar-playground-chart"]')

			const svg = page.locator('[data-cy="origam-chart-polar-bar-svg"]')
			await expect(svg).toHaveAttribute('role', 'img')
		})
	})
})
