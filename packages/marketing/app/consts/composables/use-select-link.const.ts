import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SELECT_LINK_DOC: IComposableDoc = {
    slug: 'use-select-link',
    name: 'useSelectLink',
    domain: 'Commons',
    icon: 'mdi-link-variant',
    descriptionKey: '',
    descriptionFallback: 'Bridges a router link and a group selection: when the link becomes active (current route matches), it automatically selects its group item. Used internally by navigation components (NavList, BottomNav, Tabs) so that a hard navigation or a programmatic router push keeps the selected state in sync without a manual v-model update.',
    signature: `function useSelectLink(
  link: IUseLink,
  select?: (value: boolean, e?: Event) => void
): void`,
    params: [
        {
            name: 'link',
            type: 'IUseLink',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The link object returned by useRouter/useLink. Exposes isLink (whether an href/to prop is present) and isActive (whether the current route matches the link target). Watched by the composable to trigger selection.',
        },
        {
            name: 'select',
            type: '(value: boolean, e?: Event) => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'The group selection callback injected by useGroup. When the link becomes active, this is called with value=true on the next tick. When undefined, the composable becomes a no-op.',
        },
    ],
    returns: [],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Navigation item that auto-selects on route match',
            code: `<script setup lang="ts">
import { useSelectLink } from 'origam'
import { useLink } from 'vue-router'

const props = defineProps<{ to: string }>()

// Provided by the parent group (e.g. OrigamNavList)
const select = inject(ORIGAM_GROUP_ITEM_KEY)?.select

const link = useLink({ to: props.to })
useSelectLink(link, select)
</script>

<template>
  <origam-btn :to="to" :class="{ active: link.isActive.value }">
    <slot />
  </origam-btn>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-group', 'use-router'],
    consumedInterfaces: ['IUseLink'],
    noteFallback: 'useSelectLink is a side-effect-only composable — it returns nothing. Its entire contract is the watcher that calls select() on next tick when link.isActive flips to true. The next-tick deferral avoids a synchronous group mutation during the router navigation cycle.',
}
