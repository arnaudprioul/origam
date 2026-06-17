import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DEBOUNCE_UTIL_DOC: IUtilDoc = {
    slug: 'debounce',
    name: 'debounce',
    category: 'Commons',
    icon: 'mdi-timer-sand',
    descriptionKey: 'utils.catalog.debounce.description',
    descriptionFallback: 'Wraps a function so that it is only called after the specified delay has elapsed since the last invocation. Accepts a reactive delay (MaybeRef<number>) so the interval can be updated at runtime. The returned wrapper exposes .clear() and .immediate shortcuts.',
    signature: `function debounce(
  fn: (...args: any[]) => void,
  delay: MaybeRef<number>
): ((...args: any[]) => void) & { clear: () => void; immediate: typeof fn }`,
    params: [
        {
            name: 'fn',
            type: '(...args: any[]) => void',
            required: true,
            descriptionKey: 'utils.detail.debounce.param_fn',
            descriptionFallback: 'The function to debounce.',
        },
        {
            name: 'delay',
            type: 'MaybeRef<number>',
            required: true,
            descriptionKey: 'utils.detail.debounce.param_delay',
            descriptionFallback: 'Milliseconds to wait after the last call before invoking fn. Accepts a plain number or a Vue ref so the delay can be changed reactively.',
        },
    ],
    returns: {
        type: '((...args: any[]) => void) & { clear: () => void; immediate: typeof fn }',
        descriptionKey: 'utils.detail.debounce.returns',
        descriptionFallback: 'A debounced wrapper. Call .clear() to cancel a pending invocation. Access .immediate to invoke fn synchronously without debouncing.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.debounce.example_basic',
            titleFallback: 'Debounce a search handler',
            code: `import { debounce } from 'origam'

const search = debounce((query: string) => fetchResults(query), 300)

input.addEventListener('input', (e) => search(e.target.value))
// Cleanup on unmount:
onUnmounted(() => search.clear())`,
            lang: 'typescript',
        },
    ],
    related: [],
}
