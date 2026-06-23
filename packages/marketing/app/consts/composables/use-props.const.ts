import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_PROPS_DOC: IComposableDoc = {
    slug: 'use-props',
    name: 'useProps',
    domain: 'Commons',
    icon: 'mdi-tune-variant',
    descriptionKey: '',
    descriptionFallback: 'Returns a filterProps utility that picks only the keys declared on a component interface from an arbitrary props object, stripping undefined values so that Vue 3 boolean-prop coercion does not silently override withDefaults in child components. Used by composite components (DataTable, List, Select…) to forward a safe subset of their own props to child Origam components.',
    signature: `function useProps<T extends Record<string, any>>(
  props: T
): {
  props: T
  filterProps: <U extends Partial<ExtractPropTypes<T>>>(
    properties: U,
    excludes?: string[]
  ) => Partial<U>
}`,
    params: [
        {
            name: 'props',
            type: 'T extends Record<string, any>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The component interface (or a plain object with the same keys) that defines the allowed prop surface. Only keys present here will be picked by filterProps.',
        },
    ],
    returns: [
        {
            name: 'props',
            type: 'T',
            descriptionKey: '',
            descriptionFallback: 'The same props object passed in, re-exposed for convenience.',
        },
        {
            name: 'filterProps',
            type: '<U>(properties: U, excludes?: string[]) => Partial<U>',
            descriptionKey: '',
            descriptionFallback: 'Picks the intersection of properties keys with the declared prop surface, then removes undefined values. The excludes list defaults to ["class", "style", "id"] — class and style forwarding is handled separately via $attrs.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Forward a safe prop subset to a child',
            code: `<script setup lang="ts">
import { useProps } from 'origam'
import type { ICardProps } from 'origam'

const props = defineProps<ICardProps & { extraProp?: string }>()
const { filterProps } = useProps(props)

// Only ICardProps keys are forwarded — extraProp is silently dropped
const cardProps = filterProps(props)
</script>

<template>
  <origam-card v-bind="cardProps">
    <slot />
  </origam-card>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom excludes',
            code: `// Exclude "color" in addition to class/style/id
const listProps = filterProps(props, ['class', 'style', 'id', 'color'])`,
            lang: 'ts',
        },
    ],
    related: ['use-defaults', 'use-group'],
    consumedInterfaces: ['IFilterPropsOptions'],
}
