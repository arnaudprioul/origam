import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TRY_ON_SCOPE_DISPOSE_UTIL_DOC: IUtilDoc = {
    slug: 'try-on-scope-dispose',
    name: 'tryOnScopeDispose',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.try_on_scope_dispose.description',
    descriptionFallback: 'Safely register a cleanup callback with onScopeDispose(). When called outside an active effect scope the function is ignored and returns false, preventing the "getCurrentScope is undefined" error.',
    signature: `function tryOnScopeDispose(fn: TFn): boolean`,
    params: [
        {
            name: 'fn',
            type: 'TFn',
            required: true,
            descriptionKey: 'utils.detail.try_on_scope_dispose.param_fn',
            descriptionFallback: 'The cleanup callback to register. Called when the current effect scope is disposed (e.g. component unmount).',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.try_on_scope_dispose.returns',
        descriptionFallback: 'true when the callback was successfully registered inside an active scope; false when there is no active scope and the callback was skipped.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.try_on_scope_dispose.example_basic',
            titleFallback: 'Cleanup inside and outside a scope',
            code: `import { tryOnScopeDispose } from 'origam'

// Inside a component / composable — registered normally
const registered = tryOnScopeDispose(() => {
    clearInterval(timer)
})
// registered → true

// Outside any Vue scope — silently skipped
const skipped = tryOnScopeDispose(() => clearInterval(timer))
// skipped → false`,
            lang: 'typescript',
        },
    ],
    related: ['wrap-in-array', 'use-provided'],
}
