import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const AUDIO_LOOP_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'audio-loop-mode',
    name: 'AUDIO_LOOP_MODE',
    category: 'Audio',
    descriptionKey: 'enums.catalog.audio_loop_mode.description',
    descriptionFallback: 'TypeScript enum for the loop strategy of OrigamAudio when a playlist is active (none, all, one).',
    definition: `export enum AUDIO_LOOP_MODE {
    NONE = 'none',
    ALL  = 'all',
    ONE  = 'one',
}`,
    values: [
        { value: 'AUDIO_LOOP_MODE.NONE', descriptionKey: 'enums.detail.audio_loop_mode.none', descriptionFallback: 'No loop — playback stops when the last track ends.' },
        { value: 'AUDIO_LOOP_MODE.ALL', descriptionKey: 'enums.detail.audio_loop_mode.all', descriptionFallback: 'Loop the whole playlist — wraps back to the first track after the last.' },
        { value: 'AUDIO_LOOP_MODE.ONE', descriptionKey: 'enums.detail.audio_loop_mode.one', descriptionFallback: 'Loop the current track — restarts the same track at 0 when it ends.' },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', propName: 'loopMode' },
    ],
    sourceFile: 'packages/ds/src/enums/Audio/audio-loop-mode.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.audio_loop_mode.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { AUDIO_LOOP_MODE } from 'origam'

const loop: AUDIO_LOOP_MODE = AUDIO_LOOP_MODE.ALL`,
            lang: 'typescript',
        },
    ],
}
