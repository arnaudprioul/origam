/**
 * /components/slider-field — full documentation data for OrigamSliderField.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/SliderField/slider-field.interface.ts  (props)
 *   - packages/ds/src/components/SliderField/OrigamSliderField.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/slider-field.json                    (CSS tokens)
 *
 * FAMILY: slider-field-track (sub-component for the rail/fill/ticks).
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

export const SLIDER_FIELD_DOC: IComponentDoc = {
    slug: 'slider-field',
    name: 'SliderField',
    tag: 'origam-slider-field',
    icon: 'mdi-tune-variant',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.slider_field.description',
    descriptionFallback: 'Range slider with thumb, track and tick marks. Supports range (dual-thumb), vertical orientation, and media-scrubber variants.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-sliderfield--design',
    docUrl: 'http://localhost:4000/components/SliderField/OrigamSliderField',

    family: [
        {
            slug: 'slider-field-track',
            name: 'SliderFieldTrack',
            descriptionKey: 'components.catalog.slider_field_track.description',
            descriptionFallback: 'Track sub-component of SliderField rendering the rail, fill and tick marks.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'number | string | number[] | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field.props.model_value.description',
            descriptionFallback: 'Current slider value. Use an array for range (dual-thumb) mode.'
        },
        {
            name: 'min',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.slider_field.props.min.description',
            descriptionFallback: 'Minimum allowed value.'
        },
        {
            name: 'max',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.slider_field.props.max.description',
            descriptionFallback: 'Maximum allowed value.'
        },
        {
            name: 'step',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.slider_field.props.step.description',
            descriptionFallback: 'Increment step. 0 = continuous.'
        },
        {
            name: 'range',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field.props.range.description',
            descriptionFallback: 'Enables dual-thumb range selection. modelValue must be an array of two values.'
        },
        {
            name: 'variant',
            type: { label: 'TSliderFieldVariant', slug: 'slider-field-variant', kind: 'type' },
            defaultValue: "'field'",
            descriptionKey: 'components.slider_field.props.variant.description',
            descriptionFallback: "Visual variant. 'field' = full form chrome (label, messages), 'timer' = bare scrubber, 'audio' = waveform scrubber."
        },
        {
            name: 'reverse',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field.props.reverse.description',
            descriptionFallback: 'Reverses the track direction (fill runs from end to start).'
        },
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field.props.inset.description',
            descriptionFallback: 'Compact inset style — thumb sits inside the track (smaller, no overflow).'
        },
        {
            name: 'showTicks',
            type: { label: 'TAlways', slug: 'always', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field.props.show_ticks.description',
            descriptionFallback: "When set, tick marks are shown. Pass 'always' to show them at all times."
        },
        {
            name: 'showThumbOnHoverOnly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field.props.show_thumb_on_hover_only.description',
            descriptionFallback: 'Hides the thumb at rest; reveals it on container hover, focus-within or during drag (CSS-only).'
        },
        {
            name: 'showHoverTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field.props.show_hover_tooltip.description',
            descriptionFallback: 'Shows a floating tooltip above the rail with the value at the cursor position.'
        },
        {
            name: 'buffered',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field.props.buffered.description',
            descriptionFallback: 'Secondary fill from min to buffered (e.g. video loaded range), at reduced opacity.'
        },
        {
            name: 'peaks',
            type: { label: 'ReadonlyArray<number>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field.props.peaks.description',
            descriptionFallback: 'Waveform peaks [0–1] painted as vertical bars in audio variant mode.'
        },
        // ── IInputProps / IFieldProps ──────────────────────────────────
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field.props.label.description',
            descriptionFallback: 'Field label rendered in the form chrome (field variant only).'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field.props.disabled.description',
            descriptionFallback: 'Disables the slider. Sets aria-disabled and prevents interaction.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field.props.readonly.description',
            descriptionFallback: 'Makes the slider non-interactive without visually disabling it.'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field.props.error.description',
            descriptionFallback: 'Forces the error visual state. The track fill turns to the danger intent color.'
        },
        // ── IColorProps / IDensityProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field.props.color.description',
            descriptionFallback: 'Thumb and fill color. Accepts semantic intents or CSS color.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.slider_field.props.density.description',
            descriptionFallback: 'Adjusts vertical padding density.'
        },
        // ── IDirectionProps ────────────────────────────────────────────
        {
            name: 'direction',
            type: { label: 'TDirection', slug: 'direction', kind: 'type' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.slider_field.props.direction.description',
            descriptionFallback: 'Slider orientation: horizontal (default) or vertical.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'number | string | number[] | string[]', slug: '', kind: 'primitive' },
            descriptionKey: 'components.slider_field.emits.update_model_value.description',
            descriptionFallback: 'Emitted on every value change during drag.'
        },
        {
            event: 'start',
            payload: { label: 'number | string | number[] | string[]', slug: '', kind: 'primitive' },
            descriptionKey: 'components.slider_field.emits.start.description',
            descriptionFallback: 'Fired on pointerdown of a thumb (drag start).'
        },
        {
            event: 'end',
            payload: { label: 'number | string | number[] | string[]', slug: '', kind: 'primitive' },
            descriptionKey: 'components.slider_field.emits.end.description',
            descriptionFallback: 'Fired on pointerup (drag end).'
        },
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.slider_field.emits.focus.description',
            descriptionFallback: 'Fired when the slider thumb receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.slider_field.emits.blur.description',
            descriptionFallback: 'Fired when the slider thumb loses focus.'
        }
    ],

    slots: [
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.slider_field.slots.prepend.description',
            descriptionFallback: 'Content placed before the slider track (outside the field chrome).'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.slider_field.slots.label.description',
            descriptionFallback: 'Replaces the label element in field variant.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.slider_field.slots.append.description',
            descriptionFallback: 'Content placed after the slider track (outside the field chrome).'
        }
    ],

    examples: [
        {
            titleKey: 'components.slider_field.examples.basic.title',
            titleFallback: 'Basic slider',
            lang: 'vue',
            code: `<template>
  <origam-slider-field v-model="value" label="Volume" :min="0" :max="100" />
  <p>Value: {{ value }}</p>
</template>

<script setup>
import { ref } from 'vue'
const value = ref(50)
</script>`
        },
        {
            titleKey: 'components.slider_field.examples.range.title',
            titleFallback: 'Range (dual thumb)',
            lang: 'vue',
            code: `<template>
  <origam-slider-field
    v-model="range"
    :range="true"
    label="Price range"
    :min="0"
    :max="500"
    :step="10"
    color="primary"
  />
  <p>From {{ range[0] }} to {{ range[1] }}</p>
</template>

<script setup>
import { ref } from 'vue'
const range = ref([100, 300])
</script>`
        },
        {
            titleKey: 'components.slider_field.examples.ticks.title',
            titleFallback: 'With ticks',
            lang: 'vue',
            code: `<template>
  <origam-slider-field
    v-model="value"
    label="Rating"
    :min="1"
    :max="5"
    :step="1"
    show-ticks="always"
    color="success"
  />
</template>

<script setup>
import { ref } from 'vue'
const value = ref(3)
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-slider-field',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamSliderField',
        svgDesc: 'Schematic of the SliderField component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="30" width="644" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="110" y="68" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">Volume</text>
  <rect x="100" y="110" width="500" height="8" rx="4" fill="var(--origam-color__surface---disabled, #e5e7eb)"/>
  <rect x="100" y="110" width="260" height="8" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="360" cy="114" r="12" fill="var(--origam-color__action--primary---bg, #7c3aed)" stroke="var(--origam-color__surface---default, #fff)" stroke-width="2"/>
  <circle cx="140" cy="126" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="220" cy="126" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="300" cy="126" r="4" fill="var(--origam-color__action--primary---fg, #fff)"/>
  <circle cx="380" cy="126" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="460" cy="126" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="540" cy="126" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="36" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="42.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="108" cy="62" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="66.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="260" cy="108" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="260" y="112.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="360" cy="100" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="360" y="104.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <circle cx="300" cy="135" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="300" y="139.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">5</text>
  <line x1="46" y1="30" x2="80" y2="14" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="14" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-slider-field</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-slider-field&gt;</code> — 5 internal parts: root ①, label ②, track-fill ③, thumb ④ and tick marks ⑤.`,
        legend: [
            {
                num: 1,
                cls: '.origam-slider-field',
                descriptionKey: 'components.slider_field.anatomy.root',
                descriptionFallback: 'Root container. Wraps inside OrigamInput chrome when variant="field".'
            },
            {
                num: 2,
                cls: '.origam-slider-field__label',
                descriptionKey: 'components.slider_field.anatomy.label',
                descriptionFallback: 'Label slot area. Rendered only in field variant.'
            },
            {
                num: 3,
                cls: '.origam-slider-field__fill',
                descriptionKey: 'components.slider_field.anatomy.fill',
                descriptionFallback: 'Active fill bar. Width/height proportional to modelValue between min and max.'
            },
            {
                num: 4,
                cls: '.origam-slider-field__thumb',
                descriptionKey: 'components.slider_field.anatomy.thumb',
                descriptionFallback: 'Draggable thumb. Scales on hover/active. Hides at rest when showThumbOnHoverOnly=true.'
            },
            {
                num: 5,
                cls: '.origam-slider-field__tick',
                descriptionKey: 'components.slider_field.anatomy.tick',
                descriptionFallback: 'Tick mark dots shown when showTicks is set. One dot per step increment.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: OrigamInput form chrome in "field" variant -->
<div class="origam-slider-field">
  <!-- label slot (field variant) -->
  <slot name="label"><origam-label>{{ label }}</origam-label></slot>

  <!-- track: rail + fill + ticks (OrigamSliderFieldTrack sub-component) -->
  <div class="origam-slider-field__container">
    <origam-slider-field-track
      :start="startPercent"
      :stop="stopPercent"
      :ticks="computedTicks"
    />
    <!-- native <input type="range"> (pointer math owner) -->
    <input type="range" :min="min" :max="max" :step="step" />
    <!-- thumb -->
    <div class="origam-slider-field__thumb" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-slider-field',
                descriptionKey: 'components.slider_field.anatomy.root',
                descriptionFallback: 'Root element.'
            },
            {
                cls: 'origam-slider-field__container',
                descriptionKey: 'components.slider_field.anatomy.container',
                descriptionFallback: 'Inner container holding track, native input and thumb.'
            },
            {
                cls: 'origam-slider-field__fill',
                descriptionKey: 'components.slider_field.anatomy.fill',
                descriptionFallback: 'Active fill from min to current value.'
            },
            {
                cls: 'origam-slider-field__thumb',
                descriptionKey: 'components.slider_field.anatomy.thumb',
                descriptionFallback: 'Draggable thumb element.'
            },
            {
                cls: 'origam-slider-field__tick',
                descriptionKey: 'components.slider_field.anatomy.tick',
                descriptionFallback: 'Tick mark dot.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-slider-field---transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.slider_field.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for thumb scale and fill width animations.'
        },
        {
            name: '--origam-slider-field__track---height',
            defaultValue: '4px',
            descriptionKey: 'components.slider_field.css_vars.track_height',
            descriptionFallback: 'Track rail height (horizontal orientation).'
        },
        {
            name: '--origam-slider-field__track---background-color',
            defaultValue: '{color.surface.disabled}',
            descriptionKey: 'components.slider_field.css_vars.track_bg',
            descriptionFallback: 'Unfilled track rail background color.'
        },
        {
            name: '--origam-slider-field__track-fill---background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.slider_field.css_vars.track_fill_bg',
            descriptionFallback: 'Active fill color. Overridden by color prop.'
        },
        {
            name: '--origam-slider-field__thumb---size',
            defaultValue: '16px',
            descriptionKey: 'components.slider_field.css_vars.thumb_size',
            descriptionFallback: 'Thumb diameter.'
        },
        {
            name: '--origam-slider-field__thumb---background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.slider_field.css_vars.thumb_bg',
            descriptionFallback: 'Thumb background color.'
        },
        {
            name: '--origam-slider-field__thumb---scale-hover',
            defaultValue: '1.25',
            descriptionKey: 'components.slider_field.css_vars.thumb_scale_hover',
            descriptionFallback: 'Thumb scale on hover.'
        },
        {
            name: '--origam-slider-field---opacity-disabled',
            defaultValue: '{opacity.32}',
            descriptionKey: 'components.slider_field.css_vars.opacity_disabled',
            descriptionFallback: 'Opacity when disabled.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.slider_field.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.slider_field.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.slider_field.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.slider_field.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.slider_field.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.slider_field.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['slider'],
        keyboard: [
            {
                key: 'Arrow Left / Down',
                actionKey: 'components.slider_field.a11y.key_decrease',
                actionFallback: 'Decreases the value by one step.'
            },
            {
                key: 'Arrow Right / Up',
                actionKey: 'components.slider_field.a11y.key_increase',
                actionFallback: 'Increases the value by one step.'
            },
            {
                key: 'Home',
                actionKey: 'components.slider_field.a11y.key_home',
                actionFallback: 'Jumps to the minimum value.'
            },
            {
                key: 'End',
                actionKey: 'components.slider_field.a11y.key_end',
                actionFallback: 'Jumps to the maximum value.'
            },
            {
                key: 'Page Up / Page Down',
                actionKey: 'components.slider_field.a11y.key_page',
                actionFallback: 'Increments or decrements by 10% of the total range.'
            }
        ],
        notes: [
            {
                noteKey: 'components.slider_field.a11y.range_note',
                noteFallback: 'The native <input type="range"> owns keyboard and pointer math. aria-valuemin, aria-valuemax, aria-valuenow and aria-orientation are managed by the browser natively.'
            },
            {
                noteKey: 'components.slider_field.a11y.label_note',
                noteFallback: 'Pair with the label prop or an aria-label attribute to identify the slider purpose for screen readers.'
            },
            {
                noteKey: 'components.slider_field.a11y.range_dual_note',
                noteFallback: 'In range (dual-thumb) mode, each thumb is a separate <input type="range">. Provide distinct aria-label values for the start and end thumbs.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/slider-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'slider-field.track.height',
                value: '4px',
                type: 'dimension',
                descriptionKey: 'components.slider_field.tokens.track_height',
                descriptionFallback: 'Track rail height.'
            },
            {
                tokenPath: 'slider-field.track.background-color',
                value: '{color.surface.disabled}',
                type: 'color',
                descriptionKey: 'components.slider_field.tokens.track_bg',
                descriptionFallback: 'Unfilled rail color.'
            },
            {
                tokenPath: 'slider-field.track-fill.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.slider_field.tokens.track_fill_bg',
                descriptionFallback: 'Active fill color.'
            },
            {
                tokenPath: 'slider-field.thumb.size',
                value: '16px',
                type: 'dimension',
                descriptionKey: 'components.slider_field.tokens.thumb_size',
                descriptionFallback: 'Thumb diameter.'
            },
            {
                tokenPath: 'slider-field.thumb.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.slider_field.tokens.thumb_bg',
                descriptionFallback: 'Thumb background.'
            },
            {
                tokenPath: 'slider-field.thumb.scale-hover',
                value: '1.25',
                type: 'number',
                descriptionKey: 'components.slider_field.tokens.thumb_scale_hover',
                descriptionFallback: 'Thumb scale on hover.'
            },
            {
                tokenPath: 'slider-field.opacity-disabled',
                value: '{opacity.32}',
                type: 'number',
                descriptionKey: 'components.slider_field.tokens.opacity_disabled',
                descriptionFallback: 'Opacity when disabled.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'modelValue',
                kind: 'number',
                labelKey: 'components.slider_field.playground.model_value',
                labelFallback: 'Value',
                defaultValue: 50
            },
            {
                prop: 'min',
                kind: 'number',
                labelKey: 'components.slider_field.playground.min',
                labelFallback: 'Min',
                defaultValue: 0
            },
            {
                prop: 'max',
                kind: 'number',
                labelKey: 'components.slider_field.playground.max',
                labelFallback: 'Max',
                defaultValue: 100
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.slider_field.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'warning', value: 'warning' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.slider_field.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'readonly',
                kind: 'switch',
                labelKey: 'components.slider_field.playground.readonly',
                labelFallback: 'Readonly',
                defaultValue: false
            },
            {
                prop: 'error',
                kind: 'switch',
                labelKey: 'components.slider_field.playground.error',
                labelFallback: 'Error',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
