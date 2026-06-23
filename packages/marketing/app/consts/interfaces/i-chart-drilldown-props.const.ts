import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_DRILLDOWN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-drilldown-props',
    name: 'IChartDrilldownProps',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_drilldown_props.description',
    descriptionFallback: 'Chart-level prop that wires up the drilldown feature on <OrigamChartCartesian> or <OrigamChartPolar>. Supplies the bank of sub-datasets and an optional Back button label for the breadcrumb navigation.',
    definition: `export interface IChartDrilldownProps {
    datasets: Array<IChartDrilldownDataset>
    backLabel?: string
}`,
    extends: [],
    props: [
        { name: 'datasets', type: 'Array<IChartDrilldownDataset>', optional: false, descriptionFallback: 'Bank of named sub-datasets. Looked up by IChartDrilldownLink.id on point-click.' },
        { name: 'backLabel', type: 'string', optional: true, default: "'← Back'", descriptionFallback: "Localized label rendered on the Back button / first breadcrumb segment. Default '← Back'." },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-drilldown.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_drilldown_props.example',
            titleFallback: 'Enabling drilldown on a cartesian chart',
            code: `import type { IChartDrilldownProps } from 'origam'

const drilldown: IChartDrilldownProps = {
    backLabel: '← Overview',
    datasets: [
        {
            id: 'q1-detail',
            name: 'Q1 Details',
            categories: ['Jan', 'Feb', 'Mar'],
            series: [{ name: 'Sales', data: [42, 55, 61] }],
        },
    ],
}`,
            lang: 'typescript',
        },
    ],
}
