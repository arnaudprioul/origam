import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CREATE_VUE_I18N_ADAPTER_UTIL_DOC: IUtilDoc = {
    slug: 'create-vue-i18n-adapter',
    name: 'createVueI18nAdapter',
    category: 'Commons',
    icon: 'mdi-translate',
    descriptionKey: 'utils.catalog.create_vue_i18n_adapter.description',
    descriptionFallback: 'Wraps a vue-i18n instance into the ILocaleInstance interface expected by Origam. Bridges vue-i18n\'s translation, number formatting, and locale management with the DS locale system.',
    signature: `function createVueI18nAdapter({
  i18n,
  useI18n,
}: ILocaleI18n): ILocaleInstance`,
    params: [
        {
            name: 'i18n',
            type: 'ILocaleI18n[\'i18n\']',
            required: true,
            descriptionKey: 'utils.detail.create_vue_i18n_adapter.param_i18n',
            descriptionFallback: 'The vue-i18n instance (result of createI18n). Its global locale, fallbackLocale, and messages are used to drive Origam locale state.',
        },
        {
            name: 'useI18n',
            type: 'typeof useI18n',
            required: true,
            descriptionKey: 'utils.detail.create_vue_i18n_adapter.param_use_i18n',
            descriptionFallback: 'The useI18n composable from vue-i18n, passed as a reference so the adapter can create scoped locale instances per component.',
        },
    ],
    returns: {
        type: 'ILocaleInstance',
        descriptionKey: 'utils.detail.create_vue_i18n_adapter.returns',
        descriptionFallback: 'An ILocaleInstance that Origam components consume for translations and locale context.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/locale.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.create_vue_i18n_adapter.example_basic',
            titleFallback: 'Register the adapter in a Nuxt / Vue 3 app',
            code: `import { createVueI18nAdapter } from 'origam'
import { createI18n, useI18n } from 'vue-i18n'

const i18n = createI18n({ locale: 'en', messages: { en: {} } })

app.use(origam, {
  locale: createVueI18nAdapter({ i18n, useI18n }),
})`,
            lang: 'typescript',
        },
    ],
    related: ['create-provide-function', 'create-instance'],
}
