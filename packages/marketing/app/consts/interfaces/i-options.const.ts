import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-options',
    name: 'IOptions',
    category: 'Data & State',
    descriptionKey: 'interfaces.catalog.i_options.description',
    descriptionFallback: 'Generic label/value pair shape used across Select, RadioGroup, ChipGroup, BtnToggle and any component that needs a typed option list. The value is `T | undefined` so consumers can model an explicit "no value" row.',
    definition: `export interface IOptions<T> {
    label: string
    value: T | undefined
}`,
    extends: [],
    props: [
        { name: 'label', type: 'string', optional: false, descriptionFallback: 'Human-readable display label shown in the option list.' },
        { name: 'value', type: 'T | undefined', optional: false, descriptionFallback: 'Typed option value emitted on selection. `undefined` models an explicit "no selection" row without leaving the typed union.' },
    ],
    usedBy: [
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'radio-group', name: 'RadioGroup', kind: 'component' },
        { slug: 'chip-group', name: 'ChipGroup', kind: 'component' },
        { slug: 'btn-toggle', name: 'BtnToggle', kind: 'component' },
        { slug: 'autocomplete', name: 'Autocomplete', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/options.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_options.example',
            titleFallback: 'Typing an options array for a Select component',
            code: `import type { IOptions } from 'origam'

const statusOptions: IOptions<string>[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'No filter', value: undefined },
]`,
            lang: 'typescript',
        },
    ],
}
