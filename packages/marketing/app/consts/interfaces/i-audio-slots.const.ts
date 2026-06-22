import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-slots',
    name: 'IAudioSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_audio_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamAudio>. Provides override points for the metadata strip, cover image, title, waveform canvas, transport controls, loading overlay and error overlay.',
    definition: `export interface IAudioSlots {
    metadata?: () => any
    cover?: () => any
    title?: () => any
    waveform?: (bindings: { peaks: Array<number>; currentTime: number; duration: number }) => any
    controls?: (bindings: IAudioScopedSlotBindings) => any
    loading?: () => any
    error?: (bindings: { error: MediaError | Error }) => any
}`,
    extends: [],
    props: [
        { name: 'metadata', type: '() => any', optional: true, descriptionFallback: 'Override the entire title/artist/cover strip.' },
        { name: 'cover', type: '() => any', optional: true, descriptionFallback: 'Override the cover image or placeholder.' },
        { name: 'title', type: '() => any', optional: true, descriptionFallback: 'Override the title rendering.' },
        { name: 'waveform', type: '(bindings: { peaks: Array<number>; currentTime: number; duration: number }) => any', optional: true, descriptionFallback: 'Override the waveform canvas. Receives peaks array + playhead context for custom rendering via SVG, WebGL or canvas.' },
        { name: 'controls', type: '(bindings: IAudioScopedSlotBindings) => any', optional: true, descriptionFallback: 'Override the entire controls (replaces the default OrigamMediaController). Receives IAudioScopedSlotBindings.' },
        { name: 'loading', type: '() => any', optional: true, descriptionFallback: 'Overlay rendered while the media is loading.' },
        { name: 'error', type: '(bindings: { error: MediaError | Error }) => any', optional: true, descriptionFallback: 'Overlay rendered when an error occurred. Receives the error object.' },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_slots.example',
            titleFallback: 'Custom error overlay via the #error slot',
            code: `<OrigamAudio :src="track.src">
    <template #error="{ error }">
        <p>Playback failed: {{ error.message }}</p>
    </template>
</OrigamAudio>`,
            lang: 'vue',
        },
    ],
}
