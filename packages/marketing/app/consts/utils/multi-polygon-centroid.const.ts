import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const MULTI_POLYGON_CENTROID_UTIL_DOC: IUtilDoc = {
    slug: 'multi-polygon-centroid',
    name: 'multiPolygonCentroid',
    category: 'Chart',
    icon: 'mdi-map-marker-outline',
    descriptionKey: 'utils.catalog.multi_polygon_centroid.description',
    descriptionFallback: 'Computes the geographic centroid of a multi-polygon (arithmetic mean of all [lng, lat] vertices) and returns it projected to SVG pixel space via mercatorProject.',
    signature: `function multiPolygonCentroid(
  multi: Array<Array<[number, number]>>,
  width?: number,
  height?: number
): [number, number]`,
    params: [
        {
            name: 'multi',
            type: 'Array<Array<[number, number]>>',
            required: true,
            descriptionKey: 'utils.detail.multi_polygon_centroid.param_multi',
            descriptionFallback: 'Multi-polygon data: outer array is a list of polygons, inner array is a list of [lng, lat] geographic pairs.',
        },
        {
            name: 'width',
            type: 'number',
            required: false,
            defaultValue: '1000',
            descriptionKey: 'utils.detail.multi_polygon_centroid.param_width',
            descriptionFallback: 'SVG canvas width in pixels.',
        },
        {
            name: 'height',
            type: 'number',
            required: false,
            defaultValue: '500',
            descriptionKey: 'utils.detail.multi_polygon_centroid.param_height',
            descriptionFallback: 'SVG canvas height in pixels.',
        },
    ],
    returns: {
        type: '[number, number]',
        descriptionKey: 'utils.detail.multi_polygon_centroid.returns',
        descriptionFallback: '[x, y] centroid in SVG pixel space. Returns [width/2, height/2] when the polygon set is empty.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/mercator.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.multi_polygon_centroid.example_basic',
            titleFallback: 'Place a label at the centre of a country',
            code: `import { multiPolygonCentroid } from 'origam'

const francePolygons = [/* GeoJSON-like polygon arrays */]
const [x, y] = multiPolygonCentroid(francePolygons)
// Use [x, y] as SVG text position`,
            lang: 'typescript',
        },
    ],
    related: ['mercator-project', 'multi-polygon-to-svg-path'],
}
