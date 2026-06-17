import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const LINE_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'line-path',
    name: 'linePath',
    category: 'Chart',
    icon: 'mdi-chart-line',
    descriptionKey: 'utils.catalog.line_path.description',
    descriptionFallback: 'Converts an array of pre-scaled [x, y] pixel coordinates into an SVG path string using straight line segments (M…L…). Returns an empty string for an empty array.',
    signature: `const linePath: (points: Array<[number, number]>) => string`,
    params: [
        {
            name: 'points',
            type: 'Array<[number, number]>',
            required: true,
            descriptionKey: 'utils.detail.line_path.param_points',
            descriptionFallback: 'Array of pre-scaled SVG pixel coordinate pairs [x, y]. The first point becomes the M command; subsequent points become L commands.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.line_path.returns',
        descriptionFallback: 'SVG path d attribute string (e.g. "M0,0 L10,10 L20,5"). Empty string when points is empty.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.line_path.example_basic',
            titleFallback: 'Build a straight-line SVG path',
            code: `import { linePath } from 'origam'

linePath([[0, 0], [10, 10], [20, 5]])
// → 'M0,0 L10,10 L20,5'

linePath([]) // → ''`,
            lang: 'typescript',
        },
    ],
    related: ['monotone-path'],
}
