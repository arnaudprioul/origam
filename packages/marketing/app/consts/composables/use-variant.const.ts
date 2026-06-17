import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_VARIANT_DOC: IComposableDoc = {
    slug: 'use-variant',
    name: 'useVariant',
    domain: 'Commons',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: '',
    descriptionFallback: 'Resolves a component variant value into a BEM modifier class. Accepts either a props object implementing IVariantProps or a direct reactive ref to the variant string. Returns a single computed array of class strings for binding.',
    signature: `function useVariant(
  props: IVariantProps | Ref<TVariant | TVariantInput | string | undefined>,
  name?: string
): {
  variantClasses: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IVariantProps | Ref<TVariant | TVariantInput | string | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Either the component props object (reads `props.variant`) or a bare reactive ref / computed to the variant string. The composable detects which form is passed via `isRef`.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'The BEM block prefix. Defaults to the current component name (e.g. `origam-btn`). The class produced will be `{name}--variant-{variant}`.',
        },
    ],
    returns: [
        {
            name: 'variantClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Array containing `{name}--variant-{variant}` when a variant is set, empty array otherwise. Bind to the component root via `:class`.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Component with variant prop',
            code: `<script setup lang="ts">
import { useVariant } from 'origam'

const props = defineProps<{
    variant?: 'flat' | 'outlined' | 'text' | 'elevated' | 'tonal' | 'plain'
}>()

const { variantClasses } = useVariant(props)
</script>

<template>
  <button :class="['my-btn', ...variantClasses]">
    <slot />
  </button>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Passing a raw ref',
            code: `<script setup lang="ts">
import { useVariant } from 'origam'
import { ref } from 'vue'

const variant = ref('outlined')
const { variantClasses } = useVariant(variant)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-color', 'use-background-color'],
    consumedInterfaces: ['IVariantProps'],
}
