/**
 * /components/main — full documentation data for OrigamMain.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Main/main.interface.ts  (IMainProps)
 *   - packages/ds/src/components/Main/OrigamMain.vue     (template BEM, defineExpose, SCSS)
 *   - packages/ds/tokens/component/main.json            (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const MAIN_DOC: IComponentDoc = {
    slug: 'main',
    name: 'Main',
    tag: 'origam-main',
    icon: 'mdi-application-outline',
    category: 'Layout & Structure',
    descriptionKey: 'components.catalog.main.description',
    descriptionFallback: 'Content area of an OrigamLayout page. Reads the layout-item CSS offset vars (position-top/right/bottom/left) to auto-pad itself around Drawers, AppBars and BottomNavs. Supports a scrollable inner mode.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-main--design',
    docUrl: 'http://localhost:4000/components/Main/OrigamMain',

    family: [],

    related: [
        {
            slug: 'layout',
            name: 'Layout',
            kind: 'component',
            descriptionKey: 'components.catalog.layout.description',
            descriptionFallback: 'Parent layout container that publishes the position offset CSS vars consumed by OrigamMain.'
        },
        {
            slug: 'drawer',
            name: 'Drawer',
            kind: 'component',
            descriptionKey: 'components.catalog.drawer.description',
            descriptionFallback: 'Side panel that registers its width as a layout position, pushing OrigamMain sideways.'
        },
        {
            slug: 'system-bar',
            name: 'SystemBar',
            kind: 'component',
            descriptionKey: 'components.catalog.system_bar.description',
            descriptionFallback: 'Top bar that registers its height, pushing OrigamMain down.'
        }
    ],

    props: [
        // ── IMainProps own props ───────────────────────────────────────────
        {
            name: 'scrollable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.main.props.scrollable.description',
            descriptionFallback: 'When true, the root switches to position: absolute + display: flex and the inner __scroller wrapper gets overflow-y: auto. This confines scrolling to the main content area rather than the whole page.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'main'",
            descriptionKey: 'components.main.props.tag.description',
            descriptionFallback: 'Root HTML element tag. Defaults to <main> for landmark semantics.'
        },
        // ── IBgColorProps / IColorProps ────────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.bg_color.description',
            descriptionFallback: 'Background color of the main area.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.color.description',
            descriptionFallback: 'Foreground color inherited by children.'
        },
        // ── IElevationProps ────────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean.'
        },
        // ── IBorderProps ───────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.main.props.border.description',
            descriptionFallback: 'Applies a border to the main area.'
        },
        // ── IDimensionProps ────────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.height.description',
            descriptionFallback: 'Override the main area height.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.width.description',
            descriptionFallback: 'Override the main area width.'
        },
        {
            name: 'maxWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.max_width.description',
            descriptionFallback: 'Maximum width of the main area.'
        },
        // ── IPaddingProps / IMarginProps ───────────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.padding.description',
            descriptionFallback: 'Padding shorthand. Note: layout offset padding is applied automatically — this prop adds extra padding on top.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.main.props.margin.description',
            descriptionFallback: 'Margin shorthand.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.main.slots.default.description',
            descriptionFallback: 'Page content. Rendered inside __wrapper (and __scroller in scrollable mode).'
        }
    ],

    examples: [
        {
            titleKey: 'components.main.examples.basic.title',
            titleFallback: 'Inside a Layout',
            lang: 'vue',
            code: `<template>
  <origam-layout full-height>
    <origam-system-bar />
    <origam-drawer :model-value="drawer" />
    <!-- OrigamMain auto-reads layout offsets — no manual padding needed -->
    <origam-main>
      <router-view />
    </origam-main>
  </origam-layout>
</template>`
        },
        {
            titleKey: 'components.main.examples.scrollable.title',
            titleFallback: 'Scrollable mode',
            lang: 'vue',
            code: `<template>
  <origam-layout full-height>
    <origam-system-bar />
    <!-- Only the inner __scroller scrolls, not the whole page -->
    <origam-main scrollable>
      <p v-for="i in 200" :key="i">Row {{ i }}</p>
    </origam-main>
  </origam-layout>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-main',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamMain',
        svgDesc: 'Schematic of the Main component with its wrapper child and scrollable modifier.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="24" y="24" width="652" height="152" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="40" y="40" width="620" height="120" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="96" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-main__wrapper</text>
  <text x="350" y="114" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">→ origam-main__scroller (scrollable mode only)</text>
  <circle cx="32" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="48" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="48" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="42" y1="32" x2="80" y2="18" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="18" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-main (tag: main)</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-main&gt;</code> — ① root <code>&lt;main&gt;</code> that reads layout offset CSS vars, ② <code>__wrapper</code> (becomes <code>__scroller</code> in scrollable mode with overflow-y: auto).',
        legend: [
            {
                num: 1,
                cls: '.origam-main',
                descriptionKey: 'components.main.anatomy.root',
                descriptionFallback: 'Root <code>&lt;main&gt;</code>. Applies <code>padding-inline-start/end/block-start/end</code> from layout offset CSS vars (<code>--origam-layout---position-*</code>). flex: 1 0 auto by default.'
            },
            {
                num: 2,
                cls: '.origam-main__wrapper / .origam-main__scroller',
                descriptionKey: 'components.main.anatomy.wrapper',
                descriptionFallback: 'Inner wrapper. In <code>scrollable</code> mode the class becomes <code>__scroller</code> and adds <code>overflow-y: auto; flex: 1 1 auto</code>. Layout offsets are reset to 0 inside the scroller so nested layout items don\'t double-count.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" class="origam-main">
  <!-- wrapper becomes __scroller when scrollable=true -->
  <div
    class="origam-main__wrapper"
    :class="{ 'origam-main__scroller': scrollable }"
  >
    <slot name="default" />
  </div>
</component>`,
        classes: [
            {
                cls: 'origam-main',
                descriptionKey: 'components.main.anatomy.root',
                descriptionFallback: 'Root element (defaults to <main>). Reads layout position offset CSS vars for automatic padding.'
            },
            {
                cls: 'origam-main--scrollable',
                descriptionKey: 'components.main.anatomy.scrollable',
                descriptionFallback: 'Applied when scrollable=true. Switches to position: absolute, display: flex.'
            },
            {
                cls: 'origam-main__wrapper',
                descriptionKey: 'components.main.anatomy.wrapper',
                descriptionFallback: 'Inner wrapper. Hosts the default slot.'
            },
            {
                cls: 'origam-main__scroller',
                descriptionKey: 'components.main.anatomy.scroller',
                descriptionFallback: 'Additional class on __wrapper in scrollable mode. overflow-y: auto; flex: 1 1 auto. Resets layout offset vars to 0.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-main---flex',
            defaultValue: '1 0 auto',
            descriptionKey: 'components.main.css_vars.flex',
            descriptionFallback: 'Flex shorthand for the root. Allows the main area to grow and fill the layout.'
        },
        {
            name: '--origam-main---max-width',
            defaultValue: '100%',
            descriptionKey: 'components.main.css_vars.max_width',
            descriptionFallback: 'Maximum width of the main area.'
        },
        {
            name: '--origam-main---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.main.css_vars.transition_duration',
            descriptionFallback: 'Transition duration when layout items push/pull the main area (e.g. drawer open/close).'
        },
        {
            name: '--origam-main---transition-property',
            defaultValue: 'all',
            descriptionKey: 'components.main.css_vars.transition_property',
            descriptionFallback: 'Properties transitioned when the layout offsets change.'
        },
        {
            name: '--origam-main---transition-timing-function',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.main.css_vars.transition_timing_function',
            descriptionFallback: 'Easing of the layout push transition.'
        },
        {
            name: '--origam-main__scroller---max-width',
            defaultValue: '100%',
            descriptionKey: 'components.main.css_vars.scroller_max_width',
            descriptionFallback: 'Maximum width of the scroller inner div.'
        },
        {
            name: '--origam-main__scroller---position',
            defaultValue: 'relative',
            descriptionKey: 'components.main.css_vars.scroller_position',
            descriptionFallback: 'Position of the scroller inner div.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.main.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.main.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.main.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.main.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.main.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.main.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['main'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.main.a11y.key_tab',
                actionFallback: 'Navigates to the first interactive element inside the main content area.'
            }
        ],
        notes: [
            {
                noteKey: 'components.main.a11y.landmark_note',
                noteFallback: 'OrigamMain renders as <code>&lt;main&gt;</code> by default, providing a landmark region for assistive technologies. There should be only one <code>&lt;main&gt;</code> landmark per page.'
            },
            {
                noteKey: 'components.main.a11y.skip_link_note',
                noteFallback: 'Pair OrigamMain with a "Skip to main content" link (<code>&lt;a href="#main-id"&gt;</code>) targeting its rendered id for keyboard-only users.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/main.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'main.flex',
                value: '1 0 auto',
                type: 'other',
                descriptionKey: 'components.main.tokens.flex',
                descriptionFallback: 'Default flex shorthand.'
            },
            {
                tokenPath: 'main.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.main.tokens.transition_duration',
                descriptionFallback: 'Duration of the push-content transition when layout items move.'
            },
            {
                tokenPath: 'main.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.main.tokens.background_color',
                descriptionFallback: 'Default background color for the main area.'
            },
            {
                tokenPath: 'main.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.main.tokens.color',
                descriptionFallback: 'Default foreground color.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'scrollable',
                kind: 'switch',
                labelKey: 'components.main.playground.scrollable',
                labelFallback: 'Scrollable',
                defaultValue: false
            },
            {
                prop: 'bgColor',
                kind: 'select',
                labelKey: 'components.main.playground.bg_color',
                labelFallback: 'Background',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'surface', value: 'surface' }
                ]
            },
            {
                prop: 'elevation',
                kind: 'select',
                labelKey: 'components.main.playground.elevation',
                labelFallback: 'Elevation',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '4', value: '4' }
                ]
            }
        ]
    }
}
