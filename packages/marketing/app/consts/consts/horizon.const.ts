import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const HORIZON_CONST_DOC: IConstDoc = {
    slug: 'horizon',
    name: 'HORIZON',
    category: 'Internals',
    descriptionKey: 'consts.catalog.horizon.description',
    descriptionFallback: 'Maximum number of entries kept in the virtual scroll look-ahead buffer. Controls how many upcoming items are pre-rendered to avoid blank patches during fast scrolling.',
    definition: `export const HORIZON = 100`,
    value: '100',
    usedBy: [
        { name: 'useVirtualScroll' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.horizon.example',
            titleFallback: 'Reading the look-ahead buffer size',
            code: `import { HORIZON } from 'origam'

console.log(HORIZON) // 100`,
            lang: 'typescript',
        },
    ],
}
