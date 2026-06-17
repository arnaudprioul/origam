import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const LINES_ENUM_DOC: IEnumDoc = {
    slug: 'lines',
    name: 'LINES',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.lines.description',
    descriptionFallback: 'Number of text lines displayed per list item (one, two, three).',
    definition: `export enum LINES {
    ONE   = 'one',
    TWO   = 'two',
    THREE = 'three',
}`,
    values: [
        { value: 'LINES.ONE', descriptionKey: 'enums.detail.lines.one', descriptionFallback: 'Display only one line of text per item.' },
        { value: 'LINES.TWO', descriptionKey: 'enums.detail.lines.two', descriptionFallback: 'Display up to two lines of text per item.' },
        { value: 'LINES.THREE', descriptionKey: 'enums.detail.lines.three', descriptionFallback: 'Display up to three lines of text per item.' },
    ],
    usedBy: [
        { slug: 'list', name: 'List', propName: 'lines' },
    ],
    sourceFile: 'packages/ds/src/enums/List/list.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.lines.example',
            titleFallback: 'Using LINES in script setup',
            code: `import { LINES } from 'origam'

const lines: LINES = LINES.TWO`,
            lang: 'typescript',
        },
    ],
}
