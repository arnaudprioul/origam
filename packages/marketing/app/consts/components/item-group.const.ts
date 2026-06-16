/**
 * /components/item-group — full documentation data for OrigamItemGroup / OrigamItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ItemGroup/item-group.interface.ts  (props)
 *   - packages/ds/src/components/ItemGroup/OrigamItemGroup.vue      (template BEM, defineExpose)
 *   - packages/ds/src/components/ItemGroup/OrigamItem.vue           (item component)
 *   - (no token JSON — no component-level CSS vars; layout is unstyled by design)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentExposed,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const ITEM_GROUP_DOC: IComponentDoc = {
    slug: 'item-group',
    name: 'ItemGroup',
    tag: 'origam-item-group',
    icon: 'mdi-view-list-outline',
    category: 'Layout & Structure',
    descriptionKey: 'components.catalog.item_group.description',
    descriptionFallback: 'Renderless selection container that tracks which child OrigamItem elements are selected. Single, multiple and mandatory selection modes.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-itemgroup--design',
    docUrl: 'http://localhost:4000/components/ItemGroup/OrigamItemGroup',

    family: [
        {
            slug: 'item',
            name: 'Item',
            descriptionKey: 'components.catalog.item.description',
            descriptionFallback: 'A single registered item inside an ItemGroup. Provides its selection state to consumers via the default slot.'
        }
    ],

    related: [
        {
            slug: 'btn-toggle',
            name: 'BtnToggle',
            kind: 'component',
            descriptionKey: 'components.catalog.btn_toggle.description',
            descriptionFallback: 'Visual toggle group built on top of ItemGroup with Btn children.'
        },
        {
            slug: 'tabs',
            name: 'Tabs',
            kind: 'component',
            descriptionKey: 'components.catalog.tabs.description',
            descriptionFallback: 'Tab bar — also uses the group/item selection primitives internally.'
        }
    ],

    props: [
        // ── IGroupProps ────────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.item_group.props.model_value.description',
            descriptionFallback: 'Currently selected item value(s). Bind with v-model.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.item_group.props.multiple.description',
            descriptionFallback: 'Allows multiple items to be selected at once.'
        },
        {
            name: 'mandatory',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.item_group.props.mandatory.description',
            descriptionFallback: 'Forces at least one item to remain selected. Deselecting the last item is ignored.'
        },
        {
            name: 'max',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.item_group.props.max.description',
            descriptionFallback: 'Maximum number of simultaneously selected items (multiple mode only).'
        },
        {
            name: 'selectedClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-item--selected'",
            descriptionKey: 'components.item_group.props.selected_class.description',
            descriptionFallback: 'CSS class injected on each OrigamItem when it is selected. Propagated down via OrigamDefaultsProvider.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.item_group.props.disabled.description',
            descriptionFallback: 'Disables all items in the group.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.item_group.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.item_group.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the selected item(s) change. Carries the new value or array of values.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isSelected, select, next, prev, selected }',
            descriptionKey: 'components.item_group.slots.default.description',
            descriptionFallback: 'Default slot. Exposes group selection helpers: isSelected(id), select(id, value), next(), prev(), selected (read-only ref).'
        }
    ],

    examples: [
        {
            titleKey: 'components.item_group.examples.single.title',
            titleFallback: 'Single selection',
            lang: 'vue',
            code: `<template>
  <origam-item-group v-model="selected" mandatory>
    <origam-item
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      #default="{ isSelected, toggle }"
    >
      <origam-btn
        :color="isSelected ? 'primary' : ''"
        :variant="isSelected ? 'elevated' : 'outlined'"
        @click="toggle"
      >
        {{ item.label }}
      </origam-btn>
    </origam-item>
  </origam-item-group>
</template>

<script setup lang="ts">
const selected = ref(null)
const items = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 }
]
</script>`
        },
        {
            titleKey: 'components.item_group.examples.multiple.title',
            titleFallback: 'Multiple selection',
            lang: 'vue',
            code: `<template>
  <origam-item-group v-model="selected" multiple :max="2">
    <origam-item v-for="tag in tags" :key="tag" :value="tag" #default="{ isSelected, toggle }">
      <origam-chip :color="isSelected ? 'primary' : ''" @click="toggle">{{ tag }}</origam-chip>
    </origam-item>
  </origam-item-group>
</template>

<script setup lang="ts">
const selected = ref([])
const tags = ['Vue', 'TypeScript', 'Vite', 'Pinia']
</script>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-item-group',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamItemGroup',
        svgDesc: 'Schematic of the ItemGroup renderless container with three child items.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="24" y="32" width="652" height="136" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="52" y="64" width="168" height="72" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="266" y="64" width="168" height="72" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="480" y="64" width="168" height="72" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5"/>
  <text x="136" y="104" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-item ①</text>
  <text x="350" y="100" font-size="11" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-item ②</text>
  <text x="350" y="116" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-style="italic">selected</text>
  <text x="564" y="104" font-size="11" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-item ③</text>
  <circle cx="32" cy="40" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="44.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <line x1="42" y1="40" x2="76" y2="40" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="80" y="36" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-item-group</text>
  <circle cx="60" cy="72" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="60" y="76" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="274" cy="72" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="274" y="76" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-item-group&gt;</code> — renderless root (①) wrapping child <code>&lt;origam-item&gt;</code> elements (②③). The selected item carries the <code>selectedClass</code>.',
        legend: [
            {
                num: 1,
                cls: '.origam-item-group',
                descriptionKey: 'components.item_group.anatomy.root',
                descriptionFallback: 'Root element. Renderless — no visual chrome. Provides group context via <code>ORIGAM_ITEM_GROUP_KEY</code>.'
            },
            {
                num: 2,
                cls: 'origam-item (unselected)',
                descriptionKey: 'components.item_group.anatomy.item_unselected',
                descriptionFallback: 'Child item not currently selected. Exposes <code>isSelected=false</code> to its default slot.'
            },
            {
                num: 3,
                cls: 'origam-item (selected)',
                descriptionKey: 'components.item_group.anatomy.item_selected',
                descriptionFallback: 'Child item that is currently selected. Receives <code>selectedClass</code> and exposes <code>isSelected=true</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- renderless root — no visual chrome -->
<origam-item-group v-model="selected" tag="div">
  <!-- default slot exposes: { isSelected, select, next, prev, selected } -->
  <slot :is-selected="isSelected" :select="select" :next="next" :prev="prev" :selected="selected" />
</origam-item-group>`,
        classes: [
            {
                cls: 'origam-item-group',
                descriptionKey: 'components.item_group.anatomy.root',
                descriptionFallback: 'Root element. Renderless selection container.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.item_group.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child.'
        },
        {
            name: 'next',
            type: '() => void',
            descriptionKey: 'components.item_group.exposed.next',
            descriptionFallback: 'Selects the next item in DOM order.'
        },
        {
            name: 'prev',
            type: '() => void',
            descriptionKey: 'components.item_group.exposed.prev',
            descriptionFallback: 'Selects the previous item in DOM order.'
        },
        {
            name: 'select',
            type: '(id: number, value: boolean) => void',
            descriptionKey: 'components.item_group.exposed.select',
            descriptionFallback: 'Programmatically toggle the selected state of an item by its internal id.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.item_group.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.item_group.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.item_group.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.item_group.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.item_group.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.item_group.a11y.key_tab',
                actionFallback: 'Moves focus through the child items. Keyboard navigation is delegated to the rendered child elements (e.g. origam-btn with role="button").'
            }
        ],
        notes: [
            {
                noteKey: 'components.item_group.a11y.role_note',
                noteFallback: 'OrigamItemGroup is renderless and carries no ARIA role itself. Consumers must ensure the rendered children have appropriate roles (button, tab, radio, etc.).'
            },
            {
                noteKey: 'components.item_group.a11y.selected_class_note',
                noteFallback: 'The selectedClass is injected as a CSS class — not an ARIA attribute. Consumers are responsible for mapping the selected state to aria-pressed, aria-selected or aria-checked on their child elements.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/(no dedicated token file)',
        pipelineNote: 'OrigamItemGroup has no component-level CSS custom properties. Visual styling is fully delegated to child elements.',
        excerpt: []
    },

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'multiple',
                kind: 'switch',
                labelKey: 'components.item_group.playground.multiple',
                labelFallback: 'Multiple selection',
                defaultValue: false
            },
            {
                prop: 'mandatory',
                kind: 'switch',
                labelKey: 'components.item_group.playground.mandatory',
                labelFallback: 'Mandatory (keep at least one)',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.item_group.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'tag',
                kind: 'select',
                labelKey: 'components.item_group.playground.tag',
                labelFallback: 'Tag',
                defaultValue: 'div',
                options: [
                    { label: 'div', value: 'div' },
                    { label: 'ul', value: 'ul' },
                    { label: 'section', value: 'section' }
                ]
            }
        ]
    }
}
