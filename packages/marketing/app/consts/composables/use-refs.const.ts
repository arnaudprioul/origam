import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_REFS_DOC: IComposableDoc = {
    slug: 'use-refs',
    name: 'useRefs',
    domain: 'Commons',
    icon: 'mdi-link-variant',
    descriptionKey: '',
    descriptionFallback: 'Manages a dynamic array of template refs that is reset before each update cycle. Provides an updateRef(el, i) callback designed for use with :ref in v-for loops, where Vue replaces individual refs by index. The refs array is always fresh (cleared in onBeforeUpdate) so stale elements from a previous render do not leak.',
    signature: `function useRefs<T extends object>(): {
  refs: Ref<(T | undefined)[]>
  updateRef: (el: any, i: number) => void
}`,
    params: [],
    returns: [
        {
            name: 'refs',
            type: 'Ref<(T | undefined)[]>',
            descriptionKey: '',
            descriptionFallback: 'Array of collected template refs. Each slot corresponds to the index passed to updateRef. Cleared before every update cycle to avoid stale entries.',
        },
        {
            name: 'updateRef',
            type: '(el: any, i: number) => void',
            descriptionKey: '',
            descriptionFallback: 'Assign to :ref in a v-for loop: :ref="(el) => updateRef(el, index)". Sets refs.value[i] = el on mount and leaves the slot undefined on unmount.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Collect refs from a v-for list',
            code: `<script setup lang="ts">
import { useRefs } from 'origam'

const { refs: itemRefs, updateRef } = useRefs<HTMLLIElement>()

function focusItem(i: number) {
  itemRefs.value[i]?.focus()
}
</script>

<template>
  <ul>
    <li
      v-for="(item, i) in items"
      :key="item.id"
      :ref="(el) => updateRef(el, i)"
      tabindex="0"
    >
      {{ item.label }}
    </li>
  </ul>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Refs of child Origam components',
            code: `<script setup lang="ts">
import { useRefs } from 'origam'
import type { TOrigamBtn } from 'origam'

const { refs: btnRefs, updateRef } = useRefs<TOrigamBtn>()

function blurAll() {
  btnRefs.value.forEach(btn => btn?.blur())
}
</script>

<template>
  <origam-btn
    v-for="(action, i) in actions"
    :key="action.id"
    :ref="(el) => updateRef(el, i)"
    @click="action.handler"
  >
    {{ action.label }}
  </origam-btn>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-event-listener', 'use-resize-observer'],
    consumedInterfaces: [],
}
