import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_STACK_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-stack-key',
    name: 'ORIGAM_STACK_KEY',
    category: 'Overlay & Z-index',
    descriptionKey: 'consts.catalog.origam_stack_key.description',
    descriptionFallback: 'Vue injection key (Symbol) shared by OrigamStack (provider) and its overlay children to coordinate z-index layering. Consumed internally via IStackProvide.',
    definition: `export const ORIGAM_STACK_KEY: InjectionKey<IStackProvide> = Symbol.for('origam:stack')`,
    value: "Symbol.for('origam:stack')",
    usedBy: [
        { name: 'OrigamStack', slug: 'origam-stack' },
        { name: 'useStack' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/stack.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_stack_key.example',
            titleFallback: 'Injecting the stack context in a custom overlay',
            code: `import { inject } from 'vue'
import { ORIGAM_STACK_KEY } from 'origam'

const stack = inject(ORIGAM_STACK_KEY)`,
            lang: 'typescript',
        },
    ],
}
