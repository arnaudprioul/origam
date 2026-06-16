/**
 * /components/table — full documentation data for OrigamTable.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Table/table.interface.ts
 * cross-checked against packages/ds/src/components/Table/OrigamTable.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const TABLE_DOC: IComponentDoc = {
    slug: 'table',
    name: 'Table',
    tag: 'origam-table',
    icon: 'mdi-table',
    category: 'Data Display',
    descriptionKey: 'components.catalog.table.description',
    descriptionFallback: 'Semantic HTML table wrapper with optional fixed header/footer, elevation, rounded corners and hover row styling.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-table--design',
    docUrl: 'http://localhost:4000/components/Table/OrigamTable',

    family: [],

    related: [
        {
            slug: 'data-table',
            name: 'DataTable',
            kind: 'component',
            descriptionKey: 'components.catalog.data_table.description',
            descriptionFallback: 'Feature-rich data table with sorting, filtering, pagination and virtual scroll.'
        }
    ],

    props: [
        {
            name: 'fixedHeader',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.table.props.fixed_header.description',
            descriptionFallback: 'Sticks the thead to the top of the scrollable area when the table overflows vertically.'
        },
        {
            name: 'fixedFooter',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.table.props.fixed_footer.description',
            descriptionFallback: 'Sticks the tfoot to the bottom of the scrollable area.'
        },
        {
            name: 'caption',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.table.props.caption.description',
            descriptionFallback: 'Accessible table caption text rendered as a <caption> element.'
        },
        {
            name: 'captionVisible',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.table.props.caption_visible.description',
            descriptionFallback: 'When false the caption is visually hidden but remains accessible to screen readers.'
        },
        {
            name: 'ariaRowcount',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.table.props.aria_rowcount.description',
            descriptionFallback: 'Total row count passed as aria-rowcount — useful for virtual or paginated tables where not all rows are in the DOM.'
        },
        {
            name: 'hover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.table.props.hover.description',
            descriptionFallback: 'Highlights rows on mouse hover.'
        },
        {
            name: 'density',
            type: { label: "'default' | 'compact' | 'comfortable'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.table.props.density.description',
            descriptionFallback: 'Adjusts cell padding density.'
        },
        {
            name: 'elevation',
            type: { label: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.table.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token.'
        },
        {
            name: 'rounded',
            type: { label: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.table.props.rounded.description',
            descriptionFallback: 'Border-radius token.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.table.props.border.description',
            descriptionFallback: 'Applies a border to the table container.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.table.props.height.description',
            descriptionFallback: 'Constrains the table height — triggers the sticky header/footer scroll container.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.table.props.width.description',
            descriptionFallback: 'Overrides the table width.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'table'",
            descriptionKey: 'components.table.props.tag.description',
            descriptionFallback: 'Root HTML element — defaults to the semantic <table> element.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.table.slots.default.description',
            descriptionFallback: 'Full table content — thead, tbody, tfoot.'
        },
        {
            slot: 'top',
            slotProps: '—',
            descriptionKey: 'components.table.slots.top.description',
            descriptionFallback: 'Content rendered above the table (search bar, title…).'
        },
        {
            slot: 'bottom',
            slotProps: '—',
            descriptionKey: 'components.table.slots.bottom.description',
            descriptionFallback: 'Content rendered below the table (pagination…).'
        }
    ],

    examples: [
        {
            titleKey: 'components.table.examples.basic.title',
            titleFallback: 'Basic table',
            lang: 'vue',
            code: `<template>
  <origam-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Alice</td><td>Admin</td><td>Active</td></tr>
      <tr><td>Bob</td><td>Editor</td><td>Inactive</td></tr>
    </tbody>
  </origam-table>
</template>`
        },
        {
            titleKey: 'components.table.examples.fixed_header.title',
            titleFallback: 'Fixed header',
            lang: 'vue',
            code: `<template>
  <origam-table fixed-header height="300">
    <thead>
      <tr><th>Column A</th><th>Column B</th></tr>
    </thead>
    <tbody>
      <tr v-for="n in 20" :key="n">
        <td>Row {{ n }}, A</td>
        <td>Row {{ n }}, B</td>
      </tr>
    </tbody>
  </origam-table>
</template>`
        }
    ]
}
