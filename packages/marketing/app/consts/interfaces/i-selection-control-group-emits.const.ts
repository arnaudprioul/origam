import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECTION_CONTROL_GROUP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-selection-control-group-emits',
    name: 'ISelectionControlGroupEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_selection_control_group_emits.description',
    descriptionFallback: 'Emit signature for <OrigamSelectionControlGroup>. Extends ICommonsComponentEmits, inheriting the standard v-model (update:modelValue) and lifecycle emits. No group-specific events are declared beyond the commons contract.',
    definition: `export interface ISelectionControlGroupEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'selection-control-group', name: 'SelectionControlGroup', kind: 'component' },
        { slug: 'checkbox-group', name: 'CheckboxGroup', kind: 'component' },
        { slug: 'radio-group', name: 'RadioGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SelectionControl/selection-control-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_selection_control_group_emits.example',
            titleFallback: 'Binding v-model on a selection control group',
            code: `<OrigamSelectionControlGroup
    v-model="selectedValues"
    :items="options"
    type="checkbox"
/>`,
            lang: 'html',
        },
    ],
}
