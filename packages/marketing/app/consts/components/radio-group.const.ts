/**
 * /components/radio-group — full documentation data for OrigamRadioGroup.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Radio/radio-group.interface.ts          (props)
 *   - packages/ds/src/components/Radio/OrigamRadioGroup.vue              (template BEM, defineExpose)
 *   - packages/ds/tokens/component/radio.json                            (CSS tokens)
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

export const RADIO_GROUP_DOC: IComponentDoc = {
    slug: 'radio-group',
    name: 'RadioGroup',
    tag: 'origam-radio-group',
    icon: 'mdi-radiobox-marked',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.radio_group.description',
    descriptionFallback: 'Groups multiple Radio inputs under a single v-model with optional label, validation messages and SelectionControlGroup layout.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-radio--design',
    docUrl: 'http://localhost:4000/components/Radio/OrigamRadioGroup',

    parentSlug: 'radio',

    family: [
        {
            slug: 'radio',
            name: 'Radio',
            descriptionKey: 'components.catalog.radio.description',
            descriptionFallback: 'Single-selection radio control with label, error and focus state support.'
        },
        {
            slug: 'radio-btn',
            name: 'RadioBtn',
            descriptionKey: 'components.catalog.radio_btn.description',
            descriptionFallback: 'Low-level radio button control wrapping OrigamSelectionControl.'
        }
    ],

    related: [
        {
            slug: 'selection-control-group',
            name: 'SelectionControlGroup',
            kind: 'component',
            descriptionKey: 'components.radio_group.related.selection_control_group',
            descriptionFallback: 'RadioGroup renders SelectionControlGroup internally to lay out Radio items.'
        },
        {
            slug: 'input',
            name: 'Input',
            kind: 'component',
            descriptionKey: 'components.radio_group.related.input',
            descriptionFallback: 'RadioGroup wraps OrigamInput to inherit label, error and messages orchestration.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.model_value.description',
            descriptionFallback: 'Currently selected value. Bound with v-model. Updated when a Radio in the group is selected.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.label.description',
            descriptionFallback: 'Group-level label rendered above the radio controls via OrigamLabel.'
        },
        {
            name: 'id',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.id.description',
            descriptionFallback: 'HTML id for the group root. Auto-generated as radio-group-{uid} when not provided.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.name.description',
            descriptionFallback: 'Name attribute propagated to all Radio inputs inside the group.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_group.props.disabled.description',
            descriptionFallback: 'Disables all radio inputs in the group.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_group.props.readonly.description',
            descriptionFallback: 'Makes all radio inputs non-interactive without disabling them visually.'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_group.props.required.description',
            descriptionFallback: 'Marks the field as required and shows a required indicator on the label.'
        },
        {
            name: 'items',
            type: { label: 'Array<any> | Record<string, any>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.radio_group.props.items.description',
            descriptionFallback: 'Array of items passed to SelectionControlGroup. Each item is spread onto an OrigamRadio as props.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.color.description',
            descriptionFallback: 'Intent or custom color propagated to all Radio controls in the group via DefaultsProvider.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.bg_color.description',
            descriptionFallback: 'Background color propagated to all Radio controls.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.radio_group.props.density.description',
            descriptionFallback: 'Adjusts the vertical padding density of all Radio controls in the group.'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.size.description',
            descriptionFallback: 'Size propagated to all Radio controls via DefaultsProvider.'
        },
        {
            name: 'inline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_group.props.inline.description',
            descriptionFallback: 'Renders the radio controls in a horizontal row instead of a vertical column.'
        },
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.padding.description',
            descriptionFallback: 'Shorthand CSS padding applied to the group root.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.margin.description',
            descriptionFallback: 'Shorthand CSS margin applied to the group root.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.rounded.description',
            descriptionFallback: 'Border-radius override for the group wrapper.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.radio_group.props.border.description',
            descriptionFallback: 'Applies a border to the group wrapper.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.radio_group.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the group root.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.radio_group.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the user selects a Radio in the group. Carries the selected value.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ id, messagesId, isDisabled, isReadonly, isValid }',
            descriptionKey: 'components.radio_group.slots.default.description',
            descriptionFallback: 'Replaces the entire inner layout (label + controls + messages). Receives the Input context.'
        },
        {
            slot: 'label',
            slotProps: '{ label, required }',
            descriptionKey: 'components.radio_group.slots.label.description',
            descriptionFallback: 'Custom label replacing the default OrigamLabel above the group.'
        },
        {
            slot: 'item',
            slotProps: '{ id, messagesId, isDisabled, isReadonly, isValid }',
            descriptionKey: 'components.radio_group.slots.item.description',
            descriptionFallback: 'Custom item template for each radio in the group. Replaces the default OrigamRadio per item.'
        }
    ],

    examples: [
        {
            titleKey: 'components.radio_group.examples.basic.title',
            titleFallback: 'Basic group',
            lang: 'vue',
            code: `<template>
  <origam-radio-group v-model="answer" label="Preferred framework" :items="options" />
</template>
<script setup>
import { ref } from 'vue'
const answer = ref('')
const options = [
  { value: 'vue',    label: 'Vue 3' },
  { value: 'react',  label: 'React' },
  { value: 'svelte', label: 'Svelte' }
]
</script>`
        },
        {
            titleKey: 'components.radio_group.examples.inline.title',
            titleFallback: 'Inline layout',
            lang: 'vue',
            code: `<template>
  <origam-radio-group
    v-model="size"
    label="T-shirt size"
    inline
    color="primary"
    :items="[{ value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' }]"
  />
</template>
<script setup>
import { ref } from 'vue'
const size = ref('M')
</script>`
        },
        {
            titleKey: 'components.radio_group.examples.custom_item.title',
            titleFallback: 'Custom item slot',
            lang: 'vue',
            code: `<template>
  <origam-radio-group v-model="choice" label="Choose">
    <template #default>
      <origam-radio v-model="choice" value="a" color="success" label="Option A" />
      <origam-radio v-model="choice" value="b" color="danger"  label="Option B" />
    </template>
  </origam-radio-group>
</template>
<script setup>
import { ref } from 'vue'
const choice = ref('')
</script>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { color: 'primary', label: 'RadioGroup', modelValue: 'b' } },
        { label: 'inline', props: { color: 'primary', inline: true, label: 'Inline group' } },
        { label: 'disabled', props: { color: 'primary', label: 'Disabled', disabled: true }, ariaLabel: 'Disabled radio group' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-radio-group',
        svgViewBox: '0 0 560 220',
        svgTitle: 'Anatomy of OrigamRadioGroup',
        svgDesc: 'Schematic of the RadioGroup component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="560" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="520" height="180" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="40" y="36" width="200" height="20" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="140" y="50" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Label (group)</text>
  <rect x="40" y="68" width="480" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.05))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="3 2"/>
  <circle cx="60" cy="86" r="12" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <circle cx="60" cy="86" r="5" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="100" y="90" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">Radio item 1</text>
  <rect x="40" y="114" width="480" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <circle cx="60" cy="132" r="12" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="2"/>
  <text x="100" y="136" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">Radio item 2</text>
  <rect x="40" y="160" width="480" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.03))"/>
  <text x="280" y="176" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">messages / error</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="44" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="48" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="48" cy="76" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="48" y="80" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="60" cy="86" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.7"/>
  <text x="60" y="90" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="48" cy="168" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="48" y="172" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-radio-group&gt;</code> — 5 internal parts. The OrigamInput root ① wraps the group label ②, the SelectionControlGroup ③ with each Radio item ④ and the messages area ⑤.`,
        legend: [
            {
                num: 1,
                cls: '.origam-radio-group',
                descriptionKey: 'components.radio_group.anatomy.root',
                descriptionFallback: 'Root element. Delegates to OrigamInput to manage label, error and messages.'
            },
            {
                num: 2,
                cls: '.origam-label (group label)',
                descriptionKey: 'components.radio_group.anatomy.label',
                descriptionFallback: 'Group-level label rendered via OrigamLabel with the label prop. Hidden when label is absent.'
            },
            {
                num: 3,
                cls: '.origam-selection-control-group',
                descriptionKey: 'components.radio_group.anatomy.scg',
                descriptionFallback: 'Inner SelectionControlGroup wrapped in DefaultsProvider that propagates color, density and size to all child Radios.'
            },
            {
                num: 4,
                cls: '.origam-radio (per item)',
                descriptionKey: 'components.radio_group.anatomy.radio_item',
                descriptionFallback: 'Each individual OrigamRadio rendered from the items array or the #item slot.'
            },
            {
                num: 5,
                cls: '.origam-messages',
                descriptionKey: 'components.radio_group.anatomy.messages',
                descriptionFallback: 'Validation messages and hints area. Rendered by OrigamInput below the controls.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-input class="origam-radio-group">
  <template #default="{ id, messagesId, isDisabled, isReadonly }">
    <!-- optional group label -->
    <origam-label :id="id" :text="label" :required="required" />

    <!-- DefaultsProvider pushes color/density/size to children -->
    <origam-defaults-provider :defaults="radioDefaults">
      <origam-selection-control-group
        v-model="model"
        :id="id"
        :items="items"
        :multiple="false"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :aria-labelledby="label ? id : undefined"
        :aria-describedby="messagesId"
      >
        <template #item="{ item }">
          <!-- #item slot or default OrigamRadio -->
          <origam-radio v-model="model" v-bind="item" />
        </template>
      </origam-selection-control-group>
    </origam-defaults-provider>
  </template>
</origam-input>`,
        classes: [
            {
                cls: 'origam-radio-group',
                descriptionKey: 'components.radio_group.anatomy.root',
                descriptionFallback: 'Root block element wrapping OrigamInput.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-radio__input---size',
            defaultValue: '20px',
            descriptionKey: 'components.radio_group.css_vars.input_size',
            descriptionFallback: 'Diameter of each circular radio input visual. Inherited from radio tokens.'
        },
        {
            name: '--origam-radio__input---border-color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.radio_group.css_vars.input_border_color',
            descriptionFallback: 'Border color of unchecked radio inputs.'
        },
        {
            name: '--origam-radio__dot---background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.radio_group.css_vars.dot_background_color',
            descriptionFallback: 'Fill color of the selected dot. Overridden by the color prop.'
        },
        {
            name: '--origam-selection-control-group---gap',
            defaultValue: '{space.2}',
            descriptionKey: 'components.radio_group.css_vars.gap',
            descriptionFallback: 'Gap between radio items in the group.'
        },
        {
            name: '--origam-selection-control--density',
            defaultValue: '0px',
            descriptionKey: 'components.radio_group.css_vars.density',
            descriptionFallback: 'Density modifier: compact → -8px, comfortable → +8px.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.radio_group.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to sub-components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.radio_group.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'ComputedRef<string>',
            descriptionKey: 'components.radio_group.exposed.id',
            descriptionFallback: 'Computed group id (prop or auto-generated radio-group-{uid}).'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.radio_group.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.radio_group.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.radio_group.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        },
        {
            name: 'styleId',
            type: 'string',
            descriptionKey: 'components.radio_group.exposed.style_id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['radiogroup'],
        keyboard: [
            {
                key: 'Space',
                actionKey: 'components.radio_group.a11y.key_space',
                actionFallback: 'Selects the focused Radio inside the group.'
            },
            {
                key: 'Tab',
                actionKey: 'components.radio_group.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            },
            {
                key: 'Arrow keys',
                actionKey: 'components.radio_group.a11y.key_arrows',
                actionFallback: 'Navigates between Radio options within the group.'
            }
        ],
        notes: [
            {
                noteKey: 'components.radio_group.a11y.role_note',
                noteFallback: 'The SelectionControlGroup is rendered with role="group". When a label is present, aria-labelledby is set to the label id so screen readers announce the group name.'
            },
            {
                noteKey: 'components.radio_group.a11y.describedby_note',
                noteFallback: 'aria-describedby links the group to the messages/errors area rendered by OrigamInput below the controls.'
            },
            {
                noteKey: 'components.radio_group.a11y.disabled_note',
                noteFallback: 'The disabled prop is propagated to all Radio inputs via DefaultsProvider. Each native input receives the disabled attribute.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/radio.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. RadioGroup inherits radio tokens; layout tokens come from selection-control-group.json.',
        excerpt: [
            {
                tokenPath: 'radio.input.size',
                value: '20px',
                type: 'dimension',
                descriptionKey: 'components.radio_group.tokens.input_size',
                descriptionFallback: 'Diameter of each radio input circle.'
            },
            {
                tokenPath: 'radio.input.border-color',
                value: '{color.border.default}',
                type: 'color',
                descriptionKey: 'components.radio_group.tokens.input_border_color',
                descriptionFallback: 'Unchecked border color.'
            },
            {
                tokenPath: 'radio.dot.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.radio_group.tokens.dot_bg',
                descriptionFallback: 'Fill of the selection dot.'
            },
            {
                tokenPath: 'selection-control-group.gap',
                value: '{space.2}',
                type: 'dimension',
                descriptionKey: 'components.radio_group.tokens.gap',
                descriptionFallback: 'Gap between radio items in the group (from selection-control-group tokens).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'label',
                kind: 'text',
                labelKey: 'components.radio_group.playground.label',
                labelFallback: 'Label',
                defaultValue: 'Choose an option'
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.radio_group.playground.color',
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
                labelKey: 'components.radio_group.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'compact', value: 'compact' },
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' }
                ]
            },
            {
                prop: 'inline',
                kind: 'switch',
                labelKey: 'components.radio_group.playground.inline',
                labelFallback: 'Inline',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.radio_group.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
