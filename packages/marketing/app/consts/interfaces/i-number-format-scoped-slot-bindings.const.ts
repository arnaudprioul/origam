import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_NUMBER_FORMAT_SCOPED_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-number-format-scoped-slot-bindings',
    name: 'INumberFormatScopedSlotBindings',
    category: 'NumberFormat',
    descriptionKey: '',
    descriptionFallback: `Bindings exposed by the scoped \`#default\` slot. Consumers use these
to highlight specific parts of the formatted output (currency symbol,
decimal separator, …) without re-running \`Intl.NumberFormat\`
themselves.`,
    definition: `export interface INumberFormatScopedSlotBindings {
    formatted: string;
    parts: Intl.NumberFormatPart[];
    value: number;
}`,
    extends: [],
    props: [
        { name: 'formatted', type: 'string', optional: false, descriptionFallback: 'The locale-formatted string, ready to render.' },
        { name: 'parts', type: 'Intl.NumberFormatPart[]', optional: false, descriptionFallback: 'The structured parts (`Intl.NumberFormatPart[]`).' },
        { name: 'value', type: 'number', optional: false, descriptionFallback: 'The numeric value after string-to-number coercion.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/NumberFormat/number-format.interface.ts',
    examples: [],
}
