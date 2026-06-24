import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_PICKER_CONTROLS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-picker-controls-props',
    name: 'IDatePickerControlsProps',
    category: 'DatePicker',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface IDatePickerControlsProps extends ICommonsComponentProps {
    active?: string | Array<string> | boolean | IActiveState;
    disabled?: boolean;
    disabledMonth?: boolean;
    disabledYear?: boolean;
    disabledNext?: boolean;
    disabledPrev?: boolean;
    nextIcon?: TIcon;
    prevIcon?: TIcon;
    modeIcon?: TIcon;
    text?: string;
    viewMode?: TDateMode;
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'active', type: 'string | Array<string> | boolean | IActiveState', optional: true, descriptionFallback: `Highlighted item(s) in the controls toolbar. Widened to include
\`boolean | IActiveState\` so that IDatePickerProps can extend both this
interface and IPickerProps (which via ISheetProps → IActiveProps declares
\`active?: boolean | IActiveState\`) without TS2320.` },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'disabledMonth', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'disabledYear', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'disabledNext', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'disabledPrev', type: 'boolean', optional: true, descriptionFallback: '' },
        { name: 'nextIcon', type: 'TIcon', optional: true, descriptionFallback: '' },
        { name: 'prevIcon', type: 'TIcon', optional: true, descriptionFallback: '' },
        { name: 'modeIcon', type: 'TIcon', optional: true, descriptionFallback: '' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: '' },
        { name: 'viewMode', type: 'TDateMode', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/DatePicker/date-picker-controls.interface.ts',
    examples: [],
}
