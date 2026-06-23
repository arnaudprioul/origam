/**
 * /components/color-picker-preview — full documentation data for OrigamColorPickerPreview.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ColorPicker/color-picker-preview.interface.ts  (IColorPickerPreviewProps, IColorPickerPreviewEmits)
 *   - packages/ds/src/components/ColorPicker/OrigamColorPickerPreview.vue        (template BEM, defineExpose, SCSS)
 *   - packages/ds/tokens/component/color-picker.json                             (preview.* tokens)
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

export const COLOR_PICKER_PREVIEW_DOC: IComponentDoc = {
    slug: 'color-picker-preview',
    name: 'ColorPickerPreview',
    tag: 'origam-color-picker-preview',
    icon: 'mdi-eyedropper-variant',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.color_picker_preview.description',
    descriptionFallback: 'Hue and alpha sliders with a colour preview swatch and optional eye-dropper button.',
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

    related: [
        {
            slug: 'slider-field',
            name: 'SliderField',
            kind: 'component',
            descriptionKey: 'components.catalog.slider_field.description',
            descriptionFallback: 'Range slider field used internally for the hue and alpha tracks.'
        }
    ],

    props: [
        {
            name: 'colorHsv',
            type: { label: 'THSVA | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_preview.props.color_hsv.description',
            descriptionFallback: 'Current colour in HSVA format { h, s, v, a }. Drives the hue slider position and the preview swatch fill.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_preview.props.disabled.description',
            descriptionFallback: 'Disables slider interaction. Passed through to both SliderField children.'
        },
        {
            name: 'hideAlpha',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_preview.props.hide_alpha.description',
            descriptionFallback: 'Hides the alpha slider. Applied as a BEM modifier --hide-alpha on the root element.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_preview.props.height.description',
            descriptionFallback: 'Override height of the preview strip. Accepts a CSS length or a number (px).'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_preview.props.width.description',
            descriptionFallback: 'Override width of the preview strip.'
        }
    ],

    emits: [
        {
            event: 'update:colorHsv',
            payload: { label: 'THSVA', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker_preview.emits.update_color_hsv.description',
            descriptionFallback: 'Fired when the user moves the hue or alpha slider, or picks a colour with the eye-dropper. Emits the updated HSVA object.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.color_picker_preview.examples.standalone.title',
            titleFallback: 'Standalone preview',
            lang: 'vue',
            code: `<script setup>
import { ref } from 'vue'
const color = ref({ h: 200, s: 0.8, v: 0.9, a: 1 })
</script>
<template>
  <origam-color-picker-preview v-model:color-hsv="color" />
</template>`
        },
        {
            titleKey: 'components.color_picker_preview.examples.no_alpha.title',
            titleFallback: 'Without alpha slider',
            lang: 'vue',
            code: `<template>
  <origam-color-picker-preview :color-hsv="color" hide-alpha @update:color-hsv="color = $event" />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-color-picker-preview',
        svgViewBox: '0 0 560 140',
        svgTitle: 'Anatomy of OrigamColorPickerPreview',
        svgDesc: 'Schematic of ColorPickerPreview with 4 internal parts.',
        svg: `
  <rect x="0" y="0" width="560" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="16" y="28" width="528" height="84" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="52" cy="70" r="22" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.15))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5"/>
  <rect x="86" y="38" width="388" height="16" rx="4" fill="linear-gradient(to right, red, #ff0, #0f0, #0ff, #00f, #f0f, red)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1"/>
  <rect x="86" y="38" width="388" height="16" rx="4" fill="url(#hue-grad)" stroke="none"/>
  <defs>
    <linearGradient id="hue-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="red"/>
      <stop offset="17%" stop-color="yellow"/>
      <stop offset="33%" stop-color="lime"/>
      <stop offset="50%" stop-color="cyan"/>
      <stop offset="67%" stop-color="blue"/>
      <stop offset="83%" stop-color="magenta"/>
      <stop offset="100%" stop-color="red"/>
    </linearGradient>
  </defs>
  <rect x="86" y="64" width="388" height="16" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1"/>
  <rect x="86" y="64" width="388" height="16" rx="4" fill="url(#alpha-grad)" opacity="0.7" stroke="none"/>
  <defs>
    <linearGradient id="alpha-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect x="486" y="38" width="42" height="42" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.15))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5"/>
  <circle cx="24" cy="36" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="24" y="40" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="50" cy="50" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="50" y="54" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="90" cy="36" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="90" y="40" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="90" cy="62" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="90" y="66" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <line x1="33" y1="36" x2="280" y2="14" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="284" y="17" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-color-picker-preview</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-color-picker-preview&gt;</code> — 4 parts: root flex container ①, preview dot ②, hue slider ③, alpha slider ④ (hidden when <code>hideAlpha</code>).',
        legend: [
            {
                num: 1,
                cls: '.origam-color-picker-preview',
                descriptionKey: 'components.color_picker_preview.anatomy.root',
                descriptionFallback: 'Root <code>&lt;div&gt;</code> with <code>display: flex; align-items: center</code>. Has <code>--hide-alpha</code> BEM modifier when <code>hideAlpha=true</code>.'
            },
            {
                num: 2,
                cls: '.origam-color-picker-preview__dot',
                descriptionKey: 'components.color_picker_preview.anatomy.dot',
                descriptionFallback: 'Circular swatch showing the current colour. Uses a checkerboard background for transparency. 30x30px, <code>border-radius: 50%</code>.'
            },
            {
                num: 3,
                cls: '.origam-color-picker-preview__hue',
                descriptionKey: 'components.color_picker_preview.anatomy.hue',
                descriptionFallback: '<code>OrigamSliderField</code> ranging 0–360 for hue. Track background is the full hue gradient. Fill track is hidden.'
            },
            {
                num: 4,
                cls: '.origam-color-picker-preview__alpha',
                descriptionKey: 'components.color_picker_preview.anatomy.alpha',
                descriptionFallback: '<code>OrigamSliderField</code> ranging 0–1 for alpha (step 1/256). Track background is a transparency-to-current-colour gradient. Conditionally rendered via <code>v-if="!hideAlpha"</code>.'
            }
        ],
        code: `<div class="origam-color-picker-preview">
  <!-- optional eye-dropper button (EyeDropper API support required) -->
  <div class="origam-color-picker-preview__eye-dropper">
    <origam-btn :icon="MDI_ICONS.EYEDROPPER" />
  </div>
  <!-- colour preview swatch -->
  <div class="origam-color-picker-preview__dot">
    <div :style="{ background: currentColor }" />
  </div>
  <!-- sliders -->
  <div class="origam-color-picker-preview__sliders">
    <origam-slider-field class="origam-color-picker-preview__track origam-color-picker-preview__hue" />
    <origam-slider-field class="origam-color-picker-preview__track origam-color-picker-preview__alpha" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-color-picker-preview',
                descriptionKey: 'components.color_picker_preview.anatomy.root',
                descriptionFallback: 'Root flex container.'
            },
            {
                cls: 'origam-color-picker-preview--hide-alpha',
                descriptionKey: 'components.color_picker_preview.anatomy.hide_alpha',
                descriptionFallback: 'BEM modifier applied when hideAlpha=true. Hides the alpha slider row.'
            },
            {
                cls: 'origam-color-picker-preview__eye-dropper',
                descriptionKey: 'components.color_picker_preview.anatomy.eye_dropper',
                descriptionFallback: 'Wrapper for the eye-dropper button. Shown only when EyeDropper API is supported.'
            },
            {
                cls: 'origam-color-picker-preview__dot',
                descriptionKey: 'components.color_picker_preview.anatomy.dot',
                descriptionFallback: 'Round swatch displaying the current picked colour with checkerboard underlay.'
            },
            {
                cls: 'origam-color-picker-preview__sliders',
                descriptionKey: 'components.color_picker_preview.anatomy.sliders',
                descriptionFallback: 'Flex column container for hue and alpha sliders.'
            },
            {
                cls: 'origam-color-picker-preview__track',
                descriptionKey: 'components.color_picker_preview.anatomy.track',
                descriptionFallback: 'Shared modifier on both slider tracks. Sets width: 100% and removes the fill track.'
            },
            {
                cls: 'origam-color-picker-preview__hue',
                descriptionKey: 'components.color_picker_preview.anatomy.hue',
                descriptionFallback: 'Hue slider (0–360). Track painted with the full rainbow gradient.'
            },
            {
                cls: 'origam-color-picker-preview__alpha',
                descriptionKey: 'components.color_picker_preview.anatomy.alpha',
                descriptionFallback: 'Alpha slider (0–1). Track painted with a transparent-to-colour gradient with a checkerboard underlay.'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-color-picker-preview---width',
            defaultValue: '32px',
            descriptionKey: 'components.color_picker_preview.css_vars.width',
            descriptionFallback: 'Width of the preview dot swatch.'
        },
        {
            name: '--origam-color-picker-preview---height',
            defaultValue: '32px',
            descriptionKey: 'components.color_picker_preview.css_vars.height',
            descriptionFallback: 'Height of the preview dot swatch.'
        },
        {
            name: '--origam-color-picker-preview---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.color_picker_preview.css_vars.border_radius',
            descriptionFallback: 'Border-radius of the preview dot swatch.'
        },
        {
            name: '--origam-color-picker-color-hsv',
            defaultValue: 'computed from colorHsv',
            descriptionKey: 'components.color_picker_preview.css_vars.color_hsv',
            descriptionFallback: 'CSS custom property injected at runtime with the current hue as a CSS colour. Used as the end stop of the alpha gradient track.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.color_picker_preview.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.color_picker_preview.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.color_picker_preview.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.color_picker_preview.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.color_picker_preview.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.color_picker_preview.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.color_picker_preview.a11y.key_tab',
                actionFallback: 'Moves focus between the hue slider, alpha slider, and eye-dropper button.'
            },
            {
                key: 'Arrow Left / Right',
                actionKey: 'components.color_picker_preview.a11y.key_arrows',
                actionFallback: 'Adjusts the focused slider (hue or alpha) by one step.'
            }
        ],
        notes: [
            {
                noteKey: 'components.color_picker_preview.a11y.slider_note',
                noteFallback: 'Each SliderField is a native range-like widget with aria-valuemin, aria-valuemax and aria-valuenow. Keyboard navigation is handled by OrigamSliderField.'
            },
            {
                noteKey: 'components.color_picker_preview.a11y.eye_dropper_note',
                noteFallback: 'The eye-dropper button is only rendered when window.EyeDropper is available (Chromium 95+). On unsupported browsers the slot is absent.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/color-picker.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Preview-specific tokens live under the color-picker.preview namespace.',
        excerpt: [
            {
                tokenPath: 'color-picker.preview.width',
                value: '32px',
                type: 'dimension',
                descriptionKey: 'components.color_picker_preview.tokens.width',
                descriptionFallback: 'Width of the circular preview swatch.'
            },
            {
                tokenPath: 'color-picker.preview.height',
                value: '32px',
                type: 'dimension',
                descriptionKey: 'components.color_picker_preview.tokens.height',
                descriptionFallback: 'Height of the circular preview swatch.'
            },
            {
                tokenPath: 'color-picker.preview.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.color_picker_preview.tokens.border_radius',
                descriptionFallback: 'Border-radius of the preview swatch container.'
            },
            {
                tokenPath: 'color-picker.preview.border-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.color_picker_preview.tokens.border_color',
                descriptionFallback: 'Border colour of the preview swatch.'
            },
            {
                tokenPath: 'color-picker.preview.border-width',
                value: '{border.width.thin}',
                type: 'dimension',
                descriptionKey: 'components.color_picker_preview.tokens.border_width',
                descriptionFallback: 'Border width of the preview swatch.'
            }
        ]
    } satisfies IComponentTokens
}
