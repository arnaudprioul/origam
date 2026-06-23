import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_PLAYER_METHODS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-player-methods',
    name: 'IAudioPlayerMethods',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_audio_player_methods.description',
    descriptionFallback: 'Imperative methods returned by useAudioPlayer (Audio namespace). Extends the media-agnostic IMediaPlayerMethods baseline. Kept as a distinct symbol so audio-specific commands can be added without churn on consumer types.',
    definition: `export interface IAudioPlayerMethods extends IMediaPlayerMethods {}`,
    extends: ['IMediaPlayerMethods'],
    props: [],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
        { slug: 'use-audio-player', name: 'useAudioPlayer', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_player_methods.example',
            titleFallback: 'Calling methods from useAudioPlayer',
            code: `const { methods } = useAudioPlayer({ audioRef })
methods.play()
methods.seek(30)`,
            lang: 'typescript',
        },
    ],
}
