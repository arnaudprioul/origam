import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_HYDRATION_DOC: IComposableDoc = {
    slug: 'use-hydration',
    name: 'useHydration',
    domain: 'Commons',
    icon: 'mdi-water-sync',
    descriptionKey: '',
    descriptionFallback: 'Returns a shallow ref that is false during SSR and true once the component has mounted in the browser. In non-SSR mode it resolves immediately to true. Use it to guard client-only rendering branches without causing hydration mismatches.',
    signature: `function useHydration(): ShallowRef<boolean>`,
    params: [],
    returns: [
        {
            name: 'isMounted',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'false during SSR and on the first render pass; true once onMounted fires. Always true in a non-SSR context.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Guard a client-only component',
            code: `<script setup lang="ts">
import { useHydration } from 'origam'

const isMounted = useHydration()
</script>

<template>
  <canvas v-if="isMounted" id="chart" />
  <div v-else class="skeleton" aria-hidden="true" />
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Deferred computation until hydrated',
            code: `<script setup lang="ts">
import { computed } from 'vue'
import { useHydration } from 'origam'

const isMounted = useHydration()
const clientWidth = computed(() => isMounted.value ? window.innerWidth : 0)
</script>`,
            lang: 'ts',
        },
    ],
    related: ['use-css-support', 'use-display', 'use-ssr-boot'],
    noteFallback: 'useHydration delegates to useDisplay().ssr to detect the SSR context. Outside the browser it returns shallowRef(false) immediately, skipping the onMounted registration entirely.',
}
