import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const BRACKET_SURFACE_VARS_UTIL_DOC: IUtilDoc = {
    slug: 'bracket-surface-vars',
    name: 'bracketSurfaceVars',
    category: 'Bracket',
    icon: 'mdi-tournament',
    descriptionKey: 'utils.catalog.bracket_surface_vars.description',
    descriptionFallback: 'Assemble the --origam-bracket-match---* CSS custom property map for a match surface from a prop bag. Used by OrigamBracket and OrigamBracketMatch to apply bg-color, rounded, elevation, border and borderColor.',
    signature: `function bracketSurfaceVars(
  input: IBracketSurfaceInput
): Record<string, string>`,
    params: [
        {
            name: 'input',
            type: 'IBracketSurfaceInput',
            required: true,
            descriptionKey: 'utils.detail.bracket_surface_vars.param_input',
            descriptionFallback: 'Prop bag with optional bgColor, rounded, elevation, border, borderColor and borderStyle values that are each resolved to a CSS value.',
        },
    ],
    returns: {
        type: 'Record<string, string>',
        descriptionKey: 'utils.detail.bracket_surface_vars.returns',
        descriptionFallback: 'An object mapping --origam-bracket-match---* variable names to their resolved CSS values. Only variables with a non-empty resolved value are included.',
    },
    sourceFile: 'packages/ds/src/utils/Bracket/bracket-surface.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.bracket_surface_vars.example_basic',
            titleFallback: 'Build CSS variables for a bracket match surface',
            code: `import { bracketSurfaceVars } from 'origam'

const vars = bracketSurfaceVars({
    bgColor: 'primary',
    rounded: 'md',
    elevation: 2,
    borderStyle: 'dashed',
})
// vars → {
//   '--origam-bracket-match---background-color': '…',
//   '--origam-bracket-match---border-radius': '…',
//   '--origam-bracket-match---box-shadow': '…',
//   '--origam-bracket-match---border-style': 'dashed',
// }`,
            lang: 'typescript',
        },
    ],
    related: ['bracket-dash-array'],
}
