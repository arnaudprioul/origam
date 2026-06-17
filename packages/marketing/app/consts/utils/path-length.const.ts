import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PATH_LENGTH_UTIL_DOC: IUtilDoc = {
    slug: 'path-length',
    name: 'pathLength',
    category: 'Chart',
    icon: 'mdi-chart-line',
    descriptionKey: 'utils.catalog.path_length.description',
    descriptionFallback: 'Compute the total Cartesian length of a polyline defined by an ordered array of `[x, y]` points. Used to seed `stroke-dasharray` / `stroke-dashoffset` for the chart line-drawing entrance animation.',
    signature: `const pathLength: (points: Array<TPathPoint>) => number`,
    params: [
        {
            name: 'points',
            type: 'Array<TPathPoint>',
            required: true,
            descriptionKey: 'utils.detail.path_length.param_points',
            descriptionFallback: 'An ordered array of `[x, y]` coordinate pairs defining the polyline. Returns `0` for arrays with fewer than 2 points.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.path_length.returns',
        descriptionFallback: 'Total Euclidean length of the polyline in SVG user units. Returns `0` when the array has fewer than 2 points.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.path_length.example_basic',
            titleFallback: 'Measure a simple two-segment path',
            code: `import { pathLength } from 'origam'

pathLength([[0, 0], [3, 4]])        // → 5   (3-4-5 triangle)
pathLength([[0, 0], [1, 0], [1, 1]]) // → 2
pathLength([[0, 0]])                 // → 0`,
            lang: 'typescript',
        },
    ],
    related: ['polar-to-cartesian', 'arc-path'],
}
