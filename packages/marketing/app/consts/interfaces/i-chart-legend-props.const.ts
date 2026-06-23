import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_LEGEND_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-legend-props',
    name: 'IChartLegendProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_legend_props.description',
    descriptionFallback: 'Props for <OrigamChartLegend> — the series-name + colour-swatch + visibility-toggle list that sits on one side of a chart. Pure renderer consuming pre-resolved IChartLegendItem[] from useChart().',
    definition: `export interface IChartLegendProps {
    items: Array<IChartLegendItem>
    position?: TChartLegendPosition
}`,
    extends: [],
    props: [
        { name: 'items', type: 'Array<IChartLegendItem>', optional: false, descriptionFallback: 'Pre-resolved legend entries (series + index + colour + visibility). Comes verbatim from useChart().legend.value.' },
        { name: 'position', type: 'TChartLegendPosition', optional: true, descriptionFallback: 'Anchor of the legend block. Drives the wrapping behaviour (row on top/bottom, column on left/right).' },
    ],
    usedBy: [
        { slug: 'chart-legend', name: 'ChartLegend', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-legend.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_legend_props.example',
            titleFallback: 'Standalone legend wired to a chart composable',
            code: `<OrigamChartLegend
    :items="legend"
    position="right"
    @legend-click="onLegendClick"
    @series-toggle="onSeriesToggle"
/>`,
            lang: 'vue',
        },
    ],
}
