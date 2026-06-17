import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_FORM_DOC: IComposableDoc = {
    slug: 'use-form',
    name: 'useForm',
    domain: 'Form',
    icon: 'mdi-form-select',
    descriptionKey: '',
    descriptionFallback: 'Orchestrates form-level validation by aggregating results from all child field components. Registers/unregisters fields automatically via provide/inject, tracks the overall valid state as a v-model:modelValue, and exposes validate(), reset(), and resetValidation() methods.',
    signature: `function useForm(props: IFormProps): {
  errors: Ref<Array<IValidationFieldResult>>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isValidating: ShallowRef<boolean>
  isValid: Ref<boolean | null | undefined>
  items: Ref<Array<IFormField>>
  validate: () => Promise<{ valid: boolean; errors: IValidationFieldResult[] }>
  reset: () => void
  resetValidation: () => void
}`,
    params: [
        {
            name: 'props',
            type: 'IFormProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Form component props: disabled, readonly, fastFail, validateOn, modelValue, rules, errorMessages, hint, messages, scrollToError.',
        },
    ],
    returns: [
        {
            name: 'isValid',
            type: 'Ref<boolean | null | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Bound to v-model:modelValue. true = all fields valid, false = at least one invalid, null = indeterminate (some fields not yet validated).',
        },
        {
            name: 'errors',
            type: 'Ref<Array<IValidationFieldResult>>',
            descriptionKey: '',
            descriptionFallback: 'Array of { id, errorMessages } for each field that failed the last validate() call.',
        },
        {
            name: 'isDisabled',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Propagated down to all child fields via inject. When true, every registered field is disabled.',
        },
        {
            name: 'isReadonly',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Propagated down to all child fields via inject. When true, every registered field is read-only.',
        },
        {
            name: 'isValidating',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while the async validate() loop is running. Use to show a loading indicator.',
        },
        {
            name: 'items',
            type: 'Ref<Array<IFormField>>',
            descriptionKey: '',
            descriptionFallback: 'Live list of all registered child fields with their current isValid state and errorMessages.',
        },
        {
            name: 'validate',
            type: '() => Promise<{ valid: boolean; errors: IValidationFieldResult[] }>',
            descriptionKey: '',
            descriptionFallback: 'Triggers validation on every registered field sequentially (respects fastFail). Returns the aggregate result.',
        },
        {
            name: 'reset',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Calls reset() on all registered fields, clearing their values and validation state.',
        },
        {
            name: 'resetValidation',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Calls resetValidation() on all registered fields — clears error messages without resetting values.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Form with programmatic validation',
            code: `<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const form = useTemplateRef('form')
const isValid = ref<boolean | null>(null)

async function submit () {
  const { valid } = await form.value?.validate()
  if (valid) console.log('Submit!')
}
</script>

<template>
  <origam-form ref="form" v-model="isValid" @submit.prevent="submit">
    <origam-text-field
      name="email"
      label="Email"
      :rules="[v => !!v || 'Required']"
    />
    <origam-btn type="submit" :disabled="isValid === false">Send</origam-btn>
  </origam-form>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Fast-fail form',
            code: `<template>
  <origam-form fast-fail validate-on="submit" @submit.prevent="onSubmit">
    <origam-text-field name="username" label="Username" :rules="usernameRules" />
    <origam-text-field name="password" label="Password" type="password" :rules="passwordRules" />
    <origam-btn type="submit">Login</origam-btn>
  </origam-form>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-v-model', 'use-focus', 'use-active'],
    consumedInterfaces: ['IFormProps', 'IFormField', 'IFormProvide', 'IValidationFieldResult'],
}
