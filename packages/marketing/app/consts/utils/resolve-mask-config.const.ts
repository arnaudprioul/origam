import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_MASK_CONFIG_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-mask-config',
    name: 'resolveMaskConfig',
    category: 'Mask',
    icon: 'mdi-form-textbox',
    descriptionKey: 'utils.catalog.resolve_mask_config.description',
    descriptionFallback: 'Normalise the polymorphic mask prop (built-in key string, raw pattern string, or IMaskOptions object) into a fully resolved IResolvedMaskConfig object. Returns null for empty/absent values.',
    signature: `function resolveMaskConfig(mask: TMask | undefined): IResolvedMaskConfig | null`,
    params: [
        {
            name: 'mask',
            type: 'TMask | undefined',
            required: false,
            descriptionKey: 'utils.detail.resolve_mask_config.param_mask',
            descriptionFallback: 'The mask value to normalise: a registered built-in key (e.g. "date", "phone"), a raw pattern string, an IMaskOptions object, or null/undefined/empty string (returns null).',
        },
    ],
    returns: {
        type: 'IResolvedMaskConfig | null',
        descriptionKey: 'utils.detail.resolve_mask_config.returns',
        descriptionFallback: 'A fully resolved { pattern, validator, required } object for use by the mask engine, or null when no mask is provided.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/resolve-mask-config.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_mask_config.example_basic',
            titleFallback: 'Resolve built-in key and raw pattern',
            code: `import { resolveMaskConfig } from 'origam'

resolveMaskConfig('date')
// → { pattern: 'DD/MM/YYYY', validator: …fn…, required: true }

resolveMaskConfig('##-##-####')
// → { pattern: '##-##-####', validator: null, required: false }

resolveMaskConfig(undefined)
// → null`,
            lang: 'typescript',
        },
    ],
    related: ['apply-mask', 'resolve-gradient'],
}
