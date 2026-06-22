import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECTION_CONTROL_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-selection-control-slots',
    name: 'ISelectionControlSlots',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_selection_control_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamSelectionControl>. Three slots give full control over the rendering: default replaces the entire control surface, label replaces the label text, and input replaces the underlying native input element.',
    definition: `export interface ISelectionControlSlots {
    default?: (model: any, icon: TIcon, props: any) => any
    label?: () => any
    input?: (props: any, icon: TIcon, model: any) => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '(model: any, icon: TIcon, props: any) => any', optional: true, descriptionFallback: 'Replaces the entire control surface. Receives the current model value, the active icon, and the internal props object.' },
        { name: 'label', type: '() => any', optional: true, descriptionFallback: 'Replaces the label text. Useful for rich label content (icons, links, formatted text).' },
        { name: 'input', type: '(props: any, icon: TIcon, model: any) => any', optional: true, descriptionFallback: 'Replaces the native input element while keeping the surrounding label/ripple scaffolding. Receives internal props, the current icon, and the model ref.' },
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
            titleKey: 'interfaces.detail.i_selection_control_slots.example',
            titleFallback: 'Custom label with a link inside a checkbox',
            code: `<OrigamCheckbox v-model="agreed">
    <template #label>
        I agree to the
        <a href="/terms" target="_blank">terms of service</a>
    </template>
</OrigamCheckbox>`,
            lang: 'html',
        },
    ],
}
