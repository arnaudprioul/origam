import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const SELECT_STRATEGY_ENUM_DOC: IEnumDoc = {
    slug: 'select-strategy',
    name: 'SELECT_STRATEGY',
    category: 'Behavior',
    descriptionKey: 'enums.catalog.select_strategy.description',
    descriptionFallback: 'TypeScript enum for tree/list selection strategy — single-leaf, leaf, independent, single-independent, or classic.',
    definition: `export enum SELECT_STRATEGY {
    SINGLE_LEAF        = 'single-leaf',
    LEAF               = 'leaf',
    INDEPENDENT        = 'independent',
    SINGLE_INDEPENDENT = 'single-independent',
    CLASSIC            = 'classic'
}`,
    values: [
        { value: 'SELECT_STRATEGY.SINGLE_LEAF', descriptionKey: 'enums.detail.select_strategy.single_leaf', descriptionFallback: 'Only one leaf node can be selected at a time; parent nodes are not selectable.' },
        { value: 'SELECT_STRATEGY.LEAF', descriptionKey: 'enums.detail.select_strategy.leaf', descriptionFallback: 'Any number of leaf nodes can be selected; parent nodes are not selectable.' },
        { value: 'SELECT_STRATEGY.INDEPENDENT', descriptionKey: 'enums.detail.select_strategy.independent', descriptionFallback: 'Each node is selected independently — selecting a parent does not affect its children.' },
        { value: 'SELECT_STRATEGY.SINGLE_INDEPENDENT', descriptionKey: 'enums.detail.select_strategy.single_independent', descriptionFallback: 'Only one node can be selected at a time, regardless of type (leaf or branch).' },
        { value: 'SELECT_STRATEGY.CLASSIC', descriptionKey: 'enums.detail.select_strategy.classic', descriptionFallback: 'Classic cascading selection — selecting a parent automatically selects or deselects all its children.' },
    ],
    usedBy: [
        { slug: 'treeview', name: 'Treeview', propName: 'selectStrategy' },
        { slug: 'list-group', name: 'ListGroup', propName: 'selectStrategy' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/nested.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.select_strategy.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { SELECT_STRATEGY } from 'origam'

const strategy: SELECT_STRATEGY = SELECT_STRATEGY.CLASSIC`,
            lang: 'typescript',
        },
    ],
}
