import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const BRACKET_VARIANT_ENUM_DOC: IEnumDoc = {
    slug: 'bracket-variant',
    name: 'BRACKET_VARIANT',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.bracket_variant.description',
    descriptionFallback: 'TypeScript enum for the tournament bracket format (single-elimination, double-elimination, round-robin).',
    definition: `export enum BRACKET_VARIANT {
    SINGLE_ELIMINATION = 'single-elimination',
    DOUBLE_ELIMINATION = 'double-elimination',
    ROUND_ROBIN        = 'round-robin',
}`,
    values: [
        { value: 'BRACKET_VARIANT.SINGLE_ELIMINATION', descriptionKey: 'enums.detail.bracket_variant.single_elimination', descriptionFallback: 'Single-elimination — one loss eliminates a participant.' },
        { value: 'BRACKET_VARIANT.DOUBLE_ELIMINATION', descriptionKey: 'enums.detail.bracket_variant.double_elimination', descriptionFallback: 'Double-elimination — two losses required to eliminate a participant.' },
        { value: 'BRACKET_VARIANT.ROUND_ROBIN', descriptionKey: 'enums.detail.bracket_variant.round_robin', descriptionFallback: 'Round-robin — every participant plays against every other participant.' },
    ],
    usedBy: [
        { slug: 'bracket', name: 'Bracket', propName: 'variant' },
        { slug: 'bracket-round', name: 'BracketRound', propName: 'variant' },
        { slug: 'bracket-match', name: 'BracketMatch', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/enums/Bracket/bracket-variant.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.bracket_variant.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { BRACKET_VARIANT } from 'origam'

const format: BRACKET_VARIANT = BRACKET_VARIANT.SINGLE_ELIMINATION`,
            lang: 'typescript',
        },
    ],
}
