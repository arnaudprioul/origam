/**
 * /components/color-picker — full documentation data for OrigamColorPicker.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ColorPicker/color-picker.interface.ts         (IColorPickerProps, IColorPickerEmits)
 *   - packages/ds/src/interfaces/ColorPicker/color-picker-canvas.interface.ts  (IColorPickerCanvasProps)
 *   - packages/ds/src/interfaces/ColorPicker/color-picker-edit.interface.ts    (IColorPickerEditProps)
 *   - packages/ds/src/interfaces/ColorPicker/color-picker-preview.interface.ts (IColorPickerPreviewProps)
 *   - packages/ds/src/interfaces/ColorPicker/color-picker-swatches.interface.ts(IColorPickerSwatchesProps)
 *   - packages/ds/src/components/ColorPicker/OrigamColorPicker.vue             (template, defineExpose)
 *   - packages/ds/tokens/component/color-picker.json                           (CSS tokens)
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

export const COLOR_PICKER_DOC: IComponentDoc = {
    slug: 'color-picker',
    name: 'ColorPicker',
    tag: 'origam-color-picker',
    icon: 'mdi-palette',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.color_picker.description',
    descriptionFallback: 'Full-featured HSVA colour picker. Includes a gradient canvas, hue/alpha sliders, hex/RGB/HSL/HSV input fields and optional swatches. Composes OrigamColorPickerCanvas, OrigamColorPickerPreview, OrigamColorPickerEdit and OrigamColorPickerSwatches.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-colorpicker--design',
    docUrl: 'http://localhost:4000/components/ColorPicker/OrigamColorPicker',

    family: [
        {
            slug: 'color-picker-canvas',
            name: 'ColorPickerCanvas',
            descriptionKey: 'components.catalog.color_picker_canvas.description',
            descriptionFallback: 'Gradient canvas where the user drags a cursor to pick saturation and brightness.'
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
            descriptionFallback: 'Inline input fields for HEX / RGB / HSL / HSV editing with mode switcher.'
        },
        {
            slug: 'color-picker-swatches',
            name: 'ColorPickerSwatches',
            descriptionKey: 'components.catalog.color_picker_swatches.description',
            descriptionFallback: 'Grid of predefined colour swatches for quick selection.'
        }
    ],

    related: [
        {
            slug: 'color-picker-field',
            name: 'ColorPickerField',
            kind: 'component',
            descriptionKey: 'components.catalog.color_picker_field.description',
            descriptionFallback: 'Text field that embeds ColorPicker in a dropdown popover.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'Record<string, unknown> | string | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.model_value.description',
            descriptionFallback: 'Currently selected colour. Accepts a hex string, RGB/HSL/HSV object, or null. Use v-model for two-way binding.'
        },
        {
            name: 'canvasHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '150',
            descriptionKey: 'components.color_picker.props.canvas_height.description',
            descriptionFallback: 'Height of the gradient canvas in pixels or a CSS length.'
        },
        {
            name: 'canvasWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.canvas_width.description',
            descriptionFallback: 'Width of the gradient canvas. Defaults to 100% of the picker width.'
        },
        {
            name: 'hideCanvas',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker.props.hide_canvas.description',
            descriptionFallback: 'Hides the gradient canvas section entirely.'
        },
        {
            name: 'hideSliders',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker.props.hide_sliders.description',
            descriptionFallback: 'Hides the hue and alpha slider strip.'
        },
        {
            name: 'hideInputs',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker.props.hide_inputs.description',
            descriptionFallback: 'Hides the text input fields (HEX / RGB / HSL / HSV).'
        },
        {
            name: 'showSwatches',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker.props.show_swatches.description',
            descriptionFallback: 'Shows the swatch grid below the inputs.'
        },
        {
            name: 'swatchesMaxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.swatches_max_height.description',
            descriptionFallback: 'Maximum height of the swatch grid. Adds a scrollbar when the swatch list overflows.'
        },
        // ── IColorPickerCanvasProps (forwarded) ────────────────────────
        {
            name: 'colorHsv',
            type: { label: 'THSVA', slug: 'hsva', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.color_hsv.description',
            descriptionFallback: 'Internal HSVA colour representation forwarded to sub-components. Not typically set by consumers — use modelValue instead.'
        },
        {
            name: 'dotSize',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.dot_size.description',
            descriptionFallback: 'Size of the drag cursor on the canvas.'
        },
        // ── IColorPickerEditProps (forwarded) ──────────────────────────
        {
            name: 'mode',
            type: { label: 'TColorModes', slug: 'color-modes', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.mode.description',
            descriptionFallback: "Active colour input mode. Accepted: 'hex' | 'rgb' | 'hsl' | 'hsv' | 'rgba' | 'hsla' | 'hsva'."
        },
        {
            name: 'modes',
            type: { label: 'TColorModes[]', slug: 'color-modes', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.modes.description',
            descriptionFallback: 'Allowed colour input modes shown in the mode switcher.'
        },
        // ── IColorPickerSwatchesProps (forwarded) ──────────────────────
        {
            name: 'swatches',
            type: { label: 'Array<Array<TColorType>>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.swatches.description',
            descriptionFallback: 'Grid of swatches as a 2-D array of colour values. Each inner array is one row.'
        },
        // ── IColorProps / IPickerProps / IBorderProps etc. ─────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.color.description',
            descriptionFallback: 'Accent intent colour (e.g. active slider thumb colour).'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker.props.border.description',
            descriptionFallback: 'Applies a border to the picker panel.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the picker panel.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker.props.disabled.description',
            descriptionFallback: 'Disables all interaction. Canvas drag, slider drag and text inputs become non-interactive.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'Record<string, unknown> | string | undefined | null', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selected colour changes. Payload matches the format of modelValue.'
        },
        {
            event: 'update:mode',
            payload: { label: 'TColorModes', slug: 'color-modes', kind: 'type' },
            descriptionKey: 'components.color_picker.emits.update_mode.description',
            descriptionFallback: 'Fired when the user switches the active input mode.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.color_picker.slots.default.description',
            descriptionFallback: 'Replaces the built-in canvas + controls + swatches layout. Use when you need a fully custom inner structure.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.color_picker.slots.title.description',
            descriptionFallback: 'Title area at the top of the picker panel (forwarded from OrigamPicker).'
        },
        {
            slot: 'header',
            slotProps: '—',
            descriptionKey: 'components.color_picker.slots.header.description',
            descriptionFallback: 'Header area below the title (forwarded from OrigamPicker).'
        },
        {
            slot: 'actions',
            slotProps: '—',
            descriptionKey: 'components.color_picker.slots.actions.description',
            descriptionFallback: 'Action buttons at the bottom of the picker panel (forwarded from OrigamPicker). Ideal for Cancel / Apply buttons.'
        }
    ],

    examples: [
        {
            titleKey: 'components.color_picker.examples.basic.title',
            titleFallback: 'Basic colour picker',
            lang: 'vue',
            code: `<template>
  <origam-color-picker v-model="colour" />
</template>

<script setup lang="ts">
const colour = ref('#7c3aed')
</script>`
        },
        {
            titleKey: 'components.color_picker.examples.swatches.title',
            titleFallback: 'With swatches',
            lang: 'vue',
            code: `<template>
  <origam-color-picker
    v-model="colour"
    show-swatches
    :swatches="palette"
    hide-canvas
  />
</template>

<script setup lang="ts">
const colour = ref('#7c3aed')
const palette = [
  ['#7c3aed', '#a855f7', '#d946ef'],
  ['#2563eb', '#0ea5e9', '#06b6d4'],
  ['#16a34a', '#84cc16', '#eab308']
]
</script>`
        },
        {
            titleKey: 'components.color_picker.examples.with_actions.title',
            titleFallback: 'With action buttons',
            lang: 'vue',
            code: `<template>
  <origam-color-picker v-model="draft">
    <template #actions>
      <origam-btn variant="text" text="Cancel" @click="cancel" />
      <origam-btn color="primary" text="Apply" @click="apply" />
    </template>
  </origam-color-picker>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-color-picker',
        svgViewBox: '0 0 700 300',
        svgTitle: 'Anatomy of OrigamColorPicker',
        svgDesc: 'Schematic of the ColorPicker with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="300" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="175" y="20" width="350" height="260" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="183" y="28" width="334" height="120" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.7"/>
  <circle cx="310" cy="88" r="8" fill="white" stroke="white" stroke-width="2" opacity="0.9"/>
  <rect x="183" y="156" width="334" height="24" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.06))"/>
  <rect x="195" y="162" width="28" height="12" rx="6" fill="#7c3aed"/>
  <rect x="233" y="162" width="270" height="12" rx="6" fill="linear-gradient(to right, red, blue)"/>
  <rect x="183" y="186" width="334" height="24" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.04))"/>
  <text x="350" y="202" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">HEX / RGB / HSL inputs</text>
  <rect x="183" y="218" width="334" height="52" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.04))"/>
  <text x="350" y="248" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">Swatches (optional)</text>
  <circle cx="183" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="183" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="310" cy="80" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="310" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="195" cy="156" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="195" y="160" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="350" cy="180" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="350" y="184" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="350" cy="212" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="216" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="350" cy="265" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="350" y="269" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <text x="350" y="290" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Each sub-component emits update:colorHsv — changes bubble up to OrigamColorPicker</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-color-picker&gt;</code> — 6 composable regions.`,
        legend: [
            { num: 1, cls: '.origam-color-picker', descriptionKey: 'components.color_picker.anatomy.root', descriptionFallback: 'Root element wrapping OrigamPicker. Inherits picker chrome (title, header, actions slots).' },
            { num: 2, cls: '.origam-color-picker-canvas', descriptionKey: 'components.color_picker.anatomy.canvas', descriptionFallback: 'Gradient canvas (OrigamColorPickerCanvas). Drag to change saturation + value. Hidden when hideCanvas=true.' },
            { num: 3, cls: '.origam-color-picker-preview', descriptionKey: 'components.color_picker.anatomy.preview', descriptionFallback: 'Hue and alpha sliders + preview swatch (OrigamColorPickerPreview). Hidden when hideSliders=true.' },
            { num: 4, cls: '.origam-color-picker__controls', descriptionKey: 'components.color_picker.anatomy.controls', descriptionFallback: 'Row grouping the preview strip and edit inputs.' },
            { num: 5, cls: '.origam-color-picker-edit', descriptionKey: 'components.color_picker.anatomy.edit', descriptionFallback: 'Input fields + mode switcher (OrigamColorPickerEdit). Hidden when hideInputs=true.' },
            { num: 6, cls: '.origam-color-picker-swatches', descriptionKey: 'components.color_picker.anatomy.swatches', descriptionFallback: 'Predefined swatch grid (OrigamColorPickerSwatches). Visible only when showSwatches=true.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-picker class="origam-color-picker">
  <!-- canvas (drag cursor to pick S+V) -->
  <origam-color-picker-canvas
    :color-hsv="currentColor"
    :height="canvasHeight"
    @update:color-hsv="handleUpdateColor"
  />

  <!-- controls: preview sliders + input fields -->
  <div class="origam-color-picker__controls">
    <origam-color-picker-preview
      :color-hsv="currentColor"
      :hide-alpha="!mode.endsWith('a')"
      @update:color-hsv="handleUpdateColor"
    />
    <origam-color-picker-edit
      :color-hsv="currentColor"
      :mode="mode"
      :modes="modes"
      @update:mode="handleUpdateMode"
      @update:color-hsv="handleUpdateColor"
    />
  </div>

  <!-- swatches grid (optional) -->
  <origam-color-picker-swatches
    v-if="showSwatches"
    :color-hsv="currentColor"
    @update:color-hsv="handleUpdateColor"
  />

  <!-- #actions slot forwarded from OrigamPicker -->
  <template #actions>
    <slot name="actions" />
  </template>
</origam-picker>`,
        classes: [
            { cls: 'origam-color-picker', descriptionKey: 'components.color_picker.anatomy.root', descriptionFallback: 'Root picker panel.' },
            { cls: 'origam-color-picker__controls', descriptionKey: 'components.color_picker.anatomy.controls', descriptionFallback: 'Row grouping preview sliders + inputs.' },
            { cls: 'origam-color-picker-canvas', descriptionKey: 'components.color_picker.anatomy.canvas', descriptionFallback: 'Gradient canvas sub-component.' },
            { cls: 'origam-color-picker-preview', descriptionKey: 'components.color_picker.anatomy.preview', descriptionFallback: 'Hue/alpha sliders + preview swatch.' },
            { cls: 'origam-color-picker-edit', descriptionKey: 'components.color_picker.anatomy.edit', descriptionFallback: 'HEX/RGB/HSL/HSV input fields.' },
            { cls: 'origam-color-picker-swatches', descriptionKey: 'components.color_picker.anatomy.swatches', descriptionFallback: 'Predefined colour swatches grid.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-color-picker---background-color',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.color_picker.css_vars.bg',
            descriptionFallback: 'Picker panel background colour.'
        },
        {
            name: '--origam-color-picker---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.color_picker.css_vars.border_radius',
            descriptionFallback: 'Picker panel corner radius.'
        },
        {
            name: '--origam-color-picker---min-width',
            defaultValue: '300px',
            descriptionKey: 'components.color_picker.css_vars.min_width',
            descriptionFallback: 'Minimum width of the picker panel.'
        },
        {
            name: '--origam-color-picker__canvas---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.color_picker.css_vars.canvas_border_radius',
            descriptionFallback: 'Canvas corner radius.'
        },
        {
            name: '--origam-color-picker__cursor---size',
            defaultValue: '16px',
            descriptionKey: 'components.color_picker.css_vars.cursor_size',
            descriptionFallback: 'Size of the drag cursor circle on the canvas.'
        },
        {
            name: '--origam-color-picker__preview---width',
            defaultValue: '32px',
            descriptionKey: 'components.color_picker.css_vars.preview_width',
            descriptionFallback: 'Width of the current colour preview swatch.'
        },
        {
            name: '--origam-color-picker__preview---height',
            defaultValue: '32px',
            descriptionKey: 'components.color_picker.css_vars.preview_height',
            descriptionFallback: 'Height of the current colour preview swatch.'
        },
        {
            name: '--origam-color-picker__swatches---item-size',
            defaultValue: '20px',
            descriptionKey: 'components.color_picker.css_vars.swatches_item_size',
            descriptionFallback: 'Size of each swatch tile.'
        },
        {
            name: '--origam-color-picker__hue-slider---height',
            defaultValue: '12px',
            descriptionKey: 'components.color_picker.css_vars.hue_slider_height',
            descriptionFallback: 'Height of the hue slider track.'
        },
        {
            name: '--origam-color-picker__alpha-slider---height',
            defaultValue: '12px',
            descriptionKey: 'components.color_picker.css_vars.alpha_slider_height',
            descriptionFallback: 'Height of the alpha slider track.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.color_picker.exposed.filter_props',
            descriptionFallback: 'Utility to forward filtered props to OrigamPicker or sub-components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.color_picker.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.color_picker.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.color_picker.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.color_picker.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.color_picker.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.color_picker.a11y.key_tab',
                actionFallback: 'Moves focus between canvas, sliders, input fields and mode switcher.'
            },
            {
                key: 'Arrow keys (canvas)',
                actionKey: 'components.color_picker.a11y.key_canvas_arrows',
                actionFallback: 'Moves the canvas cursor by 1% increments in saturation/value. Allows precise colour selection without a mouse.'
            },
            {
                key: 'Arrow keys (sliders)',
                actionKey: 'components.color_picker.a11y.key_slider_arrows',
                actionFallback: 'Adjusts the hue or alpha slider value by 1 step.'
            }
        ],
        notes: [
            {
                noteKey: 'components.color_picker.a11y.canvas_label',
                noteFallback: 'The canvas carries an aria-label describing the gradient region. The drag cursor position is announced via aria-valuemin/valuemax/valuenow attributes.'
            },
            {
                noteKey: 'components.color_picker.a11y.input_labels',
                noteFallback: 'Each text input has a visible label matching the mode (HEX, R, G, B, H, S, L…). Screen readers read the label and current value together.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/color-picker.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'color-picker.background-color', value: '{color.surface.raised}', type: 'color', descriptionKey: 'components.color_picker.tokens.bg', descriptionFallback: 'Picker panel background.' },
            { tokenPath: 'color-picker.border-radius', value: '{radius.md}', type: 'dimension', descriptionKey: 'components.color_picker.tokens.border_radius', descriptionFallback: 'Panel corner radius.' },
            { tokenPath: 'color-picker.min-width', value: '300px', type: 'dimension', descriptionKey: 'components.color_picker.tokens.min_width', descriptionFallback: 'Minimum picker width.' },
            { tokenPath: 'color-picker.canvas.height', value: '150px', type: 'dimension', descriptionKey: 'components.color_picker.tokens.canvas_height', descriptionFallback: 'Default canvas height.' },
            { tokenPath: 'color-picker.cursor.size', value: '16px', type: 'dimension', descriptionKey: 'components.color_picker.tokens.cursor_size', descriptionFallback: 'Drag cursor diameter.' },
            { tokenPath: 'color-picker.hue-slider.height', value: '12px', type: 'dimension', descriptionKey: 'components.color_picker.tokens.hue_slider_height', descriptionFallback: 'Hue slider track height.' },
            { tokenPath: 'color-picker.swatches.item-size', value: '20px', type: 'dimension', descriptionKey: 'components.color_picker.tokens.swatch_size', descriptionFallback: 'Swatch tile size.' },
            { tokenPath: 'color-picker.edit.gap', value: '{space.2}', type: 'dimension', descriptionKey: 'components.color_picker.tokens.edit_gap', descriptionFallback: 'Gap between edit input fields.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'hideCanvas',
                kind: 'switch',
                labelKey: 'components.color_picker.playground.hide_canvas',
                labelFallback: 'Hide canvas',
                defaultValue: false
            },
            {
                prop: 'hideSliders',
                kind: 'switch',
                labelKey: 'components.color_picker.playground.hide_sliders',
                labelFallback: 'Hide sliders',
                defaultValue: false
            },
            {
                prop: 'hideInputs',
                kind: 'switch',
                labelKey: 'components.color_picker.playground.hide_inputs',
                labelFallback: 'Hide inputs',
                defaultValue: false
            },
            {
                prop: 'showSwatches',
                kind: 'switch',
                labelKey: 'components.color_picker.playground.show_swatches',
                labelFallback: 'Show swatches',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.color_picker.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
