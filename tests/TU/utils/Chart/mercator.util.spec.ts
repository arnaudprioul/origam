import { describe, expect, it } from 'vitest'

import {
    mercatorProject,
    multiPolygonCentroid,
    multiPolygonToSvgPath,
    polygonToSvgPath
} from '@origam/utils/Chart/mercator.util'

describe('mercatorProject', () => {
    it('projects Paris to approximately (506, 172) on 1000×500', () => {
        const [x, y] = mercatorProject(2.35, 48.85)
        expect(x).toBeGreaterThan(500)
        expect(x).toBeLessThan(515)
        expect(y).toBeGreaterThan(165)
        expect(y).toBeLessThan(180)
    })

    it('projects the prime meridian / equator (0, 0) to (500, 250)', () => {
        const [x, y] = mercatorProject(0, 0)
        expect(Math.round(x)).toBe(500)
        expect(Math.round(y)).toBe(250)
    })

    it('projects (-180, 0) to the left edge (x ≈ 0)', () => {
        const [x] = mercatorProject(-180, 0)
        expect(x).toBeLessThanOrEqual(1)
    })

    it('projects (180, 0) to the right edge (x ≈ 1000)', () => {
        const [x] = mercatorProject(180, 0)
        expect(x).toBeGreaterThanOrEqual(999)
    })

    it('places northern latitudes above southern latitudes (smaller y)', () => {
        const [, yNorth] = mercatorProject(0, 60)
        const [, ySouth] = mercatorProject(0, -60)
        expect(yNorth).toBeLessThan(ySouth)
    })

    it('places western longitudes left of eastern longitudes (smaller x)', () => {
        const [xWest] = mercatorProject(-90, 0)
        const [xEast] = mercatorProject(90, 0)
        expect(xWest).toBeLessThan(xEast)
    })

    it('clamps latitude beyond ±85° without throwing', () => {
        expect(() => mercatorProject(0, 90)).not.toThrow()
        expect(() => mercatorProject(0, -90)).not.toThrow()
    })

    it('projects Sydney to bottom-right quadrant of canvas', () => {
        const [x, y] = mercatorProject(151.2, -33.9)
        expect(x).toBeGreaterThan(900)
        expect(y).toBeGreaterThan(250)
    })

    it('projects New York to left-center of canvas', () => {
        const [x, y] = mercatorProject(-74.0, 40.7)
        expect(x).toBeGreaterThan(250)
        expect(x).toBeLessThan(320)
        expect(y).toBeGreaterThan(170)
        expect(y).toBeLessThan(220)
    })

    it('uses provided width and height', () => {
        const [x, y] = mercatorProject(0, 0, 800, 400)
        expect(Math.round(x)).toBe(400)
        expect(Math.round(y)).toBe(200)
    })
})

describe('polygonToSvgPath', () => {
    it('returns empty string for fewer than 3 points', () => {
        expect(polygonToSvgPath([[0, 0], [1, 1]])).toBe('')
        expect(polygonToSvgPath([])).toBe('')
    })

    it('returns a closed path string for a valid polygon', () => {
        const path = polygonToSvgPath([
            [0, 0], [10, 0], [10, 45]
        ])
        expect(path).toMatch(/^M/)
        expect(path).toMatch(/Z$/)
    })

    it('starts with M and ends with Z for a triangle', () => {
        const path = polygonToSvgPath([[-10, -10], [10, -10], [0, 10]])
        const parts = path.split(' ')
        expect(parts[0]).toMatch(/^M/)
        expect(parts[parts.length - 1]).toBe('Z')
    })

    it('has 3 L commands for a 4-point polygon', () => {
        const path = polygonToSvgPath([
            [0, 0], [10, 0], [10, 45], [0, 45]
        ])
        const lCount = (path.match(/L/g) ?? []).length
        expect(lCount).toBe(3)
    })
})

describe('multiPolygonToSvgPath', () => {
    it('returns empty string for empty multi-polygon', () => {
        expect(multiPolygonToSvgPath([])).toBe('')
    })

    it('joins multiple polygon subpaths', () => {
        const path = multiPolygonToSvgPath([
            [[-10, 0], [0, 10], [10, 0]],
            [[-5, -10], [5, -10], [0, -20]]
        ])
        const zCount = (path.match(/Z/g) ?? []).length
        expect(zCount).toBe(2)
    })

    it('skips degenerate polygons (< 3 points)', () => {
        const path = multiPolygonToSvgPath([
            [[0, 0], [10, 0]],
            [[-10, 0], [0, 10], [10, 0]]
        ])
        const zCount = (path.match(/Z/g) ?? []).length
        expect(zCount).toBe(1)
    })
})

describe('multiPolygonCentroid', () => {
    it('returns canvas center for an empty polygon', () => {
        const [x, y] = multiPolygonCentroid([])
        expect(x).toBe(500)
        expect(y).toBe(250)
    })

    it('projects centroid of a simple symmetric polygon near center', () => {
        const [x, y] = multiPolygonCentroid([[[-10, 0], [10, 0], [0, 0]]])
        expect(x).toBeGreaterThan(400)
        expect(x).toBeLessThan(600)
        expect(y).toBeGreaterThan(200)
        expect(y).toBeLessThan(300)
    })

    it('returns a deterministic result for known coordinates (Paris region)', () => {
        const [x, y] = multiPolygonCentroid([[[2.0, 48.0], [2.5, 49.0], [3.0, 48.5]]])
        expect(x).toBeGreaterThan(500)
        expect(x).toBeLessThan(515)
        expect(y).toBeGreaterThan(160)
        expect(y).toBeLessThan(185)
    })
})
