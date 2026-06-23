import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CREATE_INSTANCE_UTIL_DOC: IUtilDoc = {
    slug: 'create-instance',
    name: 'createInstance',
    category: 'Commons',
    icon: 'mdi-calendar-clock',
    descriptionKey: 'utils.catalog.create_instance.description',
    descriptionFallback: 'Instantiates a reactive date adapter from the given IDateOptions and locale instance. The adapter locale is kept in sync with the active locale via a watcher.',
    signature: `function createInstance(
  options: IDateOptions,
  locale: ILocaleInstance
): IDateAdapter`,
    params: [
        {
            name: 'options',
            type: 'IDateOptions',
            required: true,
            descriptionKey: 'utils.detail.create_instance.param_options',
            descriptionFallback: 'Date configuration: adapter class or pre-built adapter, locale map, and custom formats.',
        },
        {
            name: 'locale',
            type: 'ILocaleInstance',
            required: true,
            descriptionKey: 'utils.detail.create_instance.param_locale',
            descriptionFallback: 'The active origam locale instance, used to set and reactively update the adapter locale.',
        },
    ],
    returns: {
        type: 'IDateAdapter',
        descriptionKey: 'utils.detail.create_instance.returns',
        descriptionFallback: 'A reactive date adapter that automatically switches locale when the app locale changes.',
    },
    sourceFile: 'packages/ds/src/utils/Calendar/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.create_instance.example_basic',
            titleFallback: 'Provide a date adapter to the app',
            code: `import { createInstance, DateAdapter } from 'origam'

const adapter = createInstance(
  { adapter: DateAdapter, locale: { en: 'en-US' }, formats: {} },
  localeInstance
)`,
            lang: 'typescript',
        },
    ],
    related: ['date', 'create-vue-i18n-adapter'],
}
