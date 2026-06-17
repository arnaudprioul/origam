import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_PROGRESS_DOC: IComposableDoc = {
    slug: 'use-progress',
    name: 'useProgress',
    domain: 'Progress',
    icon: 'mdi-progress-clock',
    descriptionKey: '',
    descriptionFallback: 'Computes all state needed to render a progress bar or circular progress indicator: a normalised 0-100 value from modelValue and max, thickness as a number, a visibility flag tied to IntersectionObserver, and BEM class/style arrays that handle indeterminate, striped, active, and absolute modes. Used by OrigamProgressLinear and OrigamProgressCircular.',
    signature: `function useProgress(props: IProgressTypeProps): {
  progress: Ref<string | number>
  normalizedValue: ComputedRef<number>
  thickness: ComputedRef<number>
  max: ComputedRef<number>
  hasContent: ComputedRef<boolean | Slot | undefined>
  progressClasses: ComputedRef<(string | Record<string, boolean> | string[])[]>
  progressStyles: ComputedRef<(string[] | undefined)[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IProgressTypeProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props shared by OrigamProgressLinear and OrigamProgressCircular: modelValue, max, thickness, indeterminate, striped, active, absolute, plus padding and margin props.',
        },
    ],
    returns: [
        {
            name: 'progress',
            type: 'Ref<string | number>',
            descriptionKey: '',
            descriptionFallback: 'Two-way bound to modelValue via useVModel. Drive via v-model on the parent component.',
        },
        {
            name: 'normalizedValue',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'progress / max * 100 — a percentage in [0, 100] ready to set as a CSS custom property or width.',
        },
        {
            name: 'thickness',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'The thickness prop coerced to a number. Used as strokeWidth for circular or height for linear variants.',
        },
        {
            name: 'max',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'The max prop parsed as an integer. Defaults to 100.',
        },
        {
            name: 'hasContent',
            type: 'ComputedRef<boolean | Slot | undefined>',
            descriptionKey: '',
            descriptionFallback: 'True when the default slot is populated. Used to show/hide the content overlay (e.g. a percentage label inside a circular bar).',
        },
        {
            name: 'progressClasses',
            type: 'ComputedRef<(string | Record<string, boolean> | string[])[]>',
            descriptionKey: '',
            descriptionFallback: 'Root class array including BEM modifiers for indeterminate, visible (IntersectionObserver), active, striped, absolute, plus padding/margin utility classes.',
        },
        {
            name: 'progressStyles',
            type: 'ComputedRef<(string[] | undefined)[]>',
            descriptionKey: '',
            descriptionFallback: 'Root style array for any padding/margin custom values that cannot be expressed as utility classes.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Linear progress bar',
            code: `<template>
  <origam-progress-linear
    v-model="uploadProgress"
    :max="100"
    color="primary"
    :striped="isUploading"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const uploadProgress = ref(0)
const isUploading = ref(true)
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Circular progress with label',
            code: `<origam-progress-circular
  :model-value="75"
  :thickness="8"
  color="success"
>
  75%
</origam-progress-circular>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Indeterminate loading state',
            code: `<origam-progress-linear indeterminate color="primary" />`,
            lang: 'vue',
        },
    ],
    related: ['use-padding', 'use-margin', 'use-color'],
    consumedInterfaces: ['IProgressTypeProps'],
}
