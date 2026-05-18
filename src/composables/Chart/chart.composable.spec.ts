import { describe, expect, it } from 'vitest'

import type { IChartSeries } from '../../interfaces'

import type { TChartSmoothing, TChartType } from '../../types'

import { useChart } from './chart.composable'

function makeOptions (overrides: Partial<{
    type: TChartType
    series: Array<IChartSeries>
    categories: Array<string>
    stacked: boolean
    smoothing: TChartSmoothing
    donutHoleSize: number
    yMin: number
    yMax: number
}> = {}) {
    return {
        type: () => overrides.type ?? 'line',
        series: () => overrides.series ?? [],
        categories: () => overrides.categories ?? [],
        stacked: () => overrides.stacked ?? false,
        smoothing: () => overrides.smoothing ?? 'none' as TChartSmoothing,
        donutHoleSize: () => overrides.donutHoleSize ?? 0,
        colorScheme: () => [],
        yMin: () => overrides.yMin,
        yMax: () => overrides.yMax,
        width: () => 400,
        height: () => 200,
        padding: () => ({ top: 20, right: 20, bottom: 30, left: 40 })
    }
}

describe('useChart — viewBox + scales', () => {
    it('formats the SVG viewBox as "0 0 W H"', () => {
        const chart = useChart(makeOptions())
        expect(chart.viewBox.value).toBe('0 0 400 200')
    })

    it('maps the smallest Y value to the bottom of the plot', () => {
        const chart = useChart(makeOptions({
            series: [{ name: 'A', data: [0, 10, 20] }]
        }))
        // Bottom of plot = height (200) - bottom padding (30) = 170
        expect(chart.scales.value.y(0)).toBe(170)
    })

    it('maps the largest Y value above the bottom of the plot', () => {
        const chart = useChart(makeOptions({
            series: [{ name: 'A', data: [0, 50, 100] }]
        }))
        const maxPx = chart.scales.value.y(100)
        expect(maxPx).toBeLessThan(170)
    })

    it('maps categorical X values to indexed positions', () => {
        const chart = useChart(makeOptions({
            categories: ['Jan', 'Feb', 'Mar'],
            series: [{ name: 'A', data: [1, 2, 3] }]
        }))
        const x0 = chart.scales.value.x('Jan', 0, 3)
        const xLast = chart.scales.value.x('Mar', 2, 3)
        expect(x0).toBeLessThan(xLast)
    })
})

describe('useChart — ticks', () => {
    it('emits Y ticks that span the data range', () => {
        const chart = useChart(makeOptions({
            series: [{ name: 'A', data: [0, 10, 20] }]
        }))
        const yTicks = chart.ticks.value.y
        expect(yTicks.length).toBeGreaterThan(2)
        expect(yTicks[0].value).toBeLessThanOrEqual(0)
        expect(yTicks[yTicks.length - 1].value).toBeGreaterThanOrEqual(20)
    })

    it('emits one X tick per category', () => {
        const chart = useChart(makeOptions({
            categories: ['A', 'B', 'C', 'D'],
            series: [{ name: 'S', data: [1, 2, 3, 4] }]
        }))
        expect(chart.ticks.value.x).toHaveLength(4)
    })
})

describe('useChart — paths (line)', () => {
    it('emits a path descriptor per visible line series', () => {
        const chart = useChart(makeOptions({
            type: 'line',
            categories: ['A', 'B'],
            series: [
                { name: 'S1', data: [1, 2] },
                { name: 'S2', data: [3, 4] }
            ]
        }))
        const linePaths = chart.paths.value.filter((p) => p.kind === 'path')
        expect(linePaths.length).toBeGreaterThanOrEqual(2)
    })

    it('skips hidden series', () => {
        const chart = useChart(makeOptions({
            type: 'line',
            categories: ['A', 'B'],
            series: [
                { name: 'S1', data: [1, 2] },
                { name: 'S2', data: [3, 4], visible: false }
            ]
        }))
        const series2Paths = chart.paths.value.filter((p) => p.series.name === 'S2')
        expect(series2Paths).toHaveLength(0)
    })

    it('line series paths have no variant set', () => {
        const chart = useChart(makeOptions({
            type: 'line',
            categories: ['A', 'B'],
            series: [{ name: 'S', data: [1, 2] }]
        }))
        const linePaths = chart.paths.value.filter((p) => p.kind === 'path')
        for (const p of linePaths) {
            expect(p.variant).toBeUndefined()
        }
    })
})

