import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const STEPPED_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'stepped-path',
    name: 'steppedPath',
    category: 'Chart',
    icon: 'mdi-chart-timeline-variant',
    descriptionKey: 'utils.catalog.stepped_path.description',
    descriptionFallback: 'Generate a staircase SVG path string through an array of [x, y] points. Each step moves horizontally to the next x then vertically to the next y, producing the discrete-state "event log" look.',
    signature: `const steppedPath = (points: Array<TPathPoint>): string`,
    params: [
        {
            name: 'points',
            type: 'Array<TPathPoint>',
            required: true,
            descriptionKey: 'utils.detail.stepped_path.param_points',
            descriptionFallback: 'Ordered array of [x, y] tuples. Returns an empty string when the array is empty.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.stepped_path.returns',
        descriptionFallback: 'An SVG path data string using M and L commands that forms a horizontal-then-vertical staircase.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.stepped_path.example_basic',
            titleFallback: 'Draw a stepped chart line',
            code: `import { steppedPath } from 'origam'

const d = steppedPath([[0, 10], [50, 30], [100, 10]])
// → 'M0,10 L50,10 L50,30 L100,30 L100,10'

// <path :d="d" fill="none" stroke="currentColor" />`,
            lang: 'typescript',
        },
    ],
    related: ['smooth-path', 'area-path'],
}
