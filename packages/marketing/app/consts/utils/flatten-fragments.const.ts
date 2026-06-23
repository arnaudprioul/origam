import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FLATTEN_FRAGMENTS_UTIL_DOC: IUtilDoc = {
    slug: 'flatten-fragments',
    name: 'flattenFragments',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.flatten_fragments.description',
    descriptionFallback: 'Recursively unwrap Vue Fragment nodes from a VNode array, returning a flat list of concrete VNodes with no Fragment wrappers.',
    signature: `function flattenFragments(nodes: Array<VNode>): Array<VNode>`,
    params: [
        {
            name: 'nodes',
            type: 'Array<VNode>',
            required: true,
            descriptionKey: 'utils.detail.flatten_fragments.param_nodes',
            descriptionFallback: 'The VNode array to flatten. Fragment children are recursively expanded in place.',
        },
    ],
    returns: {
        type: 'Array<VNode>',
        descriptionKey: 'utils.detail.flatten_fragments.returns',
        descriptionFallback: 'A flat array of concrete VNodes — no Fragment nodes remain at any level.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.flatten_fragments.example_basic',
            titleFallback: 'Flatten default slot VNodes',
            code: `import { flattenFragments } from 'origam'
import { useSlots } from 'vue'

const slots = useSlots()
const nodes = flattenFragments(slots.default?.() ?? [])
// nodes contains only concrete VNodes, no Fragment wrappers`,
            lang: 'typescript',
        },
    ],
    related: ['flatten-items'],
}
