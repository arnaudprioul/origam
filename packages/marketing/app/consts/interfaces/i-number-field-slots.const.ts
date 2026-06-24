import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_NUMBER_FIELD_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-number-field-slots',
    name: 'INumberFieldSlots',
    category: 'NumberField',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export interface INumberFieldSlots extends IFieldSlots, Omit<IInputSlots, 'default'> {
    field?: (data: {
        id: string;
        isDisabled: boolean;
        isDirty: boolean;
        isValid: boolean | undefined;
        isReadonly: boolean;
    }) => any;
    increment?: (data: {
        canIncrease: boolean;
        onControlClick: () => void;
        onUpControlMousedown: () => void;
        onControlMouseup: () => void;
    }) => any;
    decrement?: (data: {
        canDecrease: boolean;
        onControlClick: () => void;
        onDownControlMousedown: () => void;
        onControlMouseup: () => void;
    }) => any;
}`,
    extends: ['IFieldSlots', 'Omit'],
    props: [
        { name: 'field', type: '(data: { id: string, isDisabled: boolean, isDirty: boolean, isValid: boolean | undefined, isReadonly: boolean }) => any', optional: true, descriptionFallback: '' },
        { name: 'increment', type: '(data: { canIncrease: boolean, onControlClick: () => void, onUpControlMousedown: () => void, onControlMouseup: () => void }) => any', optional: true, descriptionFallback: '' },
        { name: 'decrement', type: '(data: { canDecrease: boolean, onControlClick: () => void, onDownControlMousedown: () => void, onControlMouseup: () => void }) => any', optional: true, descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/NumberField/number-field.interface.ts',
    examples: [],
}
