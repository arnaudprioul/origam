import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_LIFE_CYCLE_TARGET_UTIL_DOC: IUtilDoc = {
    slug: 'get-life-cycle-target',
    name: 'getLifeCycleTarget',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_life_cycle_target.description',
    descriptionFallback: 'Returns the provided Vue component instance if given, otherwise falls back to the current Vue lifecycle instance obtained via getCurrentInstance().',
    signature: `function getLifeCycleTarget(target?: any): ComponentInternalInstance | null`,
    params: [
        {
            name: 'target',
            type: 'any',
            required: false,
            descriptionKey: 'utils.detail.get_life_cycle_target.param_target',
            descriptionFallback: 'An optional Vue component instance to use as the lifecycle target. When omitted, the current instance from the active setup context is used.',
        },
    ],
    returns: {
        type: 'ComponentInternalInstance | null',
        descriptionKey: 'utils.detail.get_life_cycle_target.returns',
        descriptionFallback: 'The resolved Vue component instance, or null when called outside a setup context and no target was provided.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/getCurrentInstance.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_life_cycle_target.example_basic',
            titleFallback: 'Resolve lifecycle target inside a composable',
            code: `import { getLifeCycleTarget } from 'origam'

// Inside a composable — uses the caller's instance
const instance = getLifeCycleTarget()

// Explicit override
const instance2 = getLifeCycleTarget(myComponentInstance)`,
            lang: 'typescript',
        },
    ],
    related: ['get-nested-value', 'get-object-value-by-path'],
}
