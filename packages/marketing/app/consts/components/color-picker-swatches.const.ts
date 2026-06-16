/**
 * /components/color-picker-swatches — full documentation data for OrigamColorPickerSwatches.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ColorPicker/color-picker-swatches.interface.ts  (IColorPickerSwatchesProps, IColorPickerSwatchesEmits)
 *   - packages/ds/src/components/ColorPicker/OrigamColorPickerSwatches.vue        (template BEM, defineExpose, SCSS)
 *   - packages/ds/tokens/component/color-picker.json                              (swatches.* tokens)
 *
 * PARENT: color-picker
 * FAMILY: ColorPicker/ sub-components
 */
import type {
    IComponentDoc,
    IComponentExposed,
    IComponentA11y,
    IComponentCssVar,
    IComponentTokens
} from '~/interfaces/components-catalog.interface'

export const COLOR_PICKER_SWATCHES_DOC: IComponentDoc = {
    slug: 'color-picker-swatches',
    name: 'ColorPickerSwatches',
    tag: 'origam-color-picker-swatches',
    icon: 'mdi-palette-swatch',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.color_picker_swatches.description',
    descriptionFallback: 'Scrollable grid of predefined colour swatches. Clicking a swatch emits the selected HSVA colour.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-colorpicker--design',
    docUrl: 'http://localhost:4000/components/ColorPicker/OrigamColorPicker',

    parentSlug: 'color-picker',

    family: [
        {
            slug: 'color-picker',
            name: 'ColorPicker',
            descriptionKey: 'components.catalog.color_picker.description',
            descriptionFallback: 'Full-featured HSVA colour picker. Composes canvas, preview, edit and swatches.'
        },
        {
            slug: 'color-picker-canvas',
            name: 'ColorPickerCanvas',
            descriptionKey: 'components.catalog.color_picker_canvas.description',
            descriptionFallback: 'Gradient canvas where the user drags or keyboard-navigates a cursor to pick saturation and brightness.'
        },
        {
            slug: 'color-picker-preview',
            name: 'ColorPickerPreview',
            descriptionKey: 'components.catalog.color_picker_preview.description',
            descriptionFallback: 'Hue and alpha sliders with a colour preview swatch.'
        },
        {
            slug: 'color-picker-edit',
            name: 'ColorPickerEdit',
            descriptionKey: 'components.catalog.color_picker_edit.description',
            descriptionFallback: 'Inline input fields for HEX/RGB/HSL/HSV editing.'
        }
    ],

    props: [
        {
            name: 'colorHsv',
            type: { label: 'THSVA | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_swatches.props.color_hsv.description',
            descriptionFallback: 'Current colour in HSVA format. Used to display a checkmark on the active swatch.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_swatches.props.disabled.description',
            descriptionFallback: 'Disables click interaction on all swatches.'
        },
        {
            name: 'swatches',
            type: { label: 'Array<Array<TColorType>>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_swatches.props.swatches.description',
            descriptionFallback: 'Array of colour columns. Each column is an array of TColorType values (hex string, RGB object, etc.). Rendered as a grid of swatch tiles.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '150',
            descriptionKey: 'components.color_picker_swatches.props.max_height.description',
            descriptionFallback: 'Maximum height of the scrollable swatch area in pixels. Defaults to 150.'
        }
    ],

    emits: [
        {
            event: 'update:colorHsv',
            payload: { label: 'THSVA', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker_swatches.emits.update_color_hsv.description',
            descriptionFallback: 'Fired when a swatch tile is clicked. Emits the selected colour converted to HSVA.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.color_picker_swatches.examples.standalone.title',
            titleFallback: 'Standalone swatches',
            lang: 'vue',
            code: `<script setup>
import { ref } from 'vue'
const color = ref({ h: 0, s: 1, v: 1, a: 1 })
const palette = [
  ['#f44336', '#e91e63', '#9c27b0'],
  ['#3f51b5', '#2196f3', '#03a9f4'],
  ['#4caf50', '#8bc34a', '#cddc39'],
  ['#ffeb3b', '#ffc107', '#ff9800']
]
</script>
<template>
  <origam-color-picker-swatches
    v-model:color-hsv="color"
    :swatches="palette"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-color-picker-swatches',
        svgViewBox: '0 0 480 160',
        svgTitle: 'Anatomy of OrigamColorPickerSwatches',
        svgDesc: 'Schematic of ColorPickerSwatches with 3 internal parts.',
        svg: `
  <rect x="0" y="0" width="480" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="440" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="32" y="32" width="60" height="96" rx="2" fill="var(--origam-color__surface---sunken, #f3e8ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1"/>
  <rect x="36" y="36" width="52" height="16" rx="2" fill="#f44336"/>
  <rect x="36" y="56" width="52" height="16" rx="2" fill="#e91e63"/>
  <rect x="36" y="76" width="52" height="16" rx="2" fill="#9c27b0"/>
  <rect x="36" y="96" width="52" height="16" rx="2" fill="#7c3aed"/>
  <rect x="100" y="32" width="60" height="96" rx="2" fill="var(--origam-color__surface---sunken, #f3e8ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1"/>
  <rect x="104" y="36" width="52" height="16" rx="2" fill="#3f51b5"/>
  <rect x="104" y="56" width="52" height="16" rx="2" fill="#2196f3"/>
  <rect x="104" y="76" width="52" height="16" rx="2" fill="#03a9f4"/>
  <rect x="104" y="96" width="52" height="16" rx="2" fill="#00bcd4"/>
  <rect x="168" y="32" width="60" height="96" rx="2" fill="var(--origam-color__surface---sunken, #f3e8ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1"/>
  <rect x="172" y="36" width="52" height="16" rx="2" fill="#4caf50"/>
  <rect x="172" y="56" width="52" height="16" rx="2" fill="#8bc34a"/>
  <rect x="172" y="76" width="52" height="16" rx="2" fill="#cddc39"/>
  <rect x="172" y="96" width="52" height="16" rx="2" fill="#ffeb3b"/>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="34" cy="34" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="34" y="38" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="38" cy="38" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="38" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="37" y1="28" x2="280" y2="16" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="284" y="19" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-color-picker-swatches</text>
  <line x1="43" y1="34" x2="280" y2="40" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="284" y="43" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__swatch (column)</text>
  <line x1="47" y1="40" x2="280" y2="64" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="284" y="67" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__color (tile, 45x18px)</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-color-picker-swatches&gt;</code> — 3 parts: scrollable root ①, column wrapper ②, colour tile ③.',
        legend: [
            {
                num: 1,
                cls: '.origam-color-picker-swatches',
                descriptionKey: 'components.color_picker_swatches.anatomy.root',
                descriptionFallback: 'Root <code>&lt;div&gt;</code> with <code>overflow-y: auto</code>. <code>maxHeight</code> is injected as inline style to cap the scrollable area.'
            },
            {
                num: 2,
                cls: '.origam-color-picker-swatches__swatch',
                descriptionKey: 'components.color_picker_swatches.anatomy.swatch',
                descriptionFallback: 'Column wrapper rendered per item in the outer <code>swatches</code> array. <code>display: flex; flex-direction: column</code>.'
            },
            {
                num: 3,
                cls: '.origam-color-picker-swatches__color',
                descriptionKey: 'components.color_picker_swatches.anatomy.color',
                descriptionFallback: 'Individual swatch tile (45x18px). Has a checkerboard underlay for transparency. Renders a checkmark icon (<code>OrigamIcon</code>) when the tile matches the current colour.'
            }
        ],
        code: `<div class="origam-color-picker-swatches" :style="{ maxHeight }">
  <div v-for="swatch in swatches" class="origam-color-picker-swatches__swatch">
    <div
      v-for="color in swatch"
      class="origam-color-picker-swatches__color"
      @click="handleUpdateColor(color)"
    >
      <div :style="{ backgroundColor: background(color) }">
        <!-- checkmark shown when color matches current selection -->
        <origam-icon v-if="isActive(color)" :icon="MDI_ICONS.CHECK_CIRCLE_OUTLINE" />
      </div>
    </div>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-color-picker-swatches',
                descriptionKey: 'components.color_picker_swatches.anatomy.root',
                descriptionFallback: 'Root scrollable container. Outer div of the grid.'
            },
            {
                cls: 'origam-color-picker-swatches__swatch',
                descriptionKey: 'components.color_picker_swatches.anatomy.swatch',
                descriptionFallback: 'Column flex container. One per entry in the swatches array.'
            },
            {
                cls: 'origam-color-picker-swatches__color',
                descriptionKey: 'components.color_picker_swatches.anatomy.color',
                descriptionFallback: 'Individual swatch tile with click handler. 45x18px, border-radius 2px.'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-color-picker-swatches---item-size',
            defaultValue: '20px',
            descriptionKey: 'components.color_picker_swatches.css_vars.item_size',
            descriptionFallback: 'Size of individual swatch colour tiles.'
        },
        {
            name: '--origam-color-picker-swatches---gap',
            defaultValue: '{space.1}',
            descriptionKey: 'components.color_picker_swatches.css_vars.gap',
            descriptionFallback: 'Gap between swatch tiles.'
        },
        {
            name: '--origam-color-picker-swatches---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.color_picker_swatches.css_vars.border_radius',
            descriptionFallback: 'Border-radius of each swatch tile.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.color_picker_swatches.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.color_picker_swatches.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.color_picker_swatches.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.color_picker_swatches.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.color_picker_swatches.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.color_picker_swatches.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.color_picker_swatches.a11y.key_tab',
                actionFallback: 'Navigates between interactive swatch tiles.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.color_picker_swatches.a11y.key_activate',
                actionFallback: 'Selects the focused swatch and emits update:colorHsv.'
            }
        ],
        notes: [
            {
                noteKey: 'components.color_picker_swatches.a11y.contrast_note',
                noteFallback: 'The checkmark icon colour is automatically chosen for contrast: white on dark colours and black on light colours (getContrast utility, threshold >2).'
            },
            {
                noteKey: 'components.color_picker_swatches.a11y.aria_note',
                noteFallback: 'Swatch tiles do not currently expose aria-label with the colour value. It is recommended to add aria-label with the hex value when using the component standalone.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/color-picker.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Swatch-specific tokens live under the color-picker.swatches namespace.',
        excerpt: [
            {
                tokenPath: 'color-picker.swatches.item-size',
                value: '20px',
                type: 'dimension',
                descriptionKey: 'components.color_picker_swatches.tokens.item_size',
                descriptionFallback: 'Size of each swatch tile.'
            },
            {
                tokenPath: 'color-picker.swatches.gap',
                value: '{space.1}',
                type: 'dimension',
                descriptionKey: 'components.color_picker_swatches.tokens.gap',
                descriptionFallback: 'Gap between swatch tiles in the grid.'
            },
            {
                tokenPath: 'color-picker.swatches.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.color_picker_swatches.tokens.border_radius',
                descriptionFallback: 'Border-radius of individual swatch tiles.'
            },
            {
                tokenPath: 'color-picker.swatches.border-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.color_picker_swatches.tokens.border_color',
                descriptionFallback: 'Border colour of swatch tiles.'
            }
        ]
    } satisfies IComponentTokens
}
