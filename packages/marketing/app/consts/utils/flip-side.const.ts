import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FLIP_SIDE_UTIL_DOC: IUtilDoc = {
    slug: 'flip-side',
    name: 'flipSide',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.flip_side.description',
    descriptionFallback: 'Return a new parsed anchor where the side axis is mirrored (top↔bottom, left↔right, center stays) while the align is preserved. First fallback tried by the overlay positioning engine when the preferred placement overflows.',
    signature: `function flipSide(anchor: TParsedAnchor): TParsedAnchor`,
    params: [
        {
            name: 'anchor',
            type: 'TParsedAnchor',
            required: true,
            descriptionKey: 'utils.detail.flip_side.param_anchor',
            descriptionFallback: 'The parsed anchor object whose side value will be mirrored.',
        },
    ],
    returns: {
        type: 'TParsedAnchor',
        descriptionKey: 'utils.detail.flip_side.returns',
        descriptionFallback: 'A new TParsedAnchor with the same align and a mirrored side value.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/anchor.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.flip_side.example_basic',
            titleFallback: 'Mirror side axis',
            code: `import { flipSide } from 'origam'

flipSide({ side: 'bottom', align: 'left' })
// → { side: 'top', align: 'left' }

flipSide({ side: 'left', align: 'center' })
// → { side: 'right', align: 'center' }`,
            lang: 'typescript',
        },
    ],
    related: ['flip-align', 'flip-corner', 'get-axis'],
}
