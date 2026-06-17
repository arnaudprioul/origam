import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DEFAULT_PASSWORD_REQUIREMENTS_CONST_DOC: IConstDoc = {
    slug: 'default-password-requirements',
    name: 'DEFAULT_PASSWORD_REQUIREMENTS',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.default_password_requirements.description',
    descriptionFallback: 'Default set of password strength rules used by OrigamPasswordField when `requirements: true` is passed without an explicit array. Each rule has an id, an English label, and a predicate function.',
    definition: `export const DEFAULT_PASSWORD_REQUIREMENTS: IPasswordRequirement[] = [
    { id: 'min-length', label: 'At least 8 characters', test: (v) => (v ?? '').length >= 8 },
    { id: 'uppercase',  label: 'At least 1 uppercase letter', test: (v) => /[A-Z]/.test(v ?? '') },
    { id: 'number',     label: 'At least 1 number', test: (v) => /\\d/.test(v ?? '') },
    { id: 'special',    label: 'At least 1 special character', test: (v) => /[^A-Za-z0-9]/.test(v ?? '') }
]`,
    values: [
        { value: "{ id: 'min-length', label: 'At least 8 characters' }", descriptionKey: 'consts.detail.default_password_requirements.min_length', descriptionFallback: 'Validates that the password contains at least 8 characters.' },
        { value: "{ id: 'uppercase', label: 'At least 1 uppercase letter' }", descriptionKey: 'consts.detail.default_password_requirements.uppercase', descriptionFallback: 'Validates that the password contains at least one uppercase letter.' },
        { value: "{ id: 'number', label: 'At least 1 number' }", descriptionKey: 'consts.detail.default_password_requirements.number', descriptionFallback: 'Validates that the password contains at least one digit.' },
        { value: "{ id: 'special', label: 'At least 1 special character' }", descriptionKey: 'consts.detail.default_password_requirements.special', descriptionFallback: 'Validates that the password contains at least one non-alphanumeric character.' },
    ],
    usedBy: [
        { name: 'OrigamPasswordField', slug: 'password-field' },
        { name: 'usePasswordField' },
    ],
    sourceFile: 'packages/ds/src/consts/PasswordField/password-requirements.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.default_password_requirements.example',
            titleFallback: 'Using the default requirements',
            code: `import { DEFAULT_PASSWORD_REQUIREMENTS } from 'origam'

// Pass as-is or spread and extend
const rules = [
  ...DEFAULT_PASSWORD_REQUIREMENTS,
  { id: 'no-spaces', label: 'No spaces', test: (v: string) => !/\\s/.test(v) }
]`,
            lang: 'typescript',
        },
    ],
}
