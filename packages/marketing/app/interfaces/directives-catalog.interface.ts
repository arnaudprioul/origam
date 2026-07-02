/**
 * Interfaces for the /directives page.
 * Code snippets (usage examples) are universal data — they live in consts,
 * not i18n, to avoid vue-i18n brace-interpolation conflicts.
 */

export interface IDirectiveArg {
    name: string
    type: string
    descriptionKey: string
}

export interface IDirectiveModifier {
    name: string
    descriptionKey: string
}

/**
 * Lightweight catalog entry returned by GET /api/reference/directive.
 * Used on the /directives index page for card rendering and search.
 */
export interface IDirectiveEntry {
    slug: string
    name: string
    icon: string
    category: string
    descriptionKey: string
    descriptionFallback: string
}

export interface IDirectiveCatalogItem {
    id: string
    name: string
    icon: string
    titleKey: string
    descriptionKey: string
    signatureCode: string
    usageCode: string
    args?: IDirectiveArg[]
    modifiers?: IDirectiveModifier[]
    noteKey?: string
}
