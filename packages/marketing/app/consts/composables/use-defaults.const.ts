import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_DEFAULTS_DOC: IComposableDoc = {
    slug: 'use-defaults',
    name: 'useDefaults',
    domain: 'Commons',
    icon: 'mdi-tune-variant',
    descriptionKey: '',
    descriptionFallback: 'Component-side hook for the OrigamDefaultsProvider system. Returns a Proxy over the component\'s own props that resolves each value through a four-level chain: explicitly passed prop → component-specific defaults from the closest provider → global defaults from the closest provider → withDefaults() value.',
    signature: `function useDefaults<T extends Record<string, any>>(
  props: T,
  name?: string
): T`,
    params: [
        {
            name: 'props',
            type: 'T extends Record<string, any>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The component\'s reactive props object (as returned by defineProps).',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Component name used to look up component-specific defaults in the provider. Defaults to the current instance\'s kebab-cased name via getCurrentInstanceName().',
        },
    ],
    returns: [
        {
            name: '(proxied props)',
            type: 'T',
            descriptionKey: '',
            descriptionFallback: 'A Proxy wrapping the original props. Every property read goes through the four-level resolution chain. Object.keys(), spread, and filterProps still see the original prop names. Non-prop accesses (Vue internals, symbols) are forwarded to the original props directly.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Opt in to defaults resolution in a component',
            code: `<script setup lang="ts">
import { useDefaults } from 'origam'
import type { IBtnProps } from 'origam'

const rawProps = defineProps<IBtnProps>()

// Use the resolved props everywhere instead of rawProps
const props = useDefaults(rawProps)
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Provide defaults for a subtree',
            code: `<template>
  <!-- All OrigamBtn inside will default to color="primary" size="lg" -->
  <origam-defaults-provider :defaults="{ 'origam-btn': { color: 'primary', size: 'lg' } }">
    <slot />
  </origam-defaults-provider>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['provide-defaults', 'create-defaults'],
    consumedInterfaces: ['IDefault'],
    noteFallback: 'The wasPropPassed check reads vm.vnode.props on every resolution (not once at setup) to handle dynamic v-bind patterns where the parent\'s forwarded props may be empty on the first render.',
}
