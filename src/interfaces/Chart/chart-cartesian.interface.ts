import type {
    IChartBaseEmits,
    IChartBaseProps,
    IChartBaseSlots
} from '../../interfaces'

import type {
    TChartCartesianKind,
    TChartSmoothing
} from '../../types'

/**
 * Props for `<OrigamChartCartesian>` — the cartesian family
 * component. Owns the X+Y plotting area (axes, grid, tick labels)
 * AND the line / area / bar / column / scatter / spline /
 * stepped-line / trend topologies.
 *
 * Distinct from the legacy `<OrigamChart>` shell because it
 * deliberately rejects polar / radar / gauge values — the `type`
 * field is narrowed to `TChartCartesianKind`. Use the shell when
 * you need runtime type switching across families; use this
 * component when you want a tightly-typed cartesian surface.
 */
export interface IChartCartesianProps extends IChartBaseProps {
    /** Cartesian visualisation primitive. Default `'line'`. */
    type?: TChartCartesianKind
    /**
     * Stack series on top of each other. Applies to `bar`,
     * `column`, and (when combined) `area`. Default `false`.
     */
    stacked?: boolean
    /**
     * Smoothing strategy for `line` / `area` / `spline`.
     * Default `'none'` for `line` / `area`, `'monotone'` for
     * `spline` (overridable).
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
    /** Toggle the hover tooltip. Default `true`. */
    showTooltip?: boolean
    /** Formatter applied to X-axis tick labels. */
    xAxisFormat?: (value: string | number) => string
    /** Formatter applied to Y-axis tick labels. */
    yAxisFormat?: (value: number) => string
}

/** Emits surfaced by `<OrigamChartCartesian>`. Mirrors the family base. */
export type IChartCartesianEmits = IChartBaseEmits

/** Slot signatures exposed by `<OrigamChartCartesian>`. */
export type IChartCartesianSlots = IChartBaseSlots
