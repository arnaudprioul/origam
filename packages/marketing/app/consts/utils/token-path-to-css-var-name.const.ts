import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TOKEN_PATH_TO_CSS_VAR_NAME_UTIL_DOC: IUtilDoc = {
    slug: 'token-path-to-css-var-name',
    name: 'tokenPathToCssVarName',
    category: 'Theme',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: 'utils.catalog.token_path_to_css_var_name.description',
    descriptionFallback: 'Resolve a token path array to an origam CSS variable name (WITHOUT the leading `--`). Applies the Origam naming convention: triple-tiret for property, double-tiret for state/BEM-child, and `__` for BEM child elements.',
    signature: `function tokenPathToCssVarName(path: ReadonlyArray<string>, isComponent: boolean): string`,
    params: [
        {
            name: 'path',
            type: 'ReadonlyArray<string>',
            required: true,
            descriptionKey: 'utils.detail.token_path_to_css_var_name.param_path',
            descriptionFallback: 'Ordered path segments from the token JSON. The first segment is always the block name (e.g. `"btn"`, `"color"`). Subsequent segments encode state, BEM child, or property parts.',
        },
        {
            name: 'isComponent',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.token_path_to_css_var_name.param_is_component',
            descriptionFallback: 'True for component tokens (`tokens/component/*.json`), false for primitive/semantic tokens. Selects which naming branch is applied.',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.token_path_to_css_var_name.returns',
        descriptionFallback: 'The CSS variable name without `--`, e.g. `"origam-btn--primary---background-color"` or `"origam-color__neutral---500"`.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/token-name.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.token_path_to_css_var_name.example_basic',
            titleFallback: 'Encode component token paths with state and BEM child',
            code: `import { tokenPathToCssVarName } from 'origam'

// Component token — simple property
tokenPathToCssVarName(['btn', 'background-color'], true)
// → 'origam-btn---background-color'

// Component token — state variant
tokenPathToCssVarName(['btn', 'primary', 'background-color'], true)
// → 'origam-btn--primary---background-color'

// Semantic token (2-level)
tokenPathToCssVarName(['color', 'primary'], false)
// → 'origam-color---primary'`,
            lang: 'typescript',
        },
    ],
    related: ['token-path-to-css-var', 'token-foreground-for-intent'],
}
