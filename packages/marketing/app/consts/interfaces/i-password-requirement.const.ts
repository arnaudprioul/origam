import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PASSWORD_REQUIREMENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-password-requirement',
    name: 'IPasswordRequirement',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_password_requirement.description',
    descriptionFallback: 'Descriptor for one rule shown in the requirements checklist or tile grid of <OrigamPasswordField>. The test() predicate is evaluated reactively against the current password value.',
    definition: `export interface IPasswordRequirement {
    id: string
    label: string
    test: (value: string) => boolean
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string', optional: false, descriptionFallback: 'Stable identifier used as :key and as data-cy suffix in stories.' },
        { name: 'label', type: 'string', optional: false, descriptionFallback: 'Human-readable label rendered next to the check/cross icon.' },
        { name: 'test', type: '(value: string) => boolean', optional: false, descriptionFallback: 'Predicate evaluated against the current password value. Returns true when the rule is satisfied.' },
    ],
    usedBy: [
        { slug: 'password-field', name: 'PasswordField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/PasswordField/password-requirement.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_password_requirement.example',
            titleFallback: 'Defining custom password requirements',
            code: `import type { IPasswordRequirement } from 'origam'

const requirements: IPasswordRequirement[] = [
    { id: 'min-length', label: 'At least 8 characters', test: (v) => v.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
    { id: 'number', label: 'One number', test: (v) => /[0-9]/.test(v) },
]`,
            lang: 'typescript',
        },
    ],
}
