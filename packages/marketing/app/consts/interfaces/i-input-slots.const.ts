import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_INPUT_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-input-slots',
    name: 'IInputSlots',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_input_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamInput>. The default slot exposes the input control identity and state so downstream components can wire up their native element with the right ARIA and event handlers.',
    definition: `export interface IInputSlots extends IAdjacentSlots {
    default?: (data: {
        id: string
        isDisabled: boolean
        isDirty: boolean
        isValid: boolean
        isReadonly: boolean
    }) => any
    messages?: (data: { hasMessages: boolean, messages: Array<string> | Record<string, string> }) => any
    message?: (message: any) => any
    details?: (props: any) => any
}`,
    extends: ['IAdjacentSlots'],
    props: [
        {
            name: 'default',
            type: '(data: { id: string; isDisabled: boolean; isDirty: boolean; isValid: boolean; isReadonly: boolean }) => any',
            optional: true,
            descriptionFallback: 'Default slot exposing the input identity and current state flags for wiring ARIA attributes and event handlers on the native element.',
        },
        {
            name: 'messages',
            type: '(data: { hasMessages: boolean; messages: Array<string> | Record<string, string> }) => any',
            optional: true,
            descriptionFallback: 'Slot for the full messages block, exposing whether messages are present and the messages collection.',
        },
        {
            name: 'message',
            type: '(message: any) => any',
            optional: true,
            descriptionFallback: 'Slot for rendering a single message item within the messages list.',
        },
        {
            name: 'details',
            type: '(props: any) => any',
            optional: true,
            descriptionFallback: 'Slot for the details area below the input (hint, counter, error messages).',
        },
    ],
    usedBy: [
        { slug: 'input', name: 'Input', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Input/input.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_input_slots.example_default',
            titleFallback: 'Accessing input state from the default slot',
            code: `<OrigamInput>
    <template #default="{ id, isDisabled, isDirty, isValid, isReadonly }">
        <input
            :id="id"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :aria-invalid="!isValid"
        />
    </template>
</OrigamInput>`,
            lang: 'vue',
        },
    ],
}
