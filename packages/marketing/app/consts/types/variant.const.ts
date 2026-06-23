import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const VARIANT_TYPE_DOC: ITypeDoc = {
    slug: 'variant',
    name: 'TVariant',
    kind: 'type',
    category: 'Shape & Appearance',
    descriptionKey: 'types.catalog.variant.description',
    descriptionFallback: 'Visual surface variant for elevation-driven components: text, flat, elevated, tonal, outlined, plain, ghost.',
    definition: `export type TVariant = \`\${VARIANT}\`

// Where VARIANT is:
export enum VARIANT {
    TEXT     = 'text',
    FLAT     = 'flat',
    ELEVATED = 'elevated',
    TONAL    = 'tonal',
    OUTLINED = 'outlined',
    PLAIN    = 'plain',
    GHOST    = 'ghost'
}`,
    values: [
        { value: 'text', descriptionKey: 'types.detail.variant.text', descriptionFallback: 'Text-only — no background, no border.' },
        { value: 'flat', descriptionKey: 'types.detail.variant.flat', descriptionFallback: 'Flat filled background, no elevation shadow.' },
        { value: 'elevated', descriptionKey: 'types.detail.variant.elevated', descriptionFallback: 'Filled background with box-shadow elevation.' },
        { value: 'tonal', descriptionKey: 'types.detail.variant.tonal', descriptionFallback: 'Subtle tonal fill derived from the current color intent.' },
        { value: 'outlined', descriptionKey: 'types.detail.variant.outlined', descriptionFallback: 'Border outline only — no fill.' },
        { value: 'plain', descriptionKey: 'types.detail.variant.plain', descriptionFallback: 'Plain — minimal styling, blends into any surface.' },
        { value: 'ghost', descriptionKey: 'types.detail.variant.ghost', descriptionFallback: 'Glassmorphism — translucent tint with backdrop-filter blur.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'variant' },
        { slug: 'chip', name: 'Chip', propName: 'variant' },
        { slug: 'card', name: 'Card', propName: 'variant' },
        { slug: 'alert', name: 'Alert', propName: 'variant' },
        { slug: 'avatar', name: 'Avatar', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/variant.type.ts',
    examples: [
        {
            titleKey: 'types.detail.variant.example',
            titleFallback: 'Btn variant showcase',
            code: `<origam-btn variant="elevated" color="primary">Elevated</origam-btn>
<origam-btn variant="tonal"    color="primary">Tonal</origam-btn>
<origam-btn variant="outlined" color="primary">Outlined</origam-btn>
<origam-btn variant="text"     color="primary">Text</origam-btn>
<origam-btn variant="ghost"    color="primary">Ghost</origam-btn>`,
            lang: 'html',
        },
    ],
}
