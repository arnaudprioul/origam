import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECTION_CONTROL_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-selection-control-emits',
    name: 'ISelectionControlEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_selection_control_emits.description',
    descriptionFallback: 'Emit signature for <OrigamSelectionControl> (the base for Checkbox, Switch, and Radio). Extends ICommonsComponentEmits with a single click:label event fired when the user clicks the label text rather than the control itself.',
    definition: `export interface ISelectionControlEmits extends ICommonsComponentEmits {
    (e: 'click:label', event: MouseEvent): void
}`,
    extends: ['ICommonsComponentEmits'],
    props: [
        { name: 'click:label', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the user clicks the label text. Useful for preventing default when custom label interaction is needed.' },
    ],
    usedBy: [
        { slug: 'selection-control', name: 'SelectionControl', kind: 'component' },
        { slug: 'checkbox', name: 'Checkbox', kind: 'component' },
        { slug: 'switch', name: 'Switch', kind: 'component' },
        { slug: 'radio', name: 'Radio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/SelectionControl/selection-control.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_selection_control_emits.example',
            titleFallback: 'Intercepting label clicks on a selection control',
            code: `<OrigamCheckbox
    v-model="accepted"
    label="I agree to the terms"
    @click:label="onLabelClick"
/>`,
            lang: 'html',
        },
    ],
}
