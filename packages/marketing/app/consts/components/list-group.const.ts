/**
 * /components/list-group — full documentation data for OrigamListGroup.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/List/list-group.interface.ts  (props / emits)
 *   - packages/ds/src/components/List/OrigamListGroup.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/list.json                   (CSS tokens — group section)
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

export const LIST_GROUP_DOC: IComponentDoc = {
    slug: 'list-group',
    name: 'ListGroup',
    tag: 'origam-list-group',
    icon: 'mdi-format-list-group',
    category: 'Data Display',
    descriptionKey: 'components.catalog.list_group.description',
    descriptionFallback: 'Collapsible group inside a List. Renders a header activator and a nested items container that expands/collapses with an animated transition.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-list--design',
    docUrl: 'http://localhost:4000/components/List/OrigamList',

    parentSlug: 'list',

    family: [
        {
            slug: 'list',
            name: 'List',
            descriptionKey: 'components.catalog.list.description',
            descriptionFallback: 'Container for a set of related ListItem, ListGroup and ListSubheader components.'
        },
        {
            slug: 'list-group-activator',
            name: 'ListGroupActivator',
            descriptionKey: 'components.catalog.list_group_activator.description',
            descriptionFallback: 'Internal wrapper that registers the activator context for nested group expansion.'
        }
    ],

    related: [
        {
            slug: 'drawer',
            name: 'Drawer',
            kind: 'component',
            descriptionKey: 'components.catalog.drawer.description',
            descriptionFallback: 'Slide-in panel — typically contains a List with ListGroups for navigation.'
        },
        {
            slug: 'treeview',
            name: 'Treeview',
            kind: 'component',
            descriptionKey: 'components.catalog.treeview.description',
            descriptionFallback: 'Hierarchical tree built on List and ListGroup primitives.'
        }
    ],

    props: [
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.list_group.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root of the list group.'
        },
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_group.props.value.description',
            descriptionFallback: 'Value used by the nested item system to track the open/closed state. Required when using nested or controlled open state.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_group.props.title.description',
            descriptionFallback: 'Title text rendered inside the default activator ListItem.'
        },
        {
            name: 'expandIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-down'",
            descriptionKey: 'components.list_group.props.expand_icon.description',
            descriptionFallback: 'Icon shown in the activator when the group is collapsed.'
        },
        {
            name: 'collapseIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-up'",
            descriptionKey: 'components.list_group.props.collapse_icon.description',
            descriptionFallback: 'Icon shown in the activator when the group is expanded.'
        },
        {
            name: 'fluid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_group.props.fluid.description',
            descriptionFallback: 'Removes the nested indent (list-indent-size = 0). Useful for flat-hierarchy navigation drawers.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_group.props.prepend_icon.description',
            descriptionFallback: 'Icon forwarded as prependIcon to the default activator ListItem.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_group.props.append_icon.description',
            descriptionFallback: 'Icon forwarded as appendIcon to the default activator ListItem. Overrides the toggle icon when set.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_group.props.color.description',
            descriptionFallback: 'Foreground color inherited by all descendant ListItems via OrigamDefaultsProvider.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_group.props.bg_color.description',
            descriptionFallback: 'Background color inherited by all descendant ListItems via OrigamDefaultsProvider.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_group.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the group root.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_group.props.border.description',
            descriptionFallback: 'Applies a border to the group root.'
        }
    ],

    emits: [
        {
            event: 'click:activator',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.list_group.emits.click_activator.description',
            descriptionFallback: 'Fired when the user clicks the activator header. Carries the raw MouseEvent. The group toggles its own open state; this emit is for external listeners.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.list_group.slots.default.description',
            descriptionFallback: 'Full override of both the activator and the items container. When used, the activator and items slots are ignored.'
        },
        {
            slot: 'activator',
            slotProps: '{ events, props, isOpen, toggleIcon }',
            descriptionKey: 'components.list_group.slots.activator.description',
            descriptionFallback: 'Custom activator element. Receives events (click handler), props (id + class), isOpen (boolean), toggleIcon (TIcon).'
        },
        {
            slot: 'items',
            slotProps: '—',
            descriptionKey: 'components.list_group.slots.items.description',
            descriptionFallback: 'Items rendered inside the collapsible zone below the activator.'
        }
    ],

    examples: [
        {
            titleKey: 'components.list_group.examples.basic.title',
            titleFallback: 'Collapsible group',
            lang: 'vue',
            code: `<template>
  <origam-list>
    <origam-list-group title="Settings" prepend-icon="mdi-cog">
      <template #items>
        <origam-list-item title="Account" prepend-icon="mdi-account" />
        <origam-list-item title="Privacy" prepend-icon="mdi-shield" />
        <origam-list-item title="Notifications" prepend-icon="mdi-bell" />
      </template>
    </origam-list-group>
  </origam-list>
</template>`
        },
        {
            titleKey: 'components.list_group.examples.custom_activator.title',
            titleFallback: 'Custom activator',
            lang: 'vue',
            code: `<template>
  <origam-list>
    <origam-list-group>
      <template #activator="{ events, props, isOpen, toggleIcon }">
        <origam-list-item
          title="Menu"
          prepend-icon="mdi-menu"
          :append-icon="toggleIcon"
          v-bind="props"
          v-on="events"
        />
      </template>

      <template #items>
        <origam-list-item title="Home" />
        <origam-list-item title="About" />
      </template>
    </origam-list-group>
  </origam-list>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-list-group',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamListGroup',
        svgDesc: 'Schematic of the ListGroup component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="644" height="220" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- activator wrapper -->
  <rect x="48" y="60" width="604" height="60" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="94" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-list-group-activator (.origam-list-group__activator)</text>
  <text x="350" y="112" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#activator slot → default: origam-list-item (.origam-list-group__header)</text>
  <!-- items zone -->
  <rect x="48" y="130" width="604" height="110" rx="3" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="160" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">div.origam-list-group__items (v-if isOpen, role=group)</text>
  <text x="350" y="178" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">--origam-list---indent-padding applied to children</text>
  <text x="350" y="220" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">#items slot</text>
  <!-- numbers -->
  <circle cx="36" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="68" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="72.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="56" cy="138" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="142.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <line x1="46" y1="44" x2="88" y2="28" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="92" y="28" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-list-group</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-list-group&gt;</code> — 3 primary zones: root ①, activator wrapper ②, and the collapsible items container ③ with an animated OrigamExpandY transition.`,
        legend: [
            {
                num: 1,
                cls: '.origam-list-group',
                descriptionKey: 'components.list_group.anatomy.root',
                descriptionFallback: 'Root element. Carries modifier classes: <code>--prepend</code>, <code>--append</code>, <code>--fluid</code>, <code>--open</code>. Uses <code>v-contrast</code> directive for automatic contrast correction.'
            },
            {
                num: 2,
                cls: '.origam-list-group__activator',
                descriptionKey: 'components.list_group.anatomy.activator',
                descriptionFallback: 'OrigamListGroupActivator wrapper around the header slot. Registers the activator context for nested group detection (<code>useNestedGroupActivator</code>).'
            },
            {
                num: 3,
                cls: '.origam-list-group__items',
                descriptionKey: 'components.list_group.anatomy.items',
                descriptionFallback: 'Collapsible container. Rendered only when <code>isOpen</code> is true (<code>v-if</code>). Wrapped in <code>OrigamExpandY</code> for enter/leave animation. Sets <code>role="group"</code> and <code>aria-labelledby</code> pointing to the activator id.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-list-group---list-indent-size',
            defaultValue: '{space.4}',
            descriptionKey: 'components.list_group.css_vars.list_indent_size',
            descriptionFallback: 'Amount by which nested items are indented. Set to 0 by --fluid modifier.'
        },
        {
            name: '--origam-list-group---prepend-width',
            defaultValue: '{space.4}',
            descriptionKey: 'components.list_group.css_vars.prepend_width',
            descriptionFallback: 'Width of the prepend area accounted for in the nested indent calculation.'
        },
        {
            name: '--origam-list-group---parent-padding',
            defaultValue: '0px',
            descriptionKey: 'components.list_group.css_vars.parent_padding',
            descriptionFallback: 'Cumulative indent from parent groups. Grows with each nesting level.'
        },
        {
            name: '--origam-list-group__header--active---opacity',
            defaultValue: '0',
            descriptionKey: 'components.list_group.css_vars.header_active_opacity',
            descriptionFallback: 'Overlay opacity of the activator item when the group is open. Defaults to 0 (no tint on active header).'
        },
        {
            name: '--origam-list-group__header--active--hover---opacity',
            defaultValue: '0',
            descriptionKey: 'components.list_group.css_vars.header_active_hover_opacity',
            descriptionFallback: 'Overlay opacity on hover when the activator is in active/open state. A scoped calc (0.04 * 1) is applied in the component SCSS.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'isOpen',
            type: 'Ref<boolean>',
            descriptionKey: 'components.list_group.exposed.is_open',
            descriptionFallback: 'Reactive ref reflecting whether the group is currently expanded.'
        },
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.list_group.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.list_group.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'ComputedRef<string>',
            descriptionKey: 'components.list_group.exposed.id',
            descriptionFallback: 'Computed unique ID used for aria-labelledby on the items container.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.list_group.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.list_group.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.list_group.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.list_group.a11y.key_toggle',
                actionFallback: 'Activates the activator ListItem and toggles the group open/closed.'
            },
            {
                key: 'Tab',
                actionKey: 'components.list_group.a11y.key_tab',
                actionFallback: 'Moves focus through the activator and then the expanded items.'
            }
        ],
        notes: [
            {
                noteKey: 'components.list_group.a11y.aria_group',
                noteFallback: 'The items container carries role="group" and aria-labelledby pointing to the activator element id, so screen readers announce the group name when entering the nested list.'
            },
            {
                noteKey: 'components.list_group.a11y.contrast_note',
                noteFallback: 'The v-contrast directive automatically adjusts the foreground color for sufficient contrast against the bgColor.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/list.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'list.group.list-indent-size',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.list_group.tokens.list_indent_size',
                descriptionFallback: 'Default indentation per nesting level.'
            },
            {
                tokenPath: 'list.group.prepend-width',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.list_group.tokens.prepend_width',
                descriptionFallback: 'Prepend area width added to the indent calculation when a prepend zone is present.'
            },
            {
                tokenPath: 'list.group.header-active-opacity',
                value: '{opacity.0}',
                type: 'number',
                descriptionKey: 'components.list_group.tokens.header_active_opacity',
                descriptionFallback: 'Overlay opacity on the activator item when the group is open.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.list_group.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Settings'
            },
            {
                prop: 'fluid',
                kind: 'switch',
                labelKey: 'components.list_group.playground.fluid',
                labelFallback: 'Fluid (no indent)',
                defaultValue: false
            },
            {
                prop: 'prependIcon',
                kind: 'select',
                labelKey: 'components.list_group.playground.prepend_icon',
                labelFallback: 'Prepend icon',
                defaultValue: 'mdi-cog',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-cog', value: 'mdi-cog' },
                    { label: 'mdi-account', value: 'mdi-account' },
                    { label: 'mdi-folder', value: 'mdi-folder' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
