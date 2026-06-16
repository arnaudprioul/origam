/**
 * /components/toolbar — full documentation data for OrigamToolbar.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Toolbar/toolbar.interface.ts  (props)
 *   - packages/ds/src/components/Toolbar/OrigamToolbar.vue     (template BEM, defineExpose, slots)
 *   - packages/ds/tokens/component/toolbar.json                (CSS tokens)
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

export const TOOLBAR_DOC: IComponentDoc = {
    slug: 'toolbar',
    name: 'Toolbar',
    tag: 'origam-toolbar',
    icon: 'mdi-toolbar',
    category: 'Layout',
    descriptionKey: 'components.catalog.toolbar.description',
    descriptionFallback: 'Horizontal bar hosting a title, prepend/append action zones and content. Supports collapse, flat and floating modes with density and elevation control.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-toolbar--design',
    docUrl: 'http://localhost:4000/components/Toolbar/OrigamToolbar',

    family: [],

    related: [
        {
            slug: 'layout',
            name: 'Layout',
            kind: 'component',
            descriptionKey: 'components.related.layout.description',
            descriptionFallback: 'Toolbar is commonly used inside a Layout as an AppBar slot.'
        },
        {
            slug: 'drawer',
            name: 'Drawer',
            kind: 'component',
            descriptionKey: 'components.related.drawer.description',
            descriptionFallback: 'Toolbar adapts its padding when a permanent Drawer is open via layout CSS vars.'
        }
    ],

    props: [
        // ── Own props ─────────────────────────────────────────────
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.title.description',
            descriptionFallback: 'Toolbar title rendered inside the title slot as an OrigamTitle. Can also be overridden via the #title slot.'
        },
        {
            name: 'collapse',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.toolbar.props.collapse.description',
            descriptionFallback: 'Collapses the toolbar to a compact pill shape (max-width: 112px) with rounded end. Useful for scrollable-aware app-bar patterns.'
        },
        {
            name: 'flat',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.toolbar.props.flat.description',
            descriptionFallback: 'Removes the box-shadow. Use when the toolbar sits on a surface that already provides visual separation.'
        },
        {
            name: 'floating',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.toolbar.props.floating.description',
            descriptionFallback: 'Switches layout to inline-flex so the toolbar shrinks to its content width instead of spanning the full row.'
        },
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.model_value.description',
            descriptionFallback: 'v-model binding for the active / visible state. When false, the toolbar is hidden (e.g. collapsed app-bar on scroll).'
        },
        // ── ITagProps ───────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'header'",
            descriptionKey: 'components.toolbar.props.tag.description',
            descriptionFallback: 'Root HTML element. Defaults to header for semantic page structure.'
        },
        // ── IDensityProps ───────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.toolbar.props.density.description',
            descriptionFallback: 'Adjusts height: default=56px, compact=40px, prominent=80px.'
        },
        // ── IColorProps / IBgColorProps ─────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.color.description',
            descriptionFallback: 'Foreground (text/icon) color. Accepts a semantic intent or custom CSS color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.bg_color.description',
            descriptionFallback: 'Background color. Overrides the default surface background.'
        },
        // ── IElevationProps ──────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token. Use 0 to remove the default shadow without flat prop.'
        },
        // ── IRoundedProps ────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean. true uses the theme default radius.'
        },
        // ── IBorderProps ─────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.toolbar.props.border.description',
            descriptionFallback: 'Applies a border. Switches box-shadow to none in border-variant mode.'
        },
        // ── IDimensionProps ──────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.height.description',
            descriptionFallback: 'Overrides the toolbar height (default driven by density token).'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.width.description',
            descriptionFallback: 'Overrides the toolbar width. Default is 100%.'
        },
        // ── IPositionProps ───────────────────────────────────────────
        {
            name: 'position',
            type: { label: 'TPosition', slug: 'position', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.position.description',
            descriptionFallback: 'CSS position strategy: static, fixed, sticky, absolute, relative.'
        },
        // ── IActiveProps ─────────────────────────────────────────────
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.toolbar.props.active.description',
            descriptionFallback: 'Forces the active visual state on the toolbar.'
        },
        // ── IPaddingProps / IMarginProps ─────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.padding.description',
            descriptionFallback: 'Inner padding shorthand. Accepts spacing token or CSS value.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.toolbar.props.margin.description',
            descriptionFallback: 'Outer margin shorthand.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.toolbar.slots.default.description',
            descriptionFallback: 'Full content override. When used, the internal wrapper (prepend/title/content/append) is replaced entirely.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.toolbar.slots.prepend.description',
            descriptionFallback: 'Leading zone (left on LTR). Typically holds a nav icon or back button. Rendered only when the slot has content.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.toolbar.slots.title.description',
            descriptionFallback: 'Title zone. Falls back to rendering an OrigamTitle with the title prop when the slot is empty.'
        },
        {
            slot: 'content',
            slotProps: '—',
            descriptionKey: 'components.toolbar.slots.content.description',
            descriptionFallback: 'Flexible center zone. Grows to fill the available space between prepend/title and append.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.toolbar.slots.append.description',
            descriptionFallback: 'Trailing zone (right on LTR). Typically holds action buttons or an overflow menu.'
        }
    ],

    examples: [
        {
            titleKey: 'components.toolbar.examples.basic.title',
            titleFallback: 'Basic toolbar',
            lang: 'vue',
            code: `<template>
  <origam-toolbar title="My App">
    <template #prepend>
      <origam-btn icon="mdi-menu" aria-label="Open menu" variant="text" />
    </template>
    <template #append>
      <origam-btn icon="mdi-magnify" aria-label="Search" variant="text" />
      <origam-btn icon="mdi-account" aria-label="Account" variant="text" />
    </template>
  </origam-toolbar>
</template>`
        },
        {
            titleKey: 'components.toolbar.examples.colored.title',
            titleFallback: 'Colored & elevated',
            lang: 'vue',
            code: `<template>
  <origam-toolbar
    title="Dashboard"
    bg-color="primary"
    color="white"
    elevation="4"
  >
    <template #append>
      <origam-btn icon="mdi-bell" aria-label="Notifications" variant="text" color="white" />
    </template>
  </origam-toolbar>
</template>`
        },
        {
            titleKey: 'components.toolbar.examples.flat.title',
            titleFallback: 'Flat & floating',
            lang: 'vue',
            code: `<template>
  <origam-toolbar flat floating title="Floating bar">
    <template #append>
      <origam-btn text="Action" variant="tonal" size="small" />
    </template>
  </origam-toolbar>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { title: 'App', elevation: '2' } },
        { label: 'flat', props: { title: 'Flat', flat: true } },
        { label: 'primary', props: { title: 'Primary', bgColor: 'primary', color: 'white', flat: true } },
        { label: 'compact', props: { title: 'Compact', density: 'compact' } },
        { label: 'rounded', props: { title: 'Rounded', rounded: 'lg', elevation: '2' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-toolbar',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamToolbar',
        svgDesc: 'Schematic of the Toolbar component with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="40" width="660" height="56" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="96" width="660" height="4" rx="0" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.08))"/>
  <rect x="28" y="48" width="52" height="40" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="54" y="72" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">prepend</text>
  <rect x="88" y="56" width="120" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="148" y="72" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">title</text>
  <rect x="216" y="48" width="288" height="40" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.20))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="360" y="72" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">content</text>
  <rect x="612" y="48" width="60" height="40" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="642" y="72" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">append</text>
  <circle cx="28" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="54" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="54" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="148" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="148" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="360" cy="48" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="360" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="642" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="642" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <line x1="28" y1="39" x2="28" y2="20" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="50" y="22" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-toolbar</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-toolbar&gt;</code> — 5 internal parts. The <code>__wrapper</code> arranges prepend, title, content and append in a row; the optional shadow line ① marks the bottom edge.`,
        legend: [
            {
                num: 1,
                cls: '.origam-toolbar',
                descriptionKey: 'components.toolbar.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;header&gt;</code> by default. Hosts the box-shadow and z-index.'
            },
            {
                num: 2,
                cls: '.origam-toolbar__prepend',
                descriptionKey: 'components.toolbar.anatomy.prepend',
                descriptionFallback: 'Leading zone. Rendered only when the #prepend slot has content. Margin-end: auto pushes the title to the right.'
            },
            {
                num: 3,
                cls: '.origam-toolbar__title',
                descriptionKey: 'components.toolbar.anatomy.title',
                descriptionFallback: 'Title zone. Contains an <code>OrigamTitle</code> by default, or the #title slot.'
            },
            {
                num: 4,
                cls: '.origam-toolbar__content',
                descriptionKey: 'components.toolbar.anatomy.content',
                descriptionFallback: 'Flexible center area. flex-grow: 1 so it absorbs all remaining space.'
            },
            {
                num: 5,
                cls: '.origam-toolbar__append',
                descriptionKey: 'components.toolbar.anatomy.append',
                descriptionFallback: 'Trailing zone. Rendered only when the #append slot has content. Margin-start: auto pushes it to the far right.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" class="origam-toolbar">
  <slot name="default">
    <div class="origam-toolbar__wrapper">
      <!-- prepend zone (nav icon, back btn) -->
      <div v-if="hasPrepend" class="origam-toolbar__prepend">
        <slot name="prepend" />
      </div>
      <!-- title -->
      <div v-if="hasTitle" class="origam-toolbar__title">
        <slot name="title">
          <origam-title :text="title" />
        </slot>
      </div>
      <!-- flexible content area -->
      <div class="origam-toolbar__content">
        <slot name="content" />
      </div>
      <!-- append zone (action buttons, overflow) -->
      <div v-if="hasAppend" class="origam-toolbar__append">
        <slot name="append" />
      </div>
    </div>
  </slot>
</component>`,
        classes: [
            { cls: 'origam-toolbar', descriptionKey: 'components.toolbar.anatomy.root', descriptionFallback: 'Root element.' },
            { cls: 'origam-toolbar__wrapper', descriptionKey: 'components.toolbar.anatomy.wrapper', descriptionFallback: 'Inner flex row container.' },
            { cls: 'origam-toolbar__prepend', descriptionKey: 'components.toolbar.anatomy.prepend', descriptionFallback: 'Leading slot host.' },
            { cls: 'origam-toolbar__title', descriptionKey: 'components.toolbar.anatomy.title', descriptionFallback: 'Title slot host.' },
            { cls: 'origam-toolbar__content', descriptionKey: 'components.toolbar.anatomy.content', descriptionFallback: 'Flexible content area.' },
            { cls: 'origam-toolbar__append', descriptionKey: 'components.toolbar.anatomy.append', descriptionFallback: 'Trailing slot host.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-toolbar---background',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.toolbar.css_vars.background',
            descriptionFallback: 'Toolbar background color.'
        },
        {
            name: '--origam-toolbar---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.toolbar.css_vars.color',
            descriptionFallback: 'Foreground (text/icon) color.'
        },
        {
            name: '--origam-toolbar---height',
            defaultValue: '{space.14}',
            descriptionKey: 'components.toolbar.css_vars.height',
            descriptionFallback: 'Default height (56px). Overridden per density variant.'
        },
        {
            name: '--origam-toolbar---height-compact',
            defaultValue: '{space.10}',
            descriptionKey: 'components.toolbar.css_vars.height_compact',
            descriptionFallback: 'Height in density="compact" mode (40px).'
        },
        {
            name: '--origam-toolbar---height-prominent',
            defaultValue: '{space.20}',
            descriptionKey: 'components.toolbar.css_vars.height_prominent',
            descriptionFallback: 'Height in density="prominent" mode (80px).'
        },
        {
            name: '--origam-toolbar---box-shadow',
            defaultValue: '{shadow.sm}',
            descriptionKey: 'components.toolbar.css_vars.box_shadow',
            descriptionFallback: 'Box shadow. Set to none via the flat prop.'
        },
        {
            name: '--origam-toolbar---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.toolbar.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for height, transform, and box-shadow.'
        },
        {
            name: '--origam-toolbar---z-index',
            defaultValue: '{zIndex.fixed}',
            descriptionKey: 'components.toolbar.css_vars.z_index',
            descriptionFallback: 'Z-index of the toolbar when position is fixed or sticky.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.toolbar.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.toolbar.exposed.css',
            descriptionFallback: 'Reactive CSS string for the computed toolbar styles (used by DefaultsProvider).'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.toolbar.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.toolbar.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.toolbar.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.toolbar.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['banner'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.toolbar.a11y.key_tab',
                actionFallback: 'Moves focus through interactive children (buttons, links) in the toolbar.'
            }
        ],
        notes: [
            {
                noteKey: 'components.toolbar.a11y.landmark',
                noteFallback: 'When rendered as <header> (default tag), the toolbar acts as a ARIA banner landmark. Ensure only one banner per page.'
            },
            {
                noteKey: 'components.toolbar.a11y.icon_btns',
                noteFallback: 'Icon-only buttons inside the toolbar must carry an aria-label.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/toolbar.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'toolbar.background',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.toolbar.tokens.background',
                descriptionFallback: 'Default toolbar background.'
            },
            {
                tokenPath: 'toolbar.height',
                value: '{space.14}',
                type: 'dimension',
                descriptionKey: 'components.toolbar.tokens.height',
                descriptionFallback: 'Default height (56px).'
            },
            {
                tokenPath: 'toolbar.height-compact',
                value: '{space.10}',
                type: 'dimension',
                descriptionKey: 'components.toolbar.tokens.height_compact',
                descriptionFallback: 'Compact density height.'
            },
            {
                tokenPath: 'toolbar.box-shadow',
                value: '{shadow.sm}',
                type: 'shadow',
                descriptionKey: 'components.toolbar.tokens.box_shadow',
                descriptionFallback: 'Default shadow.'
            },
            {
                tokenPath: 'toolbar.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.toolbar.tokens.transition_duration',
                descriptionFallback: 'Height/shadow transition duration.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.toolbar.playground.title',
                labelFallback: 'Title',
                defaultValue: 'My App'
            },
            {
                prop: 'bgColor',
                kind: 'select',
                labelKey: 'components.toolbar.playground.bg_color',
                labelFallback: 'Background',
                defaultValue: '',
                options: [
                    { label: '(surface)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.toolbar.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'compact', value: 'compact' },
                    { label: 'default', value: 'default' },
                    { label: 'prominent', value: 'prominent' }
                ]
            },
            {
                prop: 'elevation',
                kind: 'select',
                labelKey: 'components.toolbar.playground.elevation',
                labelFallback: 'Elevation',
                defaultValue: '2',
                options: [
                    { label: '0', value: '0' },
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '4', value: '4' },
                    { label: '8', value: '8' }
                ]
            },
            {
                prop: 'flat',
                kind: 'switch',
                labelKey: 'components.toolbar.playground.flat',
                labelFallback: 'Flat',
                defaultValue: false
            },
            {
                prop: 'floating',
                kind: 'switch',
                labelKey: 'components.toolbar.playground.floating',
                labelFallback: 'Floating',
                defaultValue: false
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.toolbar.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'pill', value: 'pill' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
