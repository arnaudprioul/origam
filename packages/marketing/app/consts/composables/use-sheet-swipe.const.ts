import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SHEET_SWIPE_DOC: IComposableDoc = {
    slug: 'use-sheet-swipe',
    name: 'useSheetSwipe',
    domain: 'Sheet',
    icon: 'mdi-gesture-swipe-up',
    descriptionKey: '',
    descriptionFallback: 'Encapsulates bottom-sheet swipe gesture logic using Pointer Events (covers both mouse and touch). Tracks pointerdown → pointermove → pointerup on a dedicated handle element, resolves the target snap point on release via velocity (fast flick = step one snap) or absolute distance (slow drag = nearest snap), and exposes reactive drag state for 1:1 finger tracking during the gesture.',
    signature: `function useSheetSwipe(
  options: ISheetSwipeOptions
): {
  currentSnap: Ref<TSheetSnapId>
  dragOffset: ShallowRef<number>
  isDragging: ShallowRef<boolean>
  snapTo: (id: TSheetSnapId) => void
  dismiss: () => void
  currentSnapHeight: ComputedRef<number>
}`,
    params: [
        {
            name: 'options',
            type: 'ISheetSwipeOptions',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Configuration object. Includes el (sheet root element ref), handle (drag handle element ref), snapPoints (reactive array of TSheetSnapPoint), defaultSnap (initial snap id), disabled (Ref<boolean> to suspend gesture), and persistent (Ref<boolean> to block the closed snap).',
        },
    ],
    returns: [
        {
            name: 'currentSnap',
            type: 'Ref<TSheetSnapId>',
            descriptionKey: '',
            descriptionFallback: 'The id of the currently active snap point. Writable — programmatically call snapTo() or assign directly. Kept in sync with options.defaultSnap via a watcher.',
        },
        {
            name: 'dragOffset',
            type: 'ShallowRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Live pixel offset from the baseline snap height during an active drag. Positive = sheet growing (finger moving up). Resets to 0 on pointer release. Bind to a CSS translateY to achieve 1:1 finger tracking.',
        },
        {
            name: 'isDragging',
            type: 'ShallowRef<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while a pointer is captured by the handle. Use it to suppress the sheet transition (transition: none) so the user sees immediate 1:1 tracking instead of the animated snap.',
        },
        {
            name: 'snapTo',
            type: '(id: TSheetSnapId) => void',
            descriptionKey: '',
            descriptionFallback: 'Programmatically move to a named snap point. Respects the persistent constraint (cannot snap to closed when persistent=true). Resets dragOffset to 0.',
        },
        {
            name: 'dismiss',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: 'Convenience wrapper for snapTo("closed"). Blocked when persistent=true (falls back to the lowest non-zero snap).',
        },
        {
            name: 'currentSnapHeight',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'Resolved pixel height of the current snap point. SSR-safe (returns 0 when window is absent). Used to compute the sheet height style: currentSnapHeight + dragOffset.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Basic bottom sheet with swipe gesture',
            code: `<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSheetSwipe, DEFAULT_SHEET_SNAP_POINTS } from 'origam'

const el = ref<HTMLElement>()
const handle = ref<HTMLElement>()

const { currentSnap, dragOffset, isDragging, snapTo, dismiss, currentSnapHeight } =
  useSheetSwipe({
    el,
    handle,
    snapPoints: ref(DEFAULT_SHEET_SNAP_POINTS),
    defaultSnap: ref('half'),
    persistent: ref(false),
    disabled: ref(false),
  })

const sheetStyle = computed(() => ({
  height: \`\${currentSnapHeight.value + dragOffset.value}px\`,
  transition: isDragging.value ? 'none' : 'height 0.3s ease',
}))
</script>

<template>
  <div ref="el" class="sheet" :style="sheetStyle">
    <div ref="handle" class="sheet__handle" />
    <div class="sheet__content">
      <origam-btn @click="snapTo('full')">Expand</origam-btn>
      <origam-btn @click="dismiss">Dismiss</origam-btn>
    </div>
  </div>
</template>`,
            lang: 'vue',
        },
    ],
    related: [],
    consumedInterfaces: ['ISheetSwipeOptions', 'ISheetSwipeReturn'],
    noteFallback: 'Only the handle element receives pointer events — the sheet body stays fully interactive (lists scroll, buttons click). The persistent prop prevents accidental dismissal; the gesture falls back to the next non-zero snap point instead of closing.',
}
