import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATE_OPTIONS_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-date-options-key',
    name: 'ORIGAM_DATE_OPTIONS_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_date_options_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries the IDateOptions configuration object (locale, firstDayOfWeek, adapter factory…) provided by OrigamDateProvider and read by the date composable to bootstrap the adapter.',
    definition: `export const ORIGAM_DATE_OPTIONS_KEY: InjectionKey<IDateOptions> = Symbol.for('origam:date-options')`,
    value: "Symbol.for('origam:date-options')",
    usedBy: [
        { name: 'useDate' },
        { name: 'OrigamDateProvider' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/date.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_date_options_key.example',
            titleFallback: 'Reading date options inside a custom date component',
            code: `import { inject } from 'vue'
import { ORIGAM_DATE_OPTIONS_KEY } from 'origam'

const options = inject(ORIGAM_DATE_OPTIONS_KEY)
// options?.locale  → 'en-US'`,
            lang: 'typescript',
        },
    ],
}
