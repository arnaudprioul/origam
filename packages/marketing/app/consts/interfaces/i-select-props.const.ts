import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-select-props',
    name: 'ISelectProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_select_props.description',
    descriptionFallback: 'Full prop surface for <OrigamSelect>. Aggregates the text-field base, density, adjacent slots, field chrome, input contract, spacing, border, rounded, elevation, item list configuration, transitions, filters, and lazy loading, then adds select-specific behaviour: chips, multiple selection, menu control, autocomplete, and search.',
    definition: `export interface ISelectProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ITextFieldProps, IDensityProps, IAdjacentProps, IAdjacentInnerProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IItemProps, ITransitionComponentProps, IFiltersProps, ILazyProps {
    chips?: boolean
    closableChips?: boolean
    hideNoData?: boolean
    hideSelected?: boolean
    listProps?: IListProps
    menu?: boolean
    menuIcon?: TIcon
    menuProps?: IMenuProps
    chipProps?: IChipProps
    multiple?: boolean
    noDataText?: string
    openOnClear?: boolean
    autocomplete?: boolean
    autoSelectFirst?: boolean | string
    clearOnSelect?: boolean
    divider?: string
    search?: string
    closeText?: string
    openText?: string
}`,
    extends: [
        'ICommonsComponentProps',
        'IColorProps',
        'IBgColorProps',
        'ITextFieldProps',
        'IDensityProps',
        'IAdjacentProps',
        'IAdjacentInnerProps',
        'IFieldProps',
        'IInputProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IRoundedProps',
        'IElevationProps',
        'IItemProps',
        'ITransitionComponentProps',
        'IFiltersProps',
        'ILazyProps',
    ],
    props: [
        { name: 'chips', type: 'boolean', optional: true, descriptionFallback: 'Renders selected values as chip tags inside the control instead of plain text.' },
        { name: 'closableChips', type: 'boolean', optional: true, descriptionFallback: 'Adds a close/remove button to each selection chip. Requires chips=true.' },
        { name: 'hideNoData', type: 'boolean', optional: true, descriptionFallback: 'Hides the "no data" message in the dropdown when the search returns no results.' },
        { name: 'hideSelected', type: 'boolean', optional: true, descriptionFallback: 'Removes already-selected items from the dropdown list (useful for multiple selects).' },
        { name: 'listProps', type: 'IListProps', optional: true, descriptionFallback: 'Props forwarded to the internal OrigamList rendered inside the dropdown.' },
        { name: 'menu', type: 'boolean', optional: true, descriptionFallback: 'v-model:menu — controls the open/closed state of the dropdown programmatically.' },
        { name: 'menuIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon shown in the append-inner slot to indicate the dropdown is available. Defaults to mdi-chevron-down.' },
        { name: 'menuProps', type: 'IMenuProps', optional: true, descriptionFallback: 'Props forwarded to the internal OrigamMenu (position, max-height, transition, etc.).' },
        { name: 'chipProps', type: 'IChipProps', optional: true, descriptionFallback: 'Props forwarded to every selection chip (color, size, variant…).' },
        { name: 'multiple', type: 'boolean', optional: true, descriptionFallback: 'Allows selecting more than one item. modelValue becomes an array.' },
        { name: 'noDataText', type: 'string', optional: true, descriptionFallback: 'Text displayed when the dropdown list is empty or the search yields no results.' },
        { name: 'openOnClear', type: 'boolean', optional: true, descriptionFallback: 'Re-opens the dropdown after the user clears the selection via the clear icon.' },
        { name: 'autocomplete', type: 'boolean', optional: true, descriptionFallback: 'Enables text-input filtering — the user types to narrow the dropdown list.' },
        { name: 'autoSelectFirst', type: 'boolean | string', optional: true, descriptionFallback: 'Auto-highlights the first matching item while the user types. Pass "exact" to restrict to exact-match prefix.' },
        { name: 'clearOnSelect', type: 'boolean', optional: true, descriptionFallback: 'Clears the search input after an item is selected (useful for multiple autocomplete).' },
        { name: 'divider', type: 'string', optional: true, descriptionFallback: 'Character used to separate multi-select values in the display string.' },
        { name: 'search', type: 'string', optional: true, descriptionFallback: 'v-model:search — exposes the autocomplete search string for external control.' },
        { name: 'closeText', type: 'string', optional: true, descriptionFallback: 'Accessible label for the close/collapse action on the dropdown.' },
        { name: 'openText', type: 'string', optional: true, descriptionFallback: 'Accessible label for the open/expand action on the dropdown.' },
    ],
    usedBy: [
        { slug: 'select', name: 'Select', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Select/select.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_select_props.example',
            titleFallback: 'Multi-select with chips and autocomplete',
            code: `<OrigamSelect
    v-model="selected"
    :items="options"
    :multiple="true"
    :chips="true"
    :closable-chips="true"
    :autocomplete="true"
    label="Select frameworks"
/>`,
            lang: 'html',
        },
    ],
}
