import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SCOPE_ID_DOC: IComposableDoc = {
    slug: 'use-scope-id',
    name: 'useScopeId',
    domain: 'Commons',
    icon: 'mdi-identifier',
    descriptionKey: '',
    descriptionFallback: 'Reads the Vue SFC scope ID from the current component instance and returns it as an attribute object. Used to ensure that teleported or dynamically-created DOM nodes receive the same scoped-CSS attribute as their parent component, so that scoped style rules continue to match across teleport boundaries.',
    signature: `function useScopeId(): {
  scopeId: { [key: string]: '' } | undefined
}`,
    params: [],
    returns: [
        {
            name: 'scopeId',
            type: '{ [key: string]: \'\' } | undefined',
            descriptionKey: '',
            descriptionFallback: 'An object whose single key is the Vue-generated scope attribute (e.g. { "data-v-abc123": "" }). Spread via v-bind on the teleported element to restore scoped CSS. Undefined when the component has no scope ID (e.g. in a plain JS context).',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Apply scope to a teleported overlay',
            code: `<script setup lang="ts">
import { useScopeId } from 'origam'

const { scopeId } = useScopeId()
</script>

<template>
  <Teleport to="body">
    <!-- Scoped CSS rules from this SFC now match the overlay -->
    <div v-bind="scopeId" class="my-overlay">
      <slot />
    </div>
  </Teleport>
</template>

<style scoped>
.my-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0 0 0 / 0.4);
}
</style>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Spread on a programmatic createElement call',
            code: `<script setup lang="ts">
import { h } from 'vue'
import { useScopeId } from 'origam'

const { scopeId } = useScopeId()

const overlay = h('div', { class: 'overlay', ...scopeId }, 'content')
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-teleport', 'use-activator'],
    consumedInterfaces: [],
}
