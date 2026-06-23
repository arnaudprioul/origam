/**
 * /directives/click-outside — documentation data.
 *
 * SOURCE OF TRUTH: packages/ds/src/directives/ClickOutside/clickOutside.directive.ts
 * Cross-checked against packages/ds/src/interfaces/Commons/clickOutside.interface.ts
 */
import type { IDirectiveDoc } from '~/interfaces/directive-doc.interface'

export const CLICK_OUTSIDE_DOC: IDirectiveDoc = {
    slug: 'click-outside',
    name: 'v-click-outside',
    icon: 'mdi-cursor-pointer',
    category: 'Directive',
    descriptionKey: 'directives.click_outside.description',
    descriptionFallback: 'Calls a handler when a click lands outside the bound element. Supports Shadow DOM via handleShadow() and an optional closeConditional guard to suppress the callback.',
    signatureSummary: 'v-click-outside="handler | options"',
    signatureCode: `// Simple handler — called on every outside click
v-click-outside="onClickOutside"

// Full options object
v-click-outside="{
  handler: onClickOutside,
  closeConditional: (e) => isOpen.value,
  include: () => [extraEl]
}"`,
    signatureLang: 'ts',

    args: [
        {
            name: 'handler',
            type: '(e: MouseEvent) => void',
            descriptionKey: 'directives.click_outside.arg_handler',
            descriptionFallback: 'Function called when a click lands outside the element. Also accepts the full options object in place of a bare function.',
            required: true
        },
        {
            name: 'closeConditional',
            type: '(e: Event) => boolean',
            descriptionKey: 'directives.click_outside.arg_close_conditional',
            descriptionFallback: 'Optional guard. The handler fires only when this function returns true. Useful to suppress callbacks while a panel is already closed.'
        },
        {
            name: 'include',
            type: '() => HTMLElement[]',
            descriptionKey: 'directives.click_outside.arg_include',
            descriptionFallback: 'Returns a list of elements that should be treated as part of the component. Clicks on these elements do not trigger the handler.'
        }
    ],

    examples: [
        {
            titleKey: 'directives.click_outside.example_basic_title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(true)
const close = () => { isOpen.value = false }
</script>

<template>
  <div v-click-outside="close">
    Click outside me to close.
  </div>
</template>`
        },
        {
            titleKey: 'directives.click_outside.example_options_title',
            titleFallback: 'With options (guard + include)',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)

const onClickOutside = () => { isOpen.value = false }
</script>

<template>
  <div
    v-click-outside="{
      handler: onClickOutside,
      closeConditional: () => isOpen,
      include: () => triggerRef.value ? [triggerRef.value] : []
    }"
  >
    Panel content
  </div>
</template>`
        }
    ],

    noteKey: 'directives.click_outside.note',
    noteFallback: 'The directive attaches listeners in capture phase on the document (or the nearest Shadow Root) so it intercepts clicks before any element handler can stop propagation.',

    related: [
        {
            slug: 'menu',
            name: 'Menu',
            kind: 'component',
            descriptionKey: 'directives.related.menu',
            descriptionFallback: 'Floating menu that uses v-click-outside internally to close on outside click.'
        },
        {
            slug: 'dialog',
            name: 'Dialog',
            kind: 'component',
            descriptionKey: 'directives.related.dialog',
            descriptionFallback: 'Modal dialog that leverages v-click-outside when persistent=false.'
        }
    ]
}
