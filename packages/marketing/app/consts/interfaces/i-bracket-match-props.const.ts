import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BRACKET_MATCH_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bracket-match-props',
    name: 'IBracketMatchProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_bracket_match_props.description',
    descriptionFallback: 'Props for <OrigamBracketMatch> — a single match card rendered inside <OrigamBracket>. Carries the full cross-cutting surface and can be rendered standalone on a match-details page.',
    definition: `export interface IBracketMatchProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IHoverProps, IActiveProps, IRoundedProps, IElevationProps, IBorderProps, IDensityProps, IDimensionProps, IPaddingProps, IMarginProps {
    match: IBracketMatch
    status?: TBracketMatchStatus
    to?: string
    isFinal?: boolean
    showScores?: boolean
    showSeed?: boolean
    interactive?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IColorProps',
        'IBgColorProps',
        'IHoverProps',
        'IActiveProps',
        'IRoundedProps',
        'IElevationProps',
        'IBorderProps',
        'IDensityProps',
        'IDimensionProps',
        'IPaddingProps',
        'IMarginProps',
    ],
    props: [
        { name: 'match', type: 'IBracketMatch', optional: false, descriptionFallback: 'The match payload to render.' },
        { name: 'status', type: 'TBracketMatchStatus', optional: true, descriptionFallback: 'Override of the per-match status — useful to force a status from a story or preview.' },
        { name: 'to', type: 'string', optional: true, descriptionFallback: 'Destination of the "Watch live" link, shown only when the match is live.' },
        { name: 'isFinal', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Hoists the match into the "final" visual treatment — bigger card, shadow, and rounded corners.' },
        { name: 'showScores', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Hides the score column when false.' },
        { name: 'showSeed', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Shows the seed prefix on competitor names.' },
        { name: 'interactive', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Whether the card advertises interactivity (hover state, cursor, keyboard focus, role="button").' },
    ],
    usedBy: [
        { slug: 'bracket-match', name: 'BracketMatch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Bracket/bracket-match-component.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bracket_match_props.example',
            titleFallback: 'Standalone final match card',
            code: `<OrigamBracketMatch
  :match="grandFinalMatch"
  :is-final="true"
  show-scores
  color="primary"
/>`,
            lang: 'html',
        },
    ],
}
