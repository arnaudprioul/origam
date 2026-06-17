import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_LAYOUT_DOC: IComposableDoc = {
    slug: 'use-layout',
    name: 'useLayout',
    domain: 'Commons',
    icon: 'mdi-page-layout-header-footer',
    descriptionKey: '',
    descriptionFallback: 'Reads the nearest OrigamLayout context. Returns the layout item registry accessor, the reactive main content rectangle, and the computed CSS styles that push the main area aside to avoid overlap with fixed layout children (AppBar, Drawer, Footer, BottomNav). Throws if called outside an OrigamLayout provider.',
    signature: `function useLayout(): {
  getLayoutItem: (id: string) => ILayoutItem | undefined
  mainRect: ComputedRef<{ top: number; left: number; right: number; bottom: number }>
  mainStyles: ComputedRef<CSSProperties>
  mainId: ComputedRef<string>
}`,
    params: [],
    returns: [
        {
            name: 'getLayoutItem',
            type: '(id: string) => ILayoutItem | undefined',
            descriptionKey: '',
            descriptionFallback: 'Looks up a registered layout item by its id. Returns undefined when the id is not yet registered.',
        },
        {
            name: 'mainRect',
            type: 'ComputedRef<{ top: number; left: number; right: number; bottom: number }>',
            descriptionKey: '',
            descriptionFallback: 'Reactive rectangle describing the space left for the main content area after all active layout items have claimed their edges.',
        },
        {
            name: 'mainStyles',
            type: 'ComputedRef<CSSProperties>',
            descriptionKey: '',
            descriptionFallback: 'CSS styles (left / right / top / bottom + matching --origam-layout---position-* custom properties) to apply to the main content so it never slides under fixed layout panels.',
        },
        {
            name: 'mainId',
            type: 'ComputedRef<string>',
            descriptionKey: '',
            descriptionFallback: 'Stable computed id of the owning OrigamLayout instance.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Read the main content rectangle',
            code: `<script setup lang="ts">
import { useLayout } from 'origam'

const { mainRect, mainStyles } = useLayout()
</script>

<template>
  <main :style="mainStyles">
    <!-- Content is automatically offset from AppBar / Drawer -->
    <slot />
  </main>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Inspect a registered layout item',
            code: `<script setup lang="ts">
import { useLayout } from 'origam'

const { getLayoutItem } = useLayout()

const drawerItem = getLayoutItem('main-drawer')
// { id, top, left, right, bottom, size, position }
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-layout-item', 'use-create-layout'],
    consumedInterfaces: [],
    noteFallback: 'useLayout throws "[Origam] Could not find injected layout" when called outside an OrigamLayout. Components that may be used standalone (e.g. in stories) should use useLayoutItem instead, which silently returns inert styles when no layout provider is present.',
}
