/**
 * /directives/ripple — documentation data.
 *
 * SOURCE OF TRUTH: packages/ds/src/directives/Ripple/ripple.directive.ts
 * Cross-checked against packages/ds/src/interfaces/Commons/ripple.interface.ts
 */
import type { IDirectiveDoc } from '~/interfaces/directive-doc.interface'

export const RIPPLE_DOC: IDirectiveDoc = {
    slug: 'ripple',
    name: 'v-ripple',
    icon: 'mdi-target',
    category: 'Directive',
    descriptionKey: 'directives.ripple.description',
    descriptionFallback: 'Applies a Material-style ripple animation emanating from the click position. Supports centered ripples, circular clipping, custom CSS classes and propagation stop.',
    signatureSummary: 'v-ripple | v-ripple="false" | v-ripple.center.circle',
    signatureCode: `// Default — ripple from pointer position
v-ripple

// Disabled
v-ripple="false"

// Custom CSS class on the ripple element
v-ripple="{ class: 'my-ripple' }"

// Always emanate from element center
v-ripple.center

// Clip to a circle
v-ripple.circle

// Stop pointer-event propagation after ripple
v-ripple.stop`,
    signatureLang: 'ts',

    args: [
        {
            name: 'value',
            type: 'boolean | { class?: string; center?: boolean; circle?: boolean }',
            descriptionKey: 'directives.ripple.arg_value',
            descriptionFallback: 'Pass false to disable. Pass an object to set a custom class on the ripple element or to override center/circle via the value (equivalent to using modifiers).'
        }
    ],

    modifiers: [
        {
            name: 'center',
            descriptionKey: 'directives.ripple.modifier_center',
            descriptionFallback: 'The ripple always starts from the geometric center of the element instead of the actual click position. Typically used for icon buttons.'
        },
        {
            name: 'circle',
            descriptionKey: 'directives.ripple.modifier_circle',
            descriptionFallback: 'Clips the ripple container to a perfect circle. Combine with .center for round icon buttons.'
        },
        {
            name: 'stop',
            descriptionKey: 'directives.ripple.modifier_stop',
            descriptionFallback: 'Calls stopPropagation() on the pointer event after spawning the ripple, preventing parent click handlers from firing.'
        }
    ],

    examples: [
        {
            titleKey: 'directives.ripple.example_basic_title',
            titleFallback: 'Basic ripple',
            lang: 'vue',
            code: `<template>
  <div v-ripple class="clickable-surface">
    Click me
  </div>
</template>

<style scoped>
.clickable-surface {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: var(--origam-radius---md);
}
</style>`
        },
        {
            titleKey: 'directives.ripple.example_icon_title',
            titleFallback: 'Centered circle ripple on an icon button',
            lang: 'vue',
            code: `<template>
  <button
    v-ripple.circle.center
    class="icon-btn"
    aria-label="Settings"
  >
    <origam-icon icon="mdi-cog" />
  </button>
</template>`
        }
    ],

    related: [
        {
            slug: 'btn',
            name: 'Btn',
            kind: 'component',
            descriptionKey: 'directives.related.btn',
            descriptionFallback: 'OrigamBtn uses v-ripple by default (ripple prop). Pass :ripple="false" to disable.'
        },
        {
            slug: 'list-item',
            name: 'ListItem',
            kind: 'component',
            descriptionKey: 'directives.related.list_item',
            descriptionFallback: 'OrigamListItem applies v-ripple on interactive list rows.'
        }
    ]
}
