/**
 * Composable catalog entry — one row in the flat composable list displayed on /composables.
 * Grouped by domain (Commons, Theme, CssSupport, …) on the index page.
 */
export interface IComposableEntry {
    /** kebab-case slug used as the URL segment: /composables/{slug}
     *  Convention: `use-` prefix to avoid collisions with component slugs
     *  e.g. useColor → use-color, useDimension → use-dimension
     */
    slug: string
    /** Composable function name, e.g. "useColor" */
    name: string
    /** MDI icon name for the catalog card */
    icon: string
    /** i18n key for the short description */
    descriptionKey: string
    /** Inline fallback description (English) */
    descriptionFallback: string
    /** Domain / folder grouping, e.g. "Commons", "Theme", "CssSupport" */
    domain: string
    /** Related composable slugs (other composables it delegates to or pairs with) */
    related: string[]
}

/**
 * One documented parameter for a composable (input or return value member).
 */
export interface IComposableParam {
    /** Parameter / return key name */
    name: string
    /** TypeScript type as a display string */
    type: string
    /** true = required parameter */
    required?: boolean
    /** Default value as plain text, e.g. "'auto'" or "ref(false)" */
    defaultValue?: string
    descriptionKey: string
    descriptionFallback: string
}

/**
 * One return value member exposed by the composable.
 */
export interface IComposableReturn {
    /** Key name as returned, e.g. "colorClasses", "isActive" */
    name: string
    /** TypeScript type as a display string */
    type: string
    descriptionKey: string
    descriptionFallback: string
}

/**
 * A runnable code snippet shown in the Examples section.
 */
export interface IComposableExample {
    titleKey: string
    titleFallback: string
    code: string
    lang: string
}

/**
 * Full documentation object for one composable.
 * Consumed by /composables/[slug].vue.
 */
export interface IComposableDoc {
    /** Must match the catalog entry slug exactly */
    slug: string
    /** Composable function name, e.g. "useColor" */
    name: string
    /** Domain / folder, e.g. "Commons" */
    domain: string
    /** MDI icon name */
    icon: string
    /** i18n key for the hero description */
    descriptionKey: string
    descriptionFallback: string
    /**
     * Full TypeScript signature as a code snippet.
     * Sourced from the composable's function signature in the real file.
     */
    signature: string
    /**
     * Parameters accepted by the composable.
     * Maps to the real function parameters (destructured or named).
     */
    params: IComposableParam[]
    /**
     * Return value members.
     * Maps to the real return object keys.
     */
    returns: IComposableReturn[]
    /** 2-3 runnable usage examples */
    examples: IComposableExample[]
    /**
     * Related composable slugs (cross-references).
     * Rendered as "Related composables" section.
     */
    related: string[]
    /**
     * Interface(s) this composable consumes.
     * E.g. ["IDimensionProps", "IMarginProps"]
     */
    consumedInterfaces?: string[]
    /**
     * Note rendered as an info callout below the signature.
     * Use for deprecation warnings, phase notes, or important caveats.
     */
    noteKey?: string
    noteFallback?: string
}
