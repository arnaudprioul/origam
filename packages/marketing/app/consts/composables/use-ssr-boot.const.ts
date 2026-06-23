import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SSR_BOOT_DOC: IComposableDoc = {
    slug: 'use-ssr-boot',
    name: 'useSsrBoot',
    domain: 'Commons',
    icon: 'mdi-server',
    descriptionKey: '',
    descriptionFallback: 'Defers CSS transitions until after the first browser paint to prevent flash-of-transition on SSR hydration. Returns an isBooted flag (false during SSR and the first rAF frame, then true) and a ssrBootStyles computed that injects `transition: none !important` while booting, suppressing unwanted entry animations during hydration.',
    signature: `function useSsrBoot(): {
  ssrBootStyles: ComputedRef<CSSProperties | []>
  isBooted: Readonly<ShallowRef<boolean>>
}`,
    params: [],
    returns: [
        {
            name: 'ssrBootStyles',
            type: 'ComputedRef<CSSProperties | []>',
            descriptionKey: '',
            descriptionFallback: 'An object `{ transition: "none !important" }` when the component has not yet booted, or an empty array after the first animation frame. Spread onto the root element via :style to suppress hydration-flash transitions.',
        },
        {
            name: 'isBooted',
            type: 'Readonly<ShallowRef<boolean>>',
            descriptionKey: '',
            descriptionFallback: 'False on the server and during the first rAF after mount, true thereafter. Useful as a guard before running DOM-dependent logic that assumes the component is fully hydrated.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Suppress hydration-flash on a slide-in panel',
            code: `<script setup lang="ts">
import { useSsrBoot } from 'origam'

const { ssrBootStyles } = useSsrBoot()
</script>

<template>
  <div class="panel" :style="ssrBootStyles">
    <slot />
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Gate DOM-dependent logic on isBooted',
            code: `<script setup lang="ts">
import { watch } from 'vue'
import { useSsrBoot } from 'origam'

const { isBooted } = useSsrBoot()

watch(isBooted, (booted) => {
  if (booted) {
    // safe to measure DOM / attach ResizeObserver / etc.
  }
})
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-hydration'],
    consumedInterfaces: [],
    noteFallback: 'useSsrBoot uses requestAnimationFrame to defer the booted flag — it fires after the browser has painted the first frame, ensuring transitions are already in their final CSS state before they are re-enabled.',
}
