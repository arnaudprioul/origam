/**
 * /components/selection-control-group — full documentation data for OrigamSelectionControlGroup.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/SelectionControl/selection-control-group.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/SelectionControl/OrigamSelectionControlGroup.vue        (template BEM, defineExpose)
 *   - packages/ds/tokens/component/selection-control-group.json                          (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SELECTION_CONTROL_GROUP_DOC: IComponentDoc = {
    slug: 'selection-control-group',
    name: 'SelectionControlGroup',
    tag: 'origam-selection-control-group',
    icon: 'mdi-format-list-checks',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.selection_control_group.description',
    descriptionFallback: 'Groups multiple SelectionControl instances under a shared v-model with inline layout support and a typed item-slot API.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-selection-control--design',
    docUrl: 'http://localhost:4000/components/SelectionControl/OrigamSelectionControl',

    parentSlug: 'selection-control',

    family: [
        {
            slug: 'selection-control',
            name: 'SelectionControl',
            descriptionKey: 'components.catalog.selection_control.description',
            descriptionFallback: 'Base selection-control primitive used by Checkbox, Radio and Switch.'
        }
    ],

    related: [
        {
            slug: 'checkbox',
            name: 'Checkbox',
            kind: 'component',
            descriptionKey: 'components.selection_control_group.related.checkbox',
            descriptionFallback: 'Checkbox uses SelectionControlGroup as its internal list container.'
        },
        {
            slug: 'radio-group',
            name: 'RadioGroup',
            kind: 'component',
            descriptionKey: 'components.selection_control_group.related.radio_group',
            descriptionFallback: 'RadioGroup wraps SelectionControlGroup with type="radio".'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control_group.props.model_value.description',
            descriptionFallback: 'Shared v-model value. Provided down to every SelectionControl child via ORIGAM_SELECTION_CONTROL_GROUP_KEY.'
        },
        {
            name: 'type',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control_group.props.type.description',
            descriptionFallback: 'Native input type forwarded to every child SelectionControl. Usually "checkbox" or "radio".'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control_group.props.name.description',
            descriptionFallback: 'Name attribute forwarded to every child SelectionControl. Auto-generated when absent.'
        },
        {
            name: 'items',
            type: { label: 'Array<any> | Record<string, any>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.selection_control_group.props.items.description',
            descriptionFallback: 'Array or record of items rendered via the item slot. Each item is available as slot binding.'
        },
        {
            name: 'inline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control_group.props.inline.description',
            descriptionFallback: 'Switches the group from column (default) to row layout via the --inline modifier class.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control_group.props.disabled.description',
            descriptionFallback: 'Disables every child SelectionControl in the group.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control_group.props.readonly.description',
            descriptionFallback: 'Makes every child SelectionControl read-only.'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.selection_control_group.props.error.description',
            descriptionFallback: 'Puts every child in error state (danger color).'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control_group.props.multiple.description',
            descriptionFallback: 'Enables multi-selection. When true, modelValue is treated as an array.'
        },
        {
            name: 'ripple',
            type: { label: "boolean | { class: string }", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.selection_control_group.props.ripple.description',
            descriptionFallback: 'Enables Material ripple effect forwarded to every child control.'
        },
        {
            name: 'falseIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control_group.props.false_icon.description',
            descriptionFallback: 'Icon shown when a child control is unchecked/false. Forwarded to all children.'
        },
        {
            name: 'trueIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control_group.props.true_icon.description',
            descriptionFallback: 'Icon shown when a child control is checked/true. Forwarded to all children.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control_group.props.color.description',
            descriptionFallback: 'Intent or custom color forwarded to every child SelectionControl.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.selection_control_group.props.density.description',
            descriptionFallback: 'Density forwarded to every child control.'
        },
        {
            name: 'valueComparator',
            type: { label: '(a: any, b: any) => boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.selection_control_group.props.value_comparator.description',
            descriptionFallback: 'Custom equality function for comparing values when modelValue is non-primitive.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.selection_control_group.props.tag.description',
            descriptionFallback: 'Root HTML element. Default is div. The root always has role="group".'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ items }',
            descriptionKey: 'components.selection_control_group.slots.default.description',
            descriptionFallback: 'Full override of the group content. Receives the items array. When not provided, the group iterates over items using the item slot.'
        },
        {
            slot: 'item',
            slotProps: '{ item, index }',
            descriptionKey: 'components.selection_control_group.slots.item.description',
            descriptionFallback: 'Template for each item in the items array. Receives item data and index.'
        },
        {
            slot: 'item.{index}',
            slotProps: '{ item }',
            descriptionKey: 'components.selection_control_group.slots.item_index.description',
            descriptionFallback: 'Per-index item slot override. Takes precedence over the generic item slot for that specific index.'
        }
    ],

    examples: [
        {
            titleKey: 'components.selection_control_group.examples.checkbox_group.title',
            titleFallback: 'Checkbox group',
            lang: 'vue',
            code: `<template>
  <origam-selection-control-group
    v-model="selected"
    type="checkbox"
    :multiple="true"
    :items="options"
    true-icon="mdi-checkbox-marked"
    false-icon="mdi-checkbox-blank-outline"
    color="primary"
  >
    <template #item="{ item }">
      <origam-selection-control :value="item.value" :label="item.label" />
    </template>
  </origam-selection-control-group>
</template>
<script setup>
const selected = ref([])
const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' }
]
</script>`
        },
        {
            titleKey: 'components.selection_control_group.examples.radio_group.title',
            titleFallback: 'Radio group inline',
            lang: 'vue',
            code: `<template>
  <origam-selection-control-group
    v-model="picked"
    type="radio"
    :inline="true"
    color="secondary"
  >
    <origam-selection-control value="yes" label="Yes" true-icon="mdi-radiobox-marked" false-icon="mdi-radiobox-blank" />
    <origam-selection-control value="no"  label="No"  true-icon="mdi-radiobox-marked" false-icon="mdi-radiobox-blank" />
  </origam-selection-control-group>
</template>
<script setup>
const picked = ref('yes')
</script>`
        },
        {
            titleKey: 'components.selection_control_group.examples.disabled.title',
            titleFallback: 'Disabled group',
            lang: 'vue',
            code: `<template>
  <origam-selection-control-group
    v-model="val"
    type="checkbox"
    :disabled="true"
    color="primary"
  >
    <origam-selection-control value="x" label="Locked" true-icon="mdi-checkbox-marked" false-icon="mdi-checkbox-blank-outline" />
  </origam-selection-control-group>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-selection-control-group',
        svgViewBox: '0 0 560 200',
        svgTitle: 'Anatomy of OrigamSelectionControlGroup',
        svgDesc: 'Schematic of SelectionControlGroup with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="560" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="520" height="160" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="40" y="50" width="440" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="260" y="73" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-selection-control (item 1)</text>
  <rect x="40" y="96" width="440" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="260" y="119" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-selection-control (item 2)</text>
  <rect x="40" y="142" width="440" height="24" rx="3" fill="var(--origam-color__surface---raised, #eee)" opacity="0.4"/>
  <text x="260" y="158" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">slot: item / item.{index}</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="50" cy="56" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="50" y="60" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="50" cy="148" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="50" y="152" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-selection-control-group&gt;</code> — root group ① wraps SelectionControl children ② via OrigamDefaultsProvider. The item slot ③ controls how each item is rendered.`,
        legend: [
            {
                num: 1,
                cls: '.origam-selection-control-group',
                descriptionKey: 'components.selection_control_group.anatomy.root',
                descriptionFallback: 'Root div with role="group". Receives the group id as the ARIA id attribute. Applies --inline modifier when inline=true.'
            },
            {
                num: 2,
                cls: '.origam-selection-control-group--inline',
                descriptionKey: 'components.selection_control_group.anatomy.inline',
                descriptionFallback: 'Modifier applied when inline=true. Switches flex-direction from column to row.'
            },
            {
                num: 3,
                cls: '[slot: item / item.{index}]',
                descriptionKey: 'components.selection_control_group.anatomy.slot_item',
                descriptionFallback: 'Items slot rendered per entry in the items array. Wrapped in OrigamDefaultsProvider so group-level props (color, type, density, disabled…) are inherited by children.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div role="group" :id="name" class="origam-selection-control-group">
  <!-- OrigamDefaultsProvider pushes density/color/type/disabled/… to children -->
  <origam-defaults-provider :defaults="slotDefaults">
    <slot name="default" v-bind="{ items }">
      <!-- fallback: iterate items via item slot -->
      <template v-for="(item, index) in items" :key="index">
        <slot :name="\`item.\${index}\`" v-bind="{ item }">
          <slot name="item" v-bind="{ item, index }" />
        </slot>
      </template>
    </slot>
  </origam-defaults-provider>
</div>`,
        classes: [
            {
                cls: 'origam-selection-control-group',
                descriptionKey: 'components.selection_control_group.anatomy.root',
                descriptionFallback: 'Root block. Display: flex, flex-direction: column by default.'
            },
            {
                cls: 'origam-selection-control-group--inline',
                descriptionKey: 'components.selection_control_group.anatomy.inline',
                descriptionFallback: 'Applied when inline=true. Changes flex-direction to row.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-selection-control-group---display',
            defaultValue: 'flex',
            descriptionKey: 'components.selection_control_group.css_vars.display',
            descriptionFallback: 'Display mode for the group container (always flex).'
        },
        {
            name: '--origam-selection-control-group---flex-direction',
            defaultValue: 'column',
            descriptionKey: 'components.selection_control_group.css_vars.flex_direction',
            descriptionFallback: 'Stack direction. Switches to row when --inline modifier is applied.'
        },
        {
            name: '--origam-selection-control-group---flex-direction-inline',
            defaultValue: 'row',
            descriptionKey: 'components.selection_control_group.css_vars.flex_direction_inline',
            descriptionFallback: 'Flex direction when inline=true.'
        },
        {
            name: '--origam-selection-control-group---flex-wrap',
            defaultValue: 'wrap',
            descriptionKey: 'components.selection_control_group.css_vars.flex_wrap',
            descriptionFallback: 'Wrap mode for inline groups.'
        },
        {
            name: '--origam-selection-control-group---gap',
            defaultValue: '{space.2}',
            descriptionKey: 'components.selection_control_group.css_vars.gap',
            descriptionFallback: 'Gap between child SelectionControl items.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.selection_control_group.exposed.filter_props',
            descriptionFallback: 'Forwards a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.selection_control_group.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'ComputedRef<string>',
            descriptionKey: 'components.selection_control_group.exposed.id',
            descriptionFallback: 'Computed group id (props.id or auto-generated origam-selection-control-group-{uid}).'
        },
        {
            name: 'styleId',
            type: 'string',
            descriptionKey: 'components.selection_control_group.exposed.style_id',
            descriptionFallback: 'Unique style-sheet ID for this instance (distinct from the logical group id).'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.selection_control_group.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.selection_control_group.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.selection_control_group.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.selection_control_group.a11y.key_tab',
                actionFallback: 'Moves focus through each child SelectionControl.'
            },
            {
                key: 'Space',
                actionKey: 'components.selection_control_group.a11y.key_space',
                actionFallback: 'Toggles the focused child control.'
            }
        ],
        notes: [
            {
                noteKey: 'components.selection_control_group.a11y.role_group',
                noteFallback: 'The root element carries role="group" and is identified by the computed name/id attribute. Screen readers announce the group boundary.'
            },
            {
                noteKey: 'components.selection_control_group.a11y.defaults_provider',
                noteFallback: 'OrigamDefaultsProvider forwards type, name, density, color, disabled, readonly and error to every descendant SelectionControl. Child overrides still win.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/selection-control-group.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'selection-control-group.display',
                value: 'flex',
                type: 'other',
                descriptionKey: 'components.selection_control_group.tokens.display',
                descriptionFallback: 'Display mode for the group container.'
            },
            {
                tokenPath: 'selection-control-group.flex-direction',
                value: 'column',
                type: 'other',
                descriptionKey: 'components.selection_control_group.tokens.flex_direction',
                descriptionFallback: 'Default stack direction (column). Row when inline.'
            },
            {
                tokenPath: 'selection-control-group.gap',
                value: '{space.2}',
                type: 'dimension',
                descriptionKey: 'components.selection_control_group.tokens.gap',
                descriptionFallback: 'Gap between child controls.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'type',
                kind: 'select',
                labelKey: 'components.selection_control_group.playground.type',
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
                labelKey: 'components.selection_control_group.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'inline',
                kind: 'switch',
                labelKey: 'components.selection_control_group.playground.inline',
                labelFallback: 'Inline',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.selection_control_group.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'error',
                kind: 'switch',
                labelKey: 'components.selection_control_group.playground.error',
                labelFallback: 'Error',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
