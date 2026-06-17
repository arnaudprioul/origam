import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_LOADER_DOC: IComposableDoc = {
    slug: 'use-loader',
    name: 'useLoader',
    domain: 'Commons',
    icon: 'mdi-loading',
    descriptionKey: '',
    descriptionFallback: 'Resolves the polymorphic loading prop (boolean | number | TLoaderConfig) into a normalised descriptor used by the consuming component to mount the correct progress renderer (line, circular, or skeleton) with the correct props. Emits a BEM loading class while active.',
    signature: `function useLoader(
  props: ILoaderProps,
  defaultKind?: TLoaderKind,
  name?: string
): {
  loaderClasses: ComputedRef<Record<string, boolean>>
  isLoading: ComputedRef<boolean>
  loaderConfig: ComputedRef<IResolvedLoader>
}`,
    params: [
        {
            name: 'props',
            type: 'ILoaderProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props extending ILoaderProps. The loading key accepts boolean (indeterminate), number (determinate 0-100), or a TLoaderConfig object with an explicit type discriminant.',
        },
        {
            name: 'defaultKind',
            type: "TLoaderKind",
            required: false,
            defaultValue: "'circular'",
            descriptionKey: '',
            descriptionFallback: "Renderer to use when loading is true or a plain number (no explicit type). Common values: 'circular' (Btn default), 'line' (Card default), 'skeleton'.",
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Kebab-case component name used to build the ${name}--loading BEM modifier class. Defaults to the current component name via getCurrentInstanceName().',
        },
    ],
    returns: [
        {
            name: 'isLoading',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the loading prop is truthy (boolean true, a number, or a TLoaderConfig object).',
        },
        {
            name: 'loaderClasses',
            type: 'ComputedRef<Record<string, boolean>>',
            descriptionKey: '',
            descriptionFallback: 'Class map to bind via :class. Contains { "${name}--loading": true } when isLoading is true.',
        },
        {
            name: 'loaderConfig',
            type: 'ComputedRef<IResolvedLoader>',
            descriptionKey: '',
            descriptionFallback: 'Normalised descriptor: isActive, kind (renderer type), modelValue (determinate progress), indeterminate flag, and overrides (per-kind props to v-bind on the renderer). Use this to conditionally mount OrigamProgress or OrigamSkeleton.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Indeterminate circular loader',
            code: `<script setup lang="ts">
import { useLoader } from 'origam'

const props = defineProps<{ loading?: boolean | number }>()
const { isLoading, loaderClasses, loaderConfig } = useLoader(props, 'circular')
</script>

<template>
  <div :class="[loaderClasses]">
    <origam-progress
      v-if="loaderConfig.isActive"
      :type="loaderConfig.kind"
      :indeterminate="loaderConfig.indeterminate"
      :model-value="loaderConfig.modelValue"
    />
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Determinate line loader',
            code: `<script setup lang="ts">
import { useLoader } from 'origam'

const props = defineProps<{ loading?: boolean | number }>()
// Pass 42 as loading → determinate line at 42%
const { loaderConfig } = useLoader(props, 'line')
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-lazy', 'use-active'],
    consumedInterfaces: ['ILoaderProps', 'IResolvedLoader'],
}
