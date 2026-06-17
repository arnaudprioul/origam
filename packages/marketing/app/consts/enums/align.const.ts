import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const ALIGN_ENUM_DOC: IEnumDoc = {
    slug: 'align',
    name: 'ALIGN',
    category: 'Layout & Positioning',
    descriptionKey: 'enums.catalog.align.description',
    descriptionFallback: 'TypeScript enum for cross-axis alignment in flex/grid layouts (start, end, center, baseline, stretch).',
    definition: `export enum ALIGN {
    START    = 'start',
    END      = 'end',
    CENTER   = 'center',
    BASELINE = 'baseline',
    STRETCH  = 'stretch',
}`,
    values: [
        { value: 'ALIGN.START', descriptionKey: 'enums.detail.align.start', descriptionFallback: 'Align items to the start of the cross axis.' },
        { value: 'ALIGN.END', descriptionKey: 'enums.detail.align.end', descriptionFallback: 'Align items to the end of the cross axis.' },
        { value: 'ALIGN.CENTER', descriptionKey: 'enums.detail.align.center', descriptionFallback: 'Center items on the cross axis.' },
        { value: 'ALIGN.BASELINE', descriptionKey: 'enums.detail.align.baseline', descriptionFallback: 'Align items along their text baseline.' },
        { value: 'ALIGN.STRETCH', descriptionKey: 'enums.detail.align.stretch', descriptionFallback: 'Stretch items to fill the cross axis.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', propName: 'align' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/align.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.align.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { ALIGN } from 'origam'

const myAlign: ALIGN = ALIGN.CENTER`,
            lang: 'typescript',
        },
    ],
}
