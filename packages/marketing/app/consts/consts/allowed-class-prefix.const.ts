import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ALLOWED_CLASS_PREFIX_CONST_DOC: IConstDoc = {
    slug: 'allowed-class-prefix',
    name: 'ALLOWED_CLASS_PREFIX',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.allowed_class_prefix.description',
    descriptionFallback: 'Whitelist prefix for class attributes that survive the rich Textarea HTML sanitiser. Only classes starting with this prefix are retained, preventing arbitrary class injection while allowing semantic rich-text classes.',
    definition: `export const ALLOWED_CLASS_PREFIX = 'origam-rich--'`,
    value: "'origam-rich--'",
    usedBy: [
        { name: 'OrigamTextarea' },
    ],
    sourceFile: 'packages/ds/src/consts/Textarea/textarea.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.allowed_class_prefix.example',
            titleFallback: 'Validating a class against the allowed prefix',
            code: `import { ALLOWED_CLASS_PREFIX } from 'origam'

const isSafe = (cls: string) => cls.startsWith(ALLOWED_CLASS_PREFIX)
// isSafe('origam-rich--callout') // true
// isSafe('btn-danger')           // false`,
            lang: 'typescript',
        },
    ],
}
