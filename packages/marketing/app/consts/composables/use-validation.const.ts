import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_VALIDATION_DOC: IComposableDoc = {
    slug: 'use-validation',
    name: 'useValidation',
    domain: 'Commons',
    icon: 'mdi-check-circle-outline',
    descriptionKey: '',
    descriptionFallback: 'Full validation engine for form field components. Runs async rule functions, accumulates error messages, tracks pristine / dirty / disabled / readonly states, and integrates with a parent OrigamForm (via ORIGAM_FORM_KEY injection) for coordinated validate / reset / resetValidation calls.',
    signature: `function useValidation(
  props: IValidationProps,
  name?: string,
  id?: MaybeRef<string | number>
): {
  errorMessages: ComputedRef<string[]>
  isDirty: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isPristine: ShallowRef<boolean>
  isValid: ComputedRef<boolean | undefined>
  isValidating: ShallowRef<boolean>
  reset: () => Promise<void>
  resetValidation: () => Promise<void>
  validate: (silent?: boolean) => Promise<string[]>
  validationClasses: ComputedRef<Record<string, boolean>>
}`,
    params: [
        {
            name: 'props',
            type: 'IValidationProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props read: modelValue, validationValue, rules, error, errorMessages, maxErrors, disabled, readonly, focused, validateOn, name.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for validation CSS class names (e.g. `origam-text-field--error`).',
        },
        {
            name: 'id',
            type: 'MaybeRef<string | number>',
            required: false,
            defaultValue: 'getUid()',
            descriptionKey: '',
            descriptionFallback: 'Unique field ID used to register with the parent form. Defaults to an auto-generated UID.',
        },
    ],
    returns: [
        {
            name: 'errorMessages',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Merged list of external `props.errorMessages` and internally computed rule failures, capped at `maxErrors`.',
        },
        {
            name: 'isDirty',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the model value (or validationValue) is non-empty. Drives the "dirty" modifier class.',
        },
        {
            name: 'isDisabled',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when `props.disabled` or the parent form is disabled.',
        },
        {
            name: 'isReadonly',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when `props.readonly` or the parent form is readonly.',
        },
        {
            name: 'isPristine',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True until the first validation run that is not silent. Reset by resetValidation().',
        },
        {
            name: 'isValid',
            type: 'ComputedRef<boolean | undefined>',
            descriptionKey: '',
            descriptionFallback: 'False when there are errors, undefined while pristine with a lazy strategy, true otherwise.',
        },
        {
            name: 'isValidating',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while async rule functions are running.',
        },
        {
            name: 'reset',
            type: '() => Promise<void>',
            descriptionKey: '',
            descriptionFallback: 'Clear the model value (set to null), then run resetValidation.',
        },
        {
            name: 'resetValidation',
            type: '() => Promise<void>',
            descriptionKey: '',
            descriptionFallback: 'Mark as pristine and clear internal error messages without changing the value.',
        },
        {
            name: 'validate',
            type: '(silent?: boolean) => Promise<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Run all rule functions and return the list of error messages. When silent=true, isPristine stays true (used for initial validation on mount).',
        },
        {
            name: 'validationClasses',
            type: 'ComputedRef<Record<string, boolean>>',
            descriptionKey: '',
            descriptionFallback: 'Computed class map with `--error`, `--dirty`, `--disabled`, `--readonly` modifier classes.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Custom field with validation',
            code: `<script setup lang="ts">
import { useValidation } from 'origam'

const props = defineProps<{
    modelValue?: string
    rules?: Array<(v: any) => boolean | string>
    error?: boolean
    errorMessages?: string | string[]
    disabled?: boolean
    readonly?: boolean
    focused?: boolean
    validateOn?: string
    maxErrors?: number | string
}>()

const { isValid, errorMessages, validationClasses, validate } = useValidation(props)
</script>

<template>
  <div :class="validationClasses">
    <input :disabled="isDisabled" />
    <span v-for="msg in errorMessages" :key="msg" class="error">{{ msg }}</span>
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-v-model', 'use-form'],
    consumedInterfaces: ['IValidationProps'],
    noteFallback: 'useValidation auto-registers the field with a parent OrigamForm on beforeMount and unregisters on beforeUnmount. The form can then call `form.validate()` to trigger all registered fields at once.',
}