describe('useChart — paths (area)', () => {
    it('emits two path descriptors per area series: a fill and a stroke', () => {
        const chart = useChart(makeOptions({
            type: 'area',
            categories: ['A', 'B', 'C'],
            series: [{ name: 'S', data: [1, 2, 3] }]
        }))
        const areaPaths = chart.paths.value.filter((p) => p.kind === 'path')
        expect(areaPaths.length).toBeGreaterThanOrEqual(2)
        const fillPaths = areaPaths.filter((p) => p.variant === 'fill')
        const strokePaths = areaPaths.filter((p) => p.variant === 'stroke')
        expect(fillPaths).toHaveLength(1)
        expect(strokePaths).toHaveLength(1)
    })

    it('fill path closes down to the baseline (contains Z)', () => {
        const chart = useChart(makeOptions({
            type: 'area',
            categories: ['A', 'B'],
            series: [{ name: 'S', data: [5, 10] }]
        }))
        const fillPath = chart.paths.value.find((p) => p.kind === 'path' && p.variant === 'fill')
        expect(fillPath?.d).toBeDefined()
        expect(fillPath!.d!.endsWith('Z')).toBe(true)
    })

    it('stroke path does not close (no trailing Z)', () => {
        const chart = useChart(makeOptions({
            type: 'area',
            categories: ['A', 'B'],
            series: [{ name: 'S', data: [5, 10] }]
        }))
        const strokePath = chart.paths.value.find((p) => p.kind === 'path' && p.variant === 'stroke')
        expect(strokePath?.d).toBeDefined()
        expect(strokePath!.d!.endsWith('Z')).toBe(false)
    })
})

describe('useChart — paths (pie/donut)', () => {
    it('emits one slice per data point for a pie', () => {
        const chart = useChart(makeOptions({
            type: 'pie',
            series: [{ name: 'S', data: [10, 20, 30], type: 'pie' }]
        }))
        expect(chart.paths.value).toHaveLength(3)
        for (const p of chart.paths.value) {
            expect(p.d).toContain('A')
        }
    })

    it('skips zero / negative values from the slice list', () => {
        const chart = useChart(makeOptions({
            type: 'pie',
            series: [{ name: 'S', data: [10, 0, 20, -5], type: 'pie' }]
        }))
        expect(chart.paths.value).toHaveLength(2)
    })

    it('donut paths contain two A commands per slice', () => {
        const chart = useChart(makeOptions({
            type: 'donut',
            donutHoleSize: 0.5,
            series: [{ name: 'S', data: [10, 20], type: 'donut' }]
        }))
        for (const p of chart.paths.value) {
            const arcs = (p.d?.match(/A/g) ?? []).length
            expect(arcs).toBe(2)
        }
    })
})

describe('useChart — paths (bar/column)', () => {
    it('emits one rect per data point for a column chart', () => {
        const chart = useChart(makeOptions({
            type: 'column',
            categories: ['A', 'B', 'C'],
            series: [{ name: 'S', data: [10, 20, 30], type: 'column' }]
        }))
        const rects = chart.paths.value.filter((p) => p.kind === 'rect')
        expect(rects).toHaveLength(3)
    })

    it('stacks columns when stacked=true', () => {
        const chart = useChart(makeOptions({
            type: 'column',
            stacked: true,
            categories: ['A', 'B'],
            series: [
                { name: 'S1', data: [10, 20], type: 'column' },
                { name: 'S2', data: [5, 15], type: 'column' }
            ]
        }))
        // The two rects at index 0 should share the same X but
        // stack vertically (different Y).
        const s1Rects = chart.paths.value.filter((p) => p.series.name === 'S1' && p.kind === 'rect')
        const s2Rects = chart.paths.value.filter((p) => p.series.name === 'S2' && p.kind === 'rect')
        expect(s1Rects).toHaveLength(2)
        expect(s2Rects).toHaveLength(2)
        // Different Y positions in stacked mode.
        expect(s1Rects[0].rect?.y).not.toBe(s2Rects[0].rect?.y)
    })
})

describe('useChart — paths (scatter / radar)', () => {
    it('emits one circle per data point for scatter', () => {
        const chart = useChart(makeOptions({
            type: 'scatter',
            series: [{
                name: 'S',
                data: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }],
                type: 'scatter'
            }]
        }))
        const circles = chart.paths.value.filter((p) => p.kind === 'circle')
        expect(circles).toHaveLength(3)
    })

    it('emits a polygon for radar', () => {
        const chart = useChart(makeOptions({
            type: 'radar',
            categories: ['speed', 'power', 'agility', 'stamina'],
            series: [{ name: 'S', data: [1, 2, 3, 4], type: 'radar' }]
        }))
        const polys = chart.paths.value.filter((p) => p.kind === 'polygon')
        expect(polys).toHaveLength(1)
    })
})

describe('useChart — legend + hover', () => {
    it('emits one legend entry per series', () => {
        const chart = useChart(makeOptions({
            series: [
                { name: 'A', data: [1] },
                { name: 'B', data: [2] },
                { name: 'C', data: [3] }
            ]
        }))
        expect(chart.legend.value).toHaveLength(3)
    })

    it('reflects visibility in the legend', () => {
        const chart = useChart(makeOptions({
            series: [
                { name: 'A', data: [1] },
                { name: 'B', data: [2], visible: false }
            ]
        }))
        expect(chart.legend.value[0].visible).toBe(true)
        expect(chart.legend.value[1].visible).toBe(false)
    })

    it('updates hover via onPointHover', () => {
        const chart = useChart(makeOptions())
        expect(chart.hover.value).toBeNull()
        chart.onPointHover({
            seriesIndex: 0,
            seriesName: 'S',
            dataIndex: 0,
            x: 'A',
            y: 10,
            color: '#000'
        })
        expect(chart.hover.value).not.toBeNull()
        chart.onPointHover(null)
        expect(chart.hover.value).toBeNull()
    })
})
