/**
 * /components/bottom-nav — full documentation data for OrigamBottomNav.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/BottomNav/bottom-nav.interface.ts  (props + emits)
 *   - packages/ds/src/components/BottomNav/OrigamBottomNav.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/bottom-nav.json                  (CSS tokens — key: bottom-bar)
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

export const BOTTOM_NAV_DOC: IComponentDoc = {
    slug: 'bottom-nav',
    name: 'BottomNav',
    tag: 'origam-bottom-nav',
    icon: 'mdi-dock-bottom',
    category: 'Navigation',
    descriptionKey: 'components.catalog.bottom_nav.description',
    descriptionFallback: 'Mobile-first bottom navigation bar with item group selection, grow mode and layout system integration.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-bottom-nav--design',
    docUrl: 'http://localhost:4000/components/BottomNav/OrigamBottomNav',

    family: [],

    related: [
        { slug: 'tabs', name: 'Tabs', kind: 'component', descriptionFallback: 'Horizontal tab navigation for larger viewports.', descriptionKey: 'components.catalog.tabs.description' },
        { slug: 'btn', name: 'Btn', kind: 'component', descriptionFallback: 'The component used to render each navigation item.', descriptionKey: 'components.catalog.btn.description' }
    ],

    props: [
        {
            name: 'items',
            type: { label: 'Array<IBtnProps>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.bottom_nav.props.items.description',
            descriptionFallback: 'Navigation items rendered as Btn-shaped descriptors. Each item can carry icon, text, to/href and active state.'
        },
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bottom_nav.props.model_value.description',
            descriptionFallback: 'Controls bar visibility. Drives the slide-in/out transition. Supports v-model.'
        },
        {
            name: 'grow',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bottom_nav.props.grow.description',
            descriptionFallback: 'When true, navigation buttons flex-grow to fill the full bar width equally.'
        },
        {
            name: 'mode',
            type: { label: 'TMode', slug: 'mode', kind: 'type' },
            defaultValue: "'vertical'",
            descriptionKey: 'components.bottom_nav.props.mode.description',
            descriptionFallback: 'Layout mode of the child buttons: "vertical" stacks icon above label, "horizontal" places them side-by-side, "shift" slides label down when inactive.'
        },
        {
            name: 'position',
            type: { label: 'TBottomNavPosition', slug: 'bottom-nav-position', kind: 'type' },
            defaultValue: "'start'",
            descriptionKey: 'components.bottom_nav.props.position.description',
            descriptionFallback: 'Horizontal placement when the bar does not span full width: "start", "center" or "end".'
        },
        {
            name: 'transition',
            type: { label: 'TTransitionProps', slug: 'transition-props', kind: 'type' },
            defaultValue: 'OrigamTranslateBottom',
            descriptionKey: 'components.bottom_nav.props.transition.description',
            descriptionFallback: 'Slide-in/out transition component. Defaults to OrigamTranslateBottom (slides up from the bottom). Pass a component descriptor to override.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'bottom-navigation'",
            descriptionKey: 'components.bottom_nav.props.name.description',
            descriptionFallback: 'Layout system identifier. Sibling regions use this name to offset their bottom edge by the bar height.'
        },
        {
            name: 'selectedClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-bottom-nav__btn--selected'",
            descriptionKey: 'components.bottom_nav.props.selected_class.description',
            descriptionFallback: 'CSS class added to the currently-selected button in the group.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'nav'",
            descriptionKey: 'components.bottom_nav.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <nav> for correct landmark semantics.'
        },
        { name: 'color', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.bottom_nav.props.color.description', descriptionFallback: 'Intent or custom color propagated to all child Btn elements via OrigamDefaultsProvider.' },
        { name: 'bgColor', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.bottom_nav.props.bg_color.description', descriptionFallback: 'Background color of the bar itself.' },
        { name: 'density', type: { label: 'TDensity', slug: 'density', kind: 'type' }, defaultValue: "'default'", descriptionKey: 'components.bottom_nav.props.density.description', descriptionFallback: 'Propagated to all child Btn elements. Affects bar height via density offset.' },
        { name: 'height', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.bottom_nav.props.height.description', descriptionFallback: 'Override the bar height. Defaults to 48 px (density-adjusted).' },
        { name: 'elevation', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.bottom_nav.props.elevation.description', descriptionFallback: 'Box-shadow elevation token.' },
        { name: 'rounded', type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.bottom_nav.props.rounded.description', descriptionFallback: 'Border-radius token or boolean.' },
        { name: 'border', type: { label: 'boolean | string', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.bottom_nav.props.border.description', descriptionFallback: 'Applies a border (typically a top border to separate from page content).' },
        { name: 'absolute', type: { label: 'boolean', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.bottom_nav.props.absolute.description', descriptionFallback: 'Positions the bar absolutely rather than as a layout item.' },
        { name: 'order', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.bottom_nav.props.order.description', descriptionFallback: 'Layout order relative to other layout items (DrawerGroup, AppBar, etc.).' }
    ],

    emits: [
        { event: 'update:modelValue', payload: { label: 'boolean', slug: '', kind: 'primitive' }, descriptionKey: 'components.bottom_nav.emits.update_model_value.description', descriptionFallback: 'Fired when bar visibility changes. Supports v-model.' }
    ],

    slots: [
        { slot: 'default', slotProps: '—', descriptionKey: 'components.bottom_nav.slots.default.description', descriptionFallback: 'Full override of the bar content. When present, items prop is ignored.' },
        { slot: 'item', slotProps: '{ props, index }', descriptionKey: 'components.bottom_nav.slots.item.description', descriptionFallback: 'Override for every navigation item. Receives the item descriptor and its index.' },
        { slot: 'item.{index}', slotProps: '{ props }', descriptionKey: 'components.bottom_nav.slots.item_index.description', descriptionFallback: 'Override for a specific item by index (e.g. #item.0 for the first item).' }
    ],

    examples: [
        {
            titleKey: 'components.bottom_nav.examples.basic.title',
            titleFallback: 'Basic bottom navigation',
            lang: 'vue',
            code: `<template>
  <origam-bottom-nav
    v-model="show"
    color="primary"
    :items="navItems"
    grow
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
const navItems = [
  { prependIcon: 'mdi-home', text: 'Home', to: '/' },
  { prependIcon: 'mdi-magnify', text: 'Search', to: '/search' },
  { prependIcon: 'mdi-bell', text: 'Notifications', to: '/notifications' },
  { prependIcon: 'mdi-account', text: 'Profile', to: '/profile' }
]
</script>`
        },
        {
            titleKey: 'components.bottom_nav.examples.shift_mode.title',
            titleFallback: 'Shift mode',
            lang: 'vue',
            code: `<template>
  <origam-bottom-nav
    color="primary"
    mode="shift"
    :items="navItems"
    grow
  />
</template>`
        },
        {
            titleKey: 'components.bottom_nav.examples.custom_slot.title',
            titleFallback: 'Custom item slot',
            lang: 'vue',
            code: `<template>
  <origam-bottom-nav :items="navItems">
    <template #item="{ props, index }">
      <origam-btn
        v-bind="props"
        :badge="index === 2 ? '3' : undefined"
        class="origam-bottom-nav__btn"
      />
    </template>
  </origam-bottom-nav>
</template>`
        }
    ],

    previewVariants: [
        { label: 'vertical', props: { modelValue: true, color: 'primary', mode: 'vertical', grow: true }, slotContent: undefined },
        { label: 'horizontal', props: { modelValue: true, color: 'primary', mode: 'horizontal', grow: true }, slotContent: undefined },
        { label: 'shift', props: { modelValue: true, color: 'primary', mode: 'shift', grow: true }, slotContent: undefined }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-bottom-nav',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamBottomNav',
        svgDesc: 'Schematic of the BottomNav component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="0" y="60" width="700" height="100" rx="0" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.3))" stroke-width="1"/>
  <rect x="0" y="60" width="700" height="3" fill="var(--origam-color__border---subtle, rgba(168,85,247,0.25))"/>
  <rect x="8" y="70" width="162" height="80" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.04))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="89" y="115" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-btn (selected)</text>
  <rect x="178" y="70" width="162" height="80" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.02))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1"/>
  <rect x="348" y="70" width="162" height="80" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.02))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1"/>
  <rect x="518" y="70" width="162" height="80" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.02))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1"/>
  <circle cx="350" cy="62" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="66" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="14" cy="72" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="14" y="76" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="184" cy="72" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="184" y="76" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-bottom-nav&gt;</code> — root bar ①, selected button ② and unselected buttons ③. The bar is a <code>&lt;nav&gt;</code> with <code>aria-label="Bottom navigation"</code>.',
        legend: [
            { num: 1, cls: '.origam-bottom-nav', descriptionKey: 'components.bottom_nav.anatomy.root', descriptionFallback: 'Root <nav> element. Carries mode, position, density and active state classes.' },
            { num: 2, cls: '.origam-bottom-nav__content', descriptionKey: 'components.bottom_nav.anatomy.content', descriptionFallback: 'Flex row containing all navigation buttons. justify-content: center by default.' },
            { num: 3, cls: '.origam-bottom-nav__btn', descriptionKey: 'components.bottom_nav.anatomy.btn', descriptionFallback: 'Each OrigamBtn item. Gets --selected modifier when active in the group.' }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        { name: '--origam-bottom-bar---background', defaultValue: '{color.neutral.200}', descriptionKey: 'components.bottom_nav.css_vars.background', descriptionFallback: 'Bar background color.' },
        { name: '--origam-bottom-bar---color', defaultValue: '{color.text.primary}', descriptionKey: 'components.bottom_nav.css_vars.color', descriptionFallback: 'Default foreground color.' },
        { name: '--origam-bottom-bar---height', defaultValue: '{space.12}', descriptionKey: 'components.bottom_nav.css_vars.height', descriptionFallback: 'Bar height (density-adjusted at render time).' },
        { name: '--origam-bottom-bar---max-width', defaultValue: '100%', descriptionKey: 'components.bottom_nav.css_vars.max_width', descriptionFallback: 'Max-width constraint for centered/partial-width bars.' },
        { name: '--origam-bottom-bar---box-shadow', defaultValue: '{shadow.none}', descriptionKey: 'components.bottom_nav.css_vars.box_shadow', descriptionFallback: 'Default box-shadow. Overridden to elevated variant shadow (upward).' },
        { name: '--origam-bottom-bar---density', defaultValue: '0px', descriptionKey: 'components.bottom_nav.css_vars.density', descriptionFallback: 'Density offset applied to height and padding. compact: 8px, comfortable: -8px.' },
        { name: '--origam-bottom-bar---border-top-width', defaultValue: '0px', descriptionKey: 'components.bottom_nav.css_vars.border_top_width', descriptionFallback: 'Top border width. Typically set to separate the bar from page content.' },
        { name: '--origam-bottom-bar---transition', defaultValue: 'transform, color 0.2s cubic-bezier(…)', descriptionKey: 'components.bottom_nav.css_vars.transition', descriptionFallback: 'Transition applied to the bar for smooth show/hide animations.' },
        { name: '--origam-bottom-bar__content---justify-content', defaultValue: 'center', descriptionKey: 'components.bottom_nav.css_vars.content_justify', descriptionFallback: 'Flex justify-content for the content row.' }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'filterProps', type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>', descriptionKey: 'components.bottom_nav.exposed.filter_props', descriptionFallback: 'Utility to forward a filtered subset of props to child components.' },
        { name: 'css', type: 'Ref<string>', descriptionKey: 'components.bottom_nav.exposed.css', descriptionFallback: 'Reactive CSS string generated by useStyle from the computed navStyles.' },
        { name: 'id', type: 'string', descriptionKey: 'components.bottom_nav.exposed.id', descriptionFallback: 'Unique style-sheet ID for this instance.' },
        { name: 'load', type: '() => void', descriptionKey: 'components.bottom_nav.exposed.load', descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.' },
        { name: 'unload', type: '() => void', descriptionKey: 'components.bottom_nav.exposed.unload', descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.' },
        { name: 'isLoaded', type: 'Ref<boolean>', descriptionKey: 'components.bottom_nav.exposed.is_loaded', descriptionFallback: 'True once the style sheet has been injected.' }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['navigation'],
        keyboard: [
            { key: 'Tab', actionKey: 'components.bottom_nav.a11y.key_tab', actionFallback: 'Moves focus between navigation buttons.' },
            { key: 'Enter / Space', actionKey: 'components.bottom_nav.a11y.key_activate', actionFallback: 'Activates the focused navigation button.' }
        ],
        notes: [
            { noteKey: 'components.bottom_nav.a11y.aria_label', noteFallback: 'The root <nav> element has aria-label="Bottom navigation" hardcoded in the template for clear landmark identification.' },
            { noteKey: 'components.bottom_nav.a11y.selected_class', noteFallback: 'The selectedClass prop ("origam-bottom-nav__btn--selected") is applied by the group system but does not automatically set aria-current or aria-selected — consumers should bind aria-current="page" on the active item.' },
            { noteKey: 'components.bottom_nav.a11y.v_contrast', noteFallback: 'The v-contrast directive is applied to ensure accessible foreground/background contrast when a custom color is set.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/bottom-nav.json',
        pipelineNote: 'Built with Style Dictionary v4. CSS key namespace: --origam-bottom-bar--- (legacy "bar" key retained for backward compat).',
        excerpt: [
            { tokenPath: 'bottom-bar.background', value: '{color.neutral.200}', type: 'color', descriptionKey: 'components.bottom_nav.tokens.background', descriptionFallback: 'Bar background.' },
            { tokenPath: 'bottom-bar.height', value: '{space.12}', type: 'dimension', descriptionKey: 'components.bottom_nav.tokens.height', descriptionFallback: 'Bar height before density adjustment.' },
            { tokenPath: 'bottom-bar.elevated.box-shadow', value: 'upward shadow.md', type: 'shadow', descriptionKey: 'components.bottom_nav.tokens.elevated_shadow', descriptionFallback: 'Shadow with negative offsetY (projects upward) for elevated variant.' },
            { tokenPath: 'bottom-bar.content.justify-content', value: 'center', type: 'other', descriptionKey: 'components.bottom_nav.tokens.content_justify', descriptionFallback: 'Content row flex justification.' },
            { tokenPath: 'bottom-bar.density-compact.density', value: '{space.2}', type: 'dimension', descriptionKey: 'components.bottom_nav.tokens.density_compact', descriptionFallback: 'Compact density offset (+8 px reduction).' }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            { prop: 'color', kind: 'select', labelKey: 'components.bottom_nav.playground.color', labelFallback: 'Color', defaultValue: 'primary', options: [{ label: '(none)', value: '' }, { label: 'primary', value: 'primary' }, { label: 'secondary', value: 'secondary' }, { label: 'success', value: 'success' }] },
            { prop: 'mode', kind: 'select', labelKey: 'components.bottom_nav.playground.mode', labelFallback: 'Mode', defaultValue: 'vertical', options: [{ label: 'vertical', value: 'vertical' }, { label: 'horizontal', value: 'horizontal' }, { label: 'shift', value: 'shift' }] },
            { prop: 'grow', kind: 'switch', labelKey: 'components.bottom_nav.playground.grow', labelFallback: 'Grow', defaultValue: false },
            { prop: 'elevation', kind: 'select', labelKey: 'components.bottom_nav.playground.elevation', labelFallback: 'Elevation', defaultValue: '', options: [{ label: '(none)', value: '' }, { label: 'elevated', value: 'elevated' }] },
            { prop: 'density', kind: 'select', labelKey: 'components.bottom_nav.playground.density', labelFallback: 'Density', defaultValue: 'default', options: [{ label: 'comfortable', value: 'comfortable' }, { label: 'default', value: 'default' }, { label: 'compact', value: 'compact' }] }
        ]
    } satisfies IComponentPlayground
}
