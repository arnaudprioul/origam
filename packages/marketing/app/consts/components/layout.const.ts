/**
 * /components/layout — full documentation data for OrigamLayout.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Commons/layout.interface.ts  (props: ILayoutProps)
 *   - packages/ds/src/components/Layout/OrigamLayout.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/layout.json                (CSS tokens)
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

export const LAYOUT_DOC: IComponentDoc = {
    slug: 'layout',
    name: 'Layout',
    tag: 'origam-layout',
    icon: 'mdi-page-layout-body',
    category: 'Layout & Structure',
    descriptionKey: 'components.catalog.layout.description',
    descriptionFallback: 'Root layout container that coordinates space-reservation for registered layout items (Drawer, AppBar, BottomNav, SystemBar). Pushes content automatically via CSS custom properties.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-layout--design',
    docUrl: 'http://localhost:4000/components/Layout/OrigamLayout',

    family: [],

    related: [
        {
            slug: 'main',
            name: 'Main',
            kind: 'component',
            descriptionKey: 'components.catalog.main.description',
            descriptionFallback: 'Content area that reads layout offset CSS vars to position itself inside OrigamLayout.'
        },
        {
            slug: 'drawer',
            name: 'Drawer',
            kind: 'component',
            descriptionKey: 'components.catalog.drawer.description',
            descriptionFallback: 'Side navigation panel that registers itself as a layout item and carves out space.'
        },
        {
            slug: 'system-bar',
            name: 'SystemBar',
            kind: 'component',
            descriptionKey: 'components.catalog.system_bar.description',
            descriptionFallback: 'Top system bar that registers a fixed-height slot at the top of the layout.'
        }
    ],

    props: [
        // ── ILayoutProps own props ─────────────────────────────────────────
        {
            name: 'overlaps',
            type: { label: 'Array<string>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.overlaps.description',
            descriptionFallback: 'List of layout item IDs that should overlap rather than push the content area.'
        },
        {
            name: 'fullHeight',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.layout.props.full_height.description',
            descriptionFallback: 'Switches the root and wrapper to 100vw / 100vh, filling the entire viewport.'
        },
        // ── IDimensionProps ────────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.height.description',
            descriptionFallback: 'Overrides the layout height. Accepts a CSS length or a number (→ px).'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.width.description',
            descriptionFallback: 'Overrides the layout width.'
        },
        {
            name: 'minHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.min_height.description',
            descriptionFallback: 'Minimum layout height.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.max_height.description',
            descriptionFallback: 'Maximum layout height.'
        },
        {
            name: 'minWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.min_width.description',
            descriptionFallback: 'Minimum layout width.'
        },
        {
            name: 'maxWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.max_width.description',
            descriptionFallback: 'Maximum layout width.'
        },
        // ── IBgColorProps / IColorProps ────────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.bg_color.description',
            descriptionFallback: 'Background color of the layout root.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.color.description',
            descriptionFallback: 'Foreground color inherited by children.'
        },
        // ── IElevationProps ────────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the layout root.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.layout.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean.'
        },
        // ── IBorderProps ───────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.layout.props.border.description',
            descriptionFallback: 'Applies a border to the layout root.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.layout.slots.default.description',
            descriptionFallback: 'Primary content area. Place layout items (Drawer, AppBar, OrigamMain…) here.'
        }
    ],

    examples: [
        {
            titleKey: 'components.layout.examples.basic.title',
            titleFallback: 'Basic page layout',
            lang: 'vue',
            code: `<template>
  <origam-layout full-height>
    <!-- Top app bar registers 64px at the top -->
    <origam-system-bar />

    <!-- Drawer registers ~256px on the left -->
    <origam-drawer :model-value="drawer" />

    <!-- Main receives the offset CSS vars automatically -->
    <origam-main>
      <NuxtPage />
    </origam-main>
  </origam-layout>
</template>`
        },
        {
            titleKey: 'components.layout.examples.scrollable.title',
            titleFallback: 'Scrollable main area',
            lang: 'vue',
            code: `<template>
  <origam-layout full-height>
    <origam-system-bar />
    <origam-main scrollable>
      <p v-for="i in 100" :key="i">Line {{ i }}</p>
    </origam-main>
  </origam-layout>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-layout',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamLayout',
        svgDesc: 'Schematic of the Layout component with its wrapper child and registered layout items.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="24" y="24" width="652" height="192" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="24" y="24" width="652" height="32" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <text x="350" y="44" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">SystemBar / AppBar (layout item)</text>
  <rect x="24" y="56" width="160" height="160" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="104" y="140" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Drawer</text>
  <text x="104" y="154" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">(layout item)</text>
  <rect x="184" y="56" width="492" height="160" rx="0" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="430" y="128" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-layout__wrapper</text>
  <text x="430" y="145" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">→ origam-main + slot content</text>
  <circle cx="32" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="192" cy="64" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="192" y="68" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-layout&gt;</code> — root wrapper (①) + inner <code>__wrapper</code> (②) that receives the content. Layout items (Drawer, AppBar…) register themselves and carve space via CSS vars.',
        legend: [
            {
                num: 1,
                cls: '.origam-layout',
                descriptionKey: 'components.layout.anatomy.root',
                descriptionFallback: 'Root <code>&lt;div&gt;</code>. Emits <code>--origam-layout---position-{top,right,bottom,left}</code> CSS vars reflecting each registered item\'s reserved space.'
            },
            {
                num: 2,
                cls: '.origam-layout__wrapper',
                descriptionKey: 'components.layout.anatomy.wrapper',
                descriptionFallback: 'Inner wrapper — <code>width: 100%; height: 100%</code>. In <code>full-height</code> mode switches to <code>100vw / 100vh</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div :id="layoutId" ref="origamLayoutRef" class="origam-layout">
  <div :id="\`\${layoutId}-wrapper\`" class="origam-layout__wrapper">
    <slot name="default" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-layout',
                descriptionKey: 'components.layout.anatomy.root',
                descriptionFallback: 'Root element. position: relative; width: 100%; height: 100%.'
            },
            {
                cls: 'origam-layout__wrapper',
                descriptionKey: 'components.layout.anatomy.wrapper',
                descriptionFallback: 'Inner wrapper. width: 100%; height: 100%; max-height: 100%; max-width: 100%.'
            },
            {
                cls: 'origam-layout--full-height',
                descriptionKey: 'components.layout.anatomy.full_height',
                descriptionFallback: 'Applied when fullHeight=true. Switches wrapper to 100vw / 100vh.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-layout---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.layout.css_vars.background_color',
            descriptionFallback: 'Layout background color.'
        },
        {
            name: '--origam-layout---position-top',
            defaultValue: '0px',
            descriptionKey: 'components.layout.css_vars.position_top',
            descriptionFallback: 'Space reserved at the top by registered layout items (e.g. AppBar height). Consumed by OrigamMain as padding-block-start.'
        },
        {
            name: '--origam-layout---position-bottom',
            defaultValue: '0px',
            descriptionKey: 'components.layout.css_vars.position_bottom',
            descriptionFallback: 'Space reserved at the bottom (e.g. BottomNav height). Consumed by OrigamMain as padding-block-end.'
        },
        {
            name: '--origam-layout---position-left',
            defaultValue: '0px',
            descriptionKey: 'components.layout.css_vars.position_left',
            descriptionFallback: 'Space reserved on the left (e.g. Drawer width). Consumed by OrigamMain as padding-inline-start.'
        },
        {
            name: '--origam-layout---position-right',
            defaultValue: '0px',
            descriptionKey: 'components.layout.css_vars.position_right',
            descriptionFallback: 'Space reserved on the right (e.g. rail nav width). Consumed by OrigamMain as padding-inline-end.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'getLayoutItem',
            type: '(id: string) => ILayerItem | undefined',
            descriptionKey: 'components.layout.exposed.get_layout_item',
            descriptionFallback: 'Returns the layout metadata (position, size, id) of a registered item by its string ID.'
        },
        {
            name: 'items',
            type: 'Ref<Array<ILayerItem>>',
            descriptionKey: 'components.layout.exposed.items',
            descriptionFallback: 'Reactive array of all registered layout items with their current positions and sizes.'
        },
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.layout.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.layout.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.layout.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.layout.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.layout.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.layout.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.layout.a11y.key_tab',
                actionFallback: 'Tab navigation flows through the interactive children inside the layout (drawer toggles, nav items, main content).'
            }
        ],
        notes: [
            {
                noteKey: 'components.layout.a11y.landmark_note',
                noteFallback: 'OrigamLayout renders as a plain <div> — no ARIA landmark role. Use <origam-main> (renders as <main>) and <origam-system-bar> to provide landmark semantics for assistive technologies.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/layout.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Layout position offsets are emitted as CSS custom properties at runtime by useCreateLayout — they are not in the token file.',
        excerpt: [
            {
                tokenPath: 'layout.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.layout.tokens.background_color',
                descriptionFallback: 'Default background color for the layout root.'
            },
            {
                tokenPath: 'layout.display',
                value: 'flex',
                type: 'other',
                descriptionKey: 'components.layout.tokens.display',
                descriptionFallback: 'Layout display mode (flex, column).'
            },
            {
                tokenPath: 'layout.wrapper.width',
                value: '100vw',
                type: 'other',
                descriptionKey: 'components.layout.tokens.wrapper_width',
                descriptionFallback: 'Wrapper width in full-height mode.'
            },
            {
                tokenPath: 'layout.wrapper.height',
                value: '100vh',
                type: 'other',
                descriptionKey: 'components.layout.tokens.wrapper_height',
                descriptionFallback: 'Wrapper height in full-height mode.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'fullHeight',
                kind: 'switch',
                labelKey: 'components.layout.playground.full_height',
                labelFallback: 'Full height (100vw/100vh)',
                defaultValue: false
            },
            {
                prop: 'bgColor',
                kind: 'select',
                labelKey: 'components.layout.playground.bg_color',
                labelFallback: 'Background color',
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
                labelKey: 'components.layout.playground.elevation',
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
