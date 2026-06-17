import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_CODE_DOC: IComposableDoc = {
    slug: 'use-code',
    name: 'useCode',
    domain: 'Code',
    icon: 'mdi-code-tags',
    descriptionKey: '',
    descriptionFallback: 'Singleton shiki-powered syntax highlighter. Lazily loads shiki on the first highlight() call to keep the initial bundle small. Bundles only the curated origam language subset and dual light/dark themes so token colours switch via CSS variables without re-tokenising. Caches results in a tiny LRU keyed by (code, lang).',
    signature: `function useCode(): {
  highlight: (code: string, lang: TCodeLang) => Promise<string>
  prime: () => Promise<void>
  isReady: () => boolean
  resetCacheForTesting: () => void
}`,
    params: [],
    returns: [
        {
            name: 'highlight',
            type: '(code: string, lang: TCodeLang) => Promise<string>',
            descriptionKey: '',
            descriptionFallback: 'Render code to a pre-tokenised HTML string. Cold (~200 ms on first call while shiki loads), instant on subsequent calls thanks to the LRU cache. Unknown languages fall back to plaintext with a one-shot console warning.',
        },
        {
            name: 'prime',
            type: '() => Promise<void>',
            descriptionKey: '',
            descriptionFallback: 'Force the shiki highlighter to load. Useful in stories and tests to warm the cache before mounting consumers.',
        },
        {
            name: 'isReady',
            type: '() => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns false on first paint, flips to true once the dynamic import has resolved.',
        },
        {
            name: 'resetCacheForTesting',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Wipe the LRU cache. Test-only — production code should never call this.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Highlight a snippet on mount',
            code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCode } from 'origam'

const { highlight } = useCode()
const html = ref('')

onMounted(async () => {
  html.value = await highlight('const x = 42', 'typescript')
})
</script>

<template>
  <pre><code v-html="html" /></pre>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Prime the highlighter eagerly',
            code: `<script setup lang="ts">
import { useCode } from 'origam'

const { prime, isReady } = useCode()

// Load shiki as soon as the component mounts so the first
// highlight() call is instant.
prime()
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-clipboard'],
    consumedInterfaces: ['IUseCodeReturn'],
    noteFallback: 'The singleton highlighter is module-scoped — every useCode() consumer in the app shares the same instance. Theme switching is CSS-only: shiki emits --shiki-light / --shiki-dark CSS vars on each token, and the SCSS consumes the matching var based on [data-theme].',
}
