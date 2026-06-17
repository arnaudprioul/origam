import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TOKEN_FOREGROUND_FOR_INTENT_UTIL_DOC: IUtilDoc = {
    slug: 'token-foreground-for-intent',
    name: 'tokenForegroundForIntent',
    category: 'Commons',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.token_foreground_for_intent.description',
    descriptionFallback: 'Resolve the foreground-only CSS token for an intent — the "coloured text on a light surface" rung (fgSubtle). Distinct from tokenStylesForIntent which returns the WCAG-contrasted text placed ON a coloured surface.',
    signature: `function tokenForegroundForIntent(intent: TIntent): string`,
    params: [
        {
            name: 'intent',
            type: 'TIntent',
            required: true,
            descriptionKey: 'utils.detail.token_foreground_for_intent.param_intent',
            descriptionFallback: 'One of the semantic intent values: "primary", "secondary", "ghost", "success", "warning", "danger", "info", "neutral". Each maps to a different `fgSubtle` token rung.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.token_foreground_for_intent.returns',
        descriptionFallback: 'A `var(--origam-color__…---fgSubtle)` CSS custom-property reference, ready to bind as a `color` style value.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.token_foreground_for_intent.example_basic',
            titleFallback: 'Colour inline text by intent',
            code: `import { tokenForegroundForIntent } from 'origam'

tokenForegroundForIntent('primary')
// → 'var(--origam-color__action--primary---fgSubtle)'

tokenForegroundForIntent('danger')
// → 'var(--origam-color__feedback--danger---fgSubtle)'

tokenForegroundForIntent('neutral')
// → 'var(--origam-color__action--secondary---fg)'`,
            lang: 'typescript',
        },
    ],
    related: ['token-styles-for-intent', 'token-path-to-css-var'],
}
