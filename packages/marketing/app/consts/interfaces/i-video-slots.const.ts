import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIDEO_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-video-slots',
    name: 'IVideoSlots',
    category: 'Component Slots',
    descriptionKey: 'interfaces.catalog.i_video_slots.description',
    descriptionFallback: 'Slot signatures for OrigamVideo. Four slots let consumers replace the entire controls toolbar, the poster overlay, the loading overlay, and the error overlay.',
    definition: `export interface IVideoSlots {
    controls?: (bindings: IVideoScopedSlotBindings) => any
    poster?: () => any
    loading?: () => any
    error?: (bindings: { error: MediaError | Error }) => any
}`,
    extends: [],
    props: [
        { name: 'controls', type: '(bindings: IVideoScopedSlotBindings) => any', optional: true, descriptionFallback: 'Full toolbar replacement. Receives the runtime state + the imperative methods.' },
        { name: 'poster', type: '() => any', optional: true, descriptionFallback: 'Overlay rendered while playback has not yet started. When omitted, the component paints the poster image via the native attribute.' },
        { name: 'loading', type: '() => any', optional: true, descriptionFallback: 'Overlay rendered while the media is loading.' },
        { name: 'error', type: '(bindings: { error: MediaError | Error }) => any', optional: true, descriptionFallback: 'Overlay rendered when an error occurred.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Video/video.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_video_slots.example',
            titleFallback: 'Custom error overlay using the #error slot',
            code: `<OrigamVideo src="/video.mp4">
    <template #error="{ error }">
        <div class="my-error">
            Could not load video: {{ error.message }}
        </div>
    </template>
</OrigamVideo>`,
            lang: 'html',
        },
    ],
}
