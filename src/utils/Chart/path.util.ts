/**
 * Pure SVG path-string helpers consumed by `useChart`. Each function
 * is intentionally **stateless** — given the same coordinates it
 * always returns the same string. Keeping them out of the composable
 * is what makes the chart render-safe on the server (no DOM
 * measurement, no `getBBox()`, no `window.*`).
 *
 * The helpers are intentionally low-level: they expect already-scaled
 * pixel coordinates and don't know about data ranges, padding, or
 * categorical axes — `useChart` handles the scale and feeds the
 * scaled points in.
 */

/** A pre-scaled `[x, y]` coordinate pair (pixels in the SVG viewBox). */
export type TPathPoint = [number, number]

/**
 * Joins a list of pixel points with straight segments.
 *
 * Returns an empty string when `points` is empty so callers don't
 * emit `<path d="">` (Chrome logs a warning).
 *
 * ```ts
 * linePath([[0,0],[10,10],[20,5]])  // 'M0,0 L10,10 L20,5'
 * ```
 */
export const linePath = (points: Array<TPathPoint>): string => {
    if (!points.length) return ''
    const [first, ...rest] = points
    const head = `M${formatNum(first[0])},${formatNum(first[1])}`
    const tail = rest.map(([x, y]) => `L${formatNum(x)},${formatNum(y)}`).join(' ')
    return tail.length ? `${head} ${tail}` : head
}

/**
 * Catmull-Rom-derived cubic-Bezier path through `points`. Produces a
 * visually smoother line than `linePath` at the cost of a small
 * overshoot near sharp peaks (documented in `<OrigamChart>` doc).
 *
 * Falls back to `linePath` when there are fewer than 3 points (a
 * single segment doesn't have enough neighbours to compute tangents).
 */
export const smoothPath = (points: Array<TPathPoint>): string => {
    if (points.length < 3) return linePath(points)

    const [first] = points
    let d = `M${formatNum(first[0])},${formatNum(first[1])}`

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] ?? points[i]
        const p1 = points[i]
        const p2 = points[i + 1]
        const p3 = points[i + 2] ?? p2

        // Catmull-Rom -> Bezier tangents (tension = 0.5)
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6

        d += ` C${formatNum(cp1x)},${formatNum(cp1y)} ${formatNum(cp2x)},${formatNum(cp2y)} ${formatNum(p2[0])},${formatNum(p2[1])}`
    }

    return d
}

/**
 * Closes the path produced by `linePath` / `smoothPath` down to the
 * `baselineY` then back to the first X — the canonical "area chart"
 * shape.
 *
 * Pass the smoothed line in via `lineD` so the area shares the
 * exact curve of the visible stroke.
 */
export const areaPath = (
    points: Array<TPathPoint>,
    baselineY: number,
    smooth = false
): string => {
    if (!points.length) return ''
    const lineD = smooth ? smoothPath(points) : linePath(points)
    const lastX = points[points.length - 1][0]
    const firstX = points[0][0]
    return `${lineD} L${formatNum(lastX)},${formatNum(baselineY)} L${formatNum(firstX)},${formatNum(baselineY)} Z`
}

/**
 * SVG arc path for a pie / donut slice.
 *
 * - `cx`, `cy` — center of the chart.
 * - `outerR` — outer radius (pie radius).
 * - `innerR` — inner radius (`0` for pie, `> 0` for donut).
 * - `startAngle`, `endAngle` — radians, mathematical convention
 *   (zero at 3 o'clock, increasing counter-clockwise). The helper
 *   converts internally to the SVG convention (zero at noon,
 *   clockwise) so callers can reason in standard math.
 *
 * Returns an empty string when the sweep is zero (avoids a
 * malformed `M…A…M…A…Z`).
 */
