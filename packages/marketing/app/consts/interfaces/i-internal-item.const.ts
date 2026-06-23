import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INTERNAL_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-internal-item',
    name: 'IInternalItem',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_internal_item.description',
    descriptionFallback: 'Base record used by the list and select internals to wrap a raw data item with its resolved value. All item-based components normalise consumer data to this shape before rendering.',
    definition: `export interface IInternalItem<T = any> {
    value?: any
    raw: T
}`,
    extends: [],
    props: [
        {
            name: 'value',
            type: 'any',
            optional: true,
            descriptionFallback: 'Resolved comparable value extracted from the raw item (via itemValue accessor). Used for selection equality checks.',
        },
        {
            name: 'raw',
            type: 'T',
            optional: false,
            descriptionFallback: 'The original raw data item as provided by the consumer.',
        },
    ],
    usedBy: [
        { slug: 'list', name: 'List', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'autocomplete', name: 'Autocomplete', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-children.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_internal_item.example',
            titleFallback: 'Shape of a normalised item in the item slot',
            code: `<OrigamList :items="users">
    <template #item="{ item }">
        <!-- item is IInternalItem<IUser> -->
        <span>{{ item.raw.name }}</span>
    </template>
</OrigamList>`,
            lang: 'vue',
        },
    ],
}
