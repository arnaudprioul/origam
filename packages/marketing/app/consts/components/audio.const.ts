/**
 * /components/audio — full documentation data for OrigamAudio.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Audio/audio-player.interface.ts  (props + emits)
 *   - packages/ds/src/components/Audio/OrigamAudio.vue            (template BEM, defineExpose)
 *   - packages/ds/tokens/component/audio.json                     (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const AUDIO_DOC: IComponentDoc = {
    slug: 'audio',
    name: 'Audio',
    tag: 'origam-audio',
    icon: 'mdi-music',
    category: 'Media',
    descriptionKey: 'components.catalog.audio.description',
    descriptionFallback: 'Full-featured audio player with waveform visualisation, playlist management, transport controls and a scoped-slot API.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-audio--design',
    docUrl: 'http://localhost:4000/components/Audio/OrigamAudio',

    family: [],

    related: [
        {
            slug: 'video',
            name: 'Video',
            kind: 'component',
            descriptionFallback: 'Full-featured video player sharing the same MediaController shell.',
            descriptionKey: 'components.catalog.video.description'
        }
    ],

    props: [
        {
            name: 'src',
            type: { label: 'string | IAudioSource | Array<IAudioSource>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.audio.props.src.description',
            descriptionFallback: 'Audio source URL, a single {src,type} descriptor, or an array for codec fallback. When playlist is set, src is ignored.'
        },
        {
            name: 'variant',
            type: { label: 'TAudioVariant', slug: 'audio-variant', kind: 'type' },
            defaultValue: "'expanded'",
            descriptionKey: 'components.audio.props.variant.description',
            descriptionFallback: 'Visual layout: "expanded" shows a 96 px cover + waveform + full transport; "compact" shows a 48 px cover + inline metadata + transport only.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.audio.props.title.description',
            descriptionFallback: 'Track title displayed in the metadata strip.'
        },
        {
            name: 'artist',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.audio.props.artist.description',
            descriptionFallback: 'Artist / author name shown below the title.'
        },
        {
            name: 'album',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.audio.props.album.description',
            descriptionFallback: 'Album name displayed below the artist.'
        },
        {
            name: 'cover',
            type: { label: 'string | ISrcObject', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.audio.props.cover.description',
            descriptionFallback: 'Cover image URL shown alongside the metadata. Accepts ISrcObject for srcset / lazy-src support.'
        },
        {
            name: 'coverPosition',
            type: { label: 'TCoverPosition', slug: 'cover-position', kind: 'type' },
            defaultValue: "'left'",
            descriptionKey: 'components.audio.props.cover_position.description',
            descriptionFallback: 'Side where the album cover is painted. The controller column sits on the opposite side.'
        },
        {
            name: 'waveform',
            type: { label: "boolean | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.audio.props.waveform.description',
            descriptionFallback: 'Render a waveform above the controls. "auto" activates only when OfflineAudioContext is available.'
        },
        {
            name: 'waveformColor',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'currentColor'",
            descriptionKey: 'components.audio.props.waveform_color.description',
            descriptionFallback: 'Stroke color for the played portion of the waveform bars.'
        },
        {
            name: 'autoplay',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.audio.props.autoplay.description',
            descriptionFallback: 'Start playback as soon as loadedmetadata fires. Suppressed under prefers-reduced-motion.'
        },
        {
            name: 'muted',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.audio.props.muted.description',
            descriptionFallback: 'Start the player muted.'
        },
        {
            name: 'loop',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.audio.props.loop.description',
            descriptionFallback: 'Deprecated. Use loopMode instead. Maps to loopMode="one" at runtime.'
        },
        {
            name: 'loopMode',
            type: { label: 'TAudioLoopMode', slug: 'audio-loop-mode', kind: 'type' },
            defaultValue: "'none'",
            descriptionKey: 'components.audio.props.loop_mode.description',
            descriptionFallback: 'Tri-state loop strategy: "none" stops after last track, "all" wraps playlist, "one" loops current track.'
        },
        {
            name: 'shuffle',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.audio.props.shuffle.description',
            descriptionFallback: 'Shuffle playlist order using Fisher-Yates. Has no effect without a playlist.'
        },
        {
            name: 'playlist',
            type: { label: 'Array<IAudioTrack>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.audio.props.playlist.description',
            descriptionFallback: 'Optional list of tracks. When set, prev/next navigate the list instead of skipping 10 s.'
        },
        {
            name: 'currentTrackIndex',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.audio.props.current_track_index.description',
            descriptionFallback: 'Active track index in playlist. Supports v-model:currentTrackIndex.'
        },
        {
            name: 'preload',
            type: { label: "'none' | 'metadata' | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: "'metadata'",
            descriptionKey: 'components.audio.props.preload.description',
            descriptionFallback: 'Buffering hint: "metadata" loads duration only; "none" defers; "auto" lets the browser pre-buffer.'
        },
        {
            name: 'crossorigin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.audio.props.crossorigin.description',
            descriptionFallback: 'Mirrors the native crossorigin attribute. Required for WebAudio access to CORS-served media.'
        },
        {
            name: 'controls',
            type: { label: 'TAudioControls', slug: 'audio-controls', kind: 'type' },
            defaultValue: "'custom'",
            descriptionKey: 'components.audio.props.controls.description',
            descriptionFallback: '"custom" paints OrigamMediaController; "native" exposes the browser built-in controls attribute.'
        },
        {
            name: 'playbackRates',
            type: { label: 'ReadonlyArray<number>', slug: '', kind: 'primitive' },
            defaultValue: '[0.5, 0.75, 1, 1.25, 1.5, 2]',
            descriptionKey: 'components.audio.props.playback_rates.description',
            descriptionFallback: 'Available playback rates exposed in the config menu.'
        },
        {
            name: 'playbackRate',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.audio.props.playback_rate.description',
            descriptionFallback: 'Initial playback rate. Exposed via update:playbackRate.'
        },
        {
            name: 'allowRemotePlayback',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.audio.props.allow_remote_playback.description',
            descriptionFallback: 'Show cast/AirPlay button (Remote Playback API). Renders only when a cast-capable device is detected.'
        },
        {
            name: 'downloadable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.audio.props.downloadable.description',
            descriptionFallback: 'Adds a Download row in the cog menu letting the listener save the current audio file.'
        },
        {
            name: 'downloadFilename',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.audio.props.download_filename.description',
            descriptionFallback: 'Override the downloaded file name. Defaults to the trailing segment of the source URL.'
        },
        {
            name: 'tracks',
            type: { label: 'Array<IVideoTrack>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.audio.props.tracks.description',
            descriptionFallback: 'Optional captions/chapters tracks. Reuses the video track shape (kind/src/srclang/label/default).'
        },
        { name: 'color', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.audio.props.color.description', descriptionFallback: 'Intent or custom color applied to the player surface.' },
        { name: 'bgColor', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.audio.props.bg_color.description', descriptionFallback: 'Background color override.' },
        { name: 'rounded', type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.audio.props.rounded.description', descriptionFallback: 'Border-radius token or boolean.' },
        { name: 'elevation', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.audio.props.elevation.description', descriptionFallback: 'Box-shadow elevation token.' },
        { name: 'border', type: { label: 'boolean | string', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.audio.props.border.description', descriptionFallback: 'Applies a border to the player container.' },
        { name: 'width', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.audio.props.width.description', descriptionFallback: 'Player width override.' },
        { name: 'height', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.audio.props.height.description', descriptionFallback: 'Player height override.' }
    ],

    emits: [
        { event: 'play', payload: { label: 'void', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.play.description', descriptionFallback: 'Fired when playback starts.' },
        { event: 'pause', payload: { label: 'void', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.pause.description', descriptionFallback: 'Fired when playback is paused.' },
        { event: 'ended', payload: { label: 'void', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.ended.description', descriptionFallback: 'Fired when playback ends. Auto-advances to next track when playlist is active.' },
        { event: 'timeupdate', payload: { label: 'Event', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.timeupdate.description', descriptionFallback: 'Fired periodically as the playhead advances.' },
        { event: 'volumechange', payload: { label: 'Event', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.volumechange.description', descriptionFallback: 'Fired when volume or muted state changes.' },
        { event: 'loadedmetadata', payload: { label: 'Event', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.loadedmetadata.description', descriptionFallback: 'Fired when duration and basic metadata are available.' },
        { event: 'error', payload: { label: 'Event | MediaError | Error', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.error.description', descriptionFallback: 'Fired when the audio element encounters an error.' },
        { event: 'update:playbackRate', payload: { label: 'number', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.update_playback_rate.description', descriptionFallback: 'Two-way binding for the playback rate.' },
        { event: 'download', payload: { label: 'string', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.download.description', descriptionFallback: 'Fired when the listener clicks Download. Payload is the file URL.' },
        { event: 'waveform', payload: { label: 'Array<number>', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.waveform.description', descriptionFallback: 'Fired on waveform recomputation. Payload is downsampled peaks (0..1 amplitudes).' },
        { event: 'previous', payload: { label: 'void', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.previous.description', descriptionFallback: 'Fired when the user clicks the previous-track button.' },
        { event: 'next', payload: { label: 'void', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.next.description', descriptionFallback: 'Fired when the user clicks the next-track button.' },
        { event: 'update:currentTrackIndex', payload: { label: 'number', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.update_current_track_index.description', descriptionFallback: 'Two-way binding for the active playlist index.' },
        { event: 'update:loopMode', payload: { label: 'TAudioLoopMode', slug: 'audio-loop-mode', kind: 'type' }, descriptionKey: 'components.audio.emits.update_loop_mode.description', descriptionFallback: 'Two-way binding for the loop mode.' },
        { event: 'update:shuffle', payload: { label: 'boolean', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.update_shuffle.description', descriptionFallback: 'Two-way binding for the shuffle flag.' },
        { event: 'track-change', payload: { label: 'IAudioTrack, number', slug: '', kind: 'primitive' }, descriptionKey: 'components.audio.emits.track_change.description', descriptionFallback: 'Fires whenever the active track changes. Payload: new track descriptor + index.' }
    ],

    slots: [
        { slot: 'header', slotProps: '—', descriptionKey: 'components.audio.slots.header.description', descriptionFallback: 'Override the entire cover + metadata + header strip.' },
        { slot: 'metadata', slotProps: '—', descriptionKey: 'components.audio.slots.metadata.description', descriptionFallback: 'Override the title/artist/cover metadata block.' },
        { slot: 'cover', slotProps: '—', descriptionKey: 'components.audio.slots.cover.description', descriptionFallback: 'Override the cover image or placeholder.' },
        { slot: 'title', slotProps: '—', descriptionKey: 'components.audio.slots.title.description', descriptionFallback: 'Override the title rendering.' },
        { slot: 'waveform', slotProps: '{ peaks, currentTime, duration }', descriptionKey: 'components.audio.slots.waveform.description', descriptionFallback: 'Override the waveform canvas. Receives peaks array + playhead context for custom rendering.' },
        { slot: 'controls', slotProps: '{ playing, paused, currentTime, duration, buffered, volume, muted, playbackRate, loading, error, methods }', descriptionKey: 'components.audio.slots.controls.description', descriptionFallback: 'Override the entire transport controls replacing OrigamMediaController.' },
        { slot: 'loading', slotProps: '—', descriptionKey: 'components.audio.slots.loading.description', descriptionFallback: 'Overlay rendered while media is loading.' },
        { slot: 'error', slotProps: '{ error }', descriptionKey: 'components.audio.slots.error.description', descriptionFallback: 'Overlay rendered when an error occurred.' }
    ],

    examples: [
        {
            titleKey: 'components.audio.examples.basic.title',
            titleFallback: 'Basic player',
            lang: 'vue',
            code: `<template>
  <origam-audio
    src="/audio/podcast.mp3"
    title="Episode 42"
    artist="Origam Talks"
    cover="/covers/ep42.jpg"
  />
</template>`
        },
        {
            titleKey: 'components.audio.examples.playlist.title',
            titleFallback: 'Playlist with loop',
            lang: 'vue',
            code: `<template>
  <origam-audio
    :playlist="tracks"
    loop-mode="all"
    :shuffle="true"
    waveform
    v-model:current-track-index="activeTrack"
    @track-change="onTrackChange"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const activeTrack = ref(0)
const tracks = [
  { src: '/audio/track1.mp3', title: 'Track One', artist: 'Origam', cover: '/covers/1.jpg' },
  { src: '/audio/track2.mp3', title: 'Track Two', artist: 'Origam', cover: '/covers/2.jpg' }
]
const onTrackChange = (track, index) => console.log('Now playing', track.title)
</script>`
        },
        {
            titleKey: 'components.audio.examples.compact.title',
            titleFallback: 'Compact dock variant',
            lang: 'vue',
            code: `<template>
  <origam-audio
    src="/audio/ambient.mp3"
    variant="compact"
    title="Ambient Mix"
    artist="Studio Sessions"
    color="primary"
    :downloadable="true"
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'expanded', props: { variant: 'expanded', src: '/audio/sample.mp3', title: 'Sample Track', artist: 'Artist' } },
        { label: 'compact', props: { variant: 'compact', src: '/audio/sample.mp3', title: 'Compact Mode', artist: 'Artist' } },
        { label: 'primary', props: { variant: 'expanded', src: '/audio/sample.mp3', color: 'primary', title: 'Primary Color' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-audio',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamAudio',
        svgDesc: 'Schematic of the Audio component with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="240" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="28" y="28" width="108" height="108" rx="8" fill="var(--origam-color__surface---overlay, #f5f3ff)" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="82" y="88" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">cover</text>
  <rect x="152" y="28" width="440" height="50" rx="4" fill="var(--origam-color__surface---sunken, #f5f3ff)" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="372" y="58" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">title / artist / album metadata</text>
  <rect x="152" y="88" width="440" height="40" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="372" y="113" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">waveform scrubber</text>
  <rect x="28" y="150" width="644" height="50" rx="4" fill="var(--origam-color__surface---sunken, #f5f3ff)" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="350" y="180" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">OrigamMediaController (transport)</text>
  <rect x="28" y="215" width="644" height="30" rx="4" fill="var(--origam-color__surface---sunken, #f5f3ff)" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="235" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">playlist list (optional)</text>
  <circle cx="30" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="30" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="152" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="152" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="152" cy="88" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="152" y="92" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="30" cy="150" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="30" y="154" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="30" cy="215" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="30" y="219" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-audio&gt;</code> — 5 internal parts. The hidden <code>&lt;audio&gt;</code> element (⓪) drives state; the visual shell is a flex column: cover ①, metadata header ②, waveform ③, transport controller ④, optional playlist ⑤.',
        legend: [
            { num: 1, cls: '.origam-audio__cover', descriptionKey: 'components.audio.anatomy.cover', descriptionFallback: 'Album cover image rendered as <figure>. 96 px in expanded, 48 px in compact.' },
            { num: 2, cls: '.origam-audio__header', descriptionKey: 'components.audio.anatomy.header', descriptionFallback: 'Metadata strip: title, artist and album. Hidden when all three are absent.' },
            { num: 3, cls: '.origam-audio__waveform', descriptionKey: 'components.audio.anatomy.waveform', descriptionFallback: 'Waveform visualiser — decoded peaks painted via SVG bars. Visible only when waveform prop is truthy.' },
            { num: 4, cls: '.origam-audio__controller', descriptionKey: 'components.audio.anatomy.controller', descriptionFallback: '<OrigamMediaController> shell housing the transport row (play/pause, scrubber, volume, playback-rate menu).' },
            { num: 5, cls: '.origam-audio__playlist', descriptionKey: 'components.audio.anatomy.playlist', descriptionFallback: 'Ordered list of tracks shown below the transport when playlist prop is set.' }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        { name: '--origam-audio---background-color', defaultValue: '{color.surface.raised}', descriptionKey: 'components.audio.css_vars.background_color', descriptionFallback: 'Player surface background.' },
        { name: '--origam-audio---color', defaultValue: '{color.text.primary}', descriptionKey: 'components.audio.css_vars.color', descriptionFallback: 'Default foreground color (text and icons).' },
        { name: '--origam-audio---accent-color', defaultValue: '{color.action.primary.bg}', descriptionKey: 'components.audio.css_vars.accent_color', descriptionFallback: 'Accent color driving scrubbers, play-button surface and active-loop pill.' },
        { name: '--origam-audio---border-color', defaultValue: '{color.border.subtle}', descriptionKey: 'components.audio.css_vars.border_color', descriptionFallback: 'Player container border color.' },
        { name: '--origam-audio---border-radius', defaultValue: '{radius.lg}', descriptionKey: 'components.audio.css_vars.border_radius', descriptionFallback: 'Player container border-radius.' },
        { name: '--origam-audio---gap', defaultValue: '{space.4}', descriptionKey: 'components.audio.css_vars.gap', descriptionFallback: 'Gap between header, waveform and controller sections.' },
        { name: '--origam-audio---padding', defaultValue: '{space.4}', descriptionKey: 'components.audio.css_vars.padding', descriptionFallback: 'Padding of the player container.' },
        { name: '--origam-audio__cover---size', defaultValue: '96px', descriptionKey: 'components.audio.css_vars.cover_size', descriptionFallback: 'Cover image size in expanded variant. 48 px in compact.' },
        { name: '--origam-audio__waveform---color', defaultValue: '{color.action.primary.bg}', descriptionKey: 'components.audio.css_vars.waveform_color', descriptionFallback: 'Played waveform bar color.' }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'audioRef', type: 'Ref<HTMLAudioElement | null>', descriptionKey: 'components.audio.exposed.audio_ref', descriptionFallback: 'Reference to the underlying <audio> element.' },
        { name: 'state', type: 'IMediaPlayerState', descriptionKey: 'components.audio.exposed.state', descriptionFallback: 'Reactive playback state object: playing, paused, currentTime, duration, buffered, volume, muted, playbackRate, loading, error.' },
        { name: 'methods', type: 'IMediaPlayerMethods', descriptionKey: 'components.audio.exposed.methods', descriptionFallback: 'Imperative player methods: play(), pause(), seek(t), setVolume(v), setMuted(b), setPlaybackRate(r).' }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['article', 'application'],
        keyboard: [
            { key: 'Space', actionKey: 'components.audio.a11y.key_space', actionFallback: 'Play / Pause toggle via the transport button.' },
            { key: 'Arrow Left / Right', actionKey: 'components.audio.a11y.key_seek', actionFallback: 'Seek backward / forward on the scrubber slider.' },
            { key: 'Arrow Up / Down', actionKey: 'components.audio.a11y.key_volume', actionFallback: 'Increase / decrease volume on the volume slider.' },
            { key: 'Tab', actionKey: 'components.audio.a11y.key_tab', actionFallback: 'Navigate between transport controls.' }
        ],
        notes: [
            { noteKey: 'components.audio.a11y.reduced_motion', noteFallback: 'Autoplay is suppressed when prefers-reduced-motion: reduce is set.' },
            { noteKey: 'components.audio.a11y.waveform_label', noteFallback: 'The waveform scrubber has aria-label="Seek" pointing to the useLocale translation.' },
            { noteKey: 'components.audio.a11y.native_fallback', noteFallback: 'When controls="native", the browser\'s native audio controls are used, which include keyboard support by default.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/audio.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'audio.background-color', value: '{color.surface.raised}', type: 'color', descriptionKey: 'components.audio.tokens.background_color', descriptionFallback: 'Player background.' },
            { tokenPath: 'audio.accent-color', value: '{color.action.primary.bg}', type: 'color', descriptionKey: 'components.audio.tokens.accent_color', descriptionFallback: 'Accent color for scrubbers and the play button.' },
            { tokenPath: 'audio.cover.size', value: '96px', type: 'dimension', descriptionKey: 'components.audio.tokens.cover_size', descriptionFallback: 'Cover size in expanded variant.' },
            { tokenPath: 'audio.play-btn.size', value: '48px', type: 'dimension', descriptionKey: 'components.audio.tokens.play_btn_size', descriptionFallback: 'Play button size.' },
            { tokenPath: 'audio.waveform.height', value: '48px', type: 'dimension', descriptionKey: 'components.audio.tokens.waveform_height', descriptionFallback: 'Waveform visualiser height.' },
            { tokenPath: 'audio.border-radius', value: '{radius.lg}', type: 'dimension', descriptionKey: 'components.audio.tokens.border_radius', descriptionFallback: 'Player container border-radius.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            { prop: 'variant', kind: 'select', labelKey: 'components.audio.playground.variant', labelFallback: 'Variant', defaultValue: 'expanded', options: [{ label: 'expanded', value: 'expanded' }, { label: 'compact', value: 'compact' }] },
            { prop: 'title', kind: 'text', labelKey: 'components.audio.playground.title', labelFallback: 'Title', defaultValue: 'Podcast Episode 42' },
            { prop: 'artist', kind: 'text', labelKey: 'components.audio.playground.artist', labelFallback: 'Artist', defaultValue: 'Origam Talks' },
            { prop: 'waveform', kind: 'switch', labelKey: 'components.audio.playground.waveform', labelFallback: 'Waveform', defaultValue: false },
            { prop: 'color', kind: 'select', labelKey: 'components.audio.playground.color', labelFallback: 'Color', defaultValue: '', options: [{ label: '(none)', value: '' }, { label: 'primary', value: 'primary' }, { label: 'secondary', value: 'secondary' }] },
            { prop: 'downloadable', kind: 'switch', labelKey: 'components.audio.playground.downloadable', labelFallback: 'Downloadable', defaultValue: false }
        ]
    } satisfies IComponentPlayground
}
