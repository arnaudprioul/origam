import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BLOCKQUOTE_VARIANTS_CONST_DOC: IConstDoc = {
    slug: 'blockquote-variants',
    name: 'BLOCKQUOTE_VARIANTS',
    category: 'Typography',
    descriptionKey: 'consts.catalog.blockquote_variants.description',
    descriptionFallback: 'Closed list of valid variant values for OrigamBlockquote. Exposed so stories and consumers can iterate the full visual matrix without duplicating string literals.',
    definition: `export const BLOCKQUOTE_VARIANTS: ReadonlyArray<TBlockquoteVariant> = [
    'default',
    'elegant',
    'quoted',
    'minimal',
    'pull'
]`,
    values: [
        { value: "'default'", descriptionKey: 'consts.detail.blockquote_variants.default', descriptionFallback: 'Standard blockquote with a left border accent.' },
        { value: "'elegant'", descriptionKey: 'consts.detail.blockquote_variants.elegant', descriptionFallback: 'Refined style with decorative top/bottom lines.' },
        { value: "'quoted'", descriptionKey: 'consts.detail.blockquote_variants.quoted', descriptionFallback: 'Large decorative opening and closing quote glyphs.' },
        { value: "'minimal'", descriptionKey: 'consts.detail.blockquote_variants.minimal', descriptionFallback: 'No border or decoration — plain indented text.' },
        { value: "'pull'", descriptionKey: 'consts.detail.blockquote_variants.pull', descriptionFallback: 'Pull-quote layout — centred, enlarged, prominent.' },
    ],
    usedBy: [
        { name: 'OrigamBlockquote' },
    ],
    sourceFile: 'packages/ds/src/consts/Blockquote/blockquote.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.blockquote_variants.example',
            titleFallback: 'Rendering all variants in a story',
            code: `import { BLOCKQUOTE_VARIANTS } from 'origam'

for (const variant of BLOCKQUOTE_VARIANTS) {
  // render <OrigamBlockquote :variant="variant" />
}`,
            lang: 'typescript',
        },
    ],
}
