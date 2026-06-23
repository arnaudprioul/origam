import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SANKEY_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sankey-datum',
    name: 'IChartSankeyDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_sankey_datum.description',
    descriptionFallback: 'A single flow datum in the Sankey series. from and to are node name strings — nodes are inferred automatically from the full set of unique names. value must be >= 0. An optional color override accepts a TIntent token or raw CSS colour.',
    definition: `export interface IChartSankeyDatum {
    from: string
    to: string
    value: number
    color?: TIntent | string
}`,
    extends: [],
    props: [
        { name: 'from', type: 'string', optional: false, descriptionFallback: 'Source node name.' },
        { name: 'to', type: 'string', optional: false, descriptionFallback: 'Target node name.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Flow magnitude. Must be >= 0.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Optional per-link colour override. Accepts a design-system intent token or any raw CSS colour string. When absent the source node\'s colour is used.' },
    ],
    usedBy: [
        { slug: 'chart-sankey', name: 'OrigamChartSankey', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sankey.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sankey_datum.example',
            titleFallback: 'Defining flow data for a Sankey diagram',
            code: `const data: IChartSankeyDatum[] = [
    { from: 'Marketing', to: 'Leads',    value: 1200 },
    { from: 'Leads',     to: 'Qualified', value: 800 },
    { from: 'Qualified', to: 'Closed',   value: 300, color: 'success' },
]`,
            lang: 'typescript',
        },
    ],
}
