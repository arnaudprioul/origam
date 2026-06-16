/**
 * /components/grids — full documentation data for the Grids family.
 *
 * SOURCE OF TRUTH:
 *   packages/ds/src/interfaces/Grids/col.interface.ts
 *   packages/ds/src/interfaces/Grids/container.interface.ts
 *   packages/ds/src/interfaces/Grids/row.interface.ts
 *   packages/ds/src/interfaces/Grids/spacer.interface.ts
 * cross-checked against:
 *   packages/ds/src/components/Grids/OrigamCol.vue
 *   packages/ds/src/components/Grids/OrigamContainer.vue
 *   packages/ds/src/components/Grids/OrigamRow.vue
 *   packages/ds/src/components/Grids/OrigamSpacer.vue
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const GRIDS_DOC: IComponentDoc = {
    slug: 'grids',
    name: 'Grids',
    tag: 'origam-container',
    icon: 'mdi-view-grid',
    category: 'Layout',
    descriptionKey: 'components.catalog.grids.description',
    descriptionFallback: 'Responsive 12-column grid system based on CSS Grid. Compose Container, Row, Col and Spacer to lay out any page or component.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-grids--design',
    docUrl: 'http://localhost:4000/components/Grids/OrigamGrids',

    family: [
        {
            slug: 'grids-container',
            name: 'Container',
            descriptionKey: 'components.catalog.grids_container.description',
            descriptionFallback: 'Page-level structural wrapper with optional fluid / fullscreen modes.'
        },
        {
            slug: 'row',
            name: 'Row',
            descriptionKey: 'components.catalog.row.description',
            descriptionFallback: 'Horizontal row that wraps Col children with configurable gutters and direction.'
        },
        {
            slug: 'grids-col',
            name: 'Col',
            descriptionKey: 'components.catalog.grids_col.description',
            descriptionFallback: 'Responsive column that spans 1–12 grid tracks with per-breakpoint overrides.'
        },
        {
            slug: 'grids-spacer',
            name: 'Spacer',
            descriptionKey: 'components.catalog.grids_spacer.description',
            descriptionFallback: 'Invisible flex-grow element that fills remaining space between cols.'
        }
    ],

    // ── OrigamContainer props ────────────────────────────────────────────
    props: [
        {
            name: 'fluid',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.grids.props.fluid.description',
            descriptionFallback: 'Removes the max-width constraint so the container expands to full viewport width.'
        },
        {
            name: 'fullscreen',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.grids.props.fullscreen.description',
            descriptionFallback: 'Forces the container to fill 100vw × 100vh.'
        },
        // ── ITagProps ─────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.grids.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root of Container / Row / Col / Spacer.'
        },
        // ── IDimensionProps ───────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.height.description',
            descriptionFallback: 'Explicit height override (Container / Col). Accepts CSS length or number → px.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.width.description',
            descriptionFallback: 'Explicit width override.'
        },
        // ── OrigamRow props ───────────────────────────────────────────────
        {
            name: 'gutters',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.gutters.description',
            descriptionFallback: 'Gap between Col children. Accepts a CSS length, a number (px) or a token name.'
        },
        {
            name: 'direction',
            type: { label: "'row' | 'row-reverse' | 'column' | 'column-reverse'", slug: '', kind: 'primitive' },
            defaultValue: "'row'",
            descriptionKey: 'components.grids.props.direction.description',
            descriptionFallback: 'Flex direction of the Row.'
        },
        // ── IAlignProps / IJustifyProps ───────────────────────────────────
        {
            name: 'align',
            type: { label: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.align.description',
            descriptionFallback: 'Aligns Col children along the cross axis (Row).'
        },
        {
            name: 'justify',
            type: { label: "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.justify.description',
            descriptionFallback: 'Distributes Col children along the main axis (Row).'
        },
        // ── OrigamCol responsive span props ──────────────────────────────
        {
            name: 'cols',
            type: { label: "'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'auto'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.cols.description',
            descriptionFallback: 'Number of columns to span at all breakpoints (default / xs).'
        },
        {
            name: 'sm',
            type: { label: 'TCols', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.sm.description',
            descriptionFallback: 'Column span at the sm breakpoint (≥ 600 px).'
        },
        {
            name: 'md',
            type: { label: 'TCols', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.md.description',
            descriptionFallback: 'Column span at the md breakpoint (≥ 960 px).'
        },
        {
            name: 'lg',
            type: { label: 'TCols', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.lg.description',
            descriptionFallback: 'Column span at the lg breakpoint (≥ 1280 px).'
        },
        {
            name: 'xl',
            type: { label: 'TCols', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.xl.description',
            descriptionFallback: 'Column span at the xl breakpoint (≥ 1920 px).'
        },
        {
            name: 'offset',
            type: { label: "'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.offset.description',
            descriptionFallback: 'Offset in grid columns from the left at the default breakpoint.'
        },
        {
            name: 'order',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.grids.props.order.description',
            descriptionFallback: 'CSS order for the Col inside the Row.'
        },
        // ── IBorderProps ──────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.grids.props.border.description',
            descriptionFallback: 'Applies a border to the element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.grids.slots.default.description',
            descriptionFallback: 'Content placed inside the Container / Row / Col / Spacer.'
        }
    ],

    examples: [
        {
            titleKey: 'components.grids.examples.basic.title',
            titleFallback: 'Basic 12-col grid',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row>
      <origam-col cols="12" md="8">Main content</origam-col>
      <origam-col cols="12" md="4">Sidebar</origam-col>
    </origam-row>
  </origam-container>
</template>`
        },
        {
            titleKey: 'components.grids.examples.responsive.title',
            titleFallback: 'Responsive columns',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row :gutters="16">
      <origam-col v-for="n in 4" :key="n" cols="12" sm="6" lg="3">
        Card {{ n }}
      </origam-col>
    </origam-row>
  </origam-container>
</template>`
        },
        {
            titleKey: 'components.grids.examples.spacer.title',
            titleFallback: 'Spacer to push items apart',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row>
      <origam-col>Left</origam-col>
      <origam-spacer />
      <origam-col>Right</origam-col>
    </origam-row>
  </origam-container>
</template>`
        }
    ]
}
