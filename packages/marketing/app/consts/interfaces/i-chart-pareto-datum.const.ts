import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_PARETO_DATUM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-pareto-datum',
    name: 'IChartParetoDatum',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_pareto_datum.description',
    descriptionFallback: 'A single datum in the Pareto series — one category-value pair. The component auto-sorts descending by value before rendering. Used in series[0].data for <OrigamChartPareto>.',
    definition: `export interface IChartParetoDatum {
    category: string
    value: number
}`,
    extends: [],
    props: [
        { name: 'category', type: 'string', optional: false, descriptionFallback: 'Category label shown on the X axis tick and in the tooltip.' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'Raw numeric value for this category (e.g. defect count, cost, frequency).' },
    ],
    usedBy: [
        { slug: 'chart-pareto', name: 'ChartPareto', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-pareto.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_pareto_datum.example',
            titleFallback: 'Quality-control defect dataset',
            code: `const defects: IChartParetoDatum[] = [
    { category: 'Scratches', value: 50 },
    { category: 'Dents', value: 30 },
    { category: 'Discoloration', value: 15 },
    { category: 'Cracks', value: 5 },
]`,
            lang: 'typescript',
        },
    ],
}
