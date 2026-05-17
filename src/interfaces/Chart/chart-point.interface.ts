/**
 * Hover / click payload bubbled by `<OrigamChart>` whenever a data
 * point is interacted with. The fields are denormalised on
 * purpose: the consumer doesn't need to re-look-up the series or
 * resolve the colour from the palette.
 */
export interface IChartPoint {
    /** Index of the series in `props.series`. */
    seriesIndex: number
    /** Series name (mirrors `IChartSeries.name`). */
    seriesName: string
    /** Index of the data point inside the series. */
    dataIndex: number
    /** X coordinate (number or category string). */
    x: number | string
    /** Y value. */
    y: number
    /** Resolved CSS colour string (intent → token → CSS or raw). */
    color: string
}
