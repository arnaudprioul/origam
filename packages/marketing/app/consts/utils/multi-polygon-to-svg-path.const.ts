import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const MULTI_POLYGON_TO_SVG_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'multi-polygon-to-svg-path',
    name: 'multiPolygonToSvgPath',
    category: 'Chart',
    icon: 'mdi-map-outline',
    descriptionKey: 'utils.catalog.multi_polygon_to_svg_path.description',
    descriptionFallback: 'Converts a multi-polygon (array of [lng, lat] polygon arrays) into a single SVG path string with multiple M…Z subpaths. Each polygon is projected via mercatorProject.',
    signature: `function multiPolygonToSvgPath(
  multi: Array<Array<[number, number]>>,
  width?: number,
  height?: number
): string`,
    params: [
        {
            name: 'multi',
            type: 'Array<Array<[number, number]>>',
            required: true,
            descriptionKey: 'utils.detail.multi_polygon_to_svg_path.param_multi',
            descriptionFallback: 'Multi-polygon data: outer array is a list of polygons, each polygon is an array of [lng, lat] geographic pairs.',
        },
        {
            name: 'width',
            type: 'number',
            required: false,
            defaultValue: '1000',
            descriptionKey: 'utils.detail.multi_polygon_to_svg_path.param_width',
            descriptionFallback: 'SVG canvas width in pixels.',
        },
        {
            name: 'height',
            type: 'number',
            required: false,
            defaultValue: '500',
            descriptionKey: 'utils.detail.multi_polygon_to_svg_path.param_height',
            descriptionFallback: 'SVG canvas height in pixels.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.multi_polygon_to_svg_path.returns',
        descriptionFallback: 'A single SVG d attribute string containing one closed M…Z subpath per polygon, separated by spaces.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/mercator.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.multi_polygon_to_svg_path.example_basic',
            titleFallback: 'Render a country on an SVG map',
            code: `import { multiPolygonToSvgPath } from 'origam'

const spainPolygons = [/* GeoJSON-like polygon arrays */]
const d = multiPolygonToSvgPath(spainPolygons, 1000, 500)
// Use d in an SVG <path> element`,
            lang: 'typescript',
        },
    ],
    related: ['mercator-project', 'multi-polygon-centroid'],
}
