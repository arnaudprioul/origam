import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const POLYGON_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'polygon-path',
    name: 'polygonPath',
    category: 'Chart',
    icon: 'mdi-vector-polygon',
    descriptionKey: 'utils.catalog.polygon_path.description',
    descriptionFallback: 'Convert an array of [x, y] chart coordinates into a closed SVG path string (M…L…Z). Returns an empty string when the array is empty.',
    signature: `const polygonPath = (points: Array<[number, number]>): string`,
    params: [
        {
            name: 'points',
            type: 'Array<[number, number]>',
            required: true,
            descriptionKey: 'utils.detail.polygon_path.param_points',
            descriptionFallback: 'Array of [x, y] coordinate pairs in chart (pixel) space. Must contain at least one entry; an empty array yields an empty string.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.polygon_path.returns',
        descriptionFallback: 'A closed SVG path `d` string (M…L…Z) suitable for a `<polygon>` fill, or an empty string when points is empty.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.polygon_path.example_basic',
            titleFallback: 'Build a closed triangle path',
            code: `import { polygonPath } from 'origam'

const d = polygonPath([[0, 0], [100, 0], [50, 86]])
// → 'M0,0 L100,0 L50,86 Z'`,
            lang: 'typescript',
        },
    ],
    related: ['polygon-to-svg-path', 'arc-path', 'area-path'],
}
