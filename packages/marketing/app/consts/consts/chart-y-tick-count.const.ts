import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const CHART_Y_TICK_COUNT_CONST_DOC: IConstDoc = {
    slug: 'chart-y-tick-count',
    name: 'CHART_Y_TICK_COUNT',
    category: 'Components',
    descriptionKey: 'consts.catalog.chart_y_tick_count.description',
    descriptionFallback: 'Default number of Y-axis ticks drawn by OrigamChart. The composable snaps the data range to a nice multiple of this value — five rows fits most narrow chart heights without crowding.',
    definition: `export const CHART_Y_TICK_COUNT = 5`,
    value: '5',
    usedBy: [
        { name: 'OrigamChart', slug: 'chart' },
    ],
    sourceFile: 'packages/ds/src/consts/Chart/chart.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.chart_y_tick_count.example',
            titleFallback: 'Referencing CHART_Y_TICK_COUNT for custom axis logic',
            code: `import { CHART_Y_TICK_COUNT } from 'origam'

// Snap a data range to multiples of the tick count
const tickStep = Math.ceil(dataRange / CHART_Y_TICK_COUNT)`,
            lang: 'typescript',
        },
    ],
}
