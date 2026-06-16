import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const LOADING_VALUE_TYPE_DOC: ITypeDoc = {
    slug: 'loading-value',
    name: 'TLoadingValue',
    kind: 'type',
    category: 'Interaction & State',
    descriptionKey: 'types.catalog.loading_value.description',
    descriptionFallback: 'Loading prop value — boolean (on/off), number (percentage), or structured loader config object.',
    definition: `export type TLoadingValue = boolean | number | TLoaderConfig

// Where TLoaderConfig is:
export type TLoaderConfig =
    | ({ type: 'line' }     & Partial<IProgressLinearProps>)
    | ({ type: 'circular' } & Partial<IProgressCircularProps>)
    | ({ type: 'skeleton' } & Partial<ISkeletonProps>)`,
    values: [],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'loading' },
        { slug: 'card', name: 'Card', propName: 'loading' },
        { slug: 'text-field', name: 'TextField', propName: 'loading' },
        { slug: 'select', name: 'Select', propName: 'loading' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/loader.type.ts',
    examples: [
        {
            titleKey: 'types.detail.loading_value.example_bool',
            titleFallback: 'Boolean — indeterminate loading',
            code: `<origam-btn :loading="true">Saving…</origam-btn>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.loading_value.example_number',
            titleFallback: 'Number — determinate progress (0–100)',
            code: `<origam-btn :loading="42">Uploading…</origam-btn>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.loading_value.example_config',
            titleFallback: 'Config object — explicit loader kind',
            code: `<origam-card :loading="{ type: 'skeleton' }">Content</origam-card>`,
            lang: 'html',
        },
    ],
}
