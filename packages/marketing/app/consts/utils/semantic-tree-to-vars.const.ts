import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const SEMANTIC_TREE_TO_VARS_UTIL_DOC: IUtilDoc = {
    slug: 'semantic-tree-to-vars',
    name: 'semanticTreeToVars',
    category: 'Theme',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.semantic_tree_to_vars.description',
    descriptionFallback: 'Walk a hand-authored semantic token tree depth-first and emit a flat map of CSS custom property names to their leaf values, prefixed with a given root path.',
    signature: `function semanticTreeToVars(
  tree: ISemanticTree,
  rootPath: ReadonlyArray<string>
): TThemeVars`,
    params: [
        {
            name: 'tree',
            type: 'ISemanticTree',
            required: true,
            descriptionKey: 'utils.detail.semantic_tree_to_vars.param_tree',
            descriptionFallback: 'The nested token tree (string/number leaves, object branches). Each leaf path becomes a CSS variable name.',
        },
        {
            name: 'rootPath',
            type: 'ReadonlyArray<string>',
            required: true,
            descriptionKey: 'utils.detail.semantic_tree_to_vars.param_root_path',
            descriptionFallback: 'The prefix path segments to prepend before each leaf path when building the CSS variable name.',
        },
    ],
    returns: {
        type: 'TThemeVars',
        descriptionKey: 'utils.detail.semantic_tree_to_vars.returns',
        descriptionFallback: 'A flat Record<string, string | number> mapping each "--origam-*" CSS variable to its token value.',
    },
    sourceFile: 'packages/ds/src/utils/Theme/apply-theme.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.semantic_tree_to_vars.example_basic',
            titleFallback: 'Flatten a color subtree',
            code: `import { semanticTreeToVars } from 'origam'

const vars = semanticTreeToVars(
  { surface: { default: '#ffffff', subtle: '#f5f5f5' } },
  ['color']
)
// → {
//     '--origam-color__surface---default': '#ffffff',
//     '--origam-color__surface---subtle':  '#f5f5f5',
//   }`,
            lang: 'typescript',
        },
    ],
    related: ['apply-theme', 'apply-themes'],
}
