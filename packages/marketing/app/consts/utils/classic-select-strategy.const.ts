import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CLASSIC_SELECT_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'classic-select-strategy',
    name: 'classicSelectStrategy',
    category: 'Commons',
    icon: 'mdi-checkbox-multiple-marked-outline',
    descriptionKey: 'utils.catalog.classic_select_strategy.description',
    descriptionFallback: 'Returns a TStrategySelect object that implements classic tree-selection behaviour: selecting a node propagates to all its descendants and recalculates the indeterminate state of its ancestors.',
    signature: `function classicSelectStrategy(mandatory?: boolean): TStrategySelect`,
    params: [
        {
            name: 'mandatory',
            type: 'boolean',
            required: false,
            descriptionKey: 'utils.detail.classic_select_strategy.param_mandatory',
            descriptionFallback: 'When true, at least one item must remain selected — deselecting the last selected item is a no-op.',
        },
    ],
    returns: {
        type: 'TStrategySelect',
        descriptionKey: 'utils.detail.classic_select_strategy.returns',
        descriptionFallback: 'A strategy object with select and in methods that drive tree-selection state in OrigamTreeview and similar components.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/nested.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.classic_select_strategy.example_basic',
            titleFallback: 'Pass to OrigamTreeview',
            code: `import { classicSelectStrategy } from 'origam'

// Used internally by OrigamTreeview via the selectStrategy prop
<origam-treeview select-strategy="classic" />`,
            lang: 'html',
        },
    ],
    related: ['cyclic-movement'],
}
