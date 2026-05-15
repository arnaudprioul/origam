import type {
    ICommonsComponentProps,
    ITagProps
} from '../../interfaces'

import type {
    TBlockquoteAlign,
    TBlockquoteLang,
    TBlockquoteVariant,
    TIntent
} from '../../types'

/**
 * Props for `<OrigamBlockquote>` — typographic citation component.
 *
 * A thin layer on top of the native `<blockquote>` element. Adds five
 * visual variants, optional author/source attribution, locale-aware
 * decorative quote marks (for `variant="quoted"`) and an intent-driven
 * accent color (consumed by the accent bar / quote marks / author
 * label depending on the variant).
 *
 * The component never imposes a layout beyond what's required for the
 * variant — outer margins are the parent's responsibility.
 */
export interface IBlockquoteProps extends ICommonsComponentProps, ITagProps {
    /**
     * Visual variant. See `TBlockquoteVariant` for the per-variant
     * typographic contract.
     *
     * @default 'default'
     */
    variant?: TBlockquoteVariant
    /**
     * Author of the citation. Rendered after the body as `— Author`.
     * When `source` is also set, the two are joined with a comma.
     * Can be overridden via the `#author` slot for custom rendering
     * (e.g. wrap in a link to a bio page).
     */
    author?: string
    /**
     * Source of the citation (book, publication, URL label, …).
     * Rendered after `author` as `, Source`. Can be overridden via
     * the `#source` slot. When `cite` is also set on the prop, the
     * source label is wrapped in a `<cite>` element pointing at the
     * URL.
     */
    source?: string
    /**
     * URL the citation references. Maps 1:1 to the HTML `cite`
     * attribute on the rendered `<blockquote>` (or `<q>`). Pass a
     * fully-qualified URL — the browser exposes it to assistive tech
     * and to user-agent inspectors but does not render it visually.
     */
    cite?: string
    /**
     * Locale hint that determines which decorative quote glyphs render
     * for `variant="quoted"`. See `TBlockquoteLang`.
     *
     * @default 'auto'
     */
    lang?: TBlockquoteLang
    /**
     * Horizontal alignment of the citation body and attribution. The
     * `pull` variant forces `'center'` when this prop is left empty;
     * other variants default to `'left'`.
     *
     * @default 'left'
     */
    align?: TBlockquoteAlign
    /**
     * Semantic accent color. Drives:
     * - the left accent bar (`default`).
     * - the decorative quote marks (`quoted`).
     * - the author label and pull-quote top/bottom rules (`pull`).
     *
     * Maps to the `--origam-color__action--{intent}---bg` token. Pass
     * one of the semantic intents (`'primary'`, `'secondary'`,
     * `'success'`, `'danger'`, …) — raw hex/rgb values are NOT
     * supported here on purpose (keeps the token contract clean).
     */
    color?: TIntent
}

/**
 * Slot signatures for `<OrigamBlockquote>`. The `default` slot owns the
 * citation body; `author` and `source` are optional overrides for
 * custom rendering (links, badges, locale-formatted dates, …). When
 * an override slot is provided it WINS over the matching prop —
 * priority order is `slot > prop`.
 */
export interface IBlockquoteSlots {
    default?: () => any
    author?: () => any
    source?: () => any
}
