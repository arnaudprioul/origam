/**
 * /components/media-controller — full documentation data for OrigamMediaController.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Media/media-controller.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/Media/OrigamMediaController.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/media-controller.json              (CSS tokens)
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

export const MEDIA_CONTROLLER_DOC: IComponentDoc = {
    slug: 'media-controller',
    name: 'MediaController',
    tag: 'origam-media-controller',
    icon: 'mdi-play-circle-outline',
    category: 'Media',
    descriptionKey: 'components.catalog.media_controller.description',
    descriptionFallback: 'Universal media controls shell shared by OrigamAudio and OrigamVideo. Purely presentational — receives state and methods from useMediaPlayer() and emits playback intents (play, pause, seek, volume, loop, shuffle, quality, download) without owning the HTMLMediaElement.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-audio--design',
    docUrl: 'http://localhost:4000/components/Media/OrigamMediaController',
    parentSlug: 'media',

    family: [],

    related: [
        {
            slug: 'media',
            name: 'Media',
            kind: 'component',
            descriptionKey: 'components.catalog.media.description',
            descriptionFallback: 'Family root entry for the media controls (controller + scrubber + volume).'
        },
        {
            slug: 'media-scrubber',
            name: 'MediaScrubber',
            kind: 'component',
            descriptionKey: 'components.catalog.media_scrubber.description',
            descriptionFallback: 'Headless scrubber widget used inside the controller for the timeline and volume slider.'
        },
        {
            slug: 'audio',
            name: 'Audio',
            kind: 'component',
            descriptionKey: 'components.catalog.audio.description',
            descriptionFallback: 'OrigamAudio embeds OrigamMediaController for its transport controls.'
        },
        {
            slug: 'video',
            name: 'Video',
            kind: 'component',
            descriptionKey: 'components.catalog.video.description',
            descriptionFallback: 'OrigamVideo embeds OrigamMediaController for its transport controls.'
        }
    ],

    props: [
        {
            name: 'state',
            type: { label: 'IMediaPlayerState', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_controller.props.state.description',
            descriptionFallback: 'Reactive media state from useMediaPlayer() (or a specialisation: useVideoPlayer, useAudioPlayer). Contains refs for playing, currentTime, duration, volume, muted, buffered, playbackRate, remoteAvailable, remoteState.'
        },
        {
            name: 'methods',
            type: { label: 'IMediaPlayerMethods', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_controller.props.methods.description',
            descriptionFallback: 'Imperative methods from useMediaPlayer(). Provides play(), pause(), seek(), setVolume(), toggleMute(), setPlaybackRate(), requestRemotePlayback().'
        },
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_controller.props.inset.description',
            descriptionFallback: 'YouTube-style overlay mode: the shell sits on top of the media surface with a dark gradient and auto-hides on visible=false. When false, renders as a regular always-on toolbar.'
        },
        {
            name: 'visible',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.media_controller.props.visible.description',
            descriptionFallback: 'Visibility flag driven by the parent autohide logic. Only meaningful when inset=true. When false, the shell is opacity: 0 and pointer-events: none.'
        },
        {
            name: 'playbackRates',
            type: { label: 'ReadonlyArray<number>', slug: '', kind: 'primitive' },
            defaultValue: '[0.5, 0.75, 1, 1.25, 1.5, 2]',
            descriptionKey: 'components.media_controller.props.playback_rates.description',
            descriptionFallback: 'Available playback rates exposed via the config cog menu. When the array has more than 1 entry, a "Playback speed" drill-down appears.'
        },
        {
            name: 'allowRemotePlayback',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_controller.props.allow_remote_playback.description',
            descriptionFallback: 'Enable the Cast / AirPlay button (Remote Playback API). The button only appears when this flag is true AND state.remoteAvailable is true at runtime.'
        },
        {
            name: 'downloadable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_controller.props.downloadable.description',
            descriptionFallback: 'Adds a "Download" row to the config cog menu when true. Requires downloadUrl to be set.'
        },
        {
            name: 'downloadUrl',
            type: { label: 'string | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.media_controller.props.download_url.description',
            descriptionFallback: 'URL surfaced to the consumer when the Download menu item is clicked. Supports same-origin, data: and blob: URLs natively; cross-origin URLs are routed through a fetch → blob pipeline.'
        },
        {
            name: 'downloadFilename',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.media_controller.props.download_filename.description',
            descriptionFallback: 'Suggested filename for the downloaded file (<a download="…"> attribute).'
        },
        {
            name: 'qualityOptions',
            type: { label: 'ReadonlyArray<TQualityOption>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.media_controller.props.quality_options.description',
            descriptionFallback: 'Optional list of quality variants. When ≥ 2 entries are present, a "Quality" drill-down appears in the config menu. Each entry is { quality: string; label: string }.'
        },
        {
            name: 'currentQuality',
            type: { label: 'string | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.media_controller.props.current_quality.description',
            descriptionFallback: 'Currently-active quality identifier displayed as the appendText in the Quality menu row.'
        },
        {
            name: 'showPrevious',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_controller.props.show_previous.description',
            descriptionFallback: 'Show the "previous track" transport button. The parent listens to the previous emit and decides the action (skip back 10s or jump to the previous playlist track).'
        },
        {
            name: 'showNext',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_controller.props.show_next.description',
            descriptionFallback: 'Show the "next track" transport button. The parent owns the action.'
        },
        {
            name: 'showLoop',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_controller.props.show_loop.description',
            descriptionFallback: 'Show the tri-state loop button (none → all → one → none). Supports v-model:loopMode.'
        },
        {
            name: 'showShuffle',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_controller.props.show_shuffle.description',
            descriptionFallback: 'Show the shuffle toggle button. Supports v-model:shuffle.'
        },
        {
            name: 'loopMode',
            type: { label: 'TAudioLoopMode', slug: '', kind: 'primitive' },
            defaultValue: "'none'",
            descriptionKey: 'components.media_controller.props.loop_mode.description',
            descriptionFallback: 'Current loop mode: "none" | "all" | "one". The Controller cycles on click and emits update:loopMode; the parent applies its playlist or <audio loop> policy.'
        },
        {
            name: 'shuffle',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_controller.props.shuffle.description',
            descriptionFallback: 'Current shuffle state. The Controller toggles on click and emits update:shuffle; the parent switches its next-track resolution.'
        }
    ],

    emits: [
        {
            event: 'quality-change',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_controller.emits.quality_change.description',
            descriptionFallback: 'Fired when the user selects a quality level from the config menu. Payload is the quality identifier string. The parent owns the <source> swap logic.'
        },
        {
            event: 'download',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_controller.emits.download.description',
            descriptionFallback: 'Fired when the Download menu item is clicked (before the anchor / fetch pipeline runs). Lets the parent observe the download intent immediately.'
        },
        {
            event: 'previous',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_controller.emits.previous.description',
            descriptionFallback: 'Fired when the previous transport button is clicked. Parent decides whether to skip back 10s or navigate to the previous playlist track.'
        },
        {
            event: 'next',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_controller.emits.next.description',
            descriptionFallback: 'Fired when the next transport button is clicked. Parent owns the navigation action.'
        },
        {
            event: 'update:loopMode',
            payload: { label: 'TAudioLoopMode', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_controller.emits.update_loop_mode.description',
            descriptionFallback: 'Emitted after each loop mode cycle. Use v-model:loopMode for two-way binding.'
        },
        {
            event: 'update:shuffle',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_controller.emits.update_shuffle.description',
            descriptionFallback: 'Emitted when the shuffle button is toggled. Use v-model:shuffle for two-way binding.'
        }
    ],

    slots: [
        {
            slot: 'header',
            slotProps: '—',
            descriptionKey: 'components.media_controller.slots.header.description',
            descriptionFallback: 'Block rendered above the scrubber row. OrigamAudio injects the cover art + metadata strip here; OrigamVideo typically leaves it empty.'
        },
        {
            slot: 'waveform',
            slotProps: '{ state: IMediaPlayerState, methods: IMediaPlayerMethods }',
            descriptionKey: 'components.media_controller.slots.waveform.description',
            descriptionFallback: 'Replaces the default OrigamMediaScrubber. Receives state and methods so a custom waveform scrubber can still route seeks through methods.seek().'
        },
        {
            slot: 'footer',
            slotProps: '—',
            descriptionKey: 'components.media_controller.slots.footer.description',
            descriptionFallback: 'Block rendered below the transport row. OrigamAudio injects the playlist list here.'
        },
        {
            slot: 'prepend-transport',
            slotProps: '—',
            descriptionKey: 'components.media_controller.slots.prepend_transport.description',
            descriptionFallback: 'Buttons rendered at the start of the transport row, before the play button.'
        },
        {
            slot: 'append-transport',
            slotProps: '—',
            descriptionKey: 'components.media_controller.slots.append_transport.description',
            descriptionFallback: 'Buttons rendered at the end of the transport row, after the config menu.'
        },
        {
            slot: 'extraControlsLeft',
            slotProps: '—',
            descriptionKey: 'components.media_controller.slots.extra_controls_left.description',
            descriptionFallback: 'Additional buttons on the left side of the toolbar, after the time display. Prefer prepend-transport for new code.'
        },
        {
            slot: 'extraControlsRight',
            slotProps: '—',
            descriptionKey: 'components.media_controller.slots.extra_controls_right.description',
            descriptionFallback: 'Additional buttons on the right side of the toolbar, before the config menu. OrigamVideo injects captions / PiP / fullscreen buttons here.'
        },
        {
            slot: 'configExtra',
            slotProps: '{ closeMenu: () => void }',
            descriptionKey: 'components.media_controller.slots.config_extra.description',
            descriptionFallback: 'Extra rows in the config cog menu. Receives a closeMenu callback. Used for audio output device selectors, subtitle track selectors, etc.'
        }
    ],

    examples: [
        {
            titleKey: 'components.media_controller.examples.basic.title',
            titleFallback: 'Basic integration with useAudioPlayer',
            lang: 'vue',
            code: `<template>
  <origam-media-controller
    :state="player.state"
    :methods="player.methods"
    :show-previous="true"
    :show-next="true"
    :show-loop="true"
    :show-shuffle="true"
    @previous="onPrevious"
    @next="onNext"
  />
</template>

<script setup>
import { useAudioPlayer } from 'origam'
const player = useAudioPlayer({ src: '/track.mp3' })
function onPrevious() { /* skip or seek back */ }
function onNext() { /* skip or seek forward */ }
</script>`
        },
        {
            titleKey: 'components.media_controller.examples.inset.title',
            titleFallback: 'Inset / overlay mode (YouTube-style)',
            lang: 'vue',
            code: `<template>
  <div style="position: relative">
    <video ref="videoEl" src="/video.mp4" />
    <origam-media-controller
      :state="player.state"
      :methods="player.methods"
      inset
      :visible="controlsVisible"
    />
  </div>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-media-controller',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamMediaController',
        svgDesc: 'Schematic of the media controller with 6 numbered parts: root, header slot, scrubber row, buttons row (left group and right group), footer slot.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="10" width="660" height="220" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="28" cy="18" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="22" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="40" y="24" width="620" height="40" rx="4" fill="var(--origam-color__surface---sunken, #f3eeff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="47" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#header slot</text>
  <circle cx="48" cy="32" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="48" y="36" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <rect x="40" y="74" width="620" height="36" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.06))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <rect x="60" y="86" width="440" height="12" rx="6" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.15))"/>
  <rect x="60" y="86" width="150" height="12" rx="6" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="48" cy="82" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="86" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <rect x="40" y="120" width="620" height="48" rx="4" fill="var(--origam-color__surface---sunken, #f9f5ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <rect x="52" y="132" width="260" height="24" rx="3" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.08))"/>
  <text x="182" y="147" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">prev | play | next | volume | time</text>
  <rect x="340" y="132" width="308" height="24" rx="3" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.08))"/>
  <text x="494" y="147" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">shuffle | loop | cast | cog</text>
  <circle cx="48" cy="128" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="132" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="332" cy="128" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="332" y="132" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <rect x="40" y="178" width="620" height="38" rx="4" fill="var(--origam-color__surface---sunken, #f3eeff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="199" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#footer slot</text>
  <circle cx="48" cy="186" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="48" y="190" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-media-controller&gt;</code> — 6 internal parts. Root flex column ①, header slot ②, scrubber row ③ (OrigamMediaScrubber), transport row with left button group ④ (prev/play/next/volume/time) and right button group ⑤ (shuffle/loop/cast/cog), footer slot ⑥.`,
        legend: [
            {
                num: 1,
                cls: '.origam-media-controller',
                descriptionKey: 'components.media_controller.anatomy.root',
                descriptionFallback: 'Root div. display: flex; flex-direction: column; gap: 0. When inset=true, applies .origam-media-controller--inset (position: absolute, dark gradient overlay, opacity: 0 by default). .origam-media-controller--visible toggles opacity: 1 and pointer-events: auto.'
            },
            {
                num: 2,
                cls: '#header slot',
                descriptionKey: 'components.media_controller.anatomy.header',
                descriptionFallback: 'Optional header region above the scrubber. OrigamAudio injects cover art + metadata strip here.'
            },
            {
                num: 3,
                cls: '.origam-media-controller__progress-row',
                descriptionKey: 'components.media_controller.anatomy.progress_row',
                descriptionFallback: 'Scrubber row — padding: 0 12px. Contains OrigamMediaScrubber by default; replaceable via the #waveform slot.'
            },
            {
                num: 4,
                cls: '.origam-media-controller__buttons-left',
                descriptionKey: 'components.media_controller.anatomy.buttons_left',
                descriptionFallback: 'Left transport group: previous, play/pause, next, volume control, time display. Flex row; gap: 2px. Buttons use variant="text" density="compact".'
            },
            {
                num: 5,
                cls: '.origam-media-controller__buttons-right',
                descriptionKey: 'components.media_controller.anatomy.buttons_right',
                descriptionFallback: 'Right transport group: shuffle, loop, cast, config cog menu. Same sizing as the left group.'
            },
            {
                num: 6,
                cls: '#footer slot',
                descriptionKey: 'components.media_controller.anatomy.footer',
                descriptionFallback: 'Optional footer region below the transport row. OrigamAudio injects the playlist here.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-media-controller origam-media-controller--visible">
  <slot name="header" />

  <div class="origam-media-controller__progress-row">
    <slot name="waveform" :state="state" :methods="methods">
      <origam-media-scrubber class="origam-media-controller__scrubber" />
    </slot>
  </div>

  <nav class="origam-media-controller__buttons-row">
    <div class="origam-media-controller__buttons-left">
      <slot name="prepend-transport" />
      <!-- prev / play-pause / next / volume / time -->
      <slot name="extraControlsLeft" />
    </div>
    <div class="origam-media-controller__buttons-right">
      <slot name="extraControlsRight" />
      <!-- shuffle / loop / cast / cog-menu -->
      <slot name="append-transport" />
    </div>
  </nav>

  <slot name="footer" />
</div>`,
        classes: [
            {
                cls: 'origam-media-controller',
                descriptionKey: 'components.media_controller.anatomy.root',
                descriptionFallback: 'Root flex column.'
            },
            {
                cls: 'origam-media-controller--inset',
                descriptionKey: 'components.media_controller.anatomy.inset',
                descriptionFallback: 'Applied when inset=true. position: absolute; bottom/left/right: 0; dark gradient; opacity: 0; pointer-events: none.'
            },
            {
                cls: 'origam-media-controller--visible',
                descriptionKey: 'components.media_controller.anatomy.visible',
                descriptionFallback: 'Combined with --inset to show the overlay: opacity: 1; pointer-events: auto.'
            },
            {
                cls: 'origam-media-controller__progress-row',
                descriptionKey: 'components.media_controller.anatomy.progress_row',
                descriptionFallback: 'Scrubber container with inline padding.'
            },
            {
                cls: 'origam-media-controller__buttons-row',
                descriptionKey: 'components.media_controller.anatomy.buttons_row',
                descriptionFallback: 'Transport row. display: flex; justify-content: space-between; min-height: 36px.'
            },
            {
                cls: 'origam-media-controller__buttons-left',
                descriptionKey: 'components.media_controller.anatomy.buttons_left',
                descriptionFallback: 'Left button group: flex row; gap: 2px.'
            },
            {
                cls: 'origam-media-controller__buttons-right',
                descriptionKey: 'components.media_controller.anatomy.buttons_right',
                descriptionFallback: 'Right button group: flex row; gap: 2px.'
            },
            {
                cls: 'origam-media-controller__scrubber',
                descriptionKey: 'components.media_controller.anatomy.scrubber',
                descriptionFallback: 'Class applied to the inner OrigamMediaScrubber. width: 100%; overrides scrubber color tokens.'
            },
            {
                cls: 'origam-media-controller__time',
                descriptionKey: 'components.media_controller.anatomy.time',
                descriptionFallback: 'Time display: currentTime / duration. Inline-flex; monospace; font-variant-numeric: tabular-nums.'
            },
            {
                cls: 'origam-media-controller__play-btn',
                descriptionKey: 'components.media_controller.anatomy.play_btn',
                descriptionFallback: 'Class applied to the play/pause OrigamBtn for targeting in consumer styles.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-media-controller---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.media_controller.css_vars.color',
            descriptionFallback: 'Text and icon color for the entire controller bar. Inherits from the parent surface by default.'
        },
        {
            name: '--origam-media-controller---accent-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.media_controller.css_vars.accent_color',
            descriptionFallback: 'Accent color applied to active transport buttons (loop-active, shuffle-active, cast-active). Background is a 14% tint of this color.'
        },
        {
            name: '--origam-media-controller__scrubber---color',
            defaultValue: 'currentColor',
            descriptionKey: 'components.media_controller.css_vars.scrubber_color',
            descriptionFallback: 'Override for the inner MediaScrubber progress/thumb color. Falls through to the scrubber default when unset.'
        },
        {
            name: '--origam-media-controller__time---color',
            defaultValue: 'inherit',
            descriptionKey: 'components.media_controller.css_vars.time_color',
            descriptionFallback: 'Color for the current time / duration display.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'configMenuOpen',
            type: 'Ref<boolean>',
            descriptionKey: 'components.media_controller.exposed.config_menu_open',
            descriptionFallback: 'Reactive flag controlling the cog config menu open/close state. Can be read or set externally to programmatically open or close the menu.'
        },
        {
            name: 'resolvedLoopMode',
            type: 'ComputedRef<TAudioLoopMode>',
            descriptionKey: 'components.media_controller.exposed.resolved_loop_mode',
            descriptionFallback: 'The currently active loop mode computed from the internal state. Reflects the prop value unless the user cycled it via the loop button.'
        },
        {
            name: 'internalShuffle',
            type: 'Ref<boolean>',
            descriptionKey: 'components.media_controller.exposed.internal_shuffle',
            descriptionFallback: 'Internal shuffle toggle state. Mirrors the shuffle prop and updates when the button is clicked.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['navigation'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.media_controller.a11y.key_tab',
                actionFallback: 'Moves focus sequentially through all transport buttons (previous, play/pause, next, mute, volume slider, shuffle, loop, cast, cog).'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.media_controller.a11y.key_activate',
                actionFallback: 'Activates the focused transport button. Native <button> behaviour via OrigamBtn.'
            },
            {
                key: 'ArrowLeft / ArrowRight',
                actionKey: 'components.media_controller.a11y.key_scrubber_h',
                actionFallback: 'When the scrubber is focused: seeks backward/forward by step (default 0.1 s or 5 % of duration).'
            },
            {
                key: 'Home / End',
                actionKey: 'components.media_controller.a11y.key_scrubber_bounds',
                actionFallback: 'When the scrubber is focused: seeks to the start or end of the media.'
            }
        ],
        notes: [
            {
                noteKey: 'components.media_controller.a11y.nav_label',
                noteFallback: 'The transport row is a <nav> element with aria-label set via the i18n key "origam.media.transport". This correctly marks the zone as a landmark region.'
            },
            {
                noteKey: 'components.media_controller.a11y.aria_pressed',
                noteFallback: 'Toggle buttons (shuffle, loop, cast) use aria-pressed reflecting their active state. Screen readers announce "pressed" or "not pressed" on focus.'
            },
            {
                noteKey: 'components.media_controller.a11y.aria_labels',
                noteFallback: 'All icon-only buttons carry an aria-label (play, pause, previous, next, mute, unmute, shuffle, loop-all/one/off, cast, stop-cast, settings). Labels are i18n-translated strings computed in the script, not hardcoded strings in the template.'
            },
            {
                noteKey: 'components.media_controller.a11y.scrubber',
                noteFallback: 'The inner OrigamMediaScrubber uses role="slider", aria-orientation="horizontal", aria-valuemin/max/now/text and aria-label. See MediaScrubber accessibility notes for the full keyboard matrix.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/media-controller.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'media-controller.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.media_controller.tokens.color',
                descriptionFallback: 'Default text/icon color for the controller bar.'
            },
            {
                tokenPath: 'media-controller.scrubber.color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.media_controller.tokens.scrubber_color',
                descriptionFallback: 'Override color for the inner MediaScrubber timeline bar.'
            }
        ]
    } satisfies IComponentTokens
}
