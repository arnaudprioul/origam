import type { IChartTick } from '../../interfaces'

/**
 * Props for `<OrigamChartAxis>` — the cartesian-only axes + grid +
 * tick labels block. Extracted from the legacy `<OrigamChart>`
 * monolith so polar / radar / gauge families don't accidentally
 * inherit cartesian chrome (the historical "pie has axis lines"
 * bug).
 *
 * The component is a pure renderer: it expects pre-computed tick
 * arrays + plot corners from `useChart` and paints them. No data
 * coupling, no reactivity beyond its props.
 */
export interface IChartAxisProps {
    /**
     * Pixel coordinates of the plotting area's four corners.
     * Comes verbatim from `useChart().plot.value`.
     */
    plot: {
        x0: number
        y0: number
        x1: number
        y1: number
        cx: number
        cy: number
    }
    /** Tick descriptors for X + Y. Comes from `useChart().ticks.value`. */
    ticks: {
        x: Array<IChartTick>
        y: Array<IChartTick>
    }
    /**
     * Render the four-corner axis frame + tick labels. When `false`,
     * the component renders nothing (mirrors the legacy `showAxis`
     * prop on `<OrigamChart>`).
     */
    showAxis?: boolean
    /**
     * Render horizontal grid lines under the plot. When `false`,
     * no grid is drawn (mirrors the legacy `showGrid` prop).
     */
    showGrid?: boolean
    /**
     * Formatter applied to X-axis tick labels. Defaults to
     * `String(value)`.
     */
    xAxisFormat?: (value: string | number) => string
    /**
     * Formatter applied to Y-axis tick labels. Defaults to
     * `String(value)`.
     */
    yAxisFormat?: (value: number) => string
}
