import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const TOKEN_PATH_TO_CSS_VAR_UTIL_DOC: IUtilDoc = {
    slug: 'token-path-to-css-var',
    name: 'tokenPathToCssVar',
    category: 'Theme',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: 'utils.catalog.token_path_to_css_var.description',
    descriptionFallback: 'Convenience wrapper around tokenPathToCssVarName that returns the full `--origam-…` CSS custom-property reference, ready to drop into a stylesheet declaration or `:style` binding.',
    signature: `function tokenPathToCssVar(path: ReadonlyArray<string>, isComponent: boolean): string`,
    params: [
        {
            name: 'path',
            type: 'ReadonlyArray<string>',
            required: true,
            descriptionKey: 'utils.detail.token_path_to_css_var.param_path',
            descriptionFallback: 'The token path segments, e.g. `["btn", "primary", "background-color"]` for a component token or `["color", "neutral", "500"]` for a semantic/primitive token.',
        },
        {
            name: 'isComponent',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.token_path_to_css_var.param_is_component',
            descriptionFallback: 'True for tokens from `tokens/component/*.json`; false for primitive or semantic tokens. Controls the separator rules (triple-tiret vs double-tiret vs `__` BEM child).',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.token_path_to_css_var.returns',
        descriptionFallback: 'The full CSS custom property reference including the leading `--`, e.g. `"--origam-btn--primary---background-color"`.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/token-name.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.token_path_to_css_var.example_basic',
            titleFallback: 'Resolve component and semantic token paths',
            code: `import { tokenPathToCssVar } from 'origam'

tokenPathToCssVar(['btn', 'primary', 'background-color'], true)
// → '--origam-btn--primary---background-color'

tokenPathToCssVar(['color', 'neutral', '500'], false)
// → '--origam-color__neutral---500'`,
            lang: 'typescript',
        },
    ],
    related: ['token-path-to-css-var-name', 'token-foreground-for-intent', 'token-styles-for-intent'],
}
