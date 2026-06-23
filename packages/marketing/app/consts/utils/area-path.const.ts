import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const AREA_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'area-path',
    name: 'areaPath',
    category: 'Chart',
    icon: 'mdi-chart-areaspline',
    descriptionKey: 'utils.catalog.area_path.description',
    descriptionFallback: 'Build an SVG closed area path from a series of [x, y] points and a baseline Y value. Supports four smoothing modes: straight lines, Catmull-Rom, Fritsch-Carlson monotone, and stepped.',
    signature: `const areaPath: (
  points: Array<TPathPoint>,
  baselineY: number,
  smooth?: boolean | 'monotone' | 'stepped'
) => string`,
    params: [
        {
            name: 'points',
            type: 'Array<TPathPoint>',
            required: true,
            descriptionKey: 'utils.detail.area_path.param_points',
            descriptionFallback: 'Ordered array of [x, y] tuples representing the data series.',
        },
        {
            name: 'baselineY',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.area_path.param_baseline_y',
            descriptionFallback: 'Y coordinate of the bottom baseline (e.g. the chart zero line or the bottom of the viewport).',
        },
        {
            name: 'smooth',
            type: "boolean | 'monotone' | 'stepped'",
            required: false,
            defaultValue: 'false',
            descriptionKey: 'utils.detail.area_path.param_smooth',
            descriptionFallback: 'Smoothing strategy. false = straight segments, true = Catmull-Rom Bezier, "monotone" = Fritsch-Carlson (no overshoots), "stepped" = staircase.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.area_path.returns',
        descriptionFallback: 'SVG path data string for the filled area, closed at the baseline. Returns an empty string when the points array is empty.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.area_path.example_basic',
            titleFallback: 'Monotone area path',
            code: `import { areaPath } from 'origam'

const points = [[0, 50], [100, 20], [200, 80], [300, 30]] as Array<[number, number]>
const d = areaPath(points, 200, 'monotone')
// → 'M0,50 C… L300,200 L0,200 Z'`,
            lang: 'typescript',
        },
    ],
    related: ['arc-path'],
}
