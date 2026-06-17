import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_LAZY_DOC: IComposableDoc = {
    slug: 'use-lazy',
    name: 'useLazy',
    domain: 'Commons',
    icon: 'mdi-lightning-bolt-outline',
    descriptionKey: '',
    descriptionFallback: 'Controls whether a component\'s content has been booted into the DOM. Content is rendered on first activation and optionally destroyed when the component closes again (eager: false). Used by Dialog, Menu, Tooltip and any overlay that should avoid rendering markup before it is first opened.',
    signature: `function useLazy(
  props: { eager: boolean },
  active: Ref<boolean>
): {
  isBooted: ShallowRef<boolean>
  hasContent: ComputedRef<boolean>
  onAfterLeave: () => void
}`,
    params: [
        {
            name: 'props',
            type: '{ eager: boolean }',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'When eager is true the content is rendered immediately regardless of the active state, bypassing lazy mounting entirely.',
        },
        {
            name: 'active',
            type: 'Ref<boolean>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive open/visible state of the component. The composable watches this to boot the content on first activation.',
        },
    ],
    returns: [
        {
            name: 'isBooted',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Flips to true the first time active becomes true, then stays true unless eager is false and onAfterLeave is called.',
        },
        {
            name: 'hasContent',
            type: 'ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True when the content should be in the DOM: isBooted || eager || active. Gate your content slot with v-if="hasContent".',
        },
        {
            name: 'onAfterLeave',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Call this on the leave-transition after-leave hook. Resets isBooted to false when eager is false, removing the content from the DOM after the closing animation completes.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Lazy-mount an overlay',
            code: `<script setup lang="ts">
import { shallowRef } from 'vue'
import { useLazy } from 'origam'

const isOpen = shallowRef(false)
const { hasContent, onAfterLeave } = useLazy({ eager: false }, isOpen)
</script>

<template>
  <Transition @after-leave="onAfterLeave">
    <div v-if="isOpen">
      <template v-if="hasContent">
        <!-- Expensive content only mounted once opened -->
      </template>
    </div>
  </Transition>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Eager rendering (always in DOM)',
            code: `<script setup lang="ts">
import { shallowRef } from 'vue'
import { useLazy } from 'origam'

const isOpen = shallowRef(false)
// eager:true → hasContent is always true, content never removed
const { hasContent } = useLazy({ eager: true }, isOpen)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-activator', 'use-loader'],
    consumedInterfaces: [],
}
