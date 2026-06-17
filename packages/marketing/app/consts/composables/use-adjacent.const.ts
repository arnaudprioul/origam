import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ADJACENT_DOC: IComposableDoc = {
    slug: 'use-adjacent',
    name: 'useAdjacent',
    domain: 'Commons',
    icon: 'mdi-arrow-expand-horizontal',
    descriptionKey: '',
    descriptionFallback: 'Resolve the presence of prepend and append slots/icons for a component. Exposes computed flags (hasPrepend, hasAppend) that combine both the slot content and the icon/avatar props, plus click-event emitters for the clickable prepend/append areas. A companion composable useAdjacentInner handles the inner prepend/append surface (inside an input field).',
    signature: `function useAdjacent(
  props: IAdjacentProps,
  prependIcon?: Ref | ComputedRef,
  appendIcon?: Ref | ComputedRef
): {
  hasPrependMedia: ComputedRef<boolean>
  hasPrepend: ComputedRef<boolean>
  hasAppendMedia: ComputedRef<boolean>
  hasAppend: ComputedRef<boolean>
  onClickPrepend: (e: Event) => void
  onClickAppend: (e: Event) => void
}

function useAdjacentInner(props: IAdjacentInnerProps): {
  hasPrependInnerMedia: ComputedRef<boolean>
  hasPrependInner: ComputedRef<boolean>
  hasAppendInnerMedia: ComputedRef<boolean>
  hasAppendInner: ComputedRef<boolean>
  hasClear: ComputedRef<boolean>
  onClickPrependInner: (e: Event) => void
  onClickAppendInner: (e: Event) => void
  clickClear: (e: Event) => void
}`,
    params: [
        {
            name: 'props',
            type: 'IAdjacentProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Props carrying prependIcon, appendIcon, prependAvatar, and appendAvatar values. The composable reads these to determine whether the outer prepend/append regions should render.',
        },
        {
            name: 'prependIcon',
            type: 'Ref | ComputedRef',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional reactive icon override for the prepend slot. When provided, takes precedence over props.prependIcon, enabling status-aware icon swapping without prop mutation.',
        },
        {
            name: 'appendIcon',
            type: 'Ref | ComputedRef',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional reactive icon override for the append slot. Same semantics as prependIcon but for the trailing position.',
        },
    ],
    returns: [
        {
            name: 'hasPrependMedia',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when a prepend avatar or icon (resolved from prop or override ref) is present, regardless of the prepend slot.',
        },
        {
            name: 'hasPrepend',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when either the prepend slot is filled OR hasPrependMedia is true. Use this to conditionally render the prepend wrapper.',
        },
        {
            name: 'hasAppendMedia',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when an append avatar or icon (resolved from prop or override ref) is present.',
        },
        {
            name: 'hasAppend',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when either the append slot is filled OR hasAppendMedia is true.',
        },
        {
            name: 'onClickPrepend',
            type: '(e: Event) => void',
            descriptionKey: '',
            descriptionFallback: 'Click handler to bind on the prepend area. Emits the click:prepend event from the component instance.',
        },
        {
            name: 'onClickAppend',
            type: '(e: Event) => void',
            descriptionKey: '',
            descriptionFallback: 'Click handler to bind on the append area. Emits the click:append event from the component instance.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Component with prepend/append icons',
            code: `<script setup lang="ts">
import { useAdjacent } from 'origam'

const props = defineProps<{
  prependIcon?: string
  appendIcon?: string
  prependAvatar?: string
  appendAvatar?: string
}>()

const {
  hasPrepend,
  hasAppend,
  onClickPrepend,
  onClickAppend
} = useAdjacent(props)
</script>

<template>
  <div class="my-component">
    <span v-if="hasPrepend" @click="onClickPrepend"><!-- prepend --></span>
    <slot />
    <span v-if="hasAppend" @click="onClickAppend"><!-- append --></span>
  </div>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Status-aware prepend icon override',
            code: `<script setup lang="ts">
import { computed } from 'vue'
import { useAdjacent } from 'origam'

const props = defineProps<{ status?: 'success' | 'error'; prependIcon?: string }>()

const statusIcon = computed(() =>
  props.status === 'success' ? 'mdi-check-circle' :
  props.status === 'error'   ? 'mdi-alert-circle' :
  undefined
)

const { hasPrepend, onClickPrepend } = useAdjacent(props, statusIcon)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-activator', 'use-icon'],
    consumedInterfaces: ['IAdjacentProps', 'IAdjacentInnerProps'],
}
