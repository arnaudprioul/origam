import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_CHART_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-chart-options',
    name: 'IUseChartOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_chart_options.description',
    descriptionFallback: 'Strict, defaulted options consumed by useChart. All fields are getter thunks so the composable remains reactive without owning the prop reference. Drives path computation for all eight chart primitives.',
    definition: `export interface IUseChartOptions {
    type: () => TChartType
    series: () => Array<IChartSeries>
    categories: () => Array<string>
    stacked: () => boolean
    stacking?: () => TChartStacking
    donutHoleSize: () => number
    colorScheme: () => Array<TIntent | string>
    smoothing: () => TChartSmoothing
    yMin: () => number | undefined
    yMax: () => number | undefined
    width: () => number
    height: () => number
    padding: () => { top: number, right: number, bottom: number, left: number }
    hiddenLabels?: () => Set<string>
    secondaryYAxis?: () => IChartSecondaryYAxis | undefined
}`,
    extends: [],
    props: [
        { name: 'type', type: '() => TChartType', optional: false, descriptionFallback: 'Getter returning the chart primitive type (line, area, bar, column, pie, donut, radar, gauge).' },
        { name: 'series', type: '() => Array<IChartSeries>', optional: false, descriptionFallback: 'Getter returning the data series array. An empty array renders the #empty slot.' },
        { name: 'categories', type: '() => Array<string>', optional: false, descriptionFallback: 'Getter returning the X-axis category labels for cartesian charts.' },
        { name: 'stacked', type: '() => boolean', optional: false, descriptionFallback: 'Getter returning whether bar/column series are stacked.' },
        { name: 'stacking', type: '() => TChartStacking', optional: true, descriptionFallback: 'Optional getter returning the stacking mode (normal or percent) when stacked is true.' },
        { name: 'donutHoleSize', type: '() => number', optional: false, descriptionFallback: 'Getter returning the inner-radius proportion for donut charts (0..1).' },
        { name: 'colorScheme', type: '() => Array<TIntent | string>', optional: false, descriptionFallback: 'Getter returning the palette cycled when a series has no explicit color.' },
        { name: 'smoothing', type: '() => TChartSmoothing', optional: false, descriptionFallback: 'Getter returning the line/area smoothing strategy (none or curve).' },
        { name: 'yMin', type: '() => number | undefined', optional: false, descriptionFallback: 'Getter returning an optional override for the auto-computed Y-axis minimum.' },
        { name: 'yMax', type: '() => number | undefined', optional: false, descriptionFallback: 'Getter returning an optional override for the auto-computed Y-axis maximum.' },
        { name: 'width', type: '() => number', optional: false, descriptionFallback: 'Getter returning the SVG viewBox width in pixels.' },
        { name: 'height', type: '() => number', optional: false, descriptionFallback: 'Getter returning the SVG viewBox height in pixels.' },
        { name: 'padding', type: '() => { top: number, right: number, bottom: number, left: number }', optional: false, descriptionFallback: 'Getter returning the SVG inner padding that reserves space for axes and labels.' },
        { name: 'hiddenLabels', type: '() => Set<string>', optional: true, descriptionFallback: 'Optional getter returning the set of pie/donut category labels toggled off via the legend.' },
        { name: 'secondaryYAxis', type: '() => IChartSecondaryYAxis | undefined', optional: true, descriptionFallback: 'Optional getter for right-hand secondary Y-axis configuration. When absent series with yAxis===1 plot against the primary axis.' },
    ],
    usedBy: [
        { slug: 'use-chart', name: 'useChart', kind: 'composable' },
        { slug: 'chart', name: 'Chart', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_chart_options.example',
            titleFallback: 'Passing options to useChart',
            code: `import { useChart } from 'origam'
import type { IUseChartOptions } from 'origam'

const opts: IUseChartOptions = {
    type: () => 'line',
    series: () => props.series,
    categories: () => props.categories ?? [],
    stacked: () => false,
    donutHoleSize: () => 0.6,
    colorScheme: () => ['primary', 'success', 'danger'],
    smoothing: () => 'curve',
    yMin: () => undefined,
    yMax: () => undefined,
    width: () => svgWidth.value,
    height: () => svgHeight.value,
    padding: () => ({ top: 20, right: 20, bottom: 40, left: 50 }),
}

const { paths, ticks } = useChart(opts)`,
            lang: 'typescript',
        },
    ],
}
