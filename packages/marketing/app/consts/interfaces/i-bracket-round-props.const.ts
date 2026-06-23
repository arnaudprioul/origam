import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BRACKET_ROUND_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bracket-round-props',
    name: 'IBracketRoundProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_bracket_round_props.description',
    descriptionFallback: 'Props for <OrigamBracketRound> — a single round column/row. Exported so consumers can render a round standalone inside a custom layout.',
    definition: `export interface IBracketRoundProps extends ICommonsComponentProps, ITagProps, IDirectionProps {
    round: IBracketRound
    index: number
    totalRounds: number
    showRoundTitle?: boolean
    showScores?: boolean
    showSeed?: boolean
    interactive?: boolean
    color?: TIntent
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IDirectionProps'],
    props: [
        { name: 'round', type: 'IBracketRound', optional: false, descriptionFallback: 'The round payload to render.' },
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Index of the round inside its bracket — drives the vertical offset.' },
        { name: 'totalRounds', type: 'number', optional: false, descriptionFallback: 'Total number of rounds — used to flag the last round as final.' },
        { name: 'showRoundTitle', type: 'boolean', optional: true, descriptionFallback: 'Toggle the round title heading.' },
        { name: 'showScores', type: 'boolean', optional: true, descriptionFallback: 'Forward to children — toggles score column.' },
        { name: 'showSeed', type: 'boolean', optional: true, descriptionFallback: 'Forward to children — toggles seed prefix.' },
        { name: 'interactive', type: 'boolean', optional: true, descriptionFallback: 'Forward to children — toggles match-card interactivity.' },
        { name: 'color', type: 'TIntent', optional: true, descriptionFallback: 'Forward intent color.' },
    ],
    usedBy: [
        { slug: 'bracket-round', name: 'BracketRound', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Bracket/bracket-round-component.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bracket_round_props.example',
            titleFallback: 'Standalone round',
            code: `<OrigamBracketRound
  :round="quarterFinals"
  :index="0"
  :total-rounds="4"
  show-round-title
  color="primary"
/>`,
            lang: 'html',
        },
    ],
}
