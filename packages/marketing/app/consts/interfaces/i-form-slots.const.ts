import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FORM_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-form-slots',
    name: 'IFormSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_form_slots.description',
    descriptionFallback: 'Slot signatures for OrigamForm — extends ICommonsComponentSlots with messages, message, and actions slots for custom footer controls.',
    definition: `export interface IFormSlots extends ICommonsComponentSlots {
    messages?: () => any
    message?: () => any
    actions?: (data: { submit: () => void, reset: () => void }) => any
}`,
    extends: ['ICommonsComponentSlots'],
    props: [
        { name: 'messages', type: '() => any', optional: true, descriptionFallback: 'Custom messages area shown below the form fields.' },
        { name: 'message', type: '() => any', optional: true, descriptionFallback: 'Custom single message display.' },
        { name: 'actions', type: '(data: { submit: () => void, reset: () => void }) => any', optional: true, descriptionFallback: 'Custom actions area — receives submit() and reset() helpers.' },
    ],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Form/form.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_form_slots.example',
            titleFallback: 'Custom actions slot with submit and reset buttons',
            code: `<OrigamForm>
    <!-- fields -->
    <template #actions="{ submit, reset }">
        <OrigamBtn @click="submit">Save</OrigamBtn>
        <OrigamBtn variant="text" @click="reset">Cancel</OrigamBtn>
    </template>
</OrigamForm>`,
            lang: 'vue',
        },
    ],
}
