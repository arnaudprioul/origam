import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_HEADER_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-header-emits',
    name: 'IDatePickerHeaderEmits',
    category: 'DatePicker',
    descriptionKey: '',
    descriptionFallback: `Emits fired by \`<OrigamDatePickerHeader>\` — click on the header text.
\`event\` is optional: the handler calls \`emits('click')\` without forwarding
the originating MouseEvent.`,
    definition: `export interface IDatePickerHeaderEmits {
    (e: 'click', event?: MouseEvent): void;
}`,
    extends: [],
    props: [],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-header.interface.ts',
    examples: [],
}
