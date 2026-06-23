import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_DIMENSIONS_UTIL_DOC: IUtilDoc = {
    slug: 'get-dimensions',
    name: 'getDimensions',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_dimensions.description',
    descriptionFallback: 'Calculates the scale and translation values needed to animate an overlay element from a target position. Returns offset coordinates, scale ratios (sx, sy), and a speed multiplier for large elements.',
    signature: `function getDimensions(
  target: HTMLElement | [x: number, y: number],
  el: HTMLElement
): { x: number; y: number; sx: number; sy: number; speed: number }`,
    params: [
        {
            name: 'target',
            type: 'HTMLElement | [x: number, y: number]',
            required: true,
            descriptionKey: 'utils.detail.get_dimensions.param_target',
            descriptionFallback: 'The anchor target — an HTMLElement whose bounding box is used, or a [x, y] point tuple for pointer-based origins.',
        },
        {
            name: 'el',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.get_dimensions.param_el',
            descriptionFallback: 'The overlay element that will be animated. Its bounding box and transform-origin are read to compute the animation parameters.',
        },
    ],
    returns: {
        type: '{ x: number; y: number; sx: number; sy: number; speed: number }',
        descriptionKey: 'utils.detail.get_dimensions.returns',
        descriptionFallback: 'x/y: translation offset; sx/sy: scale ratios relative to the target; speed: 1.0–1.5 multiplier applied to large elements to slow the animation.',
    },
    sourceFile: 'packages/ds/src/utils/Transition/transition.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_dimensions.example_basic',
            titleFallback: 'Compute overlay animation parameters',
            code: `import { getDimensions } from 'origam'

const { x, y, sx, sy, speed } = getDimensions(triggerEl, overlayEl)
// Pipe x, y, sx, sy into a WAAPI or CSS @keyframes animation`,
            lang: 'typescript',
        },
    ],
    related: ['get-center', 'get-children'],
}
