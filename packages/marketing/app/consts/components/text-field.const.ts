/**
 * /components/text-field — full documentation data for OrigamTextField.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/TextField/text-field.interface.ts
 * cross-checked against packages/ds/src/components/TextField/OrigamTextField.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const TEXT_FIELD_DOC: IComponentDoc = {
    slug: 'text-field',
    name: 'TextField',
    tag: 'origam-text-field',
    icon: 'mdi-form-textbox',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.text_field.description',
    descriptionFallback: 'Full-featured text input field with label, placeholder, counter, masking, validation, prepend/append icons and multiple visual variants.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-text-field--design',
    docUrl: 'http://localhost:4000/components/TextField/OrigamTextField',

    family: [],

    related: [
        {
            slug: 'textarea-field',
            name: 'TextareaField',
            kind: 'component',
            descriptionKey: 'components.catalog.textarea_field.description',
            descriptionFallback: 'Multi-line text input with auto-grow and optional rich-text toolbar.'
        },
        {
            slug: 'text-mask',
            name: 'TextMask',
            kind: 'component',
            descriptionKey: 'components.catalog.text_mask.description',
            descriptionFallback: 'Typographic background-clip text effect with animated gradient support.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'string | number | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.model_value.description',
            descriptionFallback: 'Bound value of the text field. Bind with v-model.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.label.description',
            descriptionFallback: 'Floating label shown above or inside the field.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.placeholder.description',
            descriptionFallback: 'Placeholder text shown when the field is empty.'
        },
        {
            name: 'type',
            type: { label: "'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'time'", slug: '', kind: 'primitive' },
            defaultValue: "'text'",
            descriptionKey: 'components.text_field.props.type.description',
            descriptionFallback: 'HTML input type. Drives the browser keyboard on mobile and enables native validation.'
        },
        {
            name: 'mask',
            type: { label: "TMask", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.mask.description',
            descriptionFallback: "Input mask spec — a built-in preset key ('phone:fr'…), a raw pattern ('(##) ###-####') or a full options object. v-model exposes the unmasked value."
        },
        {
            name: 'counter',
            type: { label: 'boolean | number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.counter.description',
            descriptionFallback: 'Displays a character counter. Pass a number to set the max.'
        },
        {
            name: 'autofocus',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.text_field.props.autofocus.description',
            descriptionFallback: 'Focuses the input on mount.'
        },
        {
            name: 'clearable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.text_field.props.clearable.description',
            descriptionFallback: 'Shows a clear icon when the field has a value.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.prepend_icon.description',
            descriptionFallback: 'Icon rendered outside the field, before the input.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.append_icon.description',
            descriptionFallback: 'Icon rendered outside the field, after the input.'
        },
        {
            name: 'prependInnerIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.prepend_inner_icon.description',
            descriptionFallback: 'Icon rendered inside the field, before the input text.'
        },
        {
            name: 'appendInnerIcon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.append_inner_icon.description',
            descriptionFallback: 'Icon rendered inside the field, after the input text.'
        },
        {
            name: 'variant',
            type: { label: "'outlined' | 'filled' | 'underlined' | 'plain'", slug: '', kind: 'primitive' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.text_field.props.variant.description',
            descriptionFallback: 'Visual style of the field wrapper.'
        },
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.color.description',
            descriptionFallback: 'Active/focus color of the field border and label.'
        },
        {
            name: 'density',
            type: { label: "'default' | 'compact' | 'comfortable'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.text_field.props.density.description',
            descriptionFallback: 'Adjusts the input padding density.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.text_field.props.disabled.description',
            descriptionFallback: 'Disables the input — prevents focus and user interaction.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.text_field.props.readonly.description',
            descriptionFallback: 'Makes the input read-only — displays but does not allow editing.'
        },
        {
            name: 'loading',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.text_field.props.loading.description',
            descriptionFallback: 'Shows a loading indicator below the field.'
        },
        {
            name: 'errorMessages',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.error_messages.description',
            descriptionFallback: 'Validation error messages rendered below the field.'
        },
        {
            name: 'hideDetails',
            type: { label: "boolean | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.text_field.props.hide_details.description',
            descriptionFallback: 'Hides the hints/errors area. auto hides it when there is no content to show.'
        },
        {
            name: 'rounded',
            type: { label: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.text_field.props.rounded.description',
            descriptionFallback: 'Border-radius token for the field wrapper.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string | number | null', slug: '', kind: 'primitive' },
            descriptionKey: 'components.text_field.emits.update_model_value.description',
            descriptionFallback: 'Fired on every input change. When a mask is active, carries the unmasked value.'
        },
        {
            event: 'click:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.text_field.emits.click_control.description',
            descriptionFallback: 'Fired when the user clicks the control surface (the field wrapper).'
        },
        {
            event: 'mousedown:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.text_field.emits.mousedown_control.description',
            descriptionFallback: 'Fired on mousedown on the control surface.'
        },
        {
            event: 'valid',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.text_field.emits.valid.description',
            descriptionFallback: 'Emitted on every input/paste when a mask is active — carries the current validity status.'
        },
        {
            event: 'complete',
            payload: { label: '{ complete: boolean, unmasked: string }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.text_field.emits.complete.description',
            descriptionFallback: 'Emitted when every slot of the mask has been filled.'
        },
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.text_field.emits.click_prepend.description',
            descriptionFallback: 'Fired when the user clicks the prepend icon area.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.text_field.emits.click_append.description',
            descriptionFallback: 'Fired when the user clicks the append icon area.'
        },
        {
            event: 'click:clear',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.text_field.emits.click_clear.description',
            descriptionFallback: 'Fired when the clear icon is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.text_field.slots.default.description',
            descriptionFallback: 'Inner content of the field — rarely used directly.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.text_field.slots.prepend.description',
            descriptionFallback: 'Custom content before the field (outside the border).'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.text_field.slots.append.description',
            descriptionFallback: 'Custom content after the field (outside the border).'
        },
        {
            slot: 'prepend-inner',
            slotProps: '—',
            descriptionKey: 'components.text_field.slots.prepend_inner.description',
            descriptionFallback: 'Custom content inside the field, before the input.'
        },
        {
            slot: 'append-inner',
            slotProps: '—',
            descriptionKey: 'components.text_field.slots.append_inner.description',
            descriptionFallback: 'Custom content inside the field, after the input.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.text_field.slots.label.description',
            descriptionFallback: 'Custom label content, replaces the text label.'
        },
        {
            slot: 'counter',
            slotProps: '{ counter, max, value }',
            descriptionKey: 'components.text_field.slots.counter.description',
            descriptionFallback: 'Custom character counter renderer.'
        },
        {
            slot: 'field',
            slotProps: '{ id, isDisabled, isDirty, isValid, isReadonly }',
            descriptionKey: 'components.text_field.slots.field.description',
            descriptionFallback: 'Replaces the entire inner field surface — advanced use only.'
        }
    ],

    examples: [
        {
            titleKey: 'components.text_field.examples.basic.title',
            titleFallback: 'Basic text field',
            lang: 'vue',
            code: `<template>
  <origam-text-field v-model="name" label="Full name" />
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
</script>`
        },
        {
            titleKey: 'components.text_field.examples.variants.title',
            titleFallback: 'Variants',
            lang: 'vue',
            code: `<template>
  <origam-text-field label="Outlined" variant="outlined" />
  <origam-text-field label="Filled"   variant="filled" />
  <origam-text-field label="Underlined" variant="underlined" />
  <origam-text-field label="Plain"    variant="plain" />
</template>`
        },
        {
            titleKey: 'components.text_field.examples.mask.title',
            titleFallback: 'Input mask',
            lang: 'vue',
            code: `<template>
  <origam-text-field
    v-model="phone"
    label="Phone (FR)"
    mask="phone:fr"
    @complete="onComplete"
  />
</template>

<script setup>
import { ref } from 'vue'
const phone = ref('')
const onComplete = ({ unmasked }) => console.log(unmasked)
</script>`
        }
    ]
}
