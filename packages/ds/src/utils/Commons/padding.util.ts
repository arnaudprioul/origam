/**
 * Format padding styles var.
 *
 * Accepts 1, 2 or 4 space-separated values (mirrors `formatMarginStylesVar`):
 * - **1 value** — shorthand `padding: <v0>`.
 * - **2 values** — `padding-block: <v0>` (top+bottom) / `padding-inline: <v1>` (left+right).
 * - **4 values** — logical per-side, see the order note below.
 *
 * ⚠️ **4-value order is `Haut/Gauche/Bas/Droite` (Top/Left/Bottom/Right),
 * NOT the CSS clockwise shorthand order (Top/Right/Bottom/Left).**
 * This is an **intentional DS convention** (arbitrated in issue #216), not a
 * bug: values are grouped **by logical axis** (block first, then inline),
 * which keeps the mapping RTL-safe —
 * `values[0]` → `padding-block-start`  (top)
 * `values[1]` → `padding-inline-start` (left in LTR)
 * `values[2]` → `padding-block-end`    (bottom)
 * `values[3]` → `padding-inline-end`   (right in LTR)
 *
 * Example — do NOT assume CSS clockwise order:
 * ```ts
 * // '8px 16px 24px 32px' → top=8px, LEFT=16px, bottom=24px, RIGHT=32px
 * // (native CSS `padding: 8px 16px 24px 32px` would mean top=8/right=16/bottom=24/left=32 — different!)
 * formatPaddingStylesVar(['8px', '16px', '24px', '32px'])
 * ```
 *
 * @param values Array of 1, 2 or 4 CSS length/keyword strings.
 */
export function formatPaddingStylesVar (values: Array<string>) {
    const styles = []

    switch (values.length) {
        case 1 :
            styles.push(`padding: ${values[0]}`)
            break
        case 2 :
            styles.push(`padding-block: ${values[0]}`)
            styles.push(`padding-inline: ${values[1]}`)
            break
        case 4 :
            styles.push(`padding-block-start: ${values[0]}`)
            styles.push(`padding-block-end: ${values[2]}`)

            styles.push(`padding-inline-start: ${values[1]}`)
            styles.push(`padding-inline-end: ${values[3]}`)
            break
    }

    return styles
}
