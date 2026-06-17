import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const FORWARD_REFS_CONST_DOC: IConstDoc = {
    slug: 'forward-refs',
    name: 'FORWARD_REFS',
    category: 'Composables & Internals',
    descriptionKey: 'consts.catalog.forward_refs.description',
    descriptionFallback: 'Unique Symbol used as an injection key to forward template refs across component boundaries. Components that expose their internal refs to consumers inject under this key.',
    definition: `export const FORWARD_REFS = Symbol('Forwarded refs')`,
    value: "Symbol('Forwarded refs')",
    usedBy: [
        { name: 'useForwardRefs' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/forwardRefs.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.forward_refs.example',
            titleFallback: 'Injecting forwarded refs',
            code: `import { FORWARD_REFS } from 'origam'
import { inject } from 'vue'

const refs = inject(FORWARD_REFS)
// refs contains the internal template refs exposed by the parent component`,
            lang: 'typescript',
        },
    ],
}
