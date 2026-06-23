import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FIND_CHILDREN_WITH_PROVIDE_UTIL_DOC: IUtilDoc = {
    slug: 'find-children-with-provide',
    name: 'findChildrenWithProvide',
    category: 'Commons',
    icon: 'mdi-family-tree',
    descriptionKey: 'utils.catalog.find_children_with_provide.description',
    descriptionFallback: 'Walks a Vue VNode tree and returns all ComponentInternalInstance nodes that have a specific injection key in their provides object. Used by layout components to locate child components registered via provide/inject.',
    signature: `function findChildrenWithProvide(
  key: InjectionKey<any> | symbol,
  vnode?: VNodeChild
): Array<ComponentInternalInstance>`,
    params: [
        {
            name: 'key',
            type: 'InjectionKey<any> | symbol',
            required: true,
            descriptionKey: 'utils.detail.find_children_with_provide.param_key',
            descriptionFallback: 'The injection key to search for. Components that called provide(key, …) will be collected.',
        },
        {
            name: 'vnode',
            type: 'VNodeChild',
            required: false,
            descriptionKey: 'utils.detail.find_children_with_provide.param_vnode',
            descriptionFallback: 'The VNode subtree to walk. Typically the subTree of the parent component instance. Undefined returns an empty array.',
        },
    ],
    returns: {
        type: 'Array<ComponentInternalInstance>',
        descriptionKey: 'utils.detail.find_children_with_provide.returns',
        descriptionFallback: 'A flat array of all component instances that provide the given key, found anywhere in the VNode subtree.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.find_children_with_provide.example_basic',
            titleFallback: 'Locate children by injection key',
            code: `import { findChildrenWithProvide } from 'origam'
import { inject, InjectionKey, provide } from 'vue'

const MY_KEY: InjectionKey<string> = Symbol('myKey')

// In a parent component:
const children = findChildrenWithProvide(MY_KEY, instance.subTree)
// children → all ComponentInternalInstance nodes that called provide(MY_KEY, …)`,
            lang: 'typescript',
        },
    ],
    related: ['destruct-computed', 'event-name'],
}
