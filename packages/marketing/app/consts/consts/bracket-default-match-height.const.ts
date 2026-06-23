import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BRACKET_DEFAULT_MATCH_HEIGHT_CONST_DOC: IConstDoc = {
    slug: 'bracket-default-match-height',
    name: 'BRACKET_DEFAULT_MATCH_HEIGHT',
    category: 'Data Display',
    descriptionKey: 'consts.catalog.bracket_default_match_height.description',
    descriptionFallback: 'Default match card height in pixels used by the OrigamBracket layout algorithm when computing SVG connector paths in horizontal mode. Mirrors the bracket.match.height design token; duplicated in code so the connector pure function stays free of DOM measurement.',
    definition: `export const BRACKET_DEFAULT_MATCH_HEIGHT = 72`,
    value: '72',
    usedBy: [
        { name: 'OrigamBracket' },
    ],
    sourceFile: 'packages/ds/src/consts/Bracket/bracket.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bracket_default_match_height.example',
            titleFallback: 'Using the default height in a layout calculation',
            code: `import { BRACKET_DEFAULT_MATCH_HEIGHT } from 'origam'

// Compute the vertical midpoint of a match card
const midY = (rowIndex: number) =>
  rowIndex * (BRACKET_DEFAULT_MATCH_HEIGHT + gap) + BRACKET_DEFAULT_MATCH_HEIGHT / 2`,
            lang: 'typescript',
        },
    ],
}
