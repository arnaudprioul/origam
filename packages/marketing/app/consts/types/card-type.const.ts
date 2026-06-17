import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CARD_TYPE_TYPE_DOC: ITypeDoc = {
    slug: 'card-type',
    name: 'TCardType',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.card_type.description',
    descriptionFallback: 'Layout variant for a Card used inside a collection: grid (fixed-size tiles) or list (full-width rows).',
    definition: `export type TCardType = \`\${CARD_TYPE}\`

// Where CARD_TYPE is:
export enum CARD_TYPE {
    GRID = 'grid',
    LIST = 'list'
}`,
    values: [
        { value: 'grid', descriptionKey: 'types.detail.card_type.grid', descriptionFallback: 'Fixed-size tile layout — all cards have equal dimensions and are arranged in a CSS grid.' },
        { value: 'list', descriptionKey: 'types.detail.card_type.list', descriptionFallback: 'Full-width row layout — cards stack vertically and span the container width.' },
    ],
    usedBy: [
        { slug: 'card', name: 'Card', propName: 'type' },
    ],
    sourceFile: 'packages/ds/src/enums/Card/card.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.card_type.example',
            titleFallback: 'Card in grid vs list layout',
            code: `<origam-card type="grid" title="Grid card" text="Fixed tile" />
<origam-card type="list"  title="List card" text="Full-width row" />`,
            lang: 'html',
        },
    ],
}
