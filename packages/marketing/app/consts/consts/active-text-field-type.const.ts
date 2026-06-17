import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ACTIVE_TEXT_FIELD_TYPE_CONST_DOC: IConstDoc = {
    slug: 'active-text-field-type',
    name: 'ACTIVE_TEXT_FIELD_TYPE',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.active_text_field_type.description',
    descriptionFallback: 'Subset of TextField types that render a browser-native picker overlay (color, file, time, date, datetime-local, week, month). Used internally to distinguish them from plain text inputs.',
    definition: `export const ACTIVE_TEXT_FIELD_TYPE: Partial<Array<TTextFieldType>> = [
    TEXT_FIELD_TYPE.COLOR,
    TEXT_FIELD_TYPE.FILE,
    TEXT_FIELD_TYPE.TIME,
    TEXT_FIELD_TYPE.DATE,
    TEXT_FIELD_TYPE.DATETIME,
    TEXT_FIELD_TYPE.WEEK,
    TEXT_FIELD_TYPE.MONTH
]`,
    values: [
        { value: 'TEXT_FIELD_TYPE.COLOR', descriptionKey: 'consts.detail.active_text_field_type.color', descriptionFallback: 'Color picker input.' },
        { value: 'TEXT_FIELD_TYPE.FILE', descriptionKey: 'consts.detail.active_text_field_type.file', descriptionFallback: 'File upload input.' },
        { value: 'TEXT_FIELD_TYPE.TIME', descriptionKey: 'consts.detail.active_text_field_type.time', descriptionFallback: 'Time picker input.' },
        { value: 'TEXT_FIELD_TYPE.DATE', descriptionKey: 'consts.detail.active_text_field_type.date', descriptionFallback: 'Date picker input.' },
        { value: 'TEXT_FIELD_TYPE.DATETIME', descriptionKey: 'consts.detail.active_text_field_type.datetime', descriptionFallback: 'Date-time picker input.' },
        { value: 'TEXT_FIELD_TYPE.WEEK', descriptionKey: 'consts.detail.active_text_field_type.week', descriptionFallback: 'Week picker input.' },
        { value: 'TEXT_FIELD_TYPE.MONTH', descriptionKey: 'consts.detail.active_text_field_type.month', descriptionFallback: 'Month picker input.' },
    ],
    usedBy: [
        { name: 'OrigamTextField' },
    ],
    sourceFile: 'packages/ds/src/consts/TextField/text-field.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.active_text_field_type.example',
            titleFallback: 'Detecting an active-picker input type',
            code: `import { ACTIVE_TEXT_FIELD_TYPE } from 'origam'

const isActivePicker = (type: string) =>
  ACTIVE_TEXT_FIELD_TYPE.includes(type as never)`,
            lang: 'typescript',
        },
    ],
}
