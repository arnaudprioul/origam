/**
 * Minimal DTCG-shaped token tree accepted by `createOrigam({ theme })` and by
 * the Theme Builder export. A node is either:
 *   - a leaf carrying a `$value` (DTCG) or a bare string/number value, or
 *   - a nested group of further nodes.
 *
 * The DS walks the tree depth-first, building a CSS variable name from each
 * leaf path via `tokenPathToCssVar`, so the names match the published token
 * sheets exactly (no parallel naming logic).
 */
export type TTokenLeaf =
    | string
    | number
    | { $value: string | number, $type?: string }

export interface ITokenTree {
    [key: string]: TTokenLeaf | ITokenTree
}

/**
 * A fully-resolved theme variable map: CSS custom-property name → value.
 * Keys may be supplied with or without the leading `--`; `createOrigam`
 * normalises them.
 *
 *   { '--origam-color__action--primary---bg': '#7c3aed' }
 *   { 'origam-radius---md': '0.5rem' }
 */
export type TThemeVars = Record<string, string | number>
