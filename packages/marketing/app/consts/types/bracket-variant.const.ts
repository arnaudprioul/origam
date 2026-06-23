import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const BRACKET_VARIANT_TYPE_DOC: ITypeDoc = {
    slug: 'bracket-variant',
    name: 'TBracketVariant',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.bracket_variant.description',
    descriptionFallback: 'Tournament bracket topology: single-elimination tree, double-elimination with winners/losers brackets, or round-robin matrix.',
    definition: `export type TBracketVariant = \`\${BRACKET_VARIANT}\`

// Where BRACKET_VARIANT is:
export enum BRACKET_VARIANT {
    SINGLE_ELIMINATION = 'single-elimination',
    DOUBLE_ELIMINATION = 'double-elimination',
    ROUND_ROBIN        = 'round-robin'
}`,
    values: [
        { value: 'single-elimination', descriptionKey: 'types.detail.bracket_variant.single_elimination', descriptionFallback: 'Classic knockout tree — one loss and you\'re out. Rounds are laid out as columns from earliest to final.' },
        { value: 'double-elimination', descriptionKey: 'types.detail.bracket_variant.double_elimination', descriptionFallback: 'Two parallel brackets (winners + losers) with a grand-final round. Rounds segregated by IBracketRound.side.' },
        { value: 'round-robin', descriptionKey: 'types.detail.bracket_variant.round_robin', descriptionFallback: 'NxN matrix where every team plays every other team. Replaces the tree layout with a grid.' },
    ],
    usedBy: [
        { slug: 'bracket', name: 'Bracket', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/enums/Bracket/bracket-variant.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.bracket_variant.example',
            titleFallback: 'Single-elimination bracket with 8 teams',
            code: `<origam-bracket variant="single-elimination" :rounds="rounds" />
<origam-bracket variant="double-elimination" :rounds="rounds" />
<origam-bracket variant="round-robin" :rounds="rounds" />`,
            lang: 'html',
        },
    ],
}
