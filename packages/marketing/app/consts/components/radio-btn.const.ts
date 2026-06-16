/**
 * /components/radio-btn — full documentation data for OrigamRadioBtn.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Radio/radio-btn.interface.ts          (props)
 *   - packages/ds/src/components/Radio/OrigamRadioBtn.vue               (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/radio.json                           (CSS tokens)
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

export const RADIO_BTN_DOC: IComponentDoc = {
    slug: 'radio-btn',
    name: 'RadioBtn',
    tag: 'origam-radio-btn',
    icon: 'mdi-radiobox-marked',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.radio_btn.description',
    descriptionFallback: 'Individual radio button control wrapping OrigamSelectionControl with type="radio" and animated dot icon.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-radio-btn--design',
    docUrl: 'http://localhost:4000/components/Radio/OrigamRadioBtn',

    family: [
        {
            slug: 'radio',
            name: 'Radio',
            descriptionKey: 'components.catalog.radio.description',
            descriptionFallback: 'Standalone radio input with label and full selection-control surface.'
        },
        {
            slug: 'radio-group',
            name: 'RadioGroup',
            descriptionKey: 'components.catalog.radio_group.description',
            descriptionFallback: 'Groups multiple Radio controls into a single v-model binding.'
        }
    ],

    parentSlug: 'radio',

    related: [
        {
            slug: 'selection-control',
            name: 'SelectionControl',
            kind: 'component',
            descriptionKey: 'components.radio_btn.related.selection_control.description',
            descriptionFallback: 'Base control that RadioBtn delegates to via filterProps.'
        },
        {
            slug: 'checkbox',
            name: 'Checkbox',
            kind: 'component',
            descriptionKey: 'components.radio_btn.related.checkbox.description',
            descriptionFallback: 'Checkbox shares the SelectionControl base with RadioBtn.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_btn.props.model_value.description',
            descriptionFallback: 'Bound value. When modelValue equals value prop, the radio is checked.'
        },
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_btn.props.value.description',
            descriptionFallback: 'Value emitted when the radio is selected. Used for group comparison.'
        },
        {
            name: 'trueIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-radiobox-marked'",
            descriptionKey: 'components.radio_btn.props.true_icon.description',
            descriptionFallback: 'Icon shown when the radio is checked.'
        },
        {
            name: 'falseIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-radiobox-blank'",
            descriptionKey: 'components.radio_btn.props.false_icon.description',
            descriptionFallback: 'Icon shown when the radio is unchecked.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_btn.props.label.description',
            descriptionFallback: 'Text label rendered next to the radio button. Can also use the #default slot.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_btn.props.disabled.description',
            descriptionFallback: 'Disables the radio button. Sets aria-disabled and reduces opacity.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_btn.props.readonly.description',
            descriptionFallback: 'Makes the radio non-interactive without applying disabled styling.'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_btn.props.error.description',
            descriptionFallback: 'Applies error state styling (danger color) to the radio and label.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_btn.props.color.description',
            descriptionFallback: 'Active state color of the radio ring and dot. Defaults to primary via token.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.radio_btn.props.density.description',
            descriptionFallback: 'Adjusts padding density of the control.'
        },
        {
            name: 'inline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_btn.props.inline.description',
            descriptionFallback: 'Renders the control inline (display: inline-flex) instead of block.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_btn.props.multiple.description',
            descriptionFallback: 'When true, uses array-based modelValue (not typical for radio).'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_btn.props.name.description',
            descriptionFallback: 'HTML name attribute forwarded to the underlying <input>. Used for native form grouping.'
        },
        {
            name: 'ripple',
            type: { label: "boolean | { class: string }", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.radio_btn.props.ripple.description',
            descriptionFallback: 'Enables the Material ripple effect on click.'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_btn.props.required.description',
            descriptionFallback: 'Marks the underlying input as required.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio_btn.emits.update_model_value.description',
            descriptionFallback: 'Fired when the radio is selected. Payload is the value prop.'
        },
        {
            event: 'click:label',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio_btn.emits.click_label.description',
            descriptionFallback: 'Fired when the label text is clicked. Forwarded from OrigamSelectionControl.'
        },
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio_btn.emits.focus.description',
            descriptionFallback: 'Fired when the underlying input receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio_btn.emits.blur.description',
            descriptionFallback: 'Fired when the underlying input loses focus.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.radio_btn.slots.default.description',
            descriptionFallback: 'Label content. Overrides the label prop.'
        },
        {
            slot: 'input',
            slotProps: '{ props, icon, model }',
            descriptionKey: 'components.radio_btn.slots.input.description',
            descriptionFallback: 'Custom input element slot. props contains the native input attributes, icon is the current icon, model is the reactive value.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.radio_btn.slots.label.description',
            descriptionFallback: 'Custom label slot. Replaces the label text area.'
        }
    ],

    examples: [
        {
            titleKey: 'components.radio_btn.examples.basic.title',
            titleFallback: 'Basic radio group',
            lang: 'vue',
            code: `<template>
  <div>
    <origam-radio-btn
      v-model="selected"
      value="a"
      label="Option A"
    />
    <origam-radio-btn
      v-model="selected"
      value="b"
      label="Option B"
    />
    <origam-radio-btn
      v-model="selected"
      value="c"
      label="Option C (disabled)"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('a')
</script>`
        },
        {
            titleKey: 'components.radio_btn.examples.colored.title',
            titleFallback: 'Colored radios',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <origam-radio-btn v-model="val" value="p" color="primary" label="Primary" />
    <origam-radio-btn v-model="val" value="s" color="success" label="Success" />
    <origam-radio-btn v-model="val" value="d" color="danger"  label="Danger"  />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const val = ref('p')
</script>`
        }
    ],

    previewVariants: [
        { label: 'unchecked', props: { falseIcon: 'mdi-radiobox-blank' }, ariaLabel: 'Unchecked radio' },
        { label: 'checked', props: { trueIcon: 'mdi-radiobox-marked', color: 'primary' }, ariaLabel: 'Checked radio' },
        { label: 'disabled', props: { disabled: true }, ariaLabel: 'Disabled radio' },
        { label: 'error', props: { error: true }, ariaLabel: 'Error radio' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-radio-btn',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamRadioBtn',
        svgDesc: 'Schematic of the RadioBtn component delegating to OrigamSelectionControl.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #f8f9fa)" rx="4"/>
  <rect x="28" y="30" width="400" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="76" cy="90" r="20" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <circle cx="76" cy="90" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <rect x="112" y="80" width="200" height="20" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="212" y="94" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Label / #default slot</text>
  <circle cx="36" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="42.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="60" cy="68" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="60" y="72.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="76" cy="68" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="76" y="72.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="212" cy="68" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="212" y="72.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <line x1="46" y1="38" x2="80" y2="22" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="21" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-radio-btn → origam-selection-control</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-radio-btn&gt;</code> — 4 internal parts: the selection-control root ①, the radio ring ②, the selection dot ③, and the label area ④.`,
        legend: [
            {
                num: 1,
                cls: '.origam-radio-btn',
                descriptionKey: 'components.radio_btn.anatomy.root',
                descriptionFallback: 'Root class applied to the OrigamSelectionControl wrapper. Delegates all rendering to the selection-control via filterProps.'
            },
            {
                num: 2,
                cls: '.origam-selection-control__input (ring)',
                descriptionKey: 'components.radio_btn.anatomy.ring',
                descriptionFallback: 'Circular ring. Border-color transitions from border.default → action.primary.bg when checked. 20 × 20 px, border-radius: full.'
            },
            {
                num: 3,
                cls: '.origam-selection-control__input (dot)',
                descriptionKey: 'components.radio_btn.anatomy.dot',
                descriptionFallback: 'Inner dot (10 × 10 px). Animates from scale(0) → scale(1) on check. Background-color: action.primary.bg.'
            },
            {
                num: 4,
                cls: '.origam-selection-control__label',
                descriptionKey: 'components.radio_btn.anatomy.label',
                descriptionFallback: 'Label text area. Color: text.primary. Renders the label prop or #default slot.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- RadioBtn delegates to SelectionControl with type="radio" -->
<origam-selection-control
  class="origam-radio-btn"
  v-model="model"
  type="radio"
  :true-icon="trueIcon"
  :false-icon="falseIcon"
  v-bind="controlProps"
  @click:label="handleClickLabel"
>
  <template #default><slot name="default" /></template>
  <template #input="{ props, icon, model }">
    <slot name="input" v-bind="{ props, icon, model }" />
  </template>
  <template #label><slot name="label" /></template>
</origam-selection-control>`,
        classes: [
            {
                cls: 'origam-radio-btn',
                descriptionKey: 'components.radio_btn.anatomy.root',
                descriptionFallback: 'Root class applied on top of OrigamSelectionControl.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-radio---input-size',
            defaultValue: '20px',
            descriptionKey: 'components.radio_btn.css_vars.input_size',
            descriptionFallback: 'Width and height of the radio ring.'
        },
        {
            name: '--origam-radio---input-border-color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.radio_btn.css_vars.input_border_color',
            descriptionFallback: 'Ring border color in unchecked state.'
        },
        {
            name: '--origam-radio---input-border-color-checked',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.radio_btn.css_vars.input_border_color_checked',
            descriptionFallback: 'Ring border color when checked.'
        },
        {
            name: '--origam-radio---input-border-color-disabled',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.radio_btn.css_vars.input_border_color_disabled',
            descriptionFallback: 'Ring border color when disabled.'
        },
        {
            name: '--origam-radio---input-border-color-error',
            defaultValue: '{color.feedback.danger.bg}',
            descriptionKey: 'components.radio_btn.css_vars.input_border_color_error',
            descriptionFallback: 'Ring border color in error state.'
        },
        {
            name: '--origam-radio---dot-size',
            defaultValue: '10px',
            descriptionKey: 'components.radio_btn.css_vars.dot_size',
            descriptionFallback: 'Diameter of the inner selection dot.'
        },
        {
            name: '--origam-radio---dot-background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.radio_btn.css_vars.dot_background_color',
            descriptionFallback: 'Background color of the inner dot when selected.'
        },
        {
            name: '--origam-radio---label-font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.radio_btn.css_vars.label_font_size',
            descriptionFallback: 'Font size of the label text.'
        },
        {
            name: '--origam-radio---opacity-disabled',
            defaultValue: '{opacity.32}',
            descriptionKey: 'components.radio_btn.css_vars.opacity_disabled',
            descriptionFallback: 'Overall opacity of the control when disabled.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.radio_btn.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to SelectionControl.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.radio_btn.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.radio_btn.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.radio_btn.exposed.load',
            descriptionFallback: 'Injects the computed style sheet.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.radio_btn.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.radio_btn.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['radio'],
        keyboard: [
            {
                key: 'Space',
                actionKey: 'components.radio_btn.a11y.key_space',
                actionFallback: 'Selects the radio button when focused.'
            },
            {
                key: 'Tab',
                actionKey: 'components.radio_btn.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            },
            {
                key: 'Arrow Up / Arrow Down',
                actionKey: 'components.radio_btn.a11y.key_arrows',
                actionFallback: 'Navigates between radios in a group (native browser behaviour on <input type="radio">).'
            }
        ],
        notes: [
            {
                noteKey: 'components.radio_btn.a11y.native_input_note',
                noteFallback: 'The underlying <input type="radio"> provides native radio behaviour: keyboard navigation, grouping via name, and correct role="radio" without any ARIA additions.'
            },
            {
                noteKey: 'components.radio_btn.a11y.label_note',
                noteFallback: 'The label is associated with the input via <label> — clicking the label text activates the radio.'
            },
            {
                noteKey: 'components.radio_btn.a11y.disabled_note',
                noteFallback: 'When disabled=true, the native disabled attribute is set on the input. No aria-disabled is needed.'
            },
            {
                noteKey: 'components.radio_btn.a11y.error_note',
                noteFallback: 'Error state applies visual styling only. Connect an aria-describedby to an error message element for full accessibility.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/radio.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'radio.input.size',
                value: '20px',
                type: 'dimension',
                descriptionKey: 'components.radio_btn.tokens.input_size',
                descriptionFallback: 'Radio ring size.'
            },
            {
                tokenPath: 'radio.input.border-color-checked',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.radio_btn.tokens.border_color_checked',
                descriptionFallback: 'Ring border when checked.'
            },
            {
                tokenPath: 'radio.dot.size',
                value: '10px',
                type: 'dimension',
                descriptionKey: 'components.radio_btn.tokens.dot_size',
                descriptionFallback: 'Inner dot diameter.'
            },
            {
                tokenPath: 'radio.dot.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.radio_btn.tokens.dot_background_color',
                descriptionFallback: 'Inner dot fill when selected.'
            },
            {
                tokenPath: 'radio.label.font-size',
                value: '{font.size.md}',
                type: 'dimension',
                descriptionKey: 'components.radio_btn.tokens.label_font_size',
                descriptionFallback: 'Label font size.'
            },
            {
                tokenPath: 'radio.input.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.radio_btn.tokens.transition_duration',
                descriptionFallback: 'Duration of the ring border and dot scale transitions.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.radio_btn.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.radio_btn.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'compact', value: 'compact' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.radio_btn.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'error',
                kind: 'switch',
                labelKey: 'components.radio_btn.playground.error',
                labelFallback: 'Error',
                defaultValue: false
            },
            {
                prop: 'inline',
                kind: 'switch',
                labelKey: 'components.radio_btn.playground.inline',
                labelFallback: 'Inline',
                defaultValue: false
            }
        ],
        defaultSlotContent: 'Option label'
    } satisfies IComponentPlayground
}
