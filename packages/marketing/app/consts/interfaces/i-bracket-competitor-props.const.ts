import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BRACKET_COMPETITOR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bracket-competitor-props',
    name: 'IBracketCompetitorProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_bracket_competitor_props.description',
    descriptionFallback: 'Props for <OrigamBracketCompetitor> — a single competitor row. Carries the full cross-cutting surface (color, bgColor, rounded, elevation, border, density, dimension, padding, margin) so a standalone row behaves like any other origam component.',
    definition: `export interface IBracketCompetitorProps extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IHoverProps, IActiveProps, IRoundedProps, IElevationProps, IBorderProps, IDensityProps, IDimensionProps, IPaddingProps, IMarginProps {
    competitor: IBracketCompetitor | null
    score?: number | string
    isWinner?: boolean
    isLoser?: boolean
    showScore?: boolean
    showSeed?: boolean
    interactive?: boolean
    advantageRounds?: number
    forfeit?: boolean
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
        { name: 'competitor', type: 'IBracketCompetitor | null', optional: false, descriptionFallback: 'The competitor payload. null renders a "TBD" placeholder for undetermined participants.' },
        { name: 'score', type: 'number | string', optional: true, descriptionFallback: 'Optional score — accepts string for non-numeric markers.' },
        { name: 'isWinner', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Applies the --winner modifier class (bolder text, intent-tinted background).' },
        { name: 'isLoser', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Marks the losing side — used to lighten the row when the match is completed.' },
        { name: 'showScore', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Toggle the score column.' },
        { name: 'showSeed', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Toggle the seed prefix.' },
        { name: 'interactive', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Whether the row advertises interactivity (hover state, cursor).' },
        { name: 'advantageRounds', type: 'number', optional: true, descriptionFallback: 'Head-start in rounds/sets — renders a +N badge next to the name (Grand Final advantage).' },
        { name: 'forfeit', type: 'boolean', optional: true, descriptionFallback: 'Marks this competitor as having forfeited — name is struck through and a "forfeit" tag is shown.' },
    ],
    usedBy: [
        { slug: 'bracket-competitor', name: 'BracketCompetitor', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Bracket/bracket-competitor-component.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bracket_competitor_props.example',
            titleFallback: 'Standalone competitor row',
            code: `<OrigamBracketCompetitor
  :competitor="{ id: 1, name: 'Team Liquid', seed: 1 }"
  :score="3"
  :is-winner="true"
  show-seed
/>`,
            lang: 'html',
        },
    ],
}
