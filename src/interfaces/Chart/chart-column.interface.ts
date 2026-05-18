import type { IChartBaseProps } from '../../interfaces'

/**
 * Props for `<OrigamChartColumn>` — vertical column chart
 *
 * Type-specific wrapper around `<OrigamChart type="column">`
 * with a tightly-typed surface (no `type` prop, only options
 * relevant to column charts).
 */
export interface IChartColumnProps extends IChartBaseProps {
/** Stack series on top of each other. Default `false`. */
    stacked?: boolean
}
