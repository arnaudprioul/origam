import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const INDEPENDENT_SINGLE_SELECT_STRATEGY_UTIL_DOC: IUtilDoc = {
    slug: 'independent-single-select-strategy',
    name: 'independentSingleSelectStrategy',
    category: 'Commons',
    icon: 'mdi-radiobox-marked',
    descriptionKey: 'utils.catalog.independent_single_select_strategy.description',
    descriptionFallback: 'Returns a TStrategySelect object implementing single-item selection: at most one item can be selected at a time. Built on top of independentSelectStrategy by slicing the input to one element.',
    signature: 'function independentSingleSelectStrategy(mandatory?: boolean): TStrategySelect',
    params: [
        {
            name: 'mandatory',
            type: 'boolean',
            required: false,
            descriptionKey: 'utils.detail.independent_single_select_strategy.param_mandatory',
            descriptionFallback: 'When true, the strategy prevents deselecting the currently selected item, enforcing that exactly one item is always selected.',
        },
    ],
    returns: {
        type: 'TStrategySelect',
        descriptionKey: 'utils.detail.independent_single_select_strategy.returns',
        descriptionFallback: 'A strategy object with select, in, and out methods. Selecting a new item automatically deselects the previous one.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/nested.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.independent_single_select_strategy.example_basic',
            titleFallback: 'Single-select (radio-like) behaviour',
            code: `import { independentSingleSelectStrategy } from 'origam'

// Only one item can be selected — like a radio group
const strategy = independentSingleSelectStrategy(true) // mandatory: always one selected`,
            lang: 'typescript',
        },
    ],
    related: ['independent-select-strategy', 'leaf-single-select-strategy'],
}
