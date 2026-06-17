import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BRACKET_DEFAULT_MATCH_GAP_CONST_DOC: IConstDoc = {
    slug: 'bracket-default-match-gap',
    name: 'BRACKET_DEFAULT_MATCH_GAP',
    category: 'Data Display',
    descriptionKey: 'consts.catalog.bracket_default_match_gap.description',
    descriptionFallback: 'Default vertical gap in pixels between sibling matches in the first round of an OrigamBracket. Subsequent rounds double the gap to produce the classic branching pattern. Mirrors the bracket.gap-round design token.',
    definition: `export const BRACKET_DEFAULT_MATCH_GAP = 24`,
    value: '24',
    usedBy: [
        { name: 'OrigamBracket' },
    ],
    sourceFile: 'packages/ds/src/consts/Bracket/bracket.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bracket_default_match_gap.example',
            titleFallback: 'Computing the gap for a given round',
            code: `import { BRACKET_DEFAULT_MATCH_GAP } from 'origam'

// Gap doubles each round: round 0 → 24px, round 1 → 48px, etc.
const gapForRound = (round: number) =>
  BRACKET_DEFAULT_MATCH_GAP * Math.pow(2, round)`,
            lang: 'typescript',
        },
    ],
}
