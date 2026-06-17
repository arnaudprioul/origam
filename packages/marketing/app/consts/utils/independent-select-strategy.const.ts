import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const INDEPENDENT_SELECT_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'independent-select-strategy',
    name: 'independentSelectStrategy',
    category: 'Commons',
    icon: 'mdi-checkbox-multiple-outline',
    descriptionKey: 'utils.catalog.independent_select_strategy.description',
    descriptionFallback: 'Returns a TStrategySelect object implementing independent multi-selection: each item is toggled independently without affecting siblings. An optional mandatory flag prevents deselecting the last selected item.',
    signature: 'function independentSelectStrategy(mandatory?: boolean): TStrategySelect',
    params: [
        {
            name: 'mandatory',
            type: 'boolean',
            required: false,
            descriptionKey: 'utils.detail.independent_select_strategy.param_mandatory',
            descriptionFallback: 'When true, the strategy prevents deselecting an item if it is the only one currently selected.',
        },
    ],
    returns: {
        type: 'TStrategySelect',
        descriptionKey: 'utils.detail.independent_select_strategy.returns',
        descriptionFallback: 'A strategy object with select, in, and out methods consumed by useNestedItems.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/nested.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.independent_select_strategy.example_basic',
            titleFallback: 'Multi-select without parent cascade',
            code: `import { independentSelectStrategy } from 'origam'

const strategy = independentSelectStrategy()
// Each checkbox toggles independently — no parent/child cascade`,
            lang: 'typescript',
        },
    ],
    related: ['independent-single-select-strategy', 'leaf-select-strategy'],
}
