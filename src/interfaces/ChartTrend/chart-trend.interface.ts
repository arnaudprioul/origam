import type { IChartBaseProps } from '../../interfaces'
import type { TChartSmoothing } from '../../types'
/**
 * Props for `<OrigamChartTrend>` — compact trend sparkline (no axes / no legend by default)
 *
 * Type-specific wrapper around `<OrigamChart type="trend">`
 * with a tightly-typed surface (no `type` prop, only options
 * relevant to trend charts).
 */
export interface IChartTrendProps extends IChartBaseProps {

    /** Smoothing strategy. @default 'curve' for trend sparkline. */
    smoothing?: TChartSmoothing
}
