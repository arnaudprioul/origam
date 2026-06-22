import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PYRAMID_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pyramid-props',
    name: 'IChartPyramidProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pyramid_props.description',
    descriptionFallback: 'Props for <OrigamChartPyramid> — the pyramid / funnel family. A single series of N data points is rendered as N horizontal trapezoids stacked vertically. type="funnel" = widest at top (conversion funnel); type="pyramid" = widest at bottom. Extends IChartBaseProps.',
    definition: `export interface IChartPyramidProps extends IChartBaseProps {
    type?: TChartPyramidKind
    sliceGap?: number
    labelPlacement?: 'inside' | 'outside' | 'auto'
    xAxisFormat?: (value: string | number) => string
    yAxisFormat?: (value: number) => string
}`,
    extends: ['IChartBaseProps'],
    props: [
        { name: 'type', type: 'TChartPyramidKind', optional: true, descriptionFallback: 'Rendering mode. "funnel" = widest at top; "pyramid" = widest at bottom. Default "funnel".' },
        { name: 'sliceGap', type: 'number', optional: true, descriptionFallback: 'Gap between consecutive trapezoid slices, in SVG pixels. Default 4.' },
        { name: 'labelPlacement', type: "'inside' | 'outside' | 'auto'", optional: true, descriptionFallback: 'Label placement strategy. "inside" — always inside; "outside" — always beside; "auto" — inside when slice height >= 28px, outside otherwise. Default "auto".' },
        { name: 'xAxisFormat', type: '(value: string | number) => string', optional: true, descriptionFallback: 'X-axis / value formatter applied to the per-slice value label. When omitted the raw number is displayed.' },
        { name: 'yAxisFormat', type: '(value: number) => string', optional: true, descriptionFallback: 'Y-axis formatter — alias kept for API symmetry with other families. Same as xAxisFormat for this geometry.' },
    ],
    usedBy: [
        { slug: 'chart-pyramid', name: 'OrigamChartPyramid', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pyramid.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pyramid_props.example',
            titleFallback: 'Conversion funnel chart',
            code: `<OrigamChartPyramid
    type="funnel"
    :series="[{ name: 'Funnel', data: [1000, 750, 400, 200, 80] }]"
    :categories="['Visits', 'Leads', 'Qualified', 'Proposals', 'Closed']"
    labelPlacement="auto"
    :sliceGap="6"
/>`,
            lang: 'vue',
        },
    ],
}
