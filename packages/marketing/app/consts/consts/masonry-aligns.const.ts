import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MASONRY_ALIGNS_CONST_DOC: IConstDoc = {
    slug: 'masonry-aligns',
    name: 'MASONRY_ALIGNS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.masonry_aligns.description',
    descriptionFallback: 'Closed list of valid align values for OrigamMasonry. Exposed so stories and consumers can iterate the full matrix without retyping the literals. Accepted values: top (Pinterest-style) and center.',
    definition: `export const MASONRY_ALIGNS: ReadonlyArray<TMasonryAlign> = [
    'top',
    'center'
]`,
    values: [
        { value: "'top'", descriptionKey: 'consts.detail.masonry_aligns.top', descriptionFallback: 'Align columns to the top — standard Pinterest-style layout.' },
        { value: "'center'", descriptionKey: 'consts.detail.masonry_aligns.center', descriptionFallback: 'Align columns to their vertical center.' },
    ],
    usedBy: [
        { name: 'OrigamMasonry', slug: 'masonry' },
        { name: 'useMasonry' },
    ],
    sourceFile: 'packages/ds/src/consts/Masonry/masonry.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.masonry_aligns.example',
            titleFallback: 'Iterating valid align values in a story',
            code: `import { MASONRY_ALIGNS } from 'origam'

// Build a select control for the story panel
const alignOptions = MASONRY_ALIGNS.map(v => ({ value: v, label: v }))`,
            lang: 'typescript',
        },
    ],
}
