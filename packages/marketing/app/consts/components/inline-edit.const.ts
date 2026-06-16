/**
 * /components/inline-edit — full documentation data for OrigamInlineEdit.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/InlineEdit/inline-edit.interface.ts
 * cross-checked against packages/ds/src/components/InlineEdit/OrigamInlineEdit.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const INLINE_EDIT_DOC: IComponentDoc = {
    slug: 'inline-edit',
    name: 'InlineEdit',
    tag: 'origam-inline-edit',
    icon: 'mdi-pencil-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.inline_edit.description',
    descriptionFallback: 'Edit-in-place component with sync/async validation, keyboard shortcuts and optional action buttons.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-inline-edit--design',
    docUrl: 'http://localhost:4000/components/InlineEdit/OrigamInlineEdit',

    family: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.inline_edit.props.model_value.description',
            descriptionFallback: 'Current value (v-model target). Accepts string or number — the shape is preserved on emit.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.inline_edit.props.placeholder.description',
            descriptionFallback: 'Placeholder shown on the native input and in the display affordance when modelValue is empty.'
        },
        {
            name: 'rules',
            type: { label: 'Array<(value: string) => true | string | Promise<true | string>>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.inline_edit.props.rules.description',
            descriptionFallback: 'Array of validation rules. Each rule receives the current value and returns true (pass) or an error message string (fail). Evaluated before the validate callback.'
        },
        {
            name: 'validate',
            type: { label: '(value: string) => true | string | Promise<true | string>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.inline_edit.props.validate.description',
            descriptionFallback: 'Single async-capable validator. Runs after all rules pass. On failure, surfaces the returned error message.'
        },
        {
            name: 'autoFocus',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.inline_edit.props.auto_focus.description',
            descriptionFallback: 'Auto-focus the native input when entering edit mode.'
        },
        {
            name: 'selectOnFocus',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.inline_edit.props.select_on_focus.description',
            descriptionFallback: 'Select all input text on edit entry — useful for "click-to-rename" patterns.'
        },
        {
            name: 'confirmOnBlur',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.inline_edit.props.confirm_on_blur.description',
            descriptionFallback: 'Commit the draft when the input loses focus. Set to false to require an explicit Enter.'
        },
        {
            name: 'confirmOnEnter',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.inline_edit.props.confirm_on_enter.description',
            descriptionFallback: 'Commit on Enter key. Disable when multiline=true so Enter inserts a newline instead.'
        },
        {
            name: 'cancelOnEscape',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.inline_edit.props.cancel_on_escape.description',
            descriptionFallback: 'Discard the draft and return to display mode on Escape.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.inline_edit.props.disabled.description',
            descriptionFallback: 'Disables the component — the display affordance becomes non-interactive and any in-flight edit is cancelled.'
        },
        {
            name: 'multiline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.inline_edit.props.multiline.description',
            descriptionFallback: 'Renders a <textarea> instead of an <input> in edit mode.'
        },
        {
            name: 'trim',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.inline_edit.props.trim.description',
            descriptionFallback: 'Strip surrounding whitespace before emitting update:modelValue and before running validators.'
        },
        {
            name: 'inputType',
            type: { label: "'text' | 'email' | 'number' | 'password' | 'tel' | 'url'", slug: '', kind: 'primitive' },
            defaultValue: "'text'",
            descriptionKey: 'components.inline_edit.props.input_type.description',
            descriptionFallback: 'Native HTML input type used in edit mode (ignored when multiline=true).'
        },
        {
            name: 'loadingOnConfirm',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.inline_edit.props.loading_on_confirm.description',
            descriptionFallback: 'Adds a CSS loading hook and sets aria-busy while an async validate Promise is in flight.'
        },
        {
            name: 'showActions',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.inline_edit.props.show_actions.description',
            descriptionFallback: 'Renders built-in Edit / Confirm / Cancel icon buttons. When false, only keyboard shortcuts are available.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'span'",
            descriptionKey: 'components.inline_edit.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root in display mode.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string | number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.inline_edit.emits.update_model_value.description',
            descriptionFallback: 'Emitted after validation passes and the draft is committed. Same type as the modelValue prop.'
        },
        {
            event: 'edit',
            payload: { label: '—', slug: '', kind: 'primitive' },
            descriptionKey: 'components.inline_edit.emits.edit.description',
            descriptionFallback: 'Emitted when the component enters edit mode (display → input transition).'
        },
        {
            event: 'cancel',
            payload: { label: '—', slug: '', kind: 'primitive' },
            descriptionKey: 'components.inline_edit.emits.cancel.description',
            descriptionFallback: 'Emitted when the user cancels — the draft is discarded.'
        },
        {
            event: 'confirm',
            payload: { label: 'string | number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.inline_edit.emits.confirm.description',
            descriptionFallback: 'Emitted after validation passes, before update:modelValue. Use to persist the value server-side.'
        },
        {
            event: 'validate-error',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.inline_edit.emits.validate_error.description',
            descriptionFallback: 'Emitted when a rule or the validate callback returns an error message.'
        }
    ],

    slots: [
        {
            slot: 'display',
            slotProps: '{ value, edit, isEmpty, placeholder, disabled }',
            descriptionKey: 'components.inline_edit.slots.display.description',
            descriptionFallback: 'Replaces the default display affordance with a custom element. Call edit() to switch to edit mode.'
        },
        {
            slot: 'edit',
            slotProps: '{ value, setValue, confirm, cancel, error, isPending }',
            descriptionKey: 'components.inline_edit.slots.edit.description',
            descriptionFallback: 'Replaces the native input in edit mode with a fully custom input layout while keeping the same state machine.'
        },
        {
            slot: 'actions',
            slotProps: '{ confirm, cancel, isPending }',
            descriptionKey: 'components.inline_edit.slots.actions.description',
            descriptionFallback: 'Custom confirm / cancel buttons. Receives confirm(), cancel() and isPending.'
        }
    ],

    examples: [
        {
            titleKey: 'components.inline_edit.examples.basic.title',
            titleFallback: 'Click-to-edit',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'
const name = ref('John Doe')
</script>
<template>
  <origam-inline-edit v-model="name" placeholder="Enter name…" show-actions />
</template>`
        },
        {
            titleKey: 'components.inline_edit.examples.validation.title',
            titleFallback: 'With validation',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'
const email = ref('user@example.com')
const rules = [(v: string) => v.includes('@') || 'Invalid email']
</script>
<template>
  <origam-inline-edit v-model="email" :rules="rules" input-type="email" />
</template>`
        },
        {
            titleKey: 'components.inline_edit.examples.async.title',
            titleFallback: 'Async validation',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'
const slug = ref('my-project')

async function checkSlug(value: string): Promise<true | string> {
  const taken = await api.isSlugTaken(value)
  return taken ? 'Slug already taken' : true
}
</script>
<template>
  <origam-inline-edit
    v-model="slug"
    :validate="checkSlug"
    loading-on-confirm
    show-actions
  />
</template>`
        }
    ]
}
