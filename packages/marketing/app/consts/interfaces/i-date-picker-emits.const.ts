import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-emits',
    name: 'IDatePickerEmits',
    category: 'DatePicker',
    descriptionKey: '',
    descriptionFallback: `Emits fired by \`<OrigamDatePicker>\` — main v-model + the three navigation
channels (month / year / viewMode) the controls and tables push up.`,
    definition: `export interface IDatePickerEmits extends ICommonsComponentEmits {
    (e: 'update:month', value: number): void;
    (e: 'update:year', value: number): void;
    (e: 'update:viewMode', value: TDateMode): void;
}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker.interface.ts',
    examples: [],
}
