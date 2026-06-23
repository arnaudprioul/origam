import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATE_ADAPTER_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-date-adapter-key',
    name: 'ORIGAM_DATE_ADAPTER_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_date_adapter_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries the active IDateInstance adapter (date parsing, formatting, arithmetic). Provided by OrigamDateProvider and consumed by all date-picker and date-field components.',
    definition: `export const ORIGAM_DATE_ADAPTER_KEY: InjectionKey<IDateInstance> = Symbol.for('origam:date-adapter')`,
    value: "Symbol.for('origam:date-adapter')",
    usedBy: [
        { name: 'useDate' },
        { name: 'OrigamDateProvider' },
        { name: 'OrigamDatePicker', slug: 'date-picker' },
        { name: 'OrigamDateField', slug: 'date-field' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/date.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_date_adapter_key.example',
            titleFallback: 'Injecting the date adapter in a custom component',
            code: `import { inject } from 'vue'
import { ORIGAM_DATE_ADAPTER_KEY } from 'origam'

const adapter = inject(ORIGAM_DATE_ADAPTER_KEY)
const formatted = adapter?.format(new Date(), 'keyboardDate')`,
            lang: 'typescript',
        },
    ],
}
