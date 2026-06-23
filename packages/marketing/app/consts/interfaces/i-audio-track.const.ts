import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUDIO_TRACK_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-audio-track',
    name: 'IAudioTrack',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_audio_track.description',
    descriptionFallback: 'Descriptor for a single track in an <OrigamAudio> playlist. The src field is mandatory; title, artist, album and cover are optional metadata surfaced on the player chrome when the track becomes active.',
    definition: `export interface IAudioTrack {
    src: string | IAudioSource | Array<IAudioSource>
    title?: string
    artist?: string
    album?: string
    cover?: string
    duration?: number
    id?: string | number
}`,
    extends: [],
    props: [
        { name: 'src', type: 'string | IAudioSource | Array<IAudioSource>', optional: false, descriptionFallback: 'Absolute or root-relative audio URL, an IAudioSource object, or an array for codec fallback.' },
        { name: 'title', type: 'string', optional: true, descriptionFallback: 'Display title for this track. Falls back to the root title prop when omitted.' },
        { name: 'artist', type: 'string', optional: true, descriptionFallback: 'Display artist. Falls back to the root artist prop.' },
        { name: 'album', type: 'string', optional: true, descriptionFallback: 'Display album. Falls back to the root album prop.' },
        { name: 'cover', type: 'string', optional: true, descriptionFallback: 'Cover image URL. Falls back to the root cover prop.' },
        { name: 'duration', type: 'number', optional: true, descriptionFallback: 'Optional pre-known duration in seconds. Shown in the playlist list before the audio is loaded; overridden by runtime metadata once loaded.' },
        { name: 'id', type: 'string | number', optional: true, descriptionFallback: 'Optional stable identifier used as the list key. Defaults to the array index when omitted.' },
    ],
    usedBy: [
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_audio_track.example',
            titleFallback: 'Playlist of IAudioTrack items',
            code: `const playlist: IAudioTrack[] = [
    { src: '/music/track1.mp3', title: 'Track One', artist: 'Artist A', cover: '/covers/1.jpg' },
    { src: '/music/track2.mp3', title: 'Track Two', artist: 'Artist B', duration: 210 },
]`,
            lang: 'typescript',
        },
    ],
}
