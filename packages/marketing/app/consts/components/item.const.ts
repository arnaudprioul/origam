/**
 * /components/item — full documentation data for OrigamItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ItemGroup/item-group.interface.ts  (props / emits)
 *   - packages/ds/src/interfaces/Commons/group.interface.ts         (IGroupItemProps)
 *   - packages/ds/src/components/ItemGroup/OrigamItem.vue           (template BEM, defineExpose)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const ITEM_DOC: IComponentDoc = {
    slug: 'item',
    name: 'Item',
    tag: 'origam-item',
    icon: 'mdi-checkbox-blank-outline',
    category: 'Layout',
    descriptionKey: 'components.catalog.item.description',
    descriptionFallback: 'Renderless selection item that registers itself in an ItemGroup and exposes its selected state via the default slot.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-item-group--design',
    docUrl: 'http://localhost:4000/components/ItemGroup/OrigamItemGroup',

    parentSlug: 'item-group',

    family: [
        {
            slug: 'item-group',
            name: 'ItemGroup',
            descriptionKey: 'components.catalog.item_group.description',
            descriptionFallback: 'Renderless selection container managing a set of OrigamItem children.'
        }
    ],

    related: [
        {
            slug: 'btn-toggle',
            name: 'BtnToggle',
            kind: 'component',
            descriptionKey: 'components.catalog.btn_toggle.description',
            descriptionFallback: 'Single or multi-select toggle group of Btn elements — built on ItemGroup.'
        }
    ],

    props: [
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.item.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        },
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.item.props.value.description',
            descriptionFallback: 'The value this item represents. Used by ItemGroup to track selection via modelValue.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.item.props.disabled.description',
            descriptionFallback: 'Prevents the item from being selected. The group still registers it but toggle() is a no-op.'
        },
        {
            name: 'selectedClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.item.props.selected_class.description',
            descriptionFallback: 'CSS class applied to the root element when this item is selected. Overrides the group-level selectedClass.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isSelected, selectedClass, toggle, select, value, disabled }',
            descriptionKey: 'components.item.slots.default.description',
            descriptionFallback: 'Default slot receiving the item state. isSelected (boolean), toggle () => void, select (value: boolean) => void, value (any), disabled (boolean).'
        }
    ],

    examples: [
        {
            titleKey: 'components.item.examples.basic.title',
            titleFallback: 'Single-select group',
            lang: 'vue',
            code: `<template>
  <origam-item-group v-model="selected">
    <origam-item value="a" selected-class="active">
      <template #default="{ isSelected, toggle }">
        <origam-btn
          :color="isSelected ? 'primary' : undefined"
          @click="toggle"
          text="Option A"
        />
      </template>
    </origam-item>

    <origam-item value="b" selected-class="active">
      <template #default="{ isSelected, toggle }">
        <origam-btn
          :color="isSelected ? 'primary' : undefined"
          @click="toggle"
          text="Option B"
        />
      </template>
    </origam-item>
  </origam-item-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('a')
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-item',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamItem',
        svgDesc: 'Schematic of the Item component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="644" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="60" y="66" width="580" height="48" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="94" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot — receives { isSelected, toggle, select, value, disabled }</text>
  <circle cx="36" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="68" cy="74" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="68" y="78.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <line x1="46" y1="44" x2="88" y2="28" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="92" y="28" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-item</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-item&gt;</code> — 2 parts: the root element that carries the selected class, and the default slot that receives the group item state.`,
        legend: [
            {
                num: 1,
                cls: '.origam-item',
                descriptionKey: 'components.item.anatomy.root',
                descriptionFallback: 'Root element. Applies the <code>selectedClass</code> when the item is selected. Rendered as <code>&lt;div&gt;</code> by default (configurable via <code>tag</code>).'
            },
            {
                num: 2,
                cls: '.origam-item #default',
                descriptionKey: 'components.item.anatomy.slot',
                descriptionFallback: 'Default slot. Receives <code>{ isSelected, selectedClass, toggle, select, value, disabled }</code> so the consumer can wire any visual element to the selection state.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'toggle',
            type: '() => void',
            descriptionKey: 'components.item.exposed.toggle',
            descriptionFallback: 'Toggles the item selection state. Equivalent to calling groupItem.toggle() from the default slot.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle. Used by OrigamDefaultsProvider to inject styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.item.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.item.a11y.renderless_note',
                noteFallback: 'OrigamItem is renderless — it applies no ARIA attributes itself. The consumer is responsible for adding role, aria-selected, aria-disabled and keyboard handling to the slot content.'
            },
            {
                noteKey: 'components.item.a11y.constraint_note',
                noteFallback: 'Must be used inside an <origam-item-group>. Throws a runtime error otherwise.'
            }
        ]
    } satisfies IComponentA11y
}
