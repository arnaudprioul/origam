import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const LIST_ITEM_TYPE_ENUM_DOC: IEnumDoc = {
    slug: 'list-item-type',
    name: 'LIST_ITEM_TYPE',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.list_item_type.description',
    descriptionFallback: 'Discriminates between the three possible children of OrigamList: item, subheader, or divider.',
    definition: `export enum LIST_ITEM_TYPE {
    ITEM      = 'item',
    SUBHEADER = 'subheader',
    DIVIDER   = 'divider',
}`,
    values: [
        { value: 'LIST_ITEM_TYPE.ITEM', descriptionKey: 'enums.detail.list_item_type.item', descriptionFallback: 'A standard interactive or display list item.' },
        { value: 'LIST_ITEM_TYPE.SUBHEADER', descriptionKey: 'enums.detail.list_item_type.subheader', descriptionFallback: 'A non-interactive label that groups items beneath it.' },
        { value: 'LIST_ITEM_TYPE.DIVIDER', descriptionKey: 'enums.detail.list_item_type.divider', descriptionFallback: 'A visual separator between list sections.' },
    ],
    usedBy: [
        { slug: 'list-children', name: 'ListChildren', propName: 'type (internal)' },
    ],
    sourceFile: 'packages/ds/src/enums/List/list-item.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.list_item_type.example',
            titleFallback: 'Supplying typed items to a list',
            code: `import { LIST_ITEM_TYPE } from 'origam'

const items = [
    { type: LIST_ITEM_TYPE.SUBHEADER, title: 'Group A' },
    { type: LIST_ITEM_TYPE.ITEM, title: 'Item 1' },
    { type: LIST_ITEM_TYPE.DIVIDER },
    { type: LIST_ITEM_TYPE.ITEM, title: 'Item 2' },
]`,
            lang: 'typescript',
        },
    ],
}
