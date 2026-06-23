import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_TELEPORT_DOC: IComposableDoc = {
    slug: 'use-teleport',
    name: 'useTeleport',
    domain: 'Commons',
    icon: 'mdi-arrow-top-right-bold-box-outline',
    descriptionKey: '',
    descriptionFallback: 'Resolves the Vue Teleport target for overlay components. Accepts true (disable teleport — render inline), false (teleport to document.body), a CSS selector string (teleport to the matched element), or a raw Element. Creates an .origam-overlay-container div inside the target when one does not already exist, so multiple overlays sharing the same target stack correctly without polluting the host\'s direct children.',
    signature: `function useTeleport(
  target: Ref<boolean | string | Element>
): {
  teleportTarget: ComputedRef<Element | undefined>
}`,
    params: [
        {
            name: 'target',
            type: 'Ref<boolean | string | Element>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive teleport destination. true → returns undefined (Vue Teleport disabled, renders in-place). false → document.body. A CSS selector string → querySelector result. An Element → used directly. Returns undefined and warns if a string selector yields no match.',
        },
    ],
    returns: [
        {
            name: 'teleportTarget',
            type: 'ComputedRef<Element | undefined>',
            descriptionKey: '',
            descriptionFallback: 'The resolved .origam-overlay-container element inside the target, or undefined when teleport is disabled (target=true) or the app is running on the server (SSR). Pass directly to <Teleport :to="teleportTarget">.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Overlay component with configurable teleport target',
            code: `<script setup lang="ts">
import { toRef } from 'vue'
import { useTeleport } from 'origam'

const props = defineProps<{
  attach?: boolean | string | Element
}>()

const { teleportTarget } = useTeleport(toRef(props, 'attach'))
</script>

<template>
  <Teleport :to="teleportTarget" :disabled="!teleportTarget">
    <div class="overlay__content">
      <slot />
    </div>
  </Teleport>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Teleport inside a scoped container',
            code: `<!-- Teleport the overlay inside a specific panel instead of body -->
<origam-menu attach="#my-panel" />
<div id="my-panel" style="position: relative;" />`,
            lang: 'vue',
        },
    ],
    related: ['use-stack'],
    consumedInterfaces: [],
    noteFallback: 'useTeleport is SSR-safe: it guards all document accesses behind IN_BROWSER. On the server, teleportTarget is always undefined and the caller\'s <Teleport :disabled="!teleportTarget"> renders inline.',
}
