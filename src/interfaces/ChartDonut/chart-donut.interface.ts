import type { IChartBaseProps } from '../../interfaces'

/**
 * Props for `<OrigamChartDonut>` — donut chart (pie with a centered hole)
 *
 * Type-specific wrapper around `<OrigamChart type="donut">`
 * with a tightly-typed surface (no `type` prop, only options
 * relevant to donut charts).
 */
export interface IChartDonutProps extends IChartBaseProps {
/**
     * Inner-radius proportion. `0` collapses to a pie, `1` to a
     * zero-thickness ring.
     * @default 0.6
     */
    donutHoleSize?: number
}
