import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const LEAF_SELECT_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'leaf-select-strategy',
    name: 'leafSelectStrategy',
    category: 'Commons',
    icon: 'mdi-leaf',
    descriptionKey: 'utils.catalog.leaf_select_strategy.description',
    descriptionFallback: 'Factory that returns a TStrategySelect which only allows leaf nodes (nodes without children) to be selected. Branch nodes are ignored during selection.',
    signature: `function leafSelectStrategy(mandatory?: boolean): TStrategySelect`,
    params: [
        {
            name: 'mandatory',
            type: 'boolean',
            required: false,
            descriptionKey: 'utils.detail.leaf_select_strategy.param_mandatory',
            descriptionFallback: 'When true, at least one item must always remain selected (deselect is blocked if it would empty the selection).',
        },
    ],
    returns: {
        type: 'TStrategySelect',
        descriptionKey: 'utils.detail.leaf_select_strategy.returns',
        descriptionFallback: 'A strategy object with select, in, and out hooks consumed by useNested / OrigamTreeview.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/nested.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.leaf_select_strategy.example_basic',
            titleFallback: 'Apply leaf-only selection to a tree',
            code: `import { leafSelectStrategy } from 'origam'

// In a Treeview, pass the strategy via the selectStrategy prop:
// <origam-treeview :select-strategy="leafSelectStrategy()" />`,
            lang: 'typescript',
        },
    ],
    related: ['leaf-single-select-strategy'],
}
