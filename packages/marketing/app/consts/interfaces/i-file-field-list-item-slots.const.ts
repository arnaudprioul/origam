import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_LIST_ITEM_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-list-item-slots',
    name: 'IFileFieldListItemSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_file_field_list_item_slots.description',
    descriptionFallback: 'Slot contract for the file-field list-item row — exposes a default slot to override the entire row content.',
    definition: `export interface IFileFieldListItemSlots {
    default?: () => any
}`,
    extends: [],
    props: [
        {
            name: 'default',
            type: '() => any',
            optional: true,
            descriptionFallback: 'Override the default row rendering of the list-item.',
        },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field-list-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_list_item_slots.example',
            titleFallback: 'Custom row content in the file list',
            code: `<OrigamFileField v-model="files">
  <template #default>
    <span>Custom file row</span>
  </template>
</OrigamFileField>`,
            lang: 'vue',
        },
    ],
}
