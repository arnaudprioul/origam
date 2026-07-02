/**
 * Tukey five-number summary computation with 1.5·IQR outlier detection.
 *
 * Algorithm:
 *  1. Sort samples ascending.
 *  2. Compute Q1 and Q3 via linear interpolation at the 25th and 75th
 *     percentile positions (same as PERCENTILE.INC in Excel / numpy).
 *  3. Compute IQR = Q3 − Q1.
 *  4. Lower fence = Q1 − 1.5·IQR; upper fence = Q3 + 1.5·IQR.
 *  5. Whisker min = smallest sample >= lower fence.
 *     Whisker max = largest sample <= upper fence.
 *  6. Outliers = samples outside [lower fence, upper fence].
 */

import type { IBoxPlotStats } from '../../interfaces/Chart/chart-box-plot.interface'

export type { IBoxPlotStats }

/**
 * Interpolates the value at position `p` (0..1) in a sorted array.
 * Uses the "inclusive" linear-interpolation rule (same as PERCENTILE.INC).
 */
const interpolate = (sorted: Array<number>, p: number): number => {
	const n = sorted.length
	if (n === 0) return 0
	if (n === 1) return sorted[0]

	const pos = p * (n - 1)
	const lo = Math.floor(pos)
	const hi = Math.ceil(pos)
	const frac = pos - lo

	if (lo === hi) return sorted[lo]
	return sorted[lo] + frac * (sorted[hi] - sorted[lo])
}

/**
 * Computes the five-number Tukey summary for the given sample array.
 *
 * @param samples - Array of numeric observations (need not be sorted,
 *   may be empty).
 * @returns Statistical summary with whisker bounds and outlier list.
 */
export function computeQuartiles (samples: Array<number>): IBoxPlotStats {
	const finite = samples.filter((v) => Number.isFinite(v))
	if (finite.length === 0) {
		return { min: 0, q1: 0, median: 0, q3: 0, max: 0, iqr: 0, outliers: [] }
	}

	const sorted = [...finite].sort((a, b) => a - b)

	const q1 = interpolate(sorted, 0.25)
	const median = interpolate(sorted, 0.5)
	const q3 = interpolate(sorted, 0.75)
	const iqr = q3 - q1

	const lowerFence = q1 - 1.5 * iqr
	const upperFence = q3 + 1.5 * iqr

	const outliers: Array<number> = []
	const inliers: Array<number> = []

	for (const v of sorted) {
		if (v < lowerFence || v > upperFence) {
			outliers.push(v)
		} else {
			inliers.push(v)
		}
	}

	const whiskerMin = inliers.length > 0 ? inliers[0] : sorted[0]
	const whiskerMax = inliers.length > 0 ? inliers[inliers.length - 1] : sorted[sorted.length - 1]

	return {
		min: whiskerMin,
		q1,
		median,
		q3,
		max: whiskerMax,
		iqr,
		outliers
	}
}

/**
 * Returns `true` if the given datum is a raw-samples datum (has a
 * `samples` array property rather than pre-aggregated stats).
 */
export function isRawDatum (datum: unknown): datum is { category: string, samples: Array<number>, color?: string } {
	return (
		typeof datum === 'object' &&
		datum !== null &&
		Array.isArray((datum as Record<string, unknown>).samples)
	)
}
