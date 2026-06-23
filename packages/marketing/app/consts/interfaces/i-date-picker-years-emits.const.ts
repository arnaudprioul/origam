import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_YEARS_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-years-emits',
    name: 'IDatePickerYearsEmits',
    category: 'Date Picker',
    descriptionKey: 'interfaces.catalog.i_date_picker_years_emits.description',
    descriptionFallback: 'Emits contract for the years-grid panel of the DatePicker — fires update:year when the user clicks a year tile to switch the active year.',
    definition: `export interface IDatePickerYearsEmits {
    (e: 'update:year', value: number): void
}`,
    extends: [],
    props: [
        { name: 'update:year', type: '(value: number) => void', optional: false, descriptionFallback: 'Emitted when a year tile is clicked. The value is the four-digit year number.' },
    ],
    usedBy: [
        { slug: 'date-picker-years', name: 'OrigamDatePickerYears', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-years.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_picker_years_emits.example',
            titleFallback: 'Listening to year selection',
            code: `<OrigamDatePickerYears
    :year="currentYear"
    @update:year="y => (currentYear = y)"
/>`,
            lang: 'html',
        },
    ],
}
