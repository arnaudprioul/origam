import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const REQUIREMENT_UPPERCASE_CONST_DOC: IConstDoc = {
    slug: 'requirement-uppercase',
    name: 'REQUIREMENT_UPPERCASE',
    category: 'Form & Validation',
    descriptionKey: 'consts.catalog.requirement_uppercase.description',
    descriptionFallback: 'Password strength requirement descriptor asserting that the value contains at least one uppercase letter (A-Z). Used by OrigamPasswordField to display and validate the uppercase character rule.',
    definition: `export const REQUIREMENT_UPPERCASE = {
    key: 'uppercase',
    message: 'a uppercase',
    icon: 'A',
    reg: /(?=.*[A-Z])/
} as const`,
    values: [
        { value: "key: 'uppercase'", descriptionKey: 'consts.detail.requirement_uppercase.key', descriptionFallback: 'Internal identifier matched by infos and locale interpolation.' },
        { value: "message: 'a uppercase'", descriptionKey: 'consts.detail.requirement_uppercase.message', descriptionFallback: 'Human-readable validation message label (uppercase letter).' },
        { value: "icon: 'A'", descriptionKey: 'consts.detail.requirement_uppercase.icon', descriptionFallback: 'Single-character glyph rendered in the requirements popup tile.' },
        { value: 'reg: /(?=.*[A-Z])/', descriptionKey: 'consts.detail.requirement_uppercase.reg', descriptionFallback: 'Regex matching any string containing at least one uppercase letter.' },
    ],
    usedBy: [
        { name: 'OrigamPasswordField', slug: 'password-field' },
    ],
    sourceFile: 'packages/ds/src/consts/PasswordField/password-field.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.requirement_uppercase.example',
            titleFallback: 'Checking the uppercase requirement',
            code: `import { REQUIREMENT_UPPERCASE } from 'origam'

const passes = REQUIREMENT_UPPERCASE.reg.test('Hello') // true
const fails  = REQUIREMENT_UPPERCASE.reg.test('hello') // false`,
            lang: 'typescript',
        },
    ],
}
