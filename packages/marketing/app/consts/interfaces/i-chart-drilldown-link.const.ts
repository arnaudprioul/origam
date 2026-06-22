import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_DRILLDOWN_LINK_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-drilldown-link',
    name: 'IChartDrilldownLink',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_drilldown_link.description',
    descriptionFallback: 'Reference attached to a data point that signals a drilldown is available. When the user clicks a point carrying this link, the chart looks up the matching IChartDrilldownDataset by id and re-renders with the sub-dataset.',
    definition: `export interface IChartDrilldownLink {
    id: string
    name?: string
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string', optional: false, descriptionFallback: 'Identifier used to look up the matching dataset in IChartDrilldownProps.datasets.' },
        { name: 'name', type: 'string', optional: true, descriptionFallback: 'Display name shown in the breadcrumb trail for this level.' },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-drilldown.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_drilldown_link.example',
            titleFallback: 'Attaching a drilldown link to a data point',
            code: `import type { IChartDrilldownLink } from 'origam'

const series = [{
    name: 'Revenue',
    data: [
        { y: 120, drilldown: { id: 'q1-detail', name: 'Q1' } satisfies IChartDrilldownLink },
        { y: 95 },
    ],
}]`,
            lang: 'typescript',
        },
    ],
}
