/**
 * /components/stepper — full documentation data for OrigamStepper.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Stepper/stepper.interface.ts
 * cross-checked against packages/ds/src/components/Stepper/OrigamStepper.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const STEPPER_DOC: IComponentDoc = {
    slug: 'stepper',
    name: 'Stepper',
    tag: 'origam-stepper',
    icon: 'mdi-dots-horizontal-circle-outline',
    category: 'Navigation',
    descriptionKey: 'components.catalog.stepper.description',
    descriptionFallback: 'Visual progress indicator that guides the user through a numbered sequence of steps, supporting horizontal and vertical orientations.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-stepper--design',
    docUrl: 'http://localhost:4000/components/Stepper/OrigamStepper',

    family: [
        {
            slug: 'stepper-item',
            name: 'StepperItem',
            descriptionKey: 'components.catalog.stepper_item.description',
            descriptionFallback: 'Single step indicator inside an OrigamStepper — renders the step number, icon and status.'
        }
    ],

    props: [
        {
            name: 'items',
            type: { label: 'IStepperItem[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper.props.items.description',
            descriptionFallback: 'Array of step descriptors. Each item has title, optional subtitle, icon and status.'
        },
        {
            name: 'modelValue',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.stepper.props.model_value.description',
            descriptionFallback: 'Index (0-based) of the currently active step. Bind with v-model.'
        },
        {
            name: 'orientation',
            type: { label: "'horizontal' | 'vertical'", slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.stepper.props.orientation.description',
            descriptionFallback: 'Layout direction of the step indicators.'
        },
        {
            name: 'clickable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.stepper.props.clickable.description',
            descriptionFallback: 'When true, clicking a step indicator navigates to that step.'
        },
        {
            name: 'showConnectors',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.stepper.props.show_connectors.description',
            descriptionFallback: 'Shows a connecting line between step indicators.'
        },
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper.props.color.description',
            descriptionFallback: 'Active-step accent color. Accepts semantic intents or a CSS color.'
        },
        {
            name: 'size',
            type: { label: "'x-small' | 'small' | 'default' | 'large' | 'x-large'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.stepper.props.size.description',
            descriptionFallback: 'Controls the indicator circle size and font sizes.'
        },
        {
            name: 'density',
            type: { label: "'default' | 'compact' | 'comfortable'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.stepper.props.density.description',
            descriptionFallback: 'Adjusts block padding between the stepper wrapper and its items.'
        },
        {
            name: 'elevation',
            type: { label: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token for the stepper container.'
        },
        {
            name: 'rounded',
            type: { label: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper.props.rounded.description',
            descriptionFallback: 'Border-radius token for the stepper container.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.stepper.props.border.description',
            descriptionFallback: 'Applies a border to the stepper container.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper.props.height.description',
            descriptionFallback: 'Overrides the stepper container height.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper.props.width.description',
            descriptionFallback: 'Overrides the stepper container width.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.stepper.emits.update_model_value.description',
            descriptionFallback: 'Fired when the active step changes. Bind with v-model.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.stepper.slots.default.description',
            descriptionFallback: 'Custom step items. When provided, the items prop is ignored.'
        }
    ],

    examples: [
        {
            titleKey: 'components.stepper.examples.basic.title',
            titleFallback: 'Basic stepper',
            lang: 'vue',
            code: `<template>
  <origam-stepper
    v-model="step"
    :items="[
      { title: 'Account', status: 'done' },
      { title: 'Details', status: 'active' },
      { title: 'Review', status: 'pending' }
    ]"
  />
</template>

<script setup>
import { ref } from 'vue'
const step = ref(1)
</script>`
        },
        {
            titleKey: 'components.stepper.examples.vertical.title',
            titleFallback: 'Vertical orientation',
            lang: 'vue',
            code: `<template>
  <origam-stepper
    v-model="step"
    orientation="vertical"
    :items="steps"
  />
</template>`
        },
        {
            titleKey: 'components.stepper.examples.clickable.title',
            titleFallback: 'Clickable steps',
            lang: 'vue',
            code: `<template>
  <origam-stepper
    v-model="step"
    clickable
    color="primary"
    :items="steps"
  />
</template>`
        }
    ]
}
