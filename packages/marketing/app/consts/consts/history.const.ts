import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const HISTORY_CONST_DOC: IConstDoc = {
    slug: 'history',
    name: 'HISTORY',
    category: 'Internals',
    descriptionKey: 'consts.catalog.history.description',
    descriptionFallback: 'Maximum number of entries kept in the virtual scroll look-behind buffer. Controls how many previously rendered items are retained for smooth backwards scrolling.',
    definition: `export const HISTORY = 20`,
    value: '20',
    usedBy: [
        { name: 'useVirtualScroll' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.history.example',
            titleFallback: 'Reading the look-behind buffer size',
            code: `import { HISTORY } from 'origam'

console.log(HISTORY) // 20`,
            lang: 'typescript',
        },
    ],
}
