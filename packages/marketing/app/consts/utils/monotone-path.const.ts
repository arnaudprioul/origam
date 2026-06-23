import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const MONOTONE_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'monotone-path',
    name: 'monotonePath',
    category: 'Chart',
    icon: 'mdi-chart-bell-curve',
    descriptionKey: 'utils.catalog.monotone_path.description',
    descriptionFallback: 'Generates a smooth SVG cubic-Bezier path through pixel coordinates using the Fritsch-Carlson monotone spline algorithm. Produces no overshoot at sharp peaks. Falls back to linePath for fewer than 3 points.',
    signature: `const monotonePath: (points: Array<[number, number]>) => string`,
    params: [
        {
            name: 'points',
            type: 'Array<[number, number]>',
            required: true,
            descriptionKey: 'utils.detail.monotone_path.param_points',
            descriptionFallback: 'Array of pre-scaled SVG pixel coordinate pairs [x, y]. A minimum of 3 points is required for the spline; smaller arrays fall back to linePath.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.monotone_path.returns',
        descriptionFallback: 'SVG path d attribute string with cubic Bezier commands (C). Falls back to the M…L… output of linePath when fewer than 3 points are supplied.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.monotone_path.example_basic',
            titleFallback: 'Smooth spline through data points',
            code: `import { monotonePath } from 'origam'

const d = monotonePath([[0, 100], [50, 20], [100, 80], [150, 10]])
// → SVG cubic-Bezier path string (C …)`,
            lang: 'typescript',
        },
    ],
    related: ['line-path'],
}
