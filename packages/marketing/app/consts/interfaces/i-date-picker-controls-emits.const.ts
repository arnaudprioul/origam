import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_CONTROLS_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-controls-emits',
    name: 'IDatePickerControlsEmits',
    category: 'DatePicker',
    descriptionKey: '',
    descriptionFallback: `Emits fired by \`<OrigamDatePickerControls>\` — clicks on the five
toolbar buttons (year / month / prev / next / text label).
\`event\` is optional: the click handlers call \`emits('click:prev')\`
etc. without forwarding the originating MouseEvent.`,
    definition: `export interface IDatePickerControlsEmits {
    (e: 'click:year', event?: MouseEvent): void;
    (e: 'click:month', event?: MouseEvent): void;
    (e: 'click:prev', event?: MouseEvent): void;
    (e: 'click:next', event?: MouseEvent): void;
    (e: 'click:text', event?: MouseEvent): void;
}`,
    extends: [],
    props: [],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-controls.interface.ts',
    examples: [],
}
