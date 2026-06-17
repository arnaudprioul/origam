import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DOWN_CONST_DOC: IConstDoc = {
    slug: 'down',
    name: 'DOWN',
    category: 'Virtual Scroll',
    descriptionKey: 'consts.catalog.down.description',
    descriptionFallback: 'Scroll direction sentinel equal to +1, representing downward scroll. Paired with UP (-1) and used by the virtual scroller to determine which direction the viewport is moving.',
    definition: `export const DOWN = 1`,
    value: '1',
    usedBy: [
        { name: 'useVirtualScroll' },
        { name: 'OrigamVirtualScroll', slug: 'virtual-scroll' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/virtual.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.down.example',
            titleFallback: 'Using DOWN as a direction sentinel',
            code: `import { DOWN, UP } from 'origam'

const direction = deltaY > 0 ? DOWN : UP
// DOWN === 1, UP === -1`,
            lang: 'typescript',
        },
    ],
}
