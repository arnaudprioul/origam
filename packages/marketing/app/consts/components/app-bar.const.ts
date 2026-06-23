/**
 * /components/app-bar — documentation data for OrigamAppBar.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/App/app-bar.interface.ts
 *   - packages/ds/src/components/App/OrigamAppBar.vue
 *   - packages/ds/tokens/component/app-bar.json
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

export const APP_BAR_DOC: IComponentDoc = {
    slug: 'app-bar',
    name: 'AppBar',
    tag: 'origam-app-bar',
    icon: 'mdi-page-layout-header',
    category: 'Layout',
    descriptionKey: 'components.catalog.app_bar.description',
    descriptionFallback: 'Sticky top-of-page header that integrates with the layout engine. Supports scroll-driven behaviours (hide, collapse, elevate, active) and forwards all Toolbar surface props.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-app-bar--design',
    docUrl: 'http://localhost:4000/components/App/OrigamAppBar',

    parentSlug: 'app',

    family: [
        {
            slug: 'app',
            name: 'App',
            descriptionKey: 'components.catalog.app.description',
            descriptionFallback: 'Root layout shell that coordinates all registered layout items.'
        }
    ],

    related: [
        {
            slug: 'toolbar',
            name: 'Toolbar',
            kind: 'component',
            descriptionKey: 'components.catalog.toolbar.description',
            descriptionFallback: 'Generic toolbar that AppBar wraps and forwards surface props to.'
        },
        {
            slug: 'drawer',
            name: 'Drawer',
            kind: 'component',
            descriptionKey: 'components.catalog.drawer.description',
            descriptionFallback: 'Navigation drawer that offsets below the AppBar via the layout engine.'
        }
    ],

    props: [
        {
            name: 'location',
            type: { label: 'TBlock', slug: 'block', kind: 'type' },
            defaultValue: "'top'",
            descriptionKey: 'components.app_bar.props.location.description',
            descriptionFallback: 'Edge the bar is docked to. Only top/bottom are handled by the layout engine.'
        },
        {
            name: 'image',
            type: { label: 'IImgProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.app_bar.props.image.description',
            descriptionFallback: 'Background image rendered inside the prepend slot via OrigamImg. Fades away when scrollBehavior includes "fade-image".'
        },
        {
            name: 'scrollBehavior',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.app_bar.props.scroll_behavior.description',
            descriptionFallback: 'Space-separated behaviour tokens: hide, inverted, collapse, elevate, active, fade-image.'
        },
        {
            name: 'scrollThreshold',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '300',
            descriptionKey: 'components.app_bar.props.scroll_threshold.description',
            descriptionFallback: 'Pixel distance from top before scroll behaviours engage.'
        },
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.app_bar.props.model_value.description',
            descriptionFallback: 'Controls bar visibility. Set false to hide. Driven by hide scroll-behaviour automatically.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '56',
            descriptionKey: 'components.app_bar.props.height.description',
            descriptionFallback: 'Bar height. Drives the layout reservation so sibling regions offset correctly.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.app_bar.props.name.description',
            descriptionFallback: 'Layout item id. Required when multiple layout items share the same edge to control stacking order.'
        },
        {
            name: 'order',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.app_bar.props.order.description',
            descriptionFallback: 'Layout stacking order. Lower values register first and reserve space first.'
        },
        {
            name: 'collapse',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.app_bar.props.collapse.description',
            descriptionFallback: 'Forces collapsed state (forwarded to OrigamToolbar).'
        },
        {
            name: 'flat',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.app_bar.props.flat.description',
            descriptionFallback: 'Removes the box-shadow. Activated automatically by elevate scroll-behaviour while at the top.'
        },
        {
            name: 'active',
            type: { label: 'boolean | IActiveState', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.app_bar.props.active.description',
            descriptionFallback: 'Forwarded to the inner Toolbar. When an object with surface props, they are applied once the page is scrolled (active scroll-behaviour only).'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'header'",
            descriptionKey: 'components.app_bar.props.tag.description',
            descriptionFallback: 'Root HTML element. Defaults to <header> for correct landmark semantics.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.app_bar.slots.default.description',
            descriptionFallback: 'Main toolbar content area (title, nav items, spacer…).'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.app_bar.slots.prepend.description',
            descriptionFallback: 'Leading area — navigation icon, back button or brand logo.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.app_bar.slots.append.description',
            descriptionFallback: 'Trailing area — action icons, account avatar, search trigger.'
        },
        {
            slot: 'img',
            slotProps: '—',
            descriptionKey: 'components.app_bar.slots.img.description',
            descriptionFallback: 'Replaces the default OrigamImg background. Only rendered when the image prop is set or this slot is used.'
        },
        {
            slot: 'content',
            slotProps: '—',
            descriptionKey: 'components.app_bar.slots.content.description',
            descriptionFallback: 'Full-width content override — bypasses the inner Toolbar layout (useful for a custom progress bar below the bar).'
        }
    ],

    examples: [
        {
            titleKey: 'components.app_bar.examples.basic.title',
            titleFallback: 'Basic app bar',
            lang: 'vue',
            code: `<template>
  <origam-app-bar>
    <template #prepend>
      <origam-btn icon="mdi-menu" aria-label="Open navigation" />
    </template>
    My App
    <template #append>
      <origam-btn icon="mdi-magnify" aria-label="Search" />
      <origam-btn icon="mdi-account-circle" aria-label="Account" />
    </template>
  </origam-app-bar>
</template>`
        },
        {
            titleKey: 'components.app_bar.examples.scroll.title',
            titleFallback: 'Scroll behaviours',
            lang: 'vue',
            code: `<template>
  <!-- Hide on scroll down, show on scroll up -->
  <origam-app-bar scroll-behavior="hide" :scroll-threshold="200">
    My App
  </origam-app-bar>

  <!-- Elevate when scrolled away from top -->
  <origam-app-bar scroll-behavior="elevate">
    My App
  </origam-app-bar>

  <!-- Activate surface when scrolled (transparent → painted) -->
  <origam-app-bar
    scroll-behavior="active"
    :active="{ bgColor: 'surface' }"
  >
    My App
  </origam-app-bar>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { color: 'primary' }, slotContent: 'My Application' },
        { label: 'flat', props: { flat: true }, slotContent: 'Flat AppBar' },
        { label: 'collapse', props: { collapse: true }, slotContent: 'Collapsed' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-app-bar',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamAppBar',
        svgDesc: 'Schematic of the AppBar component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="16" y="20" width="668" height="64" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="16" y="20" width="60" height="64" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="76" y="20" width="480" height="64" rx="0" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.18))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="556" y="20" width="128" height="64" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <circle cx="24" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="24" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <text x="46" y="57" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">prepend</text>
  <circle cx="84" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="84" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="316" y="57" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default (title / nav)</text>
  <circle cx="564" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="564" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="620" y="57" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">append</text>
  <rect x="16" y="84" width="668" height="8" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <circle cx="24" cy="88" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="24" y="91.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="200" y="112" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">#content slot (progress bar, custom content)</text>
  <line x1="16" y1="28" x2="4" y2="16" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="60" y="14" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-app-bar (header)</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-app-bar&gt;</code> — 4 zones: prepend ①, default content ②, append ③, and the optional content slot ④ below the main bar.',
        legend: [
            {
                num: 1,
                cls: '.origam-bar__img / #prepend',
                descriptionKey: 'components.app_bar.anatomy.prepend',
                descriptionFallback: 'Prepend area. Hosts navigation icon, logo, or optional background image via #img slot.'
            },
            {
                num: 2,
                cls: '#default',
                descriptionKey: 'components.app_bar.anatomy.default',
                descriptionFallback: 'Main content area forwarded to OrigamToolbar. Typically holds title text and spacers.'
            },
            {
                num: 3,
                cls: '#append',
                descriptionKey: 'components.app_bar.anatomy.append',
                descriptionFallback: 'Trailing zone. Action icons, account avatar, search trigger.'
            },
            {
                num: 4,
                cls: '#content',
                descriptionKey: 'components.app_bar.anatomy.content',
                descriptionFallback: 'Optional full-width content slot rendered below the bar row (e.g. a progress indicator).'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-app-bar tag="header" class="origam-app-bar origam-app-bar--top">
  <!-- optional background image -->
  <div class="origam-bar__img">
    <slot name="img" />
  </div>

  <!-- forwarded to inner OrigamToolbar -->
  <slot name="prepend" />
  <slot name="default" />
  <slot name="append" />

  <!-- full-width area below the bar row -->
  <slot name="content" />
</origam-app-bar>`,
        classes: [
            {
                cls: 'origam-app-bar',
                descriptionKey: 'components.app_bar.anatomy.root',
                descriptionFallback: 'Root element. Renders as <header> by default.'
            },
            {
                cls: 'origam-app-bar--top',
                descriptionKey: 'components.app_bar.anatomy.location',
                descriptionFallback: 'Location modifier. --top or --bottom depending on the location prop.'
            },
            {
                cls: 'origam-app-bar--active',
                descriptionKey: 'components.app_bar.anatomy.active',
                descriptionFallback: 'Applied when the active scroll-behaviour is set and the page is scrolled away from the top.'
            },
            {
                cls: 'origam-bar__img',
                descriptionKey: 'components.app_bar.anatomy.img',
                descriptionFallback: 'Background image container, rendered when the image prop is set.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-app-bar---background-color',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.app_bar.css_vars.background_color',
            descriptionFallback: 'Bar background. Resolves to the raised surface token.'
        },
        {
            name: '--origam-app-bar---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.app_bar.css_vars.color',
            descriptionFallback: 'Bar foreground text and icon color.'
        },
        {
            name: '--origam-app-bar---height',
            defaultValue: '64px',
            descriptionKey: 'components.app_bar.css_vars.height',
            descriptionFallback: 'Default bar height as defined in the token file. The height prop overrides this at runtime.'
        },
        {
            name: '--origam-app-bar---box-shadow',
            defaultValue: '{shadow.sm}',
            descriptionKey: 'components.app_bar.css_vars.box_shadow',
            descriptionFallback: 'Bar elevation. Removed when flat=true or elevate scroll-behaviour is at top.'
        },
        {
            name: '--origam-app-bar---z-index',
            defaultValue: '{zIndex.fixed}',
            descriptionKey: 'components.app_bar.css_vars.z_index',
            descriptionFallback: 'Stacking context z-index. Keeps the bar above page content.'
        },
        {
            name: '--origam-app-bar---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.app_bar.css_vars.transition_duration',
            descriptionFallback: 'Duration of hide/show and elevation transitions.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.app_bar.exposed.filter_props',
            descriptionFallback: 'Forwards a filtered subset of props to a child (e.g. the inner OrigamToolbar).'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.app_bar.exposed.css',
            descriptionFallback: 'Reactive CSS string from useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.app_bar.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.app_bar.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.app_bar.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.app_bar.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['banner'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.app_bar.a11y.key_tab',
                actionFallback: 'Moves focus through interactive elements inside the bar (prepend icons, title link, append icons).'
            }
        ],
        notes: [
            {
                noteKey: 'components.app_bar.a11y.tag_note',
                noteFallback: 'Default tag is <header>, which has the implicit role="banner" at document level. Provides the primary page navigation landmark.'
            },
            {
                noteKey: 'components.app_bar.a11y.reduced_motion_note',
                noteFallback: 'All scroll-behaviour transitions (hide/show, collapse) respect prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/app-bar.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'app-bar.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.app_bar.tokens.background_color',
                descriptionFallback: 'Default bar background.'
            },
            {
                tokenPath: 'app-bar.height',
                value: '64px',
                type: 'dimension',
                descriptionKey: 'components.app_bar.tokens.height',
                descriptionFallback: 'Default bar height registered with the layout engine.'
            },
            {
                tokenPath: 'app-bar.box-shadow',
                value: '{shadow.sm}',
                type: 'shadow',
                descriptionKey: 'components.app_bar.tokens.box_shadow',
                descriptionFallback: 'Resting elevation.'
            },
            {
                tokenPath: 'app-bar.z-index',
                value: '{zIndex.fixed}',
                type: 'number',
                descriptionKey: 'components.app_bar.tokens.z_index',
                descriptionFallback: 'Z-index above page content.'
            },
            {
                tokenPath: 'app-bar.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.app_bar.tokens.transition_duration',
                descriptionFallback: 'Duration of scroll-driven animations.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'flat',
                kind: 'switch',
                labelKey: 'components.app_bar.playground.flat',
                labelFallback: 'Flat (no shadow)',
                defaultValue: false
            },
            {
                prop: 'collapse',
                kind: 'switch',
                labelKey: 'components.app_bar.playground.collapse',
                labelFallback: 'Collapsed',
                defaultValue: false
            },
            {
                prop: 'scrollBehavior',
                kind: 'select',
                labelKey: 'components.app_bar.playground.scroll_behavior',
                labelFallback: 'Scroll behaviour',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'hide', value: 'hide' },
                    { label: 'elevate', value: 'elevate' },
                    { label: 'collapse', value: 'collapse' },
                    { label: 'active', value: 'active' }
                ]
            }
        ],
        defaultSlotContent: 'My Application'
    } satisfies IComponentPlayground
}
