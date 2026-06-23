import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORWARD_REFS_UTIL_DOC: IUtilDoc = {
    slug: 'forward-refs',
    name: 'forwardRefs',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.forward_refs.description',
    descriptionFallback: 'Merge one or more Vue template refs into a target exposure object so their public properties are transparently forwarded. Used by compound components (e.g. Field containing Input) to expose the inner element\'s methods on the outer `ref`.',
    signature: `function forwardRefs<T extends Record<string, unknown>, U extends Ref<HTMLElement | ComponentPublicInstance | undefined>[]>(
  target: T,
  ...refs: U
): T & TUnionToIntersection<...>`,
    params: [
        {
            name: 'target',
            type: 'T extends Record<string, unknown>',
            required: true,
            descriptionKey: 'utils.detail.forward_refs.param_target',
            descriptionFallback: 'The base exposure object (usually the result of defineExpose or an object literal).',
        },
        {
            name: '...refs',
            type: 'Ref<HTMLElement | ComponentPublicInstance | undefined>[]',
            required: true,
            descriptionKey: 'utils.detail.forward_refs.param_refs',
            descriptionFallback: 'One or more template refs whose properties will be proxied through the target.',
        },
    ],
    returns: {
        type: 'T & TUnionToIntersection<...>',
        descriptionKey: 'utils.detail.forward_refs.returns',
        descriptionFallback: 'A Proxy of the target that transparently delegates unknown property accesses to the forwarded refs in order.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/forwardRefs.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.forward_refs.example_basic',
            titleFallback: 'Forward inner input ref from a field wrapper',
            code: `import { forwardRefs } from 'origam'
import { ref } from 'vue'

const inputRef = ref<HTMLInputElement>()
// Expose focus/blur/value from the inner <input> on the outer component ref
defineExpose(forwardRefs({}, inputRef))`,
            lang: 'typescript',
        },
    ],
    related: ['focusable-children', 'focus-child'],
}
