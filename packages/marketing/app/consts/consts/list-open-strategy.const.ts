import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const LIST_OPEN_STRATEGY_CONST_DOC: IConstDoc = {
    slug: 'list-open-strategy',
    name: 'LIST_OPEN_STRATEGY',
    category: 'Navigation & Disclosure',
    descriptionKey: 'consts.catalog.list_open_strategy.description',
    descriptionFallback: 'Open strategy for list-style navigation (e.g. OrigamList). Uses MULTIPLE_OPEN_STRATEGY for opening and a custom select handler that closes all siblings not on the path from the selected item to the root.',
    definition: `export const LIST_OPEN_STRATEGY: TStrategyOpen = {
    open: MULTIPLE_OPEN_STRATEGY.open,
    select: ({ id, value, opened, parents }) => {
        if (!value) return opened
        const path: Array<unknown> = []
        let parent = parents.get(id)
        while (parent != null) {
            path.push(parent)
            parent = parents.get(parent)
        }
        return new Set(path)
    }
}`,
    values: [
        { value: 'open', descriptionKey: 'consts.detail.list_open_strategy.open', descriptionFallback: 'Delegates to MULTIPLE_OPEN_STRATEGY.open — allows several items open simultaneously.' },
        { value: 'select', descriptionKey: 'consts.detail.list_open_strategy.select', descriptionFallback: 'On selection, keeps only the ancestor path open; collapses all other branches.' },
    ],
    usedBy: [
        { name: 'OrigamList', slug: 'list' },
        { name: 'useNested' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/nested.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.list_open_strategy.example',
            titleFallback: 'Providing LIST_OPEN_STRATEGY to a nested list',
            code: `import { LIST_OPEN_STRATEGY } from 'origam'

// Pass as the openStrategy prop of OrigamList
// <origam-list :open-strategy="LIST_OPEN_STRATEGY" />`,
            lang: 'typescript',
        },
    ],
}
