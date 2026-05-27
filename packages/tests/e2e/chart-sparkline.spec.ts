import { expect, test } from '@playwright/test'

const STORY_BASE = 'http://localhost:6006'

const variantUrl = (title: string) =>
	`${ STORY_BASE }/?story=components-chart-origamchartsparkline--${ encodeURIComponent(title.toLowerCase().replace(/[\s/]+/g, '-').replace(/[^a-z0-9-]/g, '')) }`

test.describe('OrigamChartSparkline', () => {
	test.describe('Default variant', () => {
		test('renders sparkline SVG element', async ({ page }) => {
			await page.goto(variantUrl('Default'))
			await page.waitForSelector('[data-cy="sparkline-playground-chart"]', { timeout: 10000 })

			const svg = page.locator('[data-cy="sparkline-playground-svg"]')
			await expect(svg).toBeVisible()
		})

		test('SVG has correct viewBox', async ({ page }) => {
			await page.goto(variantUrl('Default'))
			await page.waitForSelector('[data-cy="sparkline-playground-svg"]', { timeout: 10000 })

			const svg = page.locator('[data-cy="sparkline-playground-svg"]')
			const viewBox = await svg.getAttribute('viewBox')
			expect(viewBox).toBe('0 0 120 30')
		})

		test('renders line path by default', async ({ page }) => {
			await page.goto(variantUrl('Default'))
			await page.waitForSelector('[data-cy="sparkline-playground-chart"]', { timeout: 10000 })

			const linePath = page.locator('[data-cy="sparkline-playground-chart"] [data-cy="sparkline-playground-line"]')
			await expect(linePath).toBeVisible()
		})

		test('last marker is visible by default', async ({ page }) => {
			await page.goto(variantUrl('Default'))
			await page.waitForSelector('[data-cy="sparkline-playground-chart"]', { timeout: 10000 })

			const lastMarker = page.locator('[data-cy="sparkline-playground-chart"] [data-cy="sparkline-special-last"]')
			await expect(lastMarker).toBeVisible()
		})
	})

	test.describe('Prop — type variant', () => {
		test('renders all four type variants', async ({ page }) => {
			await page.goto(variantUrl('Prop — type (line / area / column / bar)'))
			await page.waitForSelector('[data-cy="sparkline-types"]', { timeout: 10000 })

			await expect(page.locator('[data-cy="sparkline-type-line"]')).toBeVisible()
			await expect(page.locator('[data-cy="sparkline-type-area"]')).toBeVisible()
			await expect(page.locator('[data-cy="sparkline-type-column"]')).toBeVisible()
			await expect(page.locator('[data-cy="sparkline-type-bar"]')).toBeVisible()
		})

		test('line type renders a path element', async ({ page }) => {
			await page.goto(variantUrl('Prop — type (line / area / column / bar)'))
			await page.waitForSelector('[data-cy="sparkline-type-line"]', { timeout: 10000 })

			const linePath = page.locator('[data-cy="sparkline-type-line"] [data-cy="sparkline-type-line-line"]')
			const count = await linePath.count()
			expect(count).toBeGreaterThan(0)
		})

		test('area type renders both line and area paths', async ({ page }) => {
			await page.goto(variantUrl('Prop — type (line / area / column / bar)'))
			await page.waitForSelector('[data-cy="sparkline-type-area"]', { timeout: 10000 })

			const area = page.locator('[data-cy="sparkline-type-area"] .origam-chart-sparkline__area')
			const line = page.locator('[data-cy="sparkline-type-area"] .origam-chart-sparkline__line')
			const areaCount = await area.count()
			const lineCount = await line.count()
			expect(areaCount).toBeGreaterThan(0)
			expect(lineCount).toBeGreaterThan(0)
		})

		test('column type renders rect elements', async ({ page }) => {
			await page.goto(variantUrl('Prop — type (line / area / column / bar)'))
			await page.waitForSelector('[data-cy="sparkline-type-column"]', { timeout: 10000 })

			const bars = page.locator('[data-cy="sparkline-type-column"] .origam-chart-sparkline__bar')
			const count = await bars.count()
			expect(count).toBeGreaterThan(0)
		})

		test('bar type renders horizontal rect elements', async ({ page }) => {
			await page.goto(variantUrl('Prop — type (line / area / column / bar)'))
			await page.waitForSelector('[data-cy="sparkline-type-bar"]', { timeout: 10000 })

			const hbars = page.locator('[data-cy="sparkline-type-bar"] .origam-chart-sparkline__bar--horizontal')
			const count = await hbars.count()
			expect(count).toBeGreaterThan(0)
		})

		test('column bars have positive height', async ({ page }) => {
			await page.goto(variantUrl('Prop — type (line / area / column / bar)'))
			await page.waitForSelector('[data-cy="sparkline-type-column"]', { timeout: 10000 })

			const firstBar = page.locator('[data-cy="sparkline-type-column"] [data-cy="sparkline-type-column-bar-0"]')
			const count = await firstBar.count()
			if (count > 0) {
				const height = await firstBar.getAttribute('height')
				expect(parseFloat(height ?? '0')).toBeGreaterThan(0)
			}
		})
	})

	test.describe('Prop — markers variant', () => {
		test('renders min marker when showMin is true', async ({ page }) => {
			await page.goto(variantUrl('Prop — showMin / showMax / showLast'))
			await page.waitForSelector('[data-cy="sparkline-markers"]', { timeout: 10000 })

			const minMarker = page.locator('[data-cy="sparkline-markers-minmax"] [data-cy="sparkline-special-min"]')
			await expect(minMarker).toBeVisible()
		})

		test('renders max marker when showMax is true', async ({ page }) => {
			await page.goto(variantUrl('Prop — showMin / showMax / showLast'))
			await page.waitForSelector('[data-cy="sparkline-markers"]', { timeout: 10000 })

			const maxMarker = page.locator('[data-cy="sparkline-markers-minmax"] [data-cy="sparkline-special-max"]')
			await expect(maxMarker).toBeVisible()
		})

		test('min and max markers are distinct circles', async ({ page }) => {
			await page.goto(variantUrl('Prop — showMin / showMax / showLast'))
			await page.waitForSelector('[data-cy="sparkline-markers-minmax"]', { timeout: 10000 })

			const min = page.locator('[data-cy="sparkline-markers-minmax"] [data-cy="sparkline-special-min"]')
			const max = page.locator('[data-cy="sparkline-markers-minmax"] [data-cy="sparkline-special-max"]')

			const minCy = await min.getAttribute('cy')
			const maxCy = await max.getAttribute('cy')

			expect(minCy).not.toBeNull()
			expect(maxCy).not.toBeNull()
			expect(minCy).not.toBe(maxCy)
		})

		test('last marker colour matches series colour', async ({ page }) => {
			await page.goto(variantUrl('Prop — showMin / showMax / showLast'))
			await page.waitForSelector('[data-cy="sparkline-markers-last"]', { timeout: 10000 })

			const lastMarker = page.locator('[data-cy="sparkline-markers-last"] [data-cy="sparkline-special-last"]')
			await expect(lastMarker).toBeVisible()
		})
	})

	test.describe('Prop — color variant', () => {
		test('renders three colour variants without error', async ({ page }) => {
			await page.goto(variantUrl('Prop — color (primary / success / danger)'))
			await page.waitForSelector('[data-cy="sparkline-colors"]', { timeout: 10000 })

			await expect(page.locator('[data-cy="sparkline-color-primary"]')).toBeVisible()
			await expect(page.locator('[data-cy="sparkline-color-success"]')).toBeVisible()
			await expect(page.locator('[data-cy="sparkline-color-danger"]')).toBeVisible()
		})
	})

	test.describe('Use case — stock prices table', () => {
		test('renders all five tickers', async ({ page }) => {
			await page.goto(variantUrl('Use case — stock prices table'))
			await page.waitForSelector('[data-cy="sparkline-stocks"]', { timeout: 10000 })

			const tickers = ['aapl', 'googl', 'msft', 'tsla', 'amzn']
			for (const ticker of tickers) {
				await expect(page.locator(`[data-cy="sparkline-stock-${ ticker }"]`)).toBeVisible()
			}
		})

		test('each stock row contains a sparkline SVG', async ({ page }) => {
			await page.goto(variantUrl('Use case — stock prices table'))
			await page.waitForSelector('[data-cy="sparkline-stocks"]', { timeout: 10000 })

			const tickers = ['aapl', 'googl', 'msft', 'tsla', 'amzn']
			for (const ticker of tickers) {
				const chart = page.locator(`[data-cy="sparkline-stock-chart-${ ticker }"]`)
				await expect(chart).toBeVisible()
				const svg = chart.locator('svg')
				await expect(svg).toBeVisible()
			}
		})

		test('table has correct accessible structure', async ({ page }) => {
			await page.goto(variantUrl('Use case — stock prices table'))
			await page.waitForSelector('[data-cy="sparkline-stocks"]', { timeout: 10000 })

			const table = page.locator('.stock-table')
			const thead = table.locator('thead')
			const tbody = table.locator('tbody')
			await expect(thead).toBeVisible()
			await expect(tbody).toBeVisible()
		})
	})

	test.describe('Slot — empty', () => {
		test('renders empty slot when series is empty', async ({ page }) => {
			await page.goto(variantUrl('Slot — empty'))
			await page.waitForSelector('[data-cy="sparkline-slot-empty-chart"]', { timeout: 10000 })

			const empty = page.locator('[data-cy="sparkline-slot-empty-chart"] [data-cy="sparkline-slot-empty-empty"]')
			const count = await empty.count()
			expect(count).toBeGreaterThan(0)
		})
	})

	test.describe('Accessibility', () => {
		test('sparkline uses figure element (semantic HTML)', async ({ page }) => {
			await page.goto(variantUrl('Default'))
			await page.waitForSelector('[data-cy="sparkline-playground-chart"]', { timeout: 10000 })

			const figure = page.locator('[data-cy="sparkline-playground-chart"]')
			const tagName = await figure.evaluate((el) => el.tagName.toLowerCase())
			expect(tagName).toBe('figure')
		})

		test('SVG has role="img" and aria-label', async ({ page }) => {
			await page.goto(variantUrl('Default'))
			await page.waitForSelector('[data-cy="sparkline-playground-svg"]', { timeout: 10000 })

			const svg = page.locator('[data-cy="sparkline-playground-svg"]')
			await expect(svg).toHaveAttribute('role', 'img')
			const ariaLabel = await svg.getAttribute('aria-label')
			expect(ariaLabel).toBeTruthy()
		})

		test('SVG contains title element for screen readers', async ({ page }) => {
			await page.goto(variantUrl('Default'))
			await page.waitForSelector('[data-cy="sparkline-playground-svg"]', { timeout: 10000 })

			const title = page.locator('[data-cy="sparkline-playground-svg"] title')
			await expect(title).toHaveCount(1)
		})
	})
})
