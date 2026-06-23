import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const UP_CONST_DOC: IConstDoc = {
    slug: 'up',
    name: 'UP',
    category: 'Virtual Scroll',
    descriptionKey: 'consts.catalog.up.description',
    descriptionFallback: 'Direction sentinel used by the virtual scroll engine: UP = -1 indicates scrolling toward lower indices (top of the list). Paired with DOWN = 1.',
    definition: `export const UP = -1`,
    value: '-1',
    usedBy: [
        { name: 'useVirtual' },
        { name: 'OrigamVirtualScroll' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/virtual.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.up.example',
            titleFallback: 'Using UP and DOWN as direction tokens',
            code: `import { UP, DOWN } from 'origam'

const direction = delta < 0 ? UP : DOWN
// UP = -1, DOWN = 1`,
            lang: 'typescript',
        },
    ],
}
