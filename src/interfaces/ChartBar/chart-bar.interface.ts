import type { IChartBaseProps } from '../../interfaces'

/**
 * Props for `<OrigamChartBar>` — horizontal bar chart
 *
 * Type-specific wrapper around `<OrigamChart type="bar">`
 * with a tightly-typed surface (no `type` prop, only options
 * relevant to bar charts).
 */
export interface IChartBarProps extends IChartBaseProps {
/** Stack series on top of each other. Default `false`. */
    stacked?: boolean
}
