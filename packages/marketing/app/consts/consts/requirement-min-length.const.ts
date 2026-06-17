import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const REQUIREMENT_MIN_LENGTH_CONST_DOC: IConstDoc = {
    slug: 'requirement-min-length',
    name: 'REQUIREMENT_MIN_LENGTH',
    category: 'Form & Validation',
    descriptionKey: 'consts.catalog.requirement_min_length.description',
    descriptionFallback: 'Factory function that produces a password-strength requirement descriptor for a minimum character count. Returns key, human-readable message, icon glyph, and a parametric regex matching at least N characters.',
    definition: `export const REQUIREMENT_MIN_LENGTH = (length: number) => ({
    key: 'minLength',
    message: \`\${length} characters\`,
    icon: \`+\${length}\`,
    reg: new RegExp(\`(.{\${length},})\`)
})`,
    value: '(length: number) => ({ key, message, icon, reg })',
    usedBy: [
        { name: 'OrigamPasswordField', slug: 'password-field' },
    ],
    sourceFile: 'packages/ds/src/consts/PasswordField/password-field.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.requirement_min_length.example',
            titleFallback: 'Generating a min-length requirement for 8 characters',
            code: `import { REQUIREMENT_MIN_LENGTH } from 'origam'

const req = REQUIREMENT_MIN_LENGTH(8)
// { key: 'minLength', message: '8 characters', icon: '+8', reg: /(.{8,})/ }`,
            lang: 'typescript',
        },
    ],
}
