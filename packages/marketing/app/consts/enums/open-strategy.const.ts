import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const OPEN_STRATEGY_ENUM_DOC: IEnumDoc = {
    slug: 'open-strategy',
    name: 'OPEN_STRATEGY',
    category: 'Behavior',
    descriptionKey: 'enums.catalog.open_strategy.description',
    descriptionFallback: 'TypeScript enum controlling how tree/list nodes open — single, multiple, or list mode.',
    definition: `export enum OPEN_STRATEGY {
    SINGLE   = 'single',
    MULTIPLE = 'multiple',
    LIST     = 'list'
}`,
    values: [
        { value: 'OPEN_STRATEGY.SINGLE', descriptionKey: 'enums.detail.open_strategy.single', descriptionFallback: 'Only one node can be open at a time — opening a new one closes the previous.' },
        { value: 'OPEN_STRATEGY.MULTIPLE', descriptionKey: 'enums.detail.open_strategy.multiple', descriptionFallback: 'Any number of nodes can be open simultaneously.' },
        { value: 'OPEN_STRATEGY.LIST', descriptionKey: 'enums.detail.open_strategy.list', descriptionFallback: 'List mode — nodes open as a flat sequential list.' },
    ],
    usedBy: [
        { slug: 'treeview', name: 'Treeview', propName: 'openStrategy' },
        { slug: 'list-group', name: 'ListGroup', propName: 'openStrategy' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/nested.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.open_strategy.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { OPEN_STRATEGY } from 'origam'

const strategy: OPEN_STRATEGY = OPEN_STRATEGY.SINGLE`,
            lang: 'typescript',
        },
    ],
}
