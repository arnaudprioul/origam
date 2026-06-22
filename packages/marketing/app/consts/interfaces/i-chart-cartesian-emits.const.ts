import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_CARTESIAN_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-cartesian-emits',
    name: 'IChartCartesianEmits',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_cartesian_emits.description',
    descriptionFallback: 'Emits surfaced by <OrigamChartCartesian>. Extends IChartBaseEmits with drilldown navigation events (drill / drill-up) and zoom interaction events (zoom / reset-zoom).',
    definition: `export interface IChartCartesianEmits extends IChartBaseEmits {
    (e: 'drill', link: IChartDrilldownLink, point: IChartPoint): void
    (e: 'drill-up'): void
    (e: 'zoom', range: { start: number, end: number }): void
    (e: 'reset-zoom'): void
}`,
    extends: ['IChartBaseEmits'],
    props: [
        { name: 'drill', type: "(e: 'drill', link: IChartDrilldownLink, point: IChartPoint) => void", optional: false, descriptionFallback: 'Fired when the user drills into a sub-dataset. Carries the drilldown link and the clicked point.' },
        { name: 'drill-up', type: "(e: 'drill-up') => void", optional: false, descriptionFallback: 'Fired when the user navigates back one drilldown level.' },
        { name: 'zoom', type: "(e: 'zoom', range: { start: number; end: number }) => void", optional: false, descriptionFallback: 'Fired on every committed zoom (drag-release, wheel stop, or range-selector button click). start and end are category indices (inclusive).' },
        { name: 'reset-zoom', type: "(e: 'reset-zoom') => void", optional: false, descriptionFallback: 'Fired when the user resets the zoom to the full data range.' },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-cartesian.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_cartesian_emits.example',
            titleFallback: 'Listening to drill and zoom events on a cartesian chart',
            code: `<OrigamChartCartesian
    :series="series"
    :drilldown="drilldownConfig"
    :zoomable="true"
    @drill="onDrill"
    @drill-up="onDrillUp"
    @zoom="onZoom"
    @reset-zoom="onResetZoom"
/>`,
            lang: 'vue',
        },
    ],
}
