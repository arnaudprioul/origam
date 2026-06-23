import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const AUDIO_LOOP_MODE_TYPE_DOC: ITypeDoc = {
    slug: 'audio-loop-mode',
    name: 'TAudioLoopMode',
    kind: 'type',
    category: 'Media',
    descriptionKey: 'types.catalog.audio_loop_mode.description',
    descriptionFallback: 'Tri-state loop strategy for OrigamAudio when a playlist is active.',
    definition: `export type TAudioLoopMode = \`\${AUDIO_LOOP_MODE}\`

// Where AUDIO_LOOP_MODE is:
export enum AUDIO_LOOP_MODE {
    NONE = 'none',
    ALL  = 'all',
    ONE  = 'one'
}`,
    values: [
        {
            value: 'none',
            descriptionKey: 'types.detail.audio_loop_mode.none',
            descriptionFallback: 'No loop. Playback stops when the last track ends.',
        },
        {
            value: 'all',
            descriptionKey: 'types.detail.audio_loop_mode.all',
            descriptionFallback: 'Loop the whole playlist. After the last track, wrap back to the first one.',
        },
        {
            value: 'one',
            descriptionKey: 'types.detail.audio_loop_mode.one',
            descriptionFallback: 'Loop the current track. The same track restarts at 0 when it ends. Prev/next still navigate the playlist.',
        },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', propName: 'loopMode' },
        { slug: 'media-controller', name: 'MediaController', propName: 'loopMode' },
    ],
    sourceFile: 'packages/ds/src/types/Audio/audio-loop-mode.type.ts',
    examples: [
        {
            titleKey: 'types.detail.audio_loop_mode.example',
            titleFallback: 'Playlist with loop-all mode',
            code: `<origam-audio
  :playlist="tracks"
  loop-mode="all"
/>`,
            lang: 'html',
        },
    ],
}
