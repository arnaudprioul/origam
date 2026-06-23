/**
 * /components/media-volume-control — full documentation data for OrigamMediaVolumeControl.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Media/media-volume-control.interface.ts  (props)
 *   - packages/ds/src/components/Media/OrigamMediaVolumeControl.vue       (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/media-scrubber.json                    (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const MEDIA_VOLUME_CONTROL_DOC: IComponentDoc = {
    slug: 'media-volume-control',
    name: 'MediaVolumeControl',
    tag: 'origam-media-volume-control',
    icon: 'mdi-volume-high',
    category: 'Media',
    descriptionKey: 'components.catalog.media_volume_control.description',
    descriptionFallback: 'Mute / unmute toggle button with a vertical volume scrubber shown in a tooltip on hover.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-media-volume-control--design',
    docUrl: 'http://localhost:4000/components/Media/OrigamMediaVolumeControl',

    family: [
        {
            slug: 'media',
            name: 'Media',
            descriptionKey: 'components.catalog.media.description',
            descriptionFallback: 'Full-featured media player with controls, scrubber and volume.'
        },
        {
            slug: 'media-scrubber',
            name: 'MediaScrubber',
            descriptionKey: 'components.catalog.media_scrubber.description',
            descriptionFallback: 'Accessible range scrubber used inside the Media player and volume tooltip.'
        },
        {
            slug: 'media-controller',
            name: 'MediaController',
            descriptionKey: 'components.catalog.media_controller.description',
            descriptionFallback: 'Control bar that groups play, scrubber and volume controls.'
        }
    ],

    parentSlug: 'media',

    props: [
        {
            name: 'volume',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_volume_control.props.volume.description',
            descriptionFallback: 'Linear volume in [0, 1]. Drives the scrubber position and the volume icon tier.'
        },
        {
            name: 'muted',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_volume_control.props.muted.description',
            descriptionFallback: 'When true, collapses the scrubber to 0 and shows the VOLUME_OFF icon.'
        },
        {
            name: 'muteLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_volume_control.props.mute_label.description',
            descriptionFallback: 'aria-label on the toggle button when the media is NOT muted (clicking will mute). Must be pre-translated.'
        },
        {
            name: 'unmuteLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_volume_control.props.unmute_label.description',
            descriptionFallback: 'aria-label on the toggle button when the media IS muted (clicking will unmute). Must be pre-translated.'
        },
        {
            name: 'volumeLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_volume_control.props.volume_label.description',
            descriptionFallback: 'aria-label rendered on the vertical scrubber inside the tooltip. Must be pre-translated.'
        },
        {
            name: 'dataCy',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-media-volume-control'",
            descriptionKey: 'components.media_volume_control.props.data_cy.description',
            descriptionFallback: 'data-cy prefix used on the toggle button. The wrapper and scrubber derive their own selectors via convention.'
        }
    ],

    emits: [
        {
            event: 'update:muted',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_volume_control.emits.update_muted.description',
            descriptionFallback: 'Fired when the mute toggle is clicked. Payload is the proposed new muted state (!muted).'
        },
        {
            event: 'update:volume',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_volume_control.emits.update_volume.description',
            descriptionFallback: 'Fired when the vertical scrubber moves. Payload is the new linear volume in [0, 1].'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.media_volume_control.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-media-volume-control
    :volume="volume"
    :muted="muted"
    mute-label="Mute"
    unmute-label="Unmute"
    volume-label="Volume"
    @update:muted="muted = $event"
    @update:volume="volume = $event"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const volume = ref(0.8)
const muted = ref(false)
</script>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-media-volume-control__btn',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamMediaVolumeControl',
        svgDesc: 'Schematic of the MediaVolumeControl component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #f8f9fa)" rx="4"/>
  <rect x="28" y="30" width="200" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="128" cy="100" r="30" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="128" y="104" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <rect x="280" y="20" width="80" height="160" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bgHover, #a855f7)" stroke-width="1.5"/>
  <rect x="306" y="40" width="28" height="120" rx="4" fill="var(--origam-color__surface---disabled, #e9d5ff)"/>
  <rect x="306" y="100" width="28" height="60" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="320" cy="100" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="36" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="42.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="152" cy="38" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="152" y="42.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="288" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="288" y="32.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="320" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="320" y="32.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <line x1="46" y1="38" x2="80" y2="20" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="18" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-tooltip</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-media-volume-control&gt;</code> — 4 internal parts: the tooltip wrapper ①, the icon-only toggle button ②, the tooltip volume wrapper ③, and the vertical scrubber ④.`,
        legend: [
            {
                num: 1,
                cls: '.origam-media-volume-control__btn',
                descriptionKey: 'components.media_volume_control.anatomy.btn',
                descriptionFallback: 'Icon-only <code>&lt;button&gt;</code> that triggers mute/unmute. Styled with <code>all: unset</code> and rounded with <code>border-radius: 50%</code>.'
            },
            {
                num: 2,
                cls: '.origam-icon (within __btn)',
                descriptionKey: 'components.media_volume_control.anatomy.icon',
                descriptionFallback: 'Volume icon that switches between VOLUME_OFF / VOLUME_LOW / VOLUME_MEDIUM / VOLUME_HIGH based on <code>volume</code> and <code>muted</code>.'
            },
            {
                num: 3,
                cls: '.origam-media-volume-control__wrapper',
                descriptionKey: 'components.media_volume_control.anatomy.wrapper',
                descriptionFallback: 'Container inside the tooltip — 14 × 80 px — that hosts the vertical scrubber.'
            },
            {
                num: 4,
                cls: '.origam-media-volume-control__scrubber',
                descriptionKey: 'components.media_volume_control.anatomy.scrubber',
                descriptionFallback: '<code>&lt;origam-media-scrubber&gt;</code> in vertical orientation. <code>max=1</code>, <code>step=0.05</code>. Collapses to 0 when muted.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- tooltip wraps both the activator button and the volume panel -->
<origam-tooltip location="top" content-class="origam-media-volume-control__tooltip">
  <template #activator="{ props: activatorProps }">
    <!-- mute / unmute toggle -->
    <button
      type="button"
      class="origam-media-volume-control__btn"
      :aria-label="muted ? unmuteLabel : muteLabel"
      @click="onToggleMute"
    >
      <origam-icon :icon="volumeIcon" aria-hidden="true" />
    </button>
  </template>

  <!-- tooltip body: vertical scrubber -->
  <div class="origam-media-volume-control__wrapper">
    <origam-media-scrubber
      class="origam-media-volume-control__scrubber"
      orientation="vertical"
      :model-value="resolvedVolume"
      :max="1"
      :step="0.05"
      :aria-label="volumeLabel"
      @update:model-value="onVolumeFromScrubber"
    />
  </div>
</origam-tooltip>`,
        classes: [
            {
                cls: 'origam-media-volume-control__btn',
                descriptionKey: 'components.media_volume_control.anatomy.btn',
                descriptionFallback: 'Icon-only toggle button. Uses all:unset and 50% border-radius.'
            },
            {
                cls: 'origam-media-volume-control__tooltip',
                descriptionKey: 'components.media_volume_control.anatomy.tooltip',
                descriptionFallback: 'CSS class injected via content-class on the tooltip to style its inner panel.'
            },
            {
                cls: 'origam-media-volume-control__wrapper',
                descriptionKey: 'components.media_volume_control.anatomy.wrapper',
                descriptionFallback: 'Fixed-size (14 × 80 px) flex container for the vertical scrubber.'
            },
            {
                cls: 'origam-media-volume-control__scrubber',
                descriptionKey: 'components.media_volume_control.anatomy.scrubber',
                descriptionFallback: 'OrigamMediaScrubber instance in vertical orientation.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-media-volume-control---btn-size',
            defaultValue: '36px',
            descriptionKey: 'components.media_volume_control.css_vars.btn_size',
            descriptionFallback: 'Width and height of the toggle button.'
        },
        {
            name: '--origam-media-volume-control---btn-border-radius',
            defaultValue: '50%',
            descriptionKey: 'components.media_volume_control.css_vars.btn_border_radius',
            descriptionFallback: 'Border radius of the toggle button (full circle by default).'
        },
        {
            name: '--origam-media-volume-control---color',
            defaultValue: 'inherit',
            descriptionKey: 'components.media_volume_control.css_vars.color',
            descriptionFallback: 'Foreground color of the icon button.'
        },
        {
            name: '--origam-media-volume-control---hover-background-color',
            defaultValue: 'color-mix(in srgb, currentColor 12%, transparent)',
            descriptionKey: 'components.media_volume_control.css_vars.hover_background_color',
            descriptionFallback: 'Background color on hover and focus-visible.'
        },
        {
            name: '--origam-media-volume-control---icon-size',
            defaultValue: '20px',
            descriptionKey: 'components.media_volume_control.css_vars.icon_size',
            descriptionFallback: 'Font-size of the volume icon inside the button.'
        },
        {
            name: '--origam-media-volume-control---tooltip-background-color',
            defaultValue: 'rgba(28, 28, 28, 0.92)',
            descriptionKey: 'components.media_volume_control.css_vars.tooltip_background_color',
            descriptionFallback: 'Background color of the tooltip content area containing the scrubber.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['button'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.media_volume_control.a11y.key_toggle',
                actionFallback: 'Toggles mute/unmute on the icon button.'
            },
            {
                key: 'Arrow Up / Arrow Down',
                actionKey: 'components.media_volume_control.a11y.key_scrubber',
                actionFallback: 'Adjusts volume via the vertical scrubber (step 0.05).'
            },
            {
                key: 'Tab',
                actionKey: 'components.media_volume_control.a11y.key_tab',
                actionFallback: 'Moves focus between the toggle button and the scrubber inside the tooltip.'
            }
        ],
        notes: [
            {
                noteKey: 'components.media_volume_control.a11y.aria_label_note',
                noteFallback: 'The toggle button\'s aria-label switches between muteLabel and unmuteLabel to reflect the current state.'
            },
            {
                noteKey: 'components.media_volume_control.a11y.scrubber_note',
                noteFallback: 'The scrubber exposes aria-label (volumeLabel) and aria-valuetext (formatted percentage) for screen readers.'
            },
            {
                noteKey: 'components.media_volume_control.a11y.reduced_motion_note',
                noteFallback: 'The button scale transform on :active is the only animation — it respects prefers-reduced-motion by being a short (120ms) transition.'
            }
        ]
    } satisfies IComponentA11y,

    playground: {
        controls: [
            {
                prop: 'volume',
                kind: 'number',
                labelKey: 'components.media_volume_control.playground.volume',
                labelFallback: 'Volume (0-1)',
                defaultValue: 0.8
            },
            {
                prop: 'muted',
                kind: 'switch',
                labelKey: 'components.media_volume_control.playground.muted',
                labelFallback: 'Muted',
                defaultValue: false
            }
        ]
    }
}
