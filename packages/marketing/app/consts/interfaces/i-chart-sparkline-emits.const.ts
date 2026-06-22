import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_SPARKLINE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-sparkline-emits',
    name: 'IChartSparklineEmits',
    category: 'Data Visualisation',
    descriptionKey: 'interfaces.catalog.i_chart_sparkline_emits.description',
    descriptionFallback: 'Emits surfaced by OrigamChartSparkline. Single event — point-click — fired on mouse click or keyboard activation on a data point, providing the IChartPoint payload and the originating DOM event.',
    definition: `export interface IChartSparklineEmits {
    (e: 'point-click', point: IChartPoint, originalEvent: MouseEvent | KeyboardEvent): void
}`,
    extends: [],
    props: [
        {
            name: 'point-click',
            type: '(point: IChartPoint, originalEvent: MouseEvent | KeyboardEvent) => void',
            optional: false,
            descriptionFallback: 'Fired on mouse click or keyboard activation on a data point. Provides the denormalised point payload and the originating DOM event.',
        },
    ],
    usedBy: [
        { slug: 'chart-sparkline', name: 'ChartSparkline', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-sparkline.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_sparkline_emits.example',
            titleFallback: 'Listening to point-click on a sparkline',
            code: `<OrigamChartSparkline
    :series="series"
    @point-click="(point, event) => console.log(point.y, event.type)"
/>`,
            lang: 'vue',
        },
    ],
}
