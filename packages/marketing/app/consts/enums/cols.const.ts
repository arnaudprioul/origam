import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const COLS_ENUM_DOC: IEnumDoc = {
    slug: 'cols',
    name: 'COLS',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.cols.description',
    descriptionFallback: 'Grid column span values (1–12) used by the OrigamCol component to set its width within a 12-column grid.',
    definition: `export enum COLS {
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
        { value: 'COLS.ONE', descriptionKey: 'enums.detail.cols.one', descriptionFallback: 'Span 1 column (8.33 %).' },
        { value: 'COLS.TWO', descriptionKey: 'enums.detail.cols.two', descriptionFallback: 'Span 2 columns (16.67 %).' },
        { value: 'COLS.THREE', descriptionKey: 'enums.detail.cols.three', descriptionFallback: 'Span 3 columns (25 %).' },
        { value: 'COLS.FOUR', descriptionKey: 'enums.detail.cols.four', descriptionFallback: 'Span 4 columns (33.33 %).' },
        { value: 'COLS.FIVE', descriptionKey: 'enums.detail.cols.five', descriptionFallback: 'Span 5 columns (41.67 %).' },
        { value: 'COLS.SIX', descriptionKey: 'enums.detail.cols.six', descriptionFallback: 'Span 6 columns (50 %).' },
        { value: 'COLS.SEVEN', descriptionKey: 'enums.detail.cols.seven', descriptionFallback: 'Span 7 columns (58.33 %).' },
        { value: 'COLS.EIGHT', descriptionKey: 'enums.detail.cols.eight', descriptionFallback: 'Span 8 columns (66.67 %).' },
        { value: 'COLS.NINE', descriptionKey: 'enums.detail.cols.nine', descriptionFallback: 'Span 9 columns (75 %).' },
        { value: 'COLS.TEN', descriptionKey: 'enums.detail.cols.ten', descriptionFallback: 'Span 10 columns (83.33 %).' },
        { value: 'COLS.ELEVEN', descriptionKey: 'enums.detail.cols.eleven', descriptionFallback: 'Span 11 columns (91.67 %).' },
        { value: 'COLS.TWELVE', descriptionKey: 'enums.detail.cols.twelve', descriptionFallback: 'Span 12 columns — full width (100 %).' },
    ],
    usedBy: [
        { slug: 'col', name: 'Col', propName: 'cols' },
    ],
    sourceFile: 'packages/ds/src/enums/Grids/col.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.cols.example',
            titleFallback: 'Using COLS for a half-width column',
            code: `<origam-col :cols="COLS.SIX">Content</origam-col>`,
            lang: 'vue',
        },
    ],
}
