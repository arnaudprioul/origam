import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const COLS_TYPE_DOC: ITypeDoc = {
    slug: 'cols',
    name: 'TCols',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.cols.description',
    descriptionFallback: 'Column span value for OrigamCol — accepts a numeric 1–12 grid column count, "auto" (content-sized), or true (fill remaining space).',
    definition: `export type TCols = \`\${COLS}\` | true | 'auto'

// Where COLS is:
export enum COLS {
    ONE    = 1,
    TWO    = 2,
    THREE  = 3,
    FOUR   = 4,
    FIVE   = 5,
    SIX    = 6,
    SEVEN  = 7,
    EIGHT  = 8,
    NINE   = 9,
    TEN    = 10,
    ELEVEN = 11,
    TWELVE = 12,
}`,
    values: [
        { value: '1', descriptionKey: 'types.detail.cols.1', descriptionFallback: 'Spans 1 column out of 12 — approximately 8.33 % of the row width.' },
        { value: '2', descriptionKey: 'types.detail.cols.2', descriptionFallback: 'Spans 2 columns — approximately 16.67 % of the row width.' },
        { value: '3', descriptionKey: 'types.detail.cols.3', descriptionFallback: 'Spans 3 columns — one quarter of the row (25 %).' },
        { value: '4', descriptionKey: 'types.detail.cols.4', descriptionFallback: 'Spans 4 columns — one third of the row (33.33 %).' },
        { value: '5', descriptionKey: 'types.detail.cols.5', descriptionFallback: 'Spans 5 columns — approximately 41.67 % of the row width.' },
        { value: '6', descriptionKey: 'types.detail.cols.6', descriptionFallback: 'Spans 6 columns — exactly half the row width.' },
        { value: '7', descriptionKey: 'types.detail.cols.7', descriptionFallback: 'Spans 7 columns — approximately 58.33 % of the row width.' },
        { value: '8', descriptionKey: 'types.detail.cols.8', descriptionFallback: 'Spans 8 columns — two thirds of the row (66.67 %).' },
        { value: '9', descriptionKey: 'types.detail.cols.9', descriptionFallback: 'Spans 9 columns — three quarters of the row (75 %).' },
        { value: '10', descriptionKey: 'types.detail.cols.10', descriptionFallback: 'Spans 10 columns — approximately 83.33 % of the row width.' },
        { value: '11', descriptionKey: 'types.detail.cols.11', descriptionFallback: 'Spans 11 columns — approximately 91.67 % of the row width.' },
        { value: '12', descriptionKey: 'types.detail.cols.12', descriptionFallback: 'Spans 12 columns — the full row width.' },
        { value: 'auto', descriptionKey: 'types.detail.cols.auto', descriptionFallback: 'Column shrinks to fit its content — no fixed grid-column span.' },
        { value: 'true', descriptionKey: 'types.detail.cols.true', descriptionFallback: 'Column expands to fill all remaining space in the row (flex-grow: 1 equivalent).' },
    ],
    usedBy: [
        { slug: 'col', name: 'Col', propName: 'cols' },
        { slug: 'col', name: 'Col', propName: 'sm' },
        { slug: 'col', name: 'Col', propName: 'md' },
        { slug: 'col', name: 'Col', propName: 'lg' },
        { slug: 'col', name: 'Col', propName: 'xl' },
        { slug: 'col', name: 'Col', propName: 'xxl' },
    ],
    sourceFile: 'packages/ds/src/types/Grids/col.type.ts',
    examples: [
        {
            titleKey: 'types.detail.cols.example',
            titleFallback: 'Responsive 3-column layout collapsing to 12 on mobile',
            code: `<origam-row>
  <origam-col :cols="12" :md="4">First</origam-col>
  <origam-col :cols="12" :md="4">Second</origam-col>
  <origam-col :cols="12" :md="4">Third</origam-col>
</origam-row>`,
            lang: 'html',
        },
    ],
}
