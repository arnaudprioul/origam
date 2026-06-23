import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_MESSAGE_DOC: IComposableDoc = {
    slug: 'use-message',
    name: 'useMessage',
    domain: 'Commons',
    icon: 'mdi-message-text-outline',
    descriptionKey: '',
    descriptionFallback: 'Resolves the active message to display below a form field. Prioritises errorMessages and validation results over hint text, falling back to the explicit messages prop or the #message slot. Returns a boolean flag to conditionally render the message zone.',
    signature: `function useMessage(
  props: { messages?: string | string[]; errorMessages?: string | string[]; hint?: string },
  otherMessages?: Ref<Array<any>> | ComputedRef<Array<any>>
): {
  hasMessages: ComputedRef<boolean>
  messages: ComputedRef<string | string[]>
}`,
    params: [
        {
            name: 'props',
            type: '{ messages?: string | string[]; errorMessages?: string | string[]; hint?: string }',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Field props containing the message sources: `messages` (info), `errorMessages` (validation errors), and `hint` (helper text).',
        },
        {
            name: 'otherMessages',
            type: 'Ref<Array<any>> | ComputedRef<Array<any>>',
            required: false,
            defaultValue: 'ref([])',
            descriptionKey: '',
            descriptionFallback: 'External messages array injected by a parent form or validation layer (e.g. from useValidation). Takes precedence over hint when non-empty.',
        },
    ],
    returns: [
        {
            name: 'hasMessages',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when at least one message source is active: messages prop, errorMessages, otherMessages, or the #message slot. Use to show/hide the message zone.',
        },
        {
            name: 'messages',
            type: 'ComputedRef<string | string[]>',
            descriptionKey: '',
            descriptionFallback: 'The resolved message(s) to display. Priority: errorMessages / otherMessages > hint > messages. Returns an empty array when nothing is active.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Field with hint and error message',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'origam'

const props = defineProps<{
  hint?: string
  errorMessages?: string | string[]
  messages?: string | string[]
}>()

const validationMessages = ref<string[]>([])
const { hasMessages, messages } = useMessage(props, validationMessages)
</script>

<template>
  <div class="field">
    <input type="text" />
    <div v-if="hasMessages" class="field__messages">
      <span v-for="msg in [messages].flat()" :key="msg">{{ msg }}</span>
    </div>
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Used inside OrigamTextField',
            code: `<origam-text-field
  hint="Enter your email address"
  :error-messages="formErrors.email"
  label="Email"
/>`,
            lang: 'vue',
        },
    ],
    related: ['use-form', 'use-focus'],
    consumedInterfaces: [],
}
