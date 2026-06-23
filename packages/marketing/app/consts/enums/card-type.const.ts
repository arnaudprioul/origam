import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CARD_TYPE_ENUM_DOC: IEnumDoc = {
    slug: 'card-type',
    name: 'CARD_TYPE',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.card_type.description',
    descriptionFallback: 'TypeScript enum for the layout type of a Card inside a collection (grid, list).',
    definition: `export enum CARD_TYPE {
    GRID = 'grid',
    LIST = 'list',
}`,
    values: [
        { value: 'CARD_TYPE.GRID', descriptionKey: 'enums.detail.card_type.grid', descriptionFallback: 'Grid layout — card rendered in a multi-column grid with equal-height tiles.' },
        { value: 'CARD_TYPE.LIST', descriptionKey: 'enums.detail.card_type.list', descriptionFallback: 'List layout — card rendered in a single-column list with horizontal content flow.' },
    ],
    usedBy: [
        { slug: 'card', name: 'Card', propName: 'type' },
    ],
    sourceFile: 'packages/ds/src/enums/Card/card.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.card_type.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { CARD_TYPE } from 'origam'

const type: CARD_TYPE = CARD_TYPE.GRID`,
            lang: 'typescript',
        },
    ],
}
