/**
 * /components/list-item — full documentation data for OrigamListItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/List/list-item.interface.ts  (props / emits)
 *   - packages/ds/src/components/List/OrigamListItem.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/list.json                  (CSS tokens — list.item.*)
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

export const LIST_ITEM_DOC: IComponentDoc = {
    slug: 'list-item',
    name: 'ListItem',
    tag: 'origam-list-item',
    icon: 'mdi-format-list-bulleted',
    category: 'Data Display',
    descriptionKey: 'components.catalog.list_item.description',
    descriptionFallback: 'Single row inside a List. Supports prepend/append icons or avatars, title, subtitle, active state, and polymorphic link rendering.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-list-item--design',
    docUrl: 'http://localhost:4000/components/List/OrigamListItem',

    parentSlug: 'list',

    family: [],

    related: [
        {
            slug: 'list',
            name: 'List',
            kind: 'component',
            descriptionKey: 'components.catalog.list.description',
            descriptionFallback: 'Scrollable container that hosts ListItem and ListSubheader rows.'
        },
        {
            slug: 'list-subheader',
            name: 'ListSubheader',
            kind: 'component',
            descriptionKey: 'components.catalog.list_subheader.description',
            descriptionFallback: 'Section header rendered inside a List.'
        },
        {
            slug: 'list-group',
            name: 'ListGroup',
            kind: 'component',
            descriptionKey: 'components.catalog.list_group.description',
            descriptionFallback: 'Collapsible group of ListItem rows inside a List.'
        }
    ],

    props: [
        {
            name: 'title',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.title.description',
            descriptionFallback: 'Primary text rendered inside the content area. Can also be provided via the #title slot.'
        },
        {
            name: 'subtitle',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.subtitle.description',
            descriptionFallback: 'Secondary text rendered below the title. Truncated with ellipsis per the lines prop.'
        },
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.value.description',
            descriptionFallback: 'Selectable value when the item is inside a list group. Drives isSelected via useNestedItem.'
        },
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_item.props.active.description',
            descriptionFallback: 'Forces the active visual state regardless of router link match or selection.'
        },
        {
            name: 'activeClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.active_class.description',
            descriptionFallback: 'Extra CSS class applied when the item is active.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_item.props.disabled.description',
            descriptionFallback: 'Disables pointer events and reduces opacity. Sets aria-disabled when rendered as an anchor.'
        },
        {
            name: 'link',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_item.props.link.description',
            descriptionFallback: 'Opt into explicit link mode. Adds cursor: pointer, ripple, and keyboard activation even without an href/to.'
        },
        {
            name: 'nav',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_item.props.nav.description',
            descriptionFallback: 'Compact nav variant — reduces inline padding and adjusts title/subtitle typography.'
        },
        {
            name: 'slim',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_item.props.slim.description',
            descriptionFallback: 'Reduces the prepend area width for tighter layouts.'
        },
        {
            name: 'lines',
            type: { label: 'TLines', slug: 'lines', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.lines.description',
            descriptionFallback: 'Controls subtitle line-clamp: one-line, two-line, three-line. three-line also aligns prepend/append to the top.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.prepend_icon.description',
            descriptionFallback: 'MDI or custom icon rendered in the prepend zone.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.append_icon.description',
            descriptionFallback: 'MDI or custom icon rendered in the append zone.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar rendered in the prepend zone.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar rendered in the append zone.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.color.description',
            descriptionFallback: 'Foreground color applied to text and icons.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.bg_color.description',
            descriptionFallback: 'Background color of the item row.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.list_item.props.density.description',
            descriptionFallback: 'Adjusts vertical padding density via the --origam-list---density variable.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean applied to the item.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_item.props.border.description',
            descriptionFallback: 'Applies a border to the item.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the item.'
        },
        {
            name: 'ripple',
            type: { label: 'boolean | { class: string }', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.list_item.props.ripple.description',
            descriptionFallback: 'Enables the Material ripple effect on click when the item is clickable.'
        },
        {
            name: 'href',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.href.description',
            descriptionFallback: 'Renders the item as an anchor tag pointing to this URL.'
        },
        {
            name: 'to',
            type: { label: 'string | RouteLocationRaw', slug: 'route-location-raw', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_item.props.to.description',
            descriptionFallback: 'Vue Router destination. Automatically renders the item as an anchor using router-link.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.list_item.props.tag.description',
            descriptionFallback: 'Root HTML element. Becomes <a> when href or to is set via useLink.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.list_item.emits.click.description',
            descriptionFallback: 'Fired on item click (or Enter/Space for keyboard users when the item is clickable).'
        },
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.list_item.emits.click_prepend.description',
            descriptionFallback: 'Fired when the user clicks the prepend zone. Propagation is stopped.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.list_item.emits.click_append.description',
            descriptionFallback: 'Fired when the user clicks the append zone.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isActive, select, isSelected, isIndeterminate }',
            descriptionKey: 'components.list_item.slots.default.description',
            descriptionFallback: 'Content rendered inside the __content zone, after title and subtitle.'
        },
        {
            slot: 'title',
            slotProps: '{ title }',
            descriptionKey: 'components.list_item.slots.title.description',
            descriptionFallback: 'Replaces the default title text rendering.'
        },
        {
            slot: 'subtitle',
            slotProps: '{ subtitle }',
            descriptionKey: 'components.list_item.slots.subtitle.description',
            descriptionFallback: 'Replaces the default subtitle text rendering.'
        },
        {
            slot: 'prepend',
            slotProps: '{ isActive, select, isSelected, isIndeterminate }',
            descriptionKey: 'components.list_item.slots.prepend.description',
            descriptionFallback: 'Replaces the prepend icon/avatar with custom content.'
        },
        {
            slot: 'append',
            slotProps: '{ isActive, select, isSelected, isIndeterminate }',
            descriptionKey: 'components.list_item.slots.append.description',
            descriptionFallback: 'Replaces the append icon/avatar with custom content.'
        },
        {
            slot: 'wrapper',
            slotProps: '—',
            descriptionKey: 'components.list_item.slots.wrapper.description',
            descriptionFallback: 'Replaces the entire inner layout (prepend / content / append). Use for advanced custom layouts.'
        }
    ],

    examples: [
        {
            titleKey: 'components.list_item.examples.basic.title',
            titleFallback: 'Basic items',
            lang: 'vue',
            code: `<template>
  <origam-list>
    <origam-list-item title="Inbox" prepend-icon="mdi-inbox" />
    <origam-list-item title="Sent" prepend-icon="mdi-send" />
    <origam-list-item title="Trash" prepend-icon="mdi-delete" />
  </origam-list>
</template>`
        },
        {
            titleKey: 'components.list_item.examples.subtitle.title',
            titleFallback: 'Title + subtitle',
            lang: 'vue',
            code: `<template>
  <origam-list>
    <origam-list-item
      title="John Doe"
      subtitle="john.doe@example.com"
      prepend-icon="mdi-account"
    />
    <origam-list-item
      title="Jane Smith"
      subtitle="jane.smith@example.com"
      prepend-icon="mdi-account"
    />
  </origam-list>
</template>`
        },
        {
            titleKey: 'components.list_item.examples.link.title',
            titleFallback: 'Clickable / link items',
            lang: 'vue',
            code: `<template>
  <origam-list>
    <origam-list-item
      title="Go to dashboard"
      prepend-icon="mdi-view-dashboard"
      to="/dashboard"
    />
    <origam-list-item
      title="External link"
      prepend-icon="mdi-open-in-new"
      href="https://example.com"
      target="_blank"
    />
    <origam-list-item
      title="Disabled"
      prepend-icon="mdi-lock"
      disabled
    />
  </origam-list>
</template>`
        }
    ],

    previewVariants: [
        { label: 'simple', props: { title: 'Inbox', prependIcon: 'mdi-inbox' } },
        { label: 'subtitle', props: { title: 'John Doe', subtitle: 'john.doe@example.com', prependIcon: 'mdi-account' } },
        { label: 'active', props: { title: 'Active', prependIcon: 'mdi-star', active: true } },
        { label: 'disabled', props: { title: 'Disabled', prependIcon: 'mdi-lock', disabled: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-list-item',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamListItem',
        svgDesc: 'Schematic of the ListItem component with 7 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="30" width="660" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="30" width="660" height="80" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.6"/>
  <rect x="32" y="42" width="56" height="56" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.4))" stroke-width="1.5"/>
  <text x="60" y="74" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">prepend</text>
  <rect x="100" y="42" width="416" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="108" y="50" width="248" height="16" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))"/>
  <text x="232" y="62" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">title</text>
  <rect x="108" y="74" width="180" height="12" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="198" y="84" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">subtitle</text>
  <rect x="528" y="42" width="140" height="56" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.4))" stroke-width="1.5"/>
  <text x="598" y="74" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">append</text>
  <rect x="20" y="30" width="660" height="80" rx="4" fill="none"/>
  <rect x="20" y="110" width="660" height="4" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))"/>
  <circle cx="28" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="42" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="60" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="60" y="42" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="308" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="308" y="42" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="232" cy="46" r="8" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="232" y="50" font-size="8" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <circle cx="198" cy="70" r="8" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="198" y="74" font-size="8" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">5</text>
  <circle cx="598" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="598" y="42" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">6</text>
  <circle cx="28" cy="108" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="28" y="112" font-size="8" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">7</text>
  <line x1="38" y1="36" x2="90" y2="18" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="94" y="20" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-list-item</text>
  <text x="350" y="200" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">⑦ = overlay — absolute, opacity: 0 at rest, visible on hover/active</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-list-item&gt;</code> — 7 internal parts. The grid layout places prepend ② / content ③ / append ⑥ in a 3-column grid. Title ④ and subtitle ⑤ live inside content. The overlay ⑦ is an absolute layer that paints hover/active tints.`,
        legend: [
            {
                num: 1,
                cls: '.origam-list-item',
                descriptionKey: 'components.list_item.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;div&gt;</code> by default, <code>&lt;a&gt;</code> when href/to is set. Grid container: 3 columns (prepend / content / append).'
            },
            {
                num: 2,
                cls: '.origam-list-item__prepend',
                descriptionKey: 'components.list_item.anatomy.prepend',
                descriptionFallback: 'Leading icon/avatar zone. <code>grid-area: prepend</code>. Renders <code>prependIcon</code>, <code>prependAvatar</code>, or the <code>#prepend</code> slot. <code>v-if="hasPrepend"</code>.'
            },
            {
                num: 3,
                cls: '.origam-list-item__content',
                descriptionKey: 'components.list_item.anatomy.content',
                descriptionFallback: '<code>grid-area: content</code>. Contains title, subtitle and the <code>#default</code> slot.'
            },
            {
                num: 4,
                cls: '.origam-list-item__title',
                descriptionKey: 'components.list_item.anatomy.title',
                descriptionFallback: 'Primary text. Truncates with ellipsis (white-space: nowrap). <code>v-if="hasTitle"</code>.'
            },
            {
                num: 5,
                cls: '.origam-list-item__subtitle',
                descriptionKey: 'components.list_item.anatomy.subtitle',
                descriptionFallback: 'Secondary text. Uses <code>-webkit-box</code> clamp via the <code>lines</code> prop. <code>v-if="hasSubtitle"</code>.'
            },
            {
                num: 6,
                cls: '.origam-list-item__append',
                descriptionKey: 'components.list_item.anatomy.append',
                descriptionFallback: 'Trailing icon/avatar zone. <code>grid-area: append</code>. Renders <code>appendIcon</code>, <code>appendAvatar</code>, or the <code>#append</code> slot. <code>v-if="hasAppend"</code>.'
            },
            {
                num: 7,
                cls: '.origam-list-item__overlay',
                descriptionKey: 'components.list_item.anatomy.overlay',
                descriptionFallback: 'Absolute interaction scrim. <code>opacity: 0</code> at rest → 0.08 on hover/focus → 0.12 when active. Only rendered when the item is clickable or active.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-list-item---min-height',
            defaultValue: '40px',
            descriptionKey: 'components.list_item.css_vars.min_height',
            descriptionFallback: 'Minimum row height. Adjusted by the density modifier.'
        },
        {
            name: '--origam-list-item---padding-block-start',
            defaultValue: '8px',
            descriptionKey: 'components.list_item.css_vars.padding_block_start',
            descriptionFallback: 'Block-start padding. Added to the density offset.'
        },
        {
            name: '--origam-list-item---padding-inline-start',
            defaultValue: '16px',
            descriptionKey: 'components.list_item.css_vars.padding_inline_start',
            descriptionFallback: 'Inline-start padding. Added to the indent-padding and density offsets.'
        },
        {
            name: '--origam-list-item---border-radius',
            defaultValue: '0px',
            descriptionKey: 'components.list_item.css_vars.border_radius',
            descriptionFallback: 'Item border radius. Overridden by the rounded prop.'
        },
        {
            name: '--origam-list-item---cursor',
            defaultValue: 'pointer',
            descriptionKey: 'components.list_item.css_vars.cursor',
            descriptionFallback: 'Cursor style when the item is in link/clickable mode.'
        },
        {
            name: '--origam-list-item---opacity',
            defaultValue: '0.6',
            descriptionKey: 'components.list_item.css_vars.opacity',
            descriptionFallback: 'Opacity applied when the item is disabled.'
        },
        {
            name: '--origam-list-item__overlay---opacity',
            defaultValue: '0',
            descriptionKey: 'components.list_item.css_vars.overlay_opacity',
            descriptionFallback: 'Overlay opacity. Animates to 0.08 on hover/focus and 0.12 when active.'
        },
        {
            name: '--origam-list-item__title---font-size',
            defaultValue: '1rem',
            descriptionKey: 'components.list_item.css_vars.title_font_size',
            descriptionFallback: 'Title font size. Overridden to 0.8125rem in nav mode.'
        },
        {
            name: '--origam-list-item__subtitle---font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.list_item.css_vars.subtitle_font_size',
            descriptionFallback: 'Subtitle font size.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'isGroupActivator',
            type: 'boolean',
            descriptionKey: 'components.list_item.exposed.is_group_activator',
            descriptionFallback: 'True when this item acts as the activator of a ListGroup. Prevents selection toggling on click.'
        },
        {
            name: 'isSelected',
            type: 'Ref<boolean>',
            descriptionKey: 'components.list_item.exposed.is_selected',
            descriptionFallback: 'Reactive selection state from useNestedItem. True when the item value is selected in the parent list.'
        },
        {
            name: 'list',
            type: 'ListProvide | null',
            descriptionKey: 'components.list_item.exposed.list',
            descriptionFallback: 'Parent list context injected by OrigamList. Null when the item is used standalone.'
        },
        {
            name: 'select',
            type: '(value: boolean, event?: Event) => void',
            descriptionKey: 'components.list_item.exposed.select',
            descriptionFallback: 'Programmatically select or deselect this item within the parent list.'
        },
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.list_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.list_item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed listItemStyles.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.list_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.list_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.list_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.list_item.a11y.key_activate',
                actionFallback: 'Activates a clickable item (fires click event, navigates, or toggles selection).'
            },
            {
                key: 'Tab',
                actionKey: 'components.list_item.a11y.key_tab',
                actionFallback: 'Moves focus. tabindex=0 for standalone clickable items; tabindex=-2 inside a list group.'
            }
        ],
        notes: [
            {
                noteKey: 'components.list_item.a11y.disabled_note',
                noteFallback: 'When disabled=true and rendered as an anchor, aria-disabled="true" is set instead of the disabled attribute. Pointer events are removed via CSS.'
            },
            {
                noteKey: 'components.list_item.a11y.link_note',
                noteFallback: 'When href or to is set, the item renders as a native <a> element — full keyboard navigation and focus management are inherited from the browser.'
            },
            {
                noteKey: 'components.list_item.a11y.selection_note',
                noteFallback: 'When inside a selectable list (value prop set), selection state is driven by useNestedItem. The active CSS class provides a visual selected indicator.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/list.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Tokens are namespaced under list.item.* in the source JSON.',
        excerpt: [
            {
                tokenPath: 'list.item.min-height',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.list_item.tokens.min_height',
                descriptionFallback: 'Default minimum row height.'
            },
            {
                tokenPath: 'list.item.padding-inline-start',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.list_item.tokens.padding_inline_start',
                descriptionFallback: 'Default inline-start padding (16px). Added to list indent-padding and density.'
            },
            {
                tokenPath: 'list.item.border-radius',
                value: '{radius.none}',
                type: 'dimension',
                descriptionKey: 'components.list_item.tokens.border_radius',
                descriptionFallback: 'Item border radius. Override with the rounded prop.'
            },
            {
                tokenPath: 'list.item.overlay.background-color',
                value: '{color.overlay.scrim}',
                type: 'color',
                descriptionKey: 'components.list_item.tokens.overlay_background_color',
                descriptionFallback: 'Overlay tint color for hover/active states.'
            },
            {
                tokenPath: 'list.item.title.font-size',
                value: '{font.size.md}',
                type: 'dimension',
                descriptionKey: 'components.list_item.tokens.title_font_size',
                descriptionFallback: 'Title font size (1rem).'
            },
            {
                tokenPath: 'list.item.subtitle.font-size',
                value: '{font.size.sm}',
                type: 'dimension',
                descriptionKey: 'components.list_item.tokens.subtitle_font_size',
                descriptionFallback: 'Subtitle font size (0.875rem).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.list_item.playground.title',
                labelFallback: 'Title',
                defaultValue: 'List item'
            },
            {
                prop: 'subtitle',
                kind: 'text',
                labelKey: 'components.list_item.playground.subtitle',
                labelFallback: 'Subtitle',
                defaultValue: ''
            },
            {
                prop: 'prependIcon',
                kind: 'select',
                labelKey: 'components.list_item.playground.prepend_icon',
                labelFallback: 'Prepend icon',
                defaultValue: 'mdi-inbox',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-inbox', value: 'mdi-inbox' },
                    { label: 'mdi-account', value: 'mdi-account' },
                    { label: 'mdi-star', value: 'mdi-star' },
                    { label: 'mdi-home', value: 'mdi-home' }
                ]
            },
            {
                prop: 'lines',
                kind: 'select',
                labelKey: 'components.list_item.playground.lines',
                labelFallback: 'Lines',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'one-line', value: 'one-line' },
                    { label: 'two-line', value: 'two-line' },
                    { label: 'three-line', value: 'three-line' }
                ]
            },
            {
                prop: 'active',
                kind: 'switch',
                labelKey: 'components.list_item.playground.active',
                labelFallback: 'Active',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.list_item.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
