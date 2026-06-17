import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_DRAG_RESIZER_DOC: IComposableDoc = {
    slug: 'use-drag-resizer',
    name: 'useDragResizer',
    domain: 'Commons',
    icon: 'mdi-resize',
    descriptionKey: '',
    descriptionFallback: 'Attaches mouse and touch drag listeners to a DOM element so the user can resize a panel or split view. Clamps the resulting value between min and max, supports both horizontal (X) and vertical (Y) axes, and cleans up all event listeners on unmount.',
    signature: `function useDragResizer(
  el: HTMLElement | undefined,
  value: Ref<number>,
  min: number,
  max: number,
  axis: TAxis
): void`,
    params: [
        {
            name: 'el',
            type: 'HTMLElement | undefined',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The handle element that should receive the mousedown/touchstart listeners. Pass undefined to skip registration (e.g. when the element is not yet mounted).',
        },
        {
            name: 'value',
            type: 'Ref<number>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive number representing the current size of the resizable panel. Updated in real-time while dragging.',
        },
        {
            name: 'min',
            type: 'number',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Minimum allowed value in pixels. The drag is clamped so value never goes below this.',
        },
        {
            name: 'max',
            type: 'number',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Maximum allowed value in pixels. The drag is clamped so value never exceeds this.',
        },
        {
            name: 'axis',
            type: 'TAxis',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Drag axis. Use AXIS.X for horizontal resizing (e.g. left/right panels) and AXIS.Y for vertical resizing (e.g. top/bottom splits).',
        },
    ],
    returns: [],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Horizontal panel resizer',
            code: `<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useDragResizer } from 'origam'
import { AXIS } from 'origam/enums'

const panelWidth = ref(300)
const handle = useTemplateRef<HTMLElement>('handle')

useDragResizer(handle.value, panelWidth, 150, 600, AXIS.X)
</script>

<template>
  <div class="layout" :style="{ gridTemplateColumns: panelWidth + 'px 1fr' }">
    <aside>Sidebar</aside>
    <div ref="handle" class="resizer" />
    <main>Content</main>
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-event-listener'],
    consumedInterfaces: [],
    noteFallback: 'useDragResizer registers useEventListener internally and calls onUnmounted to clean up all window listeners. Pass the handle element after mount (e.g. inside onMounted) to guarantee the ref is resolved.',
}
