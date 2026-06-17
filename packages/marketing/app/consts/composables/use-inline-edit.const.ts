import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_INLINE_EDIT_DOC: IComposableDoc = {
    slug: 'use-inline-edit',
    name: 'useInlineEdit',
    domain: 'InlineEdit',
    icon: 'mdi-pencil-box-outline',
    descriptionKey: '',
    descriptionFallback: 'Headless edit-in-place state machine managing four states — IDLE, EDITING, VALIDATING, ERROR — and four transitions: edit, confirm, cancel, setValue. Input-agnostic: it owns the draft string and the async validation pipeline; components wire their native input to the returned draft ref.',
    signature: `function useInlineEdit(
  modelValue: Ref<string | number> | ComputedRef<string | number>,
  options?: IUseInlineEditOptions
): {
  isEditing: Ref<boolean>
  draft: Ref<string>
  error: Ref<string | null>
  isPending: Ref<boolean>
  normalisedDraft: ComputedRef<string>
  isDraftEmpty: ComputedRef<boolean>
  edit: () => void
  confirm: () => Promise<boolean>
  cancel: () => void
  setValue: (next: string) => void
}`,
    params: [
        {
            name: 'modelValue',
            type: 'Ref<string | number> | ComputedRef<string | number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The current committed value (the v-model source). Snapshotted into draft when edit() is called.',
        },
        {
            name: 'options',
            type: 'IUseInlineEditOptions',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional configuration: trim, validate, rules, onConfirm, onCancel, onError callbacks.',
        },
        {
            name: 'options.trim',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            descriptionKey: '',
            descriptionFallback: 'Trims whitespace from the draft before validation and confirmation.',
        },
        {
            name: 'options.validate',
            type: 'TInlineEditValidator',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Async validation callback. Receives the normalised draft value and must return true (valid) or an error string.',
        },
        {
            name: 'options.rules',
            type: 'TInlineEditRule[]',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Array of rule functions evaluated sequentially before validate. Each rule returns true or an error string.',
        },
        {
            name: 'options.onConfirm',
            type: '(value: string) => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Called with the confirmed value when all validations pass. Wire to emit("update:modelValue", value) in the SFC.',
        },
        {
            name: 'options.onCancel',
            type: '() => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Called when the user cancels editing without confirming.',
        },
        {
            name: 'options.onError',
            type: '(message: string) => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Called when validation fails, with the error message string.',
        },
    ],
    returns: [
        {
            name: 'isEditing',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while the component is in editing mode.',
        },
        {
            name: 'draft',
            type: 'Ref<string>',
            descriptionKey: '',
            descriptionFallback: 'The mutable editing buffer. Bind to the native input value and update via setValue on oninput.',
        },
        {
            name: 'error',
            type: 'Ref<string | null>',
            descriptionKey: '',
            descriptionFallback: 'Current validation error message, or null when there is no error.',
        },
        {
            name: 'isPending',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while an async validator is running.',
        },
        {
            name: 'normalisedDraft',
            type: 'ComputedRef<string>',
            descriptionKey: '',
            descriptionFallback: 'The trimmed version of draft (when trim is true). Used as the validated and committed value.',
        },
        {
            name: 'isDraftEmpty',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the normalised draft is an empty string.',
        },
        {
            name: 'edit',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Enters edit mode, snapshotting modelValue into draft. No-op if already editing.',
        },
        {
            name: 'confirm',
            type: '() => Promise<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Runs rules then validate sequentially. On success, calls onConfirm and exits edit mode. Returns true on success, false on validation failure.',
        },
        {
            name: 'cancel',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Discards the draft, resets all state, and calls onCancel.',
        },
        {
            name: 'setValue',
            type: '(next: string) => void',
            descriptionKey: '',
            descriptionFallback: 'Updates draft and clears any stale error. Called from the oninput handler.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Basic inline edit field',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useInlineEdit } from 'origam'

const model = ref('Hello world')

const {
  isEditing, draft, error, isPending,
  edit, confirm, cancel, setValue
} = useInlineEdit(model, {
  validate: (v) => v.length >= 3 || 'Min 3 characters',
  onConfirm: (v) => { model.value = v },
})
</script>

<template>
  <span v-if="!isEditing" @click="edit">{{ model }}</span>
  <div v-else>
    <input
      :value="draft"
      @input="setValue(($event.target as HTMLInputElement).value)"
      @keydown.enter="confirm"
      @keydown.escape="cancel"
    />
    <span v-if="error" role="alert">{{ error }}</span>
    <span v-if="isPending">Validating…</span>
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'With async server validation',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useInlineEdit } from 'origam'

const username = ref('alice')

const { isEditing, draft, error, edit, confirm, cancel, setValue } =
  useInlineEdit(username, {
    validate: async (v) => {
      const res = await fetch(\`/api/check-username?q=\${v}\`)
      const { available } = await res.json()
      return available || 'Username already taken'
    },
    onConfirm: (v) => { username.value = v },
  })
</script>`,
            lang: 'ts',
        },
    ],
    related: ['use-validation', 'use-v-model'],
    consumedInterfaces: ['IUseInlineEditOptions'],
    noteFallback: 'When both rules and validate are provided, rules are evaluated first sequentially; validate is only reached if all rules pass. Stale async validations are cancelled via an internal token counter — calling cancel() mid-flight safely discards the in-flight Promise.',
}
