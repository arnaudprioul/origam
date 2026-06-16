/**
 * /components/snackbar — full documentation data for OrigamSnackbar.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Snackbar/snackbar.interface.ts
 * cross-checked against packages/ds/src/components/Snackbar/OrigamSnackbar.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const SNACKBAR_DOC: IComponentDoc = {
    slug: 'snackbar',
    name: 'Snackbar',
    tag: 'origam-snackbar',
    icon: 'mdi-message-badge-outline',
    category: 'Feedback',
    descriptionKey: 'components.catalog.snackbar.description',
    descriptionFallback: 'Temporary overlay that delivers brief non-blocking feedback at a configurable viewport location with optional auto-dismiss timer.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-snackbar--design',
    docUrl: 'http://localhost:4000/components/Snackbar/OrigamSnackbar',

    family: [
        {
            slug: 'snackbar-group',
            name: 'SnackbarGroup',
            descriptionKey: 'components.catalog.snackbar_group.description',
            descriptionFallback: 'Manages a queue of toast notifications stacked at a viewport anchor.'
        },
        {
            slug: 'snackbar-item',
            name: 'SnackbarItem',
            descriptionKey: 'components.catalog.snackbar_item.description',
            descriptionFallback: 'Pure visual layer for a single toast — icon, title, message and action buttons.'
        }
    ],

    props: [
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar.props.text.description',
            descriptionFallback: 'Body text displayed inside the snackbar. Can also be provided via the text slot.'
        },
        {
            name: 'multiLine',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.snackbar.props.multi_line.description',
            descriptionFallback: 'Increases the minimum height to accommodate multi-line message text.'
        },
        {
            name: 'vertical',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.snackbar.props.vertical.description',
            descriptionFallback: 'Stacks the action buttons below the message text instead of inline.'
        },
        {
            name: 'timer',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.snackbar.props.timer.description',
            descriptionFallback: 'Displays a shrinking progress bar at the top of the snackbar showing the remaining timeout duration.'
        },
        {
            name: 'timeout',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '5000',
            descriptionKey: 'components.snackbar.props.timeout.description',
            descriptionFallback: 'Auto-dismiss delay in milliseconds. Pass -1 to keep the snackbar open indefinitely.'
        },
        {
            name: 'location',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.snackbar.props.location.description',
            descriptionFallback: 'Viewport anchor for the snackbar. Accepts compound values such as "bottom right".'
        },
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar.props.color.description',
            descriptionFallback: 'Intent or custom foreground color applied to the snackbar surface.'
        },
        {
            name: 'bgColor',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar.props.bg_color.description',
            descriptionFallback: 'Background color override for the snackbar wrapper.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.snackbar.props.border.description',
            descriptionFallback: 'Applies a border to the snackbar wrapper. Defaults to true.'
        },
        {
            name: 'rounded',
            type: { label: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.snackbar.props.rounded.description',
            descriptionFallback: 'Border-radius token. Defaults to the theme default radius.'
        },
        {
            name: 'elevation',
            type: { label: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.snackbar.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the snackbar wrapper.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.snackbar.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        },
        {
            name: 'transition',
            type: { label: 'boolean | string | TTransitionProps', slug: '', kind: 'primitive' },
            defaultValue: '{ component: OrigamSnack }',
            descriptionKey: 'components.snackbar.props.transition.description',
            descriptionFallback: 'Transition used when the snackbar enters and exits. Defaults to the OrigamSnack slide-up transition.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.snackbar.emits.update_model_value.description',
            descriptionFallback: 'Fired when the snackbar open state changes. Bind with v-model.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.snackbar.slots.default.description',
            descriptionFallback: 'Custom content rendered inside the snackbar item body.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.snackbar.slots.prepend.description',
            descriptionFallback: 'Custom icon or avatar placed before the message.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.snackbar.slots.title.description',
            descriptionFallback: 'Bold title line rendered above the message.'
        },
        {
            slot: 'text',
            slotProps: '—',
            descriptionKey: 'components.snackbar.slots.text.description',
            descriptionFallback: 'Message body content. Alias: message slot.'
        },
        {
            slot: 'action',
            slotProps: '{ isActive }',
            descriptionKey: 'components.snackbar.slots.action.description',
            descriptionFallback: 'Action area (buttons) rendered inside the snackbar. Receives isActive to allow dismissing programmatically.'
        }
    ],

    examples: [
        {
            titleKey: 'components.snackbar.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-btn text="Show snackbar" @click="show = true" />
  <origam-snackbar v-model="show" text="File saved successfully." />
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>`
        },
        {
            titleKey: 'components.snackbar.examples.status.title',
            titleFallback: 'Status variants',
            lang: 'vue',
            code: `<template>
  <origam-snackbar v-model="open" status="success" text="Profile updated." />
  <origam-snackbar v-model="open" status="danger"  text="An error occurred." />
  <origam-snackbar v-model="open" status="warning" text="Session expires soon." />
  <origam-snackbar v-model="open" status="info"    text="New version available." />
</template>`
        },
        {
            titleKey: 'components.snackbar.examples.action.title',
            titleFallback: 'With action button',
            lang: 'vue',
            code: `<template>
  <origam-snackbar v-model="open" text="Item deleted.">
    <template #action="{ isActive }">
      <origam-btn variant="text" text="Undo" @click="isActive.value = false" />
    </template>
  </origam-snackbar>
</template>`
        }
    ]
}
