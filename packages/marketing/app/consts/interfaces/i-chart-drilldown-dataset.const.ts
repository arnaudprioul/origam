import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_DRILLDOWN_DATASET_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-drilldown-dataset',
    name: 'IChartDrilldownDataset',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_drilldown_dataset.description',
    descriptionFallback: 'A named sub-dataset associated with a drilldown level in a cartesian chart. The chart swaps its active series and categories with these values when the user clicks a point carrying a matching IChartDrilldownLink.',
    definition: `export interface IChartDrilldownDataset {
    id: string
    name: string
    series: Array<IChartSeries>
    categories?: Array<string>
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string', optional: false, descriptionFallback: 'Unique identifier — must match IChartDrilldownLink.id on the parent point.' },
        { name: 'name', type: 'string', optional: false, descriptionFallback: 'Human-readable name shown in the breadcrumb trail.' },
        { name: 'series', type: 'Array<IChartSeries>', optional: false, descriptionFallback: 'Series rendered when this dataset is active.' },
        { name: 'categories', type: 'Array<string>', optional: true, descriptionFallback: 'X-axis category labels for the sub-dataset. When absent the chart falls back to numeric indices.' },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-drilldown.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_drilldown_dataset.example',
            titleFallback: 'Defining a drilldown sub-dataset',
            code: `import type { IChartDrilldownDataset } from 'origam'

const dataset: IChartDrilldownDataset = {
    id: 'q1-detail',
    name: 'Q1 Details',
    categories: ['Jan', 'Feb', 'Mar'],
    series: [{ name: 'Sales', data: [42, 55, 61] }],
}`,
            lang: 'typescript',
        },
    ],
}
