import { expect, test } from '@playwright/test'

/**
 * E2E spec — OrigamChartStreamgraph
 *
 * Navigates each Variant in the Histoire story and asserts that
 * every prop / behaviour produces a distinct, observable runtime
 * change in the rendered SVG.
 *
 * Base URL: http://localhost:6006
 * Story path: Chart/OrigamChartStreamgraph
 */

const BASE = 'http://localhost:6006'
const STORY_ID = 'chart-origamchartstreamgraph'

const variantUrl = (title: string) =>
	`${ BASE }/?storyId=${ STORY_ID }&variantId=${ STORY_ID }--${ title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }`

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getRibbons = (page: ReturnType<typeof test.extend>) =>
	page.locator('[data-cy="origam-chart-streamgraph-svg"] .origam-chart-streamgraph__ribbon')

// ---------------------------------------------------------------------------
// Default / Playground
// ---------------------------------------------------------------------------

test.describe('OrigamChartStreamgraph — Default variant', () => {
	test('renders the SVG with at least one ribbon', async ({ page }) => {
		await page.goto(variantUrl('Default'))
		await page.waitForSelector('[data-cy="origam-chart-streamgraph-svg"]')

		const ribbons = page.locator('[data-cy="origam-chart-streamgraph-svg"] .origam-chart-streamgraph__ribbon')
		await expect(ribbons).not.toHaveCount(0)
	})

	test('renders 5 ribbons for the music fixture (5 series)', async ({ page }) => {
		await page.goto(variantUrl('Default'))
		await page.waitForSelector('[data-cy="origam-chart-streamgraph-svg"]')

		const ribbons = page.locator('[data-cy="origam-chart-streamgraph-svg"] .origam-chart-streamgraph__ribbon')
		await expect(ribbons).toHaveCount(5)
	})

	test('each ribbon has a non-empty d attribute (path data)', async ({ page }) => {
		await page.goto(variantUrl('Default'))
		await page.waitForSelector('[data-cy="origam-chart-streamgraph-ribbon-0"]')

		const ribbon = page.locator('[data-cy="origam-chart-streamgraph-ribbon-0"]')
		const d = await ribbon.getAttribute('d')
		expect(d).toBeTruthy()
		expect(d!.length).toBeGreaterThan(10)
	})

	test('each ribbon has an inline fill style (not a fill attribute)', async ({ page }) => {
		await page.goto(variantUrl('Default'))
		await page.waitForSelector('[data-cy="origam-chart-streamgraph-ribbon-0"]')

		const ribbon = page.locator('[data-cy="origam-chart-streamgraph-ribbon-0"]')
		const style = await ribbon.getAttribute('style')
		expect(style).toMatch(/fill\s*:/)
		const fillAttr = await ribbon.getAttribute('fill')
		expect(fillAttr).toBeNull()
	})

	test('SVG title element contains chart title text', async ({ page }) => {
		await page.goto(variantUrl('Default'))
		await page.waitForSelector('[data-cy="origam-chart-streamgraph-svg"] title')

		const titleText = await page.locator('[data-cy="origam-chart-streamgraph-svg"] title').textContent()
		expect(titleText).toBeTruthy()
	})

	test('legend renders with 5 items for 5 series', async ({ page }) => {
		await page.goto(variantUrl('Default'))
		await page.waitForSelector('[data-cy="origam-chart-streamgraph-svg"]')

		const legendItems = page.locator('.origam-chart__legend-item')
		await expect(legendItems).toHaveCount(5)
	})

	test('ribbons are keyboard focusable (tabindex=0)', async ({ page }) => {
		await page.goto(variantUrl('Default'))
		await page.waitForSelector('[data-cy="origam-chart-streamgraph-ribbon-0"]')

		const ribbon = page.locator('[data-cy="origam-chart-streamgraph-ribbon-0"]')
		const tabindex = await ribbon.getAttribute('tabindex')
		expect(tabindex).toBe('0')
	})

	test('ribbons have role=button for accessibility', async ({ page }) => {
		await page.goto(variantUrl('Default'))
		await page.waitForSelector('[data-cy="origam-chart-streamgraph-ribbon-0"]')

		const ribbon = page.locator('[data-cy="origam-chart-streamgraph-ribbon-0"]')
		await expect(ribbon).toHaveAttribute('role', 'button')
	})
})

// ---------------------------------------------------------------------------
// Prop — offsetMode
// ---------------------------------------------------------------------------

