import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_ANCHOR_UTIL_DOC: IUtilDoc = {
    slug: 'parse-anchor',
    name: 'parseAnchor',
    category: 'Commons',
    icon: 'mdi-anchor',
    descriptionKey: 'utils.catalog.parse_anchor.description',
    descriptionFallback: 'Decompose a `TAnchor` string (e.g. `"top left"`, `"bottom"`, `"center"`) into a `{side, align}` pair used internally by overlay positioning utilities.',
    signature: `function parseAnchor(anchor: TAnchor): TParsedAnchor`,
    params: [
        {
            name: 'anchor',
            type: 'TAnchor',
            required: true,
            descriptionKey: 'utils.detail.parse_anchor.param_anchor',
            descriptionFallback: 'A TAnchor value: a single word (e.g. `"top"`, `"left"`, `"center"`) or two space-separated words (e.g. `"top left"`, `"bottom right"`). The first word is the side; the second (optional) word is the alignment.',
        },
    ],
    returns: {
        type: 'TParsedAnchor',
        descriptionKey: 'utils.detail.parse_anchor.returns',
        descriptionFallback: 'A `{ side, align }` object. When only one word is provided, `align` is inferred: block sides default to `"left"`, inline sides default to `"top"`, and `"center"` defaults to `"center"`.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/anchor.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_anchor.example_basic',
            titleFallback: 'Parsing single and compound anchors',
            code: `import { parseAnchor } from 'origam'

parseAnchor('top')          // → { side: 'top', align: 'left' }
parseAnchor('bottom right') // → { side: 'bottom', align: 'right' }
parseAnchor('center')       // → { side: 'center', align: 'center' }`,
            lang: 'typescript',
        },
    ],
    related: ['flip-side', 'flip-align', 'flip-corner'],
}
