import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_CHART_DOC: IComposableDoc = {
    slug: 'use-chart',
    name: 'useChart',
    domain: 'Chart',
    icon: 'mdi-chart-line',
    descriptionKey: '',
    descriptionFallback: 'Stateless SVG chart engine powering <OrigamChart>. Computes every render-time descriptor needed for cartesian, polar, pie/donut, radar, bar, scatter, and stacked variants: viewBox, pixel-mapping scales, gridline ticks, per-series path/rect/circle descriptors, resolved legend entries, and an interactive hover state. Driven entirely by thunk options so it reacts to props, stores, or computed refs without re-instantiation.',
    signature: `function useChart(options: IUseChartOptions): {
  viewBox: ComputedRef<string>
  scales: ComputedRef<IChartScales>
  ticks: ComputedRef<{ x: Array<IChartTick>; y: Array<IChartTick> }>
  secondaryTicks: ComputedRef<Array<IChartTick>>
  paths: ComputedRef<Array<IChartPath>>
  legend: ComputedRef<Array<IChartLegendItem>>
  hover: Ref<IChartPoint | null>
  onPointHover: (point: IChartPoint | null) => void
  plot: ComputedRef<{ x0: number; y0: number; x1: number; y1: number; cx: number; cy: number }>
  yRange: ComputedRef<{ min: number; max: number }>
  secondaryYRange: ComputedRef<{ min: number; max: number }>
  slotCount: ComputedRef<number>
  colorFor: (series: IChartSeries, index: number) => string
  effectiveType: (series: IChartSeries) => TChartType
  effectiveStacking: ComputedRef<TChartStacking>
  percentValues: ComputedRef<Map<number, Array<number>>>
}`,
    params: [
        {
            name: 'options',
            type: 'IUseChartOptions',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Configuration object with getter thunks for type, series, categories, stacked, stacking, donutHoleSize, colorScheme, smoothing, yMin, yMax, width, height, padding, and optional hiddenLabels and secondaryYAxis. All values are () => T functions so the composable reacts to any reactive source.',
        },
    ],
    returns: [
        {
            name: 'viewBox',
            type: 'ComputedRef<string>',
            descriptionKey: '',
            descriptionFallback: 'Pre-formatted SVG viewBox attribute string ("0 0 W H"). The chart always renders at its full logical size; CSS handles visual scaling.',
        },
        {
            name: 'scales',
            type: 'ComputedRef<IChartScales>',
            descriptionKey: '',
            descriptionFallback: 'Pixel-mapping functions: scales.x(value, dataIndex?, categoryCount?) and scales.y(value). Clamp values to the plot bounds so out-of-range data stays inside the SVG frame.',
        },
        {
            name: 'ticks',
            type: 'ComputedRef<{ x: Array<IChartTick>; y: Array<IChartTick> }>',
            descriptionKey: '',
            descriptionFallback: 'Gridline and axis-label descriptors for both axes. Bar charts swap the axis roles automatically (categorical along Y, value along X).',
        },
        {
            name: 'secondaryTicks',
            type: 'ComputedRef<Array<IChartTick>>',
            descriptionKey: '',
            descriptionFallback: 'Tick descriptors for the optional right-hand Y axis. Populated only when secondaryYAxis is configured or a series carries yAxis === 1.',
        },
        {
            name: 'paths',
            type: 'ComputedRef<Array<IChartPath>>',
            descriptionKey: '',
            descriptionFallback: 'Per-series render descriptors: path (line/area/pie/radar/polygon), rect (bar/column), or circle (scatter/markers). One entry per series for most types, one per data point for bar and scatter.',
        },
        {
            name: 'legend',
            type: 'ComputedRef<Array<IChartLegendItem>>',
            descriptionKey: '',
            descriptionFallback: 'Pre-resolved legend entries. Single-series pie/donut exposes one entry per slice (category); all other types expose one entry per series.',
        },
        {
            name: 'hover',
            type: 'Ref<IChartPoint | null>',
            descriptionKey: '',
            descriptionFallback: 'Reactive hover state. Set by onPointHover when the user mouses over a data point. Null when no point is active.',
        },
        {
            name: 'onPointHover',
            type: '(point: IChartPoint | null) => void',
            descriptionKey: '',
            descriptionFallback: 'Call with the hovered IChartPoint (or null on leave) to update the hover ref and drive the tooltip teleport.',
        },
        {
            name: 'colorFor',
            type: '(series: IChartSeries, index: number) => string',
            descriptionKey: '',
            descriptionFallback: 'Resolve a series colour to a usable CSS string. Uses the series own color prop if set; otherwise cycles through the configured colorScheme (or the default TIntent palette).',
        },
        {
            name: 'effectiveType',
            type: '(series: IChartSeries) => TChartType',
            descriptionKey: '',
            descriptionFallback: 'Return the effective chart type for a series, falling back to the global options.type() when the series does not specify its own.',
        },
        {
            name: 'percentValues',
            type: 'ComputedRef<Map<number, Array<number>>>',
            descriptionKey: '',
            descriptionFallback: 'Per-series, per-data-index percentage share of the column total. Populated only in stacking="percent" mode. Used by the tooltip to show the slice share.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Line chart driven from props',
            code: `<script setup lang="ts">
import { computed } from 'vue'
import { useChart } from 'origam'
import type { IChartSeries } from 'origam'

const props = defineProps<{
  series: IChartSeries[]
  categories: string[]
  width: number
  height: number
}>()

const { viewBox, scales, ticks, paths, legend, hover, onPointHover } = useChart({
  type: () => 'line',
  series: () => props.series,
  categories: () => props.categories,
  stacked: () => false,
  donutHoleSize: () => 0.6,
  colorScheme: () => [],
  smoothing: () => 'none',
  yMin: () => undefined,
  yMax: () => undefined,
  width: () => props.width,
  height: () => props.height,
  padding: () => ({ top: 20, right: 20, bottom: 40, left: 50 }),
})
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-chart-gauge'],
    consumedInterfaces: ['IUseChartOptions', 'IChartSeries', 'IChartScales', 'IChartPath', 'IChartLegendItem', 'IChartPoint', 'IChartTick'],
}
