import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_NUMBER_FORMAT_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-number-format-slots',
    name: 'INumberFormatSlots',
    category: 'NumberFormat',
    descriptionKey: '',
    descriptionFallback: 'Slot signatures for `<OrigamNumberFormat>`.',
    definition: `export interface INumberFormatSlots {
    default?: (bindings: INumberFormatScopedSlotBindings) => any;
}`,
    extends: [],
    props: [
        { name: 'default', type: '(bindings: INumberFormatScopedSlotBindings) => any', optional: true, descriptionFallback: `Custom render override. Scoped — receives the resolved value plus
the structured parts so consumers can paint individual segments.` },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/NumberFormat/number-format.interface.ts',
    examples: [],
}
