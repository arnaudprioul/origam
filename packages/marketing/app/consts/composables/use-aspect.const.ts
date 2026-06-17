import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ASPECT_DOC: IComposableDoc = {
    slug: 'use-aspect',
    name: 'useAspectRatio',
    domain: 'Responsive',
    icon: 'mdi-aspect-ratio',
    descriptionKey: '',
    descriptionFallback: 'Compute a CSS padding-block-end value that enforces a given aspect ratio on a responsive container. Supports explicit aspect-ratio strings (e.g. "16/9") and falls back to the current viewport ratio when none is given. SSR-safe: returns an empty styles array on the server.',
    signature: `function useAspectRatio(props: { aspectRatio?: string | number }): {
  aspectStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: '{ aspectRatio?: string | number }',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Object carrying an optional aspectRatio value. Accepts a numeric ratio (1.777 for 16:9), a division expression string ("16/9"), or is left undefined to use window.innerWidth / window.innerHeight as the ratio.',
        },
    ],
    returns: [
        {
            name: 'aspectStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Array of inline CSS declarations to spread via :style. Contains a single padding-block-end percentage when a valid ratio is resolved, or an empty array during SSR.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: '16:9 video placeholder',
            code: `<script setup lang="ts">
import { useAspectRatio } from 'origam'

const props = defineProps<{ aspectRatio?: string | number }>()
const { aspectStyles } = useAspectRatio(props)
</script>

<template>
  <div :style="aspectStyles" style="position: relative; width: 100%;">
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Hardcoded square',
            code: `<script setup lang="ts">
import { useAspectRatio } from 'origam'

const { aspectStyles } = useAspectRatio({ aspectRatio: 1 })
</script>

<template>
  <figure :style="aspectStyles">
    <img src="/photo.jpg" alt="Square photo" />
  </figure>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-dimension', 'use-css-support'],
    consumedInterfaces: [],
    noteFallback: 'On the server (SSR), IN_BROWSER is false and window is unavailable. aspectStyles returns [] so the layout collapses to its natural box height. The client rehydrates with the correct padding-block-end on the first reactive access.',
}
