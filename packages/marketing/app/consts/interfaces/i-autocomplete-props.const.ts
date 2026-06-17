import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AUTOCOMPLETE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-autocomplete-props',
    name: 'IAutocompleteProps',
    category: 'State & Interaction',
    descriptionKey: 'interfaces.catalog.i_autocomplete_props.description',
    descriptionFallback: 'Props controlling the autocomplete / combobox behaviour — search text, delimiters, auto-select and clear-on-select.',
    definition: `export interface IAutocompleteProps {
    autoSelectFirst?: boolean | string
    clearOnSelect?: boolean
    delimiters?: Array<string>
    search?: string
    autocomplete?: boolean
}`,
    extends: [],
    props: [
        { name: 'autoSelectFirst', type: 'boolean | string', optional: true, descriptionFallback: 'Automatically selects the first suggestion when the list opens. Pass "exact" to select only on exact match.' },
        { name: 'clearOnSelect', type: 'boolean', optional: true, descriptionFallback: 'Clears the search text after the user picks an item.' },
        { name: 'delimiters', type: 'Array<string>', optional: true, descriptionFallback: 'Array of characters that trigger chip creation in a combobox (e.g. [",", " "]).' },
        { name: 'search', type: 'string', optional: true, descriptionFallback: 'The current search / filter string, bound via v-model:search.' },
        { name: 'autocomplete', type: 'boolean', optional: true, descriptionFallback: 'Enables native browser autocomplete on the underlying input.' },
    ],
    usedBy: [
        { slug: 'autocomplete', name: 'Autocomplete', kind: 'component' },
        { slug: 'combobox', name: 'Combobox', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/autocomplete.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_autocomplete_props.example',
            titleFallback: 'Autocomplete with auto-select and clear on select',
            code: `<OrigamAutocomplete
    :items="countries"
    auto-select-first
    clear-on-select
    v-model:search="query"
/>`,
            lang: 'vue',
        },
    ],
}
