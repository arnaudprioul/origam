import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_TOUCH_DOC: IComposableDoc = {
    slug: 'use-touch',
    name: 'useTouch',
    domain: 'Commons',
    icon: 'mdi-gesture-swipe',
    descriptionKey: '',
    descriptionFallback: 'Enables swipe-to-open / swipe-to-close gesture handling for drawer-like components. Listens to touchstart / touchmove / touchend on window, computes drag progress relative to a positioned edge (left, right, top, bottom), and resolves the gesture via velocity-based fling detection using useVelocity.',
    signature: `function useTouch(options: {
  isActive: Ref<boolean>
  isTemporary: Ref<boolean>
  width: Ref<number>
  touchless: Ref<boolean>
  position: Ref<'left' | 'right' | 'top' | 'bottom'>
}): {
  isDragging: ShallowRef<boolean>
  dragProgress: ShallowRef<number>
  dragStyles: ComputedRef<{ transform: string; transition: string } | undefined>
}`,
    params: [
        {
            name: 'isActive',
            type: 'Ref<boolean>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Whether the drawer is currently open. The composable writes to this ref when a fling gesture settles.',
        },
        {
            name: 'isTemporary',
            type: 'Ref<boolean>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'When true the drawer is temporary (modal overlay). The touch zone logic also activates for touches anywhere inside the element body, not only at the edge.',
        },
        {
            name: 'width',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Pixel width (or height for top/bottom positions) of the drawer. Used to compute drag progress as a fraction in [0, 1].',
        },
        {
            name: 'touchless',
            type: 'Ref<boolean>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'When true all touch handling is disabled. Lets the consumer disable swipe gestures without unmounting the composable.',
        },
        {
            name: 'position',
            type: "Ref<'left' | 'right' | 'top' | 'bottom'>",
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The edge from which the drawer slides in. Determines the touch zone, coordinate axis, and transform direction.',
        },
    ],
    returns: [
        {
            name: 'isDragging',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while a confirmed drag is in progress (threshold of 3px perpendicular movement must be exceeded before dragging starts).',
        },
        {
            name: 'dragProgress',
            type: 'ShallowRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Fraction in [0, 1] representing how open the drawer is during a drag. 0 = fully closed, 1 = fully open.',
        },
        {
            name: 'dragStyles',
            type: 'ComputedRef<{ transform: string; transition: string } | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Inline styles to apply during a drag to move the drawer with the finger. Undefined when not dragging (CSS transitions take over). Bind to the drawer root element.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Swipeable navigation drawer',
            code: `<script setup lang="ts">
import { useTouch } from 'origam'
import { ref } from 'vue'

const isActive = ref(false)
const isTemporary = ref(true)
const width = ref(256)
const touchless = ref(false)
const position = ref('left')

const { isDragging, dragProgress, dragStyles } = useTouch({
    isActive,
    isTemporary,
    width,
    touchless,
    position
})
</script>

<template>
  <nav
    :style="dragStyles"
    :class="{ 'nav--dragging': isDragging }"
    class="nav-drawer"
  >
    <slot />
  </nav>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-velocity'],
    consumedInterfaces: [],
    noteFallback: 'useTouch is used internally by OrigamNavigationDrawer. It attaches passive listeners to window for touchstart and touchend, and a non-passive listener for touchmove (to call preventDefault during confirmed drags). Disable gesture support via touchless when the content itself needs to scroll horizontally.',
}
