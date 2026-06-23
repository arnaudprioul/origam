import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_PLAYER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-player-emits',
    name: 'IAudioPlayerEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_audio_player_emits.description',
    descriptionFallback: 'Emit signatures recommended for audio host components using useAudioPlayer. Extends the media-agnostic IMediaPlayerEmits baseline — the composable itself does not emit; this interface is for the host SFC defineEmits contract.',
    definition: `export interface IAudioPlayerEmits extends IMediaPlayerEmits {}`,
    extends: ['IMediaPlayerEmits'],
    props: [],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
        { slug: 'use-audio-player', name: 'useAudioPlayer', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_player_emits.example',
            titleFallback: 'Using IAudioPlayerEmits in a host SFC',
            code: `import type { IAudioPlayerEmits } from 'origam'

const emit = defineEmits<IAudioPlayerEmits>()`,
            lang: 'typescript',
        },
    ],
}