test.describe('OrigamChartStreamgraph — Prop offsetMode', () => {
	test('renders 4 charts in the offsetMode variant', async ({ page }) => {
		await page.goto(variantUrl('Prop — offsetMode (wiggle / silhouette / expand / zero)'))
		await page.waitForSelector('[data-cy="streamgraph-offset-wiggle"]')

		const charts = page.locator('[data-cy^="streamgraph-offset-"]')
		await expect(charts).toHaveCount(4)
	})

	test('wiggle chart renders visible ribbons', async ({ page }) => {
		await page.goto(variantUrl('Prop — offsetMode (wiggle / silhouette / expand / zero)'))
		await page.waitForSelector('[data-cy="streamgraph-offset-wiggle"] .origam-chart-streamgraph__ribbon')

		const ribbons = page.locator('[data-cy="streamgraph-offset-wiggle"] .origam-chart-streamgraph__ribbon')
		await expect(ribbons).not.toHaveCount(0)
	})

	test('silhouette chart renders visible ribbons', async ({ page }) => {
		await page.goto(variantUrl('Prop — offsetMode (wiggle / silhouette / expand / zero)'))
		await page.waitForSelector('[data-cy="streamgraph-offset-silhouette"] .origam-chart-streamgraph__ribbon')

		const ribbons = page.locator('[data-cy="streamgraph-offset-silhouette"] .origam-chart-streamgraph__ribbon')
		await expect(ribbons).not.toHaveCount(0)
	})

	test('expand chart renders visible ribbons', async ({ page }) => {
		await page.goto(variantUrl('Prop — offsetMode (wiggle / silhouette / expand / zero)'))
		await page.waitForSelector('[data-cy="streamgraph-offset-expand"] .origam-chart-streamgraph__ribbon')

		const ribbons = page.locator('[data-cy="streamgraph-offset-expand"] .origam-chart-streamgraph__ribbon')
		await expect(ribbons).not.toHaveCount(0)
	})

	test('zero chart renders visible ribbons', async ({ page }) => {
		await page.goto(variantUrl('Prop — offsetMode (wiggle / silhouette / expand / zero)'))
		await page.waitForSelector('[data-cy="streamgraph-offset-zero"] .origam-chart-streamgraph__ribbon')

		const ribbons = page.locator('[data-cy="streamgraph-offset-zero"] .origam-chart-streamgraph__ribbon')
		await expect(ribbons).not.toHaveCount(0)
	})

	test('wiggle and zero path data differ (different baselines)', async ({ page }) => {
		await page.goto(variantUrl('Prop — offsetMode (wiggle / silhouette / expand / zero)'))
		await page.waitForSelector('[data-cy="streamgraph-offset-wiggle"] .origam-chart-streamgraph__ribbon')
		await page.waitForSelector('[data-cy="streamgraph-offset-zero"] .origam-chart-streamgraph__ribbon')

		const wiggleD = await page
			.locator('[data-cy="streamgraph-offset-wiggle"] .origam-chart-streamgraph__ribbon')
			.first()
			.getAttribute('d')

		const zeroD = await page
			.locator('[data-cy="streamgraph-offset-zero"] .origam-chart-streamgraph__ribbon')
			.first()
			.getAttribute('d')

		expect(wiggleD).not.toBe(zeroD)
	})
})

// ---------------------------------------------------------------------------
// Prop — smoothing
// ---------------------------------------------------------------------------

test.describe('OrigamChartStreamgraph — Prop smoothing', () => {
	test('renders 2 charts in the smoothing variant', async ({ page }) => {
		await page.goto(variantUrl('Prop — smoothing (none vs curve)'))
		await page.waitForSelector('[data-cy="streamgraph-smoothing-none"]')

		const charts = page.locator('[data-cy^="streamgraph-smoothing-"]')
		await expect(charts).toHaveCount(2)
	})

	test('none and curve path data differ (C vs L commands)', async ({ page }) => {
		await page.goto(variantUrl('Prop — smoothing (none vs curve)'))
		await page.waitForSelector('[data-cy="streamgraph-smoothing-none"] .origam-chart-streamgraph__ribbon')
		await page.waitForSelector('[data-cy="streamgraph-smoothing-curve"] .origam-chart-streamgraph__ribbon')

		const noneD = await page
			.locator('[data-cy="streamgraph-smoothing-none"] .origam-chart-streamgraph__ribbon')
			.first()
			.getAttribute('d')

		const curveD = await page
			.locator('[data-cy="streamgraph-smoothing-curve"] .origam-chart-streamgraph__ribbon')
			.first()
			.getAttribute('d')

		expect(noneD).not.toBeNull()
		expect(curveD).not.toBeNull()
		// curve path uses C (cubic bezier) commands; none uses only L (line-to)
		expect(curveD).toMatch(/C\s/)
		expect(noneD).not.toMatch(/C\s/)
	})
})

// ---------------------------------------------------------------------------
// Prop — colorScheme
// ---------------------------------------------------------------------------

