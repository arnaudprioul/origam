import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DEFAULT_PROVIDER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-default-provider-props',
    name: 'IDefaultProviderProps',
    category: 'Theme & Defaults',
    descriptionKey: 'interfaces.catalog.i_default_provider_props.description',
    descriptionFallback: 'Props for OrigamDefaultsProvider — a structurally transparent wrapper that injects per-component prop defaults into a subtree. Supports disabled pass-through, reset/root scoping and fully scoped isolation.',
    definition: `export interface IDefaultProviderProps extends ICommonsComponentProps {
    defaults?: IDefault
    disabled?: boolean
    reset?: string | number
    root?: string | number
    scoped?: boolean
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'defaults', type: 'IDefault', optional: true, descriptionFallback: 'Map of default props, keyed by "global" or component name (e.g. "origam-btn").' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'When true, parent defaults pass through unchanged — useful to temporarily disable an outer provider.' },
        { name: 'reset', type: 'string | number', optional: true, descriptionFallback: 'When set, parent defaults are NOT inherited; the subtree starts only from this provider. The value is opaque but visible in DevTools.' },
        { name: 'root', type: 'string | number', optional: true, descriptionFallback: 'Marks this provider as the root of a defaults tree — equivalent to reset in behaviour but communicates a different intent.' },
        { name: 'scoped', type: 'boolean', optional: true, descriptionFallback: 'When true, parent defaults are not merged in — the subtree only sees this provider\'s defaults.' },
    ],
    usedBy: [
        { slug: 'default-provider', name: 'OrigamDefaultsProvider', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DefaultProvider/default-provider.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_default_provider_props.example',
            titleFallback: 'Scoped defaults for a form section',
            code: `<OrigamDefaultsProvider
    :defaults="{
        global:           { density: 'compact' },
        'origam-btn':     { color: 'primary' },
        'origam-text-field': { variant: 'outlined' },
    }"
>
    <!-- All children inherit these defaults -->
</OrigamDefaultsProvider>`,
            lang: 'html',
        },
    ],
}
