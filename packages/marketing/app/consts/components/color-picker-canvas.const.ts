/**
 * /components/color-picker-canvas — full documentation data for OrigamColorPickerCanvas.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ColorPicker/color-picker-canvas.interface.ts  (IColorPickerCanvasProps, IColorPickerCanvasEmits)
 *   - packages/ds/src/components/ColorPicker/OrigamColorPickerCanvas.vue       (template BEM, keyboard events, defineExpose)
 *
 * PARENT: color-picker
 * FAMILY: ColorPicker/ sub-components
 */
import type {
    IComponentDoc,
    IComponentExposed,
    IComponentA11y
} from '~/interfaces/components-catalog.interface'

export const COLOR_PICKER_CANVAS_DOC: IComponentDoc = {
    slug: 'color-picker-canvas',
    name: 'ColorPickerCanvas',
    tag: 'origam-color-picker-canvas',
    icon: 'mdi-gradient-horizontal',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.color_picker_canvas.description',
    descriptionFallback: 'Gradient canvas where the user drags or keyboard-navigates a cursor to pick saturation and brightness from the HSV colour space.',
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
        },
        {
            slug: 'color-picker-swatches',
            name: 'ColorPickerSwatches',
            descriptionKey: 'components.catalog.color_picker_swatches.description',
            descriptionFallback: 'Grid of predefined colour swatches.'
        }
    ],

    props: [
        {
            name: 'colorHsv',
            type: { label: 'THSVA | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_canvas.props.color_hsv.description',
            descriptionFallback: 'Current colour in HSVA format { h, s, v, a }. The canvas re-renders the gradient when hue changes.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_canvas.props.disabled.description',
            descriptionFallback: 'Disables pointer and keyboard interaction. The dot renders with reduced opacity.'
        },
        {
            name: 'dotSize',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_canvas.props.dot_size.description',
            descriptionFallback: 'Size of the draggable dot cursor in pixels.'
        },
        {
            name: 'ariaLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_canvas.props.aria_label.description',
            descriptionFallback: 'Overrides the default localised aria-label on the canvas element.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '150',
            descriptionKey: 'components.color_picker_canvas.props.height.description',
            descriptionFallback: 'Canvas height in pixels. Defaults to 150.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: "'100%'",
            descriptionKey: 'components.color_picker_canvas.props.width.description',
            descriptionFallback: 'Canvas width. Defaults to 100% of the container.'
        }
    ],

    emits: [
        {
            event: 'update:colorHsv',
            payload: { label: 'THSVA', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker_canvas.emits.update_color_hsv.description',
            descriptionFallback: 'Fired on pointer drag or keyboard navigation. Emits the updated HSVA colour object.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.color_picker_canvas.examples.standalone.title',
            titleFallback: 'Standalone canvas',
            lang: 'vue',
            code: `<script setup>
import { ref } from 'vue'
const color = ref({ h: 0, s: 1, v: 1, a: 1 })
</script>
<template>
  <origam-color-picker-canvas v-model:color-hsv="color" />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-color-picker-canvas',
        svgViewBox: '0 0 500 160',
        svgTitle: 'Anatomy of OrigamColorPickerCanvas',
        svgDesc: 'Schematic of ColorPickerCanvas with 3 internal parts.',
        svg: `
  <rect x="0" y="0" width="500" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="280" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <defs>
    <linearGradient id="grad-s" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="white"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <linearGradient id="grad-v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="100%" stop-color="black"/>
    </linearGradient>
  </defs>
  <rect x="20" y="20" width="280" height="120" rx="4" fill="url(#grad-s)"/>
  <rect x="20" y="20" width="280" height="120" rx="4" fill="url(#grad-v)"/>
  <rect x="22" y="22" width="276" height="116" rx="3" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <circle cx="180" cy="60" r="8" fill="none" stroke="white" stroke-width="2" filter="drop-shadow(0 0 2px rgba(0,0,0,0.5))"/>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="176" cy="56" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="176" y="60" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="30" cy="130" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="30" y="134" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="37" y1="28" x2="330" y2="20" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="334" y="23" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-color-picker-canvas</text>
  <line x1="185" y1="56" x2="330" y2="60" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="334" y="63" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__dot (draggable cursor)</text>
  <line x1="39" y1="130" x2="330" y2="100" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="334" y="103" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">canvas (aria-hidden)</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-color-picker-canvas&gt;</code> — 3 parts. The gradient is drawn on a <code>&lt;canvas&gt;</code> element; the dot follows pointer/keyboard.',
        legend: [
            {
                num: 1,
                cls: '.origam-color-picker-canvas',
                descriptionKey: 'components.color_picker_canvas.anatomy.root',
                descriptionFallback: 'Root <code>&lt;div&gt;</code> with <code>role="application"</code>, <code>tabindex="0"</code>, keyboard and pointer listeners. Observed by <code>useResizeObserver</code> to keep the canvas dimensions in sync.'
            },
            {
                num: 2,
                cls: '.origam-color-picker-canvas__dot',
                descriptionKey: 'components.color_picker_canvas.anatomy.dot',
                descriptionFallback: 'Absolute circle that follows the current saturation/value position. Has <code>--disabled</code> modifier when disabled.'
            },
            {
                num: 3,
                cls: 'canvas (internal)',
                descriptionKey: 'components.color_picker_canvas.anatomy.canvas',
                descriptionFallback: 'Native <code>&lt;canvas&gt;</code> element with <code>aria-hidden="true"</code>. The saturation/value gradient is painted via Canvas 2D API.'
            }
        ],
        code: `<div class="origam-color-picker-canvas" role="application" tabindex="0">
  <canvas aria-hidden="true" />
  <div class="origam-color-picker-canvas__dot" />
</div>`,
        classes: [
            {
                cls: 'origam-color-picker-canvas',
                descriptionKey: 'components.color_picker_canvas.anatomy.root',
                descriptionFallback: 'Root container with overflow hidden and touch-action none.'
            },
            {
                cls: 'origam-color-picker-canvas__dot',
                descriptionKey: 'components.color_picker_canvas.anatomy.dot',
                descriptionFallback: 'Draggable cursor rendered as an absolute circle.'
            },
            {
                cls: 'origam-color-picker-canvas__dot--disabled',
                descriptionKey: 'components.color_picker_canvas.anatomy.dot_disabled',
                descriptionFallback: 'Applied when disabled=true. Reduces shadow opacity.'
            }
        ]
    },

    cssVars: [],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.color_picker_canvas.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.color_picker_canvas.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.color_picker_canvas.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.color_picker_canvas.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.color_picker_canvas.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.color_picker_canvas.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['application'],
        keyboard: [
            {
                key: 'Arrow keys',
                actionKey: 'components.color_picker_canvas.a11y.key_arrows',
                actionFallback: 'Moves the colour cursor by ±1% saturation (horizontal) or value (vertical). Hold Shift for ±5% steps.'
            },
            {
                key: 'Home / End',
                actionKey: 'components.color_picker_canvas.a11y.key_home_end',
                actionFallback: 'Home sets saturation to 0 (fully desaturated). End sets saturation to 1 (fully saturated).'
            },
            {
                key: 'Page Up / Page Down',
                actionKey: 'components.color_picker_canvas.a11y.key_page',
                actionFallback: 'Page Up sets value to 1 (fully bright). Page Down sets value to 0 (black).'
            }
        ],
        notes: [
            {
                noteKey: 'components.color_picker_canvas.a11y.role',
                noteFallback: 'The root element uses role="application" and aria-valuetext exposing the current saturation and brightness percentages. The underlying canvas element has aria-hidden="true".'
            },
            {
                noteKey: 'components.color_picker_canvas.a11y.focus',
                noteFallback: 'Focus-visible outline (2px solid --origam-color__border---focus) is applied on :focus-visible. The component is focusable via tabindex="0".'
            }
        ]
    } satisfies IComponentA11y
}
