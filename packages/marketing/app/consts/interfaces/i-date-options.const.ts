import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-options',
    name: 'IDateOptions',
    category: 'Date & Time',
    descriptionKey: 'interfaces.catalog.i_date_options.description',
    descriptionFallback: 'Plugin-level date configuration passed to createOrigam({ date: … }). Specifies the adapter class or instance, optional format overrides, and locale maps.',
    definition: `export interface IDateOptions {
    adapter: (new (options: { locale: any, formats?: any }) => IDateInstance) | IDateInstance
    formats?: Record<string, any>
    locale: Record<string, any>
}`,
    extends: [],
    props: [
        { name: 'adapter', type: '(new (options: { locale: any, formats?: any }) => IDateInstance) | IDateInstance', optional: false, descriptionFallback: 'The date adapter — either a constructor class or an already-instantiated adapter.' },
        { name: 'formats', type: 'Record<string, any>', optional: true, descriptionFallback: 'Optional display-format overrides keyed by format name (e.g. "keyboardDate").' },
        { name: 'locale', type: 'Record<string, any>', optional: false, descriptionFallback: 'Locale map used by the adapter to resolve date locale strings.' },
    ],
    usedBy: [
        { slug: 'use-date', name: 'useDate', kind: 'composable' },
        { slug: 'date-picker', name: 'DatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/date.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_options.example',
            titleFallback: 'Providing IDateOptions at plugin install',
            code: `import { createOrigam, DateFnsAdapter } from 'origam'
import { fr } from 'date-fns/locale'

createOrigam({
    date: {
        adapter: DateFnsAdapter,
        locale: { fr },
    },
})`,
            lang: 'typescript',
        },
    ],
}
