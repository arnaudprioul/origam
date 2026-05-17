/**
 * Path smoothing strategy for `line` / `area` charts.
 *
 * - `'none'` — straight line segments between data points (default).
 * - `'curve'` — cubic Bezier between every pair of points using a
 *   tangent estimation à la Catmull-Rom. Visually smoother but
 *   slightly overshoots at sharp peaks; documented as a trade-off
 *   in the doc.
 */
export type TChartSmoothing = 'none' | 'curve'
