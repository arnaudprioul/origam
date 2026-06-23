/**
 * /directives/hover — documentation data.
 *
 * SOURCE OF TRUTH: packages/ds/src/directives/Hover/hover.directive.ts
 * Cross-checked against packages/ds/src/interfaces/Commons/hover.interface.ts
 */
import type { IDirectiveDoc } from '~/interfaces/directive-doc.interface'

export const HOVER_DOC: IDirectiveDoc = {
    slug: 'hover',
    name: 'v-hover',
    icon: 'mdi-cursor-default-outline',
    category: 'Directive',
    descriptionKey: 'directives.hover.description',
    descriptionFallback: 'Toggles a CSS class on an element while the pointer is over it. Supports a callback mode (.callback modifier) and propagation stop (.stop modifier).',
    signatureSummary: 'v-hover="{ class: \'…\' }" | v-hover.callback="fn"',
    signatureCode: `// Toggle a CSS class on hover
v-hover="{ class: 'is-hovered' }"

// Invoke a callback with the hover state (boolean)
v-hover.callback="onHoverChange"

// Stop pointer-event propagation on hover
v-hover.stop`,
    signatureLang: 'ts',

    args: [
        {
            name: 'value',
            type: 'boolean | { class: string }',
            descriptionKey: 'directives.hover.arg_value',
            descriptionFallback: 'Pass false to disable the directive. Pass { class } to specify the CSS class added while the pointer is over the element.'
        }
    ],

    modifiers: [
        {
            name: 'callback',
            descriptionKey: 'directives.hover.modifier_callback',
            descriptionFallback: 'When present, the directive value is treated as a function (isHovered: boolean) => void instead of a class object.'
        },
        {
            name: 'stop',
            descriptionKey: 'directives.hover.modifier_stop',
            descriptionFallback: 'Calls stopPropagation() on the underlying pointer events, preventing parent hover handlers from triggering.'
        }
    ],

    examples: [
        {
            titleKey: 'directives.hover.example_class_title',
            titleFallback: 'Class toggle on hover',
            lang: 'vue',
            code: `<template>
  <div v-hover="{ class: 'card--hovered' }" class="card">
    Hover me
  </div>
</template>

<style scoped>
.card--hovered {
  box-shadow: var(--origam-shadow---md);
}
</style>`
        },
        {
            titleKey: 'directives.hover.example_callback_title',
            titleFallback: 'Callback mode',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'

const isHovered = ref(false)
const onHover = (hovered: boolean) => { isHovered.value = hovered }
</script>

<template>
  <div v-hover.callback="onHover">
    {{ isHovered ? 'Hovered!' : 'Hover me' }}
  </div>
</template>`
        }
    ],

    related: [
        {
            slug: 'card',
            name: 'Card',
            kind: 'component',
            descriptionKey: 'directives.related.card',
            descriptionFallback: 'Commonly combined with v-hover to add elevation or transform on hover.'
        }
    ]
}
