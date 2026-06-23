import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BRACKET_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bracket-props',
    name: 'IBracketProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_bracket_props.description',
    descriptionFallback: 'Props for <OrigamBracket> — a tournament tree renderer supporting single-elimination, double-elimination and round-robin layouts. Purely presentational: accepts immutable rounds and emits interaction events.',
    definition: `export interface IBracketProps extends ICommonsComponentProps, ITagProps, IDensityProps, IRoundedProps, IColorProps, IBgColorProps, IBorderProps, IDimensionProps, IElevationProps, IMarginProps, IPaddingProps {
    rounds: IBracketRound[]
    variant?: TBracketVariant
    direction?: 'horizontal' | 'vertical'
    showRoundTitles?: boolean
    showScores?: boolean
    showSeed?: boolean
    interactive?: boolean
    winnersLabel?: string
    losersLabel?: string
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IDensityProps',
        'IRoundedProps',
        'IColorProps',
        'IBgColorProps',
        'IBorderProps',
        'IDimensionProps',
        'IElevationProps',
        'IMarginProps',
        'IPaddingProps',
    ],
    props: [
        { name: 'rounds', type: 'IBracketRound[]', optional: false, descriptionFallback: 'Required. Pre-ordered list of rounds — from earliest (round-of-16) to final for single-elimination.' },
        { name: 'variant', type: 'TBracketVariant', optional: true, default: "'single-elimination'", descriptionFallback: 'Tournament shape. Round-robin renders a NxN matrix instead of a tree.' },
        { name: 'direction', type: "'horizontal' | 'vertical'", optional: true, default: "'horizontal'", descriptionFallback: 'Layout axis. Horizontal stacks rounds as columns. Vertical stacks rounds as rows.' },
        { name: 'showRoundTitles', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Toggle round headers.' },
        { name: 'showScores', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Toggle the score column on each competitor row.' },
        { name: 'showSeed', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Toggle the seed prefix on competitor names.' },
        { name: 'interactive', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Whether match cards should be interactive (cursor, hover, keyboard focus).' },
        { name: 'winnersLabel', type: 'string', optional: true, default: "'Winners bracket'", descriptionFallback: 'Heading shown above the winner-bracket tree in a double-elimination layout.' },
        { name: 'losersLabel', type: 'string', optional: true, default: "'Losers bracket'", descriptionFallback: 'Heading shown above the loser-bracket tree in a double-elimination layout.' },
    ],
    usedBy: [
        { slug: 'bracket', name: 'Bracket', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Bracket/bracket.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bracket_props.example',
            titleFallback: 'Single-elimination bracket',
            code: `<OrigamBracket
  :rounds="tournamentRounds"
  variant="single-elimination"
  show-scores
  show-round-titles
  color="primary"
/>`,
            lang: 'html',
        },
    ],
}
