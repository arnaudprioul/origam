import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const APPLY_MASK_UTIL_DOC: IUtilDoc = {
    slug: 'apply-mask',
    name: 'applyMask',
    category: 'Mask',
    icon: 'mdi-form-textbox-password',
    descriptionKey: 'utils.catalog.apply_mask.description',
    descriptionFallback: 'Apply a character-based mask pattern to a raw string value. Returns both the masked display string and the unmasked raw string, plus a flag indicating whether all consumer slots are filled.',
    signature: 'function applyMask(value: string, pattern: string): IMaskApplyResult',
    params: [
        {
            name: 'value',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.apply_mask.param_value',
            descriptionFallback: 'The raw input string to format. Leading/trailing whitespace is preserved.',
        },
        {
            name: 'pattern',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.apply_mask.param_pattern',
            descriptionFallback: 'The mask pattern string. Literal characters are emitted as-is; token characters consume one character from the input.',
        },
    ],
    returns: {
        type: 'IMaskApplyResult',
        descriptionKey: 'utils.detail.apply_mask.returns',
        descriptionFallback: 'An object { masked: string, unmasked: string, complete: boolean }. "complete" is true when every consumer token in the pattern has been filled.',
    },
    sourceFile: 'packages/ds/src/utils/Mask/apply-mask.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.apply_mask.example_phone',
            titleFallback: 'Phone number mask',
            code: `import { applyMask } from 'origam'

applyMask('0612345678', '## ## ## ## ##')
// → { masked: '06 12 34 56 78', unmasked: '0612345678', complete: true }

applyMask('0612', '## ## ## ## ##')
// → { masked: '06 12', unmasked: '0612', complete: false }`,
            lang: 'typescript',
        },
    ],
    related: ['convert-to-unit'],
}
