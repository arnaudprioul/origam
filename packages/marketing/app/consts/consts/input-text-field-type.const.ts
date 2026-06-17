import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const INPUT_TEXT_FIELD_TYPE_CONST_DOC: IConstDoc = {
    slug: 'input-text-field-type',
    name: 'INPUT_TEXT_FIELD_TYPE',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.input_text_field_type.description',
    descriptionFallback: 'Subset of HTML input types that render as a standard text-style field in OrigamTextField (text, search, password, tel, url). Excludes picker types handled by ACTIVE_TEXT_FIELD_TYPE.',
    definition: `export const INPUT_TEXT_FIELD_TYPE: Partial<Array<TTextFieldType>> = [
    TEXT_FIELD_TYPE.TEXT,
    TEXT_FIELD_TYPE.SEARCH,
    TEXT_FIELD_TYPE.PASSWORD,
    TEXT_FIELD_TYPE.TEL,
    TEXT_FIELD_TYPE.URL
]`,
    values: [
        { value: 'TEXT_FIELD_TYPE.TEXT', descriptionKey: 'consts.detail.input_text_field_type.text', descriptionFallback: 'Plain text input.' },
        { value: 'TEXT_FIELD_TYPE.SEARCH', descriptionKey: 'consts.detail.input_text_field_type.search', descriptionFallback: 'Search field with browser-native clear button.' },
        { value: 'TEXT_FIELD_TYPE.PASSWORD', descriptionKey: 'consts.detail.input_text_field_type.password', descriptionFallback: 'Password field with masked characters.' },
        { value: 'TEXT_FIELD_TYPE.TEL', descriptionKey: 'consts.detail.input_text_field_type.tel', descriptionFallback: 'Telephone number input.' },
        { value: 'TEXT_FIELD_TYPE.URL', descriptionKey: 'consts.detail.input_text_field_type.url', descriptionFallback: 'URL input.' },
    ],
    usedBy: [
        { name: 'OrigamTextField', slug: 'text-field' },
    ],
    sourceFile: 'packages/ds/src/consts/TextField/text-field.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.input_text_field_type.example',
            titleFallback: 'Checking whether a type renders as a text field',
            code: `import { INPUT_TEXT_FIELD_TYPE } from 'origam'

const isTextType = (type: string) =>
  (INPUT_TEXT_FIELD_TYPE as string[]).includes(type)`,
            lang: 'typescript',
        },
    ],
}
