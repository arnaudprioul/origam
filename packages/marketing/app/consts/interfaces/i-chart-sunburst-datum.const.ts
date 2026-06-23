import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SUNBURST_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sunburst-datum',
    name: 'IChartSunburstDatum',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_sunburst_datum.description',
    descriptionFallback: 'A single datum node in the sunburst tree. Internal nodes may omit value — it will be auto-computed as the sum of direct children. The children array forms the next ring outward in the chart.',
    definition: `export interface IChartSunburstDatum {
    name: string
    value?: number
    color?: TIntent | string
    children?: Array<IChartSunburstDatum>
}`,
    extends: [],
    props: [
        {
            name: 'name',
            type: 'string',
            optional: false,
            descriptionFallback: 'Display name for the node, shown in arc labels and the tooltip.',
        },
        {
            name: 'value',
            type: 'number',
            optional: true,
            descriptionFallback: 'Numeric value. Optional for internal nodes — if absent it equals the sum of direct children.',
        },
        {
            name: 'color',
            type: 'TIntent | string',
            optional: true,
            descriptionFallback: 'Override colour for this specific node. Accepts a design-system intent token or any raw CSS colour string.',
        },
        {
            name: 'children',
            type: 'Array<IChartSunburstDatum>',
            optional: true,
            descriptionFallback: 'Child nodes — each child appears in the next ring outward from this node.',
        },
    ],
    usedBy: [
        { slug: 'chart-sunburst', name: 'ChartSunburst', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sunburst.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sunburst_datum.example',
            titleFallback: 'Two-level sunburst dataset',
            code: `import type { IChartSunburstDatum } from 'origam'

const data: IChartSunburstDatum[] = [
    {
        name: 'Frontend',
        children: [
            { name: 'Vue', value: 120 },
            { name: 'React', value: 80 },
        ],
    },
    { name: 'Backend', value: 200, color: 'success' },
]`,
            lang: 'typescript',
        },
    ],
}
