/**
 * /components/input — full documentation data for OrigamInput.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Input/input.interface.ts
 * cross-checked against packages/ds/src/components/Input/OrigamInput.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const INPUT_DOC: IComponentDoc = {
    slug: 'input',
    name: 'Input',
    tag: 'origam-input',
    icon: 'mdi-form-textbox',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.input.description',
    descriptionFallback: 'Base input wrapper that provides validation, labels, hints, adjacent slots and focus management. Consumed internally by all typed input components.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-input--design',
    docUrl: 'http://localhost:4000/components/Input/OrigamInput',

    family: [],

    related: [
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'Single-line text input built on OrigamInput and OrigamField.'
        },
        {
            slug: 'number-field',
            name: 'NumberField',
            kind: 'component',
            descriptionKey: 'components.catalog.number_field.description',
            descriptionFallback: 'Numeric input with increment / decrement controls.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'centerAffix',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.input.props.center_affix.description',
            descriptionFallback: 'Vertically centres the prepend/append icons relative to the input.'
        },
        {
            name: 'hideDetails',
            type: { label: "boolean | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.input.props.hide_details.description',
            descriptionFallback: 'Hides the hint/error details area. Pass "auto" to hide when there is nothing to display.'
        },
        {
            name: 'hideSpinButtons',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.input.props.hide_spin_buttons.description',
            descriptionFallback: 'Hides the native browser spin buttons on number inputs.'
        },
        {
            name: 'hint',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.hint.description',
            descriptionFallback: 'Helper text rendered below the input. Shown when persistentHint=true or on focus.'
        },
        {
            name: 'persistentHint',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.input.props.persistent_hint.description',
            descriptionFallback: 'Always shows the hint, even when the input is not focused.'
        },
        {
            name: 'messages',
            type: { label: 'Array<string> | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.messages.description',
            descriptionFallback: 'Custom messages to display in the details area, alongside validation errors.'
        },
        // ── IValidationProps ───────────────────────────────────────────
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.input.props.disabled.description',
            descriptionFallback: 'Disables the input entirely.'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.input.props.error.description',
            descriptionFallback: 'Forces the error state. Use with errorMessages to provide details.'
        },
        {
            name: 'errorMessages',
            type: { label: 'Array<string> | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.error_messages.description',
            descriptionFallback: 'One or more error messages shown when the input is in an error state.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.label.description',
            descriptionFallback: 'Accessible label for the input.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.input.props.readonly.description',
            descriptionFallback: 'Makes the input non-editable without disabling it.'
        },
        {
            name: 'rules',
            type: { label: 'Array<any>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.input.props.rules.description',
            descriptionFallback: 'Validation rules applied on blur / submit. Each rule is a function returning true or an error string.'
        },
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.model_value.description',
            descriptionFallback: 'The current value. Bind with v-model.'
        },
        {
            name: 'validateOn',
            type: { label: "'blur' | 'input' | 'submit' | 'lazy'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.validate_on.description',
            descriptionFallback: 'When to trigger validation. Inherits the Form context when not set.'
        },
        // ── IAdjacentProps ─────────────────────────────────────────────
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.prepend_icon.description',
            descriptionFallback: 'Icon rendered outside the input chrome on the left.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.append_icon.description',
            descriptionFallback: 'Icon rendered outside the input chrome on the right.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: "'default' | 'compact' | 'comfortable'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.input.props.density.description',
            descriptionFallback: 'Adjusts the vertical padding density.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: "'x-small' | 'small' | 'default' | 'large' | 'x-large' | number", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.input.props.size.description',
            descriptionFallback: 'Controls the font-size and dimensions via design tokens.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.input.props.color.description',
            descriptionFallback: 'Focus/active color intent for the input.'
        },
        // ── IDirectionProps ────────────────────────────────────────────
        {
            name: 'direction',
            type: { label: "'horizontal' | 'vertical'", slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.input.props.direction.description',
            descriptionFallback: 'Layout direction — horizontal for standard inputs, vertical for stacked variants.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.input.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the input value changes (v-model bridge).'
        },
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.input.emits.click_prepend.description',
            descriptionFallback: 'Fired when the user clicks the outer prepend area.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.input.emits.click_append.description',
            descriptionFallback: 'Fired when the user clicks the outer append area.'
        },
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.input.emits.focus.description',
            descriptionFallback: 'Fired when the input receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.input.emits.blur.description',
            descriptionFallback: 'Fired when the input loses focus.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ id, isDisabled, isDirty, isValid, isReadonly }',
            descriptionKey: 'components.input.slots.default.description',
            descriptionFallback: 'The native input control. Downstream components (TextField, NumberField, …) inject their <input> here.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.input.slots.prepend.description',
            descriptionFallback: 'Custom content rendered outside the input chrome on the left.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.input.slots.append.description',
            descriptionFallback: 'Custom content rendered outside the input chrome on the right.'
        },
        {
            slot: 'messages',
            slotProps: '{ hasMessages, messages }',
            descriptionKey: 'components.input.slots.messages.description',
            descriptionFallback: 'Replaces the default hint / error messages block.'
        },
        {
            slot: 'details',
            slotProps: '—',
            descriptionKey: 'components.input.slots.details.description',
            descriptionFallback: 'Replaces the entire details area below the input (hint + counter + errors).'
        }
    ],

    examples: [
        {
            titleKey: 'components.input.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <origam-input v-model="value" label="Username" hint="Max 32 characters" />
</template>`
        },
        {
            titleKey: 'components.input.examples.validation.title',
            titleFallback: 'With validation rules',
            lang: 'vue',
            code: `<template>
  <origam-input
    v-model="email"
    label="Email"
    :rules="[v => !!v || 'Required', v => v.includes('@') || 'Invalid email']"
    validate-on="blur"
  />
</template>`
        }
    ]
}
