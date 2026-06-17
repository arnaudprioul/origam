import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TOKEN_STYLES_FOR_INTENT_UTIL_DOC: IUtilDoc = {
    slug: 'token-styles-for-intent',
    name: 'tokenStylesForIntent',
    category: 'Commons',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.token_styles_for_intent.description',
    descriptionFallback: 'Build a CSS-vars override map (background-color + color) for a given intent and interaction role. Returns the correct token expressions for default, hover, active, and disabled states.',
    signature: `function tokenStylesForIntent(intent: TIntent, role?: TBgFgRole): Record<string, string>`,
    params: [
        {
            name: 'intent',
            type: 'TIntent',
            required: true,
            descriptionKey: 'utils.detail.token_styles_for_intent.param_intent',
            descriptionFallback: 'The semantic intent: "primary", "secondary", "ghost", "success", "warning", "danger", "info", or "neutral".',
        },
        {
            name: 'role',
            type: 'TBgFgRole',
            required: false,
            defaultValue: "'default'",
            descriptionKey: 'utils.detail.token_styles_for_intent.param_role',
            descriptionFallback: 'The interaction state: "default" | "hover" | "active" | "disabled". Defaults to "default".',
        },
    ],
    returns: {
        type: "Record<'background-color' | 'color', string>",
        descriptionKey: 'utils.detail.token_styles_for_intent.returns',
        descriptionFallback: 'An object with two keys — `background-color` and `color` — each holding a `var(--origam-color__…)` expression. Bind it directly as a `:style` object.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.token_styles_for_intent.example_basic',
            titleFallback: 'Apply intent surface styles',
            code: `import { tokenStylesForIntent } from 'origam'

tokenStylesForIntent('primary')
// → { 'background-color': 'var(--origam-color__action--primary---bg)',
//      color: 'var(--origam-color__action--primary---fg)' }

tokenStylesForIntent('danger', 'hover')
// → { 'background-color': 'var(--origam-color__feedback--danger--hover---bg)',
//      color: 'var(--origam-color__feedback--danger--hover---fg)' }`,
            lang: 'typescript',
        },
    ],
    related: ['token-foreground-for-intent', 'token-path-to-css-var'],
}
