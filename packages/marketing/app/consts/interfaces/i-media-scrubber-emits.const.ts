import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_SCRUBBER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-scrubber-emits',
    name: 'IMediaScrubberEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_media_scrubber_emits.description',
    descriptionFallback: 'Emits for <OrigamMediaScrubber> — live value updates during drag/keyboard/click, a commit event on pointer release, drag lifecycle events, and a hover position channel.',
    definition: `export interface IMediaScrubberEmits {
    (e: 'update:modelValue', value: number): void
    (e: 'change', value: number): void
    (e: 'dragstart'): void
    (e: 'dragend'): void
    (e: 'hover', value: number | null): void
}`,
    extends: [],
    props: [
        { name: 'update:modelValue', type: '(value: number) => void', optional: false, descriptionFallback: 'Live value update — fires during drag, keyboard, and click.' },
        { name: 'change', type: '(value: number) => void', optional: false, descriptionFallback: 'Commit event — fires on pointerup / pointercancel after a drag. Use this to trigger expensive operations like seeking.' },
        { name: 'dragstart', type: '() => void', optional: false, descriptionFallback: 'Drag has started (pointerdown captured). Useful to pause auto-hide timers in the parent.' },
        { name: 'dragend', type: '() => void', optional: false, descriptionFallback: 'Drag has ended (pointerup / pointercancel). Useful to resume auto-hide timers.' },
        { name: 'hover', type: '(value: number | null) => void', optional: false, descriptionFallback: 'Hover position — fires with the hovered value on pointermove, and with null on pointerleave (cursor left the track).' },
    ],
    usedBy: [
        { slug: 'media-scrubber', name: 'MediaScrubber', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-scrubber.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_scrubber_emits.example',
            titleFallback: 'Listening to scrubber drag and hover events',
            code: `<OrigamMediaScrubber
    v-model="currentTime"
    :max="duration"
    @dragstart="pauseAutoHide"
    @dragend="resumeAutoHide"
    @change="seekTo"
    @hover="updateHoverPreview"
/>`,
            lang: 'vue',
        },
    ],
}
