/**
 * /components/radio — full documentation data for OrigamRadio.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Radio/radio.interface.ts       (props)
 *   - packages/ds/src/components/Radio/OrigamRadio.vue          (template BEM, defineExpose)
 *   - packages/ds/src/components/Radio/OrigamRadioBtn.vue       (sub-component)
 *   - packages/ds/src/components/Radio/OrigamRadioGroup.vue     (sub-component)
 *   - packages/ds/tokens/component/radio.json                   (CSS tokens)
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

export const RADIO_DOC: IComponentDoc = {
    slug: 'radio',
    name: 'Radio',
    tag: 'origam-radio',
    icon: 'mdi-radiobox-marked',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.radio.description',
    descriptionFallback: 'Single-selection radio control with label, error and focus state support. Wraps OrigamRadioBtn inside OrigamInput.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-radio--design',
    docUrl: 'http://localhost:4000/components/Radio/OrigamRadio',

    family: [
        {
            slug: 'radio-btn',
            name: 'RadioBtn',
            descriptionKey: 'components.catalog.radio_btn.description',
            descriptionFallback: 'Low-level radio button control wrapping OrigamSelectionControl. Use OrigamRadio for form-wired instances.'
        },
        {
            slug: 'radio-group',
            name: 'RadioGroup',
            descriptionKey: 'components.catalog.radio_group.description',
            descriptionFallback: 'Groups multiple Radio inputs under a single v-model with optional label and validation messages.'
        }
    ],

    props: [
        // ── IInputProps (via IRadioProps) ──────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.model_value.description',
            descriptionFallback: 'Current selected value. Bound with v-model.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.label.description',
            descriptionFallback: 'Label text rendered next to the radio control.'
        },
        {
            name: 'id',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.id.description',
            descriptionFallback: 'HTML id for the input element. Auto-generated if not provided.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.name.description',
            descriptionFallback: 'Name attribute passed to the underlying input for form grouping.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio.props.disabled.description',
            descriptionFallback: 'Disables the radio control. Sets aria-disabled and prevents interaction.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio.props.readonly.description',
            descriptionFallback: 'Makes the radio non-interactive without disabling it visually.'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio.props.required.description',
            descriptionFallback: 'Marks the field as required and shows a required indicator on the label.'
        },
        // ── IRadioBtnProps / ISelectionControlProps ────────────────────
        {
            name: 'trueValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.true_value.description',
            descriptionFallback: 'The value to set on the model when this radio is selected.'
        },
        {
            name: 'falseValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.false_value.description',
            descriptionFallback: 'The value to set on the model when this radio is unchecked (rarely used for radios).'
        },
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.value.description',
            descriptionFallback: 'Value used when this radio is part of a group (RadioGroup). Replaces trueValue in group context.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the checked state icon and dot.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.radio.props.density.description',
            descriptionFallback: 'Adjusts the vertical padding density of the control wrapper.'
        },
        // ── IPaddingProps / IMarginProps ───────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.padding.description',
            descriptionFallback: 'Shorthand CSS padding applied to the radio root.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.margin.description',
            descriptionFallback: 'Shorthand CSS margin applied to the radio root.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.rounded.description',
            descriptionFallback: 'Border-radius override for the radio control wrapper.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio.props.border.description',
            descriptionFallback: 'Applies a border to the control wrapper.'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the radio root.'
        },
        // ── IActiveProps ───────────────────────────────────────────────
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio.props.active.description',
            descriptionFallback: 'Forces the control into its active/pressed visual state.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the user selects this radio. Carries the trueValue (or value in group context).'
        },
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio.emits.focus.description',
            descriptionFallback: 'Fired when the radio input receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio.emits.blur.description',
            descriptionFallback: 'Fired when the radio input loses focus.'
        },
        {
            event: 'click:label',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio.emits.click_label.description',
            descriptionFallback: 'Fired when the user clicks the label area. Propagated from the inner OrigamRadioBtn.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ id, messagesId, isDisabled, isReadonly, isValid }',
            descriptionKey: 'components.radio.slots.default.description',
            descriptionFallback: 'Replaces the entire inner layout (RadioBtn + messages). Receives the input context.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.radio.slots.label.description',
            descriptionFallback: 'Custom label content replacing the default OrigamLabel.'
        },
        {
            slot: 'input',
            slotProps: '{ props, icon, textColorStyles, backgroundColorStyles, model }',
            descriptionKey: 'components.radio.slots.input.description',
            descriptionFallback: 'Custom input surface replacing the default radio icon. Receives all interaction props.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.radio.slots.prepend.description',
            descriptionFallback: 'Content prepended before the radio control.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.radio.slots.append.description',
            descriptionFallback: 'Content appended after the radio control.'
        },
        {
            slot: 'messages',
            slotProps: '{ hasMessages, messages }',
            descriptionKey: 'components.radio.slots.messages.description',
            descriptionFallback: 'Custom messages/errors area below the control.'
        },
        {
            slot: 'details',
            slotProps: 'detailsSlotProps',
            descriptionKey: 'components.radio.slots.details.description',
            descriptionFallback: 'Custom details area (hint, counter, error detail).'
        }
    ],

    examples: [
        {
            titleKey: 'components.radio.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <div>
    <origam-radio v-model="selected" value="one"   label="Option One" />
    <origam-radio v-model="selected" value="two"   label="Option Two" />
    <origam-radio v-model="selected" value="three" label="Option Three" />
  </div>
</template>
<script setup>
const selected = ref('one')
</script>`
        },
        {
            titleKey: 'components.radio.examples.colors.title',
            titleFallback: 'Colors & states',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <origam-radio v-model="val" value="primary"  color="primary"  label="Primary"  />
    <origam-radio v-model="val" value="success"  color="success"  label="Success"  />
    <origam-radio v-model="val" value="danger"   color="danger"   label="Danger"   />
    <origam-radio v-model="val" value="disabled" disabled        label="Disabled" />
  </div>
</template>`
        },
        {
            titleKey: 'components.radio.examples.group.title',
            titleFallback: 'RadioGroup',
            lang: 'vue',
            code: `<template>
  <origam-radio-group v-model="answer" label="Which framework?" :items="options" />
</template>
<script setup>
const answer = ref('')
const options = [
  { value: 'vue',   label: 'Vue 3' },
  { value: 'react', label: 'React' },
  { value: 'svelte',label: 'Svelte' }
]
</script>`
        }
    ],

    previewVariants: [
        { label: 'default',  props: { color: 'primary' }, slotContent: 'Default' },
        { label: 'checked',  props: { color: 'primary', modelValue: 'a', value: 'a' }, slotContent: 'Checked' },
        { label: 'success',  props: { color: 'success', modelValue: 'b', value: 'b' }, slotContent: 'Success' },
        { label: 'danger',   props: { color: 'danger' },  slotContent: 'Error' },
        { label: 'disabled', props: { disabled: true },   slotContent: 'Disabled', ariaLabel: 'Disabled radio' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-radio',
        svgViewBox: '0 0 480 180',
        svgTitle: 'Anatomy of OrigamRadio',
        svgDesc: 'Schematic of the Radio component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="480" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="440" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <circle cx="70" cy="90" r="30" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <circle cx="70" cy="90" r="12" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <rect x="120" y="78" width="200" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="220" y="95" font-size="12" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Label text</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="50" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="50" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="70" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="70" y="62" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="70" cy="90" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="70" y="94" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="130" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="130" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-radio&gt;</code> — 5 internal parts: the Input wrapper ①, the SelectionControl ②, the circular input ③, the selection dot ④, and the label ⑤.`,
        legend: [
            {
                num: 1,
                cls: '.origam-radio',
                descriptionKey: 'components.radio.anatomy.root',
                descriptionFallback: 'Root element. Wraps OrigamInput providing messages, error and label orchestration.'
            },
            {
                num: 2,
                cls: '.origam-selection-control',
                descriptionKey: 'components.radio.anatomy.selection_control',
                descriptionFallback: 'Inner SelectionControl hosting the ripple zone, the native input and the label.'
            },
            {
                num: 3,
                cls: '.origam-selection-control__input',
                descriptionKey: 'components.radio.anatomy.input',
                descriptionFallback: 'Circular input zone with the ripple directive. Contains the native <input type="radio">.'
            },
            {
                num: 4,
                cls: '.origam-radio__dot (via MDI icon)',
                descriptionKey: 'components.radio.anatomy.dot',
                descriptionFallback: 'Checked-state dot rendered by the trueIcon (mdi-radiobox-marked). Scales with size.'
            },
            {
                num: 5,
                cls: '.origam-selection-control__label',
                descriptionKey: 'components.radio.anatomy.label',
                descriptionFallback: 'Label container. Renders OrigamLabel with color and for wiring.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: OrigamInput wrapper -->
<div class="origam-radio origam-input">
  <!-- SelectionControl owns the ripple zone + native input -->
  <origam-radio-btn class="origam-radio-btn">
    <origam-selection-control class="origam-selection-control" type="radio">
      <!-- input zone with ripple -->
      <div class="origam-selection-control__input">
        <origam-icon :icon="trueIcon" />   <!-- dot when checked -->
        <input type="radio" />
      </div>
      <!-- label -->
      <div class="origam-selection-control__label">
        <origam-label />
      </div>
    </origam-selection-control>
  </origam-radio-btn>
</div>`,
        classes: [
            { cls: 'origam-radio', descriptionKey: 'components.radio.anatomy.root', descriptionFallback: 'Root block element wrapping OrigamInput.' },
            { cls: 'origam-radio-btn', descriptionKey: 'components.radio.anatomy.radio_btn', descriptionFallback: 'RadioBtn sub-component wrapping SelectionControl.' },
            { cls: 'origam-selection-control', descriptionKey: 'components.radio.anatomy.selection_control', descriptionFallback: 'SelectionControl providing ripple, focus and state management.' },
            { cls: 'origam-selection-control__input', descriptionKey: 'components.radio.anatomy.sc_input', descriptionFallback: 'Circular ripple zone containing the native radio input.' },
            { cls: 'origam-selection-control__label', descriptionKey: 'components.radio.anatomy.sc_label', descriptionFallback: 'Label wrapper rendered via OrigamLabel.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-radio__input---size',
            defaultValue: '20px',
            descriptionKey: 'components.radio.css_vars.input_size',
            descriptionFallback: 'Diameter of the circular radio input visual.'
        },
        {
            name: '--origam-radio__input---border-color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.radio.css_vars.input_border_color',
            descriptionFallback: 'Border color of the unchecked radio.'
        },
        {
            name: '--origam-radio__input---border-color-checked',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.radio.css_vars.input_border_color_checked',
            descriptionFallback: 'Border color when the radio is checked.'
        },
        {
            name: '--origam-radio__input---border-color-disabled',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.radio.css_vars.input_border_color_disabled',
            descriptionFallback: 'Border color when the radio is disabled.'
        },
        {
            name: '--origam-radio__dot---size',
            defaultValue: '10px',
            descriptionKey: 'components.radio.css_vars.dot_size',
            descriptionFallback: 'Diameter of the inner dot rendered when checked.'
        },
        {
            name: '--origam-radio__dot---background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.radio.css_vars.dot_background_color',
            descriptionFallback: 'Background color of the inner dot.'
        },
        {
            name: '--origam-selection-control--density',
            defaultValue: '0px',
            descriptionKey: 'components.radio.css_vars.density',
            descriptionFallback: 'Density modifier offset: compact → -8px, comfortable → +8px.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.radio.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to sub-components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.radio.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed radioStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.radio.exposed.id',
            descriptionFallback: 'Computed input id (prop or auto-generated).'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.radio.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.radio.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.radio.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        },
        {
            name: 'styleId',
            type: 'string',
            descriptionKey: 'components.radio.exposed.style_id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['radio'],
        keyboard: [
            {
                key: 'Space',
                actionKey: 'components.radio.a11y.key_space',
                actionFallback: 'Selects the radio when focused.'
            },
            {
                key: 'Tab',
                actionKey: 'components.radio.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            },
            {
                key: 'Arrow keys (in group)',
                actionKey: 'components.radio.a11y.key_arrows',
                actionFallback: 'Navigates between radio options in a RadioGroup.'
            }
        ],
        notes: [
            {
                noteKey: 'components.radio.a11y.disabled_note',
                noteFallback: 'When disabled, aria-disabled="true" is set on the native input. Pointer events are suppressed via CSS.'
            },
            {
                noteKey: 'components.radio.a11y.label_note',
                noteFallback: 'The label is associated with the input via the for/id pair managed by OrigamLabel. Clicking the label activates the control.'
            },
            {
                noteKey: 'components.radio.a11y.group_note',
                noteFallback: 'RadioGroup sets aria-labelledby and aria-describedby on the group container for screen-reader announcements.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/radio.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'radio.input.size',
                value: '20px',
                type: 'dimension',
                descriptionKey: 'components.radio.tokens.input_size',
                descriptionFallback: 'Diameter of the circular radio input.'
            },
            {
                tokenPath: 'radio.input.border-color',
                value: '{color.border.default}',
                type: 'color',
                descriptionKey: 'components.radio.tokens.input_border_color',
                descriptionFallback: 'Border color of the unchecked radio.'
            },
            {
                tokenPath: 'radio.input.border-color-checked',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.radio.tokens.input_border_color_checked',
                descriptionFallback: 'Border color when checked.'
            },
            {
                tokenPath: 'radio.dot.size',
                value: '10px',
                type: 'dimension',
                descriptionKey: 'components.radio.tokens.dot_size',
                descriptionFallback: 'Diameter of the inner selection dot.'
            },
            {
                tokenPath: 'radio.dot.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.radio.tokens.dot_background_color',
                descriptionFallback: 'Fill color of the selection dot when checked.'
            },
            {
                tokenPath: 'radio.input.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.radio.tokens.transition_duration',
                descriptionFallback: 'Transition duration for border and dot animations.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.radio.playground.color',
                labelFallback: 'Color / Intent',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' }
                ]
            },
            {
                prop: 'label',
                kind: 'text',
                labelKey: 'components.radio.playground.label',
                labelFallback: 'Label',
                defaultValue: 'Radio option'
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.radio.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'compact', value: 'compact' },
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.radio.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'readonly',
                kind: 'switch',
                labelKey: 'components.radio.playground.readonly',
                labelFallback: 'Readonly',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
