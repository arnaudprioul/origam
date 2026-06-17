import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const REQUIREMENT_NUMBER_CONST_DOC: IConstDoc = {
    slug: 'requirement-number',
    name: 'REQUIREMENT_NUMBER',
    category: 'Form & Validation',
    descriptionKey: 'consts.catalog.requirement_number.description',
    descriptionFallback: 'Password strength requirement descriptor asserting that the value contains at least one digit (0-9). Used by OrigamPasswordField to display and validate the numeric character rule.',
    definition: `export const REQUIREMENT_NUMBER = {
    key: 'number',
    message: 'a number',
    icon: '1',
    reg: /(?=.*[0-9])/
} as const`,
    values: [
        { value: "key: 'number'", descriptionKey: 'consts.detail.requirement_number.key', descriptionFallback: 'Internal identifier matched by infos and locale interpolation.' },
        { value: "message: 'a number'", descriptionKey: 'consts.detail.requirement_number.message', descriptionFallback: 'Human-readable validation message label.' },
        { value: "icon: '1'", descriptionKey: 'consts.detail.requirement_number.icon', descriptionFallback: 'Single-character glyph rendered in the requirements popup tile.' },
        { value: 'reg: /(?=.*[0-9])/', descriptionKey: 'consts.detail.requirement_number.reg', descriptionFallback: 'Regex matching any string containing at least one digit.' },
    ],
    usedBy: [
        { name: 'OrigamPasswordField', slug: 'password-field' },
    ],
    sourceFile: 'packages/ds/src/consts/PasswordField/password-field.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.requirement_number.example',
            titleFallback: 'Checking the numeric requirement',
            code: `import { REQUIREMENT_NUMBER } from 'origam'

const passes = REQUIREMENT_NUMBER.reg.test('hello1') // true
const fails  = REQUIREMENT_NUMBER.reg.test('hello')  // false`,
            lang: 'typescript',
        },
    ],
}
