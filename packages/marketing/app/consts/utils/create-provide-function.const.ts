import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CREATE_PROVIDE_FUNCTION_UTIL_DOC: IUtilDoc = {
    slug: 'create-provide-function',
    name: 'createProvideFunction',
    category: 'Commons',
    icon: 'mdi-translate',
    descriptionKey: 'utils.catalog.create_provide_function.description',
    descriptionFallback: 'Returns a factory function that bootstraps a scoped locale instance for a component sub-tree using vue-i18n. Each call creates an isolated locale with overridable current locale, fallback, and messages props.',
    signature: `function createProvideFunction(data: {
  current: Ref<string>
  fallback: Ref<string>
  messages: ComputedRef<ILocaleMessages>
  useI18n: typeof useI18n
}): (props: ILocaleProps) => ILocaleInstance`,
    params: [
        {
            name: 'data',
            type: '{ current: Ref<string>; fallback: Ref<string>; messages: ComputedRef<ILocaleMessages>; useI18n: typeof useI18n }',
            required: true,
            descriptionKey: 'utils.detail.create_provide_function.param_data',
            descriptionFallback: 'Root locale state (current locale ref, fallback ref, messages computed) and the vue-i18n useI18n composable.',
        },
    ],
    returns: {
        type: '(props: ILocaleProps) => ILocaleInstance',
        descriptionKey: 'utils.detail.create_provide_function.returns',
        descriptionFallback: 'A factory that, given component locale props, returns an ILocaleInstance for that component sub-tree.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/locale.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.create_provide_function.example_basic',
            titleFallback: 'Used internally by createVueI18nAdapter',
            code: `import { createProvideFunction } from 'origam'

const provideLocale = createProvideFunction({ current, fallback, messages, useI18n })
// Later, per component:
const locale = provideLocale(props)`,
            lang: 'typescript',
        },
    ],
    related: ['create-vue-i18n-adapter'],
}
