import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MASK_APPLY_RESULT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-mask-apply-result',
    name: 'IMaskApplyResult',
    category: 'Mask',
    descriptionKey: 'interfaces.catalog.i_mask_apply_result.description',
    descriptionFallback: 'Output shape of applyMask — masked is the formatted display string with literals interleaved; unmasked is the raw user-provided characters (consumer slots only); complete signals that all consumer tokens are filled.',
    definition: `export interface IMaskApplyResult {
    masked: string
    unmasked: string
    complete: boolean
}`,
    extends: [],
    props: [
        { name: 'masked', type: 'string', optional: false, descriptionFallback: 'Formatted display string with pattern literals interleaved (e.g. "12/34/5678").' },
        { name: 'unmasked', type: 'string', optional: false, descriptionFallback: 'Raw user-provided characters with no literal separators (e.g. "12345678").' },
        { name: 'complete', type: 'boolean', optional: false, descriptionFallback: 'True when every consumer token (#, A, *) in the pattern has been filled.' },
    ],
    usedBy: [
        { slug: 'use-mask', name: 'useMask', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Mask/mask-options.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_mask_apply_result.example',
            titleFallback: 'Reading the result of applyMask',
            code: `import { applyMask } from 'origam'

const result: IMaskApplyResult = applyMask('##/##/####', '12345678')
// result.masked    === '12/34/5678'
// result.unmasked  === '12345678'
// result.complete  === true`,
            lang: 'typescript',
        },
    ],
}