export const arcPath = (
    cx: number,
    cy: number,
    outerR: number,
    innerR: number,
    startAngle: number,
    endAngle: number
): string => {
    const sweep = endAngle - startAngle
    if (Math.abs(sweep) < 1e-6) return ''

    // Math angle (0 at 3 o'clock, CCW) -> SVG angle (0 at noon, CW)
    const toSvg = (a: number) => a - Math.PI / 2

    const sa = toSvg(startAngle)
    const ea = toSvg(endAngle)
    const largeArc = Math.abs(sweep) > Math.PI ? 1 : 0
    const sweepFlag = sweep > 0 ? 1 : 0

    const x1 = cx + outerR * Math.cos(sa)
    const y1 = cy + outerR * Math.sin(sa)
    const x2 = cx + outerR * Math.cos(ea)
    const y2 = cy + outerR * Math.sin(ea)

    if (innerR <= 0) {
        // Pie slice — closed wedge through the center.
        return `M${formatNum(cx)},${formatNum(cy)} L${formatNum(x1)},${formatNum(y1)} A${formatNum(outerR)},${formatNum(outerR)} 0 ${largeArc},${sweepFlag} ${formatNum(x2)},${formatNum(y2)} Z`
    }

    // Donut slice — outer arc, inner arc reverse-swept.
    const ix1 = cx + innerR * Math.cos(sa)
    const iy1 = cy + innerR * Math.sin(sa)
    const ix2 = cx + innerR * Math.cos(ea)
    const iy2 = cy + innerR * Math.sin(ea)
    const innerSweepFlag = sweep > 0 ? 0 : 1

    return [
        `M${formatNum(x1)},${formatNum(y1)}`,
        `A${formatNum(outerR)},${formatNum(outerR)} 0 ${largeArc},${sweepFlag} ${formatNum(x2)},${formatNum(y2)}`,
        `L${formatNum(ix2)},${formatNum(iy2)}`,
        `A${formatNum(innerR)},${formatNum(innerR)} 0 ${largeArc},${innerSweepFlag} ${formatNum(ix1)},${formatNum(iy1)}`,
        'Z'
    ].join(' ')
}

/**
 * Polygon path through `points` (radar / area-fill of a radar).
 *
 * Returns an empty string when `points` is empty. The path is
 * **closed** (`Z` at the end) so the consumer can fill it without
 * worrying about the start/end gap.
 */
export const polygonPath = (points: Array<TPathPoint>): string => {
    if (!points.length) return ''
    const [first, ...rest] = points
    const head = `M${formatNum(first[0])},${formatNum(first[1])}`
    const tail = rest.map(([x, y]) => `L${formatNum(x)},${formatNum(y)}`).join(' ')
    return tail.length ? `${head} ${tail} Z` : `${head} Z`
}

/**
 * Cartesian length of a polyline. Used by the chart to seed
 * `stroke-dasharray` / `stroke-dashoffset` for the entrance
 * animation (the "drawing" effect on line / area charts).
 */
export const pathLength = (points: Array<TPathPoint>): number => {
    if (points.length < 2) return 0
    let total = 0
    for (let i = 1; i < points.length; i++) {
        const dx = points[i][0] - points[i - 1][0]
        const dy = points[i][1] - points[i - 1][1]
        total += Math.sqrt(dx * dx + dy * dy)
    }
    return total
}

/**
 * Convert a polar (cx, cy, radius, angle) into a Cartesian
 * `[x, y]` pixel pair. Used by radar and pie to position labels.
 *
 * Angles use the mathematical convention (radians, zero at 3
 * o'clock, CCW) — `arcPath` and `polarToCartesian` are
 * consistent.
 */
export const polarToCartesian = (
    cx: number,
    cy: number,
    radius: number,
    angle: number
): TPathPoint => {
    // Match `arcPath` — visually we want zero at noon, clockwise.
    const a = angle - Math.PI / 2
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)]
}

/**
 * Trim a floating-point coordinate to 3 decimals — visually
 * indistinguishable from full precision but cuts the resulting
 * `d` attribute by ~40 % on dense charts (every char counts in
 * the SVG payload over the wire).
 */
const formatNum = (n: number): string => {
    if (!Number.isFinite(n)) return '0'
    const rounded = Math.round(n * 1000) / 1000
    return rounded === 0 ? '0' : String(rounded)
}
