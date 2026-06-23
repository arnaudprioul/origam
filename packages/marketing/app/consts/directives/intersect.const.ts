/**
 * /directives/intersect — documentation data.
 *
 * SOURCE OF TRUTH: packages/ds/src/directives/Intersect/intersect.directive.ts
 * Cross-checked against packages/ds/src/interfaces/Commons/intersect.interface.ts
 */
import type { IDirectiveDoc } from '~/interfaces/directive-doc.interface'

export const INTERSECT_DOC: IDirectiveDoc = {
    slug: 'intersect',
    name: 'v-intersect',
    icon: 'mdi-eye-outline',
    category: 'Directive',
    descriptionKey: 'directives.intersect.description',
    descriptionFallback: 'Wraps the IntersectionObserver API. Fires a callback each time the element enters or leaves the viewport. Supports .once to disconnect after the first entry and .quiet to skip the initial call on mount.',
    signatureSummary: 'v-intersect="handler | options"',
    signatureCode: `// Simple handler
v-intersect="onIntersect"

// With IntersectionObserver options
v-intersect="{ handler: onIntersect, options: { threshold: 0.5 } }"

// Fire once on enter, then auto-disconnect
v-intersect.once="onEntered"

// Skip the initial call triggered on observer setup
v-intersect.quiet="onIntersect"`,
    signatureLang: 'ts',

    args: [
        {
            name: 'handler',
            type: '(isIntersecting: boolean, entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void',
            descriptionKey: 'directives.intersect.arg_handler',
            descriptionFallback: 'Callback called on each intersection change. Receives the boolean convenience flag, the raw entries array, and the observer instance.',
            required: true
        },
        {
            name: 'options',
            type: 'IntersectionObserverInit',
            descriptionKey: 'directives.intersect.arg_options',
            descriptionFallback: 'Standard IntersectionObserver constructor options (root, rootMargin, threshold). Only available in the object form of the binding.'
        }
    ],

    modifiers: [
        {
            name: 'once',
            descriptionKey: 'directives.intersect.modifier_once',
            descriptionFallback: 'Disconnects the observer after the element enters the viewport for the first time. Useful for one-shot animations.'
        },
        {
            name: 'quiet',
            descriptionKey: 'directives.intersect.modifier_quiet',
            descriptionFallback: 'Suppresses the first callback call that IntersectionObserver fires synchronously on setup, so the handler only fires on real scroll-triggered intersections.'
        }
    ],

    examples: [
        {
            titleKey: 'directives.intersect.example_basic_title',
            titleFallback: 'Animate on enter (once)',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const onEnter = (isIntersecting: boolean) => {
  if (isIntersecting) visible.value = true
}
</script>

<template>
  <div
    v-intersect.once="onEnter"
    :class="{ 'fade-in': visible }"
  >
    I animate when I enter the viewport.
  </div>
</template>`
        },
        {
            titleKey: 'directives.intersect.example_options_title',
            titleFallback: 'With threshold option',
            lang: 'vue',
            code: `<script setup lang="ts">
const onHalfVisible = (isIntersecting: boolean) => {
  console.log('50% visible:', isIntersecting)
}
</script>

<template>
  <div
    v-intersect="{
      handler: onHalfVisible,
      options: { threshold: 0.5 }
    }"
  >
    Fires when 50% of me is in view.
  </div>
</template>`
        }
    ],

    noteKey: 'directives.intersect.note',
    noteFallback: 'IntersectionObserver is not available in IE 11 without a polyfill. Origam does not bundle a polyfill — add one via the project if IE 11 support is required.',

    related: [
        {
            slug: 'infinite-scroll',
            name: 'InfiniteScroll',
            kind: 'component',
            descriptionKey: 'directives.related.infinite_scroll',
            descriptionFallback: 'Uses v-intersect internally to detect when the sentinel element reaches the viewport and triggers the next-page load.'
        },
        {
            slug: 'lazy-img',
            name: 'Img (lazy)',
            kind: 'component',
            descriptionKey: 'directives.related.img',
            descriptionFallback: 'OrigamImg lazy-loading mode is powered by v-intersect.'
        }
    ]
}
