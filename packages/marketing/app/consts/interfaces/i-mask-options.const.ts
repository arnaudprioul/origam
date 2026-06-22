import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MASK_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-mask-options',
    name: 'IMaskOptions',
    category: 'Mask',
    descriptionKey: 'interfaces.catalog.i_mask_options.description',
    descriptionFallback: 'Configuration object accepted by useMask and the OrigamTextField mask prop in its long form. Defines the pattern template, an optional secondary validator, and a required flag.',
    definition: `export interface IMaskOptions {
    pattern: string
    validator?: TPatternValidator | null
    required?: boolean
}`,
    extends: [],
    props: [
        { name: 'pattern', type: 'string', optional: false, descriptionFallback: 'Token-walker template string. # = digit, A = letter, * = any char, anything else is a literal preserved verbatim.' },
        { name: 'validator', type: 'TPatternValidator | null', optional: true, descriptionFallback: 'Optional secondary check on the UNMASKED value (e.g. Luhn algorithm for credit cards).' },
        { name: 'required', type: 'boolean', optional: true, descriptionFallback: 'When true, isValid is false until every consumer token in the pattern is filled.' },
    ],
    usedBy: [
        { slug: 'use-mask', name: 'useMask', kind: 'composable' },
        { slug: 'text-field', name: 'TextField', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Mask/mask-options.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_mask_options.example',
            titleFallback: 'Phone number mask with validation',
            code: `import type { IMaskOptions } from 'origam'

const phoneMask: IMaskOptions = {
    pattern: '+## (###) ###-##-##',
    required: true,
}`,
            lang: 'typescript',
        },
    ],
}
