import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const MERCATOR_PROJECT_UTIL_DOC: IUtilDoc = {
    slug: 'mercator-project',
    name: 'mercatorProject',
    category: 'Chart',
    icon: 'mdi-earth',
    descriptionKey: 'utils.catalog.mercator_project.description',
    descriptionFallback: 'Projects WGS-84 geographic coordinates (longitude / latitude) into SVG pixel space using the Web Mercator (EPSG:3857) formula. Reference canvas: 1000 × 500 px.',
    signature: `function mercatorProject(
  lng: number,
  lat: number,
  width?: number,
  height?: number
): [number, number]`,
    params: [
        {
            name: 'lng',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.mercator_project.param_lng',
            descriptionFallback: 'Longitude in degrees, range [-180, 180].',
        },
        {
            name: 'lat',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.mercator_project.param_lat',
            descriptionFallback: 'Latitude in degrees, clamped to [-85, 85] to avoid Mercator divergence at the poles.',
        },
        {
            name: 'width',
            type: 'number',
            required: false,
            defaultValue: '1000',
            descriptionKey: 'utils.detail.mercator_project.param_width',
            descriptionFallback: 'SVG canvas width in pixels.',
        },
        {
            name: 'height',
            type: 'number',
            required: false,
            defaultValue: '500',
            descriptionKey: 'utils.detail.mercator_project.param_height',
            descriptionFallback: 'SVG canvas height in pixels.',
        },
    ],
    returns: {
        type: '[number, number]',
        descriptionKey: 'utils.detail.mercator_project.returns',
        descriptionFallback: '[x, y] pixel coordinates in SVG space, rounded to one decimal place.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/mercator.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.mercator_project.example_basic',
            titleFallback: 'Project Paris onto a 1000×500 SVG canvas',
            code: `import { mercatorProject } from 'origam'

// Paris (lng=2.35, lat=48.85)
mercatorProject(2.35, 48.85)
// → approx [506, 162]`,
            lang: 'typescript',
        },
    ],
    related: ['multi-polygon-to-svg-path', 'multi-polygon-centroid'],
}
