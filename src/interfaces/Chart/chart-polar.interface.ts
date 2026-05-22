import type {
    IChartBaseEmits,
    IChartBaseProps,
    IChartBaseSlots
} from '../../interfaces'

import type { TChartPolarKind } from '../../types'

/**
 * Props for `<OrigamChartPolar>` — the polar family component.
 * Handles `pie` and `donut`. NO axes, NO grid, NO tick labels —
 * the cartesian chrome stays out of polar territory to fix the
 * historical "pie has axis lines" bug.
 */
export interface IChartPolarProps extends IChartBaseProps {
    /** Polar visualisation primitive. Default `'pie'`. */
    type?: TChartPolarKind
    /**
     * Inner-radius proportion for `'donut'`. `0` collapses to a
     * pie, `1` to a zero-thickness ring. Ignored when
     * `type='pie'`. Default `0.6`.
     */
    donutHoleSize?: number
    /** Toggle the hover tooltip. Default `true`. */
    showTooltip?: boolean
    /**
     * Formatter applied to the tooltip X label. Pie tooltips
     * show the category name + value.
     */
    xAxisFormat?: (value: string | number) => string
    /** Formatter applied to the tooltip Y value. */
    yAxisFormat?: (value: number) => string
}

/** Emits surfaced by `<OrigamChartPolar>`. Mirrors the family base. */
export type IChartPolarEmits = IChartBaseEmits

/** Slot signatures exposed by `<OrigamChartPolar>`. */
export type IChartPolarSlots = IChartBaseSlots
