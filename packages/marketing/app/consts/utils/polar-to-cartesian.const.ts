import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const POLAR_TO_CARTESIAN_UTIL_DOC: IUtilDoc = {
    slug: 'polar-to-cartesian',
    name: 'polarToCartesian',
    category: 'Chart',
    icon: 'mdi-circle-slice-8',
    descriptionKey: 'utils.catalog.polar_to_cartesian.description',
    descriptionFallback: 'Convert a polar coordinate (centre, radius, angle in radians) into a Cartesian `[x, y]` point. Uses the mathematical convention — zero at 3 o\'clock, counter-clockwise — shifted to noon/clockwise for visual consistency with radar and pie charts.',
    signature: `const polarToCartesian: (
  cx: number,
  cy: number,
  radius: number,
  angle: number
) => TPathPoint`,
    params: [
        {
            name: 'cx',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.polar_to_cartesian.param_cx',
            descriptionFallback: 'X coordinate of the circle centre in SVG user units.',
        },
        {
            name: 'cy',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.polar_to_cartesian.param_cy',
            descriptionFallback: 'Y coordinate of the circle centre in SVG user units.',
        },
        {
            name: 'radius',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.polar_to_cartesian.param_radius',
            descriptionFallback: 'Distance from the centre to the point.',
        },
        {
            name: 'angle',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.polar_to_cartesian.param_angle',
            descriptionFallback: 'Angle in radians using the mathematical convention (0 = 3 o\'clock, counter-clockwise). Internally shifted by `-π/2` so that 0 = noon, clockwise, matching `arcPath`.',
        },
    ],
    returns: {
        type: 'TPathPoint',
        descriptionKey: 'utils.detail.polar_to_cartesian.returns',
        descriptionFallback: 'A `[x, y]` tuple in SVG user units representing the Cartesian equivalent of the given polar coordinate.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.polar_to_cartesian.example_basic',
            titleFallback: 'Position a label at the top of a circle',
            code: `import { polarToCartesian } from 'origam'

// Centre (100, 100), radius 50, angle 0 (noon)
polarToCartesian(100, 100, 50, 0)
// → [100, 50]  (directly above centre)

// Quarter-turn clockwise (π/2)
polarToCartesian(100, 100, 50, Math.PI / 2)
// → [150, 100]  (3 o'clock)`,
            lang: 'typescript',
        },
    ],
    related: ['path-length', 'arc-path'],
}
