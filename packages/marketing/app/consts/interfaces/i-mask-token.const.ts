import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MASK_TOKEN_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-mask-token',
    name: 'IMaskToken',
    category: 'Mask',
    descriptionKey: 'interfaces.catalog.i_mask_token.description',
    descriptionFallback: 'Token emitted by the pattern parser. kind describes what character class the token accepts; consumer flags whether the token slots a user character (#, A, *) or is a literal kept verbatim.',
    definition: `export interface IMaskToken {
    kind: 'digit' | 'letter' | 'any' | 'literal'
    char: string
    consumer: boolean
}`,
    extends: [],
    props: [
        { name: 'kind', type: "'digit' | 'letter' | 'any' | 'literal'", optional: false, descriptionFallback: "Character class accepted by this token. 'digit' matches [0-9], 'letter' matches [a-zA-Z], 'any' matches any char, 'literal' is kept verbatim." },
        { name: 'char', type: 'string', optional: false, descriptionFallback: 'The raw character from the pattern string (e.g. "#", "A", "*", or a literal like "/").' },
        { name: 'consumer', type: 'boolean', optional: false, descriptionFallback: 'True when this token slots a user-typed character; false for literals that are inserted automatically.' },
    ],
    usedBy: [
        { slug: 'use-mask', name: 'useMask', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Mask/mask-options.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_mask_token.example',
            titleFallback: 'Inspecting parsed tokens',
            code: `import { parseMaskPattern } from 'origam'

const tokens: IMaskToken[] = parseMaskPattern('##/##')
// [
//   { kind: 'digit', char: '#', consumer: true },
//   { kind: 'digit', char: '#', consumer: true },
//   { kind: 'literal', char: '/', consumer: false },
//   { kind: 'digit', char: '#', consumer: true },
//   { kind: 'digit', char: '#', consumer: true },
// ]`,
            lang: 'typescript',
        },
    ],
}
