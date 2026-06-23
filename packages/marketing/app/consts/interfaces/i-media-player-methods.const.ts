import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_PLAYER_METHODS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-player-methods',
    name: 'IMediaPlayerMethods',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_media_player_methods.description',
    descriptionFallback: 'Imperative methods returned by useMediaPlayer. Media-agnostic subset — every method maps 1:1 to the standard HTMLMediaElement API. Video-specific commands (toggleFullscreen, togglePip) live in IVideoPlayerMethods.',
    definition: `export interface IMediaPlayerMethods {
    play: () => Promise<void>
    pause: () => void
    toggle: () => Promise<void>
    seek: (seconds: number) => void
    setVolume: (value: number) => void
    toggleMute: () => void
    load: () => void
    skipBackward: (seconds: number) => void
    skipForward: (seconds: number) => void
    setPlaybackRate: (rate: number) => void
    requestRemotePlayback: () => Promise<void>
    stopRemotePlayback: () => Promise<void>
}`,
    extends: [],
    props: [
        { name: 'play', type: '() => Promise<void>', optional: false, descriptionFallback: 'Resolve once el.play() has settled (or the call has been swallowed into state.error).' },
        { name: 'pause', type: '() => void', optional: false, descriptionFallback: 'Pause playback. Returns synchronously.' },
        { name: 'toggle', type: '() => Promise<void>', optional: false, descriptionFallback: 'Toggle between play and pause based on the current playing state.' },
        { name: 'seek', type: '(seconds: number) => void', optional: false, descriptionFallback: 'Seek to seconds, clamped to [0, duration].' },
        { name: 'setVolume', type: '(value: number) => void', optional: false, descriptionFallback: 'Set the volume, clamped to [0, 1]. Un-mutes when raising the volume from zero.' },
        { name: 'toggleMute', type: '() => void', optional: false, descriptionFallback: 'Flip the muted flag on the element.' },
        { name: 'load', type: '() => void', optional: false, descriptionFallback: 'Force a reload of the underlying media element.' },
        { name: 'skipBackward', type: '(seconds: number) => void', optional: false, descriptionFallback: 'Jump backward by seconds, clamped to [0, duration].' },
        { name: 'skipForward', type: '(seconds: number) => void', optional: false, descriptionFallback: 'Jump forward by seconds, clamped to [0, duration].' },
        { name: 'setPlaybackRate', type: '(rate: number) => void', optional: false, descriptionFallback: 'Set the playback rate, clamped to [0.25, 4].' },
        { name: 'requestRemotePlayback', type: '() => Promise<void>', optional: false, descriptionFallback: 'Open the native cast / AirPlay device picker. No-op when the Remote Playback API is unavailable.' },
        { name: 'stopRemotePlayback', type: '() => Promise<void>', optional: false, descriptionFallback: 'Force-disconnect any active Remote Playback session. No-op when no session is active or the API is unavailable.' },
    ],
    usedBy: [
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
        { slug: 'media-controller', name: 'MediaController', kind: 'component' },
        { slug: 'use-media-player', name: 'useMediaPlayer', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-player.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_player_methods.example',
            titleFallback: 'Calling methods from useMediaPlayer',
            code: `const { methods } = useMediaPlayer({ mediaRef })
methods.play()
methods.seek(30)
methods.setVolume(0.5)`,
            lang: 'typescript',
        },
    ],
}
