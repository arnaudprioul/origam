import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ARC_PATH_UTIL_DOC: IUtilDoc = {
    slug: 'arc-path',
    name: 'arcPath',
    category: 'Chart',
    icon: 'mdi-chart-donut',
    descriptionKey: 'utils.catalog.arc_path.description',
    descriptionFallback: 'Build an SVG path string for a pie or donut slice. Angles are in radians using the standard math convention (0 at 3 o\'clock, counter-clockwise); the helper converts internally to the SVG convention.',
    signature: `const arcPath: (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
) => string`,
    params: [
        {
            name: 'cx',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.arc_path.param_cx',
            descriptionFallback: 'X coordinate of the chart center.',
        },
        {
            name: 'cy',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.arc_path.param_cy',
            descriptionFallback: 'Y coordinate of the chart center.',
        },
        {
            name: 'outerR',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.arc_path.param_outer_r',
            descriptionFallback: 'Outer radius of the arc (pie radius).',
        },
        {
            name: 'innerR',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.arc_path.param_inner_r',
            descriptionFallback: 'Inner radius. Pass 0 for a solid pie slice, or a positive value for a donut hole.',
        },
        {
            name: 'startAngle',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.arc_path.param_start_angle',
            descriptionFallback: 'Start angle in radians (math convention, 0 = 3 o\'clock, CCW).',
        },
        {
            name: 'endAngle',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.arc_path.param_end_angle',
            descriptionFallback: 'End angle in radians (math convention). Returns an empty string when the sweep is zero.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.arc_path.returns',
        descriptionFallback: 'SVG path data string. Returns an empty string when the angular sweep is effectively zero.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/path.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.arc_path.example_basic',
            titleFallback: 'Full-circle donut slice',
            code: `import { arcPath } from 'origam'

// Half-circle slice (right half)
const d = arcPath(100, 100, 80, 40, -Math.PI / 2, Math.PI / 2)
// → 'M … A … A … Z'`,
            lang: 'typescript',
        },
    ],
    related: ['area-path'],
}
