/**
 * /components/selection-control — full documentation data for OrigamSelectionControl.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/SelectionControl/selection-control.interface.ts      (props)
 *   - packages/ds/src/components/SelectionControl/OrigamSelectionControl.vue          (template BEM, defineExpose)
 *   - packages/ds/src/components/SelectionControl/OrigamSelectionControlGroup.vue     (sub-component)
 *   - packages/ds/tokens/component/selection-control.json                             (CSS tokens)
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

export const SELECTION_CONTROL_DOC: IComponentDoc = {
    slug: 'selection-control',
    name: 'SelectionControl',
    tag: 'origam-selection-control',
    icon: 'mdi-checkbox-marked-circle-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.selection_control.description',
    descriptionFallback: 'Base selection-control primitive used by Checkbox, Radio, Switch and similar inputs. Renders a ripple zone, a native input and a label with full ARIA support.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-selection-control--design',
    docUrl: 'http://localhost:4000/components/SelectionControl/OrigamSelectionControl',

    family: [
        {
            slug: 'selection-control-group',
            name: 'SelectionControlGroup',
            descriptionKey: 'components.catalog.selection_control_group.description',
            descriptionFallback: 'Groups multiple SelectionControl instances under a shared v-model with inline layout and item-slot API.'
        }
    ],

    related: [
        {
            slug: 'checkbox',
            name: 'Checkbox',
            kind: 'component',
            descriptionKey: 'components.selection_control.related.checkbox',
            descriptionFallback: 'Checkbox uses OrigamSelectionControl with type="checkbox".'
        },
        {
            slug: 'radio',
            name: 'Radio',
            kind: 'component',
            descriptionKey: 'components.selection_control.related.radio',
            descriptionFallback: 'RadioBtn uses OrigamSelectionControl with type="radio".'
        },
        {
            slug: 'switch',
            name: 'Switch',
            kind: 'component',
            descriptionKey: 'components.selection_control.related.switch',
            descriptionFallback: 'Switch uses OrigamSelectionControl with type="checkbox" and a custom icon layer.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.model_value.description',
            descriptionFallback: 'Current value. Bound with v-model. Compared against trueValue/falseValue (single) or array membership (group).'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.label.description',
            descriptionFallback: 'Label text displayed next to the control via OrigamLabel.'
        },
        {
            name: 'trueValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.true_value.description',
            descriptionFallback: 'Value emitted when the control is checked.'
        },
        {
            name: 'falseValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.false_value.description',
            descriptionFallback: 'Value emitted when the control is unchecked.'
        },
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.value.description',
            descriptionFallback: 'Value for group context. Used by SelectionControlGroup to determine membership.'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control.props.required.description',
            descriptionFallback: 'Marks the control as required.'
        },
        // ── ISelectionControlGroupProps (partial) ──────────────────────
        {
            name: 'type',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'checkbox'",
            descriptionKey: 'components.selection_control.props.type.description',
            descriptionFallback: 'Native input type. Usually checkbox or radio. Determines ARIA semantics.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.name.description',
            descriptionFallback: 'Name attribute for the native input. Groups radio buttons for browser behaviour.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control.props.disabled.description',
            descriptionFallback: 'Disables the control.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control.props.readonly.description',
            descriptionFallback: 'Makes the control read-only (no interaction).'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control.props.error.description',
            descriptionFallback: 'Puts the control in error state. Changes label and icon color.'
        },
        {
            name: 'trueIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.true_icon.description',
            descriptionFallback: 'MDI icon shown when the control is checked/true.'
        },
        {
            name: 'falseIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.false_icon.description',
            descriptionFallback: 'MDI icon shown when the control is unchecked/false.'
        },
        {
            name: 'inline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control.props.inline.description',
            descriptionFallback: 'Renders inline instead of block, useful for side-by-side controls.'
        },
        {
            name: 'valueComparator',
            type: { label: '(a: any, b: any) => boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.value_comparator.description',
            descriptionFallback: 'Custom equality function for comparing modelValue against trueValue.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the control icon and label.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control.props.bg_color.description',
            descriptionFallback: 'Background color applied to the ripple/wrapper area.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.selection_control.props.density.description',
            descriptionFallback: 'Controls the wrapper dimensions via density offset.'
        },
        // ── IRippleProps ───────────────────────────────────────────────
        {
            name: 'ripple',
            type: { label: "boolean | { class: string }", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.selection_control.props.ripple.description',
            descriptionFallback: 'Enables Material ripple effect on the control input zone.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.selection_control.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the user toggles the control. Carries the new value.'
        },
        {
            event: 'click:label',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.selection_control.emits.click_label.description',
            descriptionFallback: 'Fired when the user clicks the label area.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ model, color, bgColor, icon, props: { onFocus, onBlur, id } }',
            descriptionKey: 'components.selection_control.slots.default.description',
            descriptionFallback: 'Replaces the wrapper content. Receives the full control state (model, colors, icon, event handlers).'
        },
        {
            slot: 'input',
            slotProps: '{ model, color, bgColor, icon, props: { ...inputAttrs, disabled, label, name, type, value, onFocus, onBlur, id, onInput } }',
            descriptionKey: 'components.selection_control.slots.input.description',
            descriptionFallback: 'Replaces the native input element. Receives all input attributes and handlers. Falls back to icon + native input when not provided.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.selection_control.slots.label.description',
            descriptionFallback: 'Custom label content replacing the default OrigamLabel.'
        }
    ],

    examples: [
        {
            titleKey: 'components.selection_control.examples.basic.title',
            titleFallback: 'Checkbox use case',
            lang: 'vue',
            code: `<template>
  <origam-selection-control
    v-model="checked"
    :true-value="true"
    :false-value="false"
    type="checkbox"
    true-icon="mdi-checkbox-marked"
    false-icon="mdi-checkbox-blank-outline"
    label="I agree to the terms"
    color="primary"
  />
</template>
<script setup>
const checked = ref(false)
</script>`
        },
        {
            titleKey: 'components.selection_control.examples.radio.title',
            titleFallback: 'Radio use case',
            lang: 'vue',
            code: `<template>
  <origam-selection-control
    v-model="selected"
    value="option-a"
    type="radio"
    true-icon="mdi-radiobox-marked"
    false-icon="mdi-radiobox-blank"
    label="Option A"
    color="success"
  />
</template>
<script setup>
const selected = ref('')
</script>`
        },
        {
            titleKey: 'components.selection_control.examples.custom_input.title',
            titleFallback: 'Custom input slot',
            lang: 'vue',
            code: `<template>
  <origam-selection-control v-model="val" type="checkbox" label="Custom">
    <template #input="{ model, props: inputProps }">
      <!-- fully custom input surface -->
      <div class="my-toggle" :class="{ 'my-toggle--on': model }" v-bind="inputProps">
        {{ model ? 'ON' : 'OFF' }}
      </div>
    </template>
  </origam-selection-control>
</template>`
        }
    ],

    previewVariants: [
        { label: 'unchecked', props: { color: 'primary', type: 'checkbox', trueIcon: 'mdi-checkbox-marked', falseIcon: 'mdi-checkbox-blank-outline', label: 'Unchecked' } },
        { label: 'checked',   props: { color: 'primary', type: 'checkbox', trueIcon: 'mdi-checkbox-marked', falseIcon: 'mdi-checkbox-blank-outline', label: 'Checked', modelValue: true, trueValue: true } },
        { label: 'radio',     props: { color: 'secondary', type: 'radio', trueIcon: 'mdi-radiobox-marked', falseIcon: 'mdi-radiobox-blank', label: 'Radio' } },
        { label: 'error',     props: { color: 'danger', type: 'checkbox', error: true, trueIcon: 'mdi-checkbox-marked', falseIcon: 'mdi-checkbox-blank-outline', label: 'Error' } },
        { label: 'disabled',  props: { disabled: true, type: 'checkbox', trueIcon: 'mdi-checkbox-marked', falseIcon: 'mdi-checkbox-blank-outline', label: 'Disabled' }, ariaLabel: 'Disabled selection control' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-selection-control',
        svgViewBox: '0 0 520 180',
        svgTitle: 'Anatomy of OrigamSelectionControl',
        svgDesc: 'Schematic of the SelectionControl component with 5 numbered parts.',
        svg: `
  <rect x="0" y="0" width="520" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="480" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="40" y="50" width="60" height="60" rx="30" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1.5"/>
  <text x="70" y="85" font-size="18" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">✓</text>
  <rect x="115" y="68" width="220" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="225" y="85" font-size="12" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Label text</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="50" cy="60" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="50" y="64" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="70" cy="54" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="70" y="58" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="70" cy="82" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="70" y="86" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="130" cy="60" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="130" y="64" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-selection-control&gt;</code> — 5 parts: root ①, wrapper ②, input zone ③ (with ripple), icon/native input ④, and label ⑤.`,
        legend: [
            {
                num: 1,
                cls: '.origam-selection-control',
                descriptionKey: 'components.selection_control.anatomy.root',
                descriptionFallback: 'Root element. Flex-row, aligns wrapper and label. Carries state modifiers (dirty, disabled, error, focused, inline).'
            },
            {
                num: 2,
                cls: '.origam-selection-control__wrapper',
                descriptionKey: 'components.selection_control.anatomy.wrapper',
                descriptionFallback: 'Square wrapper (40px + density). Hosts the ripple zone and the background color layer.'
            },
            {
                num: 3,
                cls: '.origam-selection-control__input',
                descriptionKey: 'components.selection_control.anatomy.input',
                descriptionFallback: 'Circular ripple zone (v-ripple). Contains the OrigamIcon (true/falseIcon) and the native input.'
            },
            {
                num: 4,
                cls: 'input[type="checkbox|radio"] (native)',
                descriptionKey: 'components.selection_control.anatomy.native_input',
                descriptionFallback: 'Visually hidden native input. Manages browser check state, form submission, and screen-reader focus.'
            },
            {
                num: 5,
                cls: '.origam-selection-control__label',
                descriptionKey: 'components.selection_control.anatomy.label',
                descriptionFallback: 'Label container. Renders OrigamLabel with for/id wiring.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-selection-control origam-selection-control--dirty">
  <!-- wrapper: ripple target + background color -->
  <div class="origam-selection-control__wrapper">
    <!-- input zone with v-ripple -->
    <div class="origam-selection-control__input">
      <!-- icon (true/false icon) -->
      <origam-icon :icon="icon" :color="bgColor" />
      <!-- visually hidden native input -->
      <input type="checkbox" :id :name :value :checked :disabled />
    </div>
  </div>

  <!-- label -->
  <div class="origam-selection-control__label">
    <origam-label :for="id" :text="label" :color="color" />
  </div>
</div>`,
        classes: [
            { cls: 'origam-selection-control', descriptionKey: 'components.selection_control.anatomy.root', descriptionFallback: 'Root block.' },
            { cls: 'origam-selection-control--dirty', descriptionKey: 'components.selection_control.anatomy.modifier_dirty', descriptionFallback: 'Applied when modelValue is truthy (checked state).' },
            { cls: 'origam-selection-control--disabled', descriptionKey: 'components.selection_control.anatomy.modifier_disabled', descriptionFallback: 'Applied when disabled=true.' },
            { cls: 'origam-selection-control--error', descriptionKey: 'components.selection_control.anatomy.modifier_error', descriptionFallback: 'Applied when error=true. Changes icon and label color.' },
            { cls: 'origam-selection-control--focused', descriptionKey: 'components.selection_control.anatomy.modifier_focused', descriptionFallback: 'Applied when the native input is focused.' },
            { cls: 'origam-selection-control--focus-visible', descriptionKey: 'components.selection_control.anatomy.modifier_focus_visible', descriptionFallback: 'Applied on keyboard focus for the visible outline.' },
            { cls: 'origam-selection-control--inline', descriptionKey: 'components.selection_control.anatomy.modifier_inline', descriptionFallback: 'Applied when inline=true.' },
            { cls: 'origam-selection-control__wrapper', descriptionKey: 'components.selection_control.anatomy.wrapper', descriptionFallback: 'Inner wrapper hosting ripple and background.' },
            { cls: 'origam-selection-control__input', descriptionKey: 'components.selection_control.anatomy.input', descriptionFallback: 'Ripple zone with icon and native input.' },
            { cls: 'origam-selection-control__label', descriptionKey: 'components.selection_control.anatomy.label', descriptionFallback: 'Label container.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-selection-control---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.selection_control.css_vars.color',
            descriptionFallback: 'Default text/icon color.'
        },
        {
            name: '--origam-selection-control---color-disabled',
            defaultValue: '{color.text.disabled}',
            descriptionKey: 'components.selection_control.css_vars.color_disabled',
            descriptionFallback: 'Color when the control is disabled.'
        },
        {
            name: '--origam-selection-control---color-error',
            defaultValue: '{color.feedback.danger.bg}',
            descriptionKey: 'components.selection_control.css_vars.color_error',
            descriptionFallback: 'Color when the control is in error state.'
        },
        {
            name: '--origam-selection-control---opacity-disabled',
            defaultValue: '{opacity.50}',
            descriptionKey: 'components.selection_control.css_vars.opacity_disabled',
            descriptionFallback: 'Opacity of the entire control when disabled.'
        },
        {
            name: '--origam-selection-control---density',
            defaultValue: '0px',
            descriptionKey: 'components.selection_control.css_vars.density',
            descriptionFallback: 'Density modifier. compact → -8px, comfortable → +8px.'
        },
        {
            name: '--origam-selection-control---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.selection_control.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for icon and color animations.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.selection_control.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to sub-components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.selection_control.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.selection_control.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.selection_control.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.selection_control.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.selection_control.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['checkbox', 'radio'],
        keyboard: [
            {
                key: 'Space',
                actionKey: 'components.selection_control.a11y.key_space',
                actionFallback: 'Toggles the checkbox or selects the radio option.'
            },
            {
                key: 'Tab',
                actionKey: 'components.selection_control.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.selection_control.a11y.native_note',
                noteFallback: 'A native <input type="checkbox|radio"> is always rendered (even when the input slot is customised). This ensures browser-native focus, keyboard handling and form participation.'
            },
            {
                noteKey: 'components.selection_control.a11y.aria_checked_note',
                noteFallback: 'aria-checked is set automatically by the native input. For type="checkbox", aria-checked is forwarded explicitly via the :aria-checked binding.'
            },
            {
                noteKey: 'components.selection_control.a11y.label_note',
                noteFallback: 'The label is wired to the input via for/id. Clicking the label toggles the control and fires click:label.'
            },
            {
                noteKey: 'components.selection_control.a11y.error_note',
                noteFallback: 'When error=true, the label and icon adopt --origam-selection-control---color-error for visual feedback. No aria-invalid is set at this layer — use OrigamInput / form-level components for validation semantics.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/selection-control.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'selection-control.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.selection_control.tokens.color',
                descriptionFallback: 'Default control color.'
            },
            {
                tokenPath: 'selection-control.color-disabled',
                value: '{color.text.disabled}',
                type: 'color',
                descriptionKey: 'components.selection_control.tokens.color_disabled',
                descriptionFallback: 'Color when disabled.'
            },
            {
                tokenPath: 'selection-control.opacity-disabled',
                value: '{opacity.50}',
                type: 'number',
                descriptionKey: 'components.selection_control.tokens.opacity_disabled',
                descriptionFallback: 'Opacity when disabled.'
            },
            {
                tokenPath: 'selection-control.wrapper.width',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.selection_control.tokens.wrapper_width',
                descriptionFallback: 'Base width of the ripple wrapper (before density offset).'
            },
            {
                tokenPath: 'selection-control.wrapper.height',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.selection_control.tokens.wrapper_height',
                descriptionFallback: 'Base height of the ripple wrapper.'
            },
            {
                tokenPath: 'selection-control.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.selection_control.tokens.transition_duration',
                descriptionFallback: 'Transition duration for icon/color animations.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'type',
                kind: 'select',
                labelKey: 'components.selection_control.playground.type',
                labelFallback: 'Type',
                defaultValue: 'checkbox',
                options: [
                    { label: 'checkbox', value: 'checkbox' },
                    { label: 'radio', value: 'radio' }
                ]
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.selection_control.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' }
                ]
            },
            {
                prop: 'label',
                kind: 'text',
                labelKey: 'components.selection_control.playground.label',
                labelFallback: 'Label',
                defaultValue: 'Option label'
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.selection_control.playground.density',
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
                labelKey: 'components.selection_control.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'error',
                kind: 'switch',
                labelKey: 'components.selection_control.playground.error',
                labelFallback: 'Error',
                defaultValue: false
            },
            {
                prop: 'inline',
                kind: 'switch',
                labelKey: 'components.selection_control.playground.inline',
                labelFallback: 'Inline',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
