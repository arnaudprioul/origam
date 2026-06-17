import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const STEPPED_PATH_LENGTH_UTIL_DOC: IUtilDoc = {
    slug: 'stepped-path-length',
    name: 'steppedPathLength',
    category: 'Chart',
    icon: 'mdi-chart-line',
    descriptionKey: 'utils.catalog.stepped_path_length.description',
    descriptionFallback: 'Compute the total Manhattan-distance length of a stepped SVG path. Each pair of points contributes |Δx| + |Δy| (not the Euclidean diagonal), matching the true rendered stroke length of a stepped-line chart.',
    signature: `const steppedPathLength = (points: Array<TPathPoint>): number`,
    params: [
        {
            name: 'points',
            type: 'Array<TPathPoint>',
            required: true,
            descriptionKey: 'utils.detail.stepped_path_length.param_points',
            descriptionFallback: 'Ordered array of [x, y] tuples that describe the vertices of the stepped path.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.stepped_path_length.returns',
        descriptionFallback: 'Total Manhattan length in the same coordinate unit as the input points. Returns 0 when fewer than 2 points are supplied.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.stepped_path_length.example_basic',
            titleFallback: 'Drive a stroke-dasharray animation',
            code: `import { steppedPathLength } from 'origam'

const points = [[0, 0], [50, 0], [50, 100], [100, 100]] as const
const len = steppedPathLength(points)
// → 200  (50 + 100 + 50)

// Use as SVG pathLength so dasharray matches
// <path pathLength={len} stroke-dasharray={len} ...>`,
            lang: 'typescript',
        },
    ],
    related: ['arc-path', 'area-path'],
}
