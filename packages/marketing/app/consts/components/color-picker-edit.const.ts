/**
 * /components/color-picker-edit — full documentation data for OrigamColorPickerEdit.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ColorPicker/color-picker-edit.interface.ts  (IColorPickerEditProps / IColorPickerEditEmits)
 *   - packages/ds/src/interfaces/ColorPicker/color-picker.interface.ts       (IColorHsvEmits / IColorModeEmits)
 *   - packages/ds/src/components/ColorPicker/OrigamColorPickerEdit.vue       (template BEM, defineExpose)
 *   - packages/ds/tokens/component/color-picker.json                         (CSS tokens — color-picker.edit section)
 */
import type {
    IComponentDoc,
    IComponentA11y,
    IComponentCssVar,
    IComponentExposed,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant
} from '~/interfaces/components-catalog.interface'

export const COLOR_PICKER_EDIT_DOC: IComponentDoc = {
    slug: 'color-picker-edit',
    name: 'ColorPickerEdit',
    tag: 'origam-color-picker-edit',
    icon: 'mdi-pencil-box-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.color_picker_edit.description',
    descriptionFallback: 'Colour edit panel for OrigamColorPicker. Renders a row of text inputs for the active colour mode (RGB, RGBA, HSL, HSLA, HEX, HEXA) and a cycle button to switch between enabled modes.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-colorpicker--design',
    docUrl: 'http://localhost:4000/components/ColorPicker/OrigamColorPickerEdit',

    parentSlug: 'color-picker',

    family: [],

    related: [
        {
            slug: 'color-picker',
            name: 'ColorPicker',
            kind: 'component',
            descriptionKey: 'components.catalog.color_picker.description',
            descriptionFallback: 'Full-featured HSVA colour picker that embeds ColorPickerEdit for text input.'
        },
        {
            slug: 'color-picker-canvas',
            name: 'ColorPickerCanvas',
            kind: 'component',
            descriptionKey: 'components.catalog.color_picker_canvas.description',
            descriptionFallback: 'Gradient canvas used alongside ColorPickerEdit inside OrigamColorPicker.'
        },
        {
            slug: 'color-picker-preview',
            name: 'ColorPickerPreview',
            kind: 'component',
            descriptionKey: 'components.catalog.color_picker_preview.description',
            descriptionFallback: 'Hue and alpha sliders paired with a preview swatch, composable with ColorPickerEdit.'
        }
    ],

    props: [
        {
            name: 'colorHsv',
            type: { label: 'THSVA | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_edit.props.color_hsv.description',
            descriptionFallback: 'Current colour in HSVA format ({ h, s, v, a }). The component converts to the active mode for display and re-converts on user input.'
        },
        {
            name: 'mode',
            type: { label: 'TColorModes', slug: '', kind: 'primitive' },
            defaultValue: 'COLOR_MODES_NAMES.RGBA',
            descriptionKey: 'components.color_picker_edit.props.mode.description',
            descriptionFallback: 'Currently active colour mode. Determines which input fields are displayed (e.g. R/G/B/A for RGBA, H/S/L for HSL, #hex for HEX).'
        },
        {
            name: 'modes',
            type: { label: 'Array<TColorModes>', slug: '', kind: 'primitive' },
            defaultValue: "['rgb', 'rgba', 'hsl', 'hsla', 'hex', 'hexa']",
            descriptionKey: 'components.color_picker_edit.props.modes.description',
            descriptionFallback: 'List of allowed colour modes. The cycle button only appears when more than one mode is enabled.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_edit.props.disabled.description',
            descriptionFallback: 'Disables all text inputs. Prevents user from editing the colour values.'
        }
    ],

    emits: [
        {
            event: 'update:colorHsv',
            payload: { label: 'THSVA', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker_edit.emits.update_color_hsv.description',
            descriptionFallback: 'Fired when the user edits a field. Emits the converted THSVA value so the parent updates the colour.'
        },
        {
            event: 'update:mode',
            payload: { label: 'TColorModes', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker_edit.emits.update_mode.description',
            descriptionFallback: 'Fired when the cycle button is clicked. Emits the next mode in the enabled modes list.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.color_picker_edit.examples.basic.title',
            titleFallback: 'Standalone edit panel',
            lang: 'vue',
            code: `<template>
  <origam-color-picker-edit
    :color-hsv="colorHsv"
    v-model:mode="mode"
    @update:color-hsv="colorHsv = $event"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { THSVA, TColorModes } from 'origam'

const colorHsv = ref<THSVA>({ h: 220, s: 0.8, v: 0.9, a: 1 })
const mode = ref<TColorModes>('rgba')
</script>`
        },
        {
            titleKey: 'components.color_picker_edit.examples.hex_only.title',
            titleFallback: 'HEX mode only',
            lang: 'vue',
            code: `<template>
  <origam-color-picker-edit
    :color-hsv="colorHsv"
    mode="hex"
    :modes="['hex']"
    @update:color-hsv="colorHsv = $event"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { THSVA } from 'origam'

const colorHsv = ref<THSVA>({ h: 0, s: 1, v: 1, a: 1 })
</script>`
        }
    ],

    previewVariants: [
        { label: 'rgba mode', props: { mode: 'rgba' }, ariaLabel: 'RGBA mode edit panel' },
        { label: 'hex mode', props: { mode: 'hex' }, ariaLabel: 'HEX mode edit panel' },
        { label: 'disabled', props: { mode: 'rgba', disabled: true }, ariaLabel: 'Disabled edit panel' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-color-picker-edit',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamColorPickerEdit',
        svgDesc: 'Schematic of the ColorPickerEdit component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="16" y="24" width="668" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="16" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">origam-color-picker-edit ①</text>
  <rect x="40" y="44" width="88" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="3 2"/>
  <rect x="44" y="50" width="80" height="28" rx="3" fill="#fff" stroke="var(--origam-color__border---default, #a3a3a3)" stroke-width="1"/>
  <text x="84" y="68" font-size="9" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="monospace">255</text>
  <text x="84" y="90" font-size="7.5" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="sans-serif">R</text>
  <rect x="140" y="44" width="88" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="3 2"/>
  <rect x="144" y="50" width="80" height="28" rx="3" fill="#fff" stroke="var(--origam-color__border---default, #a3a3a3)" stroke-width="1"/>
  <text x="184" y="68" font-size="9" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="monospace">128</text>
  <text x="184" y="90" font-size="7.5" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="sans-serif">G</text>
  <rect x="240" y="44" width="88" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="3 2"/>
  <rect x="244" y="50" width="80" height="28" rx="3" fill="#fff" stroke="var(--origam-color__border---default, #a3a3a3)" stroke-width="1"/>
  <text x="284" y="68" font-size="9" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="monospace">64</text>
  <text x="284" y="90" font-size="7.5" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="sans-serif">B</text>
  <rect x="340" y="44" width="88" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="3 2"/>
  <rect x="344" y="50" width="80" height="28" rx="3" fill="#fff" stroke="var(--origam-color__border---default, #a3a3a3)" stroke-width="1"/>
  <text x="384" y="68" font-size="9" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="monospace">1</text>
  <text x="384" y="90" font-size="7.5" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="sans-serif">A</text>
  <text x="40" y="28" font-size="7.5" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="'JetBrains Mono',monospace">__field ②  __input ③  __label ④</text>
  <rect x="452" y="52" width="36" height="36" rx="18" fill="var(--origam-color__surface---overlay, #f3f4f6)" stroke="var(--origam-color__border---default, #d1d5db)" stroke-width="1"/>
  <text x="470" y="74" font-size="14" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="sans-serif">↕</text>
  <text x="490" y="74" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" font-family="'JetBrains Mono',monospace">origam-btn (cycle) ④+</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-color-picker-edit&gt;</code> — 4 internal parts. Each mode channel gets a <code>__field</code> ② wrapper containing an <code>__input</code> ③ (native <code>&lt;input&gt;</code>) and a <code>__label</code> ④. The cycle button (origam-btn) appears only when more than one mode is enabled.',
        legend: [
            { num: 1, cls: '.origam-color-picker-edit', descriptionKey: 'components.color_picker_edit.anatomy.root', descriptionFallback: 'Root element. flex row — channels sit inline. The cycle button appends at the end.' },
            { num: 2, cls: '.origam-color-picker-edit__field', descriptionKey: 'components.color_picker_edit.anatomy.field', descriptionFallback: 'Per-channel wrapper. flex column + text-align: center. Full-width with margin-inline-end between siblings.' },
            { num: 3, cls: '.origam-color-picker-edit__input', descriptionKey: 'components.color_picker_edit.anatomy.input', descriptionFallback: 'Native <input> element for the channel value. onChange triggers update:colorHsv after mode conversion.' },
            { num: 4, cls: '.origam-color-picker-edit__label', descriptionKey: 'components.color_picker_edit.anatomy.label', descriptionFallback: 'Channel label below the input (e.g. "R", "G", "B", "A", "#"). Font-size 0.75rem.' }
        ],
        code: `<div class="origam-color-picker-edit">
  <!-- one __field per channel of the active mode -->
  <div class="origam-color-picker-edit__field">
    <input class="origam-color-picker-edit__input" />
    <span class="origam-color-picker-edit__label">R</span>
  </div>
  <div class="origam-color-picker-edit__field">
    <input class="origam-color-picker-edit__input" />
    <span class="origam-color-picker-edit__label">G</span>
  </div>
  <!-- … more channels … -->
  <!-- cycle button — only when enabledModes.length > 1 -->
  <origam-btn icon="mdi-unfold-less-horizontal" size="x-small" @click="handleUpdateMode" />
</div>`,
        classes: [
            { cls: 'origam-color-picker-edit', descriptionKey: 'components.color_picker_edit.anatomy.root', descriptionFallback: 'Root flex container.' },
            { cls: 'origam-color-picker-edit__field', descriptionKey: 'components.color_picker_edit.anatomy.field', descriptionFallback: 'Per-channel wrapper (flex column).' },
            { cls: 'origam-color-picker-edit__input', descriptionKey: 'components.color_picker_edit.anatomy.input', descriptionFallback: 'Native channel input.' },
            { cls: 'origam-color-picker-edit__label', descriptionKey: 'components.color_picker_edit.anatomy.label', descriptionFallback: 'Channel label below the input.' }
        ]
    },

    cssVars: [
        {
            name: '--origam-color-picker---edit---input-width',
            defaultValue: '48px',
            descriptionKey: 'components.color_picker_edit.css_vars.input_width',
            descriptionFallback: 'Width of each channel input field.'
        },
        {
            name: '--origam-color-picker---edit---gap',
            defaultValue: '{space.2}',
            descriptionKey: 'components.color_picker_edit.css_vars.gap',
            descriptionFallback: 'Gap between channel fields.'
        },
        {
            name: '--origam-color-picker---edit---label-color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.color_picker_edit.css_vars.label_color',
            descriptionFallback: 'Colour of the channel label text (R, G, B, A, #).'
        },
        {
            name: '--origam-color-picker---edit---label-font-size',
            defaultValue: '{font.size.xs}',
            descriptionKey: 'components.color_picker_edit.css_vars.label_font_size',
            descriptionFallback: 'Font size of the channel label.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.color_picker_edit.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.color_picker_edit.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.color_picker_edit.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.color_picker_edit.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.color_picker_edit.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.color_picker_edit.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.color_picker_edit.a11y.key_tab',
                actionFallback: 'Moves focus between channel inputs and the cycle button.'
            },
            {
                key: 'Enter',
                actionKey: 'components.color_picker_edit.a11y.key_enter',
                actionFallback: 'Commits the typed value in the focused channel input (native input onChange).'
            }
        ],
        notes: [
            {
                noteKey: 'components.color_picker_edit.a11y.labels',
                noteFallback: 'Each input is paired with a visible channel label (R, G, B, A, #…). Consumers should provide an accessible aria-label or wrap in a <fieldset><legend> when embedding standalone.'
            },
            {
                noteKey: 'components.color_picker_edit.a11y.disabled',
                noteFallback: 'When disabled=true, the native disabled attribute is set on every input, preventing keyboard and pointer interaction.'
            },
            {
                noteKey: 'components.color_picker_edit.a11y.cycle_button',
                noteFallback: 'The mode cycle button (origam-btn) has an icon only — always pair with an aria-label on the parent ColorPicker or provide a tooltip.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/color-picker.json',
        pipelineNote: 'ColorPickerEdit shares the color-picker.json token file. Relevant section: color-picker.edit.*.',
        excerpt: [
            {
                tokenPath: 'color-picker.edit.input-width',
                value: '48px',
                type: 'dimension',
                descriptionKey: 'components.color_picker_edit.tokens.input_width',
                descriptionFallback: 'Width of each channel input field.'
            },
            {
                tokenPath: 'color-picker.edit.gap',
                value: '{space.2}',
                type: 'dimension',
                descriptionKey: 'components.color_picker_edit.tokens.gap',
                descriptionFallback: 'Gap between fields.'
            },
            {
                tokenPath: 'color-picker.edit.label-color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.color_picker_edit.tokens.label_color',
                descriptionFallback: 'Channel label colour.'
            },
            {
                tokenPath: 'color-picker.edit.label-font-size',
                value: '{font.size.xs}',
                type: 'dimension',
                descriptionKey: 'components.color_picker_edit.tokens.label_font_size',
                descriptionFallback: 'Channel label font size.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'mode',
                kind: 'select',
                labelKey: 'components.color_picker_edit.playground.mode',
                labelFallback: 'Mode',
                defaultValue: 'rgba',
                options: [
                    { label: 'rgb', value: 'rgb' },
                    { label: 'rgba', value: 'rgba' },
                    { label: 'hsl', value: 'hsl' },
                    { label: 'hsla', value: 'hsla' },
                    { label: 'hex', value: 'hex' },
                    { label: 'hexa', value: 'hexa' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.color_picker_edit.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
