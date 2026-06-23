import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BUILT_IN_PATTERN_KEYS_CONST_DOC: IConstDoc = {
    slug: 'built-in-pattern-keys',
    name: 'BUILT_IN_PATTERN_KEYS',
    category: 'Form & Input',
    descriptionKey: 'consts.catalog.built_in_pattern_keys.description',
    descriptionFallback: 'Set of registered mask preset keys derived from BUILT_IN_PATTERNS. Used by resolveMaskConfig to discriminate a string key (preset) from a raw pattern string.',
    definition: `export const BUILT_IN_PATTERN_KEYS = new Set<string>(Object.keys(BUILT_IN_PATTERNS))`,
    value: "Set { 'phone:fr', 'phone:us', 'phone:international', 'iban', 'siret', 'creditcard', 'date:iso', 'date:fr', 'date:us', 'time', 'time:12h', 'postcode:fr', 'postcode:us' }",
    usedBy: [
        { name: 'OrigamMask', slug: 'mask' },
        { name: 'useMask' },
    ],
    sourceFile: 'packages/ds/src/consts/Mask/built-in-patterns.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.built_in_pattern_keys.example',
            titleFallback: 'Checking if a string is a registered mask preset key',
            code: `import { BUILT_IN_PATTERN_KEYS } from 'origam'

const isPreset = (mask: string) => BUILT_IN_PATTERN_KEYS.has(mask)
// isPreset('phone:fr') → true
// isPreset('##-##') → false`,
            lang: 'typescript',
        },
    ],
}
