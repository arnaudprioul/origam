/**
 * /components/switch-track — full documentation data for OrigamSwitchTrack.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Switch/switch-track.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/Switch/OrigamSwitchTrack.vue      (template, defineExpose)
 *   - packages/ds/tokens/component/switch.json (track sub-object)  (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SWITCH_TRACK_DOC: IComponentDoc = {
    slug: 'switch-track',
    name: 'SwitchTrack',
    tag: 'origam-switch-track',
    icon: 'mdi-toggle-switch-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.switch_track.description',
    descriptionFallback: 'The rounded rail behind the Switch thumb. Owns its visual surface (background, inset variant, error state) and exposes slots for content shown on each side of the rail.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-switch--design',
    docUrl: 'http://localhost:4000/components/Switch/OrigamSwitch',

    parentSlug: 'switch',

    family: [
        {
            slug: 'switch',
            name: 'Switch',
            descriptionKey: 'components.catalog.switch.description',
            descriptionFallback: 'Toggle switch with track, thumb and optional label.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch_track.props.model_value.description',
            descriptionFallback: 'Whether the switch is currently ON. Drives the --dirty modifier class that reveals the track.true slot and hides the track.false slot.'
        },
        {
            name: 'isValid',
            type: { label: 'boolean | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.switch_track.props.is_valid.description',
            descriptionFallback: 'Validation state forwarded from the surrounding OrigamInput. Exposed to slot consumers via the slot prop.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch_track.props.disabled.description',
            descriptionFallback: 'Disabled state. Applies --disabled modifier and blocks click propagation. bgColor is ignored when disabled.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch_track.props.readonly.description',
            descriptionFallback: 'Readonly state. Keeps the visual appearance interactive but blocks click events. Applies --readonly modifier.'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch_track.props.error.description',
            descriptionFallback: 'Error state. Overrides the rail background with the danger feedback token. bgColor is ignored when error is true.'
        },
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.switch_track.props.inset.description',
            descriptionFallback: 'Inset (Material 3 style) variant. Renders a taller and wider pill rail with a larger font size.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.switch_track.props.color.description',
            descriptionFallback: 'Foreground colour intent. Exposed to slot consumers (e.g. an icon inside track.true) but does NOT paint the track rail itself — use bgColor for that.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.switch_track.props.bg_color.description',
            descriptionFallback: 'Background colour of the track rail. Ignored when disabled or error is true (state tokens take precedence).'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.switch_track.emits.click.description',
            descriptionFallback: 'Fired when the track is clicked (not blocked by disabled / readonly). stopPropagation and preventDefault are called before emitting so the parent SelectionControl handles toggle forwarding without double-toggling.'
        }
    ],

    slots: [
        {
            slot: 'track.true',
            slotProps: '{ model: boolean, isValid: boolean | null }',
            descriptionKey: 'components.switch_track.slots.track_true.description',
            descriptionFallback: 'Content shown on the left side of the rail (the ON side). Hidden via opacity when modelValue is false.'
        },
        {
            slot: 'track.false',
            slotProps: '{ model: boolean, isValid: boolean | null }',
            descriptionKey: 'components.switch_track.slots.track_false.description',
            descriptionFallback: 'Content shown on the right side of the rail (the OFF side). Hidden via opacity when modelValue is true.'
        },
        {
            slot: 'overlay',
            slotProps: '{ model: boolean, isValid: boolean | null }',
            descriptionKey: 'components.switch_track.slots.overlay.description',
            descriptionFallback: 'Free-form overlay rendered inside the track after the half-labels. Used by OrigamSwitch to host a linear progress bar when loading, or by consumers for decorative effects.'
        }
    ],

    examples: [
        {
            titleKey: 'components.switch_track.examples.basic.title',
            titleFallback: 'Basic usage (inside a Switch)',
            lang: 'vue',
            code: `<template>
  <!-- SwitchTrack is normally used via OrigamSwitch, not standalone -->
  <origam-switch label="Enable notifications" />
  <origam-switch label="Inset variant" inset />
  <origam-switch label="Error state" error />
</template>`
        },
        {
            titleKey: 'components.switch_track.examples.slots.title',
            titleFallback: 'Custom track content slots',
            lang: 'vue',
            code: `<template>
  <!-- Custom true/false icons in the track -->
  <origam-switch v-model="val">
    <template #track.true>
      <origam-icon icon="mdi-check" size="x-small" />
    </template>
    <template #track.false>
      <origam-icon icon="mdi-close" size="x-small" />
    </template>
  </origam-switch>
</template>

<script setup>
import { ref } from 'vue'
const val = ref(false)
</script>`
        }
    ],

    previewVariants: [
        { label: 'off', props: { modelValue: false } },
        { label: 'on', props: { modelValue: true } },
        { label: 'inset off', props: { modelValue: false, inset: true } },
        { label: 'inset on', props: { modelValue: true, inset: true } },
        { label: 'disabled', props: { modelValue: false, disabled: true } },
        { label: 'error', props: { modelValue: false, error: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-switch-track',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamSwitchTrack',
        svgDesc: 'Schematic of the SwitchTrack component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #f8f5ff)" rx="4"/>
  <rect x="190" y="40" width="320" height="100" rx="50" fill="var(--origam-color__action--primary---bg, #7c3aed)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="88" font-size="8" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-switch-track--dirty</text>
  <rect x="202" y="52" width="80" height="76" rx="38" fill="var(--origam-color__surface---overlay, rgba(255,255,255,0.15))" stroke="none"/>
  <text x="242" y="92" font-size="8" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-family="'JetBrains Mono',monospace">true</text>
  <rect x="418" y="52" width="80" height="76" rx="38" fill="var(--origam-color__surface---overlay, rgba(0,0,0,0.08))" stroke="none"/>
  <text x="458" y="92" font-size="8" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-family="'JetBrains Mono',monospace">false</text>
  <circle cx="462" cy="90" r="42" fill="var(--origam-color__surface---default, #fff)" stroke="none"/>
  <circle cx="198" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="198" y="52" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="210" cy="60" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="210" y="64" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="426" cy="60" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="426" y="64" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="470" cy="60" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="470" y="64" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-switch-track&gt;</code> — 4 internal parts. The pill-shaped rail paints the background; the <code>__true</code> / <code>__false</code> halves reveal or hide on each side; the <code>overlay</code> slot sits on top.`,
        legend: [
            {
                num: 1,
                cls: '.origam-switch-track',
                descriptionKey: 'components.switch_track.anatomy.root',
                descriptionFallback: 'Root element. Pill-shaped rail with <code>border-radius: 9999px</code>. Carries state modifiers: <code>--dirty</code> (ON), <code>--disabled</code>, <code>--readonly</code>, <code>--error</code>, <code>--inset</code>.'
            },
            {
                num: 2,
                cls: '.origam-switch-track__true',
                descriptionKey: 'components.switch_track.anatomy.true',
                descriptionFallback: 'Left half — hosts the <code>#track.true</code> slot. Visible (opacity: 1) when <code>modelValue</code> is true, hidden (opacity: 0) when false. Uses <code>margin-inline-end: auto</code> to push to the left.'
            },
            {
                num: 3,
                cls: '.origam-switch-track__false',
                descriptionKey: 'components.switch_track.anatomy.false',
                descriptionFallback: 'Right half — hosts the <code>#track.false</code> slot. Visible when <code>modelValue</code> is false, hidden when true. Uses <code>margin-inline-start: auto</code> to push to the right.'
            },
            {
                num: 4,
                cls: '(overlay slot)',
                descriptionKey: 'components.switch_track.anatomy.overlay',
                descriptionFallback: '<code>#overlay</code> slot host rendered after the half-labels. Positioned freely inside the track (absolute positioning is the consumer\'s responsibility).'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-switch-track origam-switch-track--dirty">
  <!-- left content: visible when ON -->
  <div class="origam-switch-track__true">
    <slot name="track.true" v-bind="{ model: modelValue, isValid }" />
  </div>
  <!-- right content: visible when OFF -->
  <div class="origam-switch-track__false">
    <slot name="track.false" v-bind="{ model: modelValue, isValid }" />
  </div>
  <!-- free overlay layer -->
  <slot name="overlay" v-bind="{ model: modelValue, isValid }" />
</div>`,
        classes: [
            {
                cls: 'origam-switch-track',
                descriptionKey: 'components.switch_track.anatomy.root',
                descriptionFallback: 'Root pill-shaped rail element with state modifiers.'
            },
            {
                cls: 'origam-switch-track__true',
                descriptionKey: 'components.switch_track.anatomy.true',
                descriptionFallback: 'Left (ON-side) content wrapper. Opacity-toggled by --dirty.'
            },
            {
                cls: 'origam-switch-track__false',
                descriptionKey: 'components.switch_track.anatomy.false',
                descriptionFallback: 'Right (OFF-side) content wrapper. Opacity-toggled by --dirty.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-switch__track---background-color',
            defaultValue: 'rgb(163, 163, 163)',
            descriptionKey: 'components.switch_track.css_vars.background_color',
            descriptionFallback: 'Rail background colour in OFF state. Overridden by bgColor prop when set.'
        },
        {
            name: '--origam-switch__track---border-radius',
            defaultValue: '9999px',
            descriptionKey: 'components.switch_track.css_vars.border_radius',
            descriptionFallback: 'Corner radius of the track rail (pill shape).'
        },
        {
            name: '--origam-switch__track---height',
            defaultValue: '14px',
            descriptionKey: 'components.switch_track.css_vars.height',
            descriptionFallback: 'Height of the standard (non-inset) track.'
        },
        {
            name: '--origam-switch__track---width',
            defaultValue: '36px',
            descriptionKey: 'components.switch_track.css_vars.width',
            descriptionFallback: 'Minimum width of the standard (non-inset) track.'
        },
        {
            name: '--origam-switch__track--inset---height',
            defaultValue: '32px',
            descriptionKey: 'components.switch_track.css_vars.inset_height',
            descriptionFallback: 'Height of the track in inset variant.'
        },
        {
            name: '--origam-switch__track--inset---width',
            defaultValue: '52px',
            descriptionKey: 'components.switch_track.css_vars.inset_width',
            descriptionFallback: 'Minimum width of the track in inset variant.'
        },
        {
            name: '--origam-switch__track---background-color-disabled',
            defaultValue: 'rgb(163, 163, 163)',
            descriptionKey: 'components.switch_track.css_vars.background_color_disabled',
            descriptionFallback: 'Rail background in disabled ON state.'
        },
        {
            name: '--origam-switch---opacity-disabled',
            defaultValue: '0.32',
            descriptionKey: 'components.switch_track.css_vars.opacity_disabled',
            descriptionFallback: 'Opacity applied to the entire track in disabled state.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.switch_track.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.switch_track.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed track styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.switch_track.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.switch_track.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.switch_track.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.switch_track.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.switch_track.a11y.presentational_note',
                noteFallback: 'SwitchTrack is a purely visual sub-component. All ARIA semantics (role="switch", aria-checked, aria-label) live on the hidden <input> or the SelectionControl root inside OrigamSwitch — not on the track itself.'
            },
            {
                noteKey: 'components.switch_track.a11y.forced_colors_note',
                noteFallback: 'Under forced-colors: active a 1px border is rendered and colour transitions are disabled so the track remains distinguishable from the background. The ON state paints the track highlight colour.'
            },
            {
                noteKey: 'components.switch_track.a11y.reduced_motion_note',
                noteFallback: 'The background-color transition is removed under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/switch.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Track tokens live under the switch.track sub-object.',
        excerpt: [
            {
                tokenPath: 'switch.track.width',
                value: '44px',
                type: 'dimension',
                descriptionKey: 'components.switch_track.tokens.width',
                descriptionFallback: 'Width of the standard track.'
            },
            {
                tokenPath: 'switch.track.height',
                value: '24px',
                type: 'dimension',
                descriptionKey: 'components.switch_track.tokens.height',
                descriptionFallback: 'Height of the standard track.'
            },
            {
                tokenPath: 'switch.track.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.switch_track.tokens.border_radius',
                descriptionFallback: 'Pill border-radius of the track.'
            },
            {
                tokenPath: 'switch.track.background-color',
                value: '{color.surface.disabled}',
                type: 'color',
                descriptionKey: 'components.switch_track.tokens.background_color',
                descriptionFallback: 'Track background in OFF state.'
            },
            {
                tokenPath: 'switch.track.background-color-checked',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.switch_track.tokens.background_color_checked',
                descriptionFallback: 'Track background in ON state.'
            },
            {
                tokenPath: 'switch.track.background-color-error',
                value: '{color.feedback.danger.bg}',
                type: 'color',
                descriptionKey: 'components.switch_track.tokens.background_color_error',
                descriptionFallback: 'Track background in error state.'
            }
        ]
    } satisfies IComponentTokens
}
