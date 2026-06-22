import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_PLAYER_STATE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-player-state',
    name: 'IAudioPlayerState',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_audio_player_state.description',
    descriptionFallback: 'Reactive state surface returned by useAudioPlayer (Audio namespace). Extends the media-agnostic IMediaPlayerState baseline. Future audio-specific extensions (waveform analysis, frequency bins) have a home here without breaking existing imports.',
    definition: `export interface IAudioPlayerState extends IMediaPlayerState {}`,
    extends: ['IMediaPlayerState'],
    props: [],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
        { slug: 'use-audio-player', name: 'useAudioPlayer', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_player_state.example',
            titleFallback: 'Reading reactive state from useAudioPlayer',
            code: `const { state } = useAudioPlayer({ audioRef })
console.log(state.playing, state.currentTime, state.duration)`,
            lang: 'typescript',
        },
    ],
}
