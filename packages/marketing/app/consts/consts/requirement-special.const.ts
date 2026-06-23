import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const REQUIREMENT_SPECIAL_CONST_DOC: IConstDoc = {
    slug: 'requirement-special',
    name: 'REQUIREMENT_SPECIAL',
    category: 'Form & Validation',
    descriptionKey: 'consts.catalog.requirement_special.description',
    descriptionFallback: 'Password strength requirement descriptor asserting that the value contains at least one special character (any non-alphanumeric, non-space character). Used by OrigamPasswordField to display and validate the symbol rule.',
    definition: `export const REQUIREMENT_SPECIAL = {
    key: 'special',
    message: 'a special character (!@#$%)',
    icon: '@',
    reg: /(?=.*[^a-zA-Z0-9\\s])/
} as const`,
    values: [
        { value: "key: 'special'", descriptionKey: 'consts.detail.requirement_special.key', descriptionFallback: 'Internal identifier matched by infos and locale interpolation.' },
        { value: "message: 'a special character (!@#$%)'", descriptionKey: 'consts.detail.requirement_special.message', descriptionFallback: 'Human-readable validation message label.' },
        { value: "icon: '@'", descriptionKey: 'consts.detail.requirement_special.icon', descriptionFallback: 'Single-character glyph rendered in the requirements popup tile.' },
        { value: 'reg: /(?=.*[^a-zA-Z0-9\\s])/', descriptionKey: 'consts.detail.requirement_special.reg', descriptionFallback: 'Regex matching any string containing at least one special character.' },
    ],
    usedBy: [
        { name: 'OrigamPasswordField', slug: 'password-field' },
    ],
    sourceFile: 'packages/ds/src/consts/PasswordField/password-field.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.requirement_special.example',
            titleFallback: 'Checking the special-character requirement',
            code: `import { REQUIREMENT_SPECIAL } from 'origam'

const passes = REQUIREMENT_SPECIAL.reg.test('hello@1') // true
const fails  = REQUIREMENT_SPECIAL.reg.test('hello1')  // false`,
            lang: 'typescript',
        },
    ],
}
