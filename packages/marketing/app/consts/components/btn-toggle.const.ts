/**
 * /components/btn-toggle — full documentation data for OrigamBtnToggle.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Btn/btn-toggle.interface.ts  (props / emits)
 *   - packages/ds/src/components/Btn/OrigamBtnToggle.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/btn.json                   (CSS tokens — shared)
 *
 * Sub-component of: OrigamBtn (parentSlug: 'btn')
 * Extends: IBtnGroupProps + IGroupProps (selection state via useGroup / ORIGAM_BTN_TOGGLE_KEY)
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

export const BTN_TOGGLE_DOC: IComponentDoc = {
    slug: 'btn-toggle',
    name: 'BtnToggle',
    tag: 'origam-btn-toggle',
    icon: 'mdi-toggle-switch-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.btn_toggle.description',
    descriptionFallback: 'Single or multi-select toggle group of Btn elements. Wraps OrigamBtnGroup and adds selection state via useGroup (supports v-model).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-btn--design',
    docUrl: 'http://localhost:4000/components/Btn/OrigamBtn',
    parentSlug: 'btn',

    family: [
        {
            slug: 'btn',
            name: 'Btn',
            descriptionKey: 'components.catalog.btn.description',
            descriptionFallback: 'Polymorphic action element with intent, variant, size and icon support.'
        },
        {
            slug: 'btn-group',
            name: 'BtnGroup',
            descriptionKey: 'components.catalog.btn_group.description',
            descriptionFallback: 'Groups Btn elements into a connected segmented control.'
        }
    ],

    related: [
        { slug: 'btn-group', name: 'BtnGroup', kind: 'component', descriptionFallback: 'Base group container that BtnToggle extends with selection state.', descriptionKey: 'components.catalog.btn_group.description' }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'string | number | string[] | number[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_toggle.props.model_value.description',
            descriptionFallback: 'Currently selected value(s). Single value in single-select mode; array in multiple mode. Binds with v-model.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn_toggle.props.multiple.description',
            descriptionFallback: 'Allows selecting multiple buttons simultaneously. modelValue becomes an array.'
        },
        {
            name: 'mandatory',
            type: { label: "boolean | 'force'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn_toggle.props.mandatory.description',
            descriptionFallback: 'Keeps at least one item selected at all times. "force" also prevents deselecting the last item even programmatically.'
        },
        {
            name: 'max',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_toggle.props.max.description',
            descriptionFallback: 'Maximum number of simultaneously selected items (multiple mode only).'
        },
        {
            name: 'divided',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn_toggle.props.divided.description',
            descriptionFallback: 'Inherited from BtnGroup. Shows a thin border between adjacent buttons.'
        },
        {
            name: 'items',
            type: { label: 'Array<IBtnProps>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.btn_toggle.props.items.description',
            descriptionFallback: 'Array of IBtnProps objects to render toggle buttons programmatically.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.btn_toggle.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root (proxied to OrigamBtnGroup).'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.btn_toggle.props.density.description',
            descriptionFallback: 'Density propagated to child buttons via OrigamBtnGroup defaults.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_toggle.props.color.description',
            descriptionFallback: 'Foreground color propagated to all child buttons.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_toggle.props.bg_color.description',
            descriptionFallback: 'Background color propagated to all child buttons.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_toggle.props.rounded.description',
            descriptionFallback: 'Border-radius for the group container.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn_toggle.props.border.description',
            descriptionFallback: 'Applies a border around the entire toggle group.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_toggle.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation for the group container.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string | number | string[] | number[]', slug: '', kind: 'primitive' },
            descriptionKey: 'components.btn_toggle.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selection changes. Payload is the new selected value (single mode) or array of selected values (multiple mode).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ items, isSelected, next, prev, select, selected }',
            descriptionKey: 'components.btn_toggle.slots.default.description',
            descriptionFallback: 'Content area. Receives the group selection API (isSelected, next, prev, select, selected). OrigamBtn children with a value prop participate in selection automatically.'
        },
        {
            slot: 'item',
            slotProps: '{ item, index }',
            descriptionKey: 'components.btn_toggle.slots.item.description',
            descriptionFallback: 'Override rendering of each item from the items array. Receives the IBtnProps object and its index.'
        }
    ],

    examples: [
        {
            titleKey: 'components.btn_toggle.examples.basic.title',
            titleFallback: 'Single-select toggle',
            lang: 'vue',
            code: `<template>
  <origam-btn-toggle v-model="alignment" mandatory border>
    <origam-btn value="left" icon="mdi-format-align-left" />
    <origam-btn value="center" icon="mdi-format-align-center" />
    <origam-btn value="right" icon="mdi-format-align-right" />
  </origam-btn-toggle>
</template>

<script setup lang="ts">
  const alignment = ref('left')
</script>`
        },
        {
            titleKey: 'components.btn_toggle.examples.multiple.title',
            titleFallback: 'Multi-select toggle',
            lang: 'vue',
            code: `<template>
  <origam-btn-toggle
    v-model="formats"
    multiple
    border
    divided
    color="primary"
  >
    <origam-btn value="bold" prepend-icon="mdi-format-bold" text="Bold" />
    <origam-btn value="italic" prepend-icon="mdi-format-italic" text="Italic" />
    <origam-btn value="underline" prepend-icon="mdi-format-underline" text="Underline" />
  </origam-btn-toggle>
</template>

<script setup lang="ts">
  const formats = ref([])
</script>`
        },
        {
            titleKey: 'components.btn_toggle.examples.items.title',
            titleFallback: 'From items array',
            lang: 'vue',
            code: `<template>
  <origam-btn-toggle
    v-model="view"
    mandatory
    border
    :items="[
      { value: 'list', prependIcon: 'mdi-view-list', text: 'List' },
      { value: 'grid', prependIcon: 'mdi-view-grid', text: 'Grid' }
    ]"
  />
</template>

<script setup lang="ts">
  const view = ref('list')
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-btn-toggle',
        svgViewBox: '0 0 700 120',
        svgTitle: 'Anatomy of OrigamBtnToggle',
        svgDesc: 'Schematic of the BtnToggle component with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="20" width="620" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="50" y="30" width="600" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="60" y="38" width="170" height="44" rx="0" fill="var(--origam-color__action--primary---bg, rgba(124,58,237,0.8))"/>
  <text x="145" y="64" font-size="11" fill="#fff" text-anchor="middle" font-family="'JetBrains Mono',monospace">selected</text>
  <rect x="230" y="38" width="170" height="44" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="315" y="64" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">unselected</text>
  <rect x="400" y="38" width="170" height="44" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="485" y="64" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">unselected</text>
  <circle cx="48" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="58" cy="32" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="58" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="68" cy="40" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="68" y="44.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="58" y1="26" x2="120" y2="8" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="124" y="6" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-btn-toggle</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-btn-toggle&gt;</code> — outer toggle shell ① (adds <code>.origam-btn-toggle</code> modifier), inner <code>&lt;origam-btn-group&gt;</code> ② rendering child buttons ③. Selected button receives active state from useGroup.',
        legend: [
            {
                num: 1,
                cls: '.origam-btn-toggle',
                descriptionKey: 'components.btn_toggle.anatomy.root',
                descriptionFallback: 'Root modifier class added on top of <code>.origam-btn-group</code>. OrigamBtnToggle is a thin wrapper that adds selection state (useGroup) and exposes the group navigation API (next/prev/select).'
            },
            {
                num: 2,
                cls: '.origam-btn-group',
                descriptionKey: 'components.btn_toggle.anatomy.group',
                descriptionFallback: 'The proxied <code>&lt;origam-btn-group&gt;</code> with all group-level props forwarded via filterProps. Provides the visual container (border, elevation, rounded, overflow: hidden).'
            },
            {
                num: 3,
                cls: '(origam-btn children)',
                descriptionKey: 'components.btn_toggle.anatomy.children',
                descriptionFallback: 'Child <code>&lt;origam-btn&gt;</code> elements with a <code>value</code> prop. isSelected state from useGroup drives the active styling on the matching button.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: thin wrapper, adds .origam-btn-toggle class -->
<origam-btn-group class="origam-btn-toggle" v-bind="btnGroupProps">
  <template #default>
    <!-- default slot exposes group navigation API -->
    <slot v-bind="{ items, isSelected, next, prev, select, selected }" />
  </template>
  <template #item="{ item, index }">
    <slot name="item" v-bind="{ item, index }" />
  </template>
</origam-btn-group>`,
        classes: [
            {
                cls: 'origam-btn-toggle',
                descriptionKey: 'components.btn_toggle.anatomy.root',
                descriptionFallback: 'Root class added alongside origam-btn-group. No additional styles — purely a BEM identifier for the toggle variant.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-btn-group---border-radius',
            defaultValue: '4px',
            descriptionKey: 'components.btn_toggle.css_vars.border_radius',
            descriptionFallback: 'Inherited from BtnGroup. Border-radius of the toggle container.'
        },
        {
            name: '--origam-btn-group---density',
            defaultValue: '0px',
            descriptionKey: 'components.btn_toggle.css_vars.density',
            descriptionFallback: 'Inherited from BtnGroup. Density offset for min-height.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'next',
            type: '() => void',
            descriptionKey: 'components.btn_toggle.exposed.next',
            descriptionFallback: 'Selects the next button in the group (wraps around).'
        },
        {
            name: 'prev',
            type: '() => void',
            descriptionKey: 'components.btn_toggle.exposed.prev',
            descriptionFallback: 'Selects the previous button in the group (wraps around).'
        },
        {
            name: 'select',
            type: '(id: string | number, value: boolean) => void',
            descriptionKey: 'components.btn_toggle.exposed.select',
            descriptionFallback: 'Programmatically select or deselect a button by its value id.'
        },
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.btn_toggle.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.btn_toggle.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed btnToggleStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.btn_toggle.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.btn_toggle.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.btn_toggle.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.btn_toggle.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.btn_toggle.a11y.key_tab',
                actionFallback: 'Moves focus through each toggle button.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.btn_toggle.a11y.key_activate',
                actionFallback: 'Toggles the selection state of the focused button.'
            }
        ],
        notes: [
            {
                noteKey: 'components.btn_toggle.a11y.role_group',
                noteFallback: 'Inherits role="group" from OrigamBtnGroup. Add aria-label to describe the toggle purpose (e.g. "Text alignment controls").'
            },
            {
                noteKey: 'components.btn_toggle.a11y.aria_pressed',
                noteFallback: 'Each selected child OrigamBtn should communicate its state via aria-pressed="true". Ensure child buttons pass their active state correctly.'
            },
            {
                noteKey: 'components.btn_toggle.a11y.mandatory',
                noteFallback: 'When mandatory=true, at least one button is always selected. Consider communicating this constraint to assistive technology users via group description.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/btn.json',
        pipelineNote: 'BtnToggle shares the btn and btn-group token namespaces. No separate token file.',
        excerpt: [
            {
                tokenPath: 'btn-group.border-radius',
                value: '4px',
                type: 'dimension',
                descriptionKey: 'components.btn_toggle.tokens.border_radius',
                descriptionFallback: 'Default border radius for the toggle container.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'multiple',
                kind: 'switch',
                labelKey: 'components.btn_toggle.playground.multiple',
                labelFallback: 'Multiple',
                defaultValue: false
            },
            {
                prop: 'mandatory',
                kind: 'switch',
                labelKey: 'components.btn_toggle.playground.mandatory',
                labelFallback: 'Mandatory',
                defaultValue: false
            },
            {
                prop: 'divided',
                kind: 'switch',
                labelKey: 'components.btn_toggle.playground.divided',
                labelFallback: 'Divided',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.btn_toggle.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' }
                ]
            },
            {
                prop: 'border',
                kind: 'switch',
                labelKey: 'components.btn_toggle.playground.border',
                labelFallback: 'Border',
                defaultValue: true
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.btn_toggle.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'pill', value: 'pill' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
