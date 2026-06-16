/**
 * /components/otp-input-field — full documentation data for OrigamOtpInputField.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/OtpInputField/otp-input-field.interface.ts
 * cross-checked against packages/ds/src/components/OtpInputField/OrigamOtpInputField.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const OTP_INPUT_FIELD_DOC: IComponentDoc = {
    slug: 'otp-input-field',
    name: 'OtpInputField',
    tag: 'origam-otp-input-field',
    icon: 'mdi-lock-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.otp_input_field.description',
    descriptionFallback: 'One-time password input with auto-advance between cells.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-otpinputfield--design',
    docUrl: 'http://localhost:4000/components/OtpInputField/OrigamOtpInputField',

    family: [],

    props: [
        {
            name: 'modelValue',
            type: { label: 'number | string | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.otp_input_field.props.model_value.description',
            descriptionFallback: 'Current OTP value (v-model).'
        },
        {
            name: 'length',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '6',
            descriptionKey: 'components.otp_input_field.props.length.description',
            descriptionFallback: 'Number of OTP digit cells.'
        },
        {
            name: 'type',
            type: { label: "'number' | 'text' | 'password'", slug: '', kind: 'primitive' },
            defaultValue: "'number'",
            descriptionKey: 'components.otp_input_field.props.type.description',
            descriptionFallback: 'Input type for each digit cell.'
        },
        {
            name: 'divider',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.otp_input_field.props.divider.description',
            descriptionFallback: 'Character or string rendered between digit groups (e.g. "-").'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.otp_input_field.props.placeholder.description',
            descriptionFallback: 'Placeholder character shown in empty cells.'
        },
        {
            name: 'persistentPlaceholder',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.otp_input_field.props.persistent_placeholder.description',
            descriptionFallback: 'Keep the placeholder visible even when the field has focus.'
        },
        {
            name: 'focusAll',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.otp_input_field.props.focus_all.description',
            descriptionFallback: 'Focus all cells simultaneously when the component is focused.'
        },
        {
            name: 'autofocus',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.otp_input_field.props.autofocus.description',
            descriptionFallback: 'Auto-focus the first cell on mount.'
        },
        {
            name: 'variant',
            type: { label: "'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain' | 'ghost'", slug: '', kind: 'primitive' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.otp_input_field.props.variant.description',
            descriptionFallback: 'Visual variant applied to each digit cell.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.otp_input_field.props.disabled.description',
            descriptionFallback: 'Disables all digit cells.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.otp_input_field.props.readonly.description',
            descriptionFallback: 'Makes all cells non-editable without disabling them visually.'
        },
        {
            name: 'role',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.otp_input_field.props.role.description',
            descriptionFallback: 'ARIA role applied to the root element.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.otp_input_field.props.label.description',
            descriptionFallback: 'Accessible label for the field.'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.otp_input_field.props.error.description',
            descriptionFallback: 'Forces the error state styling on all cells.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.otp_input_field.emits.update_model_value.description',
            descriptionFallback: 'Fired on each keystroke as the OTP value changes.'
        },
        {
            event: 'finish',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.otp_input_field.emits.finish.description',
            descriptionFallback: 'Fired when all cells are filled. Payload is the complete OTP string.'
        },
        {
            event: 'click:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.otp_input_field.emits.click_control.description',
            descriptionFallback: 'Fired when the user clicks the field control area.'
        },
        {
            event: 'mousedown:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.otp_input_field.emits.mousedown_control.description',
            descriptionFallback: 'Fired on mousedown on the field control area.'
        },
        {
            event: 'click:clear',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.otp_input_field.emits.click_clear.description',
            descriptionFallback: 'Fired when the clear button is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.otp_input_field.slots.default.description',
            descriptionFallback: 'Default slot for additional content inside the field.'
        },
        {
            slot: 'field',
            slotProps: '{ id, isDisabled, isDirty, isValid, isReadonly }',
            descriptionKey: 'components.otp_input_field.slots.field.description',
            descriptionFallback: 'Replaces the digit cells with a fully custom input implementation.'
        },
        {
            slot: 'prependInner',
            slotProps: '—',
            descriptionKey: 'components.otp_input_field.slots.prepend_inner.description',
            descriptionFallback: 'Content placed inside the field wrapper before the digit cells.'
        },
        {
            slot: 'appendInner',
            slotProps: '—',
            descriptionKey: 'components.otp_input_field.slots.append_inner.description',
            descriptionFallback: 'Content placed inside the field wrapper after the digit cells.'
        },
        {
            slot: 'loader',
            slotProps: '{ progressProps }',
            descriptionKey: 'components.otp_input_field.slots.loader.description',
            descriptionFallback: 'Custom loader shown while loading=true.'
        }
    ],

    examples: [
        {
            titleKey: 'components.otp_input_field.examples.basic.title',
            titleFallback: 'Basic 6-digit OTP',
            lang: 'vue',
            code: `<template>
  <origam-otp-input-field v-model="otp" :length="6" @finish="onFinish" />
</template>

<script setup>
const otp = ref('')
function onFinish(val) { console.log('OTP complete:', val) }
</script>`
        },
        {
            titleKey: 'components.otp_input_field.examples.divider.title',
            titleFallback: 'With divider',
            lang: 'vue',
            code: `<template>
  <origam-otp-input-field v-model="otp" :length="6" divider="-" />
</template>`
        },
        {
            titleKey: 'components.otp_input_field.examples.password.title',
            titleFallback: 'Password type',
            lang: 'vue',
            code: `<template>
  <origam-otp-input-field v-model="pin" :length="4" type="password" label="PIN" />
</template>`
        }
    ]
}
