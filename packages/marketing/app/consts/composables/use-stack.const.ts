import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_STACK_DOC: IComposableDoc = {
    slug: 'use-stack',
    name: 'useStack',
    domain: 'Commons',
    icon: 'mdi-layers-outline',
    descriptionKey: '',
    descriptionFallback: 'Manages z-index stacking order for overlay components (Dialog, Menu, Tooltip, Drawer, …). Registers the component in the global GLOBAL_STACK array when it becomes active and auto-computes a z-index 10 units above the current topmost overlay. Exposes globalTop (is this the topmost overlay worldwide?) and localTop (does this overlay have no active child overlays?) for pointer-event and close-on-outside-click decisions.',
    signature: `function useStack(
  isActive: Readonly<Ref<boolean>>,
  zIndex: Readonly<Ref<string | number>>,
  disableGlobalStack: boolean
): {
  globalTop: Readonly<ShallowRef<boolean>>
  localTop: ComputedRef<boolean>
  stackStyles: ComputedRef<{ zIndex: number }>
}`,
    params: [
        {
            name: 'isActive',
            type: 'Readonly<Ref<boolean>>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive open/closed state. When it flips to true, useStack registers the component in the global stack and computes a new z-index. When false, the entry is removed and z-index is released.',
        },
        {
            name: 'zIndex',
            type: 'Readonly<Ref<string | number>>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Base z-index to start from when no other overlays are open. Typically comes from the component props (e.g. zIndex="200").',
        },
        {
            name: 'disableGlobalStack',
            type: 'boolean',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'When true, skips registration in GLOBAL_STACK. Use for overlays that manage their own z-index independently (e.g. nested teleport roots) and should not compete with the global stacking order.',
        },
    ],
    returns: [
        {
            name: 'globalTop',
            type: 'Readonly<ShallowRef<boolean>>',
            descriptionKey: '',
            descriptionFallback: 'True when this component is the last entry in GLOBAL_STACK (topmost overlay on the page). Updated asynchronously via setTimeout to avoid synchronous circular reads during stack registration.',
        },
        {
            name: 'localTop',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when this overlay has no active child overlays (nothing opened on top of it within its own sub-tree). Used to decide whether clicks on the backdrop should close this overlay.',
        },
        {
            name: 'stackStyles',
            type: 'ComputedRef<{ zIndex: number }>',
            descriptionKey: '',
            descriptionFallback: 'Style object containing the computed zIndex. Spread onto the overlay root element so it automatically rises above the previous topmost overlay.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Overlay component using useStack',
            code: `<script setup lang="ts">
import { toRef, readonly } from 'vue'
import { useStack } from 'origam'

const props = defineProps<{ modelValue: boolean; zIndex?: number | string }>()

const isActive = readonly(toRef(props, 'modelValue'))
const zIndex = readonly(toRef(props, 'zIndex'))

const { globalTop, localTop, stackStyles } = useStack(isActive, zIndex, false)
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="overlay" :style="stackStyles">
      <slot />
    </div>
  </Teleport>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-teleport'],
    consumedInterfaces: ['IStackProvide'],
    noteFallback: 'useStack uses Vue provide/inject to propagate the local stack context to child overlays. globalTop is updated with a microtask delay to avoid synchronous read-during-write cycles during the activation phase.',
}
