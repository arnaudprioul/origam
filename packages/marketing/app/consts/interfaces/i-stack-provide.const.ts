import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STACK_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-stack-provide',
    name: 'IStackProvide',
    category: 'Internal',
    descriptionKey: 'interfaces.catalog.i_stack_provide.description',
    descriptionFallback: 'Vue provide/inject contract shared by the overlay-stack composable. Allows child overlays to register themselves with a parent stack so z-index ordering is managed globally rather than per-component.',
    definition: `export interface IStackProvide {
    activeChildren: Set<number>
}`,
    extends: [],
    props: [
        { name: 'activeChildren', type: 'Set<number>', optional: false, descriptionFallback: 'Set of numeric IDs of currently open child overlays. The stack composable adds an ID on open and removes it on close to track depth ordering.' },
    ],
    usedBy: [
        { slug: 'use-stack', name: 'useStack', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/stack.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_stack_provide.example',
            titleFallback: 'IStackProvide in the overlay stack composable',
            code: `// Internal usage inside useStack
import { provide } from 'vue'
import type { IStackProvide } from 'origam'

const stack: IStackProvide = { activeChildren: new Set() }
provide(StackKey, stack)`,
            lang: 'typescript',
        },
    ],
}
