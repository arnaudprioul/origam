import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_INSTANCE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-instance',
    name: 'IDateInstance',
    category: 'Date & Time',
    descriptionKey: 'interfaces.catalog.i_date_instance.description',
    descriptionFallback: 'Adapter instance shape — extends TInternalAdapter with an optional locale property. Returned by the adapter constructor and used internally by Origam date composables.',
    definition: `export interface IDateInstance extends TInternalAdapter {
    locale?: any
}`,
    extends: ['TInternalAdapter'],
    props: [
        { name: 'locale', type: 'any', optional: true, descriptionFallback: 'Locale configuration forwarded to the underlying date library (e.g. an i18n locale string or object).' },
    ],
    usedBy: [
        { slug: 'use-date', name: 'useDate', kind: 'composable' },
        { slug: 'date-picker', name: 'DatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/date.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_instance.example',
            titleFallback: 'Implementing IDateInstance for a custom adapter class',
            code: `import type { IDateInstance } from 'origam'

class MyAdapter implements IDateInstance {
    locale = 'fr-FR'
    // … implement TInternalAdapter methods
}`,
            lang: 'typescript',
        },
    ],
}
