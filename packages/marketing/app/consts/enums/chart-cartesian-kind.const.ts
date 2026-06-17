import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CHART_CARTESIAN_KIND_ENUM_DOC: IEnumDoc = {
    slug: 'chart-cartesian-kind',
    name: 'CHART_CARTESIAN_KIND',
    category: 'Chart',
    descriptionKey: 'enums.catalog.chart_cartesian_kind.description',
    descriptionFallback: 'Chart topology selector for the cartesian family (line, area, bar, column, scatter, spline, stepped-line).',
    definition: `export enum CHART_CARTESIAN_KIND {
    LINE         = 'line',
    AREA         = 'area',
    BAR          = 'bar',
    COLUMN       = 'column',
    SCATTER      = 'scatter',
    SPLINE       = 'spline',
    STEPPED_LINE = 'stepped-line',
}`,
    values: [
        {
            value: 'CHART_CARTESIAN_KIND.LINE',
            descriptionKey: 'enums.detail.chart_cartesian_kind.line',
            descriptionFallback: 'Standard line chart connecting data points.',
        },
        {
            value: 'CHART_CARTESIAN_KIND.AREA',
            descriptionKey: 'enums.detail.chart_cartesian_kind.area',
            descriptionFallback: 'Area chart — fills the region below the line.',
        },
        {
            value: 'CHART_CARTESIAN_KIND.BAR',
            descriptionKey: 'enums.detail.chart_cartesian_kind.bar',
            descriptionFallback: 'Horizontal bar chart.',
        },
        {
            value: 'CHART_CARTESIAN_KIND.COLUMN',
            descriptionKey: 'enums.detail.chart_cartesian_kind.column',
            descriptionFallback: 'Vertical column chart.',
        },
        {
            value: 'CHART_CARTESIAN_KIND.SCATTER',
            descriptionKey: 'enums.detail.chart_cartesian_kind.scatter',
            descriptionFallback: 'Scatter plot — individual data points without connecting lines.',
        },
        {
            value: 'CHART_CARTESIAN_KIND.SPLINE',
            descriptionKey: 'enums.detail.chart_cartesian_kind.spline',
            descriptionFallback: 'Smooth curved line using spline interpolation.',
        },
        {
            value: 'CHART_CARTESIAN_KIND.STEPPED_LINE',
            descriptionKey: 'enums.detail.chart_cartesian_kind.stepped_line',
            descriptionFallback: 'Step line chart — data transitions as horizontal then vertical segments.',
        },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Chart/chart-cartesian-kind.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.chart_cartesian_kind.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CHART_CARTESIAN_KIND } from 'origam'

const kind = CHART_CARTESIAN_KIND.SPLINE`,
            lang: 'typescript',
        },
    ],
}
