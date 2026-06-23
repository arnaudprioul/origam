import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const LEAF_SINGLE_SELECT_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'leaf-single-select-strategy',
    name: 'leafSingleSelectStrategy',
    category: 'Commons',
    icon: 'mdi-leaf-circle-outline',
    descriptionKey: 'utils.catalog.leaf_single_select_strategy.description',
    descriptionFallback: 'Factory that returns a TStrategySelect allowing only a single leaf node to be selected at a time. Selecting a new leaf deselects the previously selected one.',
    signature: `function leafSingleSelectStrategy(mandatory?: boolean): TStrategySelect`,
    params: [
        {
            name: 'mandatory',
            type: 'boolean',
            required: false,
            descriptionKey: 'utils.detail.leaf_single_select_strategy.param_mandatory',
            descriptionFallback: 'When true, the current selection cannot be cleared — the user must select another leaf to move focus.',
        },
    ],
    returns: {
        type: 'TStrategySelect',
        descriptionKey: 'utils.detail.leaf_single_select_strategy.returns',
        descriptionFallback: 'A strategy object with select, in, and out hooks consumed by useNested / OrigamTreeview.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/nested.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.leaf_single_select_strategy.example_basic',
            titleFallback: 'Single-leaf selection for a sidebar tree nav',
            code: `import { leafSingleSelectStrategy } from 'origam'

// In a Treeview, pass the strategy via the selectStrategy prop:
// <origam-treeview :select-strategy="leafSingleSelectStrategy(true)" />`,
            lang: 'typescript',
        },
    ],
    related: ['leaf-select-strategy'],
}
