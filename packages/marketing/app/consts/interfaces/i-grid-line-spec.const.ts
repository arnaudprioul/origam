import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GRID_LINE_SPEC_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-grid-line-spec',
    name: 'IGridLineSpec',
    category: 'Layout',
    descriptionKey: 'interfaces.catalog.i_grid_line_spec.description',
    descriptionFallback: 'Object syntax for a CSS grid line specification used by OrigamGridItem — express column/row placement with start, end, or span without writing raw CSS grid syntax.',
    definition: `export interface IGridLineSpec {
    start?: number | string
    end?: number | string
    span?: number
}`,
    extends: [],
    props: [
        { name: 'start', type: 'number | string', optional: true, descriptionFallback: 'Inclusive starting grid line. Accepts a number or a named line.' },
        { name: 'end', type: 'number | string', optional: true, descriptionFallback: 'Exclusive ending grid line. Accepts a number or a named line.' },
        { name: 'span', type: 'number', optional: true, descriptionFallback: 'Span N tracks from start. Wins over end when both are set.' },
    ],
    usedBy: [
        { slug: 'grid-item', name: 'GridItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Grid/grid-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_grid_line_spec.example',
            titleFallback: 'Spanning two columns from a named line',
            code: `<OrigamGridItem :column="{ start: 'sidebar-start', span: 2 }" />`,
            lang: 'vue',
        },
    ],
}
