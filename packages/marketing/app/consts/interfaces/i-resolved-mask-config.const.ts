import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RESOLVED_MASK_CONFIG_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-resolved-mask-config',
    name: 'IResolvedMaskConfig',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_resolved_mask_config.description',
    descriptionFallback: 'Normalised mask configuration returned by resolveMaskConfig after accepting a raw string pattern, a preset key, or an IMaskOptions object as input. At this layer the pattern is always a raw template string and every field is guaranteed non-optional.',
    definition: `export interface IResolvedMaskConfig {
    pattern: string
    validator: TPatternValidator | null
    required: boolean
}`,
    extends: [],
    props: [
        { name: 'pattern', type: 'string', optional: false, descriptionFallback: 'Raw token-walker template string. # = digit, A = letter, * = any char, other characters are literals.' },
        { name: 'validator', type: 'TPatternValidator | null', optional: false, descriptionFallback: 'Optional secondary validation function applied to the unmasked value. null when no validator was provided.' },
        { name: 'required', type: 'boolean', optional: false, descriptionFallback: 'When true, isValid returns false until every consumer token in the pattern is filled.' },
    ],
    usedBy: [
        { slug: 'text-field', name: 'TextField', kind: 'component' },
        { slug: 'use-mask', name: 'useMask', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Mask/mask-options.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_resolved_mask_config.example',
            titleFallback: 'Consuming a resolved mask config in useMask',
            code: `import type { IResolvedMaskConfig } from 'origam'

const config: IResolvedMaskConfig = resolveMaskConfig('##/##/####')
// config.pattern === '##/##/####'
// config.validator === null
// config.required === false`,
            lang: 'typescript',
        },
    ],
}
