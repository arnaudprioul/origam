/**
 * /components/breadcrumb-item — full documentation data for OrigamBreadcrumbItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Breadcrumb/breadcrumb-item.interface.ts  (props / emits)
 *   - packages/ds/src/components/Breadcrumb/OrigamBreadcrumbItem.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/breadcrumb.json                        (CSS tokens)
 *
 * Sub-component of: OrigamBreadcrumb (parentSlug: 'breadcrumb')
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

export const BREADCRUMB_ITEM_DOC: IComponentDoc = {
    slug: 'breadcrumb-item',
    name: 'BreadcrumbItem',
    tag: 'origam-breadcrumb-item',
    icon: 'mdi-link-variant',
    category: 'Navigation',
    descriptionKey: 'components.catalog.breadcrumb_item.description',
    descriptionFallback: 'Individual breadcrumb link or span within an OrigamBreadcrumb trail. Supports router links, prepend/append icons, hover and active states.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-breadcrumb--design',
    docUrl: 'http://localhost:4000/components/Breadcrumb/OrigamBreadcrumb',
    parentSlug: 'breadcrumb',

    family: [
        {
            slug: 'breadcrumb',
            name: 'Breadcrumb',
            descriptionKey: 'components.catalog.breadcrumb.description',
            descriptionFallback: 'Hierarchical navigation trail rendered as a <nav> landmark.'
        },
        {
            slug: 'breadcrumb-divider',
            name: 'BreadcrumbDivider',
            descriptionKey: 'components.catalog.breadcrumb_divider.description',
            descriptionFallback: 'Separator rendered between breadcrumb items.'
        }
    ],

    related: [
        { slug: 'breadcrumb', name: 'Breadcrumb', kind: 'component', descriptionFallback: 'Parent that renders BreadcrumbItem inside an ordered list.', descriptionKey: 'components.catalog.breadcrumb.description' }
    ],

    props: [
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.title.description',
            descriptionFallback: 'Display text for the breadcrumb item. Rendered inside a <span> within the default slot when not overridden.',
            required: true
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.breadcrumb_item.props.disabled.description',
            descriptionFallback: 'Disables the item: sets opacity and pointer-events: none. The last item in an OrigamBreadcrumb trail is automatically disabled.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'span'",
            descriptionKey: 'components.breadcrumb_item.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Resolves to <a> automatically when href or to is provided (via useLink).'
        },
        {
            name: 'href',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.href.description',
            descriptionFallback: 'URL for the breadcrumb link. Causes the root element to render as <a>.'
        },
        {
            name: 'to',
            type: { label: 'string | RouteLocationRaw', slug: 'route-location-raw', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.to.description',
            descriptionFallback: 'Vue Router destination. Automatically activates router-link behaviour.'
        },
        {
            name: 'target',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.target.description',
            descriptionFallback: 'Anchor target attribute, e.g. "_blank".'
        },
        {
            name: 'rel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.rel.description',
            descriptionFallback: 'Anchor rel attribute, e.g. "noopener noreferrer".'
        },
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.breadcrumb_item.props.active.description',
            descriptionFallback: 'Forces the item into its active state. Also set automatically by useLink when the route matches.'
        },
        {
            name: 'activeClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.active_class.description',
            descriptionFallback: 'Additional CSS class applied when the item is active (current page).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.color.description',
            descriptionFallback: 'Foreground color. Accepts semantic intents or CSS colors.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.bg_color.description',
            descriptionFallback: 'Background color of the item.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.breadcrumb_item.props.density.description',
            descriptionFallback: 'Density modifier adjusting padding. Propagated from parent OrigamBreadcrumb.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean for the item element.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.breadcrumb_item.props.border.description',
            descriptionFallback: 'Applies a border to the item element.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.prepend_icon.description',
            descriptionFallback: 'MDI icon displayed before the title text.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.append_icon.description',
            descriptionFallback: 'MDI icon displayed after the title text.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar displayed in the prepend slot.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb_item.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar in the append slot.'
        }
    ],

    emits: [
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.breadcrumb_item.emits.click_prepend.description',
            descriptionFallback: 'Fired when the user clicks the prepend slot area.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.breadcrumb_item.emits.click_append.description',
            descriptionFallback: 'Fired when the user clicks the append slot area.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.breadcrumb_item.slots.default.description',
            descriptionFallback: 'Main content of the item. Defaults to rendering <span>{{ title }}</span>.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.breadcrumb_item.slots.prepend.description',
            descriptionFallback: 'Custom prepend content. Replaces the prependIcon / prependAvatar area.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.breadcrumb_item.slots.append.description',
            descriptionFallback: 'Custom append content. Replaces the appendIcon / appendAvatar area.'
        }
    ],

    examples: [
        {
            titleKey: 'components.breadcrumb_item.examples.basic.title',
            titleFallback: 'Basic item',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb-item title="Home" href="/" />
</template>`
        },
        {
            titleKey: 'components.breadcrumb_item.examples.active.title',
            titleFallback: 'Active (current page)',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb-item
    title="Breadcrumb"
    :active="true"
    :disabled="true"
    aria-current="page"
  />
</template>`
        },
        {
            titleKey: 'components.breadcrumb_item.examples.with_icons.title',
            titleFallback: 'With icons',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb-item
    title="Components"
    prepend-icon="mdi-puzzle-outline"
    href="/components"
    color="primary"
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { title: 'Home', href: '/' } },
        { label: 'active', props: { title: 'Breadcrumb', active: true, disabled: true } },
        { label: 'with icon', props: { title: 'Components', prependIcon: 'mdi-puzzle-outline', color: 'primary' } },
        { label: 'disabled', props: { title: 'Disabled', disabled: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-breadcrumb-item',
        svgViewBox: '0 0 600 140',
        svgTitle: 'Anatomy of OrigamBreadcrumbItem',
        svgDesc: 'Schematic of the BreadcrumbItem component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="600" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="50" y="30" width="500" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="70" y="48" width="50" height="44" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="95" y="74" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <rect x="130" y="48" width="260" height="44" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="260" y="74" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Home</text>
  <rect x="400" y="48" width="50" height="44" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="425" y="74" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <circle cx="58" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="58" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="78" cy="50" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="78" y="54.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="138" cy="50" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="138" y="54.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="408" cy="50" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="408" y="54.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <line x1="68" y1="36" x2="110" y2="14" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="114" y="12" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-breadcrumb-item</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-breadcrumb-item&gt;</code> — root element ① (<code>&lt;span&gt;</code> or <code>&lt;a&gt;</code>), prepend slot ②, content area ③, append slot ④. Active items receive <code>aria-current="page"</code>.',
        legend: [
            {
                num: 1,
                cls: '.origam-breadcrumb-item',
                descriptionKey: 'components.breadcrumb_item.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;span&gt;</code> or <code>&lt;a&gt;</code> via useLink. Carries color, border, rounded and density classes. Modifier <code>--link</code> when href is set; <code>--disabled</code> when disabled.'
            },
            {
                num: 2,
                cls: '.origam-breadcrumbs__prepend',
                descriptionKey: 'components.breadcrumb_item.anatomy.prepend',
                descriptionFallback: 'Prepend slot host. Inline-flex container rendering <code>prependAvatar</code>, <code>prependIcon</code> or the <code>#prepend</code> slot. Rendered only when <code>hasPrepend</code> is true.'
            },
            {
                num: 3,
                cls: '(default slot)',
                descriptionKey: 'components.breadcrumb_item.anatomy.content',
                descriptionFallback: 'Content area. Renders <code>&lt;span&gt;{{ title }}&lt;/span&gt;</code> by default. Override with the <code>#default</code> slot.'
            },
            {
                num: 4,
                cls: '.origam-breadcrumbs__append',
                descriptionKey: 'components.breadcrumb_item.anatomy.append',
                descriptionFallback: 'Append slot host. Inline-flex container rendering <code>appendAvatar</code>, <code>appendIcon</code> or the <code>#append</code> slot. Rendered only when <code>hasAppend</code> is true.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: resolves to <span> or <a> via useLink -->
<component :is="link.tag" class="origam-breadcrumb-item"
  :aria-current="isActive ? 'page' : undefined">
  <!-- prepend area (hasPrepend) -->
  <span class="origam-breadcrumbs__prepend">
    <slot name="prepend">
      <origam-avatar v-if="prependAvatar" :image="prependAvatar" />
      <origam-icon v-if="prependIcon" :icon="prependIcon" />
    </slot>
  </span>
  <!-- default slot / title text -->
  <slot name="default">
    <span>{{ title }}</span>
  </slot>
  <!-- append area (hasAppend) -->
  <span class="origam-breadcrumbs__append">
    <slot name="append">
      <origam-avatar v-if="appendAvatar" :image="appendAvatar" />
      <origam-icon v-if="appendIcon" :icon="appendIcon" />
    </slot>
  </span>
</component>`,
        classes: [
            {
                cls: 'origam-breadcrumb-item',
                descriptionKey: 'components.breadcrumb_item.anatomy.root',
                descriptionFallback: 'Root element. inline-flex, align-items: center. Text-decoration controlled via CSS var.'
            },
            {
                cls: 'origam-breadcrumb-item--link',
                descriptionKey: 'components.breadcrumb_item.anatomy.link_modifier',
                descriptionFallback: 'Applied when the item has an href (link affordance styling).'
            },
            {
                cls: 'origam-breadcrumb-item--disabled',
                descriptionKey: 'components.breadcrumb_item.anatomy.disabled_modifier',
                descriptionFallback: 'Applied when disabled=true. Sets opacity and pointer-events: none.'
            },
            {
                cls: 'origam-breadcrumbs__prepend',
                descriptionKey: 'components.breadcrumb_item.anatomy.prepend',
                descriptionFallback: 'Prepend slot host — inline-flex container for icon/avatar before the title.'
            },
            {
                cls: 'origam-breadcrumbs__append',
                descriptionKey: 'components.breadcrumb_item.anatomy.append',
                descriptionFallback: 'Append slot host — inline-flex container for icon/avatar after the title.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-breadcrumb-item---color',
            defaultValue: 'var(--origam-breadcrumb-item---color-token, inherit)',
            descriptionKey: 'components.breadcrumb_item.css_vars.color',
            descriptionFallback: 'Item foreground color. Falls back to inherit.'
        },
        {
            name: '--origam-breadcrumb-item---background',
            defaultValue: 'transparent',
            descriptionKey: 'components.breadcrumb_item.css_vars.background',
            descriptionFallback: 'Item background color (transparent by default).'
        },
        {
            name: '--origam-breadcrumb-item---opacity',
            defaultValue: '1',
            descriptionKey: 'components.breadcrumb_item.css_vars.opacity',
            descriptionFallback: 'Item opacity. Set to --origam-breadcrumb-item---opacity-disabled (0.5) when disabled.'
        },
        {
            name: '--origam-breadcrumb-item---text-decoration',
            defaultValue: 'none',
            descriptionKey: 'components.breadcrumb_item.css_vars.text_decoration',
            descriptionFallback: 'Text decoration of the item (none by default; can be set to underline for links).'
        },
        {
            name: '--origam-breadcrumb-item---padding-block-start',
            defaultValue: '8px',
            descriptionKey: 'components.breadcrumb_item.css_vars.padding_block_start',
            descriptionFallback: 'Block-start padding (density-adjusted at render time).'
        },
        {
            name: '--origam-breadcrumb-item---padding-inline-start',
            defaultValue: '8px',
            descriptionKey: 'components.breadcrumb_item.css_vars.padding_inline_start',
            descriptionFallback: 'Inline-start padding (density-adjusted at render time).'
        },
        {
            name: '--origam-breadcrumb-item---density',
            defaultValue: '0px',
            descriptionKey: 'components.breadcrumb_item.css_vars.density',
            descriptionFallback: 'Density offset applied to padding. comfortable: −8px, default: 0px, compact: +8px.'
        },
        {
            name: '--origam-breadcrumb-item---border-radius',
            defaultValue: '0px',
            descriptionKey: 'components.breadcrumb_item.css_vars.border_radius',
            descriptionFallback: 'Item border-radius. Overridden by the rounded prop.'
        },
        {
            name: '--origam-breadcrumb-item---transition',
            defaultValue: 'transform, color 0.2s, 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
            descriptionKey: 'components.breadcrumb_item.css_vars.transition',
            descriptionFallback: 'Transition applied to transform and color properties.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.breadcrumb_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.breadcrumb_item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed breadcrumbItemStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.breadcrumb_item.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.breadcrumb_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.breadcrumb_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.breadcrumb_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.breadcrumb_item.a11y.key_tab',
                actionFallback: 'Moves focus to the breadcrumb item when it is a link.'
            },
            {
                key: 'Enter',
                actionKey: 'components.breadcrumb_item.a11y.key_enter',
                actionFallback: 'Follows the link (href / to) of the focused item.'
            }
        ],
        notes: [
            {
                noteKey: 'components.breadcrumb_item.a11y.aria_current',
                noteFallback: 'aria-current="page" is set on the active item (isActive = true) to indicate the current page to screen readers.'
            },
            {
                noteKey: 'components.breadcrumb_item.a11y.disabled_opacity',
                noteFallback: 'Disabled items use opacity and pointer-events: none rather than the native disabled attribute (which does not work on anchors).'
            },
            {
                noteKey: 'components.breadcrumb_item.a11y.v_contrast',
                noteFallback: 'The v-contrast directive is applied to the root element for automatic contrast when a custom color is set.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/breadcrumb.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'breadcrumb.item.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.breadcrumb_item.tokens.color',
                descriptionFallback: 'Default item text color.'
            },
            {
                tokenPath: 'breadcrumb.item.hover-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.breadcrumb_item.tokens.hover_color',
                descriptionFallback: 'Item color on hover (link affordance).'
            },
            {
                tokenPath: 'breadcrumb.item.active-color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.breadcrumb_item.tokens.active_color',
                descriptionFallback: 'Color of the current-page item (last crumb, disabled state).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.breadcrumb_item.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Home'
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.breadcrumb_item.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.breadcrumb_item.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'prependIcon',
                kind: 'select',
                labelKey: 'components.breadcrumb_item.playground.prepend_icon',
                labelFallback: 'Prepend icon',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-home', value: 'mdi-home' },
                    { label: 'mdi-puzzle-outline', value: 'mdi-puzzle-outline' },
                    { label: 'mdi-folder', value: 'mdi-folder' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.breadcrumb_item.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'default', value: 'default' },
                    { label: 'compact', value: 'compact' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
