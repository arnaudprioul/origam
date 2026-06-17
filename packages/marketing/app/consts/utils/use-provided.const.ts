import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const USE_PROVIDED_UTIL_DOC: IUtilDoc = {
    slug: 'use-provided',
    name: 'useProvided',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.use_provided.description',
    descriptionFallback: 'Create a two-way-bound ref that falls back to an injected provided value when the component prop is null. The ref stays in sync with the provided value unless the consumer explicitly overrides it via the prop.',
    signature: `function useProvided<T>(
  props: any,
  prop: string,
  provided: Ref<T>
): Ref<T>`,
    params: [
        {
            name: 'props',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.use_provided.param_props',
            descriptionFallback: 'The component props object (from defineProps).',
        },
        {
            name: 'prop',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.use_provided.param_prop',
            descriptionFallback: 'The name of the prop key to watch and sync, e.g. "locale".',
        },
        {
            name: 'provided',
            type: 'Ref<T>',
            required: true,
            descriptionKey: 'utils.detail.use_provided.param_provided',
            descriptionFallback: 'The injected fallback ref (e.g. from useLocale() at the ancestor level).',
        },
    ],
    returns: {
        type: 'Ref<T>',
        descriptionKey: 'utils.detail.use_provided.returns',
        descriptionFallback: 'A reactive ref that mirrors the prop when set, or the provided value when the prop is null/undefined.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/locale.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.use_provided.example_basic',
            titleFallback: 'Locale prop with provided fallback',
            code: `import { useProvided } from 'origam'

// In a component that accepts an optional locale prop:
const props = defineProps<{ locale?: string }>()
const { locale: injectedLocale } = useLocale()

const locale = useProvided(props, 'locale', injectedLocale)
// locale.value → props.locale if defined, else injectedLocale.value`,
            lang: 'typescript',
        },
    ],
    related: ['try-on-scope-dispose'],
}