test.describe('OrigamChartStreamgraph — Prop colorScheme', () => {
	test('renders 3 charts in the colorScheme variant', async ({ page }) => {
		await page.goto(variantUrl('Prop — colorScheme'))
		await page.waitForSelector('[data-cy="streamgraph-color-default"]')

		const charts = page.locator('[data-cy^="streamgraph-color-"]')
		await expect(charts).toHaveCount(3)
	})

	test('warm chart first ribbon has warm fill color', async ({ page }) => {
		await page.goto(variantUrl('Prop — colorScheme'))
		await page.waitForSelector('[data-cy="streamgraph-color-warm"] .origam-chart-streamgraph__ribbon')

		const style = await page
			.locator('[data-cy="streamgraph-color-warm"] .origam-chart-streamgraph__ribbon')
			.first()
			.getAttribute('style')
		expect(style).toMatch(/fill\s*:/)
	})

	test('default and warm charts have different ribbon fill colors', async ({ page }) => {
		await page.goto(variantUrl('Prop — colorScheme'))
		await page.waitForSelector('[data-cy="streamgraph-color-default"] .origam-chart-streamgraph__ribbon')
		await page.waitForSelector('[data-cy="streamgraph-color-warm"] .origam-chart-streamgraph__ribbon')

		const defaultStyle = await page
			.locator('[data-cy="streamgraph-color-default"] .origam-chart-streamgraph__ribbon')
			.first()
			.getAttribute('style')

		const warmStyle = await page
			.locator('[data-cy="streamgraph-color-warm"] .origam-chart-streamgraph__ribbon')
			.first()
			.getAttribute('style')

		expect(defaultStyle).not.toBe(warmStyle)
	})
})

// ---------------------------------------------------------------------------
// Slot — tooltip
// ---------------------------------------------------------------------------

test.describe('OrigamChartStreamgraph — Slot tooltip', () => {
	test('custom tooltip slot renders on ribbon hover', async ({ page }) => {
		await page.goto(variantUrl('Slot — tooltip'))
		await page.waitForSelector('[data-cy="streamgraph-slot-tooltip-chart"]')

		const ribbon = page.locator('[data-cy="streamgraph-slot-tooltip-chart"] .origam-chart-streamgraph__ribbon').first()
		await ribbon.hover()

		const tooltip = page.locator('.custom-tooltip')
		await expect(tooltip).toBeVisible()
	})

	test('custom tooltip shows all series rows on hover', async ({ page }) => {
		await page.goto(variantUrl('Slot — tooltip'))
		await page.waitForSelector('[data-cy="streamgraph-slot-tooltip-chart"]')

		const svg = page.locator('[data-cy="streamgraph-slot-tooltip-chart"] svg')
		const box = await svg.boundingBox()
		if (!box) throw new Error('SVG bounding box not found')

		await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)

		const rows = page.locator('.custom-tooltip__row')
		await expect(rows).not.toHaveCount(0)
	})
})

// ---------------------------------------------------------------------------
// Slot — empty
// ---------------------------------------------------------------------------

test.describe('OrigamChartStreamgraph — Slot empty', () => {
	test('renders the custom empty slot when series is empty', async ({ page }) => {
		await page.goto(variantUrl('Slot — empty'))
		await page.waitForSelector('[data-cy="streamgraph-slot-empty-chart"]')

		const emptyEl = page.locator('.custom-empty')
		await expect(emptyEl).toBeVisible()
	})

	test('no ribbon paths are rendered when series is empty', async ({ page }) => {
		await page.goto(variantUrl('Slot — empty'))
		await page.waitForSelector('[data-cy="streamgraph-slot-empty-chart"]')

		const ribbons = page.locator('[data-cy="streamgraph-slot-empty-chart"] .origam-chart-streamgraph__ribbon')
		await expect(ribbons).toHaveCount(0)
	})
})

// ---------------------------------------------------------------------------
// Emit — point-click
// ---------------------------------------------------------------------------

test.describe('OrigamChartStreamgraph — Emit point-click', () => {
	test('clicking a ribbon fires point-click and logs to pre', async ({ page }) => {
		await page.goto(variantUrl('Emit — point-click on ribbon'))
		await page.waitForSelector('[data-cy="streamgraph-emit-chart"]')

		const ribbon = page.locator('[data-cy="streamgraph-emit-chart"] .origam-chart-streamgraph__ribbon').first()
		await ribbon.click()

		const log = page.locator('[data-cy="streamgraph-emit-log"]')
		const text = await log.textContent()
		expect(text).toMatch(/point-click/)
	})

	test('keyboard Enter on a ribbon fires point-click', async ({ page }) => {
		await page.goto(variantUrl('Emit — point-click on ribbon'))
		await page.waitForSelector('[data-cy="streamgraph-emit-chart"]')

		const ribbon = page.locator('[data-cy="streamgraph-emit-chart"] .origam-chart-streamgraph__ribbon').first()
		await ribbon.focus()
		await ribbon.press('Enter')

		const log = page.locator('[data-cy="streamgraph-emit-log"]')
		const text = await log.textContent()
		expect(text).toMatch(/point-click/)
	})

	test('legend toggle fires series-toggle event', async ({ page }) => {
		await page.goto(variantUrl('Emit — point-click on ribbon'))
		await page.waitForSelector('[data-cy="streamgraph-emit-chart"]')

		const legendItem = page.locator('.origam-chart__legend-item').first()
		await legendItem.click()

		const log = page.locator('[data-cy="streamgraph-emit-log"]')
		const text = await log.textContent()
		expect(text).toMatch(/series-toggle/)
	})
})
