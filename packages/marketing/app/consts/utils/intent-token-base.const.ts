import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const INTENT_TOKEN_BASE_UTIL_DOC: IUtilDoc = {
    slug: 'intent-token-base',
    name: 'intentTokenBase',
    category: 'Commons',
    icon: 'mdi-key-variant',
    descriptionKey: 'utils.catalog.intent_token_base.description',
    descriptionFallback: 'Maps a TIntent value to the CSS token namespace segment used in all intent-related var() expressions (e.g. "primary" → "action--primary", "danger" → "feedback--danger").',
    signature: 'function intentTokenBase(intent: TIntent): string',
    params: [
        {
            name: 'intent',
            type: 'TIntent',
            required: true,
            descriptionKey: 'utils.detail.intent_token_base.param_intent',
            descriptionFallback: 'The semantic intent value. Neutral maps to action--secondary; success/warning/danger/info map to feedback--{intent}; primary/secondary/ghost map to action--{intent}.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.intent_token_base.returns',
        descriptionFallback: 'The BEM namespace segment inserted into --origam-color__{base}---{slot} variable names.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.intent_token_base.example_basic',
            titleFallback: 'Resolve the token namespace for each intent',
            code: `import { intentTokenBase } from 'origam'

intentTokenBase('primary')  // → 'action--primary'
intentTokenBase('neutral')  // → 'action--secondary'
intentTokenBase('danger')   // → 'feedback--danger'`,
            lang: 'typescript',
        },
    ],
    related: ['intent-bg-expr', 'intent-fg-expr'],
}
