import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LABEL_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-label-emits',
    name: 'ILabelEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_label_emits.description',
    descriptionFallback: 'Emit contract for <OrigamLabel> — exposes a single click event so parent form field components can react to label clicks (e.g. focus the associated input).',
    definition: `export interface ILabelEmits {
    (e: 'click', event: MouseEvent): void
}`,
    extends: [],
    props: [
        {
            name: 'click',
            type: 'MouseEvent',
            optional: false,
            descriptionFallback: 'Emitted when the label element is clicked. The native MouseEvent is forwarded.',
        },
    ],
    usedBy: [
        { slug: 'label', name: 'Label', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Label/label.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_label_emits.example',
            titleFallback: 'Focusing an input on label click',
            code: `<OrigamLabel @click="inputRef?.focus()">My field</OrigamLabel>`,
            lang: 'vue',
        },
    ],
}
