import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const ENUM_VARIANT_TYPE_DOC: ITypeDoc = {
    slug: 'enum-variant',
    name: 'VARIANT',
    kind: 'enum',
    category: 'Enums',
    descriptionKey: 'types.catalog.enum_variant.description',
    descriptionFallback: 'TypeScript enum for component visual variants (text, flat, elevated, tonal, outlined, plain, ghost).',
    definition: `export enum VARIANT {
    TEXT     = 'text',
    FLAT     = 'flat',
    ELEVATED = 'elevated',
    TONAL    = 'tonal',
    OUTLINED = 'outlined',
    PLAIN    = 'plain',
    GHOST    = 'ghost'
}`,
    values: [
        { value: 'VARIANT.TEXT', descriptionKey: 'types.detail.enum_variant.text', descriptionFallback: "Text-only surface — no background fill." },
        { value: 'VARIANT.FLAT', descriptionKey: 'types.detail.enum_variant.flat', descriptionFallback: "Filled background with no elevation shadow." },
        { value: 'VARIANT.ELEVATED', descriptionKey: 'types.detail.enum_variant.elevated', descriptionFallback: "Filled background with box-shadow elevation." },
        { value: 'VARIANT.TONAL', descriptionKey: 'types.detail.enum_variant.tonal', descriptionFallback: "Subtle tonal fill derived from the intent color." },
        { value: 'VARIANT.OUTLINED', descriptionKey: 'types.detail.enum_variant.outlined', descriptionFallback: "Border only — no background fill." },
        { value: 'VARIANT.PLAIN', descriptionKey: 'types.detail.enum_variant.plain', descriptionFallback: "Minimal chrome — blends into any surface." },
        { value: 'VARIANT.GHOST', descriptionKey: 'types.detail.enum_variant.ghost', descriptionFallback: "Glassmorphism — translucent with backdrop-filter blur." },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'variant' },
        { slug: 'chip', name: 'Chip', propName: 'variant' },
        { slug: 'card', name: 'Card', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/variant.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.enum_variant.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { VARIANT } from 'origam'

const myVariant: VARIANT = VARIANT.TONAL`,
            lang: 'typescript',
        },
    ],
}
