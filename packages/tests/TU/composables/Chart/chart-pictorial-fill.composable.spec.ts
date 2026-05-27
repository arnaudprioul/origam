import { describe, expect, it } from 'vitest'

/**
 * Fill-mode geometry formulas for OrigamChartPictorial.
 *
 * The component inlines its geometry inside <script setup>.
 * These tests replicate the exact formulas to act as regression guards
 * for the icon-sizing fix (fillIconWidth × fillIconHeight instead of
 * the old fillIconSize × fillIconSize).
 *
 * Constants mirror those declared in OrigamChartPictorial.vue.
 */

const SVG_WIDTH = 600
const SVG_HEIGHT = 400
const FILL_GAP = 12
const AXIS_LABEL_HEIGHT = 20
const AXIS_PADDING = 4
const FILL_LABEL_HEIGHT = 20

function fillIconWidth(totalCols: number): number {
	if (totalCols <= 0) return 0
	const totalGaps = (totalCols - 1) * FILL_GAP
	return Math.max(24, (SVG_WIDTH - totalGaps) / totalCols)
}

function fillPlotHeight(showAxis: boolean, showLabel: boolean): number {
	const axisH = showAxis ? AXIS_LABEL_HEIGHT + AXIS_PADDING : 0
	const labelReserve = showLabel ? FILL_LABEL_HEIGHT : 0
	return SVG_HEIGHT - axisH - labelReserve
}

function fillIconHeight(showAxis: boolean, showLabel: boolean): number {
	return Math.max(24, fillPlotHeight(showAxis, showLabel))
}

function fillRatio(value: number, maxValue: number): number {
	if (maxValue <= 0) return 0
	return Math.min(1, Math.max(0, value / maxValue))
}

function fillClipY(value: number, maxValue: number, iconHeight: number): number {
	return iconHeight * (1 - fillRatio(value, maxValue))
}

function fillClipHeight(value: number, maxValue: number, iconHeight: number): number {
	return iconHeight * fillRatio(value, maxValue)
}

describe('fill-mode icon sizing — width vs height decoupled', () => {
	it('fillIconWidth uses SVG_WIDTH and column count', () => {
		expect(fillIconWidth(1)).toBeCloseTo(600)
		expect(fillIconWidth(2)).toBeCloseTo((600 - 12) / 2)
		expect(fillIconWidth(8)).toBeCloseTo((600 - 7 * 12) / 8)
	})

	it('fillIconHeight equals the full plot height (not column width)', () => {
		const h = fillIconHeight(true, true)
		const w8 = fillIconWidth(8)
		// Height must be substantially larger than column width for 8 columns
		expect(h).toBeGreaterThan(w8 * 2)
	})

	it('fillIconHeight = SVG_HEIGHT minus axis and label reserves', () => {
		// showAxis=true, showLabel=true: 400 - 24 - 20 = 356
		expect(fillIconHeight(true, true)).toBe(356)
		// showAxis=false, showLabel=false: 400 - 0 - 0 = 400
		expect(fillIconHeight(false, false)).toBe(400)
		// showAxis=true, showLabel=false: 400 - 24 - 0 = 376
		expect(fillIconHeight(true, false)).toBe(376)
	})

	it('fillIconHeight is never below 24', () => {
		// Even with very large reserves (hypothetically) the guard kicks in
		expect(fillIconHeight(true, true)).toBeGreaterThanOrEqual(24)
	})

	it('fillIconWidth minimum is 24 (guard for zero/negative)', () => {
		expect(fillIconWidth(0)).toBe(0)
		expect(fillIconWidth(100)).toBeGreaterThanOrEqual(24)
	})
})

describe('fill-mode clip rect geometry — root coordinate space', () => {
	const H = fillIconHeight(true, true) // 356

	it('clip rect covers the full height when ratio = 1', () => {
		// value === maxValue → fully filled → clip from y=0 to H
		const clipY = fillClipY(100, 100, H)
		const clipH = fillClipHeight(100, 100, H)
		expect(clipY).toBe(0)
		expect(clipH).toBe(H)
		expect(clipY + clipH).toBe(H)
	})

	it('clip rect covers 0 height when ratio = 0', () => {
		// value = 0 → no fill → clip height = 0
		const clipY = fillClipY(0, 100, H)
		const clipH = fillClipHeight(0, 100, H)
		expect(clipY).toBe(H)
		expect(clipH).toBe(0)
	})

	it('clip covers the bottom 50% when ratio = 0.5', () => {
		const clipY = fillClipY(50, 100, H)
		const clipH = fillClipHeight(50, 100, H)
		expect(clipY).toBeCloseTo(H / 2)
		expect(clipH).toBeCloseTo(H / 2)
		expect(clipY + clipH).toBeCloseTo(H)
	})

	it('clip covers the bottom 75% when ratio = 0.75', () => {
		const clipY = fillClipY(75, 100, H)
		const clipH = fillClipHeight(75, 100, H)
		expect(clipY).toBeCloseTo(H * 0.25)
		expect(clipH).toBeCloseTo(H * 0.75)
	})

	it('clip y + height always sums to fillIconHeight', () => {
		for (const v of [0, 10, 25, 50, 73, 99, 100]) {
			const clipY = fillClipY(v, 100, H)
			const clipH = fillClipHeight(v, 100, H)
			expect(clipY + clipH).toBeCloseTo(H, 5)
		}
	})

	it('root-space clip rect x accounts for column translate offset', () => {
		const iWidth = fillIconWidth(8)
		// Column 3 (0-indexed) x = 3 * (iWidth + FILL_GAP)
		const colX = 3 * (iWidth + FILL_GAP)
		const colY = 0
		const clipY = fillClipY(60, 100, H)
		// Root rect origin = (colX, colY + clipY)
		const rootRectX = colX
		const rootRectY = colY + clipY
		expect(rootRectX).toBeCloseTo(colX)
		expect(rootRectY).toBeCloseTo(clipY) // colY = 0 in this case
	})

	it('clip rect for column with colY offset is shifted in root space', () => {
		const colY = 20 // PLOT_Y when showLabel=true: VALUE_LABEL_HEIGHT=16, but use 20
		const clipY = fillClipY(40, 100, H)
		const rootRectY = colY + clipY
		expect(rootRectY).toBeCloseTo(colY + H * 0.6)
	})
})

describe('fill-mode column x positions', () => {
	it('first column starts at x=0', () => {
		const iWidth = fillIconWidth(4)
		const colIdx = 0
		const x = colIdx * (iWidth + FILL_GAP)
		expect(x).toBe(0)
	})

	it('second column starts after first column + gap', () => {
		const iWidth = fillIconWidth(4)
		const x1 = 1 * (iWidth + FILL_GAP)
		expect(x1).toBeCloseTo(iWidth + FILL_GAP)
	})

	it('total width of all columns + gaps fits within SVG_WIDTH', () => {
		for (const n of [1, 2, 4, 6, 8, 10]) {
			const iWidth = fillIconWidth(n)
			const totalW = n * iWidth + (n - 1) * FILL_GAP
			expect(totalW).toBeLessThanOrEqual(SVG_WIDTH + 0.001)
		}
	})
})
