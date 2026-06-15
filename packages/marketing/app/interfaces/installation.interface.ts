/**
 * Interfaces for the /installation page.
 * Code snippets are universal data (identical in all languages) — they live
 * in consts, not i18n, to avoid vue-i18n brace-interpolation conflicts.
 */

export interface IInstallationStep {
    id: string
    icon: string
    titleKey: string
    descriptionKey: string
    noteKey?: string
}

export interface IInstallationCodeBlock {
    code: string
    lang: string
    filename?: string
}

export interface IInstallationPeerDep {
    pkg: string
    required: string
    usedByKey: string
}
