/**
 * /components/grid — full documentation data for OrigamGrid.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Grid/grid.interface.ts      (props)
 *   - packages/ds/src/components/Grid/OrigamGrid.vue         (template BEM, defineExpose)
 *   - packages/ds/tokens/component/grid.json                 (CSS tokens)
 *
 * RELATED FAMILY: Grids system (OrigamContainer, OrigamRow, OrigamCol, OrigamSpacer)
 * is documented separately under the "grids" slug.
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

export const GRID_DOC: IComponentDoc = {
    slug: 'grid',
    name: 'Grid',
    tag: 'origam-grid',
    icon: 'mdi-grid',
    category: 'Layout',
    descriptionKey: 'components.catalog.grid.description',
    descriptionFallback: 'Declarative CSS Grid container. Exposes every CSS grid property through typed Vue props — no JS track measurement, no fallback to flexbox. columns, rows, gap, areas, autoFlow and alignment props map directly to the corresponding CSS grid properties.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-grid--design',
    docUrl: 'http://localhost:4000/components/Grid/OrigamGrid',

    family: [],

    related: [
        {
            slug: 'grids',
            name: 'Grids (Container / Row / Col)',
            kind: 'component',
            descriptionKey: 'components.catalog.grids.description',
            descriptionFallback: 'Bootstrap-style 12-column responsive grid system (Container, Row, Col, Spacer).'
        }
    ],

    props: [
        {
            name: 'columns',
            type: { label: 'number | string | string[]', slug: '', kind: 'primitive' },
            defaultValue: "'auto'",
            descriptionKey: 'components.grid.props.columns.description',
            descriptionFallback: "grid-template-columns. Three accepted shapes: number (→ repeat(N, 1fr)), string (verbatim CSS), string[] (joined with space). Default 'auto'."
        },
        {
            name: 'rows',
            type: { label: 'number | string | string[]', slug: '', kind: 'primitive' },
            defaultValue: "'auto'",
            descriptionKey: 'components.grid.props.rows.description',
            descriptionFallback: "grid-template-rows. Same accepted shapes as columns. Default 'auto'."
        },
        {
            name: 'gap',
            type: { label: 'TGridGapSize | string | number', slug: 'grid-gap-size', kind: 'type' },
            defaultValue: "'md'",
            descriptionKey: 'components.grid.props.gap.description',
            descriptionFallback: "Both-axis gap. Accepts a size token ('xs' | 'sm' | 'md' | 'lg' | 'xl'), any CSS length string, or a number (px). columnGap / rowGap override their axis."
        },
        {
            name: 'columnGap',
            type: { label: 'TGridGapSize | string | number', slug: 'grid-gap-size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.column_gap.description',
            descriptionFallback: 'Inline-axis-only gap override. Same accepted shapes as gap.'
        },
        {
            name: 'rowGap',
            type: { label: 'TGridGapSize | string | number', slug: 'grid-gap-size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.row_gap.description',
            descriptionFallback: 'Block-axis-only gap override. Same accepted shapes as gap.'
        },
        {
            name: 'areas',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.areas.description',
            descriptionFallback: "grid-template-areas. Accepts string[] (one entry per row, component adds quotes) or a raw CSS string. Example: ['header header', 'sidebar main']."
        },
        {
            name: 'autoFlow',
            type: { label: 'TGridAutoFlow', slug: 'grid-auto-flow', kind: 'type' },
            defaultValue: "'row'",
            descriptionKey: 'components.grid.props.auto_flow.description',
            descriptionFallback: "grid-auto-flow. Controls implicit track filling. Values: 'row' | 'column' | 'row dense' | 'column dense'. Default 'row'."
        },
        {
            name: 'autoColumns',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.auto_columns.description',
            descriptionFallback: 'grid-auto-columns — sizes for implicit columns. Free-form CSS (e.g. "minmax(0, 1fr)").'
        },
        {
            name: 'autoRows',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.auto_rows.description',
            descriptionFallback: 'grid-auto-rows — sizes for implicit rows. Free-form CSS.'
        },
        {
            name: 'alignItems',
            type: { label: 'TGridPlaceItems', slug: 'grid-place-items', kind: 'type' },
            defaultValue: "'stretch'",
            descriptionKey: 'components.grid.props.align_items.description',
            descriptionFallback: "align-items (block axis). Values: 'start' | 'end' | 'center' | 'stretch' | 'baseline'. Default 'stretch'."
        },
        {
            name: 'justifyItems',
            type: { label: 'TGridPlaceItems', slug: 'grid-place-items', kind: 'type' },
            defaultValue: "'stretch'",
            descriptionKey: 'components.grid.props.justify_items.description',
            descriptionFallback: "justify-items (inline axis). Same values as alignItems. Default 'stretch'."
        },
        {
            name: 'alignContent',
            type: { label: 'TGridPlaceContent', slug: 'grid-place-content', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.align_content.description',
            descriptionFallback: 'align-content — block-axis alignment of the whole grid inside its container when the grid is smaller than the container.'
        },
        {
            name: 'justifyContent',
            type: { label: 'TGridPlaceContent', slug: 'grid-place-content', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.justify_content.description',
            descriptionFallback: 'justify-content — inline-axis alignment of the whole grid inside its container.'
        },
        {
            name: 'inline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.grid.props.inline.description',
            descriptionFallback: 'Toggles display: inline-grid instead of display: grid. Useful for grids that must size to their content.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.grid.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root (e.g. "ul", "section").'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.height.description',
            descriptionFallback: 'Overrides the grid height.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.width.description',
            descriptionFallback: 'Overrides the grid width.'
        },
        {
            name: 'minHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.min_height.description',
            descriptionFallback: 'Minimum grid height.'
        },
        {
            name: 'maxWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid.props.max_width.description',
            descriptionFallback: 'Maximum grid width.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.grid.slots.default.description',
            descriptionFallback: 'Grid items. Any element placed here participates in the grid layout. Use grid-area or column/row span CSS to position items.'
        }
    ],

    examples: [
        {
            titleKey: 'components.grid.examples.columns.title',
            titleFallback: 'N-column grid',
            lang: 'vue',
            code: `<template>
  <!-- 3 equal-width columns with md gap -->
  <origam-grid :columns="3" gap="md">
    <div v-for="i in 6" :key="i" style="background:#f3f4f6;padding:1rem;">{{ i }}</div>
  </origam-grid>
</template>`
        },
        {
            titleKey: 'components.grid.examples.areas.title',
            titleFallback: 'Named template areas',
            lang: 'vue',
            code: `<template>
  <origam-grid
    :areas="['header header', 'sidebar main', 'footer footer']"
    :columns="'200px 1fr'"
    gap="sm"
    style="height: 100vh;"
  >
    <header style="grid-area: header;">Header</header>
    <aside style="grid-area: sidebar;">Sidebar</aside>
    <main style="grid-area: main;">Main</main>
    <footer style="grid-area: footer;">Footer</footer>
  </origam-grid>
</template>`
        },
        {
            titleKey: 'components.grid.examples.auto_fill.title',
            titleFallback: 'Auto-fill responsive columns',
            lang: 'vue',
            code: `<template>
  <origam-grid columns="repeat(auto-fill, minmax(200px, 1fr))" gap="lg">
    <origam-card v-for="item in items" :key="item.id" :title="item.name" />
  </origam-grid>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-grid',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamGrid',
        svgDesc: 'Schematic of the Grid component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="24" width="644" height="132" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="48" y="44" width="184" height="92" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="140" y="94" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">item 1</text>
  <rect x="244" y="44" width="184" height="92" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="336" y="94" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">item 2</text>
  <rect x="440" y="44" width="212" height="92" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="546" y="94" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">item 3</text>
  <circle cx="36" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="36.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="52" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="56" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-grid&gt;</code>. The root ① is a single element with CSS Grid properties applied via inline custom properties. Items ② are slotted children — any DOM element, without a BEM wrapper.`,
        legend: [
            {
                num: 1,
                cls: '.origam-grid',
                descriptionKey: 'components.grid.anatomy.root',
                descriptionFallback: 'Root element. display: grid (or inline-grid when inline=true). All grid properties are applied as inline CSS custom properties computed from props.'
            },
            {
                num: 2,
                cls: '(slotted children)',
                descriptionKey: 'components.grid.anatomy.items',
                descriptionFallback: 'Grid items — any element placed in the default slot. No BEM wrapping. Use grid-area or span CSS on individual items for advanced placement.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamGrid — single declarative element -->
<div
  class="origam-grid"
  style="
    --origam-grid---template-columns: repeat(3, 1fr);
    --origam-grid---template-rows: auto;
    --origam-grid---gap: var(--origam-grid---gap-md, 1rem);
    --origam-grid---auto-flow: row;
  "
>
  <slot />
</div>`,
        classes: [
            {
                cls: 'origam-grid',
                descriptionKey: 'components.grid.anatomy.root',
                descriptionFallback: 'Root element. display: grid (or inline-grid). No BEM children.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-grid---gap-xs',
            defaultValue: '{space.1} (4px)',
            descriptionKey: 'components.grid.css_vars.gap_xs',
            descriptionFallback: 'Gap token for size xs.'
        },
        {
            name: '--origam-grid---gap-sm',
            defaultValue: '{space.2} (8px)',
            descriptionKey: 'components.grid.css_vars.gap_sm',
            descriptionFallback: 'Gap token for size sm.'
        },
        {
            name: '--origam-grid---gap-md',
            defaultValue: '{space.4} (16px)',
            descriptionKey: 'components.grid.css_vars.gap_md',
            descriptionFallback: 'Gap token for size md (default).'
        },
        {
            name: '--origam-grid---gap-lg',
            defaultValue: '{space.6} (24px)',
            descriptionKey: 'components.grid.css_vars.gap_lg',
            descriptionFallback: 'Gap token for size lg.'
        },
        {
            name: '--origam-grid---gap-xl',
            defaultValue: '{space.8} (32px)',
            descriptionKey: 'components.grid.css_vars.gap_xl',
            descriptionFallback: 'Gap token for size xl.'
        },
        {
            name: '--origam-grid---template-columns',
            defaultValue: 'none',
            descriptionKey: 'components.grid.css_vars.template_columns',
            descriptionFallback: 'Computed grid-template-columns value set from the columns prop.'
        },
        {
            name: '--origam-grid---template-rows',
            defaultValue: 'none',
            descriptionKey: 'components.grid.css_vars.template_rows',
            descriptionFallback: 'Computed grid-template-rows value set from the rows prop.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.grid.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props.'
        },
        {
            name: 'columnsCss',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: 'components.grid.exposed.columns_css',
            descriptionFallback: 'Serialised grid-template-columns CSS value computed from the columns prop.'
        },
        {
            name: 'rowsCss',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: 'components.grid.exposed.rows_css',
            descriptionFallback: 'Serialised grid-template-rows CSS value computed from the rows prop.'
        },
        {
            name: 'areasCss',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: 'components.grid.exposed.areas_css',
            descriptionFallback: 'Serialised grid-template-areas CSS value computed from the areas prop.'
        },
        {
            name: 'gapCss',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: 'components.grid.exposed.gap_css',
            descriptionFallback: 'Resolved gap value (size token → CSS var reference, or raw CSS value).'
        },
        {
            name: 'columnGapCss',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: 'components.grid.exposed.column_gap_css',
            descriptionFallback: 'Resolved column-gap value.'
        },
        {
            name: 'rowGapCss',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: 'components.grid.exposed.row_gap_css',
            descriptionFallback: 'Resolved row-gap value.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.grid.a11y.semantic_root',
                noteFallback: 'The tag prop defaults to "div" — change it to a semantic element when the grid represents a meaningful structure (e.g. tag="ul" with list items, tag="section" for a named region).'
            },
            {
                noteKey: 'components.grid.a11y.no_reorder',
                noteFallback: 'CSS Grid visual reordering (via order or explicit grid-row/column placement) can diverge from DOM order. Keyboard navigation follows DOM order — avoid visual arrangements that confuse users navigating by Tab.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/grid.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'grid.gap-xs',
                value: '{space.1}',
                type: 'dimension',
                descriptionKey: 'components.grid.tokens.gap_xs',
                descriptionFallback: 'Gap size xs (4px).'
            },
            {
                tokenPath: 'grid.gap-sm',
                value: '{space.2}',
                type: 'dimension',
                descriptionKey: 'components.grid.tokens.gap_sm',
                descriptionFallback: 'Gap size sm (8px).'
            },
            {
                tokenPath: 'grid.gap-md',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.grid.tokens.gap_md',
                descriptionFallback: 'Gap size md / default (16px).'
            },
            {
                tokenPath: 'grid.gap-lg',
                value: '{space.6}',
                type: 'dimension',
                descriptionKey: 'components.grid.tokens.gap_lg',
                descriptionFallback: 'Gap size lg (24px).'
            },
            {
                tokenPath: 'grid.gap-xl',
                value: '{space.8}',
                type: 'dimension',
                descriptionKey: 'components.grid.tokens.gap_xl',
                descriptionFallback: 'Gap size xl (32px).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'columns',
                kind: 'select',
                labelKey: 'components.grid.playground.columns',
                labelFallback: 'Columns',
                defaultValue: 3,
                options: [
                    { label: '1', value: 1 },
                    { label: '2', value: 2 },
                    { label: '3', value: 3 },
                    { label: '4', value: 4 },
                    { label: '6', value: 6 },
                    { label: '12', value: 12 },
                    { label: 'auto-fill 200px', value: 'repeat(auto-fill, minmax(200px, 1fr))' }
                ]
            },
            {
                prop: 'gap',
                kind: 'select',
                labelKey: 'components.grid.playground.gap',
                labelFallback: 'Gap',
                defaultValue: 'md',
                options: [
                    { label: 'xs', value: 'xs' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'xl', value: 'xl' }
                ]
            },
            {
                prop: 'alignItems',
                kind: 'select',
                labelKey: 'components.grid.playground.align_items',
                labelFallback: 'Align items',
                defaultValue: 'stretch',
                options: [
                    { label: 'stretch', value: 'stretch' },
                    { label: 'start', value: 'start' },
                    { label: 'end', value: 'end' },
                    { label: 'center', value: 'center' }
                ]
            },
            {
                prop: 'inline',
                kind: 'switch',
                labelKey: 'components.grid.playground.inline',
                labelFallback: 'Inline grid',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
