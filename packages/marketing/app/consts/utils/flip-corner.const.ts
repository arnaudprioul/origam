import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FLIP_CORNER_UTIL_DOC: IUtilDoc = {
    slug: 'flip-corner',
    name: 'flipCorner',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.flip_corner.description',
    descriptionFallback: 'Return a new parsed anchor where side and align are swapped (the anchor "rotates" 90°). Used by the overlay engine to compute diagonal collision-avoidance fallbacks.',
    signature: `function flipCorner(anchor: TParsedAnchor): TParsedAnchor`,
    params: [
        {
            name: 'anchor',
            type: 'TParsedAnchor',
            required: true,
            descriptionKey: 'utils.detail.flip_corner.param_anchor',
            descriptionFallback: 'The parsed anchor object whose side and align values will be transposed.',
        },
    ],
    returns: {
        type: 'TParsedAnchor',
        descriptionKey: 'utils.detail.flip_corner.returns',
        descriptionFallback: 'A new TParsedAnchor with side and align swapped.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/anchor.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.flip_corner.example_basic',
            titleFallback: 'Transpose side and align',
            code: `import { flipCorner } from 'origam'

flipCorner({ side: 'bottom', align: 'left' })
// → { side: 'left', align: 'bottom' }`,
            lang: 'typescript',
        },
    ],
    related: ['flip-side', 'flip-align', 'get-axis'],
}
