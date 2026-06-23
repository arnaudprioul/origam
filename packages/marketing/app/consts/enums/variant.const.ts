import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const VARIANT_ENUM_DOC: IEnumDoc = {
    slug: 'variant',
    name: 'VARIANT',
    category: 'Shape & Appearance',
    descriptionKey: 'enums.catalog.variant.description',
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
        { value: 'VARIANT.TEXT', descriptionKey: 'enums.detail.variant.text', descriptionFallback: 'Text-only surface — no background fill.' },
        { value: 'VARIANT.FLAT', descriptionKey: 'enums.detail.variant.flat', descriptionFallback: 'Filled background with no elevation shadow.' },
        { value: 'VARIANT.ELEVATED', descriptionKey: 'enums.detail.variant.elevated', descriptionFallback: 'Filled background with box-shadow elevation.' },
        { value: 'VARIANT.TONAL', descriptionKey: 'enums.detail.variant.tonal', descriptionFallback: 'Subtle tonal fill derived from the intent color.' },
        { value: 'VARIANT.OUTLINED', descriptionKey: 'enums.detail.variant.outlined', descriptionFallback: 'Border only — no background fill.' },
        { value: 'VARIANT.PLAIN', descriptionKey: 'enums.detail.variant.plain', descriptionFallback: 'Minimal chrome — blends into any surface.' },
        { value: 'VARIANT.GHOST', descriptionKey: 'enums.detail.variant.ghost', descriptionFallback: 'Glassmorphism — translucent with backdrop-filter blur.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'variant' },
        { slug: 'chip', name: 'Chip', propName: 'variant' },
        { slug: 'card', name: 'Card', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/variant.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.variant.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { VARIANT } from 'origam'

const myVariant: VARIANT = VARIANT.TONAL`,
            lang: 'typescript',
        },
    ],
}
