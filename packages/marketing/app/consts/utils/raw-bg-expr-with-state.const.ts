import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RAW_BG_EXPR_WITH_STATE_UTIL_DOC: IUtilDoc = {
    slug: 'raw-bg-expr-with-state',
    name: 'rawBgExprWithState',
    category: 'Commons',
    icon: 'mdi-palette-swatch',
    descriptionKey: 'utils.catalog.raw_bg_expr_with_state.description',
    descriptionFallback: 'Apply a hover or active darkening effect to a raw CSS colour value by wrapping it in a color-mix() expression. Passes through unchanged for the default and disabled roles.',
    signature: `function rawBgExprWithState(raw: string, role: TBgFgRole): string`,
    params: [
        {
            name: 'raw',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.raw_bg_expr_with_state.param_raw',
            descriptionFallback: 'A raw CSS colour value (hex, rgb, hsl, or CSS custom property expression) to apply the state modification to.',
        },
        {
            name: 'role',
            type: 'TBgFgRole',
            required: true,
            descriptionKey: 'utils.detail.raw_bg_expr_with_state.param_role',
            descriptionFallback: 'The interaction state role: "default" and "disabled" return the raw value unchanged; "hover" and "active" wrap it in color-mix(in srgb, raw, black N%).',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.raw_bg_expr_with_state.returns',
        descriptionFallback: 'The original colour string for default/disabled roles, or a color-mix() expression with a black blend for hover/active states.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.raw_bg_expr_with_state.example_basic',
            titleFallback: 'Generate hover and active colour expressions',
            code: `import { rawBgExprWithState } from 'origam'

rawBgExprWithState('#3b82f6', 'default')
// → '#3b82f6'

rawBgExprWithState('#3b82f6', 'hover')
// → 'color-mix(in srgb, #3b82f6, black 8%)'

rawBgExprWithState('#3b82f6', 'active')
// → 'color-mix(in srgb, #3b82f6, black 16%)'`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-gradient', 'get-foreground', 'get-contrast'],
}
