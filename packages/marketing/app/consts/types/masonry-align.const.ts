import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const MASONRY_ALIGN_TYPE_DOC: ITypeDoc = {
    slug: 'masonry-align',
    name: 'TMasonryAlign',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.masonry_align.description',
    descriptionFallback: 'Vertical alignment of items inside a masonry column — top (Pinterest-style, default) or center. Only observable in the JS fallback path; the CSS-native masonry path always aligns to top.',
    definition: `export type TMasonryAlign =
    | 'top'
    | 'center'`,
    values: [
        { value: 'top', descriptionKey: 'types.detail.masonry_align.top', descriptionFallback: 'Items are packed against the top of each column (default, Pinterest-style). Works in both CSS-native and JS fallback paths.' },
        { value: 'center', descriptionKey: 'types.detail.masonry_align.center', descriptionFallback: 'Column content is centred vertically inside the container height. Forces the JS fallback path because CSS-native masonry does not expose an equivalent alignment hook.' },
    ],
    usedBy: [
        { slug: 'masonry', name: 'Masonry', propName: 'align' },
    ],
    sourceFile: 'packages/ds/src/types/Masonry/masonry-align.type.ts',
    examples: [
        {
            titleKey: 'types.detail.masonry_align.example',
            titleFallback: 'Center-aligned masonry columns',
            code: `<origam-masonry :cols="3" align="center">
  <div v-for="card in cards" :key="card.id">
    <origam-card :title="card.title" />
  </div>
</origam-masonry>`,
            lang: 'html',
        },
    ],
}
