import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_PASSWORD_STRENGTH_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-password-strength',
    name: 'IPasswordStrength',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_password_strength.description',
    descriptionFallback: 'Result returned by computeStrength() and consumed by <OrigamPasswordField> to drive the strength bar UI. Carries a numeric score (0..4) and a semantic level identifier.',
    definition: `export interface IPasswordStrength {
    score: TPasswordStrengthScore
    level: TPasswordStrengthLevel
}`,
    extends: [],
    props: [
        { name: 'score', type: 'TPasswordStrengthScore', optional: false, descriptionFallback: 'Numeric score 0..4 — number of bar segments that should fill. Maps 1:1 to the colour tier via level.' },
        { name: 'level', type: 'TPasswordStrengthLevel', optional: false, descriptionFallback: 'Colour-tier identifier (weak | fair | good | strong) resolving to the --origam-password-field__strength---bg-{level} token.' },
    ],
    usedBy: [
        { slug: 'password-field', name: 'PasswordField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/PasswordField/password-strength.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_password_strength.example',
            titleFallback: 'Reacting to strength changes',
            code: `import type { IPasswordStrength } from 'origam'

const strength = ref<IPasswordStrength>({ score: 0, level: 'weak' })

// strength.level === 'strong' gates the submit button
const canSubmit = computed(() => strength.value.level === 'strong')`,
            lang: 'typescript',
        },
    ],
}
