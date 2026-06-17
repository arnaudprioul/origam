import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TRY_ON_MOUNTED_UTIL_DOC: IUtilDoc = {
    slug: 'try-on-mounted',
    name: 'tryOnMounted',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.try_on_mounted.description',
    descriptionFallback: 'Call a function when the component mounts, or immediately when called outside a Vue component lifecycle. Falls back to nextTick when sync is false and no lifecycle target is found.',
    signature: `function tryOnMounted(fn: TFn, sync?: boolean, target?: any): void`,
    params: [
        {
            name: 'fn',
            type: 'TFn',
            required: true,
            descriptionKey: 'utils.detail.try_on_mounted.param_fn',
            descriptionFallback: 'The function to execute. Called with `onMounted()` when a lifecycle instance is active, or called synchronously/via nextTick outside one.',
        },
        {
            name: 'sync',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            descriptionKey: 'utils.detail.try_on_mounted.param_sync',
            descriptionFallback: 'When true (default), fn is called synchronously outside a component. When false, fn is deferred with `nextTick`.',
        },
        {
            name: 'target',
            type: 'any',
            required: false,
            descriptionKey: 'utils.detail.try_on_mounted.param_target',
            descriptionFallback: 'Optional Vue component instance to bind the lifecycle to, forwarded to `onMounted(fn, target)` when provided.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.try_on_mounted.returns',
        descriptionFallback: 'No return value. Side-effectful: schedules or calls fn.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.try_on_mounted.example_basic',
            titleFallback: 'Safe use inside and outside a component',
            code: `import { tryOnMounted } from 'origam'

// Inside a composable used in <script setup>:
// → registers with onMounted normally
tryOnMounted(() => console.log('mounted'))

// Inside a utility called in a test or SSR context
// (no current Vue instance):
// → executes synchronously right away
tryOnMounted(() => console.log('no instance, runs now'))

// Deferred in the nextTick when outside a component:
tryOnMounted(() => console.log('next tick'), false)`,
            lang: 'typescript',
        },
    ],
    related: ['template-ref', 'get-life-cycle-target'],
}
