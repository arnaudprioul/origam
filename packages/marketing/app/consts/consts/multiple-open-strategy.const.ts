import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MULTIPLE_OPEN_STRATEGY_CONST_DOC: IConstDoc = {
    slug: 'multiple-open-strategy',
    name: 'MULTIPLE_OPEN_STRATEGY',
    category: 'Navigation & Disclosure',
    descriptionKey: 'consts.catalog.multiple_open_strategy.description',
    descriptionFallback: 'Open strategy that allows any number of nested items to be expanded simultaneously. When opening an item all its ancestors are also opened; when closing only the targeted item is removed from the opened set. Contrast with SINGLE_OPEN_STRATEGY which collapses siblings. Used by OrigamList, OrigamTreeview and any nested component.',
    definition: `export const MULTIPLE_OPEN_STRATEGY: TStrategyOpen = {
    open: ({id, value, opened, parents}) => {
        if (value) {
            let parent = parents.get(id)
            opened.add(id)
            while (parent != null && parent !== id) {
                opened.add(parent)
                parent = parents.get(parent)
            }
            return opened
        } else {
            opened.delete(id)
        }
        return opened
    },
    select: () => null
}`,
    values: [
        { value: 'open: fn', descriptionKey: 'consts.detail.multiple_open_strategy.open', descriptionFallback: 'Adds the item and all its ancestors to the opened set; removes the item on close.' },
        { value: 'select: () => null', descriptionKey: 'consts.detail.multiple_open_strategy.select', descriptionFallback: 'Selection is not tracked by this strategy (returns null).' },
    ],
    usedBy: [
        { name: 'OrigamList', slug: 'list' },
        { name: 'OrigamTreeview', slug: 'treeview' },
        { name: 'useNested' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/nested.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.multiple_open_strategy.example',
            titleFallback: 'Applying MULTIPLE_OPEN_STRATEGY to a list',
            code: `import { MULTIPLE_OPEN_STRATEGY } from 'origam'

// All items can be open at the same time
// <origam-list :open-strategy="MULTIPLE_OPEN_STRATEGY" />`,
            lang: 'typescript',
        },
    ],
}
