import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const BLOCKQUOTE_VARIANT_ENUM_DOC: IEnumDoc = {
    slug: 'blockquote-variant',
    name: 'BLOCKQUOTE_VARIANT',
    category: 'Typography',
    descriptionKey: 'enums.catalog.blockquote_variant.description',
    descriptionFallback: 'TypeScript enum for the visual style of a blockquote (default, elegant, quoted, minimal, pull).',
    definition: `export enum BLOCKQUOTE_VARIANT {
    DEFAULT = 'default',
    ELEGANT = 'elegant',
    QUOTED  = 'quoted',
    MINIMAL = 'minimal',
    PULL    = 'pull',
}`,
    values: [
        { value: 'BLOCKQUOTE_VARIANT.DEFAULT', descriptionKey: 'enums.detail.blockquote_variant.default', descriptionFallback: 'Standard left-border blockquote styling.' },
        { value: 'BLOCKQUOTE_VARIANT.ELEGANT', descriptionKey: 'enums.detail.blockquote_variant.elegant', descriptionFallback: 'Refined typographic style with decorative top and bottom rules.' },
        { value: 'BLOCKQUOTE_VARIANT.QUOTED', descriptionKey: 'enums.detail.blockquote_variant.quoted', descriptionFallback: 'Large decorative quotation marks framing the content.' },
        { value: 'BLOCKQUOTE_VARIANT.MINIMAL', descriptionKey: 'enums.detail.blockquote_variant.minimal', descriptionFallback: 'Minimal chrome — no border, subtle text weight contrast only.' },
        { value: 'BLOCKQUOTE_VARIANT.PULL', descriptionKey: 'enums.detail.blockquote_variant.pull', descriptionFallback: 'Pull-quote style — enlarged text floated within a long-form article.' },
    ],
    usedBy: [
        { slug: 'blockquote', name: 'Blockquote', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/enums/Blockquote/blockquote-variant.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.blockquote_variant.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { BLOCKQUOTE_VARIANT } from 'origam'

const variant: BLOCKQUOTE_VARIANT = BLOCKQUOTE_VARIANT.ELEGANT`,
            lang: 'typescript',
        },
    ],
}
