import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_ORIGAM_AUDIO_PLAYER_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-origam-audio-player-options',
    name: 'IUseOrigamAudioPlayerOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_origam_audio_player_options.description',
    descriptionFallback: 'Options accepted by the Audio-namespace useAudioPlayer composable. Named distinctly from the legacy IUseAudioPlayerOptions in the Sound namespace so both can coexist in the public barrel.',
    definition: `export interface IUseOrigamAudioPlayerOptions {
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    preload?: 'none' | 'metadata' | 'auto'
    audioRef?: Ref<HTMLAudioElement | null>
}`,
    extends: [],
    props: [
        { name: 'autoplay', type: 'boolean', optional: true, descriptionFallback: 'Suppress autoplay when the user has requested reduced motion.' },
        { name: 'muted', type: 'boolean', optional: true, descriptionFallback: 'Initial muted state.' },
        { name: 'loop', type: 'boolean', optional: true, descriptionFallback: 'Loop on ended.' },
        { name: 'preload', type: "'none' | 'metadata' | 'auto'", optional: true, descriptionFallback: 'Buffering hint.' },
        { name: 'audioRef', type: 'Ref<HTMLAudioElement | null>', optional: true, descriptionFallback: 'Resolves to the HTMLAudioElement to drive. When omitted, the composable creates an empty ref and expects the consumer to bind it on a <audio ref> themselves.' },
    ],
    usedBy: [
        { slug: 'use-audio-player', name: 'useAudioPlayer', kind: 'composable' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_origam_audio_player_options.example',
            titleFallback: 'Wiring useAudioPlayer to an <audio> element',
            code: `const audioRef = ref<HTMLAudioElement | null>(null)
const { state, methods } = useAudioPlayer({
    audioRef,
    autoplay: false,
    muted: false,
    preload: 'metadata',
})`,
            lang: 'typescript',
        },
    ],
}
