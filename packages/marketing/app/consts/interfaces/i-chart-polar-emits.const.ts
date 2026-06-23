import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_POLAR_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-polar-emits',
    name: 'IChartPolarEmits',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_polar_emits.description',
    descriptionFallback: 'Emits surfaced by <OrigamChartPolar>. Extends IChartBaseEmits with drilldown events — fired when the user navigates into a sub-dataset or navigates back one level.',
    definition: `export interface IChartPolarEmits extends IChartBaseEmits {
    (e: 'drill', link: IChartDrilldownLink, point: IChartPoint): void
    (e: 'drill-up'): void
}`,
    extends: ['IChartBaseEmits'],
    props: [
        {
            name: "'drill'",
            type: "(e: 'drill', link: IChartDrilldownLink, point: IChartPoint) => void",
            optional: false,
            descriptionFallback: 'Fired when the user drills into a sub-dataset. Receives the drilldown link definition and the clicked point.',
        },
        {
            name: "'drill-up'",
            type: "(e: 'drill-up') => void",
            optional: false,
            descriptionFallback: 'Fired when the user navigates back one drilldown level.',
        },
    ],
    usedBy: [
        { slug: 'chart-polar', name: 'OrigamChartPolar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-polar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_polar_emits.example',
            titleFallback: 'Listening to drilldown events on a polar chart',
            code: `<OrigamChartPolar
    :series="series"
    :drilldown="drilldownConfig"
    @drill="(link, point) => loadDrilldownData(link, point)"
    @drill-up="() => restoreTopLevel()"
/>`,
            lang: 'vue',
        },
    ],
}
