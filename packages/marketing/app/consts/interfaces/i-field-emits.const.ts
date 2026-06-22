import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FIELD_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-field-emits',
    name: 'IFieldEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_field_emits.description',
    descriptionFallback: 'Aggregate emit contract for OrigamField — bundles focus events, commons component events, adjacent-inner slot events, and the active-state lifecycle so consumers can defineEmits<IFieldEmits>() without repeating each signature.',
    definition: `export interface IFieldEmits extends IFocusEmits, ICommonsComponentEmits, IAdjacentInnerEmits, IActiveEmits {
}`,
    extends: ['IFocusEmits', 'ICommonsComponentEmits', 'IAdjacentInnerEmits', 'IActiveEmits'],
    props: [],
    usedBy: [
        { slug: 'field', name: 'Field', kind: 'component' },
        { slug: 'text-field', name: 'TextField', kind: 'component' },
        { slug: 'number-field', name: 'NumberField', kind: 'component' },
        { slug: 'password-field', name: 'PasswordField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Field/field.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_field_emits.example',
            titleFallback: 'Reusing IFieldEmits in a custom field component',
            code: `import type { IFieldEmits } from 'origam'

interface IMyFieldEmits extends IFieldEmits {
    (e: 'change', value: string): void
}`,
            lang: 'typescript',
        },
    ],
}
