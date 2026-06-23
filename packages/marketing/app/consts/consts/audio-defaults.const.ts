import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const AUDIO_DEFAULTS_CONST_DOC: IConstDoc = {
    slug: 'audio-defaults',
    name: 'AUDIO_DEFAULTS',
    category: 'Media',
    descriptionKey: 'consts.catalog.audio_defaults.description',
    descriptionFallback: 'Canonical default prop values for OrigamAudio. Exported for story-side iteration and consumer reference. Never referenced from withDefaults() itself — the Vue SFC compiler only resolves inline literals there.',
    definition: `export const AUDIO_DEFAULTS = {
    tag: 'div',
    variant: AUDIO_VARIANT.EXPANDED,
    coverPosition: COVER_POSITION.LEFT,
    position: POSITION.RELATIVE,
    autoplay: false,
    muted: false,
    loop: false,
    preload: 'metadata',
    controls: 'custom',
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2] as ReadonlyArray<number>,
    playbackRate: 1,
    allowRemotePlayback: false,
    downloadable: false,
    waveform: false,
    waveformColor: 'currentColor'
} as const`,
    values: [
        { value: "tag: 'div'", descriptionKey: 'consts.detail.audio_defaults.tag', descriptionFallback: 'Root HTML element.' },
        { value: 'variant: AUDIO_VARIANT.EXPANDED', descriptionKey: 'consts.detail.audio_defaults.variant', descriptionFallback: 'Full-width expanded layout.' },
        { value: 'coverPosition: COVER_POSITION.LEFT', descriptionKey: 'consts.detail.audio_defaults.cover_position', descriptionFallback: 'Cover art aligned left.' },
        { value: 'position: POSITION.RELATIVE', descriptionKey: 'consts.detail.audio_defaults.position', descriptionFallback: 'CSS position relative.' },
        { value: 'autoplay: false', descriptionKey: 'consts.detail.audio_defaults.autoplay', descriptionFallback: 'No autoplay by default.' },
        { value: 'muted: false', descriptionKey: 'consts.detail.audio_defaults.muted', descriptionFallback: 'Audio is not muted by default.' },
        { value: 'loop: false', descriptionKey: 'consts.detail.audio_defaults.loop', descriptionFallback: 'Playback does not loop by default.' },
        { value: "preload: 'metadata'", descriptionKey: 'consts.detail.audio_defaults.preload', descriptionFallback: 'Only metadata is preloaded.' },
        { value: "controls: 'custom'", descriptionKey: 'consts.detail.audio_defaults.controls', descriptionFallback: 'Custom DS controls, not native browser controls.' },
        { value: 'playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2]', descriptionKey: 'consts.detail.audio_defaults.playback_rates', descriptionFallback: 'Available playback speed multipliers.' },
        { value: 'playbackRate: 1', descriptionKey: 'consts.detail.audio_defaults.playback_rate', descriptionFallback: 'Default playback speed (1×).' },
        { value: 'allowRemotePlayback: false', descriptionKey: 'consts.detail.audio_defaults.allow_remote_playback', descriptionFallback: 'Remote playback (AirPlay / Cast) disabled.' },
        { value: 'downloadable: false', descriptionKey: 'consts.detail.audio_defaults.downloadable', descriptionFallback: 'Download button hidden.' },
        { value: 'waveform: false', descriptionKey: 'consts.detail.audio_defaults.waveform', descriptionFallback: 'Waveform visualisation disabled.' },
        { value: "waveformColor: 'currentColor'", descriptionKey: 'consts.detail.audio_defaults.waveform_color', descriptionFallback: 'Waveform colour inherits from parent text colour.' },
    ],
    usedBy: [
        { name: 'OrigamAudio' },
    ],
    sourceFile: 'packages/ds/src/consts/Audio/audio.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.audio_defaults.example',
            titleFallback: 'Overriding a single default',
            code: `import { AUDIO_DEFAULTS } from 'origam'

const myConfig = { ...AUDIO_DEFAULTS, autoplay: true, loop: true }`,
            lang: 'typescript',
        },
    ],
}
