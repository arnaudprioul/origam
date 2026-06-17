import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GROUP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-group-emits',
    name: 'IGroupEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_group_emits.description',
    descriptionFallback: 'Emit signature for components that participate in a selectable group — declares the `group:selected` event used to propagate selection state to the group provider.',
    definition: `export interface IGroupEmits {
    (e: 'group:selected', value: { value: boolean }): void
}`,
    extends: [],
    props: [
        {
            name: 'group:selected',
            type: '(value: { value: boolean }) => void',
            optional: false,
            descriptionFallback: 'Emitted when the item\'s selection state changes inside a group. The payload `{ value: boolean }` carries the new selected state.',
        },
    ],
    usedBy: [
        { slug: 'btn-toggle', name: 'BtnToggle', kind: 'component' },
        { slug: 'chip-group', name: 'ChipGroup', kind: 'component' },
        { slug: 'slide-group', name: 'SlideGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_group_emits.example',
            titleFallback: 'Implementing IGroupEmits on a group item',
            code: `import type { IGroupEmits } from 'origam'

const emit = defineEmits<IGroupEmits>()

function onSelect (selected: boolean) {
    emit('group:selected', { value: selected })
}`,
            lang: 'typescript',
        },
    ],
}
