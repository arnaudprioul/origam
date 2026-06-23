import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SMOOTH_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'smooth-path',
    name: 'smoothPath',
    category: 'Chart',
    icon: 'mdi-chart-bell-curve',
    descriptionKey: 'utils.catalog.smooth_path.description',
    descriptionFallback: 'Generate a Catmull-Rom spline SVG path string through an array of [x, y] points. Falls back to a straight polyline when fewer than 3 points are provided.',
    signature: `const smoothPath = (points: Array<TPathPoint>): string`,
    params: [
        {
            name: 'points',
            type: 'Array<TPathPoint>',
            required: true,
            descriptionKey: 'utils.detail.smooth_path.param_points',
            descriptionFallback: 'Ordered array of [x, y] tuples defining the data points. At least 3 are required for the spline; fewer fall back to linePath.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.smooth_path.returns',
        descriptionFallback: 'An SVG path data string starting with M and using C cubic Bezier commands for smooth curves.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.smooth_path.example_basic',
            titleFallback: 'Render a smooth chart line',
            code: `import { smoothPath } from 'origam'

const d = smoothPath([[0, 50], [50, 20], [100, 80], [150, 40]])
// → 'M0,50 C8.33,50 41.67,20 50,20 C58.33,20 91.67,80 100,80 …'

// <path :d="d" fill="none" stroke="currentColor" />`,
            lang: 'typescript',
        },
    ],
    related: ['stepped-path', 'area-path'],
    noteKey: 'utils.detail.smooth_path.note',
    noteFallback: 'Uses a tension of 0.5 (Catmull-Rom to Bezier conversion). May overshoot near sharp peaks — documented in OrigamChart.',
}
