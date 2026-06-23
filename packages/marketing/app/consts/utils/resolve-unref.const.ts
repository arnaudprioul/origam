import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_UNREF_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-unref',
    name: 'resolveUnref',
    category: 'Commons',
    icon: 'mdi-link-variant',
    descriptionKey: 'utils.catalog.resolve_unref.description',
    descriptionFallback: 'Unwrap a Vue Ref or a getter function to its current value. Functions are called; Refs are unwrapped via Vue unref. Useful for composables that accept either form.',
    signature: `function resolveUnref(r: Ref | (() => unknown)): unknown`,
    params: [
        {
            name: 'r',
            type: 'Ref | (() => unknown)',
            required: true,
            descriptionKey: 'utils.detail.resolve_unref.param_r',
            descriptionFallback: 'A Vue Ref (unwrapped via unref) or a zero-argument getter function (called directly). The two forms are interchangeable from the caller perspective.',
        },
    ],
    returns: {
        type: 'unknown',
        descriptionKey: 'utils.detail.resolve_unref.returns',
        descriptionFallback: 'The current underlying value — equivalent to ref.value for a Ref, or fn() for a getter function.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/eventListener.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_unref.example_basic',
            titleFallback: 'Unwrap a ref and a getter function',
            code: `import { resolveUnref } from 'origam'
import { ref } from 'vue'

const count = ref(42)
resolveUnref(count)       // → 42
resolveUnref(() => 42)    // → 42`,
            lang: 'typescript',
        },
    ],
    related: ['ref-element'],
}
