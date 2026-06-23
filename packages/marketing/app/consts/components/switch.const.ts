/**
 * /components/switch — full documentation data for OrigamSwitch.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Switch/switch.interface.ts
 * cross-checked against packages/ds/src/components/Switch/OrigamSwitch.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const SWITCH_DOC: IComponentDoc = {
    slug: 'switch',
    name: 'Switch',
    tag: 'origam-switch',
    icon: 'mdi-toggle-switch-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.switch.description',
    descriptionFallback: 'Toggle switch input that wraps a hidden checkbox for binary on/off state, with optional inset style, loading states and track slot customization.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-switch--design',
    docUrl: 'http://localhost:4000/components/Switch/OrigamSwitch',

    family: [
        {
            slug: 'switch-track',
            name: 'SwitchTrack',
            descriptionKey: 'components.catalog.switch_track.description',
            descriptionFallback: 'The rounded rail behind the Switch thumb — exposes track.true / track.false slots.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'boolean | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.switch.props.model_value.description',
            descriptionFallback: 'Bound value of the switch. Bind with v-model.'
        },
        {
            name: 'indeterminate',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch.props.indeterminate.description',
            descriptionFallback: 'Puts the switch into a three-state (mixed) visual state. The indeterminate state clears on the next toggle.'
        },
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch.props.inset.description',
            descriptionFallback: 'Material inset variant — the thumb overflows the track edges and expands when active.'
        },
        {
            name: 'flat',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch.props.flat.description',
            descriptionFallback: 'Removes the default thumb elevation, producing a flat appearance.'
        },
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.switch.props.color.description',
            descriptionFallback: 'Active-state color applied to the thumb and track via intent tokens.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch.props.disabled.description',
            descriptionFallback: 'Disables the switch — prevents interaction and applies muted styling.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch.props.readonly.description',
            descriptionFallback: 'Keeps the visual appearance interactive but blocks state changes.'
        },
        {
            name: 'loading',
            type: { label: "boolean | 'circular' | 'skeleton' | 'line'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch.props.loading.description',
            descriptionFallback: "Loading state. 'circular' shows a spinner in the thumb; 'line' overlays the track; 'skeleton' replaces the entire switch."
        },
        {
            name: 'density',
            type: { label: "'default' | 'compact' | 'comfortable'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.switch.props.density.description',
            descriptionFallback: 'Adjusts vertical padding density of the input row.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.switch.props.label.description',
            descriptionFallback: 'Visible text label associated with the switch.'
        },
        {
            name: 'hideDetails',
            type: { label: "boolean | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch.props.hide_details.description',
            descriptionFallback: 'Hides the validation messages area below the control.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.switch.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean | null', slug: '', kind: 'primitive' },
            descriptionKey: 'components.switch.emits.update_model_value.description',
            descriptionFallback: 'Fired when the switch is toggled. Bind with v-model.'
        },
        {
            event: 'update:indeterminate',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.switch.emits.update_indeterminate.description',
            descriptionFallback: 'Fired when the indeterminate state is cleared on toggle.'
        },
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.switch.emits.focus.description',
            descriptionFallback: 'Fired when the hidden input receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.switch.emits.blur.description',
            descriptionFallback: 'Fired when the hidden input loses focus.'
        },
        {
            event: 'click:label',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.switch.emits.click_label.description',
            descriptionFallback: 'Fired when the user clicks the associated label element.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.switch.slots.default.description',
            descriptionFallback: 'Label content rendered beside the track.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.switch.slots.loader.description',
            descriptionFallback: 'Custom spinner rendered inside the thumb while loading.'
        },
        {
            slot: 'track.true',
            slotProps: '{ model, isValid }',
            descriptionKey: 'components.switch.slots.track_true.description',
            descriptionFallback: 'Content rendered on the ON (left) half of the track, e.g. a checkmark icon.'
        },
        {
            slot: 'track.false',
            slotProps: '{ model, isValid }',
            descriptionKey: 'components.switch.slots.track_false.description',
            descriptionFallback: 'Content rendered on the OFF (right) half of the track, e.g. an X icon.'
        }
    ],

    examples: [
        {
            titleKey: 'components.switch.examples.basic.title',
            titleFallback: 'Basic switch',
            lang: 'vue',
            code: `<template>
  <origam-switch v-model="enabled" label="Enable notifications" />
</template>

<script setup>
import { ref } from 'vue'
const enabled = ref(false)
</script>`
        },
        {
            titleKey: 'components.switch.examples.inset.title',
            titleFallback: 'Inset & color',
            lang: 'vue',
            code: `<template>
  <origam-switch v-model="on" inset color="success" label="Auto-save" />
  <origam-switch v-model="on" color="primary" label="Dark mode" />
</template>`
        },
        {
            titleKey: 'components.switch.examples.custom_track.title',
            titleFallback: 'Custom track content',
            lang: 'vue',
            code: `<template>
  <origam-switch v-model="on" inset>
    <template #track.true>
      <origam-icon icon="mdi-check" size="x-small" />
    </template>
    <template #track.false>
      <origam-icon icon="mdi-close" size="x-small" />
    </template>
  </origam-switch>
</template>`
        }
    ]
}
