import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_DRILLDOWN_FRAME_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-drilldown-frame',
    name: 'IChartDrilldownFrame',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_drilldown_frame.description',
    descriptionFallback: 'One frame in the navigation stack maintained internally by the cartesian chart drilldown system. The root frame is pushed on mount; each drill-in pushes an additional frame; the Back button pops the top frame.',
    definition: `export interface IChartDrilldownFrame {
    name: string
    series: Array<IChartSeries>
    categories: Array<string>
}`,
    extends: [],
    props: [
        { name: 'name', type: 'string', optional: false, descriptionFallback: 'Display name for this level, used in the breadcrumb.' },
        { name: 'series', type: 'Array<IChartSeries>', optional: false, descriptionFallback: 'Series rendered at this level.' },
        { name: 'categories', type: 'Array<string>', optional: false, descriptionFallback: 'Category labels at this level.' },
    ],
    usedBy: [
        { slug: 'chart-cartesian', name: 'OrigamChartCartesian', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-drilldown.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_drilldown_frame.example',
            titleFallback: 'Internal frame shape — read-only reference for composable consumers',
            code: `// IChartDrilldownFrame is an internal type used by the chart engine.
// It is rarely consumed directly. Reading it is useful when extending useChartDrilldown.
import type { IChartDrilldownFrame } from 'origam'

function rootFrame(series: IChartSeries[], categories: string[]): IChartDrilldownFrame {
    return { name: 'Root', series, categories }
}`,
            lang: 'typescript',
        },
    ],
}
