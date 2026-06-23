import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_MONTHS_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-months-emits',
    name: 'IDatePickerMonthsEmits',
    category: 'Date Picker',
    descriptionKey: 'interfaces.catalog.i_date_picker_months_emits.description',
    descriptionFallback: 'Emits contract for the months-grid panel of the DatePicker — fires update:month when the user clicks a month tile to switch the active month.',
    definition: `export interface IDatePickerMonthsEmits {
    (e: 'update:month', value: number): void
}`,
    extends: [],
    props: [
        { name: "update:month", type: '(value: number) => void', optional: false, descriptionFallback: 'Emitted when a month tile is clicked. The value is the zero-based month index (0 = January).' },
    ],
    usedBy: [
        { slug: 'date-picker-months', name: 'OrigamDatePickerMonths', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-months.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_picker_months_emits.example',
            titleFallback: 'Listening to month selection',
            code: `<OrigamDatePickerMonths
    :month="currentMonth"
    :year="currentYear"
    @update:month="month => (currentMonth = month)"
/>`,
            lang: 'html',
        },
    ],
}
