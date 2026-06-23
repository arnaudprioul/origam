import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_SCOPED_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-scoped-slot-bindings',
    name: 'IAudioScopedSlotBindings',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_audio_scoped_slot_bindings.description',
    descriptionFallback: 'Bindings handed to the #controls scoped slot of <OrigamAudio>. State is exposed as plain unwrapped values (snapshot at render time) — Vue reactive re-invokes the slot on every meaningful change.',
    definition: `export interface IAudioScopedSlotBindings {
    playing: boolean
    paused: boolean
    currentTime: number
    duration: number
    buffered: number
    volume: number
    muted: boolean
    playbackRate: number
    loading: boolean
    error: MediaError | Error | null
    methods: IAudioPlayerMethods
}`,
    extends: [],
    props: [
        { name: 'playing', type: 'boolean', optional: false, descriptionFallback: 'True while the audio is actively playing.' },
        { name: 'paused', type: 'boolean', optional: false, descriptionFallback: 'True while the audio is paused.' },
        { name: 'currentTime', type: 'number', optional: false, descriptionFallback: 'Current playhead position in seconds.' },
        { name: 'duration', type: 'number', optional: false, descriptionFallback: 'Total duration of the current track in seconds.' },
        { name: 'buffered', type: 'number', optional: false, descriptionFallback: 'Amount of audio buffered, in seconds.' },
        { name: 'volume', type: 'number', optional: false, descriptionFallback: 'Current volume level (0..1).' },
        { name: 'muted', type: 'boolean', optional: false, descriptionFallback: 'True when the audio is muted.' },
        { name: 'playbackRate', type: 'number', optional: false, descriptionFallback: 'Current playback rate (e.g. 1 = normal speed, 2 = double speed).' },
        { name: 'loading', type: 'boolean', optional: false, descriptionFallback: 'True while the audio source is loading.' },
        { name: 'error', type: 'MediaError | Error | null', optional: false, descriptionFallback: 'The current error object, or null when no error.' },
        { name: 'methods', type: 'IAudioPlayerMethods', optional: false, descriptionFallback: 'Imperative player methods (play, pause, seek, setVolume, …) from useAudioPlayer.' },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_scoped_slot_bindings.example',
            titleFallback: 'Custom controls via the #controls scoped slot',
            code: `<OrigamAudio :src="track.src">
    <template #controls="{ playing, methods, currentTime, duration }">
        <button @click="methods.toggle()">{{ playing ? 'Pause' : 'Play' }}</button>
        <span>{{ currentTime }} / {{ duration }}</span>
    </template>
</OrigamAudio>`,
            lang: 'vue',
        },
    ],
}
