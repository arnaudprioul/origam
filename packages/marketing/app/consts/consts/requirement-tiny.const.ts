import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const REQUIREMENT_TINY_CONST_DOC: IConstDoc = {
    slug: 'requirement-tiny',
    name: 'REQUIREMENT_TINY',
    category: 'Form & Validation',
    descriptionKey: 'consts.catalog.requirement_tiny.description',
    descriptionFallback: 'Password strength requirement descriptor asserting that the value contains at least one lowercase letter (a-z). Used by OrigamPasswordField to display and validate the lowercase character rule.',
    definition: `export const REQUIREMENT_TINY = {
    key: 'tiny',
    message: 'a tiny',
    icon: 'a',
    reg: /(?=.*[a-z])/
} as const`,
    values: [
        { value: "key: 'tiny'", descriptionKey: 'consts.detail.requirement_tiny.key', descriptionFallback: 'Internal identifier matched by infos and locale interpolation.' },
        { value: "message: 'a tiny'", descriptionKey: 'consts.detail.requirement_tiny.message', descriptionFallback: 'Human-readable validation message label (lowercase letter).' },
        { value: "icon: 'a'", descriptionKey: 'consts.detail.requirement_tiny.icon', descriptionFallback: 'Single-character glyph rendered in the requirements popup tile.' },
        { value: 'reg: /(?=.*[a-z])/', descriptionKey: 'consts.detail.requirement_tiny.reg', descriptionFallback: 'Regex matching any string containing at least one lowercase letter.' },
    ],
    usedBy: [
        { name: 'OrigamPasswordField', slug: 'password-field' },
    ],
    sourceFile: 'packages/ds/src/consts/PasswordField/password-field.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.requirement_tiny.example',
            titleFallback: 'Checking the lowercase requirement',
            code: `import { REQUIREMENT_TINY } from 'origam'

const passes = REQUIREMENT_TINY.reg.test('Hello') // true
const fails  = REQUIREMENT_TINY.reg.test('HELLO') // false`,
            lang: 'typescript',
        },
    ],
}
