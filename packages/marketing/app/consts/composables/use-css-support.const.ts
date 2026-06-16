import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_CSS_SUPPORT_DOC: IComposableDoc = {
    slug: 'use-css-support',
    name: 'useCssSupport',
    domain: 'CssSupport',
    icon: 'mdi-code-braces',
    descriptionKey: '',
    descriptionFallback: 'The single CSS feature-detection layer in Origam. Provides a reactive flag map for the monitored feature matrix, plus free-form supports() / supportsAny() / supportsAll() helpers with per-query caching. Never call CSS.supports() directly in a component.',
    signature: `function useCssSupport(): {
  css: Readonly<Ref<TCssSupportMap>>
  supports: (query: string) => boolean
  supportsAny: (...queries: string[]) => boolean
  supportsAll: (...queries: string[]) => boolean
  has: (feature: TCssFeatureName) => ComputedRef<boolean>
}`,
    params: [],
    returns: [
        {
            name: 'css',
            type: 'Readonly<Ref<TCssSupportMap>>',
            descriptionKey: '',
            descriptionFallback: 'Reactive map of every feature in FEATURE_QUERIES to a boolean. All values are false during SSR; they flip to the real result on the first browser-side initialisation call.',
        },
        {
            name: 'supports',
            type: '(query: string) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Free-form CSS.supports() wrapper with per-query caching. Accepts any string form CSS.supports() accepts (property, selector(), math, etc.).',
        },
        {
            name: 'supportsAny',
            type: '(...queries: string[]) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns true if at least one of the provided queries is supported.',
        },
        {
            name: 'supportsAll',
            type: '(...queries: string[]) => boolean',
            descriptionKey: '',
            descriptionFallback: 'Returns true only if every provided query is supported.',
        },
        {
            name: 'has',
            type: '(feature: TCssFeatureName) => ComputedRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'Returns a reactive ComputedRef<boolean> for a named feature from FEATURE_QUERIES. Preferred over css.value.X when the flag drives reactive template logic.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Branch on container query support',
            code: `<script setup lang="ts">
import { useCssSupport } from 'origam'

const { css } = useCssSupport()
</script>

<template>
  <ClientOnly>
    <div v-if="css.containerQueries" class="layout--cq">
      Container-query layout
    </div>
    <div v-else class="layout--js">
      JS ResizeObserver fallback
    </div>
  </ClientOnly>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Free-form query with supportsAny',
            code: `<script setup lang="ts">
import { useCssSupport } from 'origam'

const { supportsAny, supports } = useCssSupport()

const hasSubgrid = supportsAny('display: subgrid', 'grid-template-rows: subgrid')
const hasHas = supports('selector(:has(*))')
</script>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Hydration-safe markup gate (useCssSupportClient)',
            code: `<script setup lang="ts">
import { useCssSupportClient } from 'origam'

// Starts false (SSR-safe), flips to real value on mount
const supportsContainer = useCssSupportClient('containerQueries')
</script>

<template>
  <div v-if="supportsContainer">CSS path</div>
  <div v-else>JS fallback path</div>
</template>`,
            lang: 'vue',
        },
    ],
    related: [],
    consumedInterfaces: [],
    noteFallback: 'All feature flags are false during SSR. Wrap markup branches on these flags with <ClientOnly> or use useCssSupportClient() which starts at the given defaultValue and only flips inside onMounted — preventing Vue hydration mismatches.',
}
