/**
 * /components/chip-group — full documentation data for OrigamChipGroup.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chip/chip-group.interface.ts   (IChipGroupProps / IChipGroupEmits)
 *   - packages/ds/src/interfaces/Commons/group.interface.ts     (IGroupProps)
 *   - packages/ds/src/components/Chip/OrigamChipGroup.vue       (template BEM, defineExpose)
 *   - packages/ds/tokens/component/chip.json                    (CSS tokens — chip family)
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

export const CHIP_GROUP_DOC: IComponentDoc = {
    slug: 'chip-group',
    name: 'ChipGroup',
    tag: 'origam-chip-group',
    icon: 'mdi-label-multiple-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chip_group.description',
    descriptionFallback: 'Scrollable group of Chip elements with single or multi-select, filter support, and column layout option. Propagates color/bgColor tokens to descendant chips via OrigamDefaultsProvider.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chipgroup--design',
    docUrl: 'http://localhost:4000/components/Chip/OrigamChipGroup',

    parentSlug: 'chip',

    family: [],

    related: [
        {
            slug: 'chip',
            name: 'Chip',
            kind: 'component',
            descriptionKey: 'components.catalog.chip.description',
            descriptionFallback: 'Individual chip element that lives inside a ChipGroup.'
        },
        {
            slug: 'slide-group',
            name: 'SlideGroup',
            kind: 'component',
            descriptionKey: 'components.catalog.slide_group.description',
            descriptionFallback: 'Horizontal scrollable group that ChipGroup delegates to for overflow navigation.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip_group.props.model_value.description',
            descriptionFallback: 'Currently selected chip value(s). Supports v-model with a single value or an array in multiple mode.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip_group.props.multiple.description',
            descriptionFallback: 'Allows multiple chips to be selected simultaneously.'
        },
        {
            name: 'mandatory',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip_group.props.mandatory.description',
            descriptionFallback: 'At least one chip must remain selected; deselecting the last chip is prevented.'
        },
        {
            name: 'max',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip_group.props.max.description',
            descriptionFallback: 'Maximum number of chips that can be selected when multiple=true.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip_group.props.disabled.description',
            descriptionFallback: 'Disables all chips inside the group.'
        },
        {
            name: 'selectedClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-chip--selected'",
            descriptionKey: 'components.chip_group.props.selected_class.description',
            descriptionFallback: 'CSS class added to active/selected chips. Passed down to children via group context.'
        },
        {
            name: 'column',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip_group.props.column.description',
            descriptionFallback: 'Switches the layout from horizontal scrollable row to a wrapping column grid.'
        },
        {
            name: 'filter',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip_group.props.filter.description',
            descriptionFallback: 'Activates filter mode: selected chips display a check icon (passed down to chip children as a default prop).'
        },
        {
            name: 'valueComparator',
            type: { label: '(a: any, b: any) => boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip_group.props.value_comparator.description',
            descriptionFallback: 'Custom comparator used to determine if a chip value matches the modelValue. Defaults to strict equality.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip_group.props.color.description',
            descriptionFallback: 'Default foreground colour propagated to all descendant chips via OrigamDefaultsProvider.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip_group.props.bg_color.description',
            descriptionFallback: 'Default background colour propagated to all descendant chips.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.chip_group.props.tag.description',
            descriptionFallback: 'HTML element for the root wrapper.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip_group.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean applied to the group wrapper.'
        },
        {
            name: 'direction',
            type: { label: 'TDirection', slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.chip_group.props.direction.description',
            descriptionFallback: 'Scrolling direction of the underlying SlideGroup: horizontal or vertical.'
        },
        {
            name: 'nextIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'MDI_ICONS.CHEVRON_RIGHT',
            descriptionKey: 'components.chip_group.props.next_icon.description',
            descriptionFallback: 'Icon for the "scroll next" navigation button of the SlideGroup.'
        },
        {
            name: 'prevIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'MDI_ICONS.CHEVRON_LEFT',
            descriptionKey: 'components.chip_group.props.prev_icon.description',
            descriptionFallback: 'Icon for the "scroll previous" navigation button of the SlideGroup.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chip_group.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selected chip(s) change. Emits the new value or array of values.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isSelected, select, next, prev, selected }',
            descriptionKey: 'components.chip_group.slots.default.description',
            descriptionFallback: 'Default slot for origam-chip children. Receives group helpers (isSelected, select, next, prev, selected) to build custom layouts.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chip_group.examples.filter.title',
            titleFallback: 'Filter chips',
            lang: 'vue',
            code: `<template>
  <origam-chip-group v-model="selected" filter multiple>
    <origam-chip v-for="tag in tags" :key="tag" :value="tag">
      {{ tag }}
    </origam-chip>
  </origam-chip-group>
  <p>Selected: {{ selected }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ['Vue', 'TypeScript', 'CSS', 'Design Systems', 'Accessibility']
const selected = ref<string[]>([])
</script>`
        },
        {
            titleKey: 'components.chip_group.examples.single.title',
            titleFallback: 'Single select (mandatory)',
            lang: 'vue',
            code: `<template>
  <origam-chip-group v-model="active" mandatory color="primary">
    <origam-chip value="all">All</origam-chip>
    <origam-chip value="active">Active</origam-chip>
    <origam-chip value="inactive">Inactive</origam-chip>
  </origam-chip-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref('all')
</script>`
        },
        {
            titleKey: 'components.chip_group.examples.column.title',
            titleFallback: 'Column layout',
            lang: 'vue',
            code: `<template>
  <origam-chip-group column multiple>
    <origam-chip v-for="item in items" :key="item" :value="item">
      {{ item }}
    </origam-chip>
  </origam-chip-group>
</template>

<script setup lang="ts">
const items = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange']
</script>`
        }
    ],

    previewVariants: [
        { label: 'default', props: {}, slotContent: 'Group' },
        { label: 'with color', props: { color: 'primary' }, slotContent: 'Colored' },
        { label: 'filter', props: { filter: true }, slotContent: 'Filter' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-chip-group',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamChipGroup',
        svgDesc: 'Schematic of the ChipGroup component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="16" y="24" width="668" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="16" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">origam-chip-group ①</text>
  <rect x="32" y="36" width="636" height="76" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="100" y="56" font-size="8.5" fill="var(--origam-color__text---secondary, #6b7280)" font-family="'JetBrains Mono',monospace">origam-slide-group ②</text>
  <rect x="48" y="64" width="80" height="32" rx="16" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="88" y="83" font-size="9" fill="#fff" text-anchor="middle" font-family="sans-serif">Vue ✓</text>
  <rect x="140" y="64" width="100" height="32" rx="16" fill="var(--origam-color__surface---overlay, #f3f4f6)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1"/>
  <text x="190" y="83" font-size="9" fill="var(--origam-color__text---primary, #111827)" text-anchor="middle" font-family="sans-serif">TypeScript</text>
  <rect x="252" y="64" width="72" height="32" rx="16" fill="var(--origam-color__surface---overlay, #f3f4f6)" stroke="var(--origam-color__border---default, #e5e7eb)" stroke-width="1"/>
  <text x="288" y="83" font-size="9" fill="var(--origam-color__text---primary, #111827)" text-anchor="middle" font-family="sans-serif">CSS</text>
  <text x="48" y="110" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" font-family="'JetBrains Mono',monospace">origam-chip ③ (slot default)</text>
  <text x="350" y="148" font-size="8" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="sans-serif">OrigamDefaultsProvider propagates color/bgColor to chip children ④</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-chip-group&gt;</code> — 4 internal parts. The root ① wraps a <code>origam-slide-group</code> ② which contains chip children ③. An <code>origam-defaults-provider</code> ④ propagates visual token props to all descendant chips.',
        legend: [
            { num: 1, cls: '.origam-chip-group', descriptionKey: 'components.chip_group.anatomy.root', descriptionFallback: 'Root element. BEM modifier --column switches to a wrapping grid layout.' },
            { num: 2, cls: 'origam-slide-group', descriptionKey: 'components.chip_group.anatomy.slide_group', descriptionFallback: 'Horizontal scrollable container with prev/next navigation buttons. Receives filtered SlideGroup props.' },
            { num: 3, cls: 'origam-chip (slot children)', descriptionKey: 'components.chip_group.anatomy.chip', descriptionFallback: 'Child chip elements provided via the default slot. Receive selection state from the group context (ORIGAM_CHIP_GROUP_KEY).' },
            { num: 4, cls: 'origam-defaults-provider', descriptionKey: 'components.chip_group.anatomy.defaults_provider', descriptionFallback: 'Injects default color, bgColor and other visual props into all descendant origam-chip elements.' }
        ],
        code: `<origam-slide-group class="origam-chip-group origam-chip-group--column?">
  <origam-defaults-provider :defaults="slotDefaults">
    <slot :is-selected="isSelected" :select="select" :next="next" :prev="prev" :selected="selected" />
  </origam-defaults-provider>
</origam-slide-group>`,
        classes: [
            { cls: 'origam-chip-group', descriptionKey: 'components.chip_group.anatomy.root', descriptionFallback: 'Root BEM class.' },
            { cls: 'origam-chip-group--column', descriptionKey: 'components.chip_group.anatomy.column_modifier', descriptionFallback: 'Added when column=true. Switches layout to a wrapping column grid.' }
        ]
    },

    cssVars: [
        {
            name: '--origam-chip---background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.chip_group.css_vars.chip_bg',
            descriptionFallback: 'Default chip background propagated to all chips in the group.'
        },
        {
            name: '--origam-chip---border-radius',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.chip_group.css_vars.chip_radius',
            descriptionFallback: 'Chip border radius (pill by default).'
        },
        {
            name: '--origam-chip--selected---background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.chip_group.css_vars.chip_selected_bg',
            descriptionFallback: 'Selected chip background colour.'
        },
        {
            name: '--origam-chip--selected---color',
            defaultValue: '{color.action.primary.fg}',
            descriptionKey: 'components.chip_group.css_vars.chip_selected_color',
            descriptionFallback: 'Selected chip foreground colour.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.chip_group.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.chip_group.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.chip_group.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.chip_group.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.chip_group.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.chip_group.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.chip_group.a11y.key_tab',
                actionFallback: 'Moves focus between chips inside the group.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.chip_group.a11y.key_activate',
                actionFallback: 'Selects or deselects the focused chip.'
            },
            {
                key: 'Arrow Left / Right',
                actionKey: 'components.chip_group.a11y.key_arrows',
                actionFallback: 'Scrolls the slide group when overflow is present (handled by OrigamSlideGroup).'
            }
        ],
        notes: [
            {
                noteKey: 'components.chip_group.a11y.group_role',
                noteFallback: 'The slide group container exposes a logical grouping of selectable chip controls. Each chip carries its own role and aria-selected.'
            },
            {
                noteKey: 'components.chip_group.a11y.defaults_propagation',
                noteFallback: 'Color tokens are propagated via OrigamDefaultsProvider — children that set their own color still take precedence over the group defaults.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chip.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. ChipGroup shares the chip.json token file with OrigamChip.',
        excerpt: [
            {
                tokenPath: 'chip.background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.chip_group.tokens.chip_bg',
                descriptionFallback: 'Default chip background (propagated to children).'
            },
            {
                tokenPath: 'chip.selected.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.chip_group.tokens.chip_selected_bg',
                descriptionFallback: 'Background of the selected chip state.'
            },
            {
                tokenPath: 'chip.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.chip_group.tokens.chip_radius',
                descriptionFallback: 'Chip border radius.'
            },
            {
                tokenPath: 'chip.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.chip_group.tokens.transition_duration',
                descriptionFallback: 'Chip transition duration (hover, selection).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.chip_group.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'info', value: 'info' }
                ]
            },
            {
                prop: 'multiple',
                kind: 'switch',
                labelKey: 'components.chip_group.playground.multiple',
                labelFallback: 'Multiple',
                defaultValue: false
            },
            {
                prop: 'filter',
                kind: 'switch',
                labelKey: 'components.chip_group.playground.filter',
                labelFallback: 'Filter mode',
                defaultValue: false
            },
            {
                prop: 'column',
                kind: 'switch',
                labelKey: 'components.chip_group.playground.column',
                labelFallback: 'Column layout',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
