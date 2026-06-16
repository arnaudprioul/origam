/**
 * /components/media — full documentation data for OrigamMediaController family.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Media/media-controller.interface.ts  (props)
 *   - packages/ds/src/interfaces/Media/media-scrubber.interface.ts    (props)
 *   - packages/ds/src/interfaces/Media/media-volume-control.interface.ts (props)
 *   - packages/ds/src/components/Media/OrigamMediaController.vue      (template BEM)
 *   - packages/ds/src/components/Media/OrigamMediaScrubber.vue        (template BEM)
 *   - packages/ds/src/components/Media/OrigamMediaVolumeControl.vue   (template BEM)
 *
 * NOTE: The Media package exposes no top-level player component —
 * OrigamMediaController / OrigamMediaScrubber / OrigamMediaVolumeControl are
 * sub-components consumed by OrigamAudio and OrigamVideo. This entry documents
 * the full family.
 *
 * previewVariants: empty — these components require a live HTMLMediaElement
 * state object; they cannot be statically previewed.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const MEDIA_DOC: IComponentDoc = {
    slug: 'media',
    name: 'Media',
    tag: 'origam-media-controller',
    icon: 'mdi-play-circle-outline',
    category: 'Media',
    descriptionKey: 'components.catalog.media.description',
    descriptionFallback: 'Universal media controls shell (controller, scrubber, volume) consumed by OrigamAudio and OrigamVideo. Headless and media-agnostic — drives any HTMLMediaElement via state + methods refs from useMediaPlayer().',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-audio--design',
    docUrl: 'http://localhost:4000/components/Media/OrigamMediaController',

    family: [
        {
            slug: 'media-scrubber',
            name: 'MediaScrubber',
            descriptionKey: 'components.catalog.media_scrubber.description',
            descriptionFallback: 'Headless track + thumb widget for timeline and volume scrubbing. Emits update:modelValue, change, dragstart, dragend, hover.'
        },
        {
            slug: 'media-volume-control',
            name: 'MediaVolumeControl',
            descriptionKey: 'components.catalog.media_volume_control.description',
            descriptionFallback: 'Mute/unmute button + vertical volume scrubber tooltip. Emits update:muted and update:volume.'
        }
    ],

    related: [
        {
            slug: 'audio',
            name: 'Audio',
            kind: 'component',
            descriptionKey: 'components.catalog.audio.description',
            descriptionFallback: 'Full audio player built on top of MediaController.'
        }
    ],

    props: [
        // ── IMediaControllerProps ─────────────────────────────────────────
        {
            name: 'state',
            type: { label: 'IMediaPlayerState', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media.props.state.description',
            descriptionFallback: 'Reactive media state from useMediaPlayer() (or a specialisation). Required.'
        },
        {
            name: 'methods',
            type: { label: 'IMediaPlayerMethods', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media.props.methods.description',
            descriptionFallback: 'Imperative methods from useMediaPlayer(). Required.'
        },
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media.props.inset.description',
            descriptionFallback: 'Overlay mode: the shell sits on top of the media surface with a dark gradient and auto-hides. When false, renders as an always-on toolbar.'
        },
        {
            name: 'visible',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.media.props.visible.description',
            descriptionFallback: 'Visibility flag driven by the parent\'s autohide logic.'
        },
        {
            name: 'playbackRates',
            type: { label: 'ReadonlyArray<number>', slug: '', kind: 'primitive' },
            defaultValue: '[0.5, 0.75, 1, 1.25, 1.5, 2]',
            descriptionKey: 'components.media.props.playback_rates.description',
            descriptionFallback: 'Available playback rates exposed via the config menu.'
        },
        {
            name: 'allowRemotePlayback',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media.props.allow_remote_playback.description',
            descriptionFallback: 'Enables the cast / AirPlay button (Remote Playback API).'
        },
        {
            name: 'downloadable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media.props.downloadable.description',
            descriptionFallback: 'Adds a "Download" row to the config menu.'
        },
        {
            name: 'downloadUrl',
            type: { label: 'string | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.media.props.download_url.description',
            descriptionFallback: 'URL surfaced to the consumer when "Download" is clicked.'
        },
        {
            name: 'downloadFilename',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.media.props.download_filename.description',
            descriptionFallback: 'Suggested filename written to the <a download="…"> attribute.'
        },
        {
            name: 'qualityOptions',
            type: { label: 'ReadonlyArray<TQualityOption>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.media.props.quality_options.description',
            descriptionFallback: 'Quality variants list. When ≥ 2 entries, a "Quality" drill-down appears in the config menu.'
        },
        {
            name: 'currentQuality',
            type: { label: 'string | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.media.props.current_quality.description',
            descriptionFallback: 'Currently-active quality identifier.'
        },
        {
            name: 'showPrevious',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media.props.show_previous.description',
            descriptionFallback: 'Show the "previous" transport button.'
        },
        {
            name: 'showNext',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media.props.show_next.description',
            descriptionFallback: 'Show the "next" transport button.'
        },
        {
            name: 'showLoop',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media.props.show_loop.description',
            descriptionFallback: 'Show the tri-state loop button (none → all → one → none).'
        },
        {
            name: 'showShuffle',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media.props.show_shuffle.description',
            descriptionFallback: 'Show the shuffle toggle button.'
        },
        {
            name: 'loopMode',
            type: { label: 'TAudioLoopMode', slug: 'audio-loop-mode', kind: 'type' },
            defaultValue: "'none'",
            descriptionKey: 'components.media.props.loop_mode.description',
            descriptionFallback: 'Current loop mode (v-model:loopMode). Cycles none → all → one → none on click.'
        },
        {
            name: 'shuffle',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media.props.shuffle.description',
            descriptionFallback: 'Current shuffle state (v-model:shuffle). Toggled on click.'
        }
    ],

    emits: [
        {
            event: 'quality-change',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media.emits.quality_change.description',
            descriptionFallback: 'Fired when the user picks a quality option from the config menu. Parent owns the <source> swap.'
        },
        {
            event: 'download',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media.emits.download.description',
            descriptionFallback: 'Fired when the user clicks the Download button in the config menu.'
        },
        {
            event: 'previous',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media.emits.previous.description',
            descriptionFallback: 'Fired when the previous transport button is clicked. Parent decides skip-back vs playlist jump.'
        },
        {
            event: 'next',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media.emits.next.description',
            descriptionFallback: 'Fired when the next transport button is clicked. Parent owns the playlist action.'
        },
        {
            event: 'update:loopMode',
            payload: { label: 'TAudioLoopMode', slug: 'audio-loop-mode', kind: 'type' },
            descriptionKey: 'components.media.emits.update_loop_mode.description',
            descriptionFallback: 'Two-way binding for the loop mode. Emitted when the user cycles the loop button.'
        },
        {
            event: 'update:shuffle',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media.emits.update_shuffle.description',
            descriptionFallback: 'Two-way binding for shuffle state. Emitted on shuffle toggle click.'
        }
    ],

    slots: [
        {
            slot: 'header',
            slotProps: '—',
            descriptionKey: 'components.media.slots.header.description',
            descriptionFallback: 'Block rendered above the scrubber row. OrigamAudio injects cover + metadata here.'
        },
        {
            slot: 'waveform',
            slotProps: '{ state, methods }',
            descriptionKey: 'components.media.slots.waveform.description',
            descriptionFallback: 'Replaces the default OrigamMediaScrubber scrubber row. Receives state + methods to route seeks.'
        },
        {
            slot: 'footer',
            slotProps: '—',
            descriptionKey: 'components.media.slots.footer.description',
            descriptionFallback: 'Block rendered below the transport row. OrigamAudio injects the playlist list here.'
        },
        {
            slot: 'prepend-transport',
            slotProps: '—',
            descriptionKey: 'components.media.slots.prepend_transport.description',
            descriptionFallback: 'Buttons rendered at the start of the transport row, before the play button.'
        },
        {
            slot: 'append-transport',
            slotProps: '—',
            descriptionKey: 'components.media.slots.append_transport.description',
            descriptionFallback: 'Buttons rendered at the end of the transport row, after the config menu.'
        },
        {
            slot: 'extraControlsLeft',
            slotProps: '—',
            descriptionKey: 'components.media.slots.extra_controls_left.description',
            descriptionFallback: 'Additional buttons rendered on the left side of the toolbar, after the time display.'
        },
        {
            slot: 'extraControlsRight',
            slotProps: '—',
            descriptionKey: 'components.media.slots.extra_controls_right.description',
            descriptionFallback: 'Additional buttons on the right side of the toolbar, before the config menu. OrigamVideo injects captions / PiP / fullscreen here.'
        },
        {
            slot: 'configExtra',
            slotProps: '{ closeMenu }',
            descriptionKey: 'components.media.slots.config_extra.description',
            descriptionFallback: 'Extra rows in the config menu (audio output device, subtitle track selector…).'
        }
    ],

    examples: [
        {
            titleKey: 'components.media.examples.controller.title',
            titleFallback: 'MediaController usage',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useMediaPlayer } from 'origam'

const videoRef = ref<HTMLVideoElement | null>(null)
const { state, methods } = useMediaPlayer({ mediaRef: videoRef })
</script>

<template>
  <div class="player-wrap">
    <video ref="videoRef" src="/demo/sample.mp4" />
    <origam-media-controller
      :state="state"
      :methods="methods"
      :show-previous="true"
      :show-next="true"
      :show-loop="true"
    />
  </div>
</template>`
        },
        {
            titleKey: 'components.media.examples.scrubber.title',
            titleFallback: 'MediaScrubber standalone',
            lang: 'vue',
            code: `<template>
  <origam-media-scrubber
    v-model="currentTime"
    :max="duration"
    :buffered="bufferedEnd"
    aria-label="Video timeline"
    show-hover-tooltip
    :format-hover-tooltip="v => formatTime(v)"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-media-controller',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamMediaController',
        svgDesc: 'Schematic of the MediaController shell with 6 numbered zones.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #f3f4f6)" rx="4"/>
  <rect x="20" y="20" width="660" height="180" rx="4" fill="var(--origam-color__surface---raised, #1f2937)" stroke="var(--origam-color__action--primary---bg, #6366f1)" stroke-width="1.5"/>
  <rect x="30" y="30" width="640" height="30" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(99,102,241,0.12))" stroke="var(--origam-color__border---default, rgba(99,102,241,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="50" font-size="9" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#header slot</text>
  <rect x="30" y="68" width="640" height="28" rx="3" fill="rgba(99,102,241,0.08)" stroke="var(--origam-color__border---default, rgba(99,102,241,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="40" y="76" width="500" height="12" rx="6" fill="var(--origam-color__action--primary---bg, #6366f1)" opacity="0.6"/>
  <rect x="540" y="76" width="120" height="12" rx="6" fill="var(--origam-color__surface---disabled, rgba(99,102,241,0.2))"/>
  <text x="350" y="90" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#waveform / progress row</text>
  <rect x="30" y="104" width="640" height="36" rx="3" fill="rgba(99,102,241,0.05)" stroke="var(--origam-color__border---default, rgba(99,102,241,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="40" y="114" width="80" height="16" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(99,102,241,0.2))"/>
  <text x="80" y="126" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">play/pause</text>
  <rect x="130" y="114" width="120" height="16" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(99,102,241,0.1))"/>
  <text x="190" y="126" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">time display</text>
  <rect x="490" y="114" width="80" height="16" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(99,102,241,0.1))"/>
  <text x="530" y="126" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">volume</text>
  <rect x="580" y="114" width="40" height="16" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(99,102,241,0.1))"/>
  <text x="600" y="126" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">cfg</text>
  <rect x="30" y="148" width="640" height="30" rx="3" fill="rgba(99,102,241,0.06)" stroke="var(--origam-color__border---default, rgba(99,102,241,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="167" font-size="9" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#footer slot</text>
  <circle cx="28" cy="28" r="8" fill="var(--origam-color__action--primary---bg, #6366f1)"/>
  <text x="28" y="32" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="28" cy="66" r="8" fill="var(--origam-color__action--primary---bg, #6366f1)"/>
  <text x="28" y="70" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="28" cy="102" r="8" fill="var(--origam-color__action--primary---bg, #6366f1)"/>
  <text x="28" y="106" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="28" cy="146" r="8" fill="var(--origam-color__action--primary---bg, #6366f1)"/>
  <text x="28" y="150" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="672" cy="28" r="8" fill="var(--origam-color__action--primary---bgHover, #818cf8)"/>
  <text x="672" y="32" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="672" cy="102" r="8" fill="var(--origam-color__action--primary---bgHover, #818cf8)"/>
  <text x="672" y="106" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-media-controller&gt;</code> — 6 internal zones: header slot, progress row (scrubber), transport row (buttons), footer slot, plus prepend/append transport injection points.',
        legend: [
            {
                num: 1,
                cls: '.origam-media-controller',
                descriptionKey: 'components.media.anatomy.root',
                descriptionFallback: 'Root container. When inset=true, overlays the media surface with a gradient.'
            },
            {
                num: 2,
                cls: '.origam-media-controller__progress-row',
                descriptionKey: 'components.media.anatomy.progress_row',
                descriptionFallback: 'Hosts the OrigamMediaScrubber timeline (or the #waveform slot override).'
            },
            {
                num: 3,
                cls: '.origam-media-controller__buttons-row',
                descriptionKey: 'components.media.anatomy.buttons_row',
                descriptionFallback: 'Transport row: play/pause, previous/next, time display, volume, config menu.'
            },
            {
                num: 4,
                cls: '.origam-media-controller__time',
                descriptionKey: 'components.media.anatomy.time',
                descriptionFallback: 'Current time / total duration display. Children: __time-current, __time-sep, __time-total.'
            },
            {
                num: 5,
                cls: '.origam-media-controller__buttons-left',
                descriptionKey: 'components.media.anatomy.buttons_left',
                descriptionFallback: 'Left side of transport row. Hosts #prepend-transport slot, play/pause, previous/next, time.'
            },
            {
                num: 6,
                cls: '.origam-media-controller__buttons-right',
                descriptionKey: 'components.media.anatomy.buttons_right',
                descriptionFallback: 'Right side of transport row. Hosts #extraControlsRight slot, volume control, config menu.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-media-controller">
  <slot name="header"/>

  <div class="origam-media-controller__progress-row">
    <slot name="waveform" :state="state" :methods="methods">
      <origam-media-scrubber class="origam-media-controller__scrubber" />
    </slot>
  </div>

  <div class="origam-media-controller__buttons-row">
    <div class="origam-media-controller__buttons-left">
      <slot name="prepend-transport"/>
      <!-- previous / play-pause / next buttons -->
      <span class="origam-media-controller__time">
        <span class="origam-media-controller__time-current"/>
        <span class="origam-media-controller__time-sep">/</span>
        <span class="origam-media-controller__time-total"/>
      </span>
      <slot name="extraControlsLeft"/>
    </div>

    <div class="origam-media-controller__buttons-right">
      <slot name="extraControlsRight"/>
      <!-- volume control + config menu -->
      <slot name="append-transport"/>
    </div>
  </div>

  <slot name="footer"/>
</div>`,
        classes: [
            {
                cls: 'origam-media-controller',
                descriptionKey: 'components.media.anatomy.root',
                descriptionFallback: 'Root container. Applies inset overlay mode when inset=true.'
            },
            {
                cls: 'origam-media-controller__progress-row',
                descriptionKey: 'components.media.anatomy.progress_row',
                descriptionFallback: 'Scrubber / waveform slot row.'
            },
            {
                cls: 'origam-media-controller__scrubber',
                descriptionKey: 'components.media.anatomy.scrubber',
                descriptionFallback: 'Default OrigamMediaScrubber instance injected in the progress row.'
            },
            {
                cls: 'origam-media-controller__buttons-row',
                descriptionKey: 'components.media.anatomy.buttons_row',
                descriptionFallback: 'Full-width transport row containing left and right button groups.'
            },
            {
                cls: 'origam-media-controller__buttons-left',
                descriptionKey: 'components.media.anatomy.buttons_left',
                descriptionFallback: 'Left transport group: prepend-transport slot, play/pause, prev/next, time.'
            },
            {
                cls: 'origam-media-controller__play-btn',
                descriptionKey: 'components.media.anatomy.play_btn',
                descriptionFallback: 'Play / pause toggle button.'
            },
            {
                cls: 'origam-media-controller__time',
                descriptionKey: 'components.media.anatomy.time',
                descriptionFallback: 'Time display wrapper. Contains __time-current, __time-sep, __time-total.'
            },
            {
                cls: 'origam-media-controller__buttons-right',
                descriptionKey: 'components.media.anatomy.buttons_right',
                descriptionFallback: 'Right transport group: extraControlsRight slot, volume, config menu, append-transport.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-media-scrubber---color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.media.css_vars.scrubber_color',
            descriptionFallback: 'Color of the filled progress track and thumb.'
        },
        {
            name: '--origam-media-scrubber---border-radius',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.media.css_vars.scrubber_border_radius',
            descriptionFallback: 'Border-radius of the track and progress bar (pill shape by default).'
        },
        {
            name: '--origam-media-volume-control__scrubber---color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.media.css_vars.volume_scrubber_color',
            descriptionFallback: 'Color of the volume level bar inside the tooltip.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['group', 'progressbar', 'slider'],
        keyboard: [
            {
                key: 'Space / K',
                actionKey: 'components.media.a11y.key_play_pause',
                actionFallback: 'Toggle play / pause.'
            },
            {
                key: 'ArrowLeft / J',
                actionKey: 'components.media.a11y.key_seek_back',
                actionFallback: 'Seek backward (scrubber step or 5 s).'
            },
            {
                key: 'ArrowRight / L',
                actionKey: 'components.media.a11y.key_seek_forward',
                actionFallback: 'Seek forward (scrubber step or 5 s).'
            },
            {
                key: 'ArrowUp / ArrowDown',
                actionKey: 'components.media.a11y.key_volume',
                actionFallback: 'Adjust volume (vertical scrubber when focused).'
            },
            {
                key: 'M',
                actionKey: 'components.media.a11y.key_mute',
                actionFallback: 'Toggle mute.'
            }
        ],
        notes: [
            {
                noteKey: 'components.media.a11y.scrubber_note',
                noteFallback: 'OrigamMediaScrubber sets role="slider", aria-valuemin, aria-valuemax, aria-valuenow and aria-valuetext on the track element. Keyboard users can seek using ArrowLeft/ArrowRight.'
            },
            {
                noteKey: 'components.media.a11y.volume_note',
                noteFallback: 'OrigamMediaVolumeControl mute button receives an aria-label from the muteLabel / unmuteLabel props. These must be translated strings passed by the parent.'
            },
            {
                noteKey: 'components.media.a11y.reduced_motion',
                noteFallback: 'Scrubber transitions and controller fade-in are suppressed under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/media.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'media-scrubber.color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.media.tokens.scrubber_color',
                descriptionFallback: 'Fill color of the scrubber progress bar and thumb.'
            },
            {
                tokenPath: 'media-scrubber.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.media.tokens.scrubber_border_radius',
                descriptionFallback: 'Border-radius of the track, progress and thumb (pill by default).'
            }
        ]
    }
}
