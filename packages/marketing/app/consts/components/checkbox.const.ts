/**
 * /components/checkbox — full documentation data for OrigamCheckbox.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Checkbox/checkbox.interface.ts      (ICheckboxProps, ICheckboxEmits, ICheckboxSlots)
 *   - packages/ds/src/interfaces/Checkbox/checkbox-btn.interface.ts  (ICheckboxBtnProps)
 *   - packages/ds/src/components/Checkbox/OrigamCheckbox.vue         (template, defineExpose)
 *   - packages/ds/tokens/component/checkbox.json                     (CSS tokens)
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

export const CHECKBOX_DOC: IComponentDoc = {
    slug: 'checkbox',
    name: 'Checkbox',
    tag: 'origam-checkbox',
    icon: 'mdi-checkbox-marked',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.checkbox.description',
    descriptionFallback: 'Form checkbox with label, hint, validation messages, indeterminate state, and full keyboard/accessibility support. Wraps OrigamInput and OrigamCheckboxBtn.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-checkbox--design',
    docUrl: 'http://localhost:4000/components/Checkbox/OrigamCheckbox',

    family: [
        {
            slug: 'checkbox-btn',
            name: 'CheckboxBtn',
            descriptionKey: 'components.catalog.checkbox_btn.description',
            descriptionFallback: 'Low-level checkbox control without the Input frame (no label, hint or validation messages).'
        }
    ],

    related: [
        {
            slug: 'input',
            name: 'Input',
            kind: 'component',
            descriptionKey: 'components.catalog.input.description',
            descriptionFallback: 'Base form input shell that Checkbox wraps for label, messages and density.'
        },
        {
            slug: 'switch',
            name: 'Switch',
            kind: 'component',
            descriptionKey: 'components.catalog.switch.description',
            descriptionFallback: 'Toggle variant of the same selection-control family.'
        }
    ],

    props: [
        // ── ICheckboxBtnProps (via ICheckboxProps) ─────────────────────
        {
            name: 'modelValue',
            type: { label: 'unknown', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.model_value.description',
            descriptionFallback: 'Bound value of the checkbox. Use with v-model. Accepts boolean, array or any trueValue/falseValue.'
        },
        {
            name: 'indeterminate',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox.props.indeterminate.description',
            descriptionFallback: 'Puts the checkbox in an indeterminate (neither checked nor unchecked) state. Typically used for "select all" parent checkboxes.'
        },
        {
            name: 'indeterminateIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.indeterminate_icon.description',
            descriptionFallback: 'Icon rendered inside the checkbox when in indeterminate state.'
        },
        {
            name: 'trueValue',
            type: { label: 'unknown', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.checkbox.props.true_value.description',
            descriptionFallback: 'Value used for the checked state. Defaults to boolean true.'
        },
        {
            name: 'falseValue',
            type: { label: 'unknown', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox.props.false_value.description',
            descriptionFallback: 'Value used for the unchecked state. Defaults to boolean false.'
        },
        {
            name: 'value',
            type: { label: 'unknown', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.value.description',
            descriptionFallback: 'Value used when this checkbox is part of an array-bound group (v-model is an array).'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.label.description',
            descriptionFallback: 'Text label rendered next to the checkbox.'
        },
        {
            name: 'id',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.id.description',
            descriptionFallback: 'HTML id attribute. Auto-generated as "checkbox-{uid}" when omitted.'
        },
        // ── IInputProps ────────────────────────────────────────────────
        {
            name: 'hideDetails',
            type: { label: "boolean | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox.props.hide_details.description',
            descriptionFallback: "Hides the messages/hint area. 'auto' hides when there are no messages."
        },
        {
            name: 'hint',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.hint.description',
            descriptionFallback: 'Helper text displayed below the checkbox.'
        },
        {
            name: 'persistentHint',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox.props.persistent_hint.description',
            descriptionFallback: 'Always shows the hint even when the checkbox is not focused.'
        },
        {
            name: 'messages',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.messages.description',
            descriptionFallback: 'Validation or informational messages displayed below the checkbox.'
        },
        // ── IStatusProps (via ISelectionControlProps) ──────────────────
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox.props.disabled.description',
            descriptionFallback: 'Disables the checkbox. Sets aria-disabled and prevents interaction.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox.props.readonly.description',
            descriptionFallback: 'Makes the checkbox non-interactive without visually disabling it.'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox.props.error.description',
            descriptionFallback: 'Puts the checkbox in an error state (red border and icon).'
        },
        {
            name: 'errorMessages',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.error_messages.description',
            descriptionFallback: 'Error messages displayed below the checkbox when in error state.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the checked state background and border.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.checkbox.props.density.description',
            descriptionFallback: 'Adjusts the vertical padding density of the input frame.'
        },
        // ── IRoundedProps / IBorderProps / IElevationProps ─────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.rounded.description',
            descriptionFallback: 'Border-radius override.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox.props.border.description',
            descriptionFallback: 'Applies a border to the input frame.'
        },
        // ── IPaddingProps / IMarginProps ───────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.padding.description',
            descriptionFallback: 'Padding applied to the checkbox root element.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox.props.margin.description',
            descriptionFallback: 'Margin applied to the checkbox root element.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'unknown', slug: '', kind: 'primitive' },
            descriptionKey: 'components.checkbox.emits.update_model_value.description',
            descriptionFallback: 'Fired when the checked state changes. Carries the new value (trueValue or falseValue).'
        },
        {
            event: 'update:indeterminate',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.checkbox.emits.update_indeterminate.description',
            descriptionFallback: 'Fired when the indeterminate state is cleared by user interaction.'
        },
        {
            event: 'update:focused',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.checkbox.emits.update_focused.description',
            descriptionFallback: 'Fired when the checkbox gains or loses focus.'
        },
        {
            event: 'click:label',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.checkbox.emits.click_label.description',
            descriptionFallback: 'Fired when the user clicks the label text.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ id, messagesId, isDisabled, isReadonly, isValid }',
            descriptionKey: 'components.checkbox.slots.default.description',
            descriptionFallback: 'Replaces the entire CheckboxBtn (advanced). Receives the computed input state for wiring ARIA.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.checkbox.slots.label.description',
            descriptionFallback: 'Custom label content. Replaces the text label rendered next to the checkbox.'
        },
        {
            slot: 'input',
            slotProps: '{ props, icon, textColorStyles, backgroundColorStyles, model }',
            descriptionKey: 'components.checkbox.slots.input.description',
            descriptionFallback: 'Replaces the visual checkbox control (the styled box and icon). Useful for a completely custom indicator.'
        }
    ],

    examples: [
        {
            titleKey: 'components.checkbox.examples.basic.title',
            titleFallback: 'Basic checkbox',
            lang: 'vue',
            code: `<template>
  <origam-checkbox v-model="agreed" label="I agree to the terms" />
</template>

<script setup lang="ts">
const agreed = ref(false)
</script>`
        },
        {
            titleKey: 'components.checkbox.examples.indeterminate.title',
            titleFallback: 'Indeterminate state',
            lang: 'vue',
            code: `<template>
  <origam-checkbox
    v-model="allSelected"
    :indeterminate="someSelected"
    label="Select all"
    color="primary"
  />
  <origam-checkbox
    v-for="item in items"
    :key="item.id"
    v-model="selected"
    :value="item.id"
    :label="item.name"
  />
</template>`
        },
        {
            titleKey: 'components.checkbox.examples.validation.title',
            titleFallback: 'With validation',
            lang: 'vue',
            code: `<template>
  <origam-checkbox
    v-model="accepted"
    label="Accept privacy policy"
    :error="!accepted"
    error-messages="You must accept the privacy policy."
    color="primary"
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'unchecked', props: { color: 'primary' }, slotContent: '' },
        { label: 'checked', props: { color: 'primary', modelValue: true }, slotContent: '' },
        { label: 'indeterminate', props: { color: 'primary', indeterminate: true }, slotContent: '' },
        { label: 'disabled', props: { disabled: true }, slotContent: '' },
        { label: 'error', props: { error: true }, slotContent: '' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-checkbox',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamCheckbox',
        svgDesc: 'Schematic of the Checkbox component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="40" width="660" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="50" y="76" width="40" height="40" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <polyline points="58,97 68,108 82,84" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
  <rect x="110" y="86" width="220" height="20" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="220" y="100" font-size="12" fill="var(--origam-color__text---primary, #1a0f3c)" text-anchor="middle" font-family="sans-serif">Checkbox label</text>
  <rect x="20" y="130" width="660" height="20" rx="3" fill="none"/>
  <text x="360" y="143" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">Hint / validation messages</text>
  <circle cx="28" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="70" cy="70" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="70" y="74" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="220" cy="80" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="220" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="360" cy="134" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="360" y="138" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="68" cy="96" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="68" y="100" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <text x="350" y="185" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Checkbox wraps OrigamInput (frame) + OrigamCheckboxBtn (control)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-checkbox&gt;</code> — 5 internal parts.`,
        legend: [
            { num: 1, cls: '.origam-checkbox', descriptionKey: 'components.checkbox.anatomy.root', descriptionFallback: 'Root element extending OrigamInput. Holds the label, hint and messages frame.' },
            { num: 2, cls: '.origam-checkbox-btn', descriptionKey: 'components.checkbox.anatomy.btn', descriptionFallback: 'Visual checkbox control (OrigamCheckboxBtn). Contains the box and icon.' },
            { num: 3, cls: '.origam-selection-control__label', descriptionKey: 'components.checkbox.anatomy.label', descriptionFallback: 'Text label. Bound via htmlFor to the hidden native <input>.' },
            { num: 4, cls: '.origam-input__details', descriptionKey: 'components.checkbox.anatomy.details', descriptionFallback: 'Messages/hint area. Hidden when hideDetails=true.' },
            { num: 5, cls: '.origam-selection-control__input', descriptionKey: 'components.checkbox.anatomy.input', descriptionFallback: 'Hidden native <input type="checkbox"> that carries the value for form submissions.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-input class="origam-checkbox">
  <template #default="{ id, messagesId, isDisabled, isReadonly, isValid }">
    <origam-checkbox-btn
      :id="id"
      :aria-describedby="messagesId"
      :disabled="isDisabled"
      :error="!isValid"
      :readonly="isReadonly"
    >
      <!-- hidden native checkbox -->
      <input type="checkbox" class="origam-selection-control__input" />
      <!-- visual box + icon -->
      <span class="origam-checkbox-btn__box">
        <origam-icon class="origam-checkbox-btn__icon" />
      </span>
      <!-- label -->
      <label class="origam-selection-control__label" :for="id" />
    </origam-checkbox-btn>
  </template>
</origam-input>`,
        classes: [
            { cls: 'origam-checkbox', descriptionKey: 'components.checkbox.anatomy.root', descriptionFallback: 'Root element wrapping OrigamInput and OrigamCheckboxBtn.' },
            { cls: 'origam-checkbox-btn', descriptionKey: 'components.checkbox.anatomy.btn', descriptionFallback: 'Visual selection control (the styled square box + check icon).' },
            { cls: 'origam-selection-control__label', descriptionKey: 'components.checkbox.anatomy.label', descriptionFallback: 'Label element rendered beside the box.' },
            { cls: 'origam-selection-control__input', descriptionKey: 'components.checkbox.anatomy.input', descriptionFallback: 'Hidden native checkbox for form semantics.' },
            { cls: 'origam-input__details', descriptionKey: 'components.checkbox.anatomy.details', descriptionFallback: 'Hint and validation messages container.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-checkbox---min-height',
            defaultValue: '56px',
            descriptionKey: 'components.checkbox.css_vars.min_height',
            descriptionFallback: 'Minimum height of the checkbox input row, before density is applied.'
        },
        {
            name: '--origam-checkbox__input---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.checkbox.css_vars.input_bg',
            descriptionFallback: 'Background of the checkbox visual box in unchecked state.'
        },
        {
            name: '--origam-checkbox__input---background-color-checked',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.checkbox.css_vars.input_bg_checked',
            descriptionFallback: 'Background of the checkbox box when checked.'
        },
        {
            name: '--origam-checkbox__input---border-color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.checkbox.css_vars.input_border_color',
            descriptionFallback: 'Border color of the checkbox box in unchecked state.'
        },
        {
            name: '--origam-checkbox__input---border-color-checked',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.checkbox.css_vars.input_border_color_checked',
            descriptionFallback: 'Border color when checked.'
        },
        {
            name: '--origam-checkbox__input---border-radius',
            defaultValue: '{radius.xs}',
            descriptionKey: 'components.checkbox.css_vars.input_border_radius',
            descriptionFallback: 'Border radius of the checkbox box.'
        },
        {
            name: '--origam-checkbox__icon---color',
            defaultValue: '{color.text.onColor}',
            descriptionKey: 'components.checkbox.css_vars.icon_color',
            descriptionFallback: 'Color of the check mark icon inside the box.'
        },
        {
            name: '--origam-checkbox__label---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.checkbox.css_vars.label_color',
            descriptionFallback: 'Label text color.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.checkbox.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to OrigamInput or OrigamCheckboxBtn.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.checkbox.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'ComputedRef<string>',
            descriptionKey: 'components.checkbox.exposed.id',
            descriptionFallback: 'Resolved id string (prop or auto-generated).'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.checkbox.exposed.load',
            descriptionFallback: 'Injects the computed style sheet.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.checkbox.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.checkbox.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        },
        {
            name: 'styleId',
            type: 'string',
            descriptionKey: 'components.checkbox.exposed.style_id',
            descriptionFallback: 'Unique style-sheet ID for scoping injected CSS.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['checkbox'],
        keyboard: [
            {
                key: 'Space',
                actionKey: 'components.checkbox.a11y.key_space',
                actionFallback: 'Toggles the checked state. Native <input type="checkbox"> behaviour.'
            },
            {
                key: 'Tab',
                actionKey: 'components.checkbox.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.checkbox.a11y.aria_checked',
                noteFallback: 'The hidden native <input type="checkbox"> carries aria-checked (including "mixed" for indeterminate). Screen readers announce state correctly.'
            },
            {
                noteKey: 'components.checkbox.a11y.aria_describedby',
                noteFallback: 'aria-describedby links the checkbox to the messages container (messagesId) so validation errors are announced.'
            },
            {
                noteKey: 'components.checkbox.a11y.disabled',
                noteFallback: 'When disabled=true, the native input is disabled and pointer events are removed. Screen readers announce "dimmed" state.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/checkbox.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'checkbox.input.background-color-checked', value: '{color.action.primary.bg}', type: 'color', descriptionKey: 'components.checkbox.tokens.bg_checked', descriptionFallback: 'Background when checked.' },
            { tokenPath: 'checkbox.input.border-color', value: '{color.border.default}', type: 'color', descriptionKey: 'components.checkbox.tokens.border_color', descriptionFallback: 'Default border colour.' },
            { tokenPath: 'checkbox.input.border-radius', value: '{radius.xs}', type: 'dimension', descriptionKey: 'components.checkbox.tokens.border_radius', descriptionFallback: 'Corner radius of the box.' },
            { tokenPath: 'checkbox.icon.color', value: '{color.text.onColor}', type: 'color', descriptionKey: 'components.checkbox.tokens.icon_color', descriptionFallback: 'Checkmark icon colour.' },
            { tokenPath: 'checkbox.label.color', value: '{color.text.primary}', type: 'color', descriptionKey: 'components.checkbox.tokens.label_color', descriptionFallback: 'Label text colour.' },
            { tokenPath: 'checkbox.transition-duration', value: '{motion.duration.medium}', type: 'duration', descriptionKey: 'components.checkbox.tokens.transition_duration', descriptionFallback: 'Check/uncheck animation duration.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.checkbox.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.checkbox.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'compact', value: 'compact' }
                ]
            },
            {
                prop: 'indeterminate',
                kind: 'switch',
                labelKey: 'components.checkbox.playground.indeterminate',
                labelFallback: 'Indeterminate',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.checkbox.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'readonly',
                kind: 'switch',
                labelKey: 'components.checkbox.playground.readonly',
                labelFallback: 'Readonly',
                defaultValue: false
            },
            {
                prop: 'error',
                kind: 'switch',
                labelKey: 'components.checkbox.playground.error',
                labelFallback: 'Error',
                defaultValue: false
            }
        ],
        defaultSlotContent: ''
    } satisfies IComponentPlayground
}
