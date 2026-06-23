/**
 * /directives/touch — documentation data.
 *
 * SOURCE OF TRUTH: packages/ds/src/directives/Touch/touch.directive.ts
 * Cross-checked against packages/ds/src/interfaces/Commons/touch.interface.ts
 */
import type { IDirectiveDoc } from '~/interfaces/directive-doc.interface'

export const TOUCH_DOC: IDirectiveDoc = {
    slug: 'touch',
    name: 'v-touch',
    icon: 'mdi-gesture-tap',
    category: 'Directive',
    descriptionKey: 'directives.touch.description',
    descriptionFallback: 'Attaches touch event listeners (touchstart, touchend, touchmove) and recognises swipe gestures (left, right, up, down). All handlers are optional; only attach what you need.',
    signatureSummary: 'v-touch="{ left, right, up, down, start, end, move }"',
    signatureCode: `v-touch="{
  start?:  (e) => void,   // touchstart
  end?:    (e) => void,   // touchend
  move?:   (e) => void,   // touchmove
  left?:   (e) => void,   // swipe left
  right?:  (e) => void,   // swipe right
  up?:     (e) => void,   // swipe up
  down?:   (e) => void,   // swipe down
  parent?: boolean,       // attach listeners to parentElement
  options?: AddEventListenerOptions
}"`,
    signatureLang: 'ts',

    args: [
        {
            name: 'start / end / move',
            type: '(e: { originalEvent: TouchEvent } & ITouchData) => void',
            descriptionKey: 'directives.touch.arg_lifecycle',
            descriptionFallback: 'Raw touch lifecycle handlers. The event is augmented with ITouchData (coordinates, delta, velocity, direction).'
        },
        {
            name: 'left / right / up / down',
            type: '(e: ITouchData) => void',
            descriptionKey: 'directives.touch.arg_swipe',
            descriptionFallback: 'Swipe direction handlers. Fired when the touchend velocity and displacement exceed the detection threshold.'
        },
        {
            name: 'parent',
            type: 'boolean',
            descriptionKey: 'directives.touch.arg_parent',
            descriptionFallback: 'When true, listeners are attached to the parentElement instead of the element itself. Useful for scrollable containers where the element may be smaller than the gesture area.'
        },
        {
            name: 'options',
            type: 'AddEventListenerOptions',
            descriptionKey: 'directives.touch.arg_options',
            descriptionFallback: 'Options forwarded to addEventListener (e.g. { passive: true } to improve scroll performance).'
        }
    ],

    examples: [
        {
            titleKey: 'directives.touch.example_swipe_title',
            titleFallback: 'Swipe left / right',
            lang: 'vue',
            code: `<script setup lang="ts">
const onSwipeLeft  = () => console.log('swiped left')
const onSwipeRight = () => console.log('swiped right')
</script>

<template>
  <div
    v-touch="{
      left:  onSwipeLeft,
      right: onSwipeRight
    }"
  >
    Swipe me horizontally
  </div>
</template>`
        },
        {
            titleKey: 'directives.touch.example_lifecycle_title',
            titleFallback: 'Raw touch lifecycle',
            lang: 'vue',
            code: `<script setup lang="ts">
import type { ITouchData } from 'origam'

const onStart = (e: ITouchData) => console.log('start', e)
const onEnd   = (e: ITouchData) => console.log('end',   e)
</script>

<template>
  <div
    v-touch="{
      start: onStart,
      end:   onEnd,
      options: { passive: true }
    }"
  >
    Touch me
  </div>
</template>`
        }
    ],

    noteKey: 'directives.touch.note',
    noteFallback: 'The swipe threshold (minimum displacement and velocity) is not currently configurable per-instance. Adjust at the DS level if needed.',

    related: [
        {
            slug: 'carousel',
            name: 'Carousel',
            kind: 'component',
            descriptionKey: 'directives.related.carousel',
            descriptionFallback: 'OrigamCarousel uses v-touch to handle swipe navigation between slides.'
        }
    ]
}
