import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILE_FIELD_DRAG_N_DROP_ITEM_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-file-field-drag-n-drop-item-slots',
    name: 'IFileFieldDragNDropItemSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_file_field_drag_n_drop_item_slots.description',
    descriptionFallback: 'Slot contract for the drag-and-drop file card — exposes a single default slot for fully custom card content.',
    definition: `export interface IFileFieldDragNDropItemSlots {
    default?: () => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '() => any', optional: true, descriptionFallback: 'Replace the entire card content with a custom template.' },
    ],
    usedBy: [
        { slug: 'file-field', name: 'FileField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/FileField/file-field-dragndrop-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_file_field_drag_n_drop_item_slots.example',
            titleFallback: 'Custom drag-and-drop item content',
            code: `<OrigamFileFieldDragNDropItem :file="file" :index="0">
    <template #default>
        <span>{{ file.name }}</span>
    </template>
</OrigamFileFieldDragNDropItem>`,
            lang: 'vue',
        },
    ],
}
