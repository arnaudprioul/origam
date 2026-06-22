import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECTION_CONTROL_GROUP_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-selection-control-group-slots',
    name: 'ISelectionControlGroupSlots',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_selection_control_group_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamSelectionControlGroup>. Exposes a default slot for fully custom rendering of all items, an item slot for per-item customisation, and an open index signature to allow arbitrary named slots to be forwarded from parent components.',
    definition: `export interface ISelectionControlGroupSlots {
    default?: (items: Array<any> | Record<string, any>) => any
    item?: (item: any, index: number | string) => any
    [key: string]: any
}`,
    extends: [],
    props: [
        { name: 'default', type: '(items: Array<any> | Record<string, any>) => any', optional: true, descriptionFallback: 'Replaces the entire item list rendering. Receives the full items array/record and is responsible for rendering all controls.' },
        { name: 'item', type: '(item: any, index: number | string) => any', optional: true, descriptionFallback: 'Renders a single item in the group. Receives the item value and its index. Use this to customise individual control appearance without replacing the whole list.' },
    ],
    usedBy: [
        { slug: 'selection-control-group', name: 'SelectionControlGroup', kind: 'component' },
        { slug: 'checkbox-group', name: 'CheckboxGroup', kind: 'component' },
        { slug: 'radio-group', name: 'RadioGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SelectionControl/selection-control-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_selection_control_group_slots.example',
            titleFallback: 'Custom item rendering in a selection group',
            code: `<OrigamSelectionControlGroup :items="options" type="checkbox">
    <template #item="{ item, index }">
        <OrigamCheckbox :key="index" :label="item.label" :value="item.value" />
    </template>
</OrigamSelectionControlGroup>`,
            lang: 'html',
        },
    ],
}
