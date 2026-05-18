import type { IChartBaseProps } from '../../interfaces'
import type { TChartSmoothing } from '../../types'
/**
 * Props for `<OrigamChartLine>` — line chart with optional smoothing
 *
 * Type-specific wrapper around `<OrigamChart type="line">`
 * with a tightly-typed surface (no `type` prop, only options
 * relevant to line charts).
 */
export interface IChartLineProps extends IChartBaseProps {

    /**
     * Smoothing strategy. `'none'` = straight segments. `'curve'` =
     * cubic Bezier with Catmull-Rom tangents.
     * @default 'none'
     */
    smoothing?: TChartSmoothing
    /** Override the auto-computed Y min. */
    yMin?: number
    /** Override the auto-computed Y max. */
    yMax?: number
    /** Render grid lines behind the plot. Default `true`. */
    showGrid?: boolean
    /** Render X / Y axes + tick labels. Default `true`. */
    showAxis?: boolean
    /** Formatter applied to X-axis tick labels. */
    xAxisFormat?: (value: string | number) => string
    /** Formatter applied to Y-axis tick labels. */
    yAxisFormat?: (value: number) => string
}
