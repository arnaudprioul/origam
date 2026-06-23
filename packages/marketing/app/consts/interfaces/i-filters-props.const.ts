import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILTERS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-filters-props',
    name: 'IFiltersProps',
    category: 'Data & Filtering',
    descriptionKey: 'interfaces.catalog.i_filters_props.description',
    descriptionFallback: 'Filter contract for list / autocomplete components — declares the full filtering surface: custom function, per-key function, targeted keys, filter mode and an escape hatch to bypass filtering entirely.',
    definition: `export interface IFiltersProps {
    customFilter?: TFilterFunction
    customKeyFilter?: TFilterKeyFunctions
    filterKeys: TFilterKeys
    filterMode: TFilterMode
    noFilter?: boolean
}`,
    extends: [],
    props: [
        {
            name: 'customFilter',
            type: 'TFilterFunction',
            optional: true,
            descriptionFallback: 'Global custom filter function applied to each item. Overrides the built-in matching logic when provided.',
        },
        {
            name: 'customKeyFilter',
            type: 'TFilterKeyFunctions',
            optional: true,
            descriptionFallback: 'Per-key custom filter functions — a map from item property name to a filter function, allowing different matching strategies per field.',
        },
        {
            name: 'filterKeys',
            type: 'TFilterKeys',
            optional: false,
            descriptionFallback: 'Which item properties to match against — a single key name, an array of key names, or a structured descriptor.',
        },
        {
            name: 'filterMode',
            type: 'TFilterMode',
            optional: false,
            descriptionFallback: 'How multiple filterKeys are combined: "every" (AND) | "some" (OR) | "union" | "intersection".',
        },
        {
            name: 'noFilter',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'When true, filtering is skipped entirely and all items are returned as-is.',
        },
    ],
    usedBy: [
        { slug: 'autocomplete', name: 'Autocomplete', kind: 'component' },
        { slug: 'combobox', name: 'Combobox', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/filters.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_filters_props.example',
            titleFallback: 'Extending IFiltersProps on a filterable list',
            code: `import type { IFiltersProps } from 'origam'

interface ISearchListProps extends IFiltersProps {
    items: string[]
}`,
            lang: 'typescript',
        },
    ],
}
