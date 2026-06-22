import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LABEL_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-label-slots',
    name: 'ILabelSlots',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_label_slots.description',
    descriptionFallback: 'Slot contract for <OrigamLabel> — inherits the default slot from ICommonsComponentSlots so consumers can replace the label text content with arbitrary markup.',
    definition: `export interface ILabelSlots extends ICommonsComponentSlots {
}`,
    extends: ['ICommonsComponentSlots'],
    props: [],
    usedBy: [
        { slug: 'label', name: 'Label', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Label/label.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_label_slots.example',
            titleFallback: 'Custom label content via default slot',
            code: `<OrigamLabel>
    <span>My <strong>label</strong></span>
</OrigamLabel>`,
            lang: 'vue',
        },
    ],
}
