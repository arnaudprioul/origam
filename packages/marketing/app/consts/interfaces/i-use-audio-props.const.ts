import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_AUDIO_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-audio-props',
    name: 'IUseAudioProps',
    category: 'Media',
    descriptionKey: 'interfaces.catalog.i_use_audio_props.description',
    descriptionFallback: 'Props for the low-level useAudio composable — wires a frequency analyser and a play-on-flag mechanism. Renamed from IAudioProps to avoid collision with the OrigamAudio component interface.',
    definition: `export interface IUseAudioProps {
    audio?: string
    playAudio?: boolean
}`,
    extends: [],
    props: [
        { name: 'audio', type: 'string', optional: true, descriptionFallback: 'URL or data-URI of the audio source to load into the analyser.' },
        { name: 'playAudio', type: 'boolean', optional: true, descriptionFallback: 'Reactive flag — when toggled to true the composable starts playback; false pauses it.' },
    ],
    usedBy: [
        { slug: 'use-audio', name: 'useAudio', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/audio.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_audio_props.example',
            titleFallback: 'Consuming useAudio with typed props',
            code: `import type { IUseAudioProps } from 'origam'
import { useAudio } from 'origam'

const props = defineProps<IUseAudioProps>()
const { analyserNode } = useAudio(props)`,
            lang: 'typescript',
        },
    ],
}
