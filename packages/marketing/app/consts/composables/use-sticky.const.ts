import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_STICKY_DOC: IComposableDoc = {
    slug: 'use-sticky',
    name: 'useSticky',
    domain: 'Commons',
    icon: 'mdi-pin-outline',
    descriptionKey: '',
    descriptionFallback: 'Implements the "sticky-while-scrolling" pattern for taller-than-viewport navigation drawers. Tracks scroll direction and element bounding rect to decide whether the sidebar is stuck at the top, stuck at the bottom, or free-floating mid-page. Returns stickyStyles with the appropriate top/bottom offset so the sidebar scrolls naturally through long content without jumping.',
    signature: `function useSticky(options: ISticky): {
  isStuck: ShallowRef<boolean | 'top' | 'bottom'>
  stickyStyles: ComputedRef<Array<CSSProperties | undefined>>
}`,
    params: [
        {
            name: 'options',
            type: 'ISticky',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Configuration object containing rootEl (template ref to the sticky element), isSticky (Ref<boolean> — feature toggle; when false the scroll listener is removed), and layoutItemStyles (ComputedRef of the layout item styles, providing the top offset imposed by the app-bar).',
        },
    ],
    returns: [
        {
            name: 'isStuck',
            type: 'ShallowRef<boolean | "top" | "bottom">',
            descriptionKey: '',
            descriptionFallback: 'Current stuck state. "top" = anchored at the top of the viewport (sidebar shorter than viewport or scrolled to top), "bottom" = anchored at the bottom edge, true = stuck mid-page (sidebar taller than viewport, user scrolled past the top edge), false = not sticky (isSticky prop is false).',
        },
        {
            name: 'stickyStyles',
            type: 'ComputedRef<Array<CSSProperties | undefined>>',
            descriptionKey: '',
            descriptionFallback: 'Two-element style array to spread on the element. The first resets top/bottom/height when isSticky is enabled. The second applies the computed positional offset: the layoutItem top when not yet stuck, or the scrolled stuckPosition when stuck mid-page or at the bottom.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Sticky navigation drawer',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useSticky } from 'origam'

const rootEl = ref<HTMLElement>()
const isSticky = ref(true)
// Comes from useLayout or is a static offset
const layoutItemStyles = ref({ top: '64px' })

const { stickyStyles } = useSticky({ rootEl, isSticky, layoutItemStyles })
</script>

<template>
  <nav ref="rootEl" :style="stickyStyles" class="sidebar">
    <slot />
  </nav>
</template>`,
            lang: 'vue',
        },
    ],
    related: [],
    consumedInterfaces: ['ISticky'],
    noteFallback: 'useSticky mounts a passive scroll listener on window when isSticky is true and removes it when false or on beforeUnmount. The scroll handler reads getBoundingClientRect() and a --v-body-scroll-y CSS custom property (set by the layout manager) to compute the final offset.',
}
