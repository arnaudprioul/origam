import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-emits',
    name: 'IChartEmits',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_emits.description',
    descriptionFallback: 'Emits surfaced by <OrigamChart>. All payloads are plain serialisable data (no DOM refs) so callers can forward them to a store, websocket, or analytics layer without unwrapping.',
    definition: `export interface IChartEmits {
    (e: 'point-click', point: IChartPoint, originalEvent: MouseEvent | KeyboardEvent): void
    (e: 'legend-click', series: IChartSeries, index: number): void
    (e: 'series-toggle', series: IChartSeries, visible: boolean): void
}`,
    extends: [],
    props: [
        { name: 'point-click', type: "(e: 'point-click', point: IChartPoint, originalEvent: MouseEvent | KeyboardEvent) => void", optional: false, descriptionFallback: 'Mouse or keyboard activation on a data point.' },
        { name: 'legend-click', type: "(e: 'legend-click', series: IChartSeries, index: number) => void", optional: false, descriptionFallback: 'Click on a legend entry — pair with series-toggle for visibility state.' },
        { name: 'series-toggle', type: "(e: 'series-toggle', series: IChartSeries, visible: boolean) => void", optional: false, descriptionFallback: 'Resulting visibility flip after a legend click.' },
    ],
    usedBy: [
        { slug: 'chart', name: 'OrigamChart', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_emits.example',
            titleFallback: 'Listening to chart events',
            code: `<OrigamChart
    :series="series"
    @point-click="(point, event) => console.log(point, event)"
    @legend-click="(series, index) => console.log(series, index)"
    @series-toggle="(series, visible) => console.log(series, visible)"
/>`,
            lang: 'vue',
        },
    ],
}
