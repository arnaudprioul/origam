/**
 * /components/grid-item — full documentation data for OrigamGridItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Grid/grid-item.interface.ts  (props)
 *   - packages/ds/src/components/Grid/OrigamGridItem.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/grid.json                  (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const GRID_ITEM_DOC: IComponentDoc = {
    slug: 'grid-item',
    name: 'GridItem',
    tag: 'origam-grid-item',
    icon: 'mdi-grid',
    category: 'Layout',
    descriptionKey: 'components.catalog.grid_item.description',
    descriptionFallback: 'Grid placement wrapper that serialises column, row and area props into CSS Grid shorthand.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-grid--design',
    docUrl: 'http://localhost:4000/components/Grid/OrigamGrid',

    parentSlug: 'grid',

    family: [
        {
            slug: 'grid',
            name: 'Grid',
            descriptionKey: 'components.catalog.grid.description',
            descriptionFallback: 'CSS Grid container with token-driven gap, areas, columns and rows.'
        }
    ],

    related: [
        {
            slug: 'col',
            name: 'Col',
            kind: 'component',
            descriptionKey: 'components.catalog.col.description',
            descriptionFallback: 'Flexbox column used with the Grids/Row system.'
        }
    ],

    props: [
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.grid_item.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root of the grid item.'
        },
        {
            name: 'column',
            type: { label: 'IGridLineSpec | string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid_item.props.column.description',
            descriptionFallback: 'Inline-axis placement (grid-column). Accepts a line spec object { start, end, span }, a CSS string (e.g. "1 / 5"), or a number.'
        },
        {
            name: 'row',
            type: { label: 'IGridLineSpec | string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid_item.props.row.description',
            descriptionFallback: 'Block-axis placement (grid-row). Same accepted shapes as column.'
        },
        {
            name: 'area',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid_item.props.area.description',
            descriptionFallback: 'grid-area name. When set, overrides column and row. Use with the parent grid areas prop.'
        },
        {
            name: 'alignSelf',
            type: { label: 'TGridPlaceSelf', slug: 'grid-place-self', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid_item.props.align_self.description',
            descriptionFallback: 'Per-item align-self override. Falls back to the parent grid alignItems when unset.'
        },
        {
            name: 'justifySelf',
            type: { label: 'TGridPlaceSelf', slug: 'grid-place-self', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grid_item.props.justify_self.description',
            descriptionFallback: 'Per-item justify-self override. Falls back to the parent grid justifyItems when unset.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.grid_item.slots.default.description',
            descriptionFallback: 'Content placed inside this grid cell.'
        }
    ],

    examples: [
        {
            titleKey: 'components.grid_item.examples.basic.title',
            titleFallback: 'Column placement',
            lang: 'vue',
            code: `<template>
  <origam-grid :columns="4" gap="md">
    <origam-grid-item :column="{ start: 1, span: 2 }">
      Spans 2 columns
    </origam-grid-item>
    <origam-grid-item :column="{ start: 3, span: 2 }">
      Spans 2 columns
    </origam-grid-item>
  </origam-grid>
</template>`
        },
        {
            titleKey: 'components.grid_item.examples.area.title',
            titleFallback: 'Named area',
            lang: 'vue',
            code: `<template>
  <origam-grid :areas="['header header', 'sidebar main']">
    <origam-grid-item area="header">Header</origam-grid-item>
    <origam-grid-item area="sidebar">Sidebar</origam-grid-item>
    <origam-grid-item area="main">Main</origam-grid-item>
  </origam-grid>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-grid-item',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamGridItem',
        svgDesc: 'Schematic of the GridItem component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="644" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="78" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">grid-column / grid-row / grid-area</text>
  <rect x="60" y="90" width="580" height="48" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="119" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot</text>
  <circle cx="36" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="68" cy="98" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="68" y="102.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <line x1="46" y1="44" x2="88" y2="28" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="92" y="28" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-grid-item</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-grid-item&gt;</code> — 2 parts: the root element carrying grid placement styles, and the default slot hosting the cell content.`,
        legend: [
            {
                num: 1,
                cls: '.origam-grid-item',
                descriptionKey: 'components.grid_item.anatomy.root',
                descriptionFallback: 'Root element. Sets <code>grid-column</code>, <code>grid-row</code> or <code>grid-area</code> via inline styles. Also applies <code>min-width: 0; min-height: 0</code> to prevent overflow.'
            },
            {
                num: 2,
                cls: '.origam-grid-item #default',
                descriptionKey: 'components.grid_item.anatomy.slot',
                descriptionFallback: 'Default slot hosting the cell content. No constraints imposed — content defines its own sizing.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'columnCss',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: 'components.grid_item.exposed.column_css',
            descriptionFallback: 'Serialised grid-column value derived from the column prop. Readable by parent tooling.'
        },
        {
            name: 'rowCss',
            type: 'ComputedRef<string | undefined>',
            descriptionKey: 'components.grid_item.exposed.row_css',
            descriptionFallback: 'Serialised grid-row value derived from the row prop.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.grid_item.a11y.semantic_note',
                noteFallback: 'GridItem is a layout wrapper with no semantic role. Place semantic content inside the default slot. The tag prop lets you promote it to a meaningful element (e.g. tag="article").'
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
                descriptionKey: 'components.grid_item.tokens.gap_xs',
                descriptionFallback: 'Extra-small gap token shared with parent OrigamGrid.'
            },
            {
                tokenPath: 'grid.gap-md',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.grid_item.tokens.gap_md',
                descriptionFallback: 'Medium gap token shared with parent OrigamGrid.'
            }
        ]
    } satisfies IComponentTokens
}
