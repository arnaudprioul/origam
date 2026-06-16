/**
 * /components/breadcrumb — full documentation data for OrigamBreadcrumb.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Breadcrumb/breadcrumb.interface.ts  (props)
 *   - packages/ds/src/components/Breadcrumb/OrigamBreadcrumb.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/breadcrumb.json                   (CSS tokens)
 *
 * Family: OrigamBreadcrumb + OrigamBreadcrumbItem + OrigamBreadcrumbDivider
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

export const BREADCRUMB_DOC: IComponentDoc = {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    tag: 'origam-breadcrumb',
    icon: 'mdi-dots-horizontal',
    category: 'Navigation',
    descriptionKey: 'components.catalog.breadcrumb.description',
    descriptionFallback: 'Hierarchical navigation trail rendered as a <nav> landmark with an ordered list of items and configurable dividers.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-breadcrumb--design',
    docUrl: 'http://localhost:4000/components/Breadcrumb/OrigamBreadcrumb',

    family: [
        {
            slug: 'breadcrumb-item',
            name: 'BreadcrumbItem',
            descriptionKey: 'components.catalog.breadcrumb_item.description',
            descriptionFallback: 'Individual breadcrumb link or span. The last item is automatically disabled and aria-current="page".'
        },
        {
            slug: 'breadcrumb-divider',
            name: 'BreadcrumbDivider',
            descriptionKey: 'components.catalog.breadcrumb_divider.description',
            descriptionFallback: 'Separator rendered between items. Defaults to a "/" character; accepts any text or icon.'
        }
    ],

    related: [
        { slug: 'tabs', name: 'Tabs', kind: 'component', descriptionFallback: 'Alternative horizontal navigation pattern.', descriptionKey: 'components.catalog.tabs.description' }
    ],

    props: [
        {
            name: 'items',
            type: { label: 'Array<TBreadcrumbItem>', slug: 'breadcrumb-item', kind: 'type' },
            defaultValue: '[]',
            descriptionKey: 'components.breadcrumb.props.items.description',
            descriptionFallback: 'Breadcrumb trail items. Accepts strings (converted to { title }) or full IBreadcrumbItemProps objects. The last item is automatically disabled and active.'
        },
        {
            name: 'divider',
            type: { label: 'string | TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'/'",
            descriptionKey: 'components.breadcrumb.props.divider.description',
            descriptionFallback: 'Divider character or MDI icon displayed between items. Propagated to OrigamBreadcrumbDivider via slotDefaults.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.breadcrumb.props.disabled.description',
            descriptionFallback: 'Disables all breadcrumb items. Propagated via OrigamDefaultsProvider.'
        },
        {
            name: 'activeClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.breadcrumb.props.active_class.description',
            descriptionFallback: 'CSS class applied to the active (last) breadcrumb item.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'nav'",
            descriptionKey: 'components.breadcrumb.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <nav> for correct landmark semantics.'
        },
        { name: 'color', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.breadcrumb.props.color.description', descriptionFallback: 'Intent or custom foreground color propagated to all items.' },
        { name: 'bgColor', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.breadcrumb.props.bg_color.description', descriptionFallback: 'Background color of the breadcrumb container.' },
        { name: 'density', type: { label: 'TDensity', slug: 'density', kind: 'type' }, defaultValue: "'default'", descriptionKey: 'components.breadcrumb.props.density.description', descriptionFallback: 'Density modifier affecting padding and item sizing.' },
        { name: 'rounded', type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.breadcrumb.props.rounded.description', descriptionFallback: 'Border-radius token or boolean for the container.' },
        { name: 'elevation', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.breadcrumb.props.elevation.description', descriptionFallback: 'Box-shadow elevation token.' },
        { name: 'border', type: { label: 'boolean | string', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.breadcrumb.props.border.description', descriptionFallback: 'Applies a border to the breadcrumb container.' },
        { name: 'padding', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.breadcrumb.props.padding.description', descriptionFallback: 'Custom padding override.' },
        { name: 'margin', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.breadcrumb.props.margin.description', descriptionFallback: 'Custom margin override.' }
    ],

    emits: [],

    slots: [
        { slot: 'default', slotProps: '—', descriptionKey: 'components.breadcrumb.slots.default.description', descriptionFallback: 'Full override of the breadcrumb content. When present, items prop and the default <ol> are not rendered.' },
        { slot: 'item', slotProps: '{ item, index }', descriptionKey: 'components.breadcrumb.slots.item.description', descriptionFallback: 'Override every breadcrumb item. Receives the normalized item object and its index.' },
        { slot: 'item.{index}', slotProps: '{ item, index }', descriptionKey: 'components.breadcrumb.slots.item_index.description', descriptionFallback: 'Override a specific item by index.' },
        { slot: 'divider', slotProps: '{ divider }', descriptionKey: 'components.breadcrumb.slots.divider.description', descriptionFallback: 'Override every divider. Receives the current divider string/icon.' },
        { slot: 'divider.{index}', slotProps: '{ divider }', descriptionKey: 'components.breadcrumb.slots.divider_index.description', descriptionFallback: 'Override a specific divider by index.' },
        { slot: 'item.title', slotProps: '—', descriptionKey: 'components.breadcrumb.slots.item_title.description', descriptionFallback: 'Override the title content inside each OrigamBreadcrumbItem.' }
    ],

    examples: [
        {
            titleKey: 'components.breadcrumb.examples.basic.title',
            titleFallback: 'Basic breadcrumb',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb
    :items="['Home', 'Components', 'Breadcrumb']"
    divider="/"
  />
</template>`
        },
        {
            titleKey: 'components.breadcrumb.examples.with_links.title',
            titleFallback: 'With router links',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb
    :items="[
      { title: 'Home', to: '/' },
      { title: 'Components', to: '/components' },
      { title: 'Breadcrumb' }
    ]"
    color="primary"
    divider="mdi-chevron-right"
  />
</template>`
        },
        {
            titleKey: 'components.breadcrumb.examples.custom_divider.title',
            titleFallback: 'Custom divider slot',
            lang: 'vue',
            code: `<template>
  <origam-breadcrumb :items="items">
    <template #divider>
      <origam-icon icon="mdi-chevron-right" size="small" />
    </template>
  </origam-breadcrumb>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { divider: '/' }, slotContent: undefined },
        { label: 'icon divider', props: { divider: 'mdi-chevron-right', color: 'primary' }, slotContent: undefined },
        { label: 'with color', props: { divider: '/', color: 'primary', bgColor: 'primary' }, slotContent: undefined }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-breadcrumb',
        svgViewBox: '0 0 700 100',
        svgTitle: 'Anatomy of OrigamBreadcrumb',
        svgDesc: 'Schematic of the Breadcrumb component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="100" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="10" y="20" width="680" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="30" width="80" height="40" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="60" y="55" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Home</text>
  <rect x="110" y="40" width="20" height="20" rx="2" fill="var(--origam-color__surface---sunken, rgba(168,85,247,0.08))"/>
  <text x="120" y="55" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">/</text>
  <rect x="140" y="30" width="120" height="40" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="200" y="55" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Components</text>
  <rect x="270" y="40" width="20" height="20" rx="2" fill="var(--origam-color__surface---sunken, rgba(168,85,247,0.08))"/>
  <text x="280" y="55" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">/</text>
  <rect x="300" y="30" width="120" height="40" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="360" y="55" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Breadcrumb</text>
  <circle cx="12" cy="22" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="12" y="26" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="22" cy="32" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="22" y="36" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="112" cy="42" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="112" y="46" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="302" cy="32" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="302" y="36" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-breadcrumb&gt;</code> — root <code>&lt;nav&gt;</code> ①, ordered list ②, divider ③ and individual items ④. The last item is visually dimmed and aria-current="page".',
        legend: [
            { num: 1, cls: '.origam-breadcrumb', descriptionKey: 'components.breadcrumb.anatomy.root', descriptionFallback: 'Root <nav> element with aria-label="Breadcrumb" (from useLocale). Carries color, border, rounded and density classes.' },
            { num: 2, cls: '.origam-breadcrumb__items', descriptionKey: 'components.breadcrumb.anatomy.items', descriptionFallback: '<ol> flex row containing all item+divider pairs. list-style: none; margin-block: 0.' },
            { num: 3, cls: '.origam-breadcrumb__item', descriptionKey: 'components.breadcrumb.anatomy.item', descriptionFallback: '<li> wrapper for one item + its trailing divider. display: flex; align-items: center.' },
            { num: 4, cls: '.origam-breadcrumb__divider', descriptionKey: 'components.breadcrumb.anatomy.divider', descriptionFallback: 'OrigamBreadcrumbDivider separator. aria-hidden. Not rendered after the last item.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<nav class="origam-breadcrumb" aria-label="Breadcrumb">
  <ol class="origam-breadcrumb__items">
    <li class="origam-breadcrumb__item">
      <origam-breadcrumb-item :to="'/'">Home</origam-breadcrumb-item>
      <origam-breadcrumb-divider divider="/" />
    </li>
    <li class="origam-breadcrumb__item">
      <origam-breadcrumb-item :to="'/components'">Components</origam-breadcrumb-item>
      <origam-breadcrumb-divider divider="/" />
    </li>
    <li class="origam-breadcrumb__item">
      <!-- Last item: disabled + aria-current="page" set automatically -->
      <origam-breadcrumb-item :disabled="true" :is-active="true">Breadcrumb</origam-breadcrumb-item>
    </li>
  </ol>
</nav>`,
        rootClass: 'origam-breadcrumb',
        classes: [
            { cls: 'origam-breadcrumb', descriptionKey: 'components.breadcrumb.anatomy.root_class', descriptionFallback: 'Root navigation element.' },
            { cls: 'origam-breadcrumb__items', descriptionKey: 'components.breadcrumb.anatomy.items_class', descriptionFallback: '<ol> flex row.' },
            { cls: 'origam-breadcrumb__item', descriptionKey: 'components.breadcrumb.anatomy.item_class', descriptionFallback: '<li> item + divider wrapper.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        { name: '--origam-breadcrumb---color', defaultValue: '{color.text.primary}', descriptionKey: 'components.breadcrumb.css_vars.color', descriptionFallback: 'Default text color of the breadcrumb container.' },
        { name: '--origam-breadcrumb---background', defaultValue: 'transparent', descriptionKey: 'components.breadcrumb.css_vars.background', descriptionFallback: 'Container background (transparent by default).' },
        { name: '--origam-breadcrumb---padding-block-start', defaultValue: '{space.2}', descriptionKey: 'components.breadcrumb.css_vars.padding_block_start', descriptionFallback: 'Block-start padding (density-adjusted at render time).' },
        { name: '--origam-breadcrumb---padding-inline-start', defaultValue: '{space.2}', descriptionKey: 'components.breadcrumb.css_vars.padding_inline_start', descriptionFallback: 'Inline-start padding.' },
        { name: '--origam-breadcrumb---border-radius', defaultValue: '0px', descriptionKey: 'components.breadcrumb.css_vars.border_radius', descriptionFallback: 'Container border-radius. Overridden by rounded prop.' },
        { name: '--origam-breadcrumb---box-shadow', defaultValue: '{shadow.none}', descriptionKey: 'components.breadcrumb.css_vars.box_shadow', descriptionFallback: 'Container box-shadow. Overridden by elevation.' },
        { name: '--origam-breadcrumb-item---color', defaultValue: '{color.text.primary}', descriptionKey: 'components.breadcrumb.css_vars.item_color', descriptionFallback: 'Default item text color.' },
        { name: '--origam-breadcrumb-item---hover-color', defaultValue: '{color.action.primary.bg}', descriptionKey: 'components.breadcrumb.css_vars.item_hover_color', descriptionFallback: 'Item color on hover (link affordance).' },
        { name: '--origam-breadcrumb-item---active-color', defaultValue: '{color.text.secondary}', descriptionKey: 'components.breadcrumb.css_vars.item_active_color', descriptionFallback: 'Color of the current-page item (last crumb).' },
        { name: '--origam-breadcrumb-divider---color', defaultValue: '{color.text.secondary}', descriptionKey: 'components.breadcrumb.css_vars.divider_color', descriptionFallback: 'Divider glyph or icon color.' },
        { name: '--origam-breadcrumb-divider---padding-inline', defaultValue: '{space.2}', descriptionKey: 'components.breadcrumb.css_vars.divider_padding', descriptionFallback: 'Horizontal padding around the divider (breathing room between crumbs).' }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'filterProps', type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>', descriptionKey: 'components.breadcrumb.exposed.filter_props', descriptionFallback: 'Utility to forward a filtered subset of props to child components.' },
        { name: 'css', type: 'Ref<string>', descriptionKey: 'components.breadcrumb.exposed.css', descriptionFallback: 'Reactive CSS string generated by useStyle.' },
        { name: 'id', type: 'string', descriptionKey: 'components.breadcrumb.exposed.id', descriptionFallback: 'Unique style-sheet ID for this instance.' },
        { name: 'load', type: '() => void', descriptionKey: 'components.breadcrumb.exposed.load', descriptionFallback: 'Injects the computed style sheet.' },
        { name: 'unload', type: '() => void', descriptionKey: 'components.breadcrumb.exposed.unload', descriptionFallback: 'Removes the injected style sheet.' },
        { name: 'isLoaded', type: 'Ref<boolean>', descriptionKey: 'components.breadcrumb.exposed.is_loaded', descriptionFallback: 'True once the style sheet has been injected.' }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['navigation', 'list', 'listitem'],
        keyboard: [
            { key: 'Tab', actionKey: 'components.breadcrumb.a11y.key_tab', actionFallback: 'Moves focus through each breadcrumb item link.' },
            { key: 'Enter', actionKey: 'components.breadcrumb.a11y.key_enter', actionFallback: 'Follows the link of the focused breadcrumb item.' }
        ],
        notes: [
            { noteKey: 'components.breadcrumb.a11y.aria_label', noteFallback: 'The root <nav> receives aria-label="Breadcrumb" from the useLocale translation (key: origam.breadcrumb.ariaLabel).' },
            { noteKey: 'components.breadcrumb.a11y.aria_current', noteFallback: 'The last item is automatically set to aria-current="page" via the isActive prop on OrigamBreadcrumbItem.' },
            { noteKey: 'components.breadcrumb.a11y.divider_hidden', noteFallback: 'OrigamBreadcrumbDivider is aria-hidden — the separators are purely presentational and not read by screen readers.' },
            { noteKey: 'components.breadcrumb.a11y.v_contrast', noteFallback: 'The v-contrast directive is applied to the root for auto contrast when a custom color is set.' },
            { noteKey: 'components.breadcrumb.a11y.disabled_opacity', noteFallback: 'Disabled items receive opacity-50 and pointer-events: none without the native disabled attribute (which does not apply to anchors).' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/breadcrumb.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'breadcrumb.color', value: '{color.text.primary}', type: 'color', descriptionKey: 'components.breadcrumb.tokens.color', descriptionFallback: 'Container text color.' },
            { tokenPath: 'breadcrumb.background', value: 'transparent', type: 'color', descriptionKey: 'components.breadcrumb.tokens.background', descriptionFallback: 'Container background.' },
            { tokenPath: 'breadcrumb.item.hover-color', value: '{color.action.primary.bg}', type: 'color', descriptionKey: 'components.breadcrumb.tokens.item_hover_color', descriptionFallback: 'Item color on hover.' },
            { tokenPath: 'breadcrumb.item.active-color', value: '{color.text.secondary}', type: 'color', descriptionKey: 'components.breadcrumb.tokens.item_active_color', descriptionFallback: 'Current-page item color.' },
            { tokenPath: 'breadcrumb.divider.color', value: '{color.text.secondary}', type: 'color', descriptionKey: 'components.breadcrumb.tokens.divider_color', descriptionFallback: 'Divider color.' },
            { tokenPath: 'breadcrumb.divider.padding-inline', value: '{space.2}', type: 'dimension', descriptionKey: 'components.breadcrumb.tokens.divider_padding', descriptionFallback: 'Divider horizontal padding.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            { prop: 'divider', kind: 'select', labelKey: 'components.breadcrumb.playground.divider', labelFallback: 'Divider', defaultValue: '/', options: [{ label: '/', value: '/' }, { label: '>', value: '>' }, { label: 'mdi-chevron-right', value: 'mdi-chevron-right' }, { label: 'mdi-arrow-right', value: 'mdi-arrow-right' }] },
            { prop: 'color', kind: 'select', labelKey: 'components.breadcrumb.playground.color', labelFallback: 'Color', defaultValue: '', options: [{ label: '(none)', value: '' }, { label: 'primary', value: 'primary' }, { label: 'secondary', value: 'secondary' }] },
            { prop: 'density', kind: 'select', labelKey: 'components.breadcrumb.playground.density', labelFallback: 'Density', defaultValue: 'default', options: [{ label: 'comfortable', value: 'comfortable' }, { label: 'default', value: 'default' }, { label: 'compact', value: 'compact' }] },
            { prop: 'disabled', kind: 'switch', labelKey: 'components.breadcrumb.playground.disabled', labelFallback: 'Disabled (all)', defaultValue: false },
            { prop: 'elevation', kind: 'select', labelKey: 'components.breadcrumb.playground.elevation', labelFallback: 'Elevation', defaultValue: '', options: [{ label: '(none)', value: '' }, { label: 'elevated', value: 'elevated' }] }
        ]
    } satisfies IComponentPlayground
}
