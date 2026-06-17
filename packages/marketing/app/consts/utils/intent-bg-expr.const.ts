import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const INTENT_BG_EXPR_UTIL_DOC: IUtilDoc = {
    slug: 'intent-bg-expr',
    name: 'intentBgExpr',
    category: 'Commons',
    icon: 'mdi-palette',
    descriptionKey: 'utils.catalog.intent_bg_expr.description',
    descriptionFallback: 'Builds the CSS color-mix() expression for the background of an intent token at a given interaction role (default, hover, active, disabled). Falls back gracefully when the token is absent by mixing the base bg with black.',
    signature: 'function intentBgExpr(intent: TIntent, role: TBgFgRole): string',
    params: [
        {
            name: 'intent',
            type: 'TIntent',
            required: true,
            descriptionKey: 'utils.detail.intent_bg_expr.param_intent',
            descriptionFallback: 'The semantic intent: primary, secondary, ghost, neutral, success, warning, danger, or info.',
        },
        {
            name: 'role',
            type: 'TBgFgRole',
            required: true,
            descriptionKey: 'utils.detail.intent_bg_expr.param_role',
            descriptionFallback: 'The interaction state: default, hover, active, or disabled. Hover and active darken the base bg via color-mix() when the explicit token is absent.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.intent_bg_expr.returns',
        descriptionFallback: 'A CSS var() or color-mix() expression string ready to assign to background-color.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.intent_bg_expr.example_basic',
            titleFallback: 'Generate intent background expressions',
            code: `import { intentBgExpr } from 'origam'

intentBgExpr('primary', 'default')
// → 'var(--origam-color__action--primary---bg)'

intentBgExpr('primary', 'hover')
// → 'var(--origam-color__action--primary---bgHover, color-mix(in srgb, var(--…-bg), black 12%))'`,
            lang: 'typescript',
        },
    ],
    related: ['intent-fg-expr', 'intent-token-base'],
}
