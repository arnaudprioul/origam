import { describe, expect, it } from 'vitest'

import {
    arcPath,
    areaPath,
    linePath,
    pathLength,
    polarToCartesian,
    polygonPath,
    smoothPath,
    type TPathPoint
} from './path.util'

describe('linePath', () => {
    it('returns empty string for an empty list', () => {
        expect(linePath([])).toBe('')
    })

    it('emits a single M for a single point', () => {
        expect(linePath([[1, 2]])).toBe('M1,2')
    })

    it('joins multiple points with L commands', () => {
        expect(linePath([[0, 0], [10, 10], [20, 5]])).toBe('M0,0 L10,10 L20,5')
    })

    it('trims sub-millipixel precision', () => {
        // 1.0001 should round to 1
        expect(linePath([[1.0001, 2.0001]])).toBe('M1,2')
    })
})

describe('smoothPath', () => {
    it('falls back to a straight line below 3 points', () => {
        const pts: Array<TPathPoint> = [[0, 0], [10, 10]]
        expect(smoothPath(pts)).toBe('M0,0 L10,10')
    })

    it('emits cubic Bezier commands for 3+ points', () => {
        const pts: Array<TPathPoint> = [[0, 0], [10, 10], [20, 0]]
        const d = smoothPath(pts)
        expect(d.startsWith('M0,0')).toBe(true)
        expect(d).toContain('C')
    })
})

describe('areaPath', () => {
    it('closes the line down to the baseline and back to the first X', () => {
        const d = areaPath([[0, 0], [10, 10]], 50)
        expect(d).toContain('L10,50')
        expect(d).toContain('L0,50')
        expect(d.endsWith('Z')).toBe(true)
    })

    it('returns empty string for an empty input', () => {
        expect(areaPath([], 50)).toBe('')
    })
})

describe('arcPath', () => {
    it('returns empty string for a zero sweep', () => {
        expect(arcPath(50, 50, 40, 0, 0, 0)).toBe('')
    })

    it('emits a pie slice (M cx, A, Z) when innerR is 0', () => {
        const d = arcPath(50, 50, 40, 0, 0, Math.PI / 2)
        expect(d.startsWith('M50,50')).toBe(true)
        expect(d).toContain('A40,40')
        expect(d.endsWith('Z')).toBe(true)
    })

    it('emits a donut slice (two arcs) when innerR > 0', () => {
        const d = arcPath(50, 50, 40, 20, 0, Math.PI / 2)
        const arcs = (d.match(/A/g) ?? []).length
        expect(arcs).toBe(2)
    })

    it('sets largeArc=1 when the sweep exceeds π', () => {
        const d = arcPath(50, 50, 40, 0, 0, Math.PI * 1.5)
        // Format is "A r,r 0 largeArc,sweepFlag x,y"
        expect(d).toMatch(/A40,40 0 1,/)
    })
})

describe('polygonPath', () => {
    it('returns empty string for an empty input', () => {
        expect(polygonPath([])).toBe('')
    })

    it('emits a closed polygon path', () => {
        const d = polygonPath([[0, 0], [10, 0], [5, 10]])
        expect(d).toBe('M0,0 L10,0 L5,10 Z')
    })
})

describe('pathLength', () => {
    it('returns 0 for fewer than 2 points', () => {
        expect(pathLength([])).toBe(0)
        expect(pathLength([[1, 1]])).toBe(0)
    })

    it('computes cartesian polyline length', () => {
        // 3-4-5 right triangle
        expect(pathLength([[0, 0], [3, 0], [3, 4]])).toBe(7)
    })
})

describe('polarToCartesian', () => {
    it('maps angle 0 to the top of the circle (SVG noon)', () => {
        const [x, y] = polarToCartesian(50, 50, 10, 0)
        expect(Math.round(x)).toBe(50)
        expect(Math.round(y)).toBe(40)
    })

    it('maps angle π to the bottom of the circle', () => {
        const [x, y] = polarToCartesian(50, 50, 10, Math.PI)
        expect(Math.round(x)).toBe(50)
        expect(Math.round(y)).toBe(60)
    })
})
