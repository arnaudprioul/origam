/**
 * /components/number-field — full documentation data for OrigamNumberField.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/NumberField/number-field.interface.ts  (props)
 *   - packages/ds/src/components/NumberField/OrigamNumberField.vue      (template BEM)
 *   - packages/ds/tokens/component/number-field.json                    (CSS tokens)
 *
 * OrigamNumberField extends IFieldProps + IInputProps + IVariantProps.
 * Key additions over a plain TextField: increment/decrement controls,
 * hold-and-repeat, min/max/step/precision clamping, split layout,
 * and compact mode.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const NUMBER_FIELD_DOC: IComponentDoc = {
    slug: 'number-field',
    name: 'NumberField',
    tag: 'origam-number-field',
    icon: 'mdi-numeric',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.number_field.description',
    descriptionFallback: 'Numeric input field with built-in increment/decrement controls, min/max/step clamping, precision formatting, hold-to-repeat, split layout, and full form validation support.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-numberfield--design',
    docUrl: 'http://localhost:4000/components/NumberField/OrigamNumberField',

    family: [],

    related: [
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'NumberField extends TextField internals (Field + Input composites).'
        },
        {
            slug: 'slider-field',
            name: 'SliderField',
            kind: 'component',
            descriptionKey: 'components.catalog.slider_field.description',
            descriptionFallback: 'Alternative for numeric ranges with a visual track.'
        }
    ],

    props: [
        // ── Own NumberField props ──────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'number | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.number_field.props.model_value.description',
            descriptionFallback: 'The current numeric value. Use v-model to bind two-way.'
        },
        {
            name: 'min',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.min.description',
            descriptionFallback: 'Minimum allowed value. Clamps the model and disables the decrement button when reached.'
        },
        {
            name: 'max',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.max.description',
            descriptionFallback: 'Maximum allowed value. Clamps the model and disables the increment button when reached.'
        },
        {
            name: 'step',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.number_field.props.step.description',
            descriptionFallback: 'Increment/decrement step size. Also used as the native <input type="number" step> attribute.'
        },
        {
            name: 'precision',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.precision.description',
            descriptionFallback: 'Number of decimal places. When set, the displayed value is formatted with toFixed(precision).'
        },
        {
            name: 'incrementIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'mdi-plus',
            descriptionKey: 'components.number_field.props.increment_icon.description',
            descriptionFallback: 'Icon for the increment (+) control button.'
        },
        {
            name: 'decrementIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'mdi-minus',
            descriptionKey: 'components.number_field.props.decrement_icon.description',
            descriptionFallback: 'Icon for the decrement (−) control button.'
        },
        {
            name: 'holdDelay',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '500',
            descriptionKey: 'components.number_field.props.hold_delay.description',
            descriptionFallback: 'Milliseconds before hold-to-repeat starts when holding a control button.'
        },
        {
            name: 'holdRepeat',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.number_field.props.hold_repeat.description',
            descriptionFallback: 'Interval in milliseconds between repeated increments/decrements during hold.'
        },
        {
            name: 'split',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.split.description',
            descriptionFallback: 'Places the decrement button to the left and increment button to the right of the input.'
        },
        {
            name: 'hideControls',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.hide_controls.description',
            descriptionFallback: 'Hides the increment/decrement control buttons entirely.'
        },
        {
            name: 'compact',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.compact.description',
            descriptionFallback: 'Compact layout: buttons are stacked vertically to the right of the input.'
        },
        {
            name: 'autofocus',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.autofocus.description',
            descriptionFallback: 'Auto-focuses the input on mount.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.placeholder.description',
            descriptionFallback: 'Placeholder text shown when the field is empty and not focused.'
        },
        {
            name: 'persistentPlaceholder',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.persistent_placeholder.description',
            descriptionFallback: 'Keeps the placeholder visible even when the field is focused.'
        },
        {
            name: 'hideInput',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.hide_input.description',
            descriptionFallback: 'Hides the text input, leaving only the increment/decrement controls visible.'
        },
        // ── IFieldProps (selected subset) ───────────────────────────────
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.label.description',
            descriptionFallback: 'Floating label text displayed above / inside the field.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.disabled.description',
            descriptionFallback: 'Disables the field and all controls.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.readonly.description',
            descriptionFallback: 'Makes the field read-only. Controls are hidden in readonly mode.'
        },
        {
            name: 'loading',
            type: { label: 'TLoadingValue', slug: 'loading-value', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.loading.description',
            descriptionFallback: 'Shows a loading indicator inside the field.'
        },
        {
            name: 'rules',
            type: { label: 'Array<ValidationRule>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.number_field.props.rules.description',
            descriptionFallback: 'Validation rules. Each rule is a function receiving the value and returning true or an error string.'
        },
        {
            name: 'errorMessages',
            type: { label: 'Array<string> | string', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.number_field.props.error_messages.description',
            descriptionFallback: 'External error messages injected directly (e.g. from server validation).'
        },
        {
            name: 'hint',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.hint.description',
            descriptionFallback: 'Helper text shown below the field.'
        },
        {
            name: 'persistentHint',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.number_field.props.persistent_hint.description',
            descriptionFallback: 'Keeps the hint text visible even when the field is not focused.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.prepend_icon.description',
            descriptionFallback: 'Icon displayed outside and before the field.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.append_icon.description',
            descriptionFallback: 'Icon displayed outside and after the field.'
        },
        {
            name: 'prependInnerIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.prepend_inner_icon.description',
            descriptionFallback: 'Icon displayed inside the field, before the input.'
        },
        {
            name: 'appendInnerIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_field.props.append_inner_icon.description',
            descriptionFallback: 'Icon displayed inside the field, after the input (overridden by controls when hideControls=false).'
        },
        // ── IVariantProps ───────────────────────────────────────────────
        {
            name: 'variant',
            type: { label: 'TVariant', slug: 'variant', kind: 'type' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.number_field.props.variant.description',
            descriptionFallback: 'Visual variant: outlined, filled, underlined, solo, plain, ghost.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'number | null', slug: '', kind: 'primitive' },
            descriptionKey: 'components.number_field.emits.update_model_value.description',
            descriptionFallback: 'Two-way binding for the numeric value. Fired on each change.'
        },
        {
            event: 'click:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.number_field.emits.click_control.description',
            descriptionFallback: 'Fired when either the increment or decrement button is clicked.'
        },
        {
            event: 'mousedown:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.number_field.emits.mousedown_control.description',
            descriptionFallback: 'Fired on pointerdown on a control button (used to start hold-to-repeat).'
        },
        {
            event: 'click:clear',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.number_field.emits.click_clear.description',
            descriptionFallback: 'Fired when the clear button is clicked (clearable=true).'
        },
        {
            event: 'increment',
            payload: { label: 'number | null', slug: '', kind: 'primitive' },
            descriptionKey: 'components.number_field.emits.increment.description',
            descriptionFallback: 'Fired after each increment step, carrying the new value.'
        },
        {
            event: 'decrement',
            payload: { label: 'number | null', slug: '', kind: 'primitive' },
            descriptionKey: 'components.number_field.emits.decrement.description',
            descriptionFallback: 'Fired after each decrement step, carrying the new value.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ id, isDisabled, isDirty, isValid, isReadonly }',
            descriptionKey: 'components.number_field.slots.default.description',
            descriptionFallback: 'Replaces the internal <input> element. Useful for custom input rendering.'
        },
        {
            slot: 'field',
            slotProps: '{ id, isDisabled, isDirty, isValid, isReadonly }',
            descriptionKey: 'components.number_field.slots.field.description',
            descriptionFallback: 'Replaces the entire field control area.'
        },
        {
            slot: 'increment',
            slotProps: '{ canIncrease, onControlClick, onUpControlMousedown, onControlMouseup }',
            descriptionKey: 'components.number_field.slots.increment.description',
            descriptionFallback: 'Custom increment button. Receives handler functions and the canIncrease state.'
        },
        {
            slot: 'decrement',
            slotProps: '{ canDecrease, onControlClick, onDownControlMousedown, onControlMouseup }',
            descriptionKey: 'components.number_field.slots.decrement.description',
            descriptionFallback: 'Custom decrement button. Receives handler functions and the canDecrease state.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.number_field.slots.prepend.description',
            descriptionFallback: 'Content placed outside and before the field.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.number_field.slots.append.description',
            descriptionFallback: 'Content placed outside and after the field.'
        },
        {
            slot: 'prependInner',
            slotProps: '—',
            descriptionKey: 'components.number_field.slots.prepend_inner.description',
            descriptionFallback: 'Content placed inside the field, before the input.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.number_field.slots.label.description',
            descriptionFallback: 'Custom label content replacing the default floating label.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.number_field.slots.loader.description',
            descriptionFallback: 'Custom loading indicator shown when loading=true.'
        },
        {
            slot: 'details',
            slotProps: '—',
            descriptionKey: 'components.number_field.slots.details.description',
            descriptionFallback: 'Replaces the entire details area (messages + counter).'
        },
        {
            slot: 'messages',
            slotProps: '{ messages }',
            descriptionKey: 'components.number_field.slots.messages.description',
            descriptionFallback: 'Custom message renderer below the field.'
        }
    ],

    examples: [
        {
            titleKey: 'components.number_field.examples.basic.title',
            titleFallback: 'Basic',
            lang: 'vue',
            code: `<template>
  <origam-number-field
    v-model="quantity"
    label="Quantity"
    :min="0"
    :max="100"
    :step="1"
  />
</template>`
        },
        {
            titleKey: 'components.number_field.examples.split.title',
            titleFallback: 'Split layout',
            lang: 'vue',
            code: `<template>
  <origam-number-field
    v-model="value"
    label="Price"
    split
    :precision="2"
    prepend-inner-icon="mdi-currency-usd"
  />
</template>`
        },
        {
            titleKey: 'components.number_field.examples.compact.title',
            titleFallback: 'Compact stacked controls',
            lang: 'vue',
            code: `<template>
  <origam-number-field
    v-model="count"
    label="Count"
    compact
    :min="1"
    :max="99"
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { label: 'Quantity', modelValue: 5, min: 0, max: 100 } },
        { label: 'split', props: { label: 'Price', modelValue: 19, split: true } },
        { label: 'compact', props: { label: 'Count', modelValue: 3, compact: true, min: 1, max: 99 } },
        { label: 'disabled', props: { label: 'Disabled', modelValue: 10, disabled: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-number-field',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamNumberField',
        svgDesc: 'Schematic of the NumberField component with 6 numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="30" y="20" width="640" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.4))" stroke-width="1.5"/>
  <text x="60" y="37" font-size="8" fill="var(--origam-color__text---secondary, #7c3aed)" font-family="'JetBrains Mono',monospace">Quantity</text>
  <rect x="60" y="44" width="480" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))"/>
  <text x="80" y="60" font-size="10" fill="var(--origam-color__text---primary, #111)" font-family="'JetBrains Mono',monospace">5</text>
  <rect x="560" y="24" width="48" height="52" rx="3" fill="var(--origam-color__action--secondary---bgHover, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="584" y="38" font-size="14" fill="var(--origam-color__text---primary, #7c3aed)" text-anchor="middle">+</text>
  <text x="584" y="64" font-size="14" fill="var(--origam-color__text---primary, #7c3aed)" text-anchor="middle">−</text>
  <rect x="30" y="90" width="640" height="26" rx="3" fill="transparent"/>
  <text x="60" y="107" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" font-family="'JetBrains Mono',monospace">origam-messages__message — hint text</text>
  <circle cx="26" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="26" y="28" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="26" cy="90" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="26" y="94" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="550" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="550" y="28" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="550" cy="42" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="550" y="46" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="550" cy="62" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="550" y="66" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="26" cy="52" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="26" y="56" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-number-field&gt;</code> — 6 parts: root field, input area, control container, increment button, decrement button, and messages/details row.',
        legend: [
            {
                num: 1,
                cls: '.origam-number-field',
                descriptionKey: 'components.number_field.anatomy.root',
                descriptionFallback: 'Root OrigamField container. Holds the label, input area, and details zone.'
            },
            {
                num: 2,
                cls: '.origam-messages (details slot)',
                descriptionKey: 'components.number_field.anatomy.messages',
                descriptionFallback: 'Details zone below the field — renders hint, error messages, and counter.'
            },
            {
                num: 3,
                cls: '.origam-number-field__control',
                descriptionKey: 'components.number_field.anatomy.control',
                descriptionFallback: 'Wrapper for the stacked or split increment/decrement buttons.'
            },
            {
                num: 4,
                cls: '.origam-number-field__compact-input',
                descriptionKey: 'components.number_field.anatomy.compact_input',
                descriptionFallback: 'Compact-mode inner input shown between the stacked controls.'
            },
            {
                num: 5,
                cls: 'increment button',
                descriptionKey: 'components.number_field.anatomy.increment',
                descriptionFallback: 'Increment (+) button. aria-label="Increment". Disabled when value >= max.'
            },
            {
                num: 6,
                cls: 'decrement button',
                descriptionKey: 'components.number_field.anatomy.decrement',
                descriptionFallback: 'Decrement (−) button. aria-label="Decrement". Disabled when value <= min.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-field class="origam-number-field">
  <!-- outer prepend / append slots -->
  <slot name="prepend"/>

  <!-- field composite: label + input + inner icons + controls -->
  <slot name="field">
    <!-- label, prefix, input, suffix are managed by OrigamInput -->
    <div class="origam-number-field__control" role="group" :aria-label="label">
      <!-- decrement (split-left or stacked-bottom) -->
      <origam-btn aria-label="Decrement" @click="decrement" />

      <!-- native <input type="number"> -->
      <input class="origam-number-field__compact-input" :aria-label="label" />

      <!-- increment (split-right or stacked-top) -->
      <origam-btn aria-label="Increment" @click="increment" />
    </div>
  </slot>

  <slot name="append"/>

  <!-- details: messages + counter -->
  <slot name="details">
    <origam-messages :messages="errorMessages" />
  </slot>
</origam-field>`,
        classes: [
            {
                cls: 'origam-number-field',
                descriptionKey: 'components.number_field.anatomy.root',
                descriptionFallback: 'Root field container.'
            },
            {
                cls: 'origam-number-field__control',
                descriptionKey: 'components.number_field.anatomy.control',
                descriptionFallback: 'Wrapper for the increment/decrement controls (role="group").'
            },
            {
                cls: 'origam-number-field__compact-input',
                descriptionKey: 'components.number_field.anatomy.compact_input',
                descriptionFallback: 'Input element shown between stacked controls in compact mode.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-number-field---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.number_field.css_vars.background_color',
            descriptionFallback: 'Field background color.'
        },
        {
            name: '--origam-number-field---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.number_field.css_vars.color',
            descriptionFallback: 'Field text color.'
        },
        {
            name: '--origam-number-field---border-color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.number_field.css_vars.border_color',
            descriptionFallback: 'Default border color. Overridden to focus / error variants on interaction.'
        },
        {
            name: '--origam-number-field---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.number_field.css_vars.border_radius',
            descriptionFallback: 'Border-radius of the field container.'
        },
        {
            name: '--origam-number-field---opacity-disabled',
            defaultValue: '{opacity.50}',
            descriptionKey: 'components.number_field.css_vars.opacity_disabled',
            descriptionFallback: 'Opacity applied when disabled=true.'
        },
        {
            name: '--origam-number-field__increment---background-color-hover',
            defaultValue: '{color.action.secondary.bgHover}',
            descriptionKey: 'components.number_field.css_vars.increment_bg_hover',
            descriptionFallback: 'Background of the increment button on hover.'
        },
        {
            name: '--origam-number-field__decrement---background-color-hover',
            defaultValue: '{color.action.secondary.bgHover}',
            descriptionKey: 'components.number_field.css_vars.decrement_bg_hover',
            descriptionFallback: 'Background of the decrement button on hover.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['group', 'spinbutton'],
        keyboard: [
            {
                key: 'ArrowUp',
                actionKey: 'components.number_field.a11y.key_increment',
                actionFallback: 'Increments the value by step.'
            },
            {
                key: 'ArrowDown',
                actionKey: 'components.number_field.a11y.key_decrement',
                actionFallback: 'Decrements the value by step.'
            },
            {
                key: 'Tab',
                actionKey: 'components.number_field.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element (input → increment → decrement).'
            }
        ],
        notes: [
            {
                noteKey: 'components.number_field.a11y.group_note',
                noteFallback: 'The control container has role="group" and aria-label matching the field label, grouping the input + buttons semantically.'
            },
            {
                noteKey: 'components.number_field.a11y.button_labels',
                noteFallback: 'Increment and decrement buttons have aria-label="Increment" and aria-label="Decrement" respectively. They also have aria-hidden="true" on their icon children.'
            },
            {
                noteKey: 'components.number_field.a11y.disabled_note',
                noteFallback: 'When value reaches min or max, the corresponding button is disabled (pointer-events: none, aria-disabled="true").'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/number-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'number-field.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.number_field.tokens.background_color',
                descriptionFallback: 'Field background.'
            },
            {
                tokenPath: 'number-field.border-color',
                value: '{color.border.default}',
                type: 'color',
                descriptionKey: 'components.number_field.tokens.border_color',
                descriptionFallback: 'Default border. Focus overrides to {color.border.focus}.'
            },
            {
                tokenPath: 'number-field.border-color-focus',
                value: '{color.border.focus}',
                type: 'color',
                descriptionKey: 'components.number_field.tokens.border_color_focus',
                descriptionFallback: 'Border color in focused state.'
            },
            {
                tokenPath: 'number-field.border-color-error',
                value: '{color.feedback.danger.border}',
                type: 'color',
                descriptionKey: 'components.number_field.tokens.border_color_error',
                descriptionFallback: 'Border color in error state.'
            },
            {
                tokenPath: 'number-field.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.number_field.tokens.border_radius',
                descriptionFallback: 'Field border-radius.'
            },
            {
                tokenPath: 'number-field.increment.background-color-hover',
                value: '{color.action.secondary.bgHover}',
                type: 'color',
                descriptionKey: 'components.number_field.tokens.increment_bg_hover',
                descriptionFallback: 'Increment button hover background.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'modelValue',
                kind: 'number',
                labelKey: 'components.number_field.playground.model_value',
                labelFallback: 'Value',
                defaultValue: 5
            },
            {
                prop: 'min',
                kind: 'number',
                labelKey: 'components.number_field.playground.min',
                labelFallback: 'Min',
                defaultValue: 0
            },
            {
                prop: 'max',
                kind: 'number',
                labelKey: 'components.number_field.playground.max',
                labelFallback: 'Max',
                defaultValue: 100
            },
            {
                prop: 'step',
                kind: 'number',
                labelKey: 'components.number_field.playground.step',
                labelFallback: 'Step',
                defaultValue: 1
            },
            {
                prop: 'split',
                kind: 'switch',
                labelKey: 'components.number_field.playground.split',
                labelFallback: 'Split layout',
                defaultValue: false
            },
            {
                prop: 'compact',
                kind: 'switch',
                labelKey: 'components.number_field.playground.compact',
                labelFallback: 'Compact',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.number_field.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'variant',
                kind: 'select',
                labelKey: 'components.number_field.playground.variant',
                labelFallback: 'Variant',
                defaultValue: 'outlined',
                options: [
                    { label: 'outlined', value: 'outlined' },
                    { label: 'filled', value: 'filled' },
                    { label: 'underlined', value: 'underlined' },
                    { label: 'solo', value: 'solo' },
                    { label: 'plain', value: 'plain' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
