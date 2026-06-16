/**
 * /components/checkbox-btn — full documentation data for OrigamCheckboxBtn.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Checkbox/checkbox-btn.interface.ts   (ICheckboxBtnProps / ICheckboxBtnEmits / ICheckboxBtnSlots)
 *   - packages/ds/src/interfaces/SelectionControl/selection-control.interface.ts  (ISelectionControlProps / ISelectionControlEmits)
 *   - packages/ds/src/components/Checkbox/OrigamCheckboxBtn.vue        (template BEM, defineExpose)
 *   - packages/ds/tokens/component/checkbox-btn.json                  (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentA11y,
    IComponentCssVar,
    IComponentExposed,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant
} from '~/interfaces/components-catalog.interface'

export const CHECKBOX_BTN_DOC: IComponentDoc = {
    slug: 'checkbox-btn',
    name: 'CheckboxBtn',
    tag: 'origam-checkbox-btn',
    icon: 'mdi-checkbox-marked-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.checkbox_btn.description',
    descriptionFallback: 'Low-level checkbox control without the Input frame. Wraps OrigamSelectionControl to expose just the interactive icon and optional label, without hint or validation message wrappers.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-checkboxbtn--design',
    docUrl: 'http://localhost:4000/components/Checkbox/OrigamCheckboxBtn',

    parentSlug: 'checkbox',

    family: [],

    related: [
        {
            slug: 'checkbox',
            name: 'Checkbox',
            kind: 'component',
            descriptionKey: 'components.catalog.checkbox.description',
            descriptionFallback: 'Full Checkbox wrapping CheckboxBtn in an Input frame with label, hint and validation.'
        },
        {
            slug: 'selection-control',
            name: 'SelectionControl',
            kind: 'component',
            descriptionKey: 'components.catalog.selection_control.description',
            descriptionFallback: 'Low-level primitive that CheckboxBtn delegates to for model and icon management.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox_btn.props.model_value.description',
            descriptionFallback: 'Bound checked state. Supports v-model binding with booleans, arrays or custom true/false values.'
        },
        {
            name: 'indeterminate',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox_btn.props.indeterminate.description',
            descriptionFallback: 'When true the indeterminateIcon is shown and aria-checked="mixed" is set. Automatically cleared on the first change.'
        },
        {
            name: 'indeterminateIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'MDI_ICONS.MINUS_BOX',
            descriptionKey: 'components.checkbox_btn.props.indeterminate_icon.description',
            descriptionFallback: 'Icon rendered when indeterminate=true. Overrides both trueIcon and falseIcon.'
        },
        {
            name: 'trueValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.checkbox_btn.props.true_value.description',
            descriptionFallback: 'Value emitted when the checkbox is checked. Useful for v-model with non-boolean arrays.'
        },
        {
            name: 'falseValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox_btn.props.false_value.description',
            descriptionFallback: 'Value emitted when the checkbox is unchecked.'
        },
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox_btn.props.value.description',
            descriptionFallback: 'Item value when used inside a selection group (e.g. BtnToggle). Checked state is determined by group membership.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox_btn.props.label.description',
            descriptionFallback: 'Text label rendered adjacent to the checkbox icon.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox_btn.props.color.description',
            descriptionFallback: 'Foreground colour of the checked icon and label text.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.checkbox_btn.props.bg_color.description',
            descriptionFallback: 'Background colour override for the control surface.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: 'DENSITY.DEFAULT',
            descriptionKey: 'components.checkbox_btn.props.density.description',
            descriptionFallback: 'Adjusts vertical padding density of the control.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox_btn.props.disabled.description',
            descriptionFallback: 'Disables the checkbox. Sets aria-disabled and prevents interaction.'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.checkbox_btn.props.required.description',
            descriptionFallback: 'Sets the native required attribute on the underlying input.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.checkbox_btn.emits.update_model_value.description',
            descriptionFallback: 'Fired when the checked state changes. Emits the new value (boolean, array item, or trueValue/falseValue).'
        },
        {
            event: 'update:indeterminate',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.checkbox_btn.emits.update_indeterminate.description',
            descriptionFallback: 'Fired when indeterminate is cleared (always false). Cleared on first change.'
        },
        {
            event: 'update:focused',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.checkbox_btn.emits.update_focused.description',
            descriptionFallback: 'Fired when focus state changes.'
        },
        {
            event: 'click:label',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.checkbox_btn.emits.click_label.description',
            descriptionFallback: 'Fired when the user clicks the label area (not the icon).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.checkbox_btn.slots.default.description',
            descriptionFallback: 'Main label content. Overrides the label prop.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.checkbox_btn.slots.label.description',
            descriptionFallback: 'Custom label content rendered in the selection control label zone.'
        },
        {
            slot: 'input',
            slotProps: '{ props, icon, textColorStyles, backgroundColorStyles, model }',
            descriptionKey: 'components.checkbox_btn.slots.input.description',
            descriptionFallback: 'Replace the default checkbox icon / input element entirely. Receives model, current icon, and computed color style objects.'
        }
    ],

    examples: [
        {
            titleKey: 'components.checkbox_btn.examples.basic.title',
            titleFallback: 'Basic checkbox',
            lang: 'vue',
            code: `<template>
  <origam-checkbox-btn v-model="checked" label="Accept terms" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(false)
</script>`
        },
        {
            titleKey: 'components.checkbox_btn.examples.indeterminate.title',
            titleFallback: 'Indeterminate state',
            lang: 'vue',
            code: `<template>
  <origam-checkbox-btn
    v-model="selected"
    v-model:indeterminate="indeterminate"
    label="Select all"
    color="primary"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref(false)
const indeterminate = ref(true)
</script>`
        },
        {
            titleKey: 'components.checkbox_btn.examples.array.title',
            titleFallback: 'Array v-model (multi-select)',
            lang: 'vue',
            code: `<template>
  <div v-for="item in options" :key="item">
    <origam-checkbox-btn v-model="selected" :value="item" :label="item" />
  </div>
  <p>Selected: {{ selected.join(', ') }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const options = ['Vue', 'React', 'Angular']
const selected = ref<string[]>([])
</script>`
        }
    ],

    previewVariants: [
        { label: 'unchecked', props: { color: 'primary' }, slotContent: 'Unchecked' },
        { label: 'checked', props: { color: 'primary', modelValue: true }, slotContent: 'Checked' },
        { label: 'indeterminate', props: { color: 'primary', indeterminate: true }, slotContent: 'Indeterminate' },
        { label: 'disabled', props: { disabled: true }, slotContent: 'Disabled', ariaLabel: 'Disabled checkbox' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-checkbox-btn',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamCheckboxBtn',
        svgDesc: 'Schematic of the CheckboxBtn component — delegates to origam-selection-control.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="16" y="24" width="668" height="96" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="16" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">origam-checkbox-btn ①</text>
  <rect x="32" y="40" width="636" height="64" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="100" y="72" font-size="9" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-selection-control ②</text>
  <rect x="300" y="50" width="44" height="44" rx="22" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="322" y="76" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon ③</text>
  <rect x="360" y="60" width="120" height="24" rx="2" fill="var(--origam-color__surface---sunken, #f3f4f6)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1"/>
  <text x="420" y="76" font-size="9" fill="var(--origam-color__text---secondary, #6b7280)" text-anchor="middle" font-family="'JetBrains Mono',monospace">label / #label ④</text>
  <text x="350" y="148" font-size="8.5" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="sans-serif">Delegates all selection logic to OrigamSelectionControl (trueIcon / falseIcon / indeterminateIcon)</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-checkbox-btn&gt;</code> — 4 internal parts. The root ① carries a single <code>origam-selection-control</code> ② child which renders the icon ③ and label ④.',
        legend: [
            { num: 1, cls: '.origam-checkbox-btn', descriptionKey: 'components.checkbox_btn.anatomy.root', descriptionFallback: 'Root element. Hosts origam-selection-control and passes through computed classes and styles.' },
            { num: 2, cls: 'origam-selection-control', descriptionKey: 'components.checkbox_btn.anatomy.selection_control', descriptionFallback: 'The underlying selection primitive. Manages model binding, focus, keyboard, ARIA and icon display.' },
            { num: 3, cls: 'icon (via #input slot)', descriptionKey: 'components.checkbox_btn.anatomy.icon', descriptionFallback: 'Checkbox icon: falseIcon (unchecked) → trueIcon (checked) → indeterminateIcon (mixed). Swappable via the #input slot.' },
            { num: 4, cls: 'label (via #label slot)', descriptionKey: 'components.checkbox_btn.anatomy.label', descriptionFallback: 'Label text area. Replaces the label prop when the #label slot is used.' }
        ],
        code: `<!-- root class carries BEM + host style -->
<origam-selection-control
  class="origam-checkbox-btn"
  type="checkbox"
  :true-icon="trueIcon"
  :false-icon="falseIcon"
  :aria-checked="indeterminate ? 'mixed' : undefined"
>
  <template #default>
    <slot name="default" />
  </template>
  <template #label>
    <slot name="label" />
  </template>
  <template #input="{ props, icon, textColorStyles, backgroundColorStyles, model }">
    <slot name="input" v-bind="{ props, icon, textColorStyles, backgroundColorStyles, model }" />
  </template>
</origam-selection-control>`,
        classes: [
            { cls: 'origam-checkbox-btn', descriptionKey: 'components.checkbox_btn.anatomy.root', descriptionFallback: 'Root BEM class applied to the origam-selection-control element.' }
        ]
    },

    cssVars: [
        {
            name: '--origam-checkbox-btn---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.checkbox_btn.css_vars.border_radius',
            descriptionFallback: 'Border radius of the button-checkbox container.'
        },
        {
            name: '--origam-checkbox-btn---background-color',
            defaultValue: '{color.action.secondary.bg}',
            descriptionKey: 'components.checkbox_btn.css_vars.background_color',
            descriptionFallback: 'Default background colour.'
        },
        {
            name: '--origam-checkbox-btn---background-color-hover',
            defaultValue: '{color.action.secondary.bgHover}',
            descriptionKey: 'components.checkbox_btn.css_vars.background_color_hover',
            descriptionFallback: 'Background colour on hover.'
        },
        {
            name: '--origam-checkbox-btn---background-color-checked',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.checkbox_btn.css_vars.background_color_checked',
            descriptionFallback: 'Background colour when checked.'
        },
        {
            name: '--origam-checkbox-btn---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.checkbox_btn.css_vars.color',
            descriptionFallback: 'Default foreground text colour.'
        },
        {
            name: '--origam-checkbox-btn---color-checked',
            defaultValue: '{color.text.onColor}',
            descriptionKey: 'components.checkbox_btn.css_vars.color_checked',
            descriptionFallback: 'Foreground colour when checked (on-primary surface).'
        },
        {
            name: '--origam-checkbox-btn---border-color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.checkbox_btn.css_vars.border_color',
            descriptionFallback: 'Default border colour.'
        },
        {
            name: '--origam-checkbox-btn---border-color-checked',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.checkbox_btn.css_vars.border_color_checked',
            descriptionFallback: 'Border colour when checked.'
        },
        {
            name: '--origam-checkbox-btn---font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.checkbox_btn.css_vars.font_size',
            descriptionFallback: 'Label font size.'
        },
        {
            name: '--origam-checkbox-btn---opacity-disabled',
            defaultValue: '{opacity.50}',
            descriptionKey: 'components.checkbox_btn.css_vars.opacity_disabled',
            descriptionFallback: 'Opacity when disabled.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.checkbox_btn.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.checkbox_btn.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.checkbox_btn.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.checkbox_btn.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.checkbox_btn.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.checkbox_btn.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['checkbox'],
        keyboard: [
            {
                key: 'Space',
                actionKey: 'components.checkbox_btn.a11y.key_space',
                actionFallback: 'Toggles the checked state (native checkbox behaviour).'
            },
            {
                key: 'Tab',
                actionKey: 'components.checkbox_btn.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.checkbox_btn.a11y.indeterminate',
                noteFallback: 'When indeterminate=true, aria-checked="mixed" is set on the underlying input element.'
            },
            {
                noteKey: 'components.checkbox_btn.a11y.disabled',
                noteFallback: 'Disabled state sets the native disabled attribute (the underlying input is a real <input type="checkbox">).'
            },
            {
                noteKey: 'components.checkbox_btn.a11y.focus',
                noteFallback: 'Focus-visible outline is applied via CSS to the selection control. Controlled by OrigamSelectionControl.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/checkbox-btn.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'checkbox-btn.background-color',
                value: '{color.action.secondary.bg}',
                type: 'color',
                descriptionKey: 'components.checkbox_btn.tokens.background_color',
                descriptionFallback: 'Default button background.'
            },
            {
                tokenPath: 'checkbox-btn.background-color-checked',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.checkbox_btn.tokens.background_color_checked',
                descriptionFallback: 'Background when checked.'
            },
            {
                tokenPath: 'checkbox-btn.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.checkbox_btn.tokens.border_radius',
                descriptionFallback: 'Border radius of the control.'
            },
            {
                tokenPath: 'checkbox-btn.font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.checkbox_btn.tokens.font_weight',
                descriptionFallback: 'Label font weight.'
            },
            {
                tokenPath: 'checkbox-btn.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.checkbox_btn.tokens.transition_duration',
                descriptionFallback: 'Transition duration for background, border and colour changes.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Check me',
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.checkbox_btn.playground.color',
                labelFallback: 'Color / Intent',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.checkbox_btn.playground.density',
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
                labelKey: 'components.checkbox_btn.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'indeterminate',
                kind: 'switch',
                labelKey: 'components.checkbox_btn.playground.indeterminate',
                labelFallback: 'Indeterminate',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
