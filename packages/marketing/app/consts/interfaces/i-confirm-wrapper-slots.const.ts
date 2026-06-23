import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CONFIRM_WRAPPER_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-confirm-wrapper-slots',
    name: 'IConfirmWrapperSlots',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_confirm_wrapper_slots.description',
    descriptionFallback: 'Slot contract for <OrigamConfirmWrapper> — exposes the primary input slot, the confirmation input slot, a header slot, title/messages/message/details helpers and the full adjacent-slots surface.',
    definition: `export interface IConfirmWrapperSlots extends IAdjacentSlots {
    default?: () => any
    confirm?: () => any
    header?: () => any
    title?: (props: any) => any
    messages?: (data: { hasMessages: boolean, messages: string[], messagesId: string }) => any
    message?: (data: { message: string }) => any
    details?: (data: { id: string, messagesId: string, isDirty: boolean, isDisabled: boolean, isReadonly: boolean }) => any
}`,
    extends: ['IAdjacentSlots'],
    props: [
        { name: 'default', type: '() => any', optional: true, descriptionFallback: 'Primary input slot — the first field the user fills in.' },
        { name: 'confirm', type: '() => any', optional: true, descriptionFallback: 'Confirmation input slot — the second field that must match the first.' },
        { name: 'header', type: '() => any', optional: true, descriptionFallback: 'Optional header rendered above both inputs.' },
        { name: 'title', type: '(props: any) => any', optional: true, descriptionFallback: 'Title content area above the input group.' },
        { name: 'messages', type: '(data: { hasMessages: boolean, messages: string[], messagesId: string }) => any', optional: true, descriptionFallback: 'Override the default messages area; receives hasMessages flag, message strings and the messagesId for aria linking.' },
        { name: 'message', type: '(data: { message: string }) => any', optional: true, descriptionFallback: 'Template for a single message item.' },
        { name: 'details', type: '(data: { id: string, messagesId: string, isDirty: boolean, isDisabled: boolean, isReadonly: boolean }) => any', optional: true, descriptionFallback: 'Details/hint area below the inputs — receives the field state flags.' },
    ],
    usedBy: [
        { slug: 'confirm-wrapper', name: 'ConfirmWrapper', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/ConfirmWrapper/confirm-wrapper.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_confirm_wrapper_slots.example',
            titleFallback: 'Custom messages slot on ConfirmWrapper',
            code: `<OrigamConfirmWrapper v-model="password">
    <template #messages="{ messages }">
        <span v-for="m in messages" :key="m" class="error-msg">{{ m }}</span>
    </template>
</OrigamConfirmWrapper>`,
            lang: 'vue',
        },
    ],
}
