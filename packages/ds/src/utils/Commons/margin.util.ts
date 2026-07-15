/**
 * Format margin styles var.
 *
 * Accepts 1, 2 or 4 space-separated values (mirrors `formatPaddingStylesVar`):
 * - **1 value** — shorthand `margin: <v0>`.
 * - **2 values** — `margin-block: <v0>` (top+bottom) / `margin-inline: <v1>` (left+right).
 * - **4 values** — logical per-side, see the order note below.
 *
 * ⚠️ **4-value order is `Haut/Gauche/Bas/Droite` (Top/Left/Bottom/Right),
 * NOT the CSS clockwise shorthand order (Top/Right/Bottom/Left).**
 * This is an **intentional DS convention** (arbitrated in issue #216), not a
 * bug: values are grouped **by logical axis** (block first, then inline),
 * which keeps the mapping RTL-safe —
 * `values[0]` → `margin-block-start`  (top)
 * `values[1]` → `margin-inline-start` (left in LTR)
 * `values[2]` → `margin-block-end`    (bottom)
 * `values[3]` → `margin-inline-end`   (right in LTR)
 *
 * Example — do NOT assume CSS clockwise order:
 * ```ts
 * // '8px 16px 24px 32px' → top=8px, LEFT=16px, bottom=24px, RIGHT=32px
 * // (native CSS `margin: 8px 16px 24px 32px` would mean top=8/right=16/bottom=24/left=32 — different!)
 * formatMarginStylesVar(['8px', '16px', '24px', '32px'])
 * ```
 *
 * @param values Array of 1, 2 or 4 CSS length/keyword strings.
 */
export function formatMarginStylesVar (values: Array<string>) {
    const styles = []

    switch (values.length) {
        case 1 :
            styles.push(`margin: ${values[0]}`)
            break
        case 2 :
            styles.push(`margin-block: ${values[0]}`)
            styles.push(`margin-inline: ${values[1]}`)
            break
        case 4 :
            styles.push(`margin-block-start: ${values[0]}`)
            styles.push(`margin-block-end: ${values[2]}`)
            styles.push(`margin-inline-start: ${values[1]}`)
            styles.push(`margin-inline-end: ${values[3]}`)
            break
    }

    return styles
}
