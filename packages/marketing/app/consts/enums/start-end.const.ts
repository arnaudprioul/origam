import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const START_END_ENUM_DOC: IEnumDoc = {
    slug: 'start-end',
    name: 'START_END',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.start_end.description',
    descriptionFallback: 'TypeScript enum for logical inline placement — start or end.',
    definition: `export enum START_END {
    START = 'start',
    END   = 'end',
}`,
    values: [
        { value: 'START_END.START', descriptionKey: 'enums.detail.start_end.start', descriptionFallback: 'Logical start — maps to left in LTR and right in RTL.' },
        { value: 'START_END.END', descriptionKey: 'enums.detail.start_end.end', descriptionFallback: 'Logical end — maps to right in LTR and left in RTL.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Commons/anchor.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.start_end.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { START_END } from 'origam'

const placement: START_END = START_END.START`,
            lang: 'typescript',
        },
    ],
}
