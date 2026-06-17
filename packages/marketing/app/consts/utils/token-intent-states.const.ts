import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TOKEN_INTENT_STATES_UTIL_DOC: IUtilDoc = {
    slug: 'token-intent-states',
    name: 'TOKEN_INTENT_STATES',
    category: 'Color',
    icon: 'mdi-tag-multiple-outline',
    descriptionKey: 'utils.catalog.token_intent_states.description',
    descriptionFallback: 'A frozen Set of intent / state modifier strings recognised by the origam token-name grammar. A path segment matching one of these values is emitted with the "--" modifier separator in the CSS variable name rather than treated as a BEM child ("__") or a property ("---").',
    signature: `const TOKEN_INTENT_STATES: ReadonlySet<string>`,
    params: [],
    returns: {
        type: 'ReadonlySet<string>',
        descriptionKey: 'utils.detail.token_intent_states.returns',
        descriptionFallback: 'Read-only Set containing: "primary", "secondary", "ghost", "success", "warning", "danger", "info", "error", "selected", "outlined", "elevated", "filter", "hover", "active", "disabled", "focus".',
    },
    sourceFile: 'packages/ds/src/utils/Theme/token-name.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.token_intent_states.example_basic',
            titleFallback: 'Guard a path segment',
            code: `import { TOKEN_INTENT_STATES } from 'origam'

TOKEN_INTENT_STATES.has('primary') // → true
TOKEN_INTENT_STATES.has('overlay') // → false`,
            lang: 'typescript',
        },
    ],
    related: [],
    noteFallback: 'TOKEN_INTENT_STATES is a module-level constant, not a function. It is documented here because it lives in a *.util.ts file and is exported from the origam package.',
}
