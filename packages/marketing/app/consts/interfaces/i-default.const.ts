import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DEFAULT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-default',
    name: 'IDefault',
    category: 'Theme & Defaults',
    descriptionKey: 'interfaces.catalog.i_default.description',
    descriptionFallback: 'Shape of the defaults map consumed by OrigamDefaultsProvider and the createOrigam theme component layer. Keys are "global" (applies to every component) or a component kebab-case name (e.g. "origam-btn"). Values are plain prop records.',
    definition: `export interface IDefault {
    global?: Record<string, unknown>
    [key: string]: Record<string, unknown> | undefined
}`,
    extends: [],
    props: [
        { name: 'global', type: 'Record<string, unknown>', optional: true, descriptionFallback: 'Default props applied to every component in the subtree (e.g. { density: "comfortable" }).' },
        { name: '[key: string]', type: 'Record<string, unknown> | undefined', optional: true, descriptionFallback: 'Per-component defaults keyed by the component kebab-case name, e.g. "origam-btn": { color: "primary" }.' },
    ],
    usedBy: [
        { slug: 'default-provider', name: 'OrigamDefaultsProvider', kind: 'component' },
        { slug: 'use-defaults', name: 'useDefaults', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DefaultProvider/default-provider.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_default.example',
            titleFallback: 'Providing component defaults via createOrigam theme',
            code: `import type { IDefault } from 'origam'

const componentDefaults: IDefault = {
    global:        { density: 'comfortable' },
    'origam-btn':  { color: 'primary', rounded: true },
    'origam-card': { elevation: 2, rounded: 'lg' },
}`,
            lang: 'typescript',
        },
    ],
}
