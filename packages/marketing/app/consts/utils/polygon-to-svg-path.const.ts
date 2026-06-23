import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const POLYGON_TO_SVG_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'polygon-to-svg-path',
    name: 'polygonToSvgPath',
    category: 'Chart',
    icon: 'mdi-map-marker-path',
    descriptionKey: 'utils.catalog.polygon_to_svg_path.description',
    descriptionFallback: 'Project an array of geographic [lng, lat] pairs to a Mercator-projected, closed SVG path string. Returns an empty string when fewer than 3 points are provided.',
    signature: `function polygonToSvgPath(
  polygon: Array<[number, number]>,
  width?: number,
  height?: number
): string`,
    params: [
        {
            name: 'polygon',
            type: 'Array<[number, number]>',
            required: true,
            descriptionKey: 'utils.detail.polygon_to_svg_path.param_polygon',
            descriptionFallback: 'Array of [longitude, latitude] coordinate pairs. At least 3 pairs are required to produce a non-empty path.',
        },
        {
            name: 'width',
            type: 'number',
            required: false,
            defaultValue: '1000',
            descriptionKey: 'utils.detail.polygon_to_svg_path.param_width',
            descriptionFallback: 'Width of the SVG canvas in user units. Defaults to 1000.',
        },
        {
            name: 'height',
            type: 'number',
            required: false,
            defaultValue: '500',
            descriptionKey: 'utils.detail.polygon_to_svg_path.param_height',
            descriptionFallback: 'Height of the SVG canvas in user units. Defaults to 500.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.polygon_to_svg_path.returns',
        descriptionFallback: 'A closed SVG path `d` string (M…L…Z) with Mercator-projected coordinates, or an empty string when fewer than 3 points are given.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/mercator.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.polygon_to_svg_path.example_basic',
            titleFallback: 'Project a geographic polygon',
            code: `import { polygonToSvgPath } from 'origam'

const d = polygonToSvgPath(
  [[-73.9, 40.7], [-74.0, 40.6], [-73.8, 40.6]],
  800,
  400
)
// → 'M<x1>,<y1> L<x2>,<y2> L<x3>,<y3> Z'`,
            lang: 'typescript',
        },
    ],
    related: ['polygon-path', 'arc-path', 'area-path'],
}
