import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FLIP_ALIGN_UTIL_DOC: IUtilDoc = {
    slug: 'flip-align',
    name: 'flipAlign',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.flip_align.description',
    descriptionFallback: 'Return a new parsed anchor where the align axis is mirrored (top↔bottom, left↔right, center stays) while the side is preserved. Used by the overlay positioning engine to compute collision-avoidance fallbacks.',
    signature: `function flipAlign(anchor: TParsedAnchor): TParsedAnchor`,
    params: [
        {
            name: 'anchor',
            type: 'TParsedAnchor',
            required: true,
            descriptionKey: 'utils.detail.flip_align.param_anchor',
            descriptionFallback: 'The parsed anchor object whose align value will be mirrored.',
        },
    ],
    returns: {
        type: 'TParsedAnchor',
        descriptionKey: 'utils.detail.flip_align.returns',
        descriptionFallback: 'A new TParsedAnchor with the same side and a mirrored align value.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/anchor.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.flip_align.example_basic',
            titleFallback: 'Mirror align axis',
            code: `import { flipAlign } from 'origam'

flipAlign({ side: 'bottom', align: 'left' })
// → { side: 'bottom', align: 'right' }

flipAlign({ side: 'top', align: 'center' })
// → { side: 'top', align: 'center' }`,
            lang: 'typescript',
        },
    ],
    related: ['flip-side', 'flip-corner', 'get-axis'],
}
