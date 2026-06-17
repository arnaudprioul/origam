import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const INTENT_FG_EXPR_UTIL_DOC: IUtilDoc = {
    slug: 'intent-fg-expr',
    name: 'intentFgExpr',
    category: 'Commons',
    icon: 'mdi-format-color-text',
    descriptionKey: 'utils.catalog.intent_fg_expr.description',
    descriptionFallback: 'Builds the CSS var() expression for the foreground (text) color of an intent token at a given interaction role. The foreground color stays constant across hover/active — only disabled gets a distinct token.',
    signature: 'function intentFgExpr(intent: TIntent, role: TBgFgRole): string',
    params: [
        {
            name: 'intent',
            type: 'TIntent',
            required: true,
            descriptionKey: 'utils.detail.intent_fg_expr.param_intent',
            descriptionFallback: 'The semantic intent: primary, secondary, ghost, neutral, success, warning, danger, or info.',
        },
        {
            name: 'role',
            type: 'TBgFgRole',
            required: true,
            descriptionKey: 'utils.detail.intent_fg_expr.param_role',
            descriptionFallback: 'The interaction state: default, hover, active, or disabled. Only disabled produces a different token (fgDisabled); hover and active use the same fg as default.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.intent_fg_expr.returns',
        descriptionFallback: 'A CSS var() expression string referencing the fg or fgDisabled token for the given intent.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.intent_fg_expr.example_basic',
            titleFallback: 'Generate intent foreground expressions',
            code: `import { intentFgExpr } from 'origam'

intentFgExpr('primary', 'default')
// → 'var(--origam-color__action--primary---fg)'

intentFgExpr('primary', 'disabled')
// → 'var(--origam-color__action--primary---fgDisabled)'`,
            lang: 'typescript',
        },
    ],
    related: ['intent-bg-expr', 'intent-token-base'],
}
