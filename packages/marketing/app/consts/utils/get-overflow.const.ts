import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_OVERFLOW_UTIL_DOC: IUtilDoc = {
    slug: 'get-overflow',
    name: 'getOverflow',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_overflow.description',
    descriptionFallback: 'Calculates how much box a overflows box b on each side (before/after on both axes). Returns zero for sides where a is fully contained inside b.',
    signature: `function getOverflow(a: IBox, b: IBox): { x: { before: number; after: number }; y: { before: number; after: number } }`,
    params: [
        {
            name: 'a',
            type: 'IBox',
            required: true,
            descriptionKey: 'utils.detail.get_overflow.param_a',
            descriptionFallback: 'The potentially overflowing box (e.g. a floating overlay or tooltip).',
        },
        {
            name: 'b',
            type: 'IBox',
            required: true,
            descriptionKey: 'utils.detail.get_overflow.param_b',
            descriptionFallback: 'The bounding container box (e.g. the viewport or a scroll container).',
        },
    ],
    returns: {
        type: '{ x: { before: number; after: number }; y: { before: number; after: number } }',
        descriptionKey: 'utils.detail.get_overflow.returns',
        descriptionFallback: 'An object with x and y axes, each containing before (left/top overflow) and after (right/bottom overflow) amounts in pixels. Values are ≥ 0.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/box.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_overflow.example_basic',
            titleFallback: 'Check if a tooltip overflows the viewport',
            code: `import { getOverflow } from 'origam'

const tooltip: IBox = { left: -10, right: 150, top: 5,  bottom: 50, x: -10, y: 5, width: 160, height: 45 }
const viewport: IBox = { left: 0,   right: 800, top: 0,  bottom: 600, x: 0,  y: 0, width: 800, height: 600 }

getOverflow(tooltip, viewport)
// → { x: { before: 10, after: 0 }, y: { before: 0, after: 0 } }`,
            lang: 'typescript',
        },
    ],
    related: ['get-offset', 'get-scroll-parent'],
}
