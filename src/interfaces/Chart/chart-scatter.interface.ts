import type { IChartBaseProps } from '../../interfaces'

/**
 * Props for `<OrigamChartScatter>` — scatter plot
 *
 * Type-specific wrapper around `<OrigamChart type="scatter">`
 * with a tightly-typed surface (no `type` prop, only options
 * relevant to scatter charts).
 */
export interface IChartScatterProps extends IChartBaseProps {
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
