import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_HONEYCOMB_ORIENTATION_ENUM_DOC: IEnumDoc = {
    slug: 'chart-honeycomb-orientation',
    name: 'CHART_HONEYCOMB_ORIENTATION',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_honeycomb_orientation.description',
    descriptionFallback: 'Hexagon orientation for the honeycomb chart — pointy-top or flat-top.',
    definition: `export enum CHART_HONEYCOMB_ORIENTATION {
    POINTY_TOP = 'pointy-top',
    FLAT_TOP   = 'flat-top',
}`,
    values: [
        {
            value: 'CHART_HONEYCOMB_ORIENTATION.POINTY_TOP',
            descriptionKey: 'enums.detail.chart_honeycomb_orientation.pointy_top',
            descriptionFallback: 'Hexagons are oriented with a vertex pointing upward.',
        },
        {
            value: 'CHART_HONEYCOMB_ORIENTATION.FLAT_TOP',
            descriptionKey: 'enums.detail.chart_honeycomb_orientation.flat_top',
            descriptionFallback: 'Hexagons are oriented with a flat edge at the top.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-honeycomb-orientation.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_honeycomb_orientation.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_HONEYCOMB_ORIENTATION } from 'origam'

const orientation = CHART_HONEYCOMB_ORIENTATION.FLAT_TOP`,
            lang: 'typescript',
        },
    ],
}
