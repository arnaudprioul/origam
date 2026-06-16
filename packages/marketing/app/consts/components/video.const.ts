/**
 * /components/video — full documentation data for OrigamVideo.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Video/video.interface.ts      (props, emits, slots)
 *   - packages/ds/src/components/Video/OrigamVideo.vue         (template BEM, defineExpose)
 *   - packages/ds/tokens/component/video.json                  (CSS tokens)
 *
 * NOTE: previewVariants omitted — <origam-video> requires a valid `src` media URL
 * which cannot be guaranteed in a static preview band (would 404 or error).
 * The playground is also omitted for the same reason.
 * Consumers should use the story at storyUrl for live interaction.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const VIDEO_DOC: IComponentDoc = {
    slug: 'video',
    name: 'Video',
    tag: 'origam-video',
    icon: 'mdi-video',
    category: 'Media',
    descriptionKey: 'components.catalog.video.description',
    descriptionFallback: 'Full-featured HTML5 video player with custom controls, picture-in-picture, fullscreen, captions, playback rate, cast/AirPlay and double-tap-to-skip. All browser native events are surfaced as Vue emits.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-video--design',
    docUrl: 'http://localhost:4000/components/Video/OrigamVideo',

    family: [],

    related: [
        {
            slug: 'media',
            name: 'Media',
            kind: 'component',
            descriptionKey: 'components.related.media.description',
            descriptionFallback: 'OrigamMedia is the image/iframe companion. Video shares media-player composables with it.'
        }
    ],

    props: [
        // ── Own / primary props ───────────────────────────────────
        {
            name: 'src',
            type: { label: 'string | IVideoSource[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.video.props.src.description',
            descriptionFallback: 'Media URL or an array of IVideoSource descriptors (for multi-codec fallback). The browser picks the first decodable source.'
        },
        {
            name: 'poster',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.video.props.poster.description',
            descriptionFallback: 'Image shown before playback starts. Maps to the native poster attribute (or is used as background in the #poster slot).'
        },
        {
            name: 'tracks',
            type: { label: 'IVideoTrack[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.video.props.tracks.description',
            descriptionFallback: 'Caption/subtitle/chapter tracks. Each entry maps to a <track> element with kind, src, srclang and label.'
        },
        {
            name: 'autoplay',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.video.props.autoplay.description',
            descriptionFallback: 'Starts playback after loadedmetadata. Automatically sets muted=true (browser requirement). Suppressed when prefers-reduced-motion: reduce is active.'
        },
        {
            name: 'muted',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.video.props.muted.description',
            descriptionFallback: 'Starts the player muted. Required alongside autoplay for unattended playback.'
        },
        {
            name: 'loop',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.video.props.loop.description',
            descriptionFallback: 'Restarts playback when the video ends.'
        },
        {
            name: 'controls',
            type: { label: 'TVideoControls', slug: 'video-controls', kind: 'type' },
            defaultValue: "'custom'",
            descriptionKey: 'components.video.props.controls.description',
            descriptionFallback: 'Control surface: custom (in-house toolbar), native (browser controls) or none (consumer drives via #controls slot or exposed methods).'
        },
        {
            name: 'playsInline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.video.props.plays_inline.description',
            descriptionFallback: 'Maps to the native playsinline attribute. Required on iOS to prevent the system hijacking playback.'
        },
        {
            name: 'preload',
            type: { label: "'none' | 'metadata' | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: "'metadata'",
            descriptionKey: 'components.video.props.preload.description',
            descriptionFallback: 'Buffering hint. metadata loads just enough to compute duration; auto pre-buffers aggressively.'
        },
        {
            name: 'aspectRatio',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'16/9'",
            descriptionKey: 'components.video.props.aspect_ratio.description',
            descriptionFallback: 'CSS aspect-ratio applied to the wrapper. Prevents layout shift after metadata loads. Accepts presets (16/9, 4/3, 1/1, 21/9) or any raw value.'
        },
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.video.props.inset.description',
            descriptionFallback: 'When true, the controls toolbar is overlaid on the video bottom edge and auto-hides during playback.'
        },
        {
            name: 'skipSeconds',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '30',
            descriptionKey: 'components.video.props.skip_seconds.description',
            descriptionFallback: 'Seconds skipped by the ±skip buttons and double-tap gesture. Pass 0 to hide skip buttons.'
        },
        {
            name: 'showCenterControls',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.video.props.show_center_controls.description',
            descriptionFallback: 'Shows centered ±skip and play/pause overlay on hover and while paused.'
        },
        {
            name: 'playbackRates',
            type: { label: 'ReadonlyArray<number>', slug: '', kind: 'primitive' },
            defaultValue: '[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]',
            descriptionKey: 'components.video.props.playback_rates.description',
            descriptionFallback: 'Available playback rates exposed in the settings menu.'
        },
        {
            name: 'playbackRate',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.video.props.playback_rate.description',
            descriptionFallback: 'Initial playback rate (1 = normal). Synced via update:playbackRate.'
        },
        {
            name: 'disablePictureInPicture',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.video.props.disable_picture_in_picture.description',
            descriptionFallback: 'Hides the PIP button and its keyboard shortcut.'
        },
        {
            name: 'allowRemotePlayback',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.video.props.allow_remote_playback.description',
            descriptionFallback: 'Shows the cast/AirPlay button when the browser exposes the Remote Playback API and a device is available.'
        },
        {
            name: 'doubleTapToSkip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.video.props.double_tap_to_skip.description',
            descriptionFallback: 'Double-tap left half = skip backward, right half = skip forward on touch devices.'
        },
        {
            name: 'downloadable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.video.props.downloadable.description',
            descriptionFallback: 'Adds a Download row in the settings menu. Uses a native anchor with download attribute — no XHR.'
        },
        {
            name: 'downloadFilename',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.video.props.download_filename.description',
            descriptionFallback: 'Override for the downloaded file name. Useful when the URL is opaque (e.g. signed S3 URL).'
        },
        {
            name: 'crossorigin',
            type: { label: "'anonymous' | 'use-credentials'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.video.props.crossorigin.description',
            descriptionFallback: 'CORS crossorigin attribute. Required when the media is from a different origin and canvas/WebAudio access is needed.'
        },
        // ── IDimensionProps ────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.video.props.height.description',
            descriptionFallback: 'Overrides the wrapper height (normally driven by aspect-ratio).'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.video.props.width.description',
            descriptionFallback: 'Overrides the wrapper width. Default is 100%.'
        },
        // ── IRoundedProps ──────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.video.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the video wrapper.'
        },
        // ── IElevationProps ────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.video.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation applied to the video wrapper.'
        }
    ],

    emits: [
        {
            event: 'play',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.play.description',
            descriptionFallback: 'Fired when playback starts or resumes.'
        },
        {
            event: 'pause',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.pause.description',
            descriptionFallback: 'Fired when playback is paused.'
        },
        {
            event: 'ended',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.ended.description',
            descriptionFallback: 'Fired when the video reaches the end.'
        },
        {
            event: 'timeupdate',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.timeupdate.description',
            descriptionFallback: 'Fired periodically with the current playhead position in seconds.'
        },
        {
            event: 'volumechange',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.volumechange.description',
            descriptionFallback: 'Fired when volume or muted state changes. Payload is the new volume (0–1).'
        },
        {
            event: 'enterfullscreen',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.enterfullscreen.description',
            descriptionFallback: 'Fired when the player enters fullscreen.'
        },
        {
            event: 'exitfullscreen',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.exitfullscreen.description',
            descriptionFallback: 'Fired when the player exits fullscreen.'
        },
        {
            event: 'enterpip',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.enterpip.description',
            descriptionFallback: 'Fired when picture-in-picture mode is entered.'
        },
        {
            event: 'exitpip',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.exitpip.description',
            descriptionFallback: 'Fired when picture-in-picture mode is exited.'
        },
        {
            event: 'skip',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.skip.description',
            descriptionFallback: 'Fired by skip buttons and double-tap gesture. Positive = forward, negative = backward (in seconds).'
        },
        {
            event: 'quality-change',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.quality_change.description',
            descriptionFallback: 'Fired when the viewer picks a different quality from the settings menu.'
        },
        {
            event: 'download',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.video.emits.download.description',
            descriptionFallback: 'Fired when the Download row is clicked. Payload is the file URL.'
        }
    ],

    slots: [
        {
            slot: 'controls',
            slotProps: '{ playing, paused, currentTime, duration, buffered, volume, muted, fullscreen, pip, loading, error, playbackRate, remoteAvailable, remoteState, methods }',
            descriptionKey: 'components.video.slots.controls.description',
            descriptionFallback: 'Full toolbar replacement. Receives the complete IVideoScopedSlotBindings state + imperative methods. The built-in toolbar uses the same surface.'
        },
        {
            slot: 'poster',
            slotProps: '—',
            descriptionKey: 'components.video.slots.poster.description',
            descriptionFallback: 'Overlay rendered before playback starts (currentTime===0 && paused). When absent, the poster prop is used as a background-image on the video element.'
        },
        {
            slot: 'loading',
            slotProps: '—',
            descriptionKey: 'components.video.slots.loading.description',
            descriptionFallback: 'Custom overlay rendered while the media is buffering.'
        },
        {
            slot: 'error',
            slotProps: '{ error: MediaError | Error }',
            descriptionKey: 'components.video.slots.error.description',
            descriptionFallback: 'Custom overlay rendered when a media error occurred. Receives the error object.'
        }
    ],

    examples: [
        {
            titleKey: 'components.video.examples.basic.title',
            titleFallback: 'Basic player',
            lang: 'vue',
            code: `<template>
  <origam-video
    src="https://www.w3schools.com/html/mov_bbb.mp4"
    poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
    :skip-seconds="10"
    rounded="md"
  />
</template>`
        },
        {
            titleKey: 'components.video.examples.autoplay.title',
            titleFallback: 'Autoplay muted loop',
            lang: 'vue',
            code: `<template>
  <origam-video
    src="https://www.w3schools.com/html/mov_bbb.mp4"
    autoplay
    muted
    loop
    controls="none"
    aspect-ratio="21/9"
  />
</template>`
        },
        {
            titleKey: 'components.video.examples.custom_controls.title',
            titleFallback: 'Custom controls slot',
            lang: 'vue',
            code: `<template>
  <origam-video src="https://www.w3schools.com/html/mov_bbb.mp4">
    <template #controls="{ playing, methods }">
      <div style="padding: 0.5rem; display: flex; gap: 0.5rem;">
        <origam-btn
          :icon="playing ? 'mdi-pause' : 'mdi-play'"
          @click="playing ? methods.pause() : methods.play()"
          aria-label="Play / pause"
        />
      </div>
    </template>
  </origam-video>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-video',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamVideo',
        svgDesc: 'Schematic of the Video player with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="200" rx="8" fill="#0a0a0a" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1.5"/>
  <rect x="20" y="180" width="660" height="40" rx="0" fill="rgba(10,10,10,0.85)" rx="0"/>
  <rect x="20" y="218" width="660" height="2" rx="0" fill="rgba(255,255,255,0.08)"/>
  <rect x="280" y="70" width="140" height="80" rx="50" fill="rgba(255,255,255,0.08)"/>
  <text x="350" y="116" font-size="28" fill="rgba(255,255,255,0.9)" text-anchor="middle">▶</text>
  <rect x="30" y="184" width="260" height="28" rx="2" fill="rgba(255,255,255,0.05)"/>
  <text x="140" y="202" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle" font-family="'JetBrains Mono',monospace">scrubber + time</text>
  <rect x="580" y="184" width="90" height="28" rx="2" fill="rgba(255,255,255,0.05)"/>
  <text x="625" y="202" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle" font-family="'JetBrains Mono',monospace">vol · pip · fs</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="350" cy="78" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="82" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="28" cy="188" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="28" y="192" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="140" cy="188" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="140" y="192" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="625" cy="188" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="625" y="192" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-video&gt;</code> — 5 internal parts. The wrapper ① positions the native <code>&lt;video&gt;</code> with its poster overlay ②; the controls bar ③ overlays the bottom edge and contains the scrubber ④ and action buttons ⑤.`,
        legend: [
            {
                num: 1,
                cls: '.origam-video',
                descriptionKey: 'components.video.anatomy.root',
                descriptionFallback: 'Root wrapper. position: relative, aspect-ratio enforced, border-radius from rounded prop.'
            },
            {
                num: 2,
                cls: '.origam-video__poster',
                descriptionKey: 'components.video.anatomy.poster',
                descriptionFallback: 'Poster overlay rendered before playback starts. Hides on play. The #poster slot replaces it.'
            },
            {
                num: 3,
                cls: '.origam-video__controls',
                descriptionKey: 'components.video.anatomy.controls',
                descriptionFallback: 'Control bar. Overlaid (inset=true, default) or always-visible (inset=false). The #controls slot replaces the entire bar.'
            },
            {
                num: 4,
                cls: '.origam-video__scrubber',
                descriptionKey: 'components.video.anatomy.scrubber',
                descriptionFallback: 'Timeline scrubber — range input styled with CSS. Shows buffered region and playhead position.'
            },
            {
                num: 5,
                cls: '.origam-video__actions',
                descriptionKey: 'components.video.anatomy.actions',
                descriptionFallback: 'Trailing action buttons: volume, PIP, fullscreen, captions, cast, settings.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-video">
  <!-- native video element -->
  <video ref="videoRef" … />

  <!-- poster overlay (before playback) -->
  <slot name="poster">
    <div class="origam-video__poster" … />
  </slot>

  <!-- buffering overlay -->
  <slot name="loading">
    <div class="origam-video__loading" … />
  </slot>

  <!-- error overlay -->
  <slot name="error" v-bind="{ error }">
    <div class="origam-video__error" … />
  </slot>

  <!-- controls toolbar -->
  <slot name="controls" v-bind="scopedBindings">
    <div class="origam-video__controls">
      <!-- scrubber, time, volume, pip, fullscreen … -->
    </div>
  </slot>
</div>`,
        classes: [
            { cls: 'origam-video', descriptionKey: 'components.video.anatomy.root', descriptionFallback: 'Root wrapper.' },
            { cls: 'origam-video__poster', descriptionKey: 'components.video.anatomy.poster', descriptionFallback: 'Pre-playback poster.' },
            { cls: 'origam-video__loading', descriptionKey: 'components.video.anatomy.loading', descriptionFallback: 'Buffering overlay.' },
            { cls: 'origam-video__error', descriptionKey: 'components.video.anatomy.error_cls', descriptionFallback: 'Error overlay.' },
            { cls: 'origam-video__controls', descriptionKey: 'components.video.anatomy.controls', descriptionFallback: 'Controls bar.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-video---background-color',
            defaultValue: '{color.black}',
            descriptionKey: 'components.video.css_vars.background_color',
            descriptionFallback: 'Video wrapper background (black by default for letterboxing).'
        },
        {
            name: '--origam-video---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.video.css_vars.border_radius',
            descriptionFallback: 'Corner radius of the video wrapper.'
        },
        {
            name: '--origam-video---controls-background-color',
            defaultValue: '{color.neutral.950}',
            descriptionKey: 'components.video.css_vars.controls_background_color',
            descriptionFallback: 'Controls bar background (very dark for legibility on any content).'
        },
        {
            name: '--origam-video---btn-size',
            defaultValue: '{space.8}',
            descriptionKey: 'components.video.css_vars.btn_size',
            descriptionFallback: 'Size of control buttons in the toolbar.'
        },
        {
            name: '--origam-video---scrubber-color',
            defaultValue: '{color.primary.500}',
            descriptionKey: 'components.video.css_vars.scrubber_color',
            descriptionFallback: 'Accent color of the playhead/thumb on the scrubber.'
        },
        {
            name: '--origam-video---time-font-size',
            defaultValue: '{font.size.xs}',
            descriptionKey: 'components.video.css_vars.time_font_size',
            descriptionFallback: 'Font size for the current-time / duration display.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'videoRef',
            type: 'Ref<HTMLVideoElement | null>',
            descriptionKey: 'components.video.exposed.video_ref',
            descriptionFallback: 'Direct reference to the underlying HTMLVideoElement. Use for advanced integrations (WebGL, WebAudio, canvas).'
        },
        {
            name: 'state',
            type: 'IVideoPlayerState',
            descriptionKey: 'components.video.exposed.state',
            descriptionFallback: 'Reactive state object: playing, paused, currentTime, duration, buffered, volume, muted, fullscreen, pip, loading, error, playbackRate.'
        },
        {
            name: 'methods',
            type: 'IVideoPlayerMethods',
            descriptionKey: 'components.video.exposed.methods',
            descriptionFallback: 'Imperative methods: play, pause, togglePlay, seek, setVolume, toggleMute, enterFullscreen, exitFullscreen, toggleFullscreen, requestPip, exitPip, togglePip.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['region'],
        keyboard: [
            {
                key: 'Space / K',
                actionKey: 'components.video.a11y.key_play_pause',
                actionFallback: 'Toggle play/pause (when focus is on the player or controls).'
            },
            {
                key: 'ArrowRight / ArrowLeft',
                actionKey: 'components.video.a11y.key_seek',
                actionFallback: 'Seek forward/backward by 5 seconds.'
            },
            {
                key: 'ArrowUp / ArrowDown',
                actionKey: 'components.video.a11y.key_volume',
                actionFallback: 'Increase/decrease volume by 10%.'
            },
            {
                key: 'M',
                actionKey: 'components.video.a11y.key_mute',
                actionFallback: 'Toggle mute.'
            },
            {
                key: 'F',
                actionKey: 'components.video.a11y.key_fullscreen',
                actionFallback: 'Toggle fullscreen.'
            }
        ],
        notes: [
            {
                noteKey: 'components.video.a11y.captions',
                noteFallback: 'Subtitles/captions are provided via the tracks prop using WebVTT format. The captions button in the toolbar toggles the active track.'
            },
            {
                noteKey: 'components.video.a11y.autoplay',
                noteFallback: 'Autoplay is suppressed when prefers-reduced-motion: reduce is active, respecting the user preference.'
            },
            {
                noteKey: 'components.video.a11y.aria',
                noteFallback: 'The controls bar uses aria-label for icon-only buttons (play, mute, fullscreen). The scrubber is a range input with aria-label, aria-valuemin, aria-valuemax and aria-valuenow.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/video.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'video.background-color',
                value: '{color.black}',
                type: 'color',
                descriptionKey: 'components.video.tokens.background_color',
                descriptionFallback: 'Wrapper background.'
            },
            {
                tokenPath: 'video.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.video.tokens.border_radius',
                descriptionFallback: 'Corner radius.'
            },
            {
                tokenPath: 'video.controls.background-color',
                value: '{color.neutral.950}',
                type: 'color',
                descriptionKey: 'components.video.tokens.controls_background_color',
                descriptionFallback: 'Controls bar background.'
            },
            {
                tokenPath: 'video.scrubber.color',
                value: '{color.primary.500}',
                type: 'color',
                descriptionKey: 'components.video.tokens.scrubber_color',
                descriptionFallback: 'Scrubber accent color.'
            },
            {
                tokenPath: 'video.poster-btn.size',
                value: '{space.16}',
                type: 'dimension',
                descriptionKey: 'components.video.tokens.poster_btn_size',
                descriptionFallback: 'Size of the centered play button on the poster overlay.'
            }
        ]
    } satisfies IComponentTokens
}
