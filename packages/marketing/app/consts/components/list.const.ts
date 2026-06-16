/**
 * /components/list — full documentation data for OrigamList and its family.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/List/list.interface.ts          (IListProps, IListEmits)
 *   - packages/ds/src/interfaces/List/list-item.interface.ts     (IListItemProps)
 *   - packages/ds/src/interfaces/List/list-group.interface.ts    (IListGroupProps)
 *   - packages/ds/src/interfaces/List/list-subheader.interface.ts (IListSubheader)
 *   - packages/ds/src/components/List/OrigamList.vue             (template, BEM, defineExpose)
 *   - packages/ds/src/components/List/OrigamListItem.vue         (template, BEM)
 *   - packages/ds/tokens/component/list.json                    (CSS tokens)
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

export const LIST_DOC: IComponentDoc = {
    slug: 'list',
    name: 'List',
    tag: 'origam-list',
    icon: 'mdi-format-list-bulleted',
    category: 'Data Display',
    descriptionKey: 'components.catalog.list.description',
    descriptionFallback: 'Accessible list component with support for navigation, selection, groups, subheaders, icons, avatars, single/multi-line items and keyboard traversal.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-list--design',
    docUrl: 'http://localhost:4000/components/List/OrigamList',

    family: [
        {
            slug: 'list-item',
            name: 'ListItem',
            descriptionKey: 'components.catalog.list_item.description',
            descriptionFallback: 'Individual list row with prepend/append slots, title, subtitle, link support and ripple.'
        },
        {
            slug: 'list-group',
            name: 'ListGroup',
            descriptionKey: 'components.catalog.list_group.description',
            descriptionFallback: 'Collapsible group of list items with an activator header.'
        },
        {
            slug: 'list-subheader',
            name: 'ListSubheader',
            descriptionKey: 'components.catalog.list_subheader.description',
            descriptionFallback: 'Section label rendered above a set of list items. Supports sticky positioning.'
        },
        {
            slug: 'list-children',
            name: 'ListChildren',
            descriptionKey: 'components.catalog.list_children.description',
            descriptionFallback: 'Internal renderer that maps the items prop array to ListItem / ListGroup / ListSubheader elements.'
        }
    ],

    related: [
        {
            slug: 'select',
            name: 'Select',
            kind: 'component',
            descriptionKey: 'components.catalog.select.description',
            descriptionFallback: 'Dropdown that uses OrigamList internally to render the options menu.'
        },
        {
            slug: 'menu',
            name: 'Menu',
            kind: 'component',
            descriptionKey: 'components.catalog.menu.description',
            descriptionFallback: 'Context menu or dropdown surface — typically wraps an OrigamList.'
        }
    ],

    props: [
        // ── IListProps own props ───────────────────────────────────────────
        {
            name: 'items',
            type: { label: 'Array<any>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.list.props.items.description',
            descriptionFallback: 'Data array. Each element is mapped to a ListItem, ListGroup or ListSubheader by ListChildren.'
        },
        {
            name: 'itemTitle',
            type: { label: 'TSelectItemKey', slug: 'select-item-key', kind: 'type' },
            defaultValue: "'title'",
            descriptionKey: 'components.list.props.item_title.description',
            descriptionFallback: 'Key (or getter) used to extract the title text from each item object.'
        },
        {
            name: 'itemValue',
            type: { label: 'TSelectItemKey', slug: 'select-item-key', kind: 'type' },
            defaultValue: "'value'",
            descriptionKey: 'components.list.props.item_value.description',
            descriptionFallback: 'Key (or getter) used to extract the selection value from each item object.'
        },
        {
            name: 'itemChildren',
            type: { label: 'TSelectItemKey', slug: 'select-item-key', kind: 'type' },
            defaultValue: "'children'",
            descriptionKey: 'components.list.props.item_children.description',
            descriptionFallback: 'Key (or getter) used to extract nested children (creates a ListGroup).'
        },
        {
            name: 'itemProps',
            type: { label: 'TSelectItemKey', slug: 'select-item-key', kind: 'type' },
            defaultValue: "'props'",
            descriptionKey: 'components.list.props.item_props.description',
            descriptionFallback: 'Key (or getter) that returns extra props merged onto each ListItem.'
        },
        {
            name: 'returnObject',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list.props.return_object.description',
            descriptionFallback: 'When true, emits the full item object instead of itemValue.'
        },
        {
            name: 'lines',
            type: { label: 'TLines', slug: 'lines', kind: 'type' },
            defaultValue: "'one'",
            descriptionKey: 'components.list.props.lines.description',
            descriptionFallback: 'Controls item min-height and subtitle line-clamp. Values: one | two | three.'
        },
        {
            name: 'nav',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list.props.nav.description',
            descriptionFallback: 'Navigation mode: reduces horizontal padding and adjusts font sizes for sidebar navigation patterns.'
        },
        {
            name: 'slim',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list.props.slim.description',
            descriptionFallback: 'Reduces the prepend width to 28 px for tighter layouts.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list.props.disabled.description',
            descriptionFallback: 'Disables all interaction (pointer-events: none; user-select: none).'
        },
        {
            name: 'activeClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list.props.active_class.description',
            descriptionFallback: 'Extra CSS class injected on the active ListItem.'
        },
        {
            name: 'expandIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list.props.expand_icon.description',
            descriptionFallback: 'Icon used to indicate an expandable group (overrides ListGroup default).'
        },
        {
            name: 'collapseIcon',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list.props.collapse_icon.description',
            descriptionFallback: 'Icon used to indicate a collapsed group (overrides ListGroup default).'
        },
        {
            name: 'itemType',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'type'",
            descriptionKey: 'components.list.props.item_type.description',
            descriptionFallback: 'Key in each item object that identifies its type (item | subheader | divider | group).'
        },
        // ── IDensityProps ──────────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.list.props.density.description',
            descriptionFallback: 'Adjusts item padding density. default | compact.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list.props.color.description',
            descriptionFallback: 'Foreground / active item color, propagated down to child ListItems.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list.props.bg_color.description',
            descriptionFallback: 'Background color propagated down to child ListItems.'
        },
        // ── IElevationProps ────────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean.'
        },
        // ── IBorderProps ───────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list.props.border.description',
            descriptionFallback: 'Applies a border and removes the box-shadow.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.list.props.tag.description',
            descriptionFallback: 'Root HTML element tag. Use "ul" for semantic list markup.'
        }
    ],

    emits: [
        {
            event: 'update:selected',
            payload: { label: 'Array<unknown>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.list.emits.update_selected.description',
            descriptionFallback: 'Emitted when the selected items change.'
        },
        {
            event: 'update:opened',
            payload: { label: 'Array<unknown>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.list.emits.update_opened.description',
            descriptionFallback: 'Emitted when open groups change.'
        },
        {
            event: 'click:open',
            payload: { label: '{ id, value, path }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.list.emits.click_open.description',
            descriptionFallback: 'Fired when the user clicks a group activator to open/close a group.'
        },
        {
            event: 'click:select',
            payload: { label: '{ id, value, path }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.list.emits.click_select.description',
            descriptionFallback: 'Fired when the user clicks a selectable item.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.list.slots.default.description',
            descriptionFallback: 'Full control of item rendering. When absent, ListChildren auto-renders from the items prop.'
        },
        {
            slot: 'item',
            slotProps: '{ itemProps }',
            descriptionKey: 'components.list.slots.item.description',
            descriptionFallback: 'Custom renderer for each item row. itemProps is the merged props for the auto-rendered ListItem.'
        },
        {
            slot: 'subheader',
            slotProps: '{ itemProps }',
            descriptionKey: 'components.list.slots.subheader.description',
            descriptionFallback: 'Custom renderer for subheader rows.'
        },
        {
            slot: 'group',
            slotProps: '{ itemProps }',
            descriptionKey: 'components.list.slots.group.description',
            descriptionFallback: 'Custom renderer for group rows.'
        },
        {
            slot: 'groupActivator',
            slotProps: '{ props, isOpen, events, toggleIcon }',
            descriptionKey: 'components.list.slots.group_activator.description',
            descriptionFallback: 'Custom renderer for the group activator header. isOpen exposes the current open state; events holds the click handler.'
        },
        {
            slot: 'divider',
            slotProps: '{ itemProps }',
            descriptionKey: 'components.list.slots.divider.description',
            descriptionFallback: 'Custom renderer for divider rows (type: "divider" in items).'
        },
        {
            slot: 'childrenItem',
            slotProps: '{ item, index }',
            descriptionKey: 'components.list.slots.children_item.description',
            descriptionFallback: 'Custom renderer for child items inside a ListGroup.'
        }
    ],

    examples: [
        {
            titleKey: 'components.list.examples.basic.title',
            titleFallback: 'Basic list from data',
            lang: 'vue',
            code: `<template>
  <origam-list
    :items="items"
    item-title="label"
    item-value="id"
    color="primary"
  />
</template>

<script setup lang="ts">
const items = [
  { id: 1, label: 'Inbox', prependIcon: 'mdi-inbox' },
  { id: 2, label: 'Starred', prependIcon: 'mdi-star' },
  { id: 3, label: 'Sent', prependIcon: 'mdi-send' },
  { id: 4, label: 'Drafts', prependIcon: 'mdi-pencil' }
]
</script>`
        },
        {
            titleKey: 'components.list.examples.nav.title',
            titleFallback: 'Navigation list (nav mode)',
            lang: 'vue',
            code: `<template>
  <origam-list nav color="primary" :items="navItems" />
</template>

<script setup lang="ts">
const navItems = [
  { title: 'Dashboard', value: 'dashboard', prependIcon: 'mdi-view-dashboard' },
  { title: 'Analytics', value: 'analytics', prependIcon: 'mdi-chart-bar' },
  { title: 'Settings', value: 'settings', prependIcon: 'mdi-cog' }
]
</script>`
        },
        {
            titleKey: 'components.list.examples.groups.title',
            titleFallback: 'Grouped list',
            lang: 'vue',
            code: `<template>
  <origam-list :items="groupedItems" />
</template>

<script setup lang="ts">
const groupedItems = [
  {
    title: 'Fruit',
    value: 'fruit',
    children: [
      { title: 'Apple', value: 'apple' },
      { title: 'Banana', value: 'banana' }
    ]
  },
  {
    title: 'Vegetables',
    value: 'veg',
    children: [
      { title: 'Carrot', value: 'carrot' },
      { title: 'Broccoli', value: 'broccoli' }
    ]
  }
]
</script>`
        }
    ],

    previewVariants: [
        {
            label: 'default',
            props: { color: 'primary', lines: 'one' },
            slotContent: ''
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-list',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamList',
        svgDesc: 'Schematic of the List component with subheader, items and group.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="24" y="24" width="652" height="232" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="24" y="24" width="652" height="32" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="none"/>
  <text x="56" y="44" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">SECTION HEADER</text>
  <rect x="24" y="56" width="652" height="48" rx="0" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <rect x="40" y="68" width="24" height="24" rx="12" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))"/>
  <text x="52" y="84" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="sans-serif">i</text>
  <text x="80" y="79" font-size="11" fill="var(--origam-color__text---primary, #1e0036)" font-family="sans-serif">List item title</text>
  <text x="80" y="94" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="sans-serif">Subtitle text</text>
  <rect x="24" y="104" width="652" height="48" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="none"/>
  <text x="80" y="125" font-size="11" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="sans-serif">Active item</text>
  <rect x="24" y="152" width="652" height="1" fill="var(--origam-color__border---default, rgba(168,85,247,0.30))"/>
  <rect x="24" y="153" width="652" height="48" rx="0" fill="none"/>
  <text x="80" y="182" font-size="11" fill="var(--origam-color__text---primary, #1e0036)" font-family="sans-serif">Group header (collapsed)</text>
  <text x="660" y="182" font-size="11" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="end" font-family="sans-serif">▶</text>
  <rect x="24" y="201" width="652" height="48" rx="0" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.15))" stroke-width="1"/>
  <text x="104" y="230" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="sans-serif">Nested child item</text>
  <circle cx="32" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="32" cy="80" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="32" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="32" cy="128" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="132" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="32" cy="177" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="32" y="181" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="32" cy="225" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="32" y="229" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-list&gt;</code> — 5 structural zones: root (①), ListItem (②), active item (③), ListGroup activator (④) and nested child item (⑤).',
        legend: [
            {
                num: 1,
                cls: '.origam-list',
                descriptionKey: 'components.list.anatomy.root',
                descriptionFallback: 'Root element. <code>role="listbox"</code>. Manages keyboard navigation (arrow keys, Home, End) and focus tracking.'
            },
            {
                num: 2,
                cls: '.origam-list-item',
                descriptionKey: 'components.list.anatomy.item',
                descriptionFallback: 'Individual row. 3-column grid: prepend | content (title + subtitle) | append. Clickable when link or value is set.'
            },
            {
                num: 3,
                cls: '.origam-list-item--active',
                descriptionKey: 'components.list.anatomy.item_active',
                descriptionFallback: 'Active state modifier. Applied when the item value matches the list selection or when active=true.'
            },
            {
                num: 4,
                cls: '.origam-list-group',
                descriptionKey: 'components.list.anatomy.group',
                descriptionFallback: 'Collapsible group wrapper. The activator header toggles the open state; nested children indent via CSS var.'
            },
            {
                num: 5,
                cls: '.origam-list-item (nested)',
                descriptionKey: 'components.list.anatomy.nested_item',
                descriptionFallback: 'Child item inside a ListGroup. Inherits indent via <code>--origam-list---indent-padding</code> CSS variable.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- role="listbox" — keyboard nav handled by OrigamList script -->
<component :is="tag" role="listbox" class="origam-list">
  <!-- ListSubheader (optional) -->
  <div class="origam-list-subheader">SECTION</div>

  <!-- OrigamListItem — grid: prepend | content | append -->
  <div class="origam-list-item origam-list-item--link">
    <span class="origam-list-item__overlay" />
    <span class="origam-list-item__underlay" />
    <div class="origam-list-item__prepend"><origam-icon /></div>
    <div class="origam-list-item__content">
      <div class="origam-list-item__title">Title</div>
      <div class="origam-list-item__subtitle">Subtitle</div>
    </div>
    <div class="origam-list-item__append"><origam-icon /></div>
  </div>
</component>`,
        classes: [
            {
                cls: 'origam-list',
                descriptionKey: 'components.list.anatomy.root',
                descriptionFallback: 'Root element. role="listbox". Keyboard navigation container.'
            },
            {
                cls: 'origam-list--disabled',
                descriptionKey: 'components.list.anatomy.disabled',
                descriptionFallback: 'Applied when disabled=true. pointer-events: none; user-select: none.'
            },
            {
                cls: 'origam-list--nav',
                descriptionKey: 'components.list.anatomy.nav',
                descriptionFallback: 'Navigation mode. Reduces horizontal padding and adjusts subheader font size.'
            },
            {
                cls: 'origam-list--slim',
                descriptionKey: 'components.list.anatomy.slim',
                descriptionFallback: 'Slim mode. Reduces prepend area width to 28 px.'
            },
            {
                cls: 'origam-list--one-line',
                descriptionKey: 'components.list.anatomy.one_line',
                descriptionFallback: 'Item min-height and subtitle clamp for single-line items.'
            },
            {
                cls: 'origam-list--two-line',
                descriptionKey: 'components.list.anatomy.two_line',
                descriptionFallback: 'Item min-height and subtitle clamp for two-line items.'
            },
            {
                cls: 'origam-list--three-line',
                descriptionKey: 'components.list.anatomy.three_line',
                descriptionFallback: 'Item min-height and subtitle clamp for three-line items.'
            },
            {
                cls: 'origam-list-item',
                descriptionKey: 'components.list.anatomy.item',
                descriptionFallback: 'Individual row — 3-column grid layout.'
            },
            {
                cls: 'origam-list-item__overlay',
                descriptionKey: 'components.list.anatomy.item_overlay',
                descriptionFallback: 'Hover/active scrim. opacity animates on hover (0.08) and active (0.12).'
            },
            {
                cls: 'origam-list-item__underlay',
                descriptionKey: 'components.list.anatomy.item_underlay',
                descriptionFallback: 'Absolute underlay reserved for compositing effects.'
            },
            {
                cls: 'origam-list-item__prepend',
                descriptionKey: 'components.list.anatomy.item_prepend',
                descriptionFallback: 'Prepend zone (grid-area: prepend). Hosts icon, avatar or custom slot.'
            },
            {
                cls: 'origam-list-item__content',
                descriptionKey: 'components.list.anatomy.item_content',
                descriptionFallback: 'Content zone (grid-area: content). Contains title + subtitle + default slot.'
            },
            {
                cls: 'origam-list-item__title',
                descriptionKey: 'components.list.anatomy.item_title',
                descriptionFallback: 'Item title. Single-line ellipsis by default.'
            },
            {
                cls: 'origam-list-item__subtitle',
                descriptionKey: 'components.list.anatomy.item_subtitle',
                descriptionFallback: 'Item subtitle. Clamped to 1–3 lines depending on lines prop.'
            },
            {
                cls: 'origam-list-item__append',
                descriptionKey: 'components.list.anatomy.item_append',
                descriptionFallback: 'Append zone (grid-area: append). Hosts trailing icon, avatar or custom slot.'
            },
            {
                cls: 'origam-list-item--active',
                descriptionKey: 'components.list.anatomy.item_active',
                descriptionFallback: 'Active item. The overlay opacity increases to 0.12.'
            },
            {
                cls: 'origam-list-item--disabled',
                descriptionKey: 'components.list.anatomy.item_disabled',
                descriptionFallback: 'Disabled item. pointer-events: none; opacity: 0.6.'
            },
            {
                cls: 'origam-list-item--link',
                descriptionKey: 'components.list.anatomy.item_link',
                descriptionFallback: 'Clickable item. cursor: pointer; adds ripple and keyboard handler.'
            },
            {
                cls: 'origam-list-subheader',
                descriptionKey: 'components.list.anatomy.subheader',
                descriptionFallback: 'Section label. Font size, color and sticky positioning controlled via CSS vars.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-list---background',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.list.css_vars.background',
            descriptionFallback: 'List background color.'
        },
        {
            name: '--origam-list---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.list.css_vars.color',
            descriptionFallback: 'List foreground color inherited by items.'
        },
        {
            name: '--origam-list---box-shadow',
            defaultValue: '{shadow.none}',
            descriptionKey: 'components.list.css_vars.box_shadow',
            descriptionFallback: 'List box shadow. Removed when border is active.'
        },
        {
            name: '--origam-list---padding-block-start',
            defaultValue: '{space.2}',
            descriptionKey: 'components.list.css_vars.padding_block_start',
            descriptionFallback: 'Top padding of the list container.'
        },
        {
            name: '--origam-list---padding-block-end',
            defaultValue: '{space.2}',
            descriptionKey: 'components.list.css_vars.padding_block_end',
            descriptionFallback: 'Bottom padding of the list container.'
        },
        {
            name: '--origam-list---density',
            defaultValue: '0px',
            descriptionKey: 'components.list.css_vars.density',
            descriptionFallback: 'Density offset applied to item padding. compact: -8px.'
        },
        {
            name: '--origam-list-item---min-height',
            defaultValue: '40px',
            descriptionKey: 'components.list.css_vars.item_min_height',
            descriptionFallback: 'Minimum height of each ListItem.'
        },
        {
            name: '--origam-list-item__title---font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.list.css_vars.item_title_font_size',
            descriptionFallback: 'Title font size. Overridden in --nav mode.'
        },
        {
            name: '--origam-list-item__subtitle---font-size',
            defaultValue: '{font.size.sm}',
            descriptionKey: 'components.list.css_vars.item_subtitle_font_size',
            descriptionFallback: 'Subtitle font size.'
        },
        {
            name: '--origam-list-subheader---font-size',
            defaultValue: '{font.size.sm}',
            descriptionKey: 'components.list.css_vars.subheader_font_size',
            descriptionFallback: 'Subheader label font size.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'open',
            type: '(id: unknown, value: boolean) => void',
            descriptionKey: 'components.list.exposed.open',
            descriptionFallback: 'Programmatically open or close a ListGroup by its item id.'
        },
        {
            name: 'select',
            type: '(id: unknown, value: boolean) => void',
            descriptionKey: 'components.list.exposed.select',
            descriptionFallback: 'Programmatically select or deselect a ListItem by its item id.'
        },
        {
            name: 'focus',
            type: '(location?: TFocusLocation) => void',
            descriptionKey: 'components.list.exposed.focus',
            descriptionFallback: 'Focuses the first / last / next / prev interactive item. Used internally by keyboard navigation.'
        },
        {
            name: 'children',
            type: 'Ref<Map<unknown, unknown[]>>',
            descriptionKey: 'components.list.exposed.children',
            descriptionFallback: 'Map of parent → children IDs for the nested tree.'
        },
        {
            name: 'parents',
            type: 'Ref<Map<unknown, unknown>>',
            descriptionKey: 'components.list.exposed.parents',
            descriptionFallback: 'Map of child → parent IDs for the nested tree.'
        },
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.list.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.list.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.list.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.list.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.list.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.list.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['listbox'],
        keyboard: [
            {
                key: 'ArrowDown',
                actionKey: 'components.list.a11y.key_arrow_down',
                actionFallback: 'Moves focus to the next list item.'
            },
            {
                key: 'ArrowUp',
                actionKey: 'components.list.a11y.key_arrow_up',
                actionFallback: 'Moves focus to the previous list item.'
            },
            {
                key: 'Home',
                actionKey: 'components.list.a11y.key_home',
                actionFallback: 'Moves focus to the first list item.'
            },
            {
                key: 'End',
                actionKey: 'components.list.a11y.key_end',
                actionFallback: 'Moves focus to the last list item.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.list.a11y.key_activate',
                actionFallback: 'Activates (selects or follows link of) the focused item.'
            },
            {
                key: 'Tab',
                actionKey: 'components.list.a11y.key_tab',
                actionFallback: 'Tab exits the list and moves to the next focusable element in the page.'
            }
        ],
        notes: [
            {
                noteKey: 'components.list.a11y.role_note',
                noteFallback: 'OrigamList renders with <code>role="listbox"</code>. Individual items receive <code>tabindex="-2"</code> (managed tab focus) while the list root itself holds <code>tabindex="0"</code> when not focused internally.'
            },
            {
                noteKey: 'components.list.a11y.nav_note',
                noteFallback: 'For navigation lists, prefer wrapping OrigamList in a <code>&lt;nav&gt;</code> landmark and setting <code>tag="ul"</code> on OrigamList with <code>tag="li"</code> on each ListItem.'
            },
            {
                noteKey: 'components.list.a11y.disabled_note',
                noteFallback: 'When disabled=true, pointer-events and user-select are set to none, but the element remains in the DOM. The list is still focusable — add aria-disabled="true" manually if needed.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/list.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'list.background',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.list.tokens.background',
                descriptionFallback: 'Default list background.'
            },
            {
                tokenPath: 'list.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.list.tokens.color',
                descriptionFallback: 'Default foreground color.'
            },
            {
                tokenPath: 'list.item.min-height',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.list.tokens.item_min_height',
                descriptionFallback: 'Minimum height of each list item.'
            },
            {
                tokenPath: 'list.item.padding-inline-start',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.list.tokens.item_padding_inline_start',
                descriptionFallback: 'Start padding of each list item.'
            },
            {
                tokenPath: 'list.item.title.font-size',
                value: '{font.size.md}',
                type: 'dimension',
                descriptionKey: 'components.list.tokens.item_title_font_size',
                descriptionFallback: 'List item title font size.'
            },
            {
                tokenPath: 'list.item.subtitle.font-size',
                value: '{font.size.sm}',
                type: 'dimension',
                descriptionKey: 'components.list.tokens.item_subtitle_font_size',
                descriptionFallback: 'List item subtitle font size.'
            },
            {
                tokenPath: 'list.subheader.font-size',
                value: '{font.size.sm}',
                type: 'dimension',
                descriptionKey: 'components.list.tokens.subheader_font_size',
                descriptionFallback: 'Subheader font size.'
            },
            {
                tokenPath: 'list.subheader.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.list.tokens.subheader_color',
                descriptionFallback: 'Subheader text color.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'lines',
                kind: 'select',
                labelKey: 'components.list.playground.lines',
                labelFallback: 'Lines',
                defaultValue: 'one',
                options: [
                    { label: 'one', value: 'one' },
                    { label: 'two', value: 'two' },
                    { label: 'three', value: 'three' }
                ]
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.list.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' }
                ]
            },
            {
                prop: 'nav',
                kind: 'switch',
                labelKey: 'components.list.playground.nav',
                labelFallback: 'Nav mode',
                defaultValue: false
            },
            {
                prop: 'slim',
                kind: 'switch',
                labelKey: 'components.list.playground.slim',
                labelFallback: 'Slim',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.list.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.list.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'default', value: 'default' },
                    { label: 'compact', value: 'compact' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
